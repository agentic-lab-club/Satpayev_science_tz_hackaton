# TZ Workflow Module Contract

## Purpose

Own the scientific TZ workflow in the backend: projects, document versions, AI analysis persistence, chat sessions, review submissions, admin decisions, and report export records.

## Owned Routes

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

## External Dependencies

- `internal/platform/ai`: HTTP client for `/v1/analyze`, `/v1/generate`, and `/v1/chat/respond`
- `internal/platform/storage`: downloads original file bytes before sending them to AI-service
- `pkg/auth`: route auth middleware via `cmd/server/main.go`
- PostgreSQL via `pkg/database.TrackedDB`

## Config Keys Used

- `ai_service.url`
- `ai_service.health_path`
- `ai_service.request_timeout_seconds`

## Migrations Added

- `db/migrations/20260415130000_scientific_tz_workflow.sql`

## Notes

- Backend is the system of record.
- AI-service remains stateless.
- Diagnostic and preliminary scorecards are persisted separately.
- Final reviewed scorecards remain backend-owned.
