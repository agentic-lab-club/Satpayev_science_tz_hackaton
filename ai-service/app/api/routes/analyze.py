from fastapi import APIRouter, Depends

from app.schemas.analyze import AnalyzeRequest, AnalyzeResponse
from app.schemas.common import ResponseEnvelope
from app.services.analysis_service import AnalysisService, get_analysis_service

router = APIRouter()


@router.post("/analyze", response_model=ResponseEnvelope[AnalyzeResponse])
async def analyze(
    request: AnalyzeRequest,
    service: AnalysisService = Depends(get_analysis_service),
) -> ResponseEnvelope[AnalyzeResponse]:
    return ResponseEnvelope.ok(service.analyze(request))

