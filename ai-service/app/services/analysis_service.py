from app.core.config import get_settings
from app.schemas.analyze import AnalyzeRequest, AnalyzeResponse
from app.schemas.common import ModelMetadata
from app.services.completeness_service import CompletenessService
from app.services.findings_service import FindingsService
from app.services.generation_service import GenerationService
from app.services.parser_service import ParserService
from app.services.recommendations_service import RecommendationsService
from app.services.scoring_service import ScoringService
from app.services.section_service import SectionService


class AnalysisService:
    """Template orchestration service for `/v1/analyze`."""

    def __init__(
        self,
        parser_service: ParserService | None = None,
        section_service: SectionService | None = None,
        completeness_service: CompletenessService | None = None,
        findings_service: FindingsService | None = None,
        scoring_service: ScoringService | None = None,
        recommendations_service: RecommendationsService | None = None,
        generation_service: GenerationService | None = None,
    ) -> None:
        self.parser_service = parser_service or ParserService()
        self.section_service = section_service or SectionService()
        self.completeness_service = completeness_service or CompletenessService()
        self.findings_service = findings_service or FindingsService()
        self.scoring_service = scoring_service or ScoringService()
        self.recommendations_service = recommendations_service or RecommendationsService()
        self.generation_service = generation_service or GenerationService()

    def analyze(self, request: AnalyzeRequest) -> AnalyzeResponse:
        settings = get_settings()
        return AnalyzeResponse(
            document=self.parser_service.get_document_metadata(request),
            detected_sections=self.section_service.template_sections(),
            missing_required_sections=self.completeness_service.template_missing_sections(),
            weak_sections=self.completeness_service.template_weak_sections(),
            findings=self.findings_service.template_findings(),
            recommendations=self.recommendations_service.template_recommendations(),
            suggested_structure=self.generation_service.template_suggested_structure(),
            improved_text=self.generation_service.template_improved_text(),
            ai_document_analysis_scorecard=self.scoring_service.template_diagnostic_scorecard(),
            ai_preliminary_evaluation_scorecard=self.scoring_service.template_preliminary_evaluation_scorecard(),
            model_metadata=ModelMetadata(
                mode="template",
                provider=settings.llm_provider if settings.llm_enabled else None,
                model=settings.llm_model,
            ),
        )


def get_analysis_service() -> AnalysisService:
    return AnalysisService()

