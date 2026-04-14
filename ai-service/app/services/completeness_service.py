from app.rules.required_sections import REQUIRED_SECTIONS


class CompletenessService:
    """Template completeness service."""

    def template_missing_sections(self) -> list[str]:
        return list(REQUIRED_SECTIONS)

    def template_weak_sections(self) -> list[str]:
        return []


def get_completeness_service() -> CompletenessService:
    return CompletenessService()

