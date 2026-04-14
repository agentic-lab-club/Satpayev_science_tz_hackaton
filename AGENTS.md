# MonoRepository Guidelines

For additional product, business, and project context, read the root `README.md` first.  
It is the primary high-level source for understanding what we are building and why.

---

## Purpose of This Repository

This repository is an umbrella workspace / monorepo.

Each major top-level product folder should be treated like its own repository, service, or module with its own lifecycle, tooling, and local conventions.

The agent may inspect the whole monorepo for context, dependency tracing, architecture understanding, and implementation reference.  
However, for any single task, the agent should normally make changes only inside one primary module / service / folder unless the user explicitly asks for broader multi-module changes.

**Default principle:**
- read broadly across the monorepo
- understand dependencies carefully
- write narrowly in one target module at a time

---

## Project Structure & Module Organization

This root is an umbrella workspace.  
Each major top-level folder is effectively its own repository-like module.

Before running module-specific commands such as Git operations, builds, tests, or Docker Compose, enter that module’s directory unless the task explicitly targets root-level files.

Main modules:

- `frontend/`: Frontend application.
- `backend/`: Golang core backend service.
- `ai-service/`: Python FastAPI AI service. `NLP/` is draft/sample reference space only.
- `infrastructure/`: Infrastructure and DevOps code, including IaC such as Terraform for AWS and related environment setup.
- `docs/ai-sessions/`: stored AI chat sessions that may provide extended context, prior decisions, reasoning history, or implementation notes.
- other top-level folders not listed above: do not assume they are product modules unless confirmed by their contents.

Important documentation sources of truth:
- root `README.md`
- module-level `README.md`
- `ARCHITECTURE.md`
- `AGENTS.md`
- files inside `docs/`

These documentation files should be treated as important guidance and context, especially when they describe architecture, workflows, standards, business logic, or project decisions.

---

## Module Standards

Each main module is expected to have, where applicable:

- its own `README.md`, also `AGENTS.md`
- its own Docker Compose setup
- its own local conventions and commands
- its own dependencies and runtime assumptions

Do not assume that all modules are built, run, tested, or deployed in the same way.

Always inspect the local module files before making changes.

---

## Agentic Coding Rules for This Monorepo

This repository is intended to be worked on by agentic coding tools and LLM coding sessions.

### Default Working Model

For each task, separate the repository into:

1. **Read scope** → the entire monorepo  
2. **Write scope** → one primary target module / service / folder  
3. **Protected shared scope** → cross-module/shared files that must not be modified by default

The agent is encouraged to read any relevant part of the repository in order to:
- understand business context
- understand architecture
- inspect patterns already used elsewhere
- trace dependencies and data flow
- compare implementations
- validate assumptions before editing

But by default, the agent must only modify files inside the single target module relevant to the user’s request.

---

## Read Policy

The agent may read files across the entire repository, including:

- other services and modules
- shared packages
- infrastructure files
- documentation
- Docker and deployment files
- tests
- schemas and contracts
- examples
- AI session notes in `docs/ai-sessions/`

Reading broadly is allowed and encouraged when it improves accuracy.

Cross-module reading should be used to:
- understand existing patterns
- align implementation style
- understand interfaces between modules
- inspect request/response structures
- understand shared dependencies
- avoid duplicating logic that already exists elsewhere

---

## Write Policy

Unless the user explicitly requests otherwise, the agent must modify files only inside one target module / service / folder per task.

Examples:
- `backend/**`
- `frontend/**`
- `infrastructure/**`

The agent must avoid silently expanding a narrow task into a multi-module change.

Do not:
- edit neighboring modules for convenience
- make unrelated cleanup changes
- refactor outside the target module
- perform repo-wide formatting
- update unrelated documentation
- make opportunistic fixes outside the requested scope

Keep diffs focused, minimal, and scoped.

---

## Protected Shared Scope

Some files and directories may affect multiple modules and must be treated as protected by default.

Examples include:
- shared contracts
- shared schemas
- shared DTO/interface definitions
- root-level dependency files
- root-level Docker files
- global CI/CD files
- global infrastructure templates
- generated shared clients
- root workspace configuration

These files may be read freely, but must not be modified unless:
- the user explicitly asks for it, or
- the task clearly requires it and the needed change is first called out explicitly

---

## Shared Contracts Rule

Shared contracts are sensitive and must not be changed by default.

Examples:
- protobuf definitions
- OpenAPI specs
- GraphQL schema
- shared request/response contracts
- event/message schemas
- shared validation schema
- common public interfaces used across modules

Default behavior:
- the agent may inspect and reason about shared contracts
- the agent may identify required contract changes
- the agent must not modify shared contracts automatically unless explicitly requested

If a task depends on shared contract changes, the agent should:
1. keep the main patch limited to the target module if possible
2. identify which shared files would need changes
3. explain why those changes are required
4. avoid applying those shared changes automatically unless explicitly requested

---

## Rules for Parallel Agent Sessions

This monorepo may be worked on through multiple agentic coding sessions in parallel.

To avoid conflicts:

- one task should map to one branch
- one branch should ideally map to one worktree or isolated working directory
- one agent session should focus on one primary module or one tightly scoped task
- shared files should not be edited simultaneously by multiple agent sessions
- broad cross-module refactors should be split into dedicated tasks

Recommended principle:

**one session = one scoped task = one primary write target**

The agent may inspect other modules, but should not create cross-module churn.

---

## Cross-Module Understanding

It is valid for the agent to inspect other modules in order to understand:

- auth patterns
- API design
- DTO shapes
- naming conventions
- logging style
- error handling
- testing patterns
- deployment assumptions
- infrastructure coupling
- message/event flow
- integration boundaries

This inspection is for understanding and reference.

It does **not** grant permission to modify those other modules by default.

---

## Local Documentation Priority

When working inside a specific module, prefer local documentation and local conventions over assumptions from other modules.

Priority order:

1. direct user request
2. local module `AGENTS.md`
3. local module `README.md`
4. local module `ARCHITECTURE.md`
5. root `AGENTS.md`
6. root `README.md`
7. related docs in `docs/`
8. patterns from other modules

If documentation conflicts, prefer the most local and most task-relevant source.

---

## Command Execution Rules

Before running commands, determine whether they belong to:
- root workspace scope, or
- a specific module scope

For module-specific commands, enter that module directory first.

Examples of commands that are usually module-scoped:
- `git`
- `docker compose`
- builds
- tests
- migrations
- linting
- local generators

Do not assume root-level command behavior applies to every module.

Always check the module’s own files first.

---

## Change Discipline

The agent must keep changes disciplined.

### Required behavior
- keep changes minimal
- stay within target scope
- follow local module conventions
- update only directly relevant tests/docs
- avoid unnecessary file movement
- avoid introducing new abstractions unless clearly needed

---

## AI Session Notes as Context

The folder `docs/ai-sessions/` may contain useful historical context such as:
- prior decisions
- design discussions
- implementation notes
- problem analysis
- tradeoff reasoning
- partial plans

These files may be used as supporting context, but they should not override explicit documentation or the current user request unless clearly still valid.

Treat them as helpful context, not automatic source of truth.

---

## Definition of Done

A task is considered done when:

- the requested change is implemented in the intended target scope
- the diff is focused and minimal
- unrelated modules were not modified
- shared/protected files were not changed unless explicitly required
- implementation follows local module conventions
- relevant tests or validations are updated where appropriate
- documentation is updated only when directly relevant

In short:

**Read the whole monorepo if needed.  
Write only in the intended module.  
Treat shared contracts and shared cross-module files as protected by default.**

---

## Satpayev Science TZ Project Rules

These rules are specific to this repository and override older spike/session notes when they conflict.

### Required Context Before Coding

Before implementing product behavior, read:

1. root `PLAN.md`
2. root `ARCHITECTURE.md`
3. `docs/README.md`
4. the target module `AGENTS.md` or `README.md`

For backend work, also read `backend/AGENTS.md`.

For AI-service work, also read:
- `NLP/README.md`
- `docs/ТЗ_официальное (1).docx`
- `docs/Шаблон для ТЗ рус.docx`
- `docs/TZ_digital_polegon.docx`

For frontend work, also read:
- `frontend/README.md`
- `frontend/agents/AGENTS.md`

For infrastructure work, also read:
- `infrastructure/README.md`
- `infrastructure/terraform/envs/dev/main.tf`
- root `docker-compose.yml`
- root `docker-compose.prod.yml`

### Product Architecture Contract

- Core Backend is the system of record.
- Core Backend owns auth, projects, document versions, analysis persistence, scorecards, chat history, admin review, and report exports.
- AI Service is stateless.
- AI Service does not read or write Core Postgres directly.
- Frontend calls only Core Backend.
- Object storage is accessed through Backend-controlled flows.
- Report generation is a backend module unless a future explicit decision extracts it into a service.

### Scoring Model Contract

The project uses three scorecards:

1. `ai_document_analysis_scorecard`
   - diagnostic dimensions: `structure`, `completeness`, `clarity`, `kpi_results`, `consistency`
   - each dimension is `0..100`
   - total is computed

2. `ai_preliminary_evaluation_scorecard`
   - official Excel rubric draft from AI
   - category max values: `20 + 10 + 15 + 20 + 15 + 10 + 10 = 100`
   - visible to Client and Admin

3. `final_reviewed_evaluation_scorecard`
   - official Admin/Expert scorecard
   - same categories as the Excel rubric
   - used for approved XLSX export

Do not collapse these into one score.

Do not allow a manually typed total score. Totals must be computed from category scores.

### Official Excel Rubric

The official XLSX columns map to:

- `strategic_relevance`: max `20`
- `goals_and_tasks`: max `10`
- `scientific_novelty`: max `15`
- `practical_applicability`: max `20`
- `expected_results`: max `15`
- `socio_economic_effect`: max `10`
- `feasibility`: max `10`

The official approved export uses `final_reviewed_evaluation_scorecard`.

AI preliminary scores may be used for draft previews, but not as final approved expert scores unless Admin explicitly accepts them into a final reviewed scorecard.

### Chat Contract

Chat is always bound to a project and document version.

Backend must assemble chat context from:
- project metadata
- active document version
- extracted document text
- latest completed analysis
- both AI scorecards
- findings and recommendations
- prior chat messages
- optional admin feedback

Chat may propose improvements, but it must not mutate stored document versions. A rewrite becomes official only through a separate upload/version action.

### Documentation Contract

Update root `ARCHITECTURE.md` when changing:
- service boundaries
- persisted entities
- scoring model
- deployment topology
- chat ownership/data flow

Update root `PLAN.md` when changing implementation order, scope, or acceptance criteria.

Update `docs/README.md` when adding important documentation sources.

Use PlantUML for architecture diagrams.
