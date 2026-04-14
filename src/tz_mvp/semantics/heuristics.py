"""Offline heuristic semantic analysis for the MVP."""

from __future__ import annotations

import re
from collections import Counter, defaultdict
from typing import Dict, Iterable, List, Sequence

from tz_mvp.core.config import TZAnalysisConfig
from tz_mvp.core.models import ExtractedEntity, Issue, Section, StructureAnalysis
from tz_mvp.utils.text import compact_fragment, keyword_overlap, normalize_section_title, split_into_sentences

DATE_RE = re.compile(
    r"(\d{1,2}[./]\d{1,2}[./]\d{2,4}|\d{4}-\d{2}-\d{2}|"
    r"\d+\s+(?:календарных\s+)?(?:дней|недель|месяцев|месяца|дня)|"
    r"(?:январ[ья]|феврал[ья]|март[а]?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|август[а]?|сентябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья]))",
    re.IGNORECASE,
)
KPI_RE = re.compile(
    r"(\d+(?:[.,]\d+)?\s*%|\d+(?:[.,]\d+)?\s*(?:часов|часа|час|дней|дня|день|минут|чел|пользователей|документов|проектов|шт))",
    re.IGNORECASE,
)
REQUIREMENT_LINE_RE = re.compile(
    r"^\s*(?:[-*]|\d+[\).\s])\s*(.+)$|(.+\b(?:должен|должна|должны|необходимо|требуется|обеспечить|поддерживать)\b.+)$",
    re.IGNORECASE,
)
RESULT_RE = re.compile(
    r"(.+\b(?:результат|итог|получен|достигнут|готов|сформирован|внедрен|внедрён|подготовлен)\b.+)",
    re.IGNORECASE,
)


class HeuristicSemanticEngine:
    """Deterministic semantic analysis used even when LLM is disabled."""

    def __init__(self, config: TZAnalysisConfig) -> None:
        self.config = config

    def classify_sections_semantically(self, sections: Sequence[Section]) -> Dict[str, str]:
        """Assigns canonical labels using title/content heuristics."""

        classification: Dict[str, str] = {}
        for section in sections:
            if section.canonical_key:
                classification[section.id] = section.canonical_key
                continue
            normalized_title = normalize_section_title(section.title)
            best_key = "context"
            best_score = 0
            for template in self.config.section_templates:
                score = sum(
                    1
                    for synonym in [template.display_name, *template.synonyms]
                    if normalize_section_title(synonym) in normalized_title
                )
                score += sum(
                    1 for keyword in template.expected_keywords if keyword.lower() in section.content.lower()
                )
                if score > best_score:
                    best_key = template.key
                    best_score = score
            classification[section.id] = best_key
        return classification

    def detect_ambiguities(self, sections: Sequence[Section]) -> List[Issue]:
        """Detects vague wording within sections."""

        issues: List[Issue] = []
        for section in sections:
            for sentence in split_into_sentences(section.content):
                lower = sentence.lower()
                hits = [term for term in self.config.vague_terms if term in lower]
                if hits:
                    issues.append(
                        Issue(
                            issue_type="ambiguity",
                            severity="medium",
                            section_id=section.id,
                            section_title=section.title,
                            quote_text=compact_fragment(sentence),
                            explanation=f"Формулировка содержит размытые выражения: {', '.join(hits)}.",
                            recommendation="Замените оценочные слова на измеримые сроки, критерии или параметры.",
                        )
                    )
        return issues

    def extract_requirements(self, document_id: str, sections: Sequence[Section]) -> List[ExtractedEntity]:
        """Extracts requirements from requirement-like lines."""

        entities: List[ExtractedEntity] = []
        for section in sections:
            if section.canonical_key not in {"requirements", "tasks"} and "треб" not in section.normalized_title:
                continue
            for line in section.content.splitlines():
                match = REQUIREMENT_LINE_RE.match(line.strip())
                if not match:
                    continue
                raw = next(group for group in match.groups() if group)
                entities.append(
                    ExtractedEntity(
                        document_id=document_id,
                        entity_type="requirement",
                        raw_value=raw.strip(),
                        normalized_value=raw.strip().rstrip("."),
                        source_section_id=section.id,
                        source_section_title=section.title,
                        confidence=0.72,
                    )
                )
        return self._dedupe_entities(entities)

    def extract_deadlines(self, document_id: str, sections: Sequence[Section]) -> List[ExtractedEntity]:
        """Extracts time constraints and deadlines."""

        entities: List[ExtractedEntity] = []
        for section in sections:
            if section.canonical_key not in {"deadlines", "tasks", "requirements"} and "срок" not in section.normalized_title:
                continue
            for match in DATE_RE.finditer(section.content):
                raw = match.group(0).strip()
                entities.append(
                    ExtractedEntity(
                        document_id=document_id,
                        entity_type="deadline",
                        raw_value=raw,
                        normalized_value=raw,
                        source_section_id=section.id,
                        source_section_title=section.title,
                        confidence=0.8,
                    )
                )
        return self._dedupe_entities(entities)

    def extract_kpis(self, document_id: str, sections: Sequence[Section]) -> List[ExtractedEntity]:
        """Extracts KPI-like measurable statements."""

        entities: List[ExtractedEntity] = []
        for section in sections:
            is_candidate = section.canonical_key in {"kpi", "expected_results", "requirements"}
            if not is_candidate and "kpi" not in section.normalized_title and "показ" not in section.normalized_title:
                continue
            for line in section.content.splitlines():
                if KPI_RE.search(line) or any(token in line.lower() for token in ["kpi", "метрик", "показател"]):
                    entities.append(
                        ExtractedEntity(
                            document_id=document_id,
                            entity_type="kpi",
                            raw_value=line.strip(),
                            normalized_value=line.strip().rstrip("."),
                            source_section_id=section.id,
                            source_section_title=section.title,
                            confidence=0.7 if KPI_RE.search(line) else 0.55,
                        )
                    )
        return self._dedupe_entities(entities)

    def extract_expected_results(self, document_id: str, sections: Sequence[Section]) -> List[ExtractedEntity]:
        """Extracts expected outcomes or delivered artifacts."""

        entities: List[ExtractedEntity] = []
        for section in sections:
            if section.canonical_key not in {"expected_results", "final_product", "goal"} and "результ" not in section.normalized_title:
                continue
            for line in section.content.splitlines():
                stripped = line.strip()
                if not stripped:
                    continue
                if stripped.startswith(("-", "*")) or RESULT_RE.search(stripped):
                    entities.append(
                        ExtractedEntity(
                            document_id=document_id,
                            entity_type="expected_result",
                            raw_value=stripped.lstrip("-* ").strip(),
                            normalized_value=stripped.lstrip("-* ").strip().rstrip("."),
                            source_section_id=section.id,
                            source_section_title=section.title,
                            confidence=0.75,
                        )
                    )
        return self._dedupe_entities(entities)

    def detect_missing_requirements(
        self,
        structure: StructureAnalysis,
        requirements: Sequence[ExtractedEntity],
        deadlines: Sequence[ExtractedEntity],
        kpis: Sequence[ExtractedEntity],
        results: Sequence[ExtractedEntity],
    ) -> List[Issue]:
        """Creates semantic issues for missing critical content blocks."""

        issues: List[Issue] = []
        if not requirements:
            issues.append(
                Issue(
                    issue_type="missing_requirements",
                    severity="high",
                    section_title="Требования",
                    quote_text="Раздел требований отсутствует или не содержит явных требований.",
                    explanation="Система не смогла извлечь ни одного подтверждаемого требования.",
                    recommendation="Добавьте список функциональных и нефункциональных требований в проверяемой форме.",
                )
            )
        if not deadlines:
            issues.append(
                Issue(
                    issue_type="missing_deadline",
                    severity="high",
                    section_title="Сроки",
                    quote_text="Сроки не извлечены",
                    explanation="В документе нет явного срока, этапов или календарного ограничения.",
                    recommendation="Добавьте дату завершения или календарный план с этапами.",
                )
            )
        if not kpis:
            issues.append(
                Issue(
                    issue_type="missing_kpi",
                    severity="high",
                    section_title="KPI / показатели",
                    quote_text="KPI не извлечены",
                    explanation="В ТЗ нет измеримых KPI или критериев успеха.",
                    recommendation="Добавьте 2-5 измеримых показателей с целевыми значениями и методом расчета.",
                )
            )
        if not results:
            issues.append(
                Issue(
                    issue_type="missing_expected_result",
                    severity="high",
                    section_title="Ожидаемые результаты",
                    quote_text="Ожидаемые результаты не извлечены",
                    explanation="Документ не фиксирует ожидаемый результат, артефакт или продукт проекта.",
                    recommendation="Опишите ожидаемые результаты, конечные поставки и критерии приемки.",
                )
            )
        return issues

    def detect_logical_gaps(
        self,
        canonical_sections: Dict[str, Section],
        requirements: Sequence[ExtractedEntity],
        kpis: Sequence[ExtractedEntity],
        results: Sequence[ExtractedEntity],
    ) -> List[Issue]:
        """Detects missing logical links between sections."""

        issues: List[Issue] = []
        goal = canonical_sections.get("goal")
        tasks = canonical_sections.get("tasks")
        final_product = canonical_sections.get("final_product")
        if goal and tasks and keyword_overlap(goal.content, tasks.content) < 0.08:
            issues.append(
                Issue(
                    issue_type="logical_gap",
                    severity="medium",
                    section_id=tasks.id,
                    section_title=tasks.title,
                    quote_text=compact_fragment(tasks.content),
                    explanation="Задачи слабо связаны с заявленной целью проекта.",
                    recommendation="Переформулируйте задачи так, чтобы каждая явно вела к достижению цели.",
                )
            )
        if final_product and not results:
            issues.append(
                Issue(
                    issue_type="logical_gap",
                    severity="medium",
                    section_id=final_product.id,
                    section_title=final_product.title,
                    quote_text=compact_fragment(final_product.content),
                    explanation="Описан итоговый продукт, но не зафиксированы ожидаемые результаты или критерии приемки.",
                    recommendation="Добавьте раздел с ожидаемыми результатами и условиями приемки продукта.",
                )
            )
        if requirements and not kpis:
            issues.append(
                Issue(
                    issue_type="logical_gap",
                    severity="medium",
                    section_title="Требования / KPI",
                    quote_text="Есть требования, но нет KPI.",
                    explanation="Требования не подкреплены измеримыми критериями выполнения.",
                    recommendation="Свяжите ключевые требования с KPI или критериями приемки.",
                )
            )
        return issues

    def detect_contradictions(
        self,
        canonical_sections: Dict[str, Section],
        requirements: Sequence[ExtractedEntity],
        deadlines: Sequence[ExtractedEntity],
        kpis: Sequence[ExtractedEntity],
        results: Sequence[ExtractedEntity],
    ) -> List[Issue]:
        """Detects simple contradictions across sections."""

        issues: List[Issue] = []
        tasks = canonical_sections.get("tasks")
        results_section = canonical_sections.get("expected_results")
        deadlines_section = canonical_sections.get("deadlines")
        goal = canonical_sections.get("goal")

        if tasks and "без отдельного этапа пилотирования" in tasks.content.lower():
            pilot_mentions = [
                entity for entity in results if "пилот" in entity.normalized_value.lower()
            ]
            if pilot_mentions:
                issues.append(
                    Issue(
                        issue_type="contradiction",
                        severity="high",
                        section_id=tasks.id,
                        section_title=tasks.title,
                        quote_text="подготовить пилот и одновременно запустить промышленную эксплуатацию без отдельного этапа пилотирования",
                        conflicting_quote_text=pilot_mentions[0].normalized_value,
                        explanation="В задачах отрицается отдельный этап пилотирования, но в ожидаемых результатах фигурирует пилотный сценарий.",
                        recommendation="Уточните, предусмотрен ли пилотный этап, и приведите задачи и результаты к единой логике.",
                    )
                )

        if deadlines_section and requirements:
            short_deadline = any("14 календарных дней" in item.normalized_value.lower() for item in deadlines)
            if short_deadline and len(requirements) >= 5:
                issues.append(
                    Issue(
                        issue_type="contradiction",
                        severity="medium",
                        section_id=deadlines_section.id,
                        section_title=deadlines_section.title,
                        quote_text=compact_fragment(deadlines_section.content),
                        conflicting_quote_text=f"Количество выявленных требований: {len(requirements)}",
                        explanation="Срок выглядит слишком сжатым относительно заявленного объема функций и deliverables.",
                        recommendation="Уточните этапность работ, MVP-границы или увеличьте срок выполнения.",
                    )
                )

        if goal and results_section and keyword_overlap(goal.content, results_section.content) < 0.05:
            issues.append(
                Issue(
                    issue_type="contradiction",
                    severity="medium",
                    section_id=results_section.id,
                    section_title=results_section.title,
                    quote_text=compact_fragment(results_section.content),
                    conflicting_quote_text=compact_fragment(goal.content),
                    explanation="Ожидаемые результаты слабо согласованы с формулировкой цели.",
                    recommendation="Проверьте, что результаты напрямую подтверждают достижение цели проекта.",
                )
            )

        if kpis and results:
            kpi_tokens = Counter(
                token
                for entity in kpis
                for token in re.findall(r"[a-zа-я0-9]{4,}", entity.normalized_value.lower(), flags=re.IGNORECASE)
            )
            result_tokens = Counter(
                token
                for entity in results
                for token in re.findall(r"[a-zа-я0-9]{4,}", entity.normalized_value.lower(), flags=re.IGNORECASE)
            )
            if kpi_tokens and result_tokens and not (set(kpi_tokens) & set(result_tokens)):
                issues.append(
                    Issue(
                        issue_type="contradiction",
                        severity="low",
                        section_title="KPI / Ожидаемые результаты",
                        quote_text="KPI и результаты слабо связаны по смыслу.",
                        conflicting_quote_text=None,
                        explanation="Показатели успеха не отражают ожидаемые результаты или продукт проекта.",
                        recommendation="Сформулируйте KPI так, чтобы они измеряли достижение ожидаемых результатов.",
                    )
                )
        return issues

    def _dedupe_entities(self, entities: Iterable[ExtractedEntity]) -> List[ExtractedEntity]:
        deduped: List[ExtractedEntity] = []
        seen = defaultdict(set)
        for entity in entities:
            marker = entity.normalized_value.lower()
            if marker in seen[entity.entity_type]:
                continue
            seen[entity.entity_type].add(marker)
            deduped.append(entity)
        return deduped
