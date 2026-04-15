# Satpayev AI Service

FastAPI service for scientific technical specification analysis.

This module is the AI contract boundary for the monorepo. It is intentionally kept separate from the core backend and must stay stateless.

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

## Local Development

Install `uv`, then:

```bash
uv sync --extra dev
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Run tests:

```bash
uv run pytest
```

Docker:

```bash
cp .env.example .env
docker compose up --build
```

## Implementation Notes

- `NLP/` is reference/sample space only.
- `novelty_and_relevance/` is context for analysis logic and prompt design.
- Do not import from `NLP/` or `novelty_and_relevance/` directly in runtime code unless a later task explicitly turns that logic into a supported package boundary.
- Add real behavior in service classes, not route handlers.
- Keep response shapes stable once backend integration starts.
- The official Excel export remains a Core Backend concern, but the AI-service must produce the diagnostic and preliminary scorecards consumed later by that export.
