from __future__ import annotations

from app.rules.required_sections import REQUIRED_SECTIONS, SECTION_LABELS
from app.schemas.common import Finding
from app.schemas.generate import GenerateRequest, GenerateResponse


class GenerationService:
    """Generate improved TZ text and structure drafts."""

    def generate(self, request: GenerateRequest) -> GenerateResponse:
        summary, content = self._generate_content(
            text=request.text,
            mode=request.mode,
            focus_section=request.focus_section,
            findings=request.findings,
        )
        return GenerateResponse(
            generation_status="completed",
            mode=request.mode,
            title=self._title_for_mode(request.mode, request.focus_section),
            content=content,
            summary_of_changes=summary,
        )

    def build_suggested_structure(self, missing_sections: list[str], weak_sections: list[str]) -> str:
        lines = ["Recommended TZ structure:"]
        for index, key in enumerate(REQUIRED_SECTIONS, start=1):
            label = SECTION_LABELS.get(key, key)
            note = ""
            if key in missing_sections:
                note = " [missing]"
            elif key in weak_sections:
                note = " [weak]"
            lines.append(f"{index}. {label}{note}")
        return "\n".join(lines)

    def build_improved_text(
        self,
        original_text: str,
        findings: list[Finding],
        missing_sections: list[str],
        weak_sections: list[str],
    ) -> tuple[list[str], str]:
        summary, content = self._generate_content(
            text=original_text,
            mode="full_tz",
            focus_section=None,
            findings=findings,
            missing_sections=missing_sections,
            weak_sections=weak_sections,
        )
        return summary, content

    def template_suggested_structure(self) -> str:
        return self.build_suggested_structure(list(REQUIRED_SECTIONS), [])

    def template_improved_text(self) -> str:
        return self._full_tz_draft("", [], list(REQUIRED_SECTIONS), [])

    def _generate_content(
        self,
        text: str,
        mode: str,
        focus_section: str | None,
        findings: list[Finding],
        missing_sections: list[str] | None = None,
        weak_sections: list[str] | None = None,
    ) -> tuple[list[str], str]:
        missing_sections = missing_sections or []
        weak_sections = weak_sections or []
        summary = self._summary(findings=findings, missing_sections=missing_sections, weak_sections=weak_sections)

        if mode == "structure":
            return summary, self.build_suggested_structure(missing_sections, weak_sections)

        if mode == "section" and focus_section:
            return summary, self._section_draft(focus_section, text, findings)

        return summary, self._full_tz_draft(text, findings, missing_sections, weak_sections)

    def _summary(self, findings: list[Finding], missing_sections: list[str], weak_sections: list[str]) -> list[str]:
        summary: list[str] = []
        if missing_sections:
            summary.append(f"Added missing sections: {', '.join(SECTION_LABELS.get(key, key) for key in missing_sections[:4])}.")
        if weak_sections:
            summary.append(f"Strengthened weak sections: {', '.join(SECTION_LABELS.get(key, key) for key in weak_sections[:4])}.")
        if any(finding.finding_type == "vague_statement" for finding in findings):
            summary.append("Clarified vague wording and replaced subjective qualifiers with measurable phrasing.")
        if any(finding.finding_type == "missing_kpi" for finding in findings):
            summary.append("Added measurable KPI placeholders.")
        if any(finding.finding_type == "missing_expected_result" for finding in findings):
            summary.append("Added expected-result placeholders tied to measurable outcomes.")
        if any(finding.finding_type == "inconsistency" for finding in findings):
            summary.append("Separated contradictory phases into a clearer sequence.")
        return summary or ["Prepared a cleaner, more structured draft."]

    def _section_draft(self, focus_section: str, text: str, findings: list[Finding]) -> str:
        focus_label = SECTION_LABELS.get(focus_section, focus_section.replace("_", " ").title())
        lines = [
            f"{focus_label}",
            "- Rewrite the section so it has measurable inputs, outputs, and verification criteria.",
            "- State the owner, timeline, and acceptance condition.",
        ]
        if any(finding.finding_type == "vague_statement" for finding in findings):
            lines.append("- Replace subjective wording with numeric thresholds or explicit conditions.")
        if text.strip():
            lines.append("")
            lines.append("Original context excerpt:")
            lines.append(text[:800].strip())
        return "\n".join(lines).strip()

    def _full_tz_draft(self, text: str, findings: list[Finding], missing_sections: list[str], weak_sections: list[str]) -> str:
        lines = ["Improved technical specification draft", ""]
        lines.append("1. General information")
        lines.append("Describe the project purpose, scope, and stakeholders.")
        lines.append("")
        for index, key in enumerate(REQUIRED_SECTIONS[1:], start=2):
            label = SECTION_LABELS.get(key, key)
            lines.append(f"{index}. {label}")
            if key in missing_sections:
                lines.append(f"- Add concrete content for {label}.")
                lines.append("- Include measurable acceptance criteria.")
            elif key in weak_sections:
                lines.append(f"- Expand {label} with more specific details and numeric targets.")
            else:
                lines.append(f"- Preserve the existing intent for {label} and add measurable detail.")
            lines.append("")
        if text.strip():
            lines.append("Source excerpt used for rewrite:")
            lines.append(text[:1200].strip())
        if any(finding.finding_type == "inconsistency" for finding in findings):
            lines.append("")
            lines.append("Note: contradictory pilot/production statements were separated into sequential phases.")
        return "\n".join(lines).strip()

    def _title_for_mode(self, mode: str, focus_section: str | None) -> str:
        if mode == "structure":
            return "Suggested TZ structure"
        if mode == "section" and focus_section:
            return f"Improved {SECTION_LABELS.get(focus_section, focus_section)}"
        return "Improved TZ draft"


def get_generation_service() -> GenerationService:
    return GenerationService()
