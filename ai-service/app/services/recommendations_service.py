from app.schemas.common import Recommendation


class RecommendationsService:
    """Template recommendations service."""

    def template_recommendations(self) -> list[Recommendation]:
        return [
            Recommendation(
                category="template_only",
                title="AI-service template is ready",
                description="Replace this placeholder with real recommendations during the AI implementation task.",
                priority=5,
            )
        ]


def get_recommendations_service() -> RecommendationsService:
    return RecommendationsService()

