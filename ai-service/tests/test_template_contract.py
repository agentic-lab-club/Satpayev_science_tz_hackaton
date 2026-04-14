from fastapi.testclient import TestClient

from app.main import app
from app.schemas.analyze import AnalyzeRequest
from app.schemas.chat import ChatRequest
from app.schemas.generate import GenerateRequest


def test_openapi_registers_template_routes() -> None:
    paths = set(app.openapi()["paths"].keys())

    assert "/health" in paths
    assert "/v1/analyze" in paths
    assert "/v1/generate" in paths
    assert "/v1/chat/respond" in paths


def test_schema_payloads_validate() -> None:
    AnalyzeRequest(text="Техническое задание", filename="sample.txt", content_type="text/plain")
    GenerateRequest(text="Техническое задание")
    ChatRequest(user_message="Почему оценка низкая?")


def test_analyze_returns_template_placeholder() -> None:
    client = TestClient(app)

    response = client.post(
        "/v1/analyze",
        json={"text": "Техническое задание", "filename": "sample.txt", "content_type": "text/plain"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["data"]["analysis_status"] == "template_only"
    assert body["data"]["ai_document_analysis_scorecard"]["is_placeholder"] is True
    assert body["data"]["ai_preliminary_evaluation_scorecard"]["is_placeholder"] is True


def test_generate_returns_template_placeholder() -> None:
    client = TestClient(app)

    response = client.post("/v1/generate", json={"text": "Техническое задание"})

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["data"]["generation_status"] == "template_only"


def test_chat_returns_template_placeholder() -> None:
    client = TestClient(app)

    response = client.post("/v1/chat/respond", json={"user_message": "Что улучшить?"})

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["data"]["response_status"] == "template_only"

