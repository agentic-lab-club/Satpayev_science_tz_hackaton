from datetime import datetime, timezone
from typing import Generic, Literal, TypeVar
from uuid import uuid4

from pydantic import BaseModel, Field

T = TypeVar("T")


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: object | None = None


class ResponseMetadata(BaseModel):
    generated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ResponseEnvelope(BaseModel, Generic[T]):
    request_id: str = Field(default_factory=lambda: str(uuid4()))
    status: Literal["ok", "error"]
    data: T | None = None
    error: ErrorDetail | None = None
    metadata: ResponseMetadata = Field(default_factory=ResponseMetadata)

    @classmethod
    def ok(cls, data: T) -> "ResponseEnvelope[T]":
        return cls(status="ok", data=data)

    @classmethod
    def failed(cls, error: ErrorDetail) -> "ResponseEnvelope[None]":
        return cls(status="error", error=error)


class HealthData(BaseModel):
    service: str
    version: str
    environment: str
    llm_enabled: bool


class NotebookStructureSection(BaseModel):
    title: str
    content: str = ""
    length: int = 0


class NotebookStructure(BaseModel):
    sections: list[NotebookStructureSection] = Field(default_factory=list)
    found_sections: list[str] = Field(default_factory=list)
    missing_sections: list[str] = Field(default_factory=list)
    weak_sections: list[str] = Field(default_factory=list)
    empty_sections: list[str] = Field(default_factory=list)
    matched_required_sections: dict[str, str] = Field(default_factory=dict)


class NotebookSemanticIssue(BaseModel):
    issue_type: str = "issue"
    section: str = ""
    quote: str = ""
    explanation: str = ""
    recommendation: str = ""


class NotebookSemantic(BaseModel):
    ambiguities: list[NotebookSemanticIssue] = Field(default_factory=list)
    contradictions: list[NotebookSemanticIssue] = Field(default_factory=list)
    missing_elements: list[NotebookSemanticIssue] = Field(default_factory=list)
    requirements: list[NotebookSemanticIssue] = Field(default_factory=list)
    deadlines: list[NotebookSemanticIssue] = Field(default_factory=list)
    kpis: list[NotebookSemanticIssue] = Field(default_factory=list)
    expected_results: list[NotebookSemanticIssue] = Field(default_factory=list)


class NotebookScore(BaseModel):
    total_score: float = Field(ge=0)
    breakdown: dict[str, float] = Field(default_factory=dict)
    explanation: list[str] = Field(default_factory=list)


class NotebookImprovedTZ(BaseModel):
    summary_of_changes: list[str] = Field(default_factory=list)
    improved_text: str = ""


class NotebookEntity(BaseModel):
    value: str
    section: str = ""
    confidence: float = Field(default=0.0, ge=0.0, le=1.0)


class NotebookEntityBundle(BaseModel):
    requirements: list[NotebookEntity] = Field(default_factory=list)
    deadlines: list[NotebookEntity] = Field(default_factory=list)
    kpis: list[NotebookEntity] = Field(default_factory=list)
    expected_results: list[NotebookEntity] = Field(default_factory=list)


class DocumentMetadata(BaseModel):
    file_path: str | None = None
    filename: str
    content_type: str
    character_count: int
    parser: str


class Section(BaseModel):
    key: str
    title: str
    content_excerpt: str = ""
    start_index: int | None = None
    end_index: int | None = None
    confidence: float = Field(default=0.0, ge=0.0, le=1.0)


class Finding(BaseModel):
    finding_type: str
    severity: Literal["low", "medium", "high"]
    section_key: str | None = None
    quote: str = ""
    explanation: str
    recommendation: str


class Recommendation(BaseModel):
    category: str
    title: str
    description: str
    priority: int = Field(ge=1, le=5)


class ScorecardItem(BaseModel):
    key: str
    label: str
    score: float = Field(ge=0)
    max_score: float = Field(gt=0)
    explanation: str = ""


class Scorecard(BaseModel):
    score_type: str
    total_score: float = Field(ge=0)
    max_total_score: float = Field(gt=0)
    items: list[ScorecardItem]
    is_placeholder: bool = False


class ModelMetadata(BaseModel):
    mode: Literal["template", "heuristic", "llm"]
    provider: str | None = None
    model: str | None = None
    prompt_version: str = "v1"
