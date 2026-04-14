"""Configuration models for the TZ analysis MVP."""

from __future__ import annotations

from pathlib import Path
from typing import List

from pydantic import BaseModel, Field, field_validator


class SectionTemplate(BaseModel):
    """Defines one expected canonical section of a technical specification."""

    key: str
    display_name: str
    synonyms: List[str]
    required: bool = True
    order_index: int
    min_char_count: int = 80
    expected_keywords: List[str] = Field(default_factory=list)


class ScoringWeights(BaseModel):
    """Weights for explainable scoring dimensions."""

    structure: int = 25
    completeness: int = 20
    specificity: int = 20
    consistency: int = 15
    kpi: int = 10
    expected_results: int = 10

    @field_validator("*")
    @classmethod
    def _positive(cls, value: int) -> int:
        if value < 0:
            raise ValueError("Scoring weights must be non-negative")
        return value

    @property
    def total(self) -> int:
        return (
            self.structure
            + self.completeness
            + self.specificity
            + self.consistency
            + self.kpi
            + self.expected_results
        )


class LLMConfig(BaseModel):
    """Configuration for LLM client adapter."""

    enabled: bool = False
    provider: str = "openai"
    model: str = "gpt-4o-mini"
    temperature: float = 0.1
    max_tokens: int = 1400
    retries: int = 2
    timeout_seconds: int = 60


def default_section_templates() -> List[SectionTemplate]:
    """Returns default expected structure for a technical specification."""

    return [
        SectionTemplate(
            key="context",
            display_name="Общее описание / контекст",
            synonyms=["общее описание", "контекст", "введение", "описание проекта"],
            order_index=1,
            min_char_count=120,
            expected_keywords=["проект", "контекст", "обоснование"],
        ),
        SectionTemplate(
            key="goal",
            display_name="Цель",
            synonyms=["цель", "цели проекта"],
            order_index=2,
            min_char_count=60,
            expected_keywords=["цель", "результат", "достичь"],
        ),
        SectionTemplate(
            key="tasks",
            display_name="Задачи",
            synonyms=["задачи", "этапы", "подзадачи"],
            order_index=3,
            min_char_count=80,
            expected_keywords=["задача", "выполнить", "реализовать"],
        ),
        SectionTemplate(
            key="requirements",
            display_name="Требования",
            synonyms=["требования", "функциональные требования", "нефункциональные требования"],
            order_index=4,
            min_char_count=120,
            expected_keywords=["должен", "необходимо", "обеспечить"],
        ),
        SectionTemplate(
            key="deadlines",
            display_name="Сроки",
            synonyms=["сроки", "календарный план", "план-график", "дедлайны"],
            order_index=5,
            min_char_count=40,
            expected_keywords=["дата", "срок", "этап", "день", "месяц"],
        ),
        SectionTemplate(
            key="kpi",
            display_name="KPI / показатели",
            synonyms=["kpi", "показатели", "метрики", "показатели эффективности"],
            order_index=6,
            min_char_count=50,
            expected_keywords=["%", "показатель", "не менее", "метрика"],
        ),
        SectionTemplate(
            key="expected_results",
            display_name="Ожидаемые результаты",
            synonyms=["ожидаемые результаты", "результаты", "ожидаемый эффект"],
            order_index=7,
            min_char_count=80,
            expected_keywords=["результат", "получить", "итог"],
        ),
        SectionTemplate(
            key="constraints",
            display_name="Ограничения / условия",
            synonyms=["ограничения", "условия", "допущения", "риски и ограничения"],
            order_index=8,
            min_char_count=40,
            expected_keywords=["ограничение", "условие", "ресурс", "бюджет"],
        ),
        SectionTemplate(
            key="final_product",
            display_name="Итог / ожидаемый продукт",
            synonyms=["итог", "итоговый продукт", "ожидаемый продукт", "результирующий артефакт"],
            order_index=9,
            min_char_count=50,
            expected_keywords=["продукт", "артефакт", "поставка", "итог"],
        ),
    ]


class TZAnalysisConfig(BaseModel):
    """Top-level configuration object used throughout the notebook pipeline."""

    project_root: Path = Field(default_factory=lambda: Path.cwd())
    data_dir: Path = Field(default_factory=lambda: Path("data"))
    output_dir: Path = Field(default_factory=lambda: Path("outputs"))
    ocr_enabled: bool = False
    ocr_language: str = "rus+eng"
    weak_section_ratio: float = 0.65
    llm: LLMConfig = Field(default_factory=LLMConfig)
    scoring_weights: ScoringWeights = Field(default_factory=ScoringWeights)
    section_templates: List[SectionTemplate] = Field(default_factory=default_section_templates)
    vague_terms: List[str] = Field(
        default_factory=lambda: [
            "при необходимости",
            "в кратчайшие сроки",
            "качественно",
            "эффективно",
            "современно",
            "достаточно",
            "по возможности",
            "при наличии",
            "и т.д.",
            "будет определено позже",
            "в целом",
            "желательно",
        ]
    )

    @field_validator("scoring_weights")
    @classmethod
    def _validate_total_weight(cls, value: ScoringWeights) -> ScoringWeights:
        if value.total != 100:
            raise ValueError("Scoring weights must sum to 100")
        return value

    def template_by_key(self) -> dict[str, SectionTemplate]:
        """Returns templates indexed by canonical key."""

        return {template.key: template for template in self.section_templates}

    def required_templates(self) -> List[SectionTemplate]:
        """Returns required canonical sections."""

        return [template for template in self.section_templates if template.required]
