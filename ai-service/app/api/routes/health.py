from fastapi import APIRouter

from app.core.config import get_settings
from app.schemas.common import HealthData, ResponseEnvelope

router = APIRouter(tags=["health"])


@router.get("/health", response_model=ResponseEnvelope[HealthData])
async def health() -> ResponseEnvelope[HealthData]:
    settings = get_settings()
    return ResponseEnvelope.ok(
        HealthData(
            service=settings.service_name,
            version=settings.version,
            environment=settings.environment,
            llm_enabled=settings.llm_enabled,
        )
    )

