from app.rules.scoring_rubrics import DIAGNOSTIC_RUBRIC, OFFICIAL_EVALUATION_RUBRIC, RUBRIC_LABELS
from app.schemas.common import Scorecard, ScorecardItem


class ScoringService:
    """Template scorecard factory.

    Scores are placeholders only. Real scoring must be implemented later.
    """

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
                explanation="Template placeholder. Real scoring is not implemented yet.",
            )
            for key, max_score in rubric.items()
        ]
        return Scorecard(
            score_type=score_type,
            total_score=0,
            max_total_score=sum(rubric.values()) if score_type != "ai_document_analysis" else 100,
            items=items,
            is_placeholder=True,
        )


def get_scoring_service() -> ScoringService:
    return ScoringService()

