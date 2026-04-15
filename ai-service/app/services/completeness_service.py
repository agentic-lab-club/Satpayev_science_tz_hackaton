from __future__ import annotations

from dataclasses import dataclass

from app.rules.required_sections import REQUIRED_SECTIONS, SECTION_LABELS
from app.schemas.common import Section


@dataclass(slots=True)
class CompletenessResult:
    found_sections: list[str]
    missing_sections: list[str]
    weak_sections: list[str]
    empty_sections: list[str]
    matched_required_sections: dict[str, str]

    @property
    def coverage(self) -> float:
        total = len(REQUIRED_SECTIONS)
        if total == 0:
            return 0.0
        return round(len(self.found_sections) / total * 100, 2)


class CompletenessService:
    """Assess whether a document covers the required scientific TZ sections."""

    def analyze(self, sections: list[Section]) -> CompletenessResult:
        matched_required_sections: dict[str, str] = {}
        found_sections: list[str] = []
        weak_sections: list[str] = []
        empty_sections: list[str] = []

        for section in sections:
            if section.key in REQUIRED_SECTIONS:
                matched_required_sections[section.key] = section.title
                found_sections.append(section.key)
                if not section.content_excerpt.strip():
                    empty_sections.append(section.key)
                elif len(section.content_excerpt.strip()) < 90:
                    weak_sections.append(section.key)

        missing_sections = [key for key in REQUIRED_SECTIONS if key not in matched_required_sections]
        return CompletenessResult(
            found_sections=found_sections,
            missing_sections=missing_sections,
            weak_sections=weak_sections,
            empty_sections=empty_sections,
            matched_required_sections=matched_required_sections,
        )

    def template_missing_sections(self) -> list[str]:
        return list(REQUIRED_SECTIONS)

    def template_weak_sections(self) -> list[str]:
        return []

    def label_for(self, key: str) -> str:
        return SECTION_LABELS.get(key, key)


def get_completeness_service() -> CompletenessService:
    return CompletenessService()
