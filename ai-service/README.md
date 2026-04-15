# Satpayev AI Service

FastAPI service for scientific technical specification analysis.

This module is the AI contract boundary for the monorepo. It is intentionally kept separate from the core backend and must stay stateless.
All user-facing AI responses and LLM prompts default to Russian.

## Responsibilities

- expose HTTP contracts for document analysis, generation, and chat;
- preserve the notebook-shaped analysis output from `NLP/tz_analysis_mvp.ipynb`;
- keep scientific novelty and relevance reasoning aligned with `novelty_and_relevance/README.md`;
- validate request and response schemas with Pydantic;
- keep future parsing, scoring, generation, and chat logic isolated in services;
- avoid direct Core Postgres, S3, or MinIO access.

## Notebook Contract

The primary analysis response preserves these keys:

- `file_path`
- `raw_text_preview`
- `structure`
- `semantic`
- `score`
- `recommendations`
- `generate_improved_tz`
- `improved_tz`
- `extracted_entities`
- `confirmed_entities`

The service also keeps the three-score model available to downstream consumers:

- notebook diagnostic scorecard;
- AI preliminary evaluation scorecard;
- final reviewed evaluation scorecard is owned by Core Backend only.

## API

- `GET /health`
- `POST /v1/analyze`
- `POST /v1/generate`
- `POST /v1/chat/respond`

The non-health endpoints now return deterministic heuristic results by default and can be switched to LLM-backed behavior later through configuration.

## How To Run

### Preferred: `uv`

Install the dependencies and start the service:

```bash
cd ai-service
uv sync --extra dev
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Fallback: `python -m venv`

If `uv` is unavailable, use a local virtual environment:

```bash
cd ai-service
python -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Docker

```bash
cd ai-service
cp .env.example .env
docker compose up --build
```

### Environment variables

The service reads these variables from `.env` or the process environment:

- `AI_SERVICE_ENV`
- `AI_SERVICE_HOST`
- `AI_SERVICE_PORT`
- `AI_SERVICE_LOG_LEVEL`
- `AI_SERVICE_LLM_ENABLED`
- `AI_SERVICE_LLM_PROVIDER`
- `AI_SERVICE_LLM_BASE_URL`
- `AI_SERVICE_LLM_API_KEY`
- `AI_SERVICE_LLM_MODEL`
- `AI_SERVICE_REQUEST_TIMEOUT_SECONDS`
- `AI_SERVICE_MAX_INPUT_CHARS`

If LLM settings are not configured, the service uses the heuristic fallback.

## How To Test

### Automated tests

Run the test suite:

```bash
cd ai-service
uv run pytest
```

If `uv` is unavailable, run the equivalent with your activated virtual environment:

```bash
python -m pytest
```

### Syntax validation

```bash
cd ai-service
python -m compileall app tests
```

### Manual smoke tests

Use the bundled demo document:

```text
docs/demo_tz_problematic.txt
```

#### Swagger-ready request bodies

Use these exact payloads in Swagger UI.

`GET /health`

- no request body

`POST /v1/analyze`

Using a repo file by relative path:

```json
{
  "file_url": "TZ_digital_polegon.docx",
  "filename": "TZ_digital_polegon.docx",
  "content_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "project_title": "Demo project",
  "organization_name": "Satpayev University"
}
```

Using the demo text file:

```json
{
  "file_url": "docs/demo_tz_problematic.txt",
  "filename": "demo_tz_problematic.txt",
  "content_type": "text/plain",
  "project_title": "Demo project",
  "organization_name": "Satpayev University"
}
```

Using inline text:

```json
{
  "text": "1. Общее описание\nПроект направлен на ...\n2. Цель\nСоздать ...",
  "filename": "demo_tz.txt",
  "content_type": "text/plain",
  "project_title": "Demo project",
  "organization_name": "Satpayev University"
}
```

`POST /v1/generate`

```json
{
  "text": "1. Общее описание\nПроект направлен на ...\n2. Цель\nСоздать ...",
  "mode": "full_tz",
  "focus_section": null,
  "findings": []
}
```

`POST /v1/chat/respond`

```json
{
  "user_message": "Почему у документа низкая оценка?",
  "context": {
    "project_title": "Demo project",
    "document_title": "TZ_digital_polegon.docx",
    "document_text_excerpt": "1. Общее описание ...",
    "detected_sections": [
      {
        "key": "overview",
        "title": "Общее описание",
        "content_excerpt": "Проект посвящен ...",
        "start_index": 0,
        "end_index": 120,
        "confidence": 0.92
      }
    ],
    "findings": [],
    "recommendations": [],
    "scorecards": [],
    "previous_messages": [],
    "admin_feedback": null
  }
}
```

`POST /v1/analyze` accepts any one of:

- `text`
- `file_base64`
- `file_url`

For `file_url`, you can pass:

- a public HTTP(S) link;
- a `file://` URL;
- a local relative or absolute path.

Recommended checks:

1. `GET /health`
   - service name is `satpayev-ai-service`
   - `llm_enabled` reflects the configuration
2. `POST /v1/analyze`
   - returns `analysis_status = completed`
   - accepts `file_url` as a repo-relative file path, `file://` URL, or HTTP(S) URL
   - returns `structure`, `semantic`, `score`, `recommendations`, `generate_improved_tz`
   - returns both scorecards:
     - `ai_document_analysis_scorecard`
     - `ai_preliminary_evaluation_scorecard`
   - detects missing sections, vague wording, and recommendations on the demo file
3. `POST /v1/generate`
   - returns `generation_status = completed`
   - returns a drafted TZ structure or section rewrite
4. `POST /v1/chat/respond`
   - returns `response_status = completed`
   - references findings and score context from the request payload

### Minimal end-to-end smoke script

```bash
python - <<'PY'
from pathlib import Path
import base64
from app.schemas.analyze import AnalyzeRequest
from app.services.analysis_service import AnalysisService

text = Path("../docs/demo_tz_problematic.txt").read_text(encoding="utf-8")
result = AnalysisService().analyze(
    AnalyzeRequest(text=text, filename="demo_tz_problematic.txt", content_type="text/plain")
)

print(result.analysis_status)
print(result.score.total_score)
print(result.ai_document_analysis_scorecard.total_score)
print(result.ai_preliminary_evaluation_scorecard.total_score)
print(result.structure.missing_sections)
print(result.recommendations[0].title if result.recommendations else "no recommendations")

file_result = AnalysisService().analyze(
    AnalyzeRequest(
        file_url="../docs/demo_tz_problematic.txt",
        filename="demo_tz_problematic.txt",
        content_type="text/plain",
    )
)
print(file_result.document.file_path)
PY
```

## What This Sprint Covers

This sprint makes the AI-service functional in isolation:

- text, DOCX, and PDF extraction;
- notebook-shaped analysis output;
- required-section detection;
- vague wording and contradiction detection;
- extracted and confirmed entities;
- recommendations and improved TZ draft generation;
- notebook diagnostic scorecard;
- official-rubric preliminary scorecard;
- context-aware chat responses;
- optional LLM client wiring for later activation.

## What To Verify Before Moving To The Backend Sprint

- the demo document returns a non-zero diagnostic score;
- missing required sections are listed;
- the preliminary scorecard totals are computed from category scores;
- the service returns stable JSON shapes for backend consumption;
- heuristic fallback works when no LLM settings are configured.

## Implementation Notes

- `NLP/` is reference/sample space only.
- `novelty_and_relevance/` is context for analysis logic and prompt design.
- Do not import from `NLP/` or `novelty_and_relevance/` directly in runtime code unless a later task explicitly turns that logic into a supported package boundary.
- Add real behavior in service classes, not route handlers.
- Keep response shapes stable once backend integration starts.
- The official Excel export remains a Core Backend concern, but the AI-service must produce the diagnostic and preliminary scorecards consumed later by that export.
