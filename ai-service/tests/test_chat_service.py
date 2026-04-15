from app.schemas.chat import ChatContext, ChatRequest
from app.schemas.common import Recommendation, Scorecard, ScorecardItem
from app.services.chat_service import ChatService


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
