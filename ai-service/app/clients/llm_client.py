from __future__ import annotations

import json
from typing import Any

import httpx

from app.core.config import get_settings
from app.core.errors import AIServiceError
from app.prompts.policy import get_default_system_prompt


class LLMClient:
    """Minimal OpenAI-compatible client used only when LLM mode is enabled."""

    def __init__(self) -> None:
        self.settings = get_settings()

    @property
    def enabled(self) -> bool:
        return bool(self.settings.llm_enabled and self.settings.llm_api_key and self.settings.llm_base_url and self.settings.llm_model)

    def complete(self, prompt: str, system_prompt: str | None = None) -> str:
        if not self.enabled:
            raise AIServiceError(
                code="llm_disabled",
                message="Интеграция с LLM отключена. Используйте эвристический fallback.",
                status_code=503,
            )

        effective_system_prompt = get_default_system_prompt()
        if system_prompt:
            effective_system_prompt = f"{effective_system_prompt}\n\n{system_prompt.strip()}"

        payload: dict[str, Any] = {
            "model": self.settings.llm_model,
            "messages": self._messages(prompt=prompt, system_prompt=effective_system_prompt),
            "temperature": 0.0,
        }
        url = f"{self.settings.llm_base_url.rstrip('/')}/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.settings.llm_api_key}",
            "Content-Type": "application/json",
        }

        with httpx.Client(timeout=self.settings.request_timeout_seconds) as client:
            response = client.post(url, headers=headers, content=json.dumps(payload))
            response.raise_for_status()
            data = response.json()

        try:
            return data["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError) as exc:  # pragma: no cover - defensive remote shape handling
            raise AIServiceError(code="llm_response_invalid", message="LLM-провайдер вернул некорректный ответ") from exc

    def _messages(self, prompt: str, system_prompt: str | None) -> list[dict[str, str]]:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        return messages
