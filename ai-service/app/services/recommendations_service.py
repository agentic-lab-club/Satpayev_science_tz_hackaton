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
                    title=f"Add {SECTION_LABELS.get(section_key, section_key)}",
                    description=f"Insert a dedicated '{SECTION_LABELS.get(section_key, section_key)}' section with concrete content and measurable criteria.",
                    priority=5,
                )
            )

        for finding in findings:
            if finding.finding_type == "vague_statement":
                recommendations.append(
                    Recommendation(
                        category="clarity",
                        title="Replace vague wording",
                        description=f"Rewrite the cited fragment: {finding.explanation}",
                        priority=4,
                    )
                )
            elif finding.finding_type in {"missing_kpi", "missing_expected_result"}:
                recommendations.append(
                    Recommendation(
                        category="kpi",
                        title="Add measurable KPIs and results",
                        description=f"{finding.explanation} {finding.recommendation}",
                        priority=5,
                    )
                )
            elif finding.finding_type == "inconsistency":
                recommendations.append(
                    Recommendation(
                        category="consistency",
                        title="Resolve the contradiction",
                        description=finding.recommendation,
                        priority=5,
                    )
                )
            elif finding.finding_type == "missing_section":
                recommendations.append(
                    Recommendation(
                        category="structure",
                        title=f"Populate {finding.section_key or 'the missing section'}",
                        description=finding.recommendation,
                        priority=5,
                    )
                )

        return self._dedupe(recommendations)

    def template_recommendations(self) -> list[Recommendation]:
        return [
            Recommendation(
                category="structure",
                title="Add missing required sections",
                description="Fill the scientific TZ structure with the required sections and measurable content.",
                priority=5,
            ),
            Recommendation(
                category="clarity",
                title="Replace vague wording",
                description="Use numeric targets, deadlines, and clear acceptance criteria instead of subjective wording.",
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
