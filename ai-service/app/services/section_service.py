from app.schemas.common import Section


class SectionService:
    """Template section service."""

    def template_sections(self) -> list[Section]:
        return []


def get_section_service() -> SectionService:
    return SectionService()

