"""Adapter layer for optional LLM-assisted semantic analysis."""

from __future__ import annotations

import json
import logging
import os
from typing import Optional, Tuple, Type, TypeVar

from pydantic import BaseModel, ValidationError

from tz_mvp.core.config import LLMConfig
from tz_mvp.core.models import LLMTrace

LOGGER = logging.getLogger(__name__)

SchemaT = TypeVar("SchemaT", bound=BaseModel)


class BaseLLMClient:
    """Minimal LLM interface to keep providers swappable."""

    def __init__(self, config: LLMConfig) -> None:
        self.config = config

    @property
    def available(self) -> bool:
        return False

    def analyze_json(self, task_name: str, prompt: str, schema: Type[SchemaT]) -> Tuple[Optional[SchemaT], LLMTrace]:
        trace = LLMTrace(
            task_name=task_name,
            prompt=prompt,
            raw_response="",
            parsed_ok=False,
            error="LLM client disabled",
        )
        return None, trace


class OpenAILLMClient(BaseLLMClient):
    """OpenAI Chat Completions wrapper with strict Pydantic validation."""

    def __init__(self, config: LLMConfig) -> None:
        super().__init__(config)
        self._client = None
        if config.enabled and os.getenv("OPENAI_API_KEY"):
            try:
                from openai import OpenAI

                self._client = OpenAI(timeout=config.timeout_seconds)
            except Exception as exc:  # pragma: no cover - import/runtime guard
                LOGGER.warning("OpenAI client unavailable: %s", exc)

    @property
    def available(self) -> bool:
        return self._client is not None

    def analyze_json(self, task_name: str, prompt: str, schema: Type[SchemaT]) -> Tuple[Optional[SchemaT], LLMTrace]:
        if not self.available:
            return super().analyze_json(task_name, prompt, schema)

        last_error = None
        raw_response = ""
        for _attempt in range(self.config.retries + 1):
            try:
                response = self._client.chat.completions.create(
                    model=self.config.model,
                    temperature=self.config.temperature,
                    response_format={"type": "json_object"},
                    messages=[
                        {
                            "role": "system",
                            "content": (
                                "Ты — эксперт по анализу технических заданий. "
                                "Всегда отвечай только валидным JSON без markdown."
                            ),
                        },
                        {"role": "user", "content": prompt},
                    ],
                )
                raw_response = response.choices[0].message.content or "{}"
                parsed = schema.model_validate_json(raw_response)
                trace = LLMTrace(task_name=task_name, prompt=prompt, raw_response=raw_response, parsed_ok=True)
                return parsed, trace
            except (ValidationError, json.JSONDecodeError) as exc:
                last_error = exc
                LOGGER.warning("Invalid JSON for task %s: %s", task_name, exc)
            except Exception as exc:  # pragma: no cover - network/runtime guard
                last_error = exc
                LOGGER.warning("LLM request failed for task %s: %s", task_name, exc)
                break

        trace = LLMTrace(
            task_name=task_name,
            prompt=prompt,
            raw_response=raw_response,
            parsed_ok=False,
            error=str(last_error) if last_error else "Unknown LLM failure",
        )
        return None, trace
