from __future__ import annotations

import re
from dataclasses import dataclass

from app.rules.required_sections import REQUIRED_SECTIONS, SECTION_LABELS
from app.rules.vague_patterns import VAGUE_PATTERNS
from app.schemas.common import (
    Finding,
    NotebookEntity,
    NotebookEntityBundle,
    NotebookSemantic,
    NotebookSemanticIssue,
    Section,
)


@dataclass(slots=True)
class FindingsResult:
    semantic: NotebookSemantic
    findings: list[Finding]
    extracted_entities: NotebookEntityBundle
    confirmed_entities: NotebookEntityBundle


class FindingsService:
    """Generate deterministic semantic findings and entity bundles."""

    def analyze(self, text: str, sections: list[Section], matched_required_sections: dict[str, str]) -> FindingsResult:
        section_lookup = {section.key: section for section in sections}
        requirement_lines = self._extract_requirement_lines(text)
        deadline_lines = self._extract_deadline_lines(text)
        kpi_lines = self._extract_kpi_lines(text)
        expected_lines = self._extract_expected_result_lines(text)

        ambiguities = self._build_ambiguities(text, sections)
        contradictions = self._build_contradictions(text)
        missing_elements = self._build_missing_elements(matched_required_sections, kpi_lines, expected_lines)

        requirements = [
            NotebookSemanticIssue(
                issue_type="requirement",
                section=self._section_for_line(line, sections),
                quote=line,
                explanation="Requirement extracted from the document.",
                recommendation="Keep the requirement measurable and tied to a concrete deliverable.",
            )
            for line in requirement_lines
        ]
        deadlines = [
            NotebookSemanticIssue(
                issue_type="deadline",
                section=self._section_for_line(line, sections),
                quote=line,
                explanation="Deadline or duration extracted from the document.",
                recommendation="Keep deadlines explicit and tied to deliverables.",
            )
            for line in deadline_lines
        ]
        kpis = [
            NotebookSemanticIssue(
                issue_type="kpi",
                section=self._section_for_line(line, sections),
                quote=line,
                explanation="Quantitative indicator extracted from the document.",
                recommendation="Make the KPI measurable and verifiable.",
            )
            for line in kpi_lines
        ]
        expected_results = [
            NotebookSemanticIssue(
                issue_type="expected_result",
                section=self._section_for_line(line, sections),
                quote=line,
                explanation="Expected result extracted from the document.",
                recommendation="Describe the expected result in a verifiable form.",
            )
            for line in expected_lines
        ]

        semantic = NotebookSemantic(
            ambiguities=ambiguities,
            contradictions=contradictions,
            missing_elements=missing_elements,
            requirements=requirements,
            deadlines=deadlines,
            kpis=kpis,
            expected_results=expected_results,
        )
        findings = self._build_findings(ambiguous=ambiguities, contradictions=contradictions, missing_elements=missing_elements)
        extracted = self._bundle_entities(requirement_lines, deadline_lines, kpi_lines, expected_lines, sections)
        confirmed = self._confirm_entities(extracted)
        return FindingsResult(
            semantic=semantic,
            findings=findings,
            extracted_entities=extracted,
            confirmed_entities=confirmed,
        )

    def template_findings(self) -> list[Finding]:
        return [
            Finding(
                finding_type="missing_section",
                severity="medium",
                section_key="quantitative_indicators",
                quote="KPI",
                explanation="Quantitative indicators are required for a usable scientific TZ analysis.",
                recommendation="Add measurable KPIs with units and acceptance thresholds.",
            )
        ]

    def _build_ambiguities(self, text: str, sections: list[Section]) -> list[NotebookSemanticIssue]:
        issues: list[NotebookSemanticIssue] = []
        lowered = text.lower()
        seen: set[str] = set()
        for phrase, recommendation in VAGUE_PATTERNS.items():
            if phrase in lowered and phrase not in seen:
                seen.add(phrase)
                issues.append(
                    NotebookSemanticIssue(
                        issue_type="ambiguity",
                        section=self._section_for_phrase(phrase, sections),
                        quote=self._quote_for_phrase(text, phrase),
                        explanation=f"Vague wording detected: {phrase}.",
                        recommendation=recommendation,
                    )
                )
        if "достаточно" in lowered and "метрик" in lowered:
            issues.append(
                NotebookSemanticIssue(
                    issue_type="ambiguity",
                    section=self._section_for_phrase("метрик", sections),
                    quote=self._quote_for_phrase(text, "достаточно"),
                    explanation="Quantitative criteria are still subjective.",
                    recommendation="Replace the qualifier with a numeric target.",
                )
            )
        return issues

    def _build_contradictions(self, text: str) -> list[NotebookSemanticIssue]:
        lowered = text.lower()
        issues: list[NotebookSemanticIssue] = []
        if "пилот" in lowered and "промышлен" in lowered and ("без отдельного этапа" in lowered or "одновременно" in lowered):
            issues.append(
                NotebookSemanticIssue(
                    issue_type="contradiction",
                    section="goals",
                    quote=self._quote_for_phrase(text, "пилот"),
                    explanation="The document mixes pilot and production rollout in the same step.",
                    recommendation="Split pilot validation and production rollout into separate phases.",
                )
            )
        if "как можно скорее" in lowered and any(token in lowered for token in ("14 дней", "14 календарных дней", "2 недели")):
            issues.append(
                NotebookSemanticIssue(
                    issue_type="contradiction",
                    section="deadlines",
                    quote=self._quote_for_phrase(text, "как можно скорее"),
                    explanation="An open-ended deadline conflicts with an explicit duration.",
                    recommendation="Keep one concrete deadline and remove the vague expression.",
                )
            )
        return issues

    def _build_missing_elements(
        self,
        matched_required_sections: dict[str, str],
        kpi_lines: list[str],
        expected_lines: list[str],
    ) -> list[NotebookSemanticIssue]:
        issues: list[NotebookSemanticIssue] = []
        for key in REQUIRED_SECTIONS:
            if key not in matched_required_sections:
                issues.append(
                    NotebookSemanticIssue(
                        issue_type="missing_section",
                        section=key,
                        quote=SECTION_LABELS.get(key, key),
                        explanation=f"Missing required section: {SECTION_LABELS.get(key, key)}.",
                        recommendation="Add the missing section with concrete content and measurable criteria.",
                    )
                )
        if not kpi_lines:
            issues.append(
                NotebookSemanticIssue(
                    issue_type="missing_kpi",
                    section="quantitative_indicators",
                    quote="KPI",
                    explanation="No quantitative indicators were detected.",
                    recommendation="Add numeric indicators with thresholds, units, and expected target values.",
                )
            )
        if not expected_lines:
            issues.append(
                NotebookSemanticIssue(
                    issue_type="missing_expected_result",
                    section="final_result",
                    quote="expected results",
                    explanation="No expected results were detected.",
                    recommendation="Describe the final deliverable and the outcome in measurable terms.",
                )
            )
        return issues

    def _build_findings(
        self,
        ambiguous: list[NotebookSemanticIssue],
        contradictions: list[NotebookSemanticIssue],
        missing_elements: list[NotebookSemanticIssue],
    ) -> list[Finding]:
        findings: list[Finding] = []
        for issue in ambiguous:
            findings.append(
                Finding(
                    finding_type="vague_statement",
                    severity="medium",
                    section_key=issue.section or None,
                    quote=issue.quote,
                    explanation=issue.explanation,
                    recommendation=issue.recommendation,
                )
            )
        for issue in contradictions:
            findings.append(
                Finding(
                    finding_type="inconsistency",
                    severity="high",
                    section_key=issue.section or None,
                    quote=issue.quote,
                    explanation=issue.explanation,
                    recommendation=issue.recommendation,
                )
            )
        for issue in missing_elements:
            severity = "high" if issue.issue_type in {"missing_kpi", "missing_expected_result"} else "medium"
            findings.append(
                Finding(
                    finding_type=issue.issue_type,
                    severity=severity,
                    section_key=issue.section or None,
                    quote=issue.quote,
                    explanation=issue.explanation,
                    recommendation=issue.recommendation,
                )
            )
        return findings

    def _bundle_entities(
        self,
        requirement_lines: list[str],
        deadline_lines: list[str],
        kpi_lines: list[str],
        expected_lines: list[str],
        sections: list[Section],
    ) -> NotebookEntityBundle:
        return NotebookEntityBundle(
            requirements=[self._entity(line, sections, confidence=self._confidence(line, 0.86)) for line in requirement_lines],
            deadlines=[self._entity(line, sections, confidence=self._confidence(line, 0.82)) for line in deadline_lines],
            kpis=[self._entity(line, sections, confidence=self._confidence(line, 0.84)) for line in kpi_lines],
            expected_results=[self._entity(line, sections, confidence=self._confidence(line, 0.8)) for line in expected_lines],
        )

    def _confirm_entities(self, extracted: NotebookEntityBundle) -> NotebookEntityBundle:
        return NotebookEntityBundle(
            requirements=[entity for entity in extracted.requirements if entity.confidence >= 0.7],
            deadlines=[entity for entity in extracted.deadlines if entity.confidence >= 0.7],
            kpis=[entity for entity in extracted.kpis if entity.confidence >= 0.7],
            expected_results=[entity for entity in extracted.expected_results if entity.confidence >= 0.7],
        )

    def _extract_requirement_lines(self, text: str) -> list[str]:
        return self._extract_matching_lines(
            text,
            patterns=(r"\bдолжен\b", r"\bнеобходимо\b", r"\bтребуется\b", r"\bследует\b", r"\bобеспечить\b", r"\bреализовать\b"),
        )

    def _extract_deadline_lines(self, text: str) -> list[str]:
        lines = self._extract_matching_lines(
            text,
            patterns=(r"\b\d+\s*(?:календарн(?:ых|ые|ый)?\s*)?(?:дн(?:ей|я)?|недел(?:ь|и)|месяц(?:а|ев)?|год(?:а|ов)?)\b", r"\b\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b"),
        )
        if "срок" in text.lower():
            lines.extend(line for line in self._line_candidates(text) if "срок" in line.lower())
        return self._dedupe(lines)

    def _extract_kpi_lines(self, text: str) -> list[str]:
        return self._extract_matching_lines(
            text,
            patterns=(
                r"\bkpi\b",
                r"\bпоказател",
                r"\bметрик",
                r"\bне менее\b",
                r"\bне более\b",
                r"\b\d+\s*%",
                r"\b\d+\s*(?:шт|ед|чел|тенге|kzt|руб)\b",
            ),
        )

    def _extract_expected_result_lines(self, text: str) -> list[str]:
        return self._extract_matching_lines(
            text,
            patterns=(r"\bожида", r"\bконечн", r"\bитогов", r"\bрезультат", r"\bвыходн", r"\bdeliverable"),
        )

    def _extract_matching_lines(self, text: str, patterns: tuple[str, ...]) -> list[str]:
        lines: list[str] = []
        for line in self._line_candidates(text):
            lowered = line.lower()
            if any(re.search(pattern, lowered) for pattern in patterns):
                lines.append(line)
        return self._dedupe(lines)

    def _line_candidates(self, text: str) -> list[str]:
        return [line.strip() for line in re.split(r"\r?\n", text) if line.strip()]

    def _section_for_phrase(self, phrase: str, sections: list[Section]) -> str:
        lowered = phrase.lower()
        for section in sections:
            content = f"{section.title}\n{section.content_excerpt}".lower()
            if lowered in content:
                return section.key
        return ""

    def _section_for_line(self, line: str, sections: list[Section]) -> str:
        lowered = line.lower()
        for section in sections:
            content = f"{section.title}\n{section.content_excerpt}".lower()
            if lowered in content:
                return section.key
        return ""

    def _quote_for_phrase(self, text: str, phrase: str) -> str:
        lowered = text.lower()
        index = lowered.find(phrase.lower())
        if index == -1:
            return phrase
        return text[max(0, index - 40) : min(len(text), index + len(phrase) + 40)]

    def _entity(self, value: str, sections: list[Section], confidence: float) -> NotebookEntity:
        return NotebookEntity(value=value, section=self._section_for_line(value, sections), confidence=confidence)

    def _confidence(self, value: str, fallback: float) -> float:
        if re.search(r"\d", value):
            return min(1.0, fallback + 0.08)
        return fallback

    def _dedupe(self, values: list[str]) -> list[str]:
        seen: set[str] = set()
        result: list[str] = []
        for value in values:
            normalized = value.lower()
            if normalized not in seen:
                seen.add(normalized)
                result.append(value)
        return result


def get_findings_service() -> FindingsService:
    return FindingsService()
