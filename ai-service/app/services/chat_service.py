from __future__ import annotations

from app.clients.llm_client import LLMClient
from app.prompts.policy import load_prompt
from app.schemas.chat import ChatContext, ChatRequest, ChatResponse


class ChatService:
    """Document-aware chat response generator."""

    def __init__(self, llm_client: LLMClient | None = None) -> None:
        self.llm_client = llm_client or LLMClient()

    def respond(self, request: ChatRequest) -> ChatResponse:
        message = request.user_message.lower()
        context = request.context
        referenced_sections = [section.key for section in context.detected_sections[:5]]
        referenced_findings = [finding.finding_type for finding in context.findings[:3]]
        suggested_next_actions = self._suggested_next_actions(context, message)

        if self.llm_client.enabled:
            llm_answer = self._respond_with_llm(request)
            if llm_answer:
                return ChatResponse(
                    response_status="completed",
                    answer=llm_answer,
                    referenced_sections=referenced_sections,
                    referenced_findings=referenced_findings,
                    suggested_next_actions=suggested_next_actions,
                )

        heuristic_answer = self._heuristic_answer(request, suggested_next_actions)

        return ChatResponse(
            response_status="completed",
            answer=heuristic_answer,
            referenced_sections=referenced_sections,
            referenced_findings=referenced_findings,
            suggested_next_actions=suggested_next_actions,
        )

    def _suggested_next_actions(self, context: ChatContext, message: str) -> list[str]:
        suggested_next_actions: list[str] = []
        top_findings = context.findings[:3]
        if top_findings:
            if any(finding.finding_type == "missing_kpi" for finding in top_findings):
                suggested_next_actions.append("Добавьте 2-3 числовых KPI с единицами измерения и целевыми порогами.")
            if any(finding.finding_type == "missing_expected_result" for finding in top_findings):
                suggested_next_actions.append("Перепишите раздел ожидаемых результатов через проверяемые поставляемые результаты.")
            if any(finding.finding_type == "vague_statement" for finding in top_findings):
                suggested_next_actions.append("Замените размытые формулировки на числовые критерии и явное распределение ответственности.")
            if any(finding.finding_type == "inconsistency" for finding in top_findings):
                suggested_next_actions.append("Разделите пилотную проверку и промышленный запуск на разные этапы.")

        if "kpi" in message or "показател" in message:
            suggested_next_actions.append("Укажите числовые показатели, единицы измерения и условия проверки.")
        if "перепиши" in message or "rewrite" in message:
            suggested_next_actions.append("Уточните, какой именно раздел нужно изменить, чтобы я переписал его точнее.")
        if "срок" in message or "deadline" in message:
            suggested_next_actions.append("Зафиксируйте срок как календарную дату или длительность с чёткой точкой отсчёта.")

        if context.admin_feedback:
            suggested_next_actions.append("Учитывайте комментарий администратора в следующей версии документа.")

        return suggested_next_actions or [
            "Добавьте измеримые значения KPI.",
            "Перепишите размытые формулировки через явные критерии.",
            "Заполните все отсутствующие обязательные разделы.",
        ]

    def _respond_with_llm(self, request: ChatRequest) -> str | None:
        system_prompt = load_prompt("chat", "system")
        prompt = self._build_llm_prompt(request)
        try:
            answer = self.llm_client.complete(prompt, system_prompt=system_prompt).strip()
        except Exception:  # pragma: no cover - network/provider failure fallback
            return None
        return answer or None

    def _build_llm_prompt(self, request: ChatRequest) -> str:
        context = request.context
        lines: list[str] = [
            "Пользовательский вопрос:",
            request.user_message.strip(),
            "",
            "Контекст документа:",
            f"- Проект: {context.project_title or 'не указан'}",
            f"- Документ: {context.document_title or 'не указан'}",
            f"- Фрагмент текста: {context.document_text_excerpt or 'не предоставлен'}",
            "",
            "Сводка анализа:",
        ]

        if context.scorecards:
            for scorecard in context.scorecards[:2]:
                lines.append(f"- {scorecard.score_type}: {scorecard.total_score:.0f}/{scorecard.max_total_score:.0f}")
        if context.findings:
            for finding in context.findings[:5]:
                lines.append(f"- {finding.finding_type}: {finding.explanation} Рекомендация: {finding.recommendation}")
        if context.recommendations:
            for recommendation in context.recommendations[:5]:
                lines.append(f"- {recommendation.title}: {recommendation.description}")
        if context.previous_messages:
            lines.append("")
            lines.append("Последние сообщения диалога:")
            for message in context.previous_messages[-6:]:
                lines.append(f"- {message.role}: {message.content}")
        if context.admin_feedback:
            lines.append("")
            lines.append(f"Комментарий администратора: {context.admin_feedback}")

        lines.extend(
            [
                "",
                "Требования к ответу:",
                "- Отвечай только на русском языке.",
                "- Используй контекст документа и анализа, не выдумывай факты.",
                "- Если вопрос про оценку, объясни её причину через findings и scorecards.",
                "- Если вопрос про улучшение, предложи 2-4 конкретных действия.",
                "- Пиши кратко, но по делу.",
            ]
        )
        return "\n".join(lines)

    def _heuristic_answer(self, request: ChatRequest, suggested_next_actions: list[str]) -> str:
        message = request.user_message.lower()
        context = request.context
        answers: list[str] = []

        diagnostic = next(
            (
                scorecard
                for scorecard in context.scorecards
                if self._is_scorecard_type(scorecard.score_type, "ai_document_analysis")
            ),
            None,
        )
        preliminary = next(
            (
                scorecard
                for scorecard in context.scorecards
                if self._is_scorecard_type(scorecard.score_type, "ai_preliminary_evaluation")
            ),
            None,
        )
        if diagnostic:
            answers.append(f"Диагностическая оценка составляет {diagnostic.total_score:.0f}/100.")
        if preliminary:
            answers.append(f"Предварительная оценка по официальной рубрике составляет {preliminary.total_score:.0f}/100.")

        top_findings = context.findings[:3]
        if top_findings:
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
            suggested_next_actions.extend([
                "Добавьте измеримые значения KPI.",
                "Перепишите размытые формулировки через явные критерии.",
                "Заполните все отсутствующие обязательные разделы.",
            ])
        return " ".join(answers)

    @staticmethod
    def _is_scorecard_type(actual: str, expected: str) -> bool:
        normalized = actual.strip().lower()
        expected = expected.strip().lower()
        return normalized == expected or normalized == f"{expected}_scorecard"


def get_chat_service() -> ChatService:
    return ChatService()
