# Documentation Index

This directory contains source documents, spikes, AI-session notes, and planning context for Satpayev Science TZ.

## Source Of Truth Order

Use this order when documents overlap:

1. Current user request.
2. Root `PLAN.md`.
3. Root `ARCHITECTURE.md`.
4. Official hackathon requirement: `docs/ТЗ_официальное.docx`.
5. Scientific TZ template: `docs/Шаблон для ТЗ рус.docx`.
6. Excel evaluation template: `docs/Оценка_ТЗ_шаблон.xlsx`.
7. Final business spike: `docs/spikes/001-draft-final-user-story-and-business-logic.md`.
8. Final technical spike: `docs/spikes/002-draft-final-technical-specification-and-architecture.md`.
9. Source AI conversation: `docs/spikes/ChatGPT-Разбор-Технического-Задания.md`.
10. AI session notes in `docs/ai-sessions/`.

If older spike text conflicts with `PLAN.md`, prefer `PLAN.md`.

## Hackathon Documents

- `docs/ТЗ_официальное.docx` - official hackathon technical requirement.
- `docs/Шаблон_для_ТЗ_рус.docx` - scientific technical specification template to analyze against.
- `docs/TZ_digital_polegon.docx` - example scientific TZ for demos and tests.
- `docs/Оценка_ТЗ_шаблон.xlsx` - official evaluation table template.

## Spike Documents

- `docs/spikes/001-draft-final-user-story-and-business-logic.md` - product/user-story spike.
- `docs/spikes/002-draft-final-technical-specification-and-architecture.md` - engineering architecture spike.
- `docs/spikes/ChatGPT-Разбор-Технического-Задания.md` - full source conversation and reasoning history.
- `docs/spikes/demo_tz_problematic.txt` - weak/problematic sample text for tests.
- `backend/internal/tzworkflow/README.md` - backend scientific TZ workflow module contract.

## AI Session Notes

`docs/ai-sessions/` stores captured AI sessions. Treat them as supporting context only.

Use them when:

- a current requirement references prior decisions;
- implementation rationale is missing from final docs;
- you need to recover why a product rule exists.

Do not use them to override:

- current user request;
- `PLAN.md`;
- `ARCHITECTURE.md`;
- official hackathon documents.

## Context Retrieval Rules

Before coding a new feature, read only what is needed:

1. Root `PLAN.md` for product and scoring rules.
2. Root `ARCHITECTURE.md` for container/data/deployment boundaries.
3. Target module docs, such as `backend/AGENTS.md` or `frontend/README.md`.
4. Official document or spike section relevant to the feature.

For scoring work, always read:

- `PLAN.md`;
- `docs/Оценка_ТЗ_шаблон.xlsx`;
- `docs/Шаблон для ТЗ рус.docx`.

For AI analysis work, always read:

- `PLAN.md`;
- `NLP/README.md`;
- `docs/ТЗ_официальное (1).docx`;
- `docs/Шаблон для ТЗ рус.docx`;
- `docs/TZ_digital_polegon.docx`.

For report/XLSX work, always read:

- `PLAN.md`;
- `docs/Оценка_ТЗ_шаблон.xlsx`;
- `ARCHITECTURE.md`.

## Documentation Update Rules

Update docs when a change alters:

- scoring model;
- public API shape;
- service boundaries;
- persisted entities;
- deployment topology;
- AI prompt/output schema;
- demo flow.

Do not update docs for unrelated cleanup.
