from __future__ import annotations

import re
from dataclasses import dataclass

from app.rules.required_sections import REQUIRED_SECTIONS, SECTION_KEYWORDS, SECTION_LABELS
from app.schemas.common import Section


@dataclass(slots=True)
class SectionDetectionResult:
    sections: list[Section]
    matched_required_sections: dict[str, str]


class SectionService:
    """Detect structure and map sections to the required scientific TZ catalog."""

    def detect_sections(self, text: str) -> SectionDetectionResult:
        lines = [line.strip() for line in re.split(r"\r?\n", text) if line.strip()]
        sections: list[Section] = []
        current_title = "Document body"
        current_key = "document_body"
        current_lines: list[str] = []
        current_start = 0
        matched_required_sections: dict[str, str] = {}

        for index, line in enumerate(lines):
            if self._looks_like_heading(line):
                if current_lines or sections:
                    sections.append(self._build_section(current_key, current_title, current_lines, current_start, index))
                current_title = self._normalize_heading(line)
                current_key = self._match_section_key(current_title)
                current_lines = []
                current_start = index
                continue
            current_lines.append(line)

        if current_lines or not sections:
            sections.append(self._build_section(current_key, current_title, current_lines, current_start, len(lines)))

        for section in sections:
            key = self._match_section_key(section.title)
            if key in REQUIRED_SECTIONS and key not in matched_required_sections:
                matched_required_sections[key] = section.title

        return SectionDetectionResult(sections=sections, matched_required_sections=matched_required_sections)

    def template_sections(self) -> list[Section]:
        return [
            Section(
                key=key,
                title=SECTION_LABELS.get(key, key),
                content_excerpt="",
                start_index=None,
                end_index=None,
                confidence=0.0,
            )
            for key in REQUIRED_SECTIONS
        ]

    def _build_section(self, key: str, title: str, lines: list[str], start: int, end: int) -> Section:
        content = "\n".join(lines).strip()
        excerpt = content[:280]
        confidence = 1.0 if key in REQUIRED_SECTIONS else 0.68 if lines else 0.15
        return Section(
            key=key,
            title=title,
            content_excerpt=excerpt,
            start_index=start,
            end_index=end,
            confidence=confidence,
        )

    def _looks_like_heading(self, line: str) -> bool:
        normalized = line.strip()
        if not normalized:
            return False
        if re.match(r"^\d+(\.\d+)*\s*[\).:-]?\s+.+$", normalized):
            return True
        if len(normalized) <= 120 and normalized.endswith(":"):
            return True
        if len(normalized) <= 80 and normalized.isupper():
            return True
        lowered = normalized.lower()
        if len(normalized) <= 80 and not normalized.endswith((".", "!", "?")):
            return any(keyword in lowered for keywords in SECTION_KEYWORDS.values() for keyword in keywords)
        return False

    def _normalize_heading(self, line: str) -> str:
        normalized = re.sub(r"^\d+(\.\d+)*\s*[\).:-]?\s*", "", line).strip()
        return normalized or line.strip()

    def _match_section_key(self, title: str) -> str:
        lowered = title.lower()
        for key, keywords in SECTION_KEYWORDS.items():
            if any(keyword in lowered for keyword in keywords):
                return key
        slug = re.sub(r"[^a-z0-9а-я]+", "_", lowered).strip("_")
        return slug or "section"


def get_section_service() -> SectionService:
    return SectionService()
