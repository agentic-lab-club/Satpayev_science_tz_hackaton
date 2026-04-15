"""Vague wording patterns used by deterministic findings."""

VAGUE_PATTERNS: dict[str, str] = {
    "как можно скорее": "Replace with a concrete deadline.",
    "в кратчайшие сроки": "Replace with an exact period or due date.",
    "при необходимости": "Define the condition that triggers this requirement.",
    "по возможности": "Specify when the condition is mandatory and when it is optional.",
    "достаточно": "Define a measurable threshold instead of a subjective qualifier.",
    "качественный": "Add measurable quality criteria.",
    "эффективный": "Describe how effectiveness is measured.",
    "удобный": "Define usability criteria, users, and target completion time.",
    "быстро": "Replace with a measurable time limit.",
    "современно": "State concrete design or UX requirements.",
    "оптимальный": "Specify the measurable objective for optimization.",
    "улучшенный": "Describe the exact improvement criteria.",
}
