# Project Skills

This file defines reusable workflows for agents working in this repository. It is not a replacement for `AGENTS.md`; it is a task playbook.

## Skill: Spike To Implementation Plan

Use when turning research or chat notes into implementation work.

Inputs:

- official hackathon requirement: `docs/ТЗ_официальное (1).docx`;
- user story/business spike: `docs/spikes/001-draft-final-user-story-and-business-logic.md`;
- technical specification spike: `docs/spikes/002-draft-final-technical-specification-and-architecture.md`;
- source conversation: `docs/spikes/ChatGPT-Разбор-Технического-Задания.md`;
- current architecture: `ARCHITECTURE.md`;
- current plan: `PLAN.md`.

Workflow:

1. Extract the official must-have requirements first.
2. Separate hackathon MVP from product stretch.
3. Preserve the three-scorecard model from `PLAN.md`.
4. Identify the primary write module.
5. Produce implementation tasks with acceptance criteria.

Output:

- a scoped implementation plan;
- explicit assumptions;
- tests and manual demo script.

## Skill: Backend Module Implementation

Use when implementing Go backend features.

Read first:

- `backend/AGENTS.md`;
- `backend/README.md`;
- `backend/ARCHITECTURE.md`;
- `PLAN.md`;
- `ARCHITECTURE.md`.

Workflow:

1. Inspect `backend/cmd/server/main.go` for current wiring.
2. Copy local patterns from existing modules such as `auth`, `assets`, and `healthcheck`.
3. Add migrations before repository code.
4. Keep handlers thin and business rules in services.
5. Keep repositories data-only.
6. Use `TrackedDB` methods where practical.
7. Validate scorecard max values and recompute totals in backend.
8. Add focused tests in the same module.

Definition of done:

- routes are wired from `cmd/server/main.go`;
- migrations are reversible;
- Swagger annotations exist for new endpoints;
- tests cover service rules and handler validation;
- no unrelated modules are modified.

## Skill: AI Service Implementation

Use when creating or changing the Python AI/LLM service.

Read first:

- `PLAN.md`;
- `ARCHITECTURE.md`;
- `NLP/README.md`;
- `NLP/build_tz_analysis_notebook.py`;
- `docs/ТЗ_официальное (1).docx`;
- `docs/Шаблон для ТЗ рус.docx`.

Workflow:

1. Create or update the deployable service under `llm/`.
2. Keep the service stateless.
3. Do not connect directly to Core Postgres.
4. Accept text/context from backend.
5. Return strict JSON for analysis and chat.
6. Include heuristic fallback without API keys.
7. Generate both AI diagnostic and AI preliminary evaluation scorecards.

Definition of done:

- `/health`, `/v1/analyze`, and `/v1/chat/respond` work;
- sample documents produce valid schema;
- no hidden DB dependency exists;
- Docker integration is ready or documented.

## Skill: Frontend Integration

Use when replacing mock UI with real API behavior.

Read first:

- `frontend/README.md`;
- `frontend/agents/AGENTS.md`;
- `PLAN.md`;
- `ARCHITECTURE.md`;
- backend API docs or Swagger.

Workflow:

1. Identify the exact backend endpoints.
2. Replace mock data only in the target flow.
3. Keep UI state explicit: idle, uploading, analyzing, completed, failed.
4. Render two score panels:
   - document diagnostic score;
   - official-rubric preliminary/final score.
5. Keep Admin final score category-based.
6. Preserve responsive behavior.

Definition of done:

- `npm run build` passes;
- client demo flow works against backend;
- admin flow is implemented only after backend review APIs exist.

## Skill: Architecture Documentation Update

Use when changing service boundaries, scoring, deployment shape, or data ownership.

Read first:

- `ARCHITECTURE.md`;
- `PLAN.md`;
- `infrastructure/README.md`;
- `infrastructure/terraform/envs/dev/main.tf`;
- root `docker-compose.yml`;
- `docker-compose.prod.yml`.

Workflow:

1. Update C4 diagram if container boundaries change.
2. Update ERD if persisted entities or relationships change.
3. Update IaC diagram if Terraform resources, ports, secrets, or deployment topology change.
4. Keep diagrams in PlantUML.
5. Keep image references only if generated images exist.

Definition of done:

- diagrams are consistent with code and Terraform;
- scoring model in docs matches backend rules;
- no obsolete domain names remain.

## Skill: Hackathon Demo Readiness

Use before a demo or final submission.

Checklist:

- upload works for `PDF`, `DOCX`, and `TXT`;
- sample `docs/TZ_digital_polegon.docx` analyzes successfully;
- score `0..100` is visible;
- both scorecards are understandable;
- missing sections, issues, recommendations, and improved text are visible;
- chat answers about the uploaded document;
- report can be downloaded;
- architecture and AI usage can be explained in under three minutes;
- repository and docs are ready for judges.
