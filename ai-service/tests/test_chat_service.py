from app.schemas.chat import ChatContext, ChatRequest
from app.schemas.common import Recommendation, Scorecard, ScorecardItem
from app.services.chat_service import ChatService


class FakeLLMClient:
    enabled = True

    def __init__(self, answer: str) -> None:
        self.answer = answer
        self.calls: list[str] = []

    def complete(self, prompt: str, system_prompt: str | None = None) -> str:
        self.calls.append(prompt)
        return self.answer


def test_chat_service_accepts_backend_scorecard_suffixes() -> None:
    service = ChatService()
    response = service.respond(
        ChatRequest(
            user_message="Почему у документа низкий score?",
            context=ChatContext(
                scorecards=[
                    Scorecard(
                        score_type="ai_document_analysis_scorecard",
                        total_score=48,
                        max_total_score=100,
                        items=[
                            ScorecardItem(
                                key="structure",
                                label="Структура",
                                score=48,
                                max_score=100,
                                explanation="Есть пробелы в структуре.",
                            )
                        ],
                    ),
                    Scorecard(
                        score_type="ai_preliminary_evaluation_scorecard",
                        total_score=81,
                        max_total_score=100,
                        items=[
                            ScorecardItem(
                                key="scientific_novelty",
                                label="Научная новизна",
                                score=12,
                                max_score=15,
                                explanation="Нужна детализация.",
                            )
                        ],
                    ),
                ],
                recommendations=[
                    Recommendation(
                        category="structure",
                        title="Добавить цель",
                        description="Явно сформулируйте цель документа.",
                        priority=1,
                    )
                ],
            ),
        )
    )

    assert response.response_status == "completed"
    assert "Диагностическая оценка составляет 48/100." in response.answer
    assert "Предварительная оценка по официальной рубрике составляет 81/100." in response.answer


def test_chat_service_uses_llm_response_when_enabled() -> None:
    fake_llm = FakeLLMClient("LLM-ответ по контексту документа.")
    service = ChatService(llm_client=fake_llm)

    response = service.respond(
        ChatRequest(
            user_message="Почему у документа низкая оценка?",
            context=ChatContext(
                project_title="Demo project",
                document_title="TZ.docx",
                document_text_excerpt="Текст документа...",
                scorecards=[
                    Scorecard(
                        score_type="ai_document_analysis_scorecard",
                        total_score=68,
                        max_total_score=100,
                        items=[
                            ScorecardItem(
                                key="structure",
                                label="Структура",
                                score=68,
                                max_score=100,
                                explanation="Есть пробелы в структуре.",
                            )
                        ],
                    )
                ],
                recommendations=[
                    Recommendation(
                        category="structure",
                        title="Уточнить цель",
                        description="Сделайте цель измеримой.",
                        priority=1,
                    )
                ],
            ),
        )
    )

    assert fake_llm.calls, "expected the LLM client to be invoked"
    assert response.answer == "LLM-ответ по контексту документа."
