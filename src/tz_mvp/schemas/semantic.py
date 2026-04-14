"""Pydantic schemas for strict JSON validation of semantic tasks."""

from __future__ import annotations

from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field


class StrictSchema(BaseModel):
    """Base schema for strict LLM JSON parsing."""

    model_config = ConfigDict(extra="forbid")


class SemanticIssueItem(StrictSchema):
    """One semantic issue returned by LLM."""

    issue_type: str
    severity: str
    section_title: Optional[str] = None
    quote_text: str
    conflicting_quote_text: Optional[str] = None
    explanation: str
    recommendation: str


class SemanticIssueResponse(StrictSchema):
    """Batch of semantic issues."""

    issues: List[SemanticIssueItem] = Field(default_factory=list)


class ExtractedEntityItem(StrictSchema):
    """One extracted business entity."""

    entity_type: str
    raw_value: str
    normalized_value: str
    section_title: Optional[str] = None
    confidence: float = 0.5


class ExtractedEntityResponse(StrictSchema):
    """Batch of extracted entities."""

    entities: List[ExtractedEntityItem] = Field(default_factory=list)


class SectionClassificationItem(StrictSchema):
    """Semantic classification for one section."""

    section_title: str
    canonical_key: str
    rationale: str


class SectionClassificationResponse(StrictSchema):
    """Batch section classification response."""

    classifications: List[SectionClassificationItem] = Field(default_factory=list)


class RewriteSuggestion(StrictSchema):
    """Optional LLM-assisted rewrite payload."""

    section_title: str
    rewritten_text: str
    change_reason: str
