from typing import Literal

from pydantic import BaseModel, Field

from app.schemas.common import Finding


class GenerateRequest(BaseModel):
    text: str = Field(min_length=1)
    mode: Literal["section", "full_tz", "structure"] = "full_tz"
    focus_section: str | None = None
    findings: list[Finding] = Field(default_factory=list)


class GenerateResponse(BaseModel):
    generation_status: str = "completed"
    mode: str
    title: str
    content: str
    summary_of_changes: list[str]
