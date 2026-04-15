"""Required scientific TZ sections used by the AI-service heuristics."""

REQUIRED_SECTIONS: tuple[str, ...] = (
    "general_information",
    "program_priority",
    "goals",
    "tasks",
    "strategic_documents",
    "direct_results",
    "quantitative_indicators",
    "final_result",
    "socio_economic_effect",
    "target_consumers",
    "budget_by_year",
)

SECTION_LABELS: dict[str, str] = {
    "general_information": "Общие сведения",
    "program_priority": "Приоритет / программа",
    "goals": "Цель",
    "tasks": "Задачи",
    "strategic_documents": "Стратегические документы",
    "direct_results": "Прямые результаты",
    "quantitative_indicators": "Количественные показатели",
    "final_result": "Конечный результат",
    "socio_economic_effect": "Социально-экономический эффект",
    "target_consumers": "Целевые потребители",
    "budget_by_year": "Бюджет по годам",
}

SECTION_KEYWORDS: dict[str, tuple[str, ...]] = {
    "general_information": ("общее описание", "общие сведения", "введение", "описание проекта"),
    "program_priority": ("приоритет", "программ", "пцф", "ниокр", "инновац"),
    "goals": ("цель", "цели"),
    "tasks": ("задачи",),
    "strategic_documents": ("стратегическ", "документы", "госпрограмма", "стратегия"),
    "direct_results": ("прямые результаты", "результаты", "выход", "deliverable"),
    "quantitative_indicators": ("показател", "kpi", "метрик", "количествен"),
    "final_result": ("конечный результат", "итоговый продукт", "итог", "финальный результат"),
    "socio_economic_effect": ("социально-эконом", "соц-эконом", "экономический эффект", "эффект"),
    "target_consumers": ("целевые потребители", "потребители результатов", "аудитория"),
    "budget_by_year": ("бюджет", "по годам", "финансирован", "расход"),
}
