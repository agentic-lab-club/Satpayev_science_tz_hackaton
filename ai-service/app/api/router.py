from fastapi import APIRouter

from app.api.routes import analyze, chat, generate, health

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(analyze.router, prefix="/v1", tags=["analyze"])
api_router.include_router(generate.router, prefix="/v1", tags=["generate"])
api_router.include_router(chat.router, prefix="/v1", tags=["chat"])

