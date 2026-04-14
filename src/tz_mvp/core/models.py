"""Pydantic models used by the notebook-first TZ analysis workflow."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from uuid import uuid4

from pydantic import BaseModel, ConfigDict, Field


def utc_now() -> datetime:
    """Returns timezone-aware UTC timestamp."""

    return datetime.now(timezone.utc)


def build_id(prefix: str) -> str:
    """Creates short deterministic-looking identifiers for notebook artifacts."""

    return f"{prefix}_{uuid4().hex[:12]}"


class BaseArtifact(BaseModel):
    """Base model with strict config."""

    model_config = ConfigDict(arbitrary_types_allowed=True, extra="forbid")


class Document(BaseArtifact):
    """Normalized document representation stored in memory."""

    id: str = Field(default_factory=lambda: build_id("doc"))
    original_filename: str
    file_type: str
    raw_text: str = ""
    normalized_text: str = ""
    parse_status: str = "pending"
    upload_timestamp: datetime = Field(default_factory=utc_now)


class Section(BaseArtifact):
    """One logical section extracted from the document."""

    id: str = Field(default_factory=lambda: build_id("sec"))
    document_id: str
    title: str
    normalized_title: str
    order_index: int
    content: str
    char_count: int
    is_empty: bool
    page_start: Optional[int] = None
    page_end: Optional[int] = None
    canonical_key: Optional[str] = None


class SectionCheck(BaseArtifact):
    """Result of comparing detected sections with expected canonical structure."""

    canonical_key: str
    display_name: str
    found: bool
    section_id: Optional[str] = None
    section_title: Optional[str] = None
    is_empty: bool = False
    is_underfilled: bool = False
    in_expected_order: bool = True
    expected_order_index: int
    detected_order_index: Optional[int] = None
    char_count: int = 0
    adequacy_ratio: float = 0.0
    notes: List[str] = Field(default_factory=list)


class ScorePenalty(BaseArtifact):
    """One explainable score penalty."""

    dimension: str
    points: float
    reason: str
    related_issue_ids: List[str] = Field(default_factory=list)


class Analysis(BaseArtifact):
    """Explainable score bundle persisted per run."""

    id: str = Field(default_factory=lambda: build_id("analysis"))
    document_id: str
    total_score: float
    structure_score: float
    semantic_score: float
    completeness_score: float
    consistency_score: float
    kpi_score: float
    created_at: datetime = Field(default_factory=utc_now)
    dimension_scores: Dict[str, float] = Field(default_factory=dict)
    penalties: List[ScorePenalty] = Field(default_factory=list)
    explanations: List[str] = Field(default_factory=list)


class Issue(BaseArtifact):
    """Detected structural or semantic problem."""

    id: str = Field(default_factory=lambda: build_id("issue"))
    analysis_id: str = ""
    issue_type: str
    severity: str
    section_id: Optional[str] = None
    section_title: Optional[str] = None
    quote_text: str
    conflicting_quote_text: Optional[str] = None
    explanation: str
    recommendation: str


class ExtractedEntity(BaseArtifact):
    """Requirement, deadline, KPI or expected result extracted from the document."""

    id: str = Field(default_factory=lambda: build_id("ent"))
    document_id: str
    entity_type: str
    raw_value: str
    normalized_value: str
    source_section_id: Optional[str] = None
    source_section_title: Optional[str] = None
    confidence: float = 0.5
    status: str = "proposed"
    created_at: datetime = Field(default_factory=utc_now)


class ChangeRecord(BaseArtifact):
    """One explainable rewrite change."""

    section_title: str
    reason: str
    original_fragment: str
    improved_fragment: str


class ImprovedDocument(BaseArtifact):
    """Generated improved version of the technical specification."""

    id: str = Field(default_factory=lambda: build_id("improved"))
    document_id: str
    improved_text: str
    summary_of_changes: List[str] = Field(default_factory=list)
    change_log: List[ChangeRecord] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=utc_now)
    rewrite_mode: str = "targeted_rewrite"


class Report(BaseArtifact):
    """Serialized markdown/json report bundle."""

    id: str = Field(default_factory=lambda: build_id("report"))
    analysis_id: str
    report_json: Dict[str, Any]
    report_markdown: str
    created_at: datetime = Field(default_factory=utc_now)


class LLMTrace(BaseArtifact):
    """Trace of one LLM request/response pair for debugging."""

    id: str = Field(default_factory=lambda: build_id("trace"))
    task_name: str
    prompt: str
    raw_response: str
    parsed_ok: bool
    error: Optional[str] = None
    created_at: datetime = Field(default_factory=utc_now)


class SemanticAnalysisResult(BaseArtifact):
    """Aggregated semantic analysis output."""

    issues: List[Issue] = Field(default_factory=list)
    extracted_entities: List[ExtractedEntity] = Field(default_factory=list)
    section_classification: Dict[str, str] = Field(default_factory=dict)
    llm_traces: List[LLMTrace] = Field(default_factory=list)
    summary: Dict[str, int] = Field(default_factory=dict)


class StructureAnalysis(BaseArtifact):
    """Aggregated structural analysis output."""

    document_id: str
    sections: List[Section] = Field(default_factory=list)
    checks: List[SectionCheck] = Field(default_factory=list)
    missing_sections: List[str] = Field(default_factory=list)
    weak_sections: List[str] = Field(default_factory=list)
    issues: List[Issue] = Field(default_factory=list)


class AnalysisBundle(BaseArtifact):
    """All artifacts required for notebook display and export."""

    document: Document
    structure: StructureAnalysis
    semantic: SemanticAnalysisResult
    analysis: Analysis
    improved_document: ImprovedDocument
    report: Report
    recommendations: List[str] = Field(default_factory=list)
    confirmed_entities: List[ExtractedEntity] = Field(default_factory=list)
