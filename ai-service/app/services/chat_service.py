from app.schemas.chat import ChatRequest, ChatResponse


class ChatService:
    """Template chat service."""

    def respond(self, request: ChatRequest) -> ChatResponse:
        return ChatResponse(
            answer=(
                "AI chat is not implemented yet. The endpoint currently validates the "
                f"contract and received your message: {request.user_message!r}."
            ),
            referenced_sections=[],
            referenced_findings=[],
            suggested_next_actions=["Implement context-grounded chat in the AI implementation task."],
        )


def get_chat_service() -> ChatService:
    return ChatService()

