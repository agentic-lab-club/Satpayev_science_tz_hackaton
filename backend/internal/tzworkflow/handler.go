package tzworkflow

import (
	"strings"

	md "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/http/middlewares"
	respond "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/http/responder"
	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

// CreateProject godoc
// @Summary Create project
// @Description Create a new scientific TZ project
// @Tags @tzworkflow
// @Accept json
// @Produce json
// @Security BearerToken
// @Param request body CreateProjectRequest true "Project payload"
// @Success 201 {object} Project
// @Router /api/v1/projects [post]
func (h *Handler) CreateProject(c fiber.Ctx) error {
	l := c.Locals("log").(*zerolog.Logger)
	userID, _ := md.AuthID(c)
	req := c.Locals("body").(CreateProjectRequest)

	project, err := h.service.CreateProject(c.Context(), userID, req)
	if err != nil {
		return tzRespondError(c, l, "tzworkflow_create_project_failed", err)
	}
	return respond.Created(c, project, nil)
}

// ListProjects godoc
// @Summary List projects
// @Description List projects visible to the current user
// @Tags @tzworkflow
// @Produce json
// @Security BearerToken
// @Success 200 {array} Project
// @Router /api/v1/projects [get]
func (h *Handler) ListProjects(c fiber.Ctx) error {
	userID, _ := md.AuthID(c)
	role, _ := md.AuthRoleValue(c)
	projects, err := h.service.ListProjects(c.Context(), userID, isAdmin(role))
	if err != nil {
		return tzRespondError(c, c.Locals("log").(*zerolog.Logger), "tzworkflow_list_projects_failed", err)
	}
	return respond.OK(c, projects, nil)
}

// GetProject godoc
// @Summary Get project
// @Description Get project by id
// @Tags @tzworkflow
// @Produce json
// @Security BearerToken
// @Param project_id path string true "Project ID"
// @Success 200 {object} Project
// @Router /api/v1/projects/{project_id} [get]
func (h *Handler) GetProject(c fiber.Ctx) error {
	l := c.Locals("log").(*zerolog.Logger)
	userID, _ := md.AuthID(c)
	role, _ := md.AuthRoleValue(c)
	projectID := c.Locals("project_id").(uuid.UUID)

	project, err := h.service.GetProject(c.Context(), projectID, userID, isAdmin(role))
	if err != nil {
		return tzRespondError(c, l, "tzworkflow_get_project_failed", err)
	}
	if project == nil {
		return respond.WithStatus(c, fiber.Map{"error": "project not found"}, nil, fiber.StatusNotFound)
	}
	return respond.OK(c, project, nil)
}

// CreateVersion godoc
// @Summary Create version
// @Description Create a new document version from an uploaded file asset
// @Tags @tzworkflow
// @Accept json
// @Produce json
// @Security BearerToken
// @Param project_id path string true "Project ID"
// @Param request body CreateVersionRequest true "Version payload"
// @Success 201 {object} DocumentVersion
// @Router /api/v1/projects/{project_id}/versions [post]
func (h *Handler) CreateVersion(c fiber.Ctx) error {
	l := c.Locals("log").(*zerolog.Logger)
	userID, _ := md.AuthID(c)
	role, _ := md.AuthRoleValue(c)
	projectID := c.Locals("project_id").(uuid.UUID)
	req := c.Locals("body").(CreateVersionRequest)

	version, err := h.service.CreateVersion(c.Context(), projectID, userID, isAdmin(role), req)
	if err != nil {
		return tzRespondError(c, l, "tzworkflow_create_version_failed", err)
	}
	return respond.Created(c, version, nil)
}

// ListVersions godoc
// @Summary List versions
// @Description List document versions for a project
// @Tags @tzworkflow
// @Produce json
// @Security BearerToken
// @Param project_id path string true "Project ID"
// @Success 200 {array} DocumentVersion
// @Router /api/v1/projects/{project_id}/versions [get]
func (h *Handler) ListVersions(c fiber.Ctx) error {
	userID, _ := md.AuthID(c)
	role, _ := md.AuthRoleValue(c)
	projectID := c.Locals("project_id").(uuid.UUID)

	versions, err := h.service.ListVersions(c.Context(), projectID, userID, isAdmin(role))
	if err != nil {
		return tzRespondError(c, c.Locals("log").(*zerolog.Logger), "tzworkflow_list_versions_failed", err)
	}
	return respond.OK(c, versions, nil)
}

// AnalyzeVersion godoc
// @Summary Analyze version
// @Description Send a document version to AI-service and persist the analysis
// @Tags @tzworkflow
// @Produce json
// @Security BearerToken
// @Param project_id path string true "Project ID"
// @Param version_id path string true "Version ID"
// @Success 200 {object} LatestAnalysisResponse
// @Router /api/v1/projects/{project_id}/versions/{version_id}/analyze [post]
func (h *Handler) AnalyzeVersion(c fiber.Ctx) error {
	l := c.Locals("log").(*zerolog.Logger)
	userID, _ := md.AuthID(c)
	role, _ := md.AuthRoleValue(c)
	projectID := c.Locals("project_id").(uuid.UUID)
	versionID := c.Locals("version_id").(uuid.UUID)

	response, err := h.service.AnalyzeVersion(c.Context(), projectID, versionID, userID, isAdmin(role))
	if err != nil {
		return tzRespondError(c, l, "tzworkflow_analyze_version_failed", err)
	}
	return respond.OK(c, response, nil)
}

// GetLatestAnalysis godoc
// @Summary Latest analysis
// @Description Get the latest stored analysis for a document version
// @Tags @tzworkflow
// @Produce json
// @Security BearerToken
// @Param project_id path string true "Project ID"
// @Param version_id path string true "Version ID"
// @Success 200 {object} LatestAnalysisResponse
// @Router /api/v1/projects/{project_id}/versions/{version_id}/analysis/latest [get]
func (h *Handler) GetLatestAnalysis(c fiber.Ctx) error {
	userID, _ := md.AuthID(c)
	role, _ := md.AuthRoleValue(c)
	projectID := c.Locals("project_id").(uuid.UUID)
	versionID := c.Locals("version_id").(uuid.UUID)

	response, err := h.service.GetLatestAnalysis(c.Context(), projectID, versionID, userID, isAdmin(role))
	if err != nil {
		return tzRespondError(c, c.Locals("log").(*zerolog.Logger), "tzworkflow_get_latest_analysis_failed", err)
	}
	if response == nil {
		return respond.WithStatus(c, fiber.Map{"error": "analysis not found"}, nil, fiber.StatusNotFound)
	}
	return respond.OK(c, response, nil)
}

// CreateChatSession godoc
// @Summary Create chat session
// @Description Create a project-bound chat session
// @Tags @tzworkflow
// @Accept json
// @Produce json
// @Security BearerToken
// @Param project_id path string true "Project ID"
// @Param request body CreateChatSessionRequest true "Chat session payload"
// @Success 201 {object} ChatSession
// @Router /api/v1/projects/{project_id}/chat-sessions [post]
func (h *Handler) CreateChatSession(c fiber.Ctx) error {
	l := c.Locals("log").(*zerolog.Logger)
	userID, _ := md.AuthID(c)
	role, _ := md.AuthRoleValue(c)
	projectID := c.Locals("project_id").(uuid.UUID)
	req := c.Locals("body").(CreateChatSessionRequest)

	session, err := h.service.CreateChatSession(c.Context(), projectID, userID, isAdmin(role), req)
	if err != nil {
		return tzRespondError(c, l, "tzworkflow_create_chat_session_failed", err)
	}
	return respond.Created(c, session, nil)
}

// SendChatMessage godoc
// @Summary Send chat message
// @Description Send a chat message and store the AI response
// @Tags @tzworkflow
// @Accept json
// @Produce json
// @Security BearerToken
// @Param project_id path string true "Project ID"
// @Param session_id path string true "Session ID"
// @Param request body SendChatMessageRequest true "Chat message payload"
// @Success 200 {object} SendChatMessageResponse
// @Router /api/v1/projects/{project_id}/chat-sessions/{session_id}/messages [post]
func (h *Handler) SendChatMessage(c fiber.Ctx) error {
	l := c.Locals("log").(*zerolog.Logger)
	userID, _ := md.AuthID(c)
	role, _ := md.AuthRoleValue(c)
	projectID := c.Locals("project_id").(uuid.UUID)
	sessionID := c.Locals("session_id").(uuid.UUID)
	req := c.Locals("body").(SendChatMessageRequest)

	response, err := h.service.SendChatMessage(c.Context(), projectID, sessionID, userID, isAdmin(role), req)
	if err != nil {
		return tzRespondError(c, l, "tzworkflow_send_chat_message_failed", err)
	}
	return respond.OK(c, response, nil)
}

// SubmitForReview godoc
// @Summary Submit for review
// @Description Create a review submission for a project version
// @Tags @tzworkflow
// @Accept json
// @Produce json
// @Security BearerToken
// @Param project_id path string true "Project ID"
// @Param request body SubmitForReviewRequest true "Review submission payload"
// @Success 201 {object} ReviewSubmission
// @Router /api/v1/projects/{project_id}/submit-for-review [post]
func (h *Handler) SubmitForReview(c fiber.Ctx) error {
	l := c.Locals("log").(*zerolog.Logger)
	userID, _ := md.AuthID(c)
	role, _ := md.AuthRoleValue(c)
	projectID := c.Locals("project_id").(uuid.UUID)
	req := c.Locals("body").(SubmitForReviewRequest)

	submission, err := h.service.SubmitForReview(c.Context(), projectID, userID, isAdmin(role), req)
	if err != nil {
		return tzRespondError(c, l, "tzworkflow_submit_for_review_failed", err)
	}
	return respond.Created(c, submission, nil)
}

// ListReviewSubmissions godoc
// @Summary List review submissions
// @Description List all pending and processed review submissions
// @Tags @tzworkflow
// @Produce json
// @Security BearerToken
// @Success 200 {array} ReviewSubmission
// @Router /api/v1/admin/review-submissions [get]
func (h *Handler) ListReviewSubmissions(c fiber.Ctx) error {
	l := c.Locals("log").(*zerolog.Logger)
	_, _ = md.AuthID(c)
	isAdminUser := isAdminRole(c)
	submissions, err := h.service.ListReviewSubmissions(c.Context(), isAdminUser)
	if err != nil {
		return tzRespondError(c, l, "tzworkflow_list_review_submissions_failed", err)
	}
	return respond.OK(c, submissions, nil)
}

// RecordReviewDecision godoc
// @Summary Record review decision
// @Description Save an admin decision and final scorecard for a submission
// @Tags @tzworkflow
// @Accept json
// @Produce json
// @Security BearerToken
// @Param submission_id path string true "Submission ID"
// @Param request body ReviewDecisionRequest true "Decision payload"
// @Success 201 {object} AdminReview
// @Router /api/v1/admin/review-submissions/{submission_id}/decision [post]
func (h *Handler) RecordReviewDecision(c fiber.Ctx) error {
	l := c.Locals("log").(*zerolog.Logger)
	userID, _ := md.AuthID(c)
	isAdminUser := isAdminRole(c)
	submissionID := c.Locals("submission_id").(uuid.UUID)
	req := c.Locals("body").(ReviewDecisionRequest)

	review, err := h.service.RecordReviewDecision(c.Context(), submissionID, userID, isAdminUser, req)
	if err != nil {
		return tzRespondError(c, l, "tzworkflow_record_review_decision_failed", err)
	}
	return respond.Created(c, review, nil)
}

// CreateReportExport godoc
// @Summary Create report export
// @Description Queue an export for approved submissions
// @Tags @tzworkflow
// @Accept json
// @Produce json
// @Security BearerToken
// @Param request body CreateReportExportRequest true "Export payload"
// @Success 201 {object} ReportExport
// @Router /api/v1/admin/reports/exports [post]
func (h *Handler) CreateReportExport(c fiber.Ctx) error {
	l := c.Locals("log").(*zerolog.Logger)
	userID, _ := md.AuthID(c)
	isAdminUser := isAdminRole(c)
	req := c.Locals("body").(CreateReportExportRequest)

	export, err := h.service.CreateReportExport(c.Context(), userID, isAdminUser, req)
	if err != nil {
		return tzRespondError(c, l, "tzworkflow_create_report_export_failed", err)
	}
	return respond.Created(c, export, nil)
}

func isAdmin(role string) bool {
	return strings.EqualFold(strings.TrimSpace(role), md.RoleAdmin)
}

func isAdminRole(c fiber.Ctx) bool {
	role, _ := md.AuthRoleValue(c)
	return isAdmin(role)
}

func tzRespondError(c fiber.Ctx, l *zerolog.Logger, event string, err error) error {
	status := tzStatusForError(err)
	l.Error().Err(err).Str("event", event).Int("http_status", status).Msg("tzworkflow request failed")
	return respond.ErrorStatus(c, err, status)
}

func tzStatusForError(err error) int {
	msg := strings.ToLower(err.Error())
	switch {
	case strings.Contains(msg, "forbidden"):
		return fiber.StatusForbidden
	case strings.Contains(msg, "not found"):
		return fiber.StatusNotFound
	case strings.Contains(msg, "not configured"):
		return fiber.StatusServiceUnavailable
	default:
		return fiber.StatusBadRequest
	}
}
