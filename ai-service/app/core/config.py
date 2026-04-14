from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    service_name: str = "satpayev-ai-service"
    version: str = "0.1.0"
    environment: str = Field(default="local", alias="AI_SERVICE_ENV")
    host: str = Field(default="0.0.0.0", alias="AI_SERVICE_HOST")
    port: int = Field(default=8000, alias="AI_SERVICE_PORT")
    log_level: str = Field(default="info", alias="AI_SERVICE_LOG_LEVEL")
    llm_enabled: bool = Field(default=False, alias="AI_SERVICE_LLM_ENABLED")
    llm_provider: str = Field(default="openai-compatible", alias="AI_SERVICE_LLM_PROVIDER")
    llm_base_url: str | None = Field(default=None, alias="AI_SERVICE_LLM_BASE_URL")
    llm_api_key: str | None = Field(default=None, alias="AI_SERVICE_LLM_API_KEY")
    llm_model: str | None = Field(default=None, alias="AI_SERVICE_LLM_MODEL")
    request_timeout_seconds: int = Field(default=60, alias="AI_SERVICE_REQUEST_TIMEOUT_SECONDS")
    max_input_chars: int = Field(default=120_000, alias="AI_SERVICE_MAX_INPUT_CHARS")
    cors_origins: list[str] = ["*"]


@lru_cache
def get_settings() -> Settings:
    return Settings()

