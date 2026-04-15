from pydantic import BaseModel, Field, model_validator

from app.schemas.common import (
    DocumentMetadata,
    Finding,
    ModelMetadata,
    NotebookEntityBundle,
    NotebookImprovedTZ,
    NotebookScore,
    NotebookSemantic,
    NotebookStructure,
    Recommendation,
    Scorecard,
    Section,
)


class AnalyzeRequest(BaseModel):
    text: str | None = Field(default=None, description="Plain extracted document text.")
    file_base64: str | None = Field(default=None, description="Base64 encoded document bytes.")
    filename: str = "document.txt"
    content_type: str = "text/plain"
    project_title: str | None = None
    organization_name: str | None = None

    @model_validator(mode="after")
    def validate_input(self) -> "AnalyzeRequest":
        if not (self.text and self.text.strip()) and not (self.file_base64 and self.file_base64.strip()):
            raise ValueError("Either text or file_base64 is required")
        return self


class AnalyzeResponse(BaseModel):
    analysis_status: str = "completed"
    document: DocumentMetadata
    raw_text_preview: str = ""
    structure: NotebookStructure
    semantic: NotebookSemantic
    score: NotebookScore
    recommendations: list[Recommendation]
    generate_improved_tz: NotebookImprovedTZ
    improved_tz: str
    extracted_entities: NotebookEntityBundle
    confirmed_entities: NotebookEntityBundle
    detected_sections: list[Section]
    missing_required_sections: list[str]
    weak_sections: list[str]
    findings: list[Finding]
    suggested_structure: str
    improved_text: str
    ai_document_analysis_scorecard: Scorecard
    ai_preliminary_evaluation_scorecard: Scorecard
    model_metadata: ModelMetadata
