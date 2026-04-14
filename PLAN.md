# Satpayev Science TZ Implementation Plan

This plan turns the hackathon technical requirement, product spike, and current monorepo into an implementation sequence that agents can execute without re-deciding product scope.

## 1. Product Target

Build an AI system for analyzing and improving technical specifications for scientific projects.

The product must support:

- user registration and authorization;
- upload of `PDF`, `DOCX`, and `TXT` technical specifications;
- document text extraction and structure analysis;
- required-section completeness checks;
- AI/NLP analysis of vague wording, missing requirements, contradictions, missing KPI, and expected results;
- recommendations and improved text generation;
- score `0..100`;
- report download;
- project/document history;
- document-aware AI chat;
- optional expert/admin review and XLSX export.

## 2. Scoring Model

The system has three related but separate scorecards.

### 2.1. AI Document Analysis Scorecard

Purpose: diagnostic quality score for Client and Admin.

Fields:

- `structure`: `0..100`
- `completeness`: `0..100`
- `clarity`: `0..100`
- `kpi_results`: `0..100`
- `consistency`: `0..100`

`ai_document_analysis_total_score` is the rounded average of these fields unless a later document explicitly defines weights.

This score explains document health. It does not fill the official Excel evaluation columns.

### 2.2. AI Preliminary Evaluation Scorecard

Purpose: AI draft using the official Excel rubric.

Fields:

- `strategic_relevance`: `0..20`
- `goals_and_tasks`: `0..10`
- `scientific_novelty`: `0..15`
- `practical_applicability`: `0..20`
- `expected_results`: `0..15`
- `socio_economic_effect`: `0..10`
- `feasibility`: `0..10`

`ai_preliminary_total_score` is the sum of these fields and must be `0..100`.

Client and Admin can both view this scorecard.

### 2.3. Final Reviewed Evaluation Scorecard

Purpose: official expert/admin score used for approved XLSX export.

It uses the same fields and max values as the AI preliminary evaluation scorecard.

Admin edits category scores. The backend computes `final_reviewed_total_score`; the UI must not allow manual total override.

### 2.4. Excel Mapping

The official Excel sheet maps to `final_reviewed_evaluation_scorecard`.

If the Admin has not submitted a final reviewed scorecard, the system may show a draft XLSX preview from `ai_preliminary_evaluation_scorecard`, but it must not treat it as the official approved export.

`ai_document_analysis_scorecard` belongs in the UI and may be exported as a second sheet named `AI Analysis` later.

## 3. Implementation Sequence

### Phase 0. Documentation Foundation

Files:

- `PLAN.md`
- `SKILLS.md`
- `AGENTS.md`
- `ARCHITECTURE.md`
- `docs/AGENTS.md`
- `docs/README.md`

Acceptance:

- architecture diagrams describe this project, not the older ATS domain;
- scoring model is explicit;
- agent context retrieval rules are explicit;
- implementation order is clear.

### Phase 1. Backend

Target module: `backend/`.

Implement:

- database migrations for projects, document versions, analysis runs, analysis outputs, scorecards, chat, reviews, and report exports;
- TZ document/project module following the local Go modular-monolith pattern;
- scorecard validation and total recomputation;
- upload and document extraction orchestration;
- AI service client interface;
- synchronous MVP analysis endpoint;
- chat endpoint;
- report download endpoint;
- admin review and XLSX export after the client analysis flow works.

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

### Phase 2. AI Service

Target module: `llm/` unless the user chooses a different name.

Create a Python FastAPI service from the useful `NLP/` notebook logic.

Endpoints:

- `POST /v1/analyze`
- `POST /v1/chat/respond`
- `GET /health`

Requirements:

- stateless service;
- no direct Core Postgres access;
- strict structured JSON responses;
- heuristic fallback when no LLM key exists;
- both scorecards returned by `/v1/analyze`;
- chat answers grounded in backend-supplied document and analysis context.

### Phase 3. Frontend

Target module: `frontend/`.

Replace mock dashboard/chat flows with real backend calls.

Client UI:

- project/document history;
- upload;
- analysis detail;
- diagnostic score panel;
- official-rubric preliminary score panel;
- findings/recommendations;
- improved text preview;
- document-aware chat;
- report download.

Admin UI:

- review queue;
- review detail;
- editable final reviewed scorecard;
- `review_feedback`;
- `expert_report_comment`;
- approved XLSX export.

### Phase 4. Infrastructure

Target module: `infrastructure/` and root compose files.

Only after backend and AI service are stable:

- add `llm` service to local and prod Docker Compose;
- add backend `AI_SERVICE_URL` config;
- update Terraform docs only if ports, secrets, or resources change.

## 4. Chat Logic

Chat is always bound to a project and document version.

Backend context for each AI chat call:

- project metadata;
- active document version metadata;
- extracted document text snapshot;
- latest completed analysis;
- `ai_document_analysis_scorecard`;
- `ai_preliminary_evaluation_scorecard`;
- relevant findings and recommendations;
- previous chat messages;
- optional latest admin feedback.

Rules:

- chat may explain low scores;
- chat may propose rewritten sections;
- chat may suggest next actions;
- chat must not mutate document versions;
- saving a rewrite requires a separate explicit version/upload action.

## 5. Test Plan

Backend:

- scorecard range validation;
- total recomputation;
- upload format validation;
- analysis persistence success and failure;
- chat context assembly;
- admin final score override and approved export behavior.

AI service:

- `DOCX` sample analysis using `docs/TZ_digital_polegon.docx`;
- weak/problematic text analysis using `docs/spikes/demo_tz_problematic.txt`;
- strict JSON schema validation;
- heuristic fallback without API key;
- chat response from supplied context.

Frontend:

- build/lint;
- manual client flow: login, create project, upload, analyze, inspect scores, chat, download report;
- manual admin flow: open review queue, edit final scorecard, approve, export XLSX.

Infrastructure:

- local Docker Compose starts frontend, backend, Postgres, MinIO, and AI service;
- prod compose includes AI service after backend integration;
- Terraform docs match current AWS resources.

## 6. Implementation Discipline

- Read broadly; write only in the current target module unless the task explicitly targets root/shared docs.
- Do not change shared contracts silently.
- Backend owns business data and workflow.
- AI service owns analysis and generation only.
- Frontend talks only to backend.
- Score totals are computed, not user-entered.
- Root docs must be updated when architecture, scoring, or module boundaries change.
