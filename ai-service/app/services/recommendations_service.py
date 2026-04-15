from __future__ import annotations

from app.rules.required_sections import SECTION_LABELS
from app.schemas.common import Finding, Recommendation


class RecommendationsService:
    """Build prioritized recommendations from findings and missing sections."""

    def build_recommendations(self, findings: list[Finding], missing_sections: list[str]) -> list[Recommendation]:
        recommendations: list[Recommendation] = []

        for section_key in missing_sections:
            recommendations.append(
                Recommendation(
                    category="structure",
                    title=f"Добавить раздел «{SECTION_LABELS.get(section_key, section_key)}»",
                    description=f"Добавьте отдельный раздел «{SECTION_LABELS.get(section_key, section_key)}» с конкретным содержанием и измеримыми критериями.",
                    priority=5,
                )
            )

        for finding in findings:
            if finding.finding_type == "vague_statement":
                recommendations.append(
                    Recommendation(
                        category="clarity",
                        title="Заменить размытые формулировки",
                        description=f"Перепишите указанный фрагмент: {finding.explanation}",
                        priority=4,
                    )
                )
            elif finding.finding_type in {"missing_kpi", "missing_expected_result"}:
                recommendations.append(
                    Recommendation(
                        category="kpi",
                        title="Добавить измеримые KPI и результаты",
                        description=f"{finding.explanation} {finding.recommendation}",
                        priority=5,
                    )
                )
            elif finding.finding_type == "inconsistency":
                recommendations.append(
                    Recommendation(
                        category="consistency",
                        title="Устранить противоречие",
                        description=finding.recommendation,
                        priority=5,
                    )
                )
            elif finding.finding_type == "missing_section":
                recommendations.append(
                    Recommendation(
                        category="structure",
                        title=f"Заполнить раздел {finding.section_key or 'без названия'}",
                        description=finding.recommendation,
                        priority=5,
                    )
                )

        return self._dedupe(recommendations)

    def template_recommendations(self) -> list[Recommendation]:
        return [
            Recommendation(
                category="structure",
                title="Добавить обязательные разделы",
                description="Заполните структуру научного ТЗ обязательными разделами и измеримым содержанием.",
                priority=5,
            ),
            Recommendation(
                category="clarity",
                title="Заменить размытые формулировки",
                description="Используйте числовые цели, сроки и ясные критерии приёмки вместо субъективных формулировок.",
                priority=4,
            ),
        ]

    def _dedupe(self, recommendations: list[Recommendation]) -> list[Recommendation]:
        seen: set[tuple[str, str]] = set()
        result: list[Recommendation] = []
        for recommendation in recommendations:
            key = (recommendation.category, recommendation.title)
            if key not in seen:
                seen.add(key)
                result.append(recommendation)
        return result


def get_recommendations_service() -> RecommendationsService:
    return RecommendationsService()
