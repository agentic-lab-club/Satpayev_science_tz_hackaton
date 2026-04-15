package tzworkflow

import (
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/internal/platform/ai"
	platformStorage "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/internal/platform/storage"
	pkgAuth "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/auth"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/config"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/database"
	md "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/http/middlewares"
	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

func Init(server *fiber.App, db *database.TrackedDB, cfg *config.Config, accessManager *pkgAuth.TokenManager, storage platformStorage.ObjectStorage, aiClient *ai.Client) {
	RegisterRoutes(server, db, cfg, accessManager, storage, aiClient)
}

func RegisterRoutes(server *fiber.App, db *database.TrackedDB, cfg *config.Config, accessManager *pkgAuth.TokenManager, storage platformStorage.ObjectStorage, aiClient *ai.Client) {
	api := server.Group("/api/v1")

	repo := NewRepository(db)
	service := NewService(db, repo, cfg, storage, aiClient)
	handler := NewHandler(service)

	projects := api.Group("/projects")
	projects.Post("/", md.AuthRole(accessManager, md.RoleUser, md.RoleAdmin), md.BindAndValidate[CreateProjectRequest](), handler.CreateProject)
	projects.Get("/", md.AuthRole(accessManager, md.RoleUser, md.RoleAdmin), handler.ListProjects)
	projects.Get("/:project_id", md.AuthRole(accessManager, md.RoleUser, md.RoleAdmin), md.ValidateParam[uuid.UUID]("project_id"), handler.GetProject)
	projects.Post("/:project_id/versions", md.AuthRole(accessManager, md.RoleUser, md.RoleAdmin), md.ValidateParam[uuid.UUID]("project_id"), md.BindAndValidate[CreateVersionRequest](), handler.CreateVersion)
	projects.Get("/:project_id/versions", md.AuthRole(accessManager, md.RoleUser, md.RoleAdmin), md.ValidateParam[uuid.UUID]("project_id"), handler.ListVersions)
	projects.Post("/:project_id/versions/:version_id/analyze", md.AuthRole(accessManager, md.RoleUser, md.RoleAdmin), md.ValidateParam[uuid.UUID]("project_id"), md.ValidateParam[uuid.UUID]("version_id"), handler.AnalyzeVersion)
	projects.Get("/:project_id/versions/:version_id/analysis/latest", md.AuthRole(accessManager, md.RoleUser, md.RoleAdmin), md.ValidateParam[uuid.UUID]("project_id"), md.ValidateParam[uuid.UUID]("version_id"), handler.GetLatestAnalysis)
	projects.Post("/:project_id/chat-sessions", md.AuthRole(accessManager, md.RoleUser, md.RoleAdmin), md.ValidateParam[uuid.UUID]("project_id"), md.BindAndValidate[CreateChatSessionRequest](), handler.CreateChatSession)
	projects.Post("/:project_id/chat-sessions/:session_id/messages", md.AuthRole(accessManager, md.RoleUser, md.RoleAdmin), md.ValidateParam[uuid.UUID]("project_id"), md.ValidateParam[uuid.UUID]("session_id"), md.BindAndValidate[SendChatMessageRequest](), handler.SendChatMessage)
	projects.Post("/:project_id/submit-for-review", md.AuthRole(accessManager, md.RoleUser, md.RoleAdmin), md.ValidateParam[uuid.UUID]("project_id"), md.BindAndValidate[SubmitForReviewRequest](), handler.SubmitForReview)

	admin := api.Group("/admin")
	admin.Get("/review-submissions", md.AuthRole(accessManager, md.RoleAdmin), handler.ListReviewSubmissions)
	admin.Post("/review-submissions/:submission_id/decision", md.AuthRole(accessManager, md.RoleAdmin), md.ValidateParam[uuid.UUID]("submission_id"), md.BindAndValidate[ReviewDecisionRequest](), handler.RecordReviewDecision)
	admin.Post("/reports/exports", md.AuthRole(accessManager, md.RoleAdmin), md.BindAndValidate[CreateReportExportRequest](), handler.CreateReportExport)
}
