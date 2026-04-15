from app.schemas.common import Finding, NotebookEntity, NotebookEntityBundle
from app.services.scoring_service import ScoringService


def test_scoring_service_builds_document_and_official_scores() -> None:
    service = ScoringService()
    findings = [
        Finding(
            finding_type="missing_kpi",
            severity="high",
            section_key="quantitative_indicators",
            quote="",
            explanation="No KPI detected.",
            recommendation="Add KPI.",
        )
    ]
    entities = NotebookEntityBundle(
        kpis=[NotebookEntity(value="Increase adoption by 30%", section="quantitative_indicators", confidence=0.9)],
        expected_results=[NotebookEntity(value="Final report", section="final_result", confidence=0.85)],
    )

    diagnostic = service.score_document_analysis(
        sections_found=4,
        sections_missing=2,
        weak_sections=1,
        empty_sections=0,
        ambiguities=1,
        contradictions=0,
        kpis_found=len(entities.kpis),
        expected_results_found=len(entities.expected_results),
        findings=findings,
    )
    official = service.score_preliminary_evaluation(
        text="Цель и задачи. Научная новизна. Практическая применимость. Ожидаемые результаты. Социально-экономический эффект.",
        findings=findings,
        entities=entities,
        sections_found=4,
        sections_missing=2,
    )

    assert diagnostic.total_score > 0
    assert official.total_score > 0
    assert diagnostic.max_total_score == 100
    assert official.max_total_score == 100
    assert len(diagnostic.items) == 5
    assert len(official.items) == 7
