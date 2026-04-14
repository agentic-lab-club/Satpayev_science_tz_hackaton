"""Text normalization and heuristic NLP helpers."""

from __future__ import annotations

import re
from typing import Iterable, List


def normalize_text(text: str) -> str:
    """Normalizes whitespace and line breaks without destroying structure."""

    if not text:
        return ""
    normalized = text.replace("\r\n", "\n").replace("\r", "\n").replace("\xa0", " ")
    normalized = re.sub(r"[ \t]+", " ", normalized)
    normalized = re.sub(r"\n{3,}", "\n\n", normalized)
    normalized = re.sub(r"(?<=\w)-\n(?=\w)", "", normalized)
    return normalized.strip()


def normalize_section_title(text: str) -> str:
    """Canonical normalization for headings and section labels."""

    normalized = text.strip().lower()
    normalized = re.sub(r"^\d+(\.\d+)*[\)\.]?\s*", "", normalized)
    normalized = re.sub(r"[^a-zа-я0-9\s/+-]", "", normalized, flags=re.IGNORECASE)
    normalized = re.sub(r"\s+", " ", normalized)
    return normalized.strip()


def slugify(text: str) -> str:
    """ASCII-friendly-ish slug for file names and ids."""

    normalized = normalize_section_title(text)
    normalized = normalized.replace(" ", "_").replace("/", "_")
    return normalized[:80] or "artifact"


def split_into_sentences(text: str) -> List[str]:
    """Splits text into short sentence-like spans."""

    if not text:
        return []
    parts = re.split(r"(?<=[\.\!\?;])\s+", text)
    return [part.strip() for part in parts if part.strip()]


def chunk_text(text: str, max_chars: int = 3000, overlap: int = 200) -> List[str]:
    """Splits long text into overlapping chunks suitable for LLM prompts."""

    if len(text) <= max_chars:
        return [text]
    chunks: List[str] = []
    start = 0
    while start < len(text):
        end = min(len(text), start + max_chars)
        chunks.append(text[start:end])
        if end == len(text):
            break
        start = max(0, end - overlap)
    return chunks


def keyword_overlap(left: str, right: str) -> float:
    """Calculates simple keyword overlap between two text spans."""

    stopwords = {
        "и",
        "в",
        "на",
        "для",
        "по",
        "с",
        "к",
        "из",
        "или",
        "не",
        "это",
        "как",
        "что",
        "при",
        "под",
        "будет",
        "должен",
        "нужно",
    }
    left_tokens = {
        token
        for token in re.findall(r"[a-zа-я0-9]{3,}", left.lower(), flags=re.IGNORECASE)
        if token not in stopwords
    }
    right_tokens = {
        token
        for token in re.findall(r"[a-zа-я0-9]{3,}", right.lower(), flags=re.IGNORECASE)
        if token not in stopwords
    }
    if not left_tokens or not right_tokens:
        return 0.0
    intersection = len(left_tokens & right_tokens)
    union = len(left_tokens | right_tokens)
    return intersection / union if union else 0.0


def first_non_empty(lines: Iterable[str], default: str = "") -> str:
    """Returns first non-empty string from an iterable."""

    for line in lines:
        cleaned = line.strip()
        if cleaned:
            return cleaned
    return default


def compact_fragment(text: str, limit: int = 260) -> str:
    """Returns a readable short quote for tables and issue reports."""

    compact = re.sub(r"\s+", " ", text.strip())
    if len(compact) <= limit:
        return compact
    return f"{compact[: limit - 3]}..."
