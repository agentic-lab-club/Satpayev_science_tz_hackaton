"""Vague wording patterns reserved for future deterministic findings."""

VAGUE_PATTERNS: dict[str, str] = {
    "как можно скорее": "Replace with a concrete deadline.",
    "в кратчайшие сроки": "Replace with an exact period or due date.",
    "при необходимости": "Define the condition that triggers this requirement.",
    "качественный": "Add measurable quality criteria.",
    "эффективный": "Describe how effectiveness is measured.",
}

