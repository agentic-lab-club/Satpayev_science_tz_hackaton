# AI Service Agent Rules

This module is the Python FastAPI AI service for Satpayev Science TZ.

Current status: **heuristic notebook contract with optional LLM integration**.

## Required Read Order

Before editing this module, read:

1. root `PLAN.md`
2. root `ARCHITECTURE.md`
3. root `AGENTS.md`
4. `ai-service/README.md`
5. `NLP/README.md`
6. `novelty_and_relevance/README.md`
7. relevant source docs in `docs/`

Use `NLP/` and `novelty_and_relevance/` as context/reference material. Do not treat them as runtime package boundaries unless a later task explicitly promotes them.

## Module Boundaries

The AI service:

- is stateless;
- exposes HTTP endpoints for Core Backend;
- owns parsing, analysis, recommendation, generation, and chat reasoning once implemented;
- returns strict Pydantic response models;
- preserves the notebook-shaped analysis contract.

The AI service must not:

- connect directly to Core Postgres;
- access S3 or MinIO directly;
- own user/project/review/report workflow;
- generate `final_reviewed_evaluation_scorecard`;
- run notebooks at runtime;
- hide placeholder behavior as real AI results;
- generate the final reviewed Excel scorecard, which belongs to Core Backend.

## Contract Rules

The notebook-shaped analysis response is the service-facing contract.

The service should:

- return real heuristic analysis by default;
- keep schemas stable;
- preserve the notebook keys and the three-score model;
- use `is_placeholder=true` only for explicit template helpers;
- avoid fake realistic scores.

The notebook output keys are the service-facing analysis contract:

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
