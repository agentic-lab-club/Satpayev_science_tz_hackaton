from app.schemas.common import Finding


class FindingsService:
    """Template findings service."""

    def template_findings(self) -> list[Finding]:
        return [
            Finding(
                finding_type="template_only",
                severity="low",
                explanation="The AI-service template is wired, but real findings are not implemented yet.",
                recommendation="Implement deterministic and LLM-assisted finding generation in a separate task.",
            )
        ]


def get_findings_service() -> FindingsService:
    return FindingsService()

