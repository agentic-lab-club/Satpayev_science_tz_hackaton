# Satpayev AI Service

Template FastAPI service for AI/NLP analysis of scientific technical specifications.

This module is intentionally **template-only** right now. It defines the service structure, route contracts, schemas, config, Docker setup, and tests. Real parsing, scoring, LLM calls, recommendations, and chat reasoning must be implemented in later tasks.

## Responsibilities

- expose AI-service HTTP contracts for Core Backend;
- validate request and response schemas;
- keep future parsing/scoring/generation/chat logic isolated in services;
- remain stateless;
- avoid direct Core Postgres, S3, or MinIO access.

## Non-Responsibilities

- no direct database access;
- no object-storage access;
- no notebook runtime execution;
- no backend workflow ownership;
- no final reviewed Admin scoring.

## Structure

```txt
app/
  main.py
  api/
    router.py
    routes/
  schemas/
  services/
  prompts/
  core/
  clients/
  rules/
tests/
```

## API

- `GET /health`
- `POST /v1/analyze`
- `POST /v1/generate`
- `POST /v1/chat/respond`

The non-health endpoints return explicit `template_only` placeholder responses until real implementation is added.

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
- Do not import from `NLP/`.
- Add real behavior in service classes, not route handlers.
- Keep response shapes stable once backend integration starts.

