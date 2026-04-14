"""Small prompt builders for section-level semantic analysis."""

from __future__ import annotations

from typing import Iterable


def build_ambiguity_prompt(section_title: str, section_text: str) -> str:
    return f"""
Проанализируй раздел ТЗ и найди только действительно размытые, неконкретные или нефальсифицируемые формулировки.
Верни JSON вида {{"issues": [{{"issue_type": "...", "severity": "...", "section_title": "...", "quote_text": "...", "conflicting_quote_text": null, "explanation": "...", "recommendation": "..."}}]}}.
Не выдумывай проблемы, если их нет.

Раздел: {section_title}
Текст:
{section_text}
""".strip()


def build_contradiction_prompt(context: str) -> str:
    return f"""
Проанализируй фрагменты ТЗ и найди только явные или вероятные противоречия между разделами.
Сравни цель и задачи, требования и ожидаемые результаты, сроки и объем работ, KPI и результаты.
Верни JSON вида {{"issues": [{{"issue_type": "contradiction", "severity": "...", "section_title": "...", "quote_text": "...", "conflicting_quote_text": "...", "explanation": "...", "recommendation": "..."}}]}}.

Контекст:
{context}
""".strip()


def build_entity_extraction_prompt(entity_type: str, section_title: str, section_text: str) -> str:
    return f"""
Извлеки из фрагмента ТЗ только сущности типа '{entity_type}'.
Верни JSON вида {{"entities": [{{"entity_type": "{entity_type}", "raw_value": "...", "normalized_value": "...", "section_title": "{section_title}", "confidence": 0.0}}]}}.
Не добавляй сущности, которых нет в тексте.

Раздел: {section_title}
Текст:
{section_text}
""".strip()


def build_missing_requirements_prompt(context: str) -> str:
    return f"""
Оцени, каких обязательных содержательных элементов не хватает в ТЗ.
Ищи пропуски требований, KPI, сроков, ожидаемых результатов или логических связок.
Верни JSON вида {{"issues": [{{"issue_type": "...", "severity": "...", "section_title": "...", "quote_text": "...", "conflicting_quote_text": null, "explanation": "...", "recommendation": "..."}}]}}.

Контекст:
{context}
""".strip()


def build_section_classification_prompt(section_titles: Iterable[str], context: str) -> str:
    titles = "\n".join(f"- {title}" for title in section_titles)
    return f"""
Классифицируй разделы ТЗ по каноническим ключам: context, goal, tasks, requirements, deadlines, kpi, expected_results, constraints, final_product.
Верни JSON вида {{"classifications": [{{"section_title": "...", "canonical_key": "...", "rationale": "..."}}]}}.

Разделы:
{titles}

Контекст:
{context}
""".strip()
