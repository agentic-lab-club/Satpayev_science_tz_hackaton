"""Algorithmic document structuring without LLM dependency."""

from __future__ import annotations

import logging
import re
from typing import Dict, List, Optional

from tz_mvp.core.config import SectionTemplate, TZAnalysisConfig
from tz_mvp.core.models import Document, Issue, Section, SectionCheck, StructureAnalysis
from tz_mvp.utils.text import compact_fragment, normalize_section_title

LOGGER = logging.getLogger(__name__)

NUMBERED_HEADING_RE = re.compile(r"^\d+(\.\d+)*[\)\.]?\s+[A-Za-zА-Яа-я].{0,120}$")
SHORT_HEADING_RE = re.compile(r"^[A-Za-zА-Яа-я0-9 /-]{3,80}$")


class DocumentStructurer:
    """Builds logical sections and evaluates them against canonical templates."""

    def __init__(self, config: TZAnalysisConfig) -> None:
        self.config = config
        self.template_map = config.template_by_key()

    def analyze(self, document: Document) -> StructureAnalysis:
        """Extracts sections and evaluates structure quality."""

        sections = self._extract_sections(document)
        checks = self._build_checks(sections)
        issues = self._build_issues(checks)
        missing_sections = [check.canonical_key for check in checks if not check.found]
        weak_sections = [check.canonical_key for check in checks if check.is_underfilled or check.is_empty]
        return StructureAnalysis(
            document_id=document.id,
            sections=sections,
            checks=checks,
            missing_sections=missing_sections,
            weak_sections=weak_sections,
            issues=issues,
        )

    def _extract_sections(self, document: Document) -> List[Section]:
        lines = document.normalized_text.splitlines()
        candidates: List[dict] = []
        current_title: Optional[str] = None
        current_content: List[str] = []
        order_index = 1

        def flush() -> None:
            nonlocal order_index, current_title, current_content
            if current_title is None and not current_content:
                return
            title = current_title or f"Раздел {order_index}"
            content = "\n".join(current_content).strip()
            normalized_title = normalize_section_title(title)
            canonical_key = self._match_template(normalized_title, content)
            candidates.append(
                {
                    "title": title,
                    "normalized_title": normalized_title,
                    "content": content,
                    "canonical_key": canonical_key,
                    "order_index": order_index,
                }
            )
            order_index += 1
            current_title = None
            current_content = []

        for raw_line in lines:
            line = raw_line.strip()
            if not line:
                if current_content:
                    current_content.append("")
                continue
            if self._is_heading(line):
                flush()
                current_title = line
            else:
                current_content.append(line)

        flush()

        if not candidates and document.normalized_text.strip():
            content = document.normalized_text.strip()
            canonical_key = self._match_template("общее описание", content)
            candidates.append(
                {
                    "title": "Общее описание",
                    "normalized_title": "общее описание",
                    "content": content,
                    "canonical_key": canonical_key,
                    "order_index": 1,
                }
            )

        sections: List[Section] = []
        for candidate in candidates:
            content = candidate["content"].strip()
            sections.append(
                Section(
                    document_id=document.id,
                    title=candidate["title"],
                    normalized_title=candidate["normalized_title"],
                    order_index=candidate["order_index"],
                    content=content,
                    char_count=len(content),
                    is_empty=len(content) < 20,
                    canonical_key=candidate["canonical_key"],
                )
            )
        return sections

    def _is_heading(self, line: str) -> bool:
        normalized = normalize_section_title(line)
        if not normalized:
            return False
        if any(normalized == normalize_section_title(synonym) for template in self.config.section_templates for synonym in template.synonyms):
            return True
        if NUMBERED_HEADING_RE.match(line):
            return True
        if SHORT_HEADING_RE.match(line) and len(line.split()) <= 8 and len(line) < 80:
            return normalized in {
                normalize_section_title(template.display_name)
                for template in self.config.section_templates
            } or any(
                normalized.startswith(normalize_section_title(synonym))
                for template in self.config.section_templates
                for synonym in template.synonyms
            )
        return False

    def _match_template(self, normalized_title: str, content: str) -> Optional[str]:
        content_lc = content.lower()
        best_key: Optional[str] = None
        best_score = 0
        for template in self.config.section_templates:
            score = 0
            template_names = [template.display_name, *template.synonyms]
            if any(normalized_title == normalize_section_title(name) for name in template_names):
                score += 5
            if any(normalized_title.startswith(normalize_section_title(name)) for name in template_names):
                score += 3
            score += sum(1 for keyword in template.expected_keywords if keyword.lower() in content_lc)
            if score > best_score:
                best_key = template.key
                best_score = score
        return best_key

    def _build_checks(self, sections: List[Section]) -> List[SectionCheck]:
        by_key: Dict[str, Section] = {}
        for section in sections:
            if section.canonical_key and section.canonical_key not in by_key:
                by_key[section.canonical_key] = section

        checks: List[SectionCheck] = []
        detected_order_by_key = {
            section.canonical_key: section.order_index
            for section in sections
            if section.canonical_key
        }

        expected_sequence = [
            template.key for template in sorted(self.config.section_templates, key=lambda item: item.order_index)
        ]
        detected_sequence = [
            key for key, _ in sorted(detected_order_by_key.items(), key=lambda item: item[1]) if key in expected_sequence
        ]

        for template in sorted(self.config.section_templates, key=lambda item: item.order_index):
            section = by_key.get(template.key)
            found = section is not None
            adequacy_ratio = 0.0
            notes: List[str] = []
            if found and template.min_char_count:
                adequacy_ratio = min(1.0, section.char_count / template.min_char_count)
            if found and section.is_empty:
                notes.append("Раздел почти пустой")
            elif found and adequacy_ratio < self.config.weak_section_ratio:
                notes.append("Раздел заполнен недостаточно подробно")
            if not found:
                notes.append("Обязательный раздел не найден")
            in_expected_order = True
            if found:
                expected_position = expected_sequence.index(template.key)
                actual_position = detected_sequence.index(template.key) if template.key in detected_sequence else expected_position
                in_expected_order = actual_position == expected_position or actual_position >= expected_position
                if not in_expected_order:
                    notes.append("Раздел найден вне ожидаемой логической последовательности")
            checks.append(
                SectionCheck(
                    canonical_key=template.key,
                    display_name=template.display_name,
                    found=found,
                    section_id=section.id if section else None,
                    section_title=section.title if section else None,
                    is_empty=section.is_empty if section else False,
                    is_underfilled=(adequacy_ratio < self.config.weak_section_ratio and found) or False,
                    in_expected_order=in_expected_order,
                    expected_order_index=template.order_index,
                    detected_order_index=section.order_index if section else None,
                    char_count=section.char_count if section else 0,
                    adequacy_ratio=adequacy_ratio,
                    notes=notes,
                )
            )
        return checks

    def _build_issues(self, checks: List[SectionCheck]) -> List[Issue]:
        issues: List[Issue] = []
        for check in checks:
            if not check.found:
                issues.append(
                    Issue(
                        issue_type="missing_section",
                        severity="high",
                        section_id=None,
                        section_title=check.display_name,
                        quote_text=check.display_name,
                        explanation=f"В документе отсутствует обязательный раздел '{check.display_name}'.",
                        recommendation=f"Добавьте раздел '{check.display_name}' и опишите его содержимое в деловом стиле.",
                    )
                )
            elif check.is_empty:
                issues.append(
                    Issue(
                        issue_type="empty_section",
                        severity="high",
                        section_id=check.section_id,
                        section_title=check.section_title,
                        quote_text=check.section_title or check.display_name,
                        explanation=f"Раздел '{check.section_title}' найден, но почти не содержит полезного содержимого.",
                        recommendation="Заполните раздел конкретными фактами, требованиями или параметрами.",
                    )
                )
            elif check.is_underfilled:
                issues.append(
                    Issue(
                        issue_type="weak_section",
                        severity="medium",
                        section_id=check.section_id,
                        section_title=check.section_title,
                        quote_text=check.section_title or check.display_name,
                        explanation=f"Раздел '{check.section_title}' выглядит недостаточно подробным для уверенной интерпретации ТЗ.",
                        recommendation="Добавьте детали, критерии, ограничения или измеримые параметры.",
                    )
                )
            elif not check.in_expected_order:
                issues.append(
                    Issue(
                        issue_type="order_issue",
                        severity="low",
                        section_id=check.section_id,
                        section_title=check.section_title,
                        quote_text=check.section_title or check.display_name,
                        explanation="Раздел расположен вне ожидаемой логической последовательности шаблона ТЗ.",
                        recommendation="Переставьте раздел ближе к стандартной структуре: контекст -> цель -> задачи -> требования -> сроки -> KPI -> результаты.",
                    )
                )
        LOGGER.info("Structural analysis produced %s issues", len(issues))
        return issues

    def section_lookup(self, structure: StructureAnalysis) -> Dict[str, Section]:
        """Helper for other modules."""

        return {section.id: section for section in structure.sections}

    def canonical_lookup(self, structure: StructureAnalysis) -> Dict[str, Section]:
        """Returns first section per canonical key."""

        lookup: Dict[str, Section] = {}
        for section in structure.sections:
            if section.canonical_key and section.canonical_key not in lookup:
                lookup[section.canonical_key] = section
        return lookup

    def preview_sections(self, structure: StructureAnalysis) -> List[dict]:
        """Small JSON-like preview used by notebook/debug output."""

        return [
            {
                "title": section.title,
                "canonical_key": section.canonical_key,
                "char_count": section.char_count,
                "preview": compact_fragment(section.content),
            }
            for section in structure.sections
        ]
