from fastapi import APIRouter, Depends

from app.schemas.common import ResponseEnvelope
from app.schemas.generate import GenerateRequest, GenerateResponse
from app.services.generation_service import GenerationService, get_generation_service

router = APIRouter()


@router.post("/generate", response_model=ResponseEnvelope[GenerateResponse])
async def generate(
    request: GenerateRequest,
    service: GenerationService = Depends(get_generation_service),
) -> ResponseEnvelope[GenerateResponse]:
    return ResponseEnvelope.ok(service.generate(request))

