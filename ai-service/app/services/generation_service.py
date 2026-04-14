from app.schemas.generate import GenerateRequest, GenerateResponse


class GenerationService:
    """Template generation service."""

    def generate(self, request: GenerateRequest) -> GenerateResponse:
        return GenerateResponse(
            mode=request.mode,
            title="Template generation placeholder",
            content="Generation is not implemented yet. This endpoint currently validates the contract only.",
            summary_of_changes=["No changes generated because this is a template-only service."],
        )

    def template_suggested_structure(self) -> str:
        return "Template placeholder. Suggested TZ structure generation is not implemented yet."

    def template_improved_text(self) -> str:
        return "Template placeholder. Improved text generation is not implemented yet."


def get_generation_service() -> GenerationService:
    return GenerationService()

