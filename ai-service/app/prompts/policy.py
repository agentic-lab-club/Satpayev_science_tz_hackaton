from __future__ import annotations

from functools import lru_cache
from pathlib import Path


_PROMPTS_ROOT = Path(__file__).resolve().parent


@lru_cache
def get_default_system_prompt() -> str:
    """Return the default Russian-language system prompt for all LLM calls."""
    prompt_path = _PROMPTS_ROOT / "meta" / "system.md"
    if prompt_path.exists():
        return prompt_path.read_text(encoding="utf-8").strip()
    return (
        "Вы — ассистент для анализа научных технических заданий.\n"
        "Всегда отвечайте только на русском языке.\n"
        "Сохраняйте профессиональный, точный и краткий стиль.\n"
        "Если пользователь просит структурированный ответ, верните его в читаемом виде без лишнего английского текста."
    )


def prompt_path(category: str, kind: str) -> Path:
    return _PROMPTS_ROOT / category / f"{kind}.md"


def load_prompt(category: str, kind: str) -> str:
    path = prompt_path(category, kind)
    if not path.exists():
        raise FileNotFoundError(f"Prompt not found: {path}")
    return path.read_text(encoding="utf-8").strip()
