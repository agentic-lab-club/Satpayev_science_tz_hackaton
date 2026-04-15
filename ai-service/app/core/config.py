from __future__ import annotations

import os
from functools import lru_cache

from pydantic import BaseModel, Field


class Settings(BaseModel):
    service_name: str = "satpayev-ai-service"
    version: str = "0.1.0"
    environment: str = Field(default="local")
    host: str = Field(default="0.0.0.0")
    port: int = Field(default=8000)
    log_level: str = Field(default="info")
    llm_enabled: bool = Field(default=False)
    llm_provider: str = Field(default="openai-compatible")
    llm_base_url: str | None = Field(default=None)
    llm_api_key: str | None = Field(default=None)
    llm_model: str | None = Field(default=None)
    request_timeout_seconds: int = Field(default=60)
    max_input_chars: int = Field(default=120_000)
    cors_origins: list[str] = Field(default_factory=lambda: ["*"])

    @classmethod
    def from_env(cls) -> "Settings":
        return cls(
            environment=os.getenv("AI_SERVICE_ENV", "local"),
            host=os.getenv("AI_SERVICE_HOST", "0.0.0.0"),
            port=int(os.getenv("AI_SERVICE_PORT", "8000")),
            log_level=os.getenv("AI_SERVICE_LOG_LEVEL", "info"),
            llm_enabled=_parse_bool(os.getenv("AI_SERVICE_LLM_ENABLED", "false")),
            llm_provider=os.getenv("AI_SERVICE_LLM_PROVIDER", "openai-compatible"),
            llm_base_url=_normalize_optional(os.getenv("AI_SERVICE_LLM_BASE_URL")),
            llm_api_key=_normalize_optional(os.getenv("AI_SERVICE_LLM_API_KEY")),
            llm_model=_normalize_optional(os.getenv("AI_SERVICE_LLM_MODEL")),
            request_timeout_seconds=int(os.getenv("AI_SERVICE_REQUEST_TIMEOUT_SECONDS", "60")),
            max_input_chars=int(os.getenv("AI_SERVICE_MAX_INPUT_CHARS", "120000")),
        )


def _parse_bool(value: str) -> bool:
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _normalize_optional(value: str | None) -> str | None:
    if value is None:
        return None
    stripped = value.strip()
    return stripped or None


@lru_cache
def get_settings() -> Settings:
    return Settings.from_env()
