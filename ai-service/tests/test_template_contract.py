from pathlib import Path

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


def test_analyze_returns_real_analysis() -> None:
    client = TestClient(app)
    sample_text = Path("/workspaces/Satpayev_science_tz_hackaton/docs/spikes/demo_tz_problematic.txt").read_text(encoding="utf-8")

    response = client.post(
        "/v1/analyze",
        json={"text": sample_text, "filename": "demo_tz_problematic.txt", "content_type": "text/plain"},
    )

    assert response.status_code == 200
    body = response.json()
    data = body["data"]

    assert body["status"] == "ok"
    assert data["analysis_status"] == "completed"
    assert data["raw_text_preview"].startswith("1. Общее описание")
    assert data["score"]["total_score"] > 0
    assert set(data["score"]["breakdown"].keys()) == {"structure", "completeness", "clarity", "kpi_results", "consistency"}
    assert data["ai_document_analysis_scorecard"]["is_placeholder"] is False
    assert data["ai_preliminary_evaluation_scorecard"]["is_placeholder"] is False
    assert data["missing_required_sections"]
    assert data["findings"]
    assert data["recommendations"]
    assert data["generate_improved_tz"]["summary_of_changes"]
    assert "Improved" in data["improved_tz"] or "Improved" in data["generate_improved_tz"]["improved_text"]


def test_generate_returns_completed_draft() -> None:
    client = TestClient(app)

    response = client.post(
        "/v1/generate",
        json={
            "text": "1. Общее описание\n2. Цель\nСоздать систему.\n3. Задачи\n- Проверить документ.",
            "mode": "full_tz",
        },
    )

    assert response.status_code == 200
    body = response.json()
    data = body["data"]

    assert body["status"] == "ok"
    assert data["generation_status"] == "completed"
    assert data["content"]
    assert data["summary_of_changes"]


def test_chat_returns_contextual_response() -> None:
    client = TestClient(app)

    response = client.post(
        "/v1/chat/respond",
        json={
            "user_message": "Почему моя оценка низкая?",
            "context": {
                "project_title": "Demo",
                "document_title": "Demo TZ",
                "scorecards": [
                    {
                        "score_type": "ai_document_analysis",
                        "total_score": 54,
                        "max_total_score": 100,
                        "items": [],
                        "is_placeholder": False,
                    }
                ],
                "findings": [
                    {
                        "finding_type": "missing_kpi",
                        "severity": "high",
                        "section_key": "quantitative_indicators",
                        "quote": "",
                        "explanation": "No quantitative indicators were detected.",
                        "recommendation": "Add numeric indicators.",
                    }
                ],
            },
        },
    )

    assert response.status_code == 200
    body = response.json()
    data = body["data"]

    assert body["status"] == "ok"
    assert data["response_status"] == "completed"
    assert "Diagnostic score" in data["answer"]
    assert data["referenced_findings"]
    assert data["suggested_next_actions"]
