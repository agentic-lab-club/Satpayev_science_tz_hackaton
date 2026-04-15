package tzworkflow

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"strings"

	ai "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/internal/platform/ai"
	platformStorage "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/internal/platform/storage"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/config"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/database"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/timekit"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type Service struct {
	db            *database.TrackedDB
	repo          *Repository
	cfg           *config.Config
	storage       platformStorage.ObjectStorage
	aiClient      *ai.Client
	promptVersion string
	modelName     string
}

func NewService(db *database.TrackedDB, repo *Repository, cfg *config.Config, storage platformStorage.ObjectStorage, aiClient *ai.Client) *Service {
	modelName := "heuristic"
	if aiClient != nil && aiClient.Enabled() {
		modelName = "ai-service"
	}
	return &Service{
		db:            db,
		repo:          repo,
		cfg:           cfg,
		storage:       storage,
		aiClient:      aiClient,
		promptVersion: "v1",
		modelName:     modelName,
	}
}

func (s *Service) CreateProject(ctx context.Context, ownerUserID uuid.UUID, req CreateProjectRequest) (*Project, error) {
	return s.repo.CreateProject(ownerUserID, req)
}

func (s *Service) ListProjects(ctx context.Context, ownerUserID uuid.UUID, isAdmin bool) ([]Project, error) {
	return s.repo.ListProjects(ownerUserID, isAdmin)
}

func (s *Service) GetProject(ctx context.Context, projectID, ownerUserID uuid.UUID, isAdmin bool) (*Project, error) {
	project, err := s.repo.GetProjectByID(projectID)
	if err != nil {
		return nil, err
	}
	if project == nil {
		return nil, nil
	}
	if !isAdmin && project.OwnerUserID != ownerUserID {
		return nil, fmt.Errorf("forbidden")
	}
	return project, nil
}

func (s *Service) CreateVersion(ctx context.Context, projectID, ownerUserID uuid.UUID, isAdmin bool, req CreateVersionRequest) (*DocumentVersion, error) {
	project, err := s.GetProject(ctx, projectID, ownerUserID, isAdmin)
	if err != nil {
		return nil, err
	}
	if project == nil {
		return nil, fmt.Errorf("project not found")
	}

	fileRecord, err := s.repo.GetFileRecordByID(req.FileID)
	if err != nil {
		return nil, err
	}
	if fileRecord == nil {
		return nil, fmt.Errorf("file not found")
	}
	if !isAdmin && fileRecord.UploadedByUserID != ownerUserID {
		return nil, fmt.Errorf("forbidden")
	}

	tx, err := s.db.Beginx()
	if err != nil {
		return nil, fmt.Errorf("failed to begin version creation transaction: %w", err)
	}
	defer tx.Rollback()

	var nextVersionNumber int
	if err := tx.QueryRowx(`SELECT COALESCE(MAX(version_number), 0) + 1 FROM document_versions WHERE project_id = $1`, projectID).Scan(&nextVersionNumber); err != nil {
		return nil, fmt.Errorf("failed to determine next version number: %w", err)
	}

	var version DocumentVersion
	if err := tx.QueryRowx(s.db.Rebind(createDocumentVersionQuery),
		projectID,
		ownerUserID,
		nextVersionNumber,
		req.FileID,
		fileRecord.OriginalFilename,
		fileRecord.ContentType,
		fileRecord.SizeBytes,
		"pending",
		"pending",
		nil,
		nil,
	).StructScan(&version); err != nil {
		return nil, fmt.Errorf("failed to create document version: %w", err)
	}

	if _, err := tx.Exec(`UPDATE projects SET active_version_id = $2, status = 'active', updated_at = NOW() WHERE id = $1`, projectID, version.ID); err != nil {
		return nil, fmt.Errorf("failed to update project active version: %w", err)
	}

	if err := tx.Commit(); err != nil {
		return nil, fmt.Errorf("failed to commit version creation transaction: %w", err)
	}

	return &version, nil
}

func (s *Service) ListVersions(ctx context.Context, projectID, ownerUserID uuid.UUID, isAdmin bool) ([]DocumentVersion, error) {
	project, err := s.GetProject(ctx, projectID, ownerUserID, isAdmin)
	if err != nil {
		return nil, err
	}
	if project == nil {
		return nil, fmt.Errorf("project not found")
	}
	return s.repo.ListVersions(projectID)
}

func (s *Service) AnalyzeVersion(ctx context.Context, projectID, versionID, ownerUserID uuid.UUID, isAdmin bool) (*LatestAnalysisResponse, error) {
	project, err := s.GetProject(ctx, projectID, ownerUserID, isAdmin)
	if err != nil {
		return nil, err
	}
	if project == nil {
		return nil, fmt.Errorf("project not found")
	}

	version, err := s.repo.GetVersionByID(versionID)
	if err != nil {
		return nil, err
	}
	if version == nil || version.ProjectID != projectID {
		return nil, fmt.Errorf("version not found")
	}

	fileRecord, err := s.repo.GetFileRecordByID(version.OriginalFileID)
	if err != nil {
		return nil, err
	}
	if fileRecord == nil {
		return nil, fmt.Errorf("file not found")
	}
	if !isAdmin && fileRecord.UploadedByUserID != ownerUserID {
		return nil, fmt.Errorf("forbidden")
	}
	if s.aiClient == nil || !s.aiClient.Enabled() {
		return nil, fmt.Errorf("ai service is not configured")
	}

	download, err := s.storage.Download(ctx, fileRecord.BucketName, fileRecord.ObjectKey)
	if err != nil {
		return nil, fmt.Errorf("failed to download source file: %w", err)
	}
	defer download.Reader.Close()

	rawBytes, err := io.ReadAll(download.Reader)
	if err != nil {
		return nil, fmt.Errorf("failed to read source file: %w", err)
	}

	orgName := ""
	if project.OrganizationName != nil {
		orgName = strings.TrimSpace(*project.OrganizationName)
	}
	request := ai.AnalyzeRequest{
		FileBase64:       base64.StdEncoding.EncodeToString(rawBytes),
		Filename:         fileRecord.OriginalFilename,
		ContentType:      fileRecord.ContentType,
		ProjectTitle:     project.Title,
		OrganizationName: orgName,
	}
	requestJSON, _ := json.Marshal(request)

	runID, err := s.createAnalysisRun(ctx, versionID, requestJSON)
	if err != nil {
		return nil, err
	}

	env, err := s.aiClient.Analyze(ctx, request)
	if err != nil {
		_ = s.markAnalysisFailed(runID, err.Error())
		return nil, err
	}
	if env.Status != "ok" {
		msg := "ai service returned a non-ok status"
		if env.Error != nil && env.Error.Message != "" {
			msg = env.Error.Message
		}
		_ = s.markAnalysisFailed(runID, msg)
		return nil, fmt.Errorf("%s", msg)
	}

	if err := s.persistAnalysisSuccess(versionID, runID, env.Data, requestJSON); err != nil {
		return nil, err
	}

	return &LatestAnalysisResponse{
		AnalysisRunID: runID,
		Analysis:      env.Data,
	}, nil
}

func (s *Service) GetLatestAnalysis(ctx context.Context, projectID, versionID, ownerUserID uuid.UUID, isAdmin bool) (*LatestAnalysisResponse, error) {
	project, err := s.GetProject(ctx, projectID, ownerUserID, isAdmin)
	if err != nil {
		return nil, err
	}
	if project == nil {
		return nil, fmt.Errorf("project not found")
	}
	version, err := s.repo.GetVersionByID(versionID)
	if err != nil {
		return nil, err
	}
	if version == nil || version.ProjectID != projectID {
		return nil, fmt.Errorf("version not found")
	}

	bundle, err := s.repo.GetLatestAnalysisBundle(versionID)
	if err != nil {
		return nil, err
	}
	if bundle == nil {
		return nil, nil
	}
	return &LatestAnalysisResponse{AnalysisRunID: bundle.AnalysisRun.ID, Analysis: bundle.Analysis}, nil
}

func (s *Service) CreateChatSession(ctx context.Context, projectID, ownerUserID uuid.UUID, isAdmin bool, req CreateChatSessionRequest) (*ChatSession, error) {
	project, err := s.GetProject(ctx, projectID, ownerUserID, isAdmin)
	if err != nil {
		return nil, err
	}
	if project == nil {
		return nil, fmt.Errorf("project not found")
	}
	if project.ActiveVersionID == nil {
		return nil, fmt.Errorf("project has no active document version")
	}

	analysis, err := s.repo.GetLatestAnalysisBundle(*project.ActiveVersionID)
	if err != nil {
		return nil, err
	}

	var analysisRunID *uuid.UUID
	if analysis != nil {
		analysisRunID = &analysis.AnalysisRun.ID
	}

	return s.repo.CreateChatSession(projectID, *project.ActiveVersionID, analysisRunID, ownerUserID, req.Title)
}

func (s *Service) SendChatMessage(ctx context.Context, projectID, sessionID, ownerUserID uuid.UUID, isAdmin bool, req SendChatMessageRequest) (*SendChatMessageResponse, error) {
	project, err := s.GetProject(ctx, projectID, ownerUserID, isAdmin)
	if err != nil {
		return nil, err
	}
	if project == nil {
		return nil, fmt.Errorf("project not found")
	}

	session, err := s.repo.GetChatSessionByID(sessionID)
	if err != nil {
		return nil, err
	}
	if session == nil || session.ProjectID != projectID {
		return nil, fmt.Errorf("chat session not found")
	}

	version, err := s.repo.GetVersionByID(session.DocumentVersionID)
	if err != nil {
		return nil, err
	}
	if version == nil {
		return nil, fmt.Errorf("document version not found")
	}

	bundle, err := s.repo.GetLatestAnalysisBundle(session.DocumentVersionID)
	if err != nil {
		return nil, err
	}

	messages, err := s.repo.ListChatMessages(sessionID)
	if err != nil {
		return nil, err
	}

	contextPayload := ai.ChatContext{
		ProjectTitle:        &project.Title,
		DocumentTitle:       &version.OriginalFilename,
		DocumentTextExcerpt: version.RawTextPreview,
		PreviousMessages:    convertChatMessages(messages),
	}
	if bundle != nil {
		contextPayload.DetectedSections = bundle.Analysis.DetectedSections
		contextPayload.Findings = bundle.Analysis.Findings
		contextPayload.Recommendations = bundle.Analysis.Recommendations
		contextPayload.Scorecards = convertScorecards(bundle.Scorecards)
		if bundle.Analysis.RawTextPreview != "" {
			contextPayload.DocumentTextExcerpt = &bundle.Analysis.RawTextPreview
		}
	}

	if s.aiClient == nil || !s.aiClient.Enabled() {
		return nil, fmt.Errorf("ai service is not configured")
	}

	env, err := s.aiClient.Chat(ctx, ai.ChatRequest{
		UserMessage: req.UserMessage,
		Context:     contextPayload,
	})
	if err != nil {
		return nil, err
	}
	if env.Status != "ok" {
		if env.Error != nil && env.Error.Message != "" {
			return nil, fmt.Errorf("%s", env.Error.Message)
		}
		return nil, fmt.Errorf("ai service returned a non-ok chat response")
	}

	userMessage, err := s.repo.CreateChatMessage(sessionID, "user", req.UserMessage, nil)
	if err != nil {
		return nil, err
	}
	assistantRaw, _ := json.Marshal(env.Data)
	assistantMessage, err := s.repo.CreateChatMessage(sessionID, "assistant", env.Data.Answer, assistantRaw)
	if err != nil {
		return nil, err
	}

	return &SendChatMessageResponse{
		SessionID:        sessionID,
		UserMessage:      *userMessage,
		AssistantMessage: *assistantMessage,
		AIResponse:       env.Data,
	}, nil
}

func (s *Service) SubmitForReview(ctx context.Context, projectID, ownerUserID uuid.UUID, isAdmin bool, req SubmitForReviewRequest) (*ReviewSubmission, error) {
	project, err := s.GetProject(ctx, projectID, ownerUserID, isAdmin)
	if err != nil {
		return nil, err
	}
	if project == nil {
		return nil, fmt.Errorf("project not found")
	}

	versionID := project.ActiveVersionID
	if req.DocumentVersionID != nil {
		versionID = req.DocumentVersionID
	}
	if versionID == nil {
		return nil, fmt.Errorf("no document version available for review")
	}

	submission, err := s.repo.CreateReviewSubmission(projectID, *versionID, ownerUserID, "submitted")
	if err != nil {
		return nil, err
	}
	return submission, nil
}

func (s *Service) ListReviewSubmissions(ctx context.Context, isAdmin bool) ([]ReviewSubmission, error) {
	if !isAdmin {
		return nil, fmt.Errorf("forbidden")
	}
	return s.repo.ListReviewSubmissions()
}

func (s *Service) RecordReviewDecision(ctx context.Context, submissionID, reviewerID uuid.UUID, isAdmin bool, req ReviewDecisionRequest) (*AdminReview, error) {
	if !isAdmin {
		return nil, fmt.Errorf("forbidden")
	}

	submission, err := s.repo.GetReviewSubmissionByID(submissionID)
	if err != nil {
		return nil, err
	}
	if submission == nil {
		return nil, fmt.Errorf("review submission not found")
	}

	var finalScorecardID *uuid.UUID
	if req.FinalScorecard != nil {
		finalScorecardID, err = s.persistFinalScorecard(submission.ID, reviewerID, *req.FinalScorecard)
		if err != nil {
			return nil, err
		}
	} else {
		bundle, err := s.repo.GetLatestAnalysisBundle(submission.DocumentVersionID)
		if err == nil && bundle != nil && len(bundle.Scorecards) > 0 {
			final := cloneScorecard(bundle.Scorecards[len(bundle.Scorecards)-1])
			final.ScoreType = "final_reviewed_evaluation"
			finalScorecardID, err = s.persistFinalScorecard(submission.ID, reviewerID, final)
			if err != nil {
				return nil, err
			}
		}
	}

	review, err := s.repo.CreateAdminReview(submissionID, reviewerID, req.Decision, req.ReviewFeedback, req.ExpertReportComment, finalScorecardID)
	if err != nil {
		return nil, err
	}

	if strings.EqualFold(req.Decision, "approved") {
		_, _ = s.repo.UpdateProjectPointers(submission.ProjectID, nil, &submission.DocumentVersionID, nil)
		_ = s.repo.UpdateReviewSubmissionStatus(submissionID, "approved")
	}

	return review, nil
}

func (s *Service) CreateReportExport(ctx context.Context, creatorID uuid.UUID, isAdmin bool, req CreateReportExportRequest) (*ReportExport, error) {
	if !isAdmin {
		return nil, fmt.Errorf("forbidden")
	}
	return s.repo.CreateReportExport(creatorID, req.ExportType, "queued", nil)
}

func (s *Service) createAnalysisRun(ctx context.Context, versionID uuid.UUID, requestJSON []byte) (uuid.UUID, error) {
	tx, err := s.db.Beginx()
	if err != nil {
		return uuid.Nil, fmt.Errorf("failed to begin analysis transaction: %w", err)
	}
	defer tx.Rollback()

	var runID uuid.UUID
	now := timekit.NowUTC()
	if err := tx.QueryRowx(
		createAnalysisRunQuery,
		versionID,
		"running",
		s.modelName,
		s.promptVersion,
		requestJSON,
		nil,
		nil,
		now,
		nil,
	).Scan(&runID); err != nil {
		return uuid.Nil, fmt.Errorf("failed to create analysis run: %w", err)
	}

	if err := tx.Commit(); err != nil {
		return uuid.Nil, fmt.Errorf("failed to commit analysis run: %w", err)
	}
	return runID, nil
}

func (s *Service) markAnalysisFailed(runID uuid.UUID, message string) error {
	_, err := s.db.TrackedUpdate(`
		UPDATE analysis_runs
		SET status = 'failed', error_message = $2, completed_at = NOW()
		WHERE id = $1
	`, runID, message)
	if err != nil {
		return fmt.Errorf("failed to mark analysis run failed: %w", err)
	}
	return nil
}

func (s *Service) persistAnalysisSuccess(versionID, runID uuid.UUID, analysis ai.AnalyzeResponse, requestJSON []byte) error {
	tx, err := s.db.Beginx()
	if err != nil {
		return fmt.Errorf("failed to begin analysis success transaction: %w", err)
	}
	defer tx.Rollback()

	responseJSON, err := json.Marshal(analysis)
	if err != nil {
		return fmt.Errorf("failed to marshal analysis response: %w", err)
	}
	if _, err := tx.Exec(`
		UPDATE analysis_runs
		SET status = 'completed',
		    model_name = COALESCE($3, model_name),
		    prompt_version = COALESCE($4, prompt_version),
		    request_json = COALESCE($5, request_json),
		    response_json = $2,
		    completed_at = NOW()
		WHERE id = $1
	`, runID, responseJSON, nullableStringValuePtr(analysis.ModelMetadata.Model), nullableStringValuePtr(analysis.ModelMetadata.PromptVersion), requestJSON); err != nil {
		return fmt.Errorf("failed to update analysis run: %w", err)
	}

	rawPreview := nullableStringValuePtr(analysis.RawTextPreview)
	if _, err := tx.Exec(`
		UPDATE document_versions
		SET analysis_run_id = $2,
		    analysis_status = 'completed',
		    extraction_status = 'completed',
		    raw_text_preview = $3
		WHERE id = $1
	`, versionID, runID, rawPreview); err != nil {
		return fmt.Errorf("failed to update document version analysis status: %w", err)
	}

	if _, err := tx.Exec(`
		UPDATE projects
		SET active_version_id = $2,
		    status = 'analyzed',
		    updated_at = NOW()
		WHERE id = (SELECT project_id FROM document_versions WHERE id = $1)
	`, versionID, versionID); err != nil {
		return fmt.Errorf("failed to update project active version: %w", err)
	}

	if _, err := s.persistScorecardTx(tx, runID, nil, analysis.AIDocumentAnalysisScorecard, nil); err != nil {
		return err
	}
	if _, err := s.persistScorecardTx(tx, runID, nil, analysis.AIPreliminaryEvaluationScorecard, nil); err != nil {
		return err
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit analysis persistence: %w", err)
	}
	return nil
}

func (s *Service) persistFinalScorecard(submissionID, reviewerID uuid.UUID, scorecard ai.Scorecard) (*uuid.UUID, error) {
	tx, err := s.db.Beginx()
	if err != nil {
		return nil, fmt.Errorf("failed to begin scorecard transaction: %w", err)
	}
	defer tx.Rollback()

	scorecardID, err := s.persistScorecardTx(tx, uuid.Nil, &submissionID, scorecard, &reviewerID)
	if err != nil {
		return nil, err
	}
	if err := tx.Commit(); err != nil {
		return nil, fmt.Errorf("failed to commit scorecard transaction: %w", err)
	}
	return &scorecardID, nil
}

func (s *Service) persistScorecardTx(tx *sqlx.Tx, analysisRunID uuid.UUID, reviewSubmissionID *uuid.UUID, scorecard ai.Scorecard, createdByUserID *uuid.UUID) (uuid.UUID, error) {
	var scorecardID uuid.UUID
	if err := tx.QueryRowx(
		createScorecardQuery,
		nullableUUID(analysisRunID),
		reviewSubmissionID,
		scorecard.ScoreType,
		scorecard.TotalScore,
		scorecard.MaxTotalScore,
		createdByUserID,
	).Scan(&scorecardID); err != nil {
		return uuid.Nil, fmt.Errorf("failed to create scorecard: %w", err)
	}

	for _, item := range scorecard.Items {
		if _, err := tx.Exec(
			createScorecardItemQuery,
			scorecardID,
			item.Key,
			item.Label,
			item.Score,
			item.MaxScore,
			item.Explanation,
		); err != nil {
			return uuid.Nil, fmt.Errorf("failed to create scorecard item: %w", err)
		}
	}
	return scorecardID, nil
}

func convertChatMessages(messages []ChatMessage) []ai.ChatMessage {
	result := make([]ai.ChatMessage, 0, len(messages))
	for _, message := range messages {
		result = append(result, ai.ChatMessage{Role: message.Role, Content: message.Content})
	}
	return result
}

func convertScorecards(scorecards []Scorecard) []ai.Scorecard {
	result := make([]ai.Scorecard, 0, len(scorecards))
	for _, scorecard := range scorecards {
		items := make([]ai.ScorecardItem, 0, len(scorecard.Items))
		for _, item := range scorecard.Items {
			items = append(items, ai.ScorecardItem{
				Key:         item.ItemKey,
				Label:       item.Label,
				Score:       item.Score,
				MaxScore:    item.MaxScore,
				Explanation: item.Explanation,
			})
		}
		result = append(result, ai.Scorecard{
			ScoreType:     scorecard.ScoreType,
			TotalScore:    scorecard.TotalScore,
			MaxTotalScore: scorecard.MaxTotalScore,
			Items:         items,
			IsPlaceholder: false,
		})
	}
	return result
}

func cloneScorecard(scorecard Scorecard) ai.Scorecard {
	items := make([]ai.ScorecardItem, 0, len(scorecard.Items))
	for _, item := range scorecard.Items {
		items = append(items, ai.ScorecardItem{
			Key:         item.ItemKey,
			Label:       item.Label,
			Score:       item.Score,
			MaxScore:    item.MaxScore,
			Explanation: item.Explanation,
		})
	}
	return ai.Scorecard{
		ScoreType:     scorecard.ScoreType,
		TotalScore:    scorecard.TotalScore,
		MaxTotalScore: scorecard.MaxTotalScore,
		Items:         items,
		IsPlaceholder: false,
	}
}

func nullableStringValue(v *string) any {
	if v == nil {
		return nil
	}
	trimmed := strings.TrimSpace(*v)
	if trimmed == "" {
		return nil
	}
	return trimmed
}

func nullableStringValuePtr(v string) any {
	trimmed := strings.TrimSpace(v)
	if trimmed == "" {
		return nil
	}
	return trimmed
}

func nullableUUID(v uuid.UUID) any {
	if v == uuid.Nil {
		return nil
	}
	return v
}
