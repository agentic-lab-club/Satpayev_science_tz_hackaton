"""Scorecard rubrics reserved for future scoring implementation."""

DIAGNOSTIC_RUBRIC: dict[str, int] = {
    "structure": 100,
    "completeness": 100,
    "clarity": 100,
    "kpi_results": 100,
    "consistency": 100,
}

OFFICIAL_EVALUATION_RUBRIC: dict[str, int] = {
    "strategic_relevance": 20,
    "goals_and_tasks": 10,
    "scientific_novelty": 15,
    "practical_applicability": 20,
    "expected_results": 15,
    "socio_economic_effect": 10,
    "feasibility": 10,
}

RUBRIC_LABELS: dict[str, str] = {
    "structure": "Structure",
    "completeness": "Completeness",
    "clarity": "Clarity",
    "kpi_results": "KPI / Results",
    "consistency": "Consistency",
    "strategic_relevance": "Strategic relevance",
    "goals_and_tasks": "Goals and tasks",
    "scientific_novelty": "Scientific novelty",
    "practical_applicability": "Practical applicability",
    "expected_results": "Expected results",
    "socio_economic_effect": "Socio-economic effect",
    "feasibility": "Feasibility",
}

