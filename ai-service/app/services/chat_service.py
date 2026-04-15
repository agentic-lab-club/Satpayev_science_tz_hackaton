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
                answers.append(f"Диагностическая оценка составляет {diagnostic.total_score:.0f}/100.")
            if preliminary:
                answers.append(f"Предварительная оценка по официальной рубрике составляет {preliminary.total_score:.0f}/100.")

        if context.findings:
            top_findings = context.findings[:3]
            referenced_findings = [finding.finding_type for finding in top_findings]
            if any(finding.finding_type == "missing_kpi" for finding in top_findings):
                answers.append("В документе не хватает измеримых KPI.")
                suggested_next_actions.append("Добавьте 2-3 числовых KPI с единицами измерения и целевыми порогами.")
            if any(finding.finding_type == "missing_expected_result" for finding in top_findings):
                answers.append("Ожидаемые результаты нужно сформулировать в измеримом виде.")
                suggested_next_actions.append("Перепишите раздел ожидаемых результатов через проверяемые поставляемые результаты.")
            if any(finding.finding_type == "vague_statement" for finding in top_findings):
                answers.append("Часть формулировок остаётся слишком общей или субъективной.")
                suggested_next_actions.append("Замените размытые формулировки на числовые критерии и явное распределение ответственности.")
            if any(finding.finding_type == "inconsistency" for finding in top_findings):
                answers.append("Есть как минимум одно противоречие, которое нужно разнести по отдельным этапам.")
                suggested_next_actions.append("Разделите пилотную проверку и промышленный запуск на разные этапы.")

        if context.detected_sections:
            referenced_sections = [section.key for section in context.detected_sections[:5]]

        if "почему" in message or "why" in message:
            answers.append("Могу объяснить, какие факторы повлияли на оценку по текущему контексту документа.")
        if "kpi" in message or "показател" in message:
            answers.append("Для KPI лучше указывать числовые значения, единицы измерения и условия проверки.")
        if "перепиши" in message or "rewrite" in message:
            answers.append("Я могу переписать раздел, если вы укажете, какой именно раздел нужно изменить.")
        if "срок" in message or "deadline" in message:
            answers.append("Сроки нужно задавать в явном виде: через длительность или календарную дату.")

        if context.admin_feedback:
            answers.append(f"Контекст от администратора: {context.admin_feedback}")

        if not answers:
            answers.append("Используйте найденные замечания и рекомендации, чтобы переписать слабые разделы и добавить измеримые цели.")
        if not suggested_next_actions:
            suggested_next_actions = [
                "Добавьте измеримые значения KPI.",
                "Перепишите размытые формулировки через явные критерии.",
                "Заполните все отсутствующие обязательные разделы.",
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
