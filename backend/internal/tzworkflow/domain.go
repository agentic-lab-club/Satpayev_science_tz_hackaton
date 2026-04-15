package tzworkflow

import (
	"time"

	ai "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/internal/platform/ai"
	"github.com/google/uuid"
)

type Project struct {
	ID               uuid.UUID  `db:"id" json:"id"`
	OwnerUserID      uuid.UUID  `db:"owner_user_id" json:"owner_user_id"`
	Title            string     `db:"title" json:"title"`
	OrganizationName *string    `db:"organization_name" json:"organization_name,omitempty"`
	Status           string     `db:"status" json:"status"`
	ActiveVersionID  *uuid.UUID `db:"active_version_id" json:"active_version_id,omitempty"`
	FinalVersionID   *uuid.UUID `db:"final_version_id" json:"final_version_id,omitempty"`
	CreatedAt        time.Time  `db:"created_at" json:"created_at"`
	UpdatedAt        time.Time  `db:"updated_at" json:"updated_at"`
}

type CreateProjectRequest struct {
	Title            string  `json:"title" validate:"required,min=2"`
	OrganizationName *string `json:"organization_name,omitempty"`
}

type DocumentVersion struct {
	ID               uuid.UUID  `db:"id" json:"id"`
	ProjectID        uuid.UUID  `db:"project_id" json:"project_id"`
	UploadedByUserID uuid.UUID  `db:"uploaded_by_user_id" json:"uploaded_by_user_id"`
	VersionNumber    int        `db:"version_number" json:"version_number"`
	OriginalFileID   uuid.UUID  `db:"original_file_id" json:"original_file_id"`
	OriginalFilename string     `db:"original_filename" json:"original_filename"`
	ContentType      string     `db:"content_type" json:"content_type"`
	FileSizeBytes    int64      `db:"file_size_bytes" json:"file_size_bytes"`
	ExtractionStatus string     `db:"extraction_status" json:"extraction_status"`
	AnalysisStatus   string     `db:"analysis_status" json:"analysis_status"`
	AnalysisRunID    *uuid.UUID `db:"analysis_run_id" json:"analysis_run_id,omitempty"`
	RawTextPreview   *string    `db:"raw_text_preview" json:"raw_text_preview,omitempty"`
	CreatedAt        time.Time  `db:"created_at" json:"created_at"`
}

type StoredFileRecord struct {
	ID               uuid.UUID `db:"id" json:"id"`
	UploadedByUserID uuid.UUID `db:"uploaded_by_user_id" json:"uploaded_by_user_id"`
	OriginalFilename string    `db:"original_filename" json:"original_filename"`
	ContentType      string    `db:"content_type" json:"content_type"`
	SizeBytes        int64     `db:"size_bytes" json:"size_bytes"`
	BucketName       string    `db:"bucket_name" json:"bucket_name"`
	ObjectKey        string    `db:"object_key" json:"object_key"`
	ETag             string    `db:"etag" json:"etag"`
	CreatedAt        time.Time `db:"created_at" json:"created_at"`
}

type CreateVersionRequest struct {
	FileID uuid.UUID `json:"file_id" validate:"required"`
}

type AnalysisRun struct {
	ID                uuid.UUID  `db:"id" json:"id"`
	DocumentVersionID uuid.UUID  `db:"document_version_id" json:"document_version_id"`
	Status            string     `db:"status" json:"status"`
	ModelName         *string    `db:"model_name" json:"model_name,omitempty"`
	PromptVersion     *string    `db:"prompt_version" json:"prompt_version,omitempty"`
	RequestJSON       []byte     `db:"request_json" json:"-"`
	ResponseJSON      []byte     `db:"response_json" json:"-"`
	ErrorMessage      *string    `db:"error_message" json:"error_message,omitempty"`
	StartedAt         *time.Time `db:"started_at" json:"started_at,omitempty"`
	CompletedAt       *time.Time `db:"completed_at" json:"completed_at,omitempty"`
	CreatedAt         time.Time  `db:"created_at" json:"created_at"`
}

type Scorecard struct {
	ID                 uuid.UUID       `db:"id" json:"id"`
	AnalysisRunID      *uuid.UUID      `db:"analysis_run_id" json:"analysis_run_id,omitempty"`
	ReviewSubmissionID *uuid.UUID      `db:"review_submission_id" json:"review_submission_id,omitempty"`
	ScoreType          string          `db:"score_type" json:"score_type"`
	TotalScore         float64         `db:"total_score" json:"total_score"`
	MaxTotalScore      float64         `db:"max_total_score" json:"max_total_score"`
	CreatedByUserID    *uuid.UUID      `db:"created_by_user_id" json:"created_by_user_id,omitempty"`
	CreatedAt          time.Time       `db:"created_at" json:"created_at"`
	Items              []ScorecardItem `json:"items,omitempty"`
}

type ScorecardItem struct {
	ID          uuid.UUID `db:"id" json:"id"`
	ScorecardID uuid.UUID `db:"scorecard_id" json:"scorecard_id"`
	ItemKey     string    `db:"item_key" json:"item_key"`
	Label       string    `db:"label" json:"label"`
	Score       float64   `db:"score" json:"score"`
	MaxScore    float64   `db:"max_score" json:"max_score"`
	Explanation string    `db:"explanation" json:"explanation"`
}

type LatestAnalysisResponse struct {
	AnalysisRunID uuid.UUID          `json:"analysis_run_id"`
	Analysis      ai.AnalyzeResponse `json:"analysis"`
}

type CreateChatSessionRequest struct {
	Title string `json:"title" validate:"required,min=2"`
}

type ChatSession struct {
	ID                uuid.UUID  `db:"id" json:"id"`
	ProjectID         uuid.UUID  `db:"project_id" json:"project_id"`
	DocumentVersionID uuid.UUID  `db:"document_version_id" json:"document_version_id"`
	AnalysisRunID     *uuid.UUID `db:"analysis_run_id" json:"analysis_run_id,omitempty"`
	CreatedByUserID   uuid.UUID  `db:"created_by_user_id" json:"created_by_user_id"`
	Title             string     `db:"title" json:"title"`
	CreatedAt         time.Time  `db:"created_at" json:"created_at"`
}

type ChatMessage struct {
	ID            uuid.UUID `db:"id" json:"id"`
	ChatSessionID uuid.UUID `db:"chat_session_id" json:"chat_session_id"`
	Role          string    `db:"role" json:"role"`
	Content       string    `db:"content" json:"content"`
	MetadataJSON  []byte    `db:"metadata_json" json:"metadata_json,omitempty"`
	CreatedAt     time.Time `db:"created_at" json:"created_at"`
}

type SendChatMessageRequest struct {
	UserMessage string `json:"user_message" validate:"required,min=1"`
}

type SendChatMessageResponse struct {
	SessionID        uuid.UUID       `json:"session_id"`
	UserMessage      ChatMessage     `json:"user_message"`
	AssistantMessage ChatMessage     `json:"assistant_message"`
	AIResponse       ai.ChatResponse `json:"ai_response"`
}

type ReviewSubmission struct {
	ID                uuid.UUID `db:"id" json:"id"`
	ProjectID         uuid.UUID `db:"project_id" json:"project_id"`
	DocumentVersionID uuid.UUID `db:"document_version_id" json:"document_version_id"`
	SubmittedByUserID uuid.UUID `db:"submitted_by_user_id" json:"submitted_by_user_id"`
	Status            string    `db:"status" json:"status"`
	SubmittedAt       time.Time `db:"submitted_at" json:"submitted_at"`
}

type SubmitForReviewRequest struct {
	DocumentVersionID *uuid.UUID `json:"document_version_id,omitempty"`
}

type ReviewDecisionRequest struct {
	Decision            string        `json:"decision" validate:"required,oneof=approved rejected needs_revision"`
	ReviewFeedback      string        `json:"review_feedback"`
	ExpertReportComment string        `json:"expert_report_comment"`
	FinalScorecard      *ai.Scorecard `json:"final_scorecard,omitempty"`
}

type AdminReview struct {
	ID                  uuid.UUID  `db:"id" json:"id"`
	ReviewSubmissionID  uuid.UUID  `db:"review_submission_id" json:"review_submission_id"`
	ReviewedByUserID    uuid.UUID  `db:"reviewed_by_user_id" json:"reviewed_by_user_id"`
	Decision            string     `db:"decision" json:"decision"`
	ReviewFeedback      string     `db:"review_feedback" json:"review_feedback"`
	ExpertReportComment string     `db:"expert_report_comment" json:"expert_report_comment"`
	FinalScorecardID    *uuid.UUID `db:"final_scorecard_id" json:"final_scorecard_id,omitempty"`
	ReviewedAt          time.Time  `db:"reviewed_at" json:"reviewed_at"`
}

type ReportExport struct {
	ID              uuid.UUID  `db:"id" json:"id"`
	CreatedByUserID uuid.UUID  `db:"created_by_user_id" json:"created_by_user_id"`
	ExportType      string     `db:"export_type" json:"export_type"`
	Status          string     `db:"status" json:"status"`
	FileID          *uuid.UUID `db:"file_id" json:"file_id,omitempty"`
	CreatedAt       time.Time  `db:"created_at" json:"created_at"`
	CompletedAt     *time.Time `db:"completed_at" json:"completed_at,omitempty"`
}

type CreateReportExportRequest struct {
	ExportType          string      `json:"export_type" validate:"required"`
	ReviewSubmissionIDs []uuid.UUID `json:"review_submission_ids" validate:"required,min=1"`
}
