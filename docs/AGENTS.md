# Documentation Agent Rules

The `docs/` directory is planning and source-context space. Keep it accurate, searchable, and usable by future agentic coding sessions.

## Read Order

When working on documentation or using docs for implementation context:

1. Current user request.
2. Root `PLAN.md`.
3. Root `ARCHITECTURE.md`.
4. `docs/README.md`.
5. Official hackathon/source files.
6. Final spike files.
7. AI session notes.

## What To Preserve

Preserve these decisions unless the user explicitly changes them:

- Core Backend is the system of record.
- AI Service is stateless and does not access Core Postgres directly.
- Frontend talks only to Core Backend.
- The product uses three scorecards:
  - `ai_document_analysis_scorecard`;
  - `ai_preliminary_evaluation_scorecard`;
  - `final_reviewed_evaluation_scorecard`.
- Official XLSX export uses `final_reviewed_evaluation_scorecard`.
- Admin final score is category-based and total is computed.

## Writing Rules

- Prefer concise, implementation-ready docs.
- Keep source-of-truth docs near the root when they affect multiple modules.
- Keep module-specific implementation notes inside the target module.
- Do not paste long chat transcripts into new docs; summarize and link to the source file.
- Use stable repo-relative paths.
- Use PlantUML for architecture diagrams.
- Mention assumptions explicitly when docs depend on a product choice.

## Spike Rules

Spike files should answer:

- what problem is being solved;
- what official requirement drives it;
- what is in scope and out of scope;
- what data/API/interface shape is expected;
- what risks or missing decisions remain;
- what implementation order is recommended.

Before implementing from a spike, check whether `PLAN.md` has superseded it.

## Context Hygiene

Do not bulk-read every AI session by default. Start with:

- `PLAN.md`;
- `ARCHITECTURE.md`;
- final spike docs;
- the target module docs.

Read `docs/ai-sessions/` only when final docs do not explain a decision.
