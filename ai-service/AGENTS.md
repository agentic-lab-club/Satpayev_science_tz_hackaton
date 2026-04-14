# AI Service Agent Rules

This module is the Python FastAPI AI service for Satpayev Science TZ.

Current status: **template-only**.

## Required Read Order

Before editing this module, read:

1. root `PLAN.md`
2. root `ARCHITECTURE.md`
3. root `AGENTS.md`
4. `ai-service/README.md`
5. relevant source docs in `docs/`

Use `NLP/` only as reference/sample material. Do not import from it.

## Module Boundaries

The AI service:

- is stateless;
- exposes HTTP endpoints for Core Backend;
- owns parsing, analysis, recommendation, generation, and chat reasoning once implemented;
- returns strict Pydantic response models.

The AI service must not:

- connect directly to Core Postgres;
- access S3 or MinIO directly;
- own user/project/review/report workflow;
- generate `final_reviewed_evaluation_scorecard`;
- run notebooks at runtime;
- hide placeholder behavior as real AI results.

## Template Rules

Until real implementation is requested:

- keep endpoints wired;
- keep schemas stable;
- return explicit `template_only` responses;
- mark placeholder scorecards with `is_placeholder=true`;
- avoid fake realistic scores;
- keep service files ready for later real logic.

## Implementation Rules For Later Tasks

- Put orchestration in `services/analysis_service.py`.
- Keep route handlers thin.
- Put provider calls behind `clients/llm_client.py`.
- Put deterministic rubrics and patterns in `rules/`.
- Put prompt text in `prompts/`, not inline in service code.
- Add tests with every behavior change.

## Validation

Preferred commands:

```bash
uv run pytest
uv run python -m compileall app tests
docker compose config
```

If `uv` is unavailable locally, use `python -m compileall app tests` for syntax validation and report that dependency-based tests were not run.

