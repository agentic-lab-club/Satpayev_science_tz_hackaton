"""Scorecard rubrics used by the AI-service heuristics."""

DIAGNOSTIC_RUBRIC: dict[str, int] = {
    "structure": 20,
    "completeness": 20,
    "clarity": 20,
    "kpi_results": 20,
    "consistency": 20,
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
    "structure": "Структура",
    "completeness": "Полнота",
    "clarity": "Ясность",
    "kpi_results": "KPI / результаты",
    "consistency": "Согласованность",
    "strategic_relevance": "Стратегическая значимость",
    "goals_and_tasks": "Цели и задачи",
    "scientific_novelty": "Научная новизна",
    "practical_applicability": "Практическая применимость",
    "expected_results": "Ожидаемые результаты",
    "socio_economic_effect": "Социально-экономический эффект",
    "feasibility": "Реализуемость",
}
