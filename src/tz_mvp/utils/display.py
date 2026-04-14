"""Notebook display helpers that convert artifacts into pandas/markdown views."""

from __future__ import annotations

from typing import Iterable, List

import pandas as pd

from tz_mvp.core.models import Analysis, ChangeRecord, ExtractedEntity, Issue, StructureAnalysis


def structure_to_dataframe(structure: StructureAnalysis) -> pd.DataFrame:
    """Creates a compact table for structural analysis."""

    return pd.DataFrame(
        [
            {
                "canonical_key": check.canonical_key,
                "display_name": check.display_name,
                "found": check.found,
                "section_title": check.section_title,
                "is_empty": check.is_empty,
                "is_underfilled": check.is_underfilled,
                "in_expected_order": check.in_expected_order,
                "char_count": check.char_count,
                "adequacy_ratio": round(check.adequacy_ratio, 2),
                "notes": "; ".join(check.notes),
            }
            for check in structure.checks
        ]
    )


def issues_to_dataframe(issues: Iterable[Issue]) -> pd.DataFrame:
    """Converts issues into notebook-friendly table."""

    return pd.DataFrame(
        [
            {
                "issue_id": issue.id,
                "issue_type": issue.issue_type,
                "severity": issue.severity,
                "section": issue.section_title,
                "quote_text": issue.quote_text,
                "conflicting_quote_text": issue.conflicting_quote_text,
                "explanation": issue.explanation,
                "recommendation": issue.recommendation,
            }
            for issue in issues
        ]
    )


def entities_to_dataframe(entities: Iterable[ExtractedEntity]) -> pd.DataFrame:
    """Converts extracted entities into a table."""

    return pd.DataFrame(
        [
            {
                "entity_id": entity.id,
                "entity_type": entity.entity_type,
                "raw_value": entity.raw_value,
                "normalized_value": entity.normalized_value,
                "source_section": entity.source_section_title,
                "confidence": round(entity.confidence, 2),
                "status": entity.status,
            }
            for entity in entities
        ]
    )


def change_log_to_dataframe(changes: List[ChangeRecord]) -> pd.DataFrame:
    """Converts rewrite change log into a table."""

    return pd.DataFrame(
        [
            {
                "section_title": change.section_title,
                "reason": change.reason,
                "original_fragment": change.original_fragment,
                "improved_fragment": change.improved_fragment,
            }
            for change in changes
        ]
    )


def score_to_markdown(analysis: Analysis) -> str:
    """Human-readable score explanation for notebook markdown output."""

    lines = [
        f"## Explainable score: {analysis.total_score:.1f} / 100",
        "",
        "| Метрика | Балл |",
        "| --- | ---: |",
    ]
    labels = {
        "structure": "Структура",
        "completeness": "Полнота",
        "specificity": "Конкретность требований",
        "consistency": "Непротиворечивость",
        "kpi": "KPI",
        "expected_results": "Ожидаемые результаты",
    }
    for key, label in labels.items():
        lines.append(f"| {label} | {analysis.dimension_scores.get(key, 0):.1f} |")
    lines.append("")
    if analysis.penalties:
        lines.append("### Штрафы")
        for penalty in analysis.penalties:
            lines.append(f"- `{penalty.dimension}`: -{penalty.points:.1f} балла. {penalty.reason}")
    if analysis.explanations:
        lines.append("")
        lines.append("### Пояснение")
        lines.extend([f"- {text}" for text in analysis.explanations])
    return "\n".join(lines)
