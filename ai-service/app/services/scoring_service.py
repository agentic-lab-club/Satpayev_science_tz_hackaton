from __future__ import annotations

from app.rules.scoring_rubrics import DIAGNOSTIC_RUBRIC, OFFICIAL_EVALUATION_RUBRIC, RUBRIC_LABELS
from app.schemas.common import Finding, NotebookEntityBundle, Scorecard, ScorecardItem


class ScoringService:
    """Compute notebook diagnostic and official rubric scorecards."""

    def score_document_analysis(
        self,
        *,
        sections_found: int,
        sections_missing: int,
        weak_sections: int,
        empty_sections: int,
        ambiguities: int,
        contradictions: int,
        kpis_found: int,
        expected_results_found: int,
        findings: list[Finding],
    ) -> Scorecard:
        structure = self._clamp(100 - sections_missing * 15 - weak_sections * 4 - empty_sections * 8)
        completeness = self._clamp(self._coverage_score(sections_found, sections_missing))
        clarity = self._clamp(100 - ambiguities * 12 - contradictions * 20)
        kpi_results = self._clamp(self._kpi_score(kpis_found, expected_results_found, findings))
        consistency = self._clamp(100 - contradictions * 25 - sections_missing * 2)

        items = [
            self._item("structure", "Структура", structure),
            self._item("completeness", "Полнота", completeness),
            self._item("clarity", "Ясность", clarity),
            self._item("kpi_results", "KPI / результаты", kpi_results),
            self._item("consistency", "Согласованность", consistency),
        ]
        total = round(sum(item.score for item in items) / len(items), 2)
        return Scorecard(
            score_type="ai_document_analysis",
            total_score=total,
            max_total_score=100,
            items=items,
            is_placeholder=False,
        )

    def score_preliminary_evaluation(
        self,
        *,
        text: str,
        findings: list[Finding],
        entities: NotebookEntityBundle,
        sections_found: int,
        sections_missing: int,
    ) -> Scorecard:
        text_lower = text.lower()
        sections_density = self._coverage_score(sections_found, sections_missing)
        strategic_relevance = self._official_item_score(
            text_lower,
            sections_density,
            (
                "стратег",
                "приоритет",
                "программа",
                "университет",
                "национал",
                "регионал",
            ),
            max_score=OFFICIAL_EVALUATION_RUBRIC["strategic_relevance"],
        )
        goals_and_tasks = self._official_item_score(
            text_lower,
            sections_density,
            ("цель", "задач", "задачи", "постановк"),
            max_score=OFFICIAL_EVALUATION_RUBRIC["goals_and_tasks"],
        )
        scientific_novelty = self._official_item_score(
            text_lower,
            sections_density,
            ("новизн", "инновац", "исследован", "аналог", "метод", "подход"),
            max_score=OFFICIAL_EVALUATION_RUBRIC["scientific_novelty"],
        )
        practical_applicability = self._official_item_score(
            text_lower,
            sections_density,
            ("практическ", "внедрен", "примен", "использован", "пилот", "масштаб"),
            max_score=OFFICIAL_EVALUATION_RUBRIC["practical_applicability"],
        )
        expected_results = self._official_item_score(
            text_lower,
            sections_density,
            ("ожида", "результат", "итог", "deliverable", "выход", "продукт"),
            max_score=OFFICIAL_EVALUATION_RUBRIC["expected_results"],
        )
        socio_economic_effect = self._official_item_score(
            text_lower,
            sections_density,
            ("социально-эконом", "соц-эконом", "экономическ", "коммерциал", "тенге", "kzt"),
            max_score=OFFICIAL_EVALUATION_RUBRIC["socio_economic_effect"],
        )
        feasibility = self._official_item_score(
            text_lower,
            sections_density,
            ("срок", "бюджет", "ресурс", "реализуем", "risk", "ограничен"),
            max_score=OFFICIAL_EVALUATION_RUBRIC["feasibility"],
        )

        # Favor documents that surface measurable entities.
        kpi_bonus = min(2, len(entities.kpis))
        result_bonus = min(2, len(entities.expected_results))
        if kpi_bonus:
            expected_results = self._clamp(expected_results + kpi_bonus)
        if result_bonus:
            practical_applicability = self._clamp(practical_applicability + result_bonus)

        items = [
            self._item("strategic_relevance", "Стратегическая значимость", strategic_relevance, OFFICIAL_EVALUATION_RUBRIC["strategic_relevance"]),
            self._item("goals_and_tasks", "Цели и задачи", goals_and_tasks, OFFICIAL_EVALUATION_RUBRIC["goals_and_tasks"]),
            self._item("scientific_novelty", "Научная новизна", scientific_novelty, OFFICIAL_EVALUATION_RUBRIC["scientific_novelty"]),
            self._item("practical_applicability", "Практическая применимость", practical_applicability, OFFICIAL_EVALUATION_RUBRIC["practical_applicability"]),
            self._item("expected_results", "Ожидаемые результаты", expected_results, OFFICIAL_EVALUATION_RUBRIC["expected_results"]),
            self._item("socio_economic_effect", "Социально-экономический эффект", socio_economic_effect, OFFICIAL_EVALUATION_RUBRIC["socio_economic_effect"]),
            self._item("feasibility", "Реализуемость", feasibility, OFFICIAL_EVALUATION_RUBRIC["feasibility"]),
        ]
        total = round(
            sum(item.score for item in items)
            - sections_missing * 4
            - sum(5 for finding in findings if finding.finding_type in {"missing_kpi", "missing_expected_result"}),
            2,
        )
        total = self._clamp(total)
        return Scorecard(
            score_type="ai_preliminary_evaluation",
            total_score=total,
            max_total_score=100,
            items=items,
            is_placeholder=False,
        )

    def template_diagnostic_scorecard(self) -> Scorecard:
        return self._template_scorecard("ai_document_analysis", DIAGNOSTIC_RUBRIC)

    def template_preliminary_evaluation_scorecard(self) -> Scorecard:
        return self._template_scorecard("ai_preliminary_evaluation", OFFICIAL_EVALUATION_RUBRIC)

    def _template_scorecard(self, score_type: str, rubric: dict[str, int]) -> Scorecard:
        items = [
            ScorecardItem(
                key=key,
                label=RUBRIC_LABELS.get(key, key),
                score=0,
                max_score=max_score,
                explanation="Шаблонная заглушка. Реальная оценка пока не выполнена.",
            )
            for key, max_score in rubric.items()
        ]
        return Scorecard(
            score_type=score_type,
            total_score=0,
            max_total_score=sum(rubric.values()) if rubric else 100,
            items=items,
            is_placeholder=True,
        )

    def _item(self, key: str, label: str, score: float, max_score: int = 100) -> ScorecardItem:
        return ScorecardItem(
            key=key,
            label=label,
            score=self._clamp(score, max_score),
            max_score=max_score,
            explanation=self._score_explanation(key, score, max_score),
        )

    def _score_explanation(self, key: str, score: float, max_score: int) -> str:
        if score >= max_score * 0.8:
            return f"Хорошее покрытие для показателя «{RUBRIC_LABELS.get(key, key)}»."
        if score >= max_score * 0.5:
            return f"Среднее покрытие для показателя «{RUBRIC_LABELS.get(key, key)}»."
        return f"Требует доработки по показателю «{RUBRIC_LABELS.get(key, key)}»."

    def _coverage_score(self, found: int, missing: int) -> float:
        total = found + missing
        if total <= 0:
            return 0
        return (found / total) * 100

    def _kpi_score(self, kpis_found: int, expected_results_found: int, findings: list[Finding]) -> float:
        score = 20
        score += min(40, kpis_found * 15)
        score += min(25, expected_results_found * 12)
        if any(finding.finding_type == "missing_kpi" for finding in findings):
            score -= 20
        if any(finding.finding_type == "missing_expected_result" for finding in findings):
            score -= 15
        return score

    def _official_item_score(self, text_lower: str, coverage: float, keywords: tuple[str, ...], max_score: int) -> float:
        keyword_count = max(1, len(keywords))
        hits = sum(1 for keyword in keywords if keyword in text_lower)
        base = coverage * 0.25
        keyword_score = min(max_score, hits * (max_score / keyword_count))
        score = base + keyword_score
        if hits == 0:
            score *= 0.45
        return self._clamp(score, max_score)

    def _clamp(self, value: float, max_score: int = 100) -> float:
        return round(max(0.0, min(float(max_score), float(value))), 2)


def get_scoring_service() -> ScoringService:
    return ScoringService()
