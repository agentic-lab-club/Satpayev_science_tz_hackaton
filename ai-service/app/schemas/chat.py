from pydantic import BaseModel, Field

from app.schemas.common import Finding, Recommendation, Scorecard, Section


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatContext(BaseModel):
    project_title: str | None = None
    document_title: str | None = None
    document_text_excerpt: str | None = None
    detected_sections: list[Section] = Field(default_factory=list)
    findings: list[Finding] = Field(default_factory=list)
    recommendations: list[Recommendation] = Field(default_factory=list)
    scorecards: list[Scorecard] = Field(default_factory=list)
    previous_messages: list[ChatMessage] = Field(default_factory=list)
    admin_feedback: str | None = None


class ChatRequest(BaseModel):
    user_message: str = Field(min_length=1)
    context: ChatContext = Field(default_factory=ChatContext)


class ChatResponse(BaseModel):
    response_status: str = "completed"
    answer: str
    referenced_sections: list[str] = Field(default_factory=list)
    referenced_findings: list[str] = Field(default_factory=list)
    suggested_next_actions: list[str] = Field(default_factory=list)
