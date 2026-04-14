from fastapi import APIRouter, Depends

from app.schemas.chat import ChatRequest, ChatResponse
from app.schemas.common import ResponseEnvelope
from app.services.chat_service import ChatService, get_chat_service

router = APIRouter()


@router.post("/chat/respond", response_model=ResponseEnvelope[ChatResponse])
async def respond(
    request: ChatRequest,
    service: ChatService = Depends(get_chat_service),
) -> ResponseEnvelope[ChatResponse]:
    return ResponseEnvelope.ok(service.respond(request))

