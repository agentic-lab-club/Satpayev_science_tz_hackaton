# Backend Template

Reusable Go backend template and system-of-record implementation with:

- `Fiber v3` HTTP server
- `PostgreSQL` + auto migrations via `goose`
- `/health` and `/api/v1/healthcheck/*` endpoints
- Prometheus metrics support
- Swagger generation support
- Docker Compose for local development
- scientific TZ workflow module under `internal/tzworkflow`

## Quick Start

1. Copy `.env.example` to `.env`
2. Update `config/config.local.yaml` if needed
3. If you run the AI-service locally, set `ai_service.url` to the AI service base URL and keep `ai_service.health_path` at `/health`
4. Run:

```bash
docker compose up --build
```

API defaults:

- App: `http://localhost:8080`
- Health: `http://localhost:8080/health`
- Readiness: `http://localhost:8080/health/readiness`
- Liveness: `http://localhost:8080/health/liveness`
- Metrics: `http://localhost:8080/metrics`

## Swagger

Generate Swagger locally:

```bash
make swagger
```

Then open:

```text
http://localhost:8080/docs
```

## Template Usage

- Add new feature modules under `internal/<module>`
- Wire modules only from `cmd/server/main.go`
- Keep shared infrastructure in `pkg/`
- Add schema changes in `db/migrations`
- The AI-service wiring starts with `ai_service` config in `config/config.*.yaml` and backend health/readiness checks.
- The TZ workflow endpoints live in `internal/tzworkflow` and own projects, document versions, analysis persistence, chat, review submissions, and report export records.
