from __future__ import annotations

try:  # pragma: no cover - exercised only in environments with FastAPI installed
    from fastapi import FastAPI, Request, status
    from fastapi.exceptions import RequestValidationError
    from fastapi.responses import ORJSONResponse
except ModuleNotFoundError:  # pragma: no cover - keeps service-layer imports working in minimal environments
    FastAPI = object  # type: ignore[assignment]
    Request = object  # type: ignore[assignment]
    RequestValidationError = Exception  # type: ignore[assignment]
    ORJSONResponse = object  # type: ignore[assignment]

    class _Status:
        HTTP_400_BAD_REQUEST = 400
        HTTP_422_UNPROCESSABLE_ENTITY = 422

    status = _Status()  # type: ignore[assignment]

from app.schemas.common import ErrorDetail, ResponseEnvelope


class AIServiceError(Exception):
    def __init__(self, code: str, message: str, status_code: int = status.HTTP_400_BAD_REQUEST) -> None:
        super().__init__(message)
        self.code = code
        self.message = message
        self.status_code = status_code


def register_error_handlers(app: FastAPI) -> None:
    if FastAPI is object:  # FastAPI is not installed in this environment.
        return

    @app.exception_handler(AIServiceError)
    async def handle_service_error(_: Request, exc: AIServiceError) -> ORJSONResponse:
        envelope = ResponseEnvelope.failed(ErrorDetail(code=exc.code, message=exc.message))
        return ORJSONResponse(status_code=exc.status_code, content=envelope.model_dump(mode="json"))

    @app.exception_handler(RequestValidationError)
    async def handle_validation_error(_: Request, exc: RequestValidationError) -> ORJSONResponse:
        envelope = ResponseEnvelope.failed(
            ErrorDetail(code="validation_error", message="Invalid request payload", details=getattr(exc, "errors", lambda: [])())
        )
        return ORJSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content=envelope.model_dump(mode="json"))
