package tzworkflow

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"

	ai "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/internal/platform/ai"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/database"
	"github.com/google/uuid"
)

type Repository struct {
	db *database.TrackedDB
}

func NewRepository(db *database.TrackedDB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) CreateProject(ownerUserID uuid.UUID, req CreateProjectRequest) (*Project, error) {
	var project Project
	var org any = nil
	if req.OrganizationName != nil {
		org = *req.OrganizationName
	}
	if err := r.db.TrackedGet(&project, r.db.Rebind(createProjectQuery), ownerUserID, req.Title, org, "draft"); err != nil {
		return nil, fmt.Errorf("failed to create project: %w", err)
	}
	return &project, nil
}

func (r *Repository) ListProjects(ownerUserID uuid.UUID, isAdmin bool) ([]Project, error) {
	var projects []Project
	query := listProjectsByOwnerQuery
	args := []any{ownerUserID}
	if isAdmin {
		query = listProjectsAllQuery
		args = nil
	}
	if err := r.db.TrackedSelect(&projects, r.db.Rebind(query), args...); err != nil {
		return nil, fmt.Errorf("failed to list projects: %w", err)
	}
	return projects, nil
}

func (r *Repository) GetProjectByID(id uuid.UUID) (*Project, error) {
	var project Project
	if err := r.db.TrackedGet(&project, r.db.Rebind(getProjectByIDQuery), id); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get project by id: %w", err)
	}
	return &project, nil
}

func (r *Repository) UpdateProjectPointers(projectID uuid.UUID, activeVersionID, finalVersionID *uuid.UUID, status *string) (*Project, error) {
	var project Project
	if err := r.db.TrackedGet(&project, r.db.Rebind(updateProjectPointersQuery), projectID, activeVersionID, finalVersionID, status); err != nil {
		return nil, fmt.Errorf("failed to update project pointers: %w", err)
	}
	return &project, nil
}

func (r *Repository) CreateVersion(projectID, userID, fileID uuid.UUID, versionNumber int, originalFilename, contentType string, sizeBytes int64) (*DocumentVersion, error) {
	var version DocumentVersion
	if err := r.db.TrackedGet(
		&version,
		r.db.Rebind(createDocumentVersionQuery),
		projectID, userID, versionNumber, fileID, originalFilename, contentType, sizeBytes, "pending", "pending", nil, nil,
	); err != nil {
		return nil, fmt.Errorf("failed to create document version: %w", err)
	}
	return &version, nil
}

func (r *Repository) ListVersions(projectID uuid.UUID) ([]DocumentVersion, error) {
	var versions []DocumentVersion
	if err := r.db.TrackedSelect(&versions, r.db.Rebind(listVersionsByProjectQuery), projectID); err != nil {
		return nil, fmt.Errorf("failed to list versions: %w", err)
	}
	return versions, nil
}

func (r *Repository) GetVersionByID(versionID uuid.UUID) (*DocumentVersion, error) {
	var version DocumentVersion
	if err := r.db.TrackedGet(&version, r.db.Rebind(getVersionByIDQuery), versionID); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get version by id: %w", err)
	}
	return &version, nil
}

func (r *Repository) GetFileRecordByID(fileID uuid.UUID) (*StoredFileRecord, error) {
	var record StoredFileRecord
	if err := r.db.TrackedGet(&record, r.db.Rebind(getFileRecordByIDQuery), fileID); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get file record by id: %w", err)
	}
	return &record, nil
}

func (r *Repository) GetLatestAnalysisRunByVersion(versionID uuid.UUID) (*AnalysisRun, error) {
	var run AnalysisRun
	if err := r.db.TrackedGet(&run, r.db.Rebind(`
		SELECT id, document_version_id, status, model_name, prompt_version, request_json, response_json, error_message, started_at, completed_at, created_at
		FROM analysis_runs
		WHERE document_version_id = $1
		ORDER BY created_at DESC
		LIMIT 1
	`), versionID); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get latest analysis run: %w", err)
	}
	return &run, nil
}

func (r *Repository) GetLatestAnalysisBundle(versionID uuid.UUID) (*AnalysisRunBundle, error) {
	run, err := r.GetLatestAnalysisRunByVersion(versionID)
	if err != nil || run == nil {
		return nil, err
	}

	bundle := &AnalysisRunBundle{AnalysisRun: *run}
	if len(run.ResponseJSON) > 0 {
		if err := json.Unmarshal(run.ResponseJSON, &bundle.Analysis); err != nil {
			return nil, fmt.Errorf("failed to unmarshal analysis response: %w", err)
		}
	}

	var scorecards []Scorecard
	if err := r.db.TrackedSelect(&scorecards, r.db.Rebind(listScorecardsByAnalysisRunQuery), run.ID); err != nil {
		return nil, fmt.Errorf("failed to list scorecards: %w", err)
	}
	for i := range scorecards {
		var items []ScorecardItem
		if err := r.db.TrackedSelect(&items, r.db.Rebind(listScorecardItemsQuery), scorecards[i].ID); err != nil {
			return nil, fmt.Errorf("failed to list scorecard items: %w", err)
		}
		scorecards[i].Items = items
	}
	bundle.Scorecards = scorecards
	return bundle, nil
}

func (r *Repository) CreateChatSession(projectID, versionID uuid.UUID, analysisRunID *uuid.UUID, userID uuid.UUID, title string) (*ChatSession, error) {
	var session ChatSession
	if err := r.db.TrackedGet(&session, r.db.Rebind(createChatSessionQuery), projectID, versionID, analysisRunID, userID, title); err != nil {
		return nil, fmt.Errorf("failed to create chat session: %w", err)
	}
	return &session, nil
}

func (r *Repository) GetChatSessionByID(sessionID uuid.UUID) (*ChatSession, error) {
	var session ChatSession
	if err := r.db.TrackedGet(&session, r.db.Rebind(getChatSessionByIDQuery), sessionID); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get chat session by id: %w", err)
	}
	return &session, nil
}

func (r *Repository) ListChatMessages(sessionID uuid.UUID) ([]ChatMessage, error) {
	var messages []ChatMessage
	if err := r.db.TrackedSelect(&messages, r.db.Rebind(listChatMessagesBySessionQuery), sessionID); err != nil {
		return nil, fmt.Errorf("failed to list chat messages: %w", err)
	}
	return messages, nil
}

func (r *Repository) CreateChatMessage(sessionID uuid.UUID, role, content string, metadataJSON []byte) (*ChatMessage, error) {
	var message ChatMessage
	if err := r.db.TrackedGet(&message, r.db.Rebind(createChatMessageQuery), sessionID, role, content, metadataJSON); err != nil {
		return nil, fmt.Errorf("failed to create chat message: %w", err)
	}
	return &message, nil
}

func (r *Repository) CreateReviewSubmission(projectID, versionID, userID uuid.UUID, status string) (*ReviewSubmission, error) {
	var submission ReviewSubmission
	if err := r.db.TrackedGet(&submission, r.db.Rebind(createReviewSubmissionQuery), projectID, versionID, userID, status, nil); err != nil {
		return nil, fmt.Errorf("failed to create review submission: %w", err)
	}
	return &submission, nil
}

func (r *Repository) ListReviewSubmissions() ([]ReviewSubmission, error) {
	var submissions []ReviewSubmission
	if err := r.db.TrackedSelect(&submissions, r.db.Rebind(listReviewSubmissionsQuery)); err != nil {
		return nil, fmt.Errorf("failed to list review submissions: %w", err)
	}
	return submissions, nil
}

func (r *Repository) GetReviewSubmissionByID(id uuid.UUID) (*ReviewSubmission, error) {
	var submission ReviewSubmission
	if err := r.db.TrackedGet(&submission, r.db.Rebind(`
		SELECT id, project_id, document_version_id, submitted_by_user_id, status, submitted_at
		FROM review_submissions
		WHERE id = $1
	`), id); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get review submission by id: %w", err)
	}
	return &submission, nil
}

func (r *Repository) UpdateReviewSubmissionStatus(id uuid.UUID, status string) error {
	_, err := r.db.TrackedUpdate(r.db.Rebind(`
		UPDATE review_submissions
		SET status = $2
		WHERE id = $1
	`), id, status)
	if err != nil {
		return fmt.Errorf("failed to update review submission status: %w", err)
	}
	return nil
}

func (r *Repository) CreateAdminReview(submissionID, userID uuid.UUID, decision, feedback, comment string, finalScorecardID *uuid.UUID) (*AdminReview, error) {
	var review AdminReview
	if err := r.db.TrackedGet(&review, r.db.Rebind(createAdminReviewQuery), submissionID, userID, decision, feedback, comment, finalScorecardID, nil); err != nil {
		return nil, fmt.Errorf("failed to create admin review: %w", err)
	}
	return &review, nil
}

func (r *Repository) CreateReportExport(userID uuid.UUID, exportType string, status string, fileID *uuid.UUID) (*ReportExport, error) {
	var export ReportExport
	if err := r.db.TrackedGet(&export, r.db.Rebind(createReportExportQuery), userID, exportType, status, fileID, nil, nil); err != nil {
		return nil, fmt.Errorf("failed to create report export: %w", err)
	}
	return &export, nil
}

type AnalysisRunBundle struct {
	AnalysisRun AnalysisRun
	Analysis    ai.AnalyzeResponse
	Scorecards  []Scorecard
}
