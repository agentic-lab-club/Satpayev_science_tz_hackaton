from app.core.errors import AIServiceError


class LLMClient:
    """Template LLM client.

    Real provider calls are intentionally not implemented in the service
    scaffold. Add them only in the AI implementation task.
    """

    def complete(self, _: str) -> str:
        raise AIServiceError(
            code="not_implemented",
            message="LLM client is template-only and has no provider implementation yet.",
            status_code=501,
        )

