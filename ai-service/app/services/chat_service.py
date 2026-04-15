from __future__ import annotations

from app.schemas.chat import ChatRequest, ChatResponse


class ChatService:
    """Document-aware chat response generator."""

    def respond(self, request: ChatRequest) -> ChatResponse:
        message = request.user_message.lower()
        context = request.context
        answers: list[str] = []
        referenced_sections: list[str] = []
        referenced_findings: list[str] = []
        suggested_next_actions: list[str] = []

        if context.scorecards:
            diagnostic = next((scorecard for scorecard in context.scorecards if scorecard.score_type == "ai_document_analysis"), None)
            preliminary = next((scorecard for scorecard in context.scorecards if scorecard.score_type == "ai_preliminary_evaluation"), None)
            if diagnostic:
                answers.append(f"Diagnostic score is {diagnostic.total_score:.0f}/100.")
            if preliminary:
                answers.append(f"Preliminary official-rubric score is {preliminary.total_score:.0f}/100.")

        if context.findings:
            top_findings = context.findings[:3]
            referenced_findings = [finding.finding_type for finding in top_findings]
            if any(finding.finding_type == "missing_kpi" for finding in top_findings):
                answers.append("The document is missing measurable KPI statements.")
                suggested_next_actions.append("Add 2-3 numeric KPIs with units and target thresholds.")
            if any(finding.finding_type == "missing_expected_result" for finding in top_findings):
                answers.append("The expected results need to be written in measurable form.")
                suggested_next_actions.append("Rewrite the expected results section with verifiable deliverables.")
            if any(finding.finding_type == "vague_statement" for finding in top_findings):
                answers.append("Some statements are still vague or subjective.")
                suggested_next_actions.append("Replace vague wording with numeric criteria and clear ownership.")
            if any(finding.finding_type == "inconsistency" for finding in top_findings):
                answers.append("There is at least one contradiction that should be split into separate phases.")
                suggested_next_actions.append("Separate pilot validation from production rollout.")

        if context.detected_sections:
            referenced_sections = [section.key for section in context.detected_sections[:5]]

        if "почему" in message or "why" in message:
            answers.append("I can explain the score drivers from the current document context.")
        if "kpi" in message or "показател" in message:
            answers.append("KPI improvement should focus on numeric targets, units, and verification conditions.")
        if "перепиши" in message or "rewrite" in message:
            answers.append("I can draft a cleaner section if you specify which section to rewrite.")
        if "срок" in message or "deadline" in message:
            answers.append("Deadlines should be expressed as explicit durations or calendar dates.")

        if context.admin_feedback:
            answers.append(f"Admin feedback context: {context.admin_feedback}")

        if not answers:
            answers.append("Use the findings and recommendations to rewrite the weak sections and add measurable targets.")
        if not suggested_next_actions:
            suggested_next_actions = [
                "Add measurable KPI values.",
                "Rewrite vague statements with explicit criteria.",
                "Fill any missing required sections.",
            ]

        return ChatResponse(
            response_status="completed",
            answer=" ".join(answers),
            referenced_sections=referenced_sections,
            referenced_findings=referenced_findings,
            suggested_next_actions=suggested_next_actions,
        )


def get_chat_service() -> ChatService:
    return ChatService()
