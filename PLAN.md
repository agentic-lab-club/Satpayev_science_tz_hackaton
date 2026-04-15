# Satpayev Science TZ Implementation Plan

This plan turns the hackathon requirements, the notebook pipeline in `NLP/tz_analysis_mvp.ipynb`, the sample output in `NLP/notebook_outputs/tz_analysis_report.json`, and the `novelty_and_relevance/` context into a build order that agents can execute without re-deciding scope.

## 1. Product Shape

Build an AI system for analyzing and improving scientific technical specifications.

The MVP must support:

- auth and project history;
- upload of `PDF`, `DOCX`, and `TXT` technical specifications;
- document extraction and structure analysis;
- semantic checks for contradictions, missing elements, deadlines, KPI, and expected results;
- AI-generated recommendations and improved TZ text;
- notebook-shaped analysis output;
- score `0..100`;
- document-aware chat;
- report download;
- expert/admin review and XLSX export.

## 2. AI Contract

The AI service should reproduce the notebook pipeline as a FastAPI service.

### 2.1 Notebook-shaped analysis output

`POST /v1/analyze` should preserve the notebook response contract:

- `file_path`
- `raw_text_preview`
- `structure`
  - `sections`
  - `found_sections`
  - `missing_sections`
  - `weak_sections`
  - `empty_sections`
  - `matched_required_sections`
- `semantic`
  - `ambiguities`
  - `contradictions`
  - `missing_elements`
  - `requirements`
  - `deadlines`
  - `kpis`
  - `expected_results`
- `score`
  - `total_score`
  - `breakdown`
  - `explanation`
- `recommendations`
- `generate_improved_tz`
  - `summary_of_changes`
  - `improved_text`
- `improved_tz`
- `extracted_entities`
- `confirmed_entities`

The notebook pipeline is the implementation reference:

- `run_pipeline(...)` = orchestration model;
- `calculate_score(...)` = explainable diagnostic scoring;
- `generate_improved_tz(...)` = improvement flow;
- entity extraction and confirmation = first-class pipeline outputs.

### 2.2 `novelty_and_relevance/` context

The `novelty_and_relevance/README.md` module is the domain reference for:

- scientific novelty evaluation;
- relevance / socio-economic reasoning;
- retrieval-grounded analysis;
- recommendation logic for scientific project quality.

It should be integrated into `ai-service/` as context, prompts, and rules, not as a separate runtime dependency in the MVP.

## 3. Scoring Model

Keep the three-score model and make the distinction explicit.

### 3.1 AI document analysis scorecard

Diagnostic quality score derived from the notebook pipeline.

Use this as the AI health score for Client and Admin:

- `structure`
- `completeness`
- `clarity`
- `kpi_results`
- `consistency`

The total is computed from the diagnostic breakdown.

### 3.2 AI preliminary evaluation scorecard

AI draft using the official Excel rubric:

- `strategic_relevance` = 20
- `goals_and_tasks` = 10
- `scientific_novelty` = 15
- `practical_applicability` = 20
- `expected_results` = 15
- `socio_economic_effect` = 10
- `feasibility` = 10

The total is the sum of the rubric categories.

### 3.3 Final reviewed evaluation scorecard

Official Admin/Expert scorecard.

- uses the same rubric categories and max values as the preliminary scorecard;
- Admin edits category values, not the total;
- backend computes the final total;
- official XLSX export uses this scorecard only.

Do not collapse the diagnostic notebook score into the Excel rubric.

## 4. Implementation Order

### Phase 0. Documentation foundation

Update and align:

- `PLAN.md`
- `ARCHITECTURE.md`
- root `AGENTS.md`
- `docs/README.md`
- `ai-service/AGENTS.md`
- `ai-service/README.md`

Acceptance:

- the notebook contract is first-class;
- the three-score model is explicit;
- `ai-service/` reads like a service contract, not a notebook dump;
- backend, AI-service, and frontend boundaries are clear.

### Phase 1. AI service

Target module: `ai-service/`.

Make the FastAPI service reflect the notebook and novelty/relevance context:

- `POST /v1/analyze`
- `POST /v1/generate`
- `POST /v1/chat/respond`
- `GET /health`

Requirements:

- stateless;
- strict Pydantic schemas;
- heuristic fallback when no LLM key exists;
- no direct Core Postgres or object storage access;
- no notebook runtime execution;
- response shape must preserve the notebook contract.

### Phase 2. Backend

Target module: `backend/`.

Implement the system of record:

- projects and document versions;
- upload and extraction orchestration;
- analysis persistence;
- both AI scorecards;
- final reviewed scorecard;
- chat history;
- review workflow;
- report export;
- API calls to `ai-service`.

The first backend implementation slice is the scientific TZ workflow module:

- `internal/tzworkflow`
- persisted project/version/analysis/chat/review/report entities
- typed AI-service HTTP client integration

Minimum API surface:

- `POST /api/v1/projects`
- `GET /api/v1/projects`
- `GET /api/v1/projects/{project_id}`
- `POST /api/v1/projects/{project_id}/versions`
- `GET /api/v1/projects/{project_id}/versions`
- `POST /api/v1/projects/{project_id}/versions/{version_id}/analyze`
- `GET /api/v1/projects/{project_id}/versions/{version_id}/analysis/latest`
- `POST /api/v1/projects/{project_id}/chat-sessions`
- `POST /api/v1/projects/{project_id}/chat-sessions/{session_id}/messages`
- `POST /api/v1/projects/{project_id}/submit-for-review`
- `GET /api/v1/admin/review-submissions`
- `POST /api/v1/admin/review-submissions/{submission_id}/decision`
- `POST /api/v1/admin/reports/exports`

### Phase 3. Frontend

Target module: `frontend/`.

Replace mock flows with real backend calls and render the notebook-shaped output:

- upload and history;
- structure analysis;
- semantic findings;
- extracted and confirmed entities;
- recommendations;
- improved TZ preview;
- notebook-style diagnostic score;
- official rubric preview;
- admin final review and export;
- document-aware chat.

### Phase 4. Infrastructure

After backend and AI service stabilize:

- wire `ai-service` into local and production compose;
- add backend `AI_SERVICE_URL`;
- update Terraform docs only if the deployment contract changes.

## 5. Chat Contract

Chat must be bound to a project and document version.

Backend chat context:

- project metadata;
- active document version;
- extracted text snapshot;
- latest analysis;
- `ai_document_analysis_scorecard`;
- `ai_preliminary_evaluation_scorecard`;
- findings and recommendations;
- previous chat messages;
- optional admin feedback.

Rules:

- chat may explain low scores and suggest rewrites;
- chat must not mutate stored document versions;
- saving rewritten text requires a new version or explicit update flow.

## 6. Test Plan

AI service:

- notebook-shaped response contract validation;
- required keys present in `structure`, `semantic`, `score`, and `improved_tz`;
- heuristic fallback without API key;
- analysis on `docs/TZ_digital_polegon.docx`;
- novelty/relevance prompts and rules load correctly.

Backend:

- score range validation;
- total recomputation;
- upload and extraction flow;
- persistence of notebook-shaped AI output;
- chat context assembly;
- admin final score override;
- approved XLSX export uses the final reviewed rubric.

Frontend:

- build/lint;
- upload -> analyze -> inspect scores -> chat -> download report;
- admin review flow with editable final rubric.

## 7. Implementation Discipline

- Read broadly; write narrowly in the target module.
- Keep `NLP/` as reference/sample space only.
- Integrate `novelty_and_relevance/` as AI-service context, not as a separate runtime service in v1.
- Backend owns business data and workflow.
- AI service owns analysis and generation only.
- Frontend talks only to backend.
- Totals are computed, not manually typed.
