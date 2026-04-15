from __future__ import annotations

from app.core.config import get_settings
from app.schemas.analyze import AnalyzeRequest, AnalyzeResponse
from app.schemas.common import (
    ModelMetadata,
    NotebookImprovedTZ,
    NotebookScore,
    NotebookSemantic,
    NotebookStructure,
    NotebookStructureSection,
)
from app.services.completeness_service import CompletenessService, CompletenessResult
from app.services.findings_service import FindingsService
from app.services.generation_service import GenerationService
from app.services.parser_service import ParserService
from app.services.recommendations_service import RecommendationsService
from app.services.scoring_service import ScoringService
from app.services.section_service import SectionService


class AnalysisService:
    """Deterministic notebook-to-service orchestration for `/v1/analyze`."""

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
        parsed = self.parser_service.parse(request)
        section_result = self.section_service.detect_sections(parsed.text)
        completeness = self.completeness_service.analyze(section_result.sections)
        findings = self.findings_service.analyze(
            text=parsed.text,
            sections=section_result.sections,
            matched_required_sections=completeness.matched_required_sections,
        )
        diagnostic_score = self.scoring_service.score_document_analysis(
            sections_found=len(completeness.found_sections),
            sections_missing=len(completeness.missing_sections),
            weak_sections=len(completeness.weak_sections),
            empty_sections=len(completeness.empty_sections),
            ambiguities=len(findings.semantic.ambiguities),
            contradictions=len(findings.semantic.contradictions),
            kpis_found=len(findings.extracted_entities.kpis),
            expected_results_found=len(findings.extracted_entities.expected_results),
            findings=findings.findings,
        )
        preliminary_score = self.scoring_service.score_preliminary_evaluation(
            text=parsed.text,
            findings=findings.findings,
            entities=findings.extracted_entities,
            sections_found=len(completeness.found_sections),
            sections_missing=len(completeness.missing_sections),
        )
        recommendations = self.recommendations_service.build_recommendations(findings.findings, completeness.missing_sections)
        summary_of_changes, improved_text = self.generation_service.build_improved_text(
            original_text=parsed.text,
            findings=findings.findings,
            missing_sections=completeness.missing_sections,
            weak_sections=completeness.weak_sections,
        )
        suggested_structure = self.generation_service.build_suggested_structure(
            missing_sections=completeness.missing_sections,
            weak_sections=completeness.weak_sections,
        )

        return AnalyzeResponse(
            analysis_status="completed",
            document=parsed.metadata,
            raw_text_preview=parsed.text[:500],
            structure=NotebookStructure(
                sections=[
                    NotebookStructureSection(
                        title=section.title,
                        content=section.content_excerpt,
                        length=len(section.content_excerpt),
                    )
                    for section in section_result.sections
                ],
                found_sections=completeness.found_sections,
                missing_sections=completeness.missing_sections,
                weak_sections=completeness.weak_sections,
                empty_sections=completeness.empty_sections,
                matched_required_sections=completeness.matched_required_sections,
            ),
            semantic=findings.semantic,
            score=NotebookScore(
                total_score=diagnostic_score.total_score,
                breakdown={item.key: item.score for item in diagnostic_score.items},
                explanation=self._diagnostic_explanation(
                    completeness=completeness,
                    semantic=findings.semantic,
                    diagnostic_score=diagnostic_score,
                ),
            ),
            recommendations=recommendations,
            generate_improved_tz=NotebookImprovedTZ(
                summary_of_changes=summary_of_changes,
                improved_text=improved_text,
            ),
            improved_tz=improved_text,
            extracted_entities=findings.extracted_entities,
            confirmed_entities=findings.confirmed_entities,
            detected_sections=section_result.sections,
            missing_required_sections=completeness.missing_sections,
            weak_sections=completeness.weak_sections,
            findings=findings.findings,
            suggested_structure=suggested_structure,
            improved_text=improved_text,
            ai_document_analysis_scorecard=diagnostic_score,
            ai_preliminary_evaluation_scorecard=preliminary_score,
            model_metadata=ModelMetadata(
                mode="llm" if settings.llm_enabled else "heuristic",
                provider=settings.llm_provider if settings.llm_enabled else None,
                model=settings.llm_model if settings.llm_enabled else None,
            ),
        )

    def _diagnostic_explanation(
        self,
        *,
        completeness: CompletenessResult,
        semantic: NotebookSemantic,
        diagnostic_score,
    ) -> list[str]:
        explanation = [
            f"Found {len(completeness.found_sections)} of {len(completeness.found_sections) + len(completeness.missing_sections)} required sections.",
            f"Detected {len(semantic.ambiguities)} vague statements and {len(semantic.contradictions)} contradictions.",
            f"Extracted {len(semantic.kpis)} KPI lines and {len(semantic.expected_results)} expected-result lines.",
        ]
        if completeness.weak_sections:
            explanation.append(f"Weak sections: {', '.join(completeness.weak_sections[:5])}.")
        if diagnostic_score.total_score < 60:
            explanation.append("The document still needs structural and measurable-detail improvements.")
        else:
            explanation.append("The document has a usable structure but still benefits from additional precision.")
        return explanation


def get_analysis_service() -> AnalysisService:
    return AnalysisService()
