package tzworkflow

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"net/textproto"
	"regexp"
	"testing"
	"time"

	sqlmock "github.com/DATA-DOG/go-sqlmock"
	assetsModule "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/internal/assets"
	aiClient "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/internal/platform/ai"
	platformStorage "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/internal/platform/storage"
	pkgAuth "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/auth"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/config"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/database"
	md "github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/http/middlewares"
	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/rs/zerolog"
)

type memoryObjectStorage struct {
	bucket    string
	objectKey string
	etag      string
	content   []byte
}

func (m *memoryObjectStorage) Upload(ctx context.Context, input platformStorage.UploadInput) (*platformStorage.UploadResult, error) {
	body, err := io.ReadAll(input.Reader)
	if err != nil {
		return nil, err
	}
	m.content = append([]byte(nil), body...)
	return &platformStorage.UploadResult{Bucket: m.bucket, ObjectKey: m.objectKey, ETag: m.etag}, nil
}

func (m *memoryObjectStorage) Download(ctx context.Context, bucket string, objectKey string) (*platformStorage.DownloadResult, error) {
	if bucket != m.bucket || objectKey != m.objectKey {
		return nil, fmt.Errorf("not found")
	}
	return &platformStorage.DownloadResult{
		Reader:      io.NopCloser(bytes.NewReader(m.content)),
		ContentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		SizeBytes:   int64(len(m.content)),
		ETag:        m.etag,
	}, nil
}

func (m *memoryObjectStorage) PresignGet(ctx context.Context, bucket string, objectKey string, expiry time.Duration) (string, error) {
	return "", nil
}

func TestE2E_DocxUploadAnalyzeAndPersistRecommendation(t *testing.T) {
	sqlDB, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("sqlmock.New() error = %v", err)
	}
	t.Cleanup(func() { _ = sqlDB.Close() })

	trackedDB := database.NewTrackedDB(sqlx.NewDb(sqlDB, "sqlmock"))
	storage := &memoryObjectStorage{
		bucket:    "test-bucket",
		objectKey: "docx-object",
		etag:      "etag-1",
		content:   []byte("fake-docx-bytes"),
	}

	ownerID := uuid.MustParse("11111111-1111-1111-1111-111111111111")
	projectID := uuid.MustParse("22222222-2222-2222-2222-222222222222")
	fileID := uuid.MustParse("33333333-3333-3333-3333-333333333333")
	versionID := uuid.MustParse("44444444-4444-4444-4444-444444444444")
	runID := uuid.MustParse("55555555-5555-5555-5555-555555555555")
	scorecardOneID := uuid.MustParse("66666666-6666-6666-6666-666666666666")
	scorecardTwoID := uuid.MustParse("77777777-7777-7777-7777-777777777777")

	now := time.Date(2026, 4, 15, 12, 0, 0, 0, time.UTC)
	docxContent := "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

	projectInsertQuery := regexp.QuoteMeta(`
		INSERT INTO projects (owner_user_id, title, organization_name, status)
		VALUES ($1, $2, $3, COALESCE($4, 'draft'))
		RETURNING id, owner_user_id, title, organization_name, status, active_version_id, final_version_id, created_at, updated_at
	`)
	assetInsertQuery := regexp.QuoteMeta(`
INSERT INTO application_files (
    uploaded_by_user_id,
    application_id,
    file_type,
    bucket_name,
    object_key,
    original_filename,
    content_type,
    size_bytes,
    etag
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING id,
          uploaded_by_user_id,
          application_id,
          file_type,
          bucket_name,
          object_key,
          original_filename,
          content_type,
          size_bytes,
          etag,
          created_at;`)
	analysisRunReadQuery := regexp.QuoteMeta(`
		SELECT id, document_version_id, status, model_name, prompt_version, request_json, response_json, error_message, started_at, completed_at, created_at
		FROM analysis_runs
		WHERE document_version_id = $1
		ORDER BY created_at DESC
		LIMIT 1
	`)
	updateAnalysisRunQuery := regexp.QuoteMeta(`
		UPDATE analysis_runs
		SET status = 'completed',
		    model_name = COALESCE($3, model_name),
		    prompt_version = COALESCE($4, prompt_version),
		    request_json = COALESCE($5, request_json),
		    response_json = $2,
		    completed_at = NOW()
		WHERE id = $1
	`)
	updateVersionQuery := regexp.QuoteMeta(`
		UPDATE document_versions
		SET analysis_run_id = $2,
		    analysis_status = 'completed',
		    extraction_status = 'completed',
		    raw_text_preview = $3
		WHERE id = $1
	`)
	updateProjectOnCreateVersionQuery := regexp.QuoteMeta(`UPDATE projects SET active_version_id = $2, status = 'active', updated_at = NOW() WHERE id = $1`)
	updateProjectAfterAnalysisQuery := regexp.QuoteMeta(`
		UPDATE projects
		SET active_version_id = $2,
		    status = 'analyzed',
		    updated_at = NOW()
		WHERE id = (SELECT project_id FROM document_versions WHERE id = $1)
	`)
	insertScorecardQuery := regexp.QuoteMeta(createScorecardQuery)
	insertScorecardItemQuery := regexp.QuoteMeta(`
		INSERT INTO scorecard_items (scorecard_id, item_key, label, score, max_score, explanation)
		VALUES ($1, $2, $3, $4, $5, $6)
	`)

	// Create project
	mock.ExpectQuery(projectInsertQuery).
		WithArgs(ownerID, "Demo project", "Satpayev University", "draft").
		WillReturnRows(sqlmock.NewRows([]string{"id", "owner_user_id", "title", "organization_name", "status", "active_version_id", "final_version_id", "created_at", "updated_at"}).
			AddRow(projectID, ownerID, "Demo project", "Satpayev University", "draft", nil, nil, now, now))

	// Upload asset to backend storage.
	mock.ExpectQuery(assetInsertQuery).
		WithArgs(ownerID, nil, "portfolio", storage.bucket, storage.objectKey, "problematic.docx", docxContent, int64(len(storage.content)), storage.etag).
		WillReturnRows(sqlmock.NewRows([]string{"id", "uploaded_by_user_id", "application_id", "file_type", "bucket_name", "object_key", "original_filename", "content_type", "size_bytes", "etag", "created_at"}).
			AddRow(fileID, ownerID, nil, "portfolio", storage.bucket, storage.objectKey, "problematic.docx", docxContent, int64(len(storage.content)), storage.etag, now))

	// Create version from uploaded file.
	mock.ExpectQuery(regexp.QuoteMeta(getProjectByIDQuery)).
		WithArgs(projectID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "owner_user_id", "title", "organization_name", "status", "active_version_id", "final_version_id", "created_at", "updated_at"}).
			AddRow(projectID, ownerID, "Demo project", "Satpayev University", "draft", nil, nil, now, now))
	mock.ExpectQuery(regexp.QuoteMeta(getFileRecordByIDQuery)).
		WithArgs(fileID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "uploaded_by_user_id", "original_filename", "content_type", "size_bytes", "bucket_name", "object_key", "etag", "created_at"}).
			AddRow(fileID, ownerID, "problematic.docx", docxContent, int64(len(storage.content)), storage.bucket, storage.objectKey, storage.etag, now))
	mock.ExpectBegin()
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT COALESCE(MAX(version_number), 0) + 1 FROM document_versions WHERE project_id = $1`)).
		WithArgs(projectID).
		WillReturnRows(sqlmock.NewRows([]string{"coalesce"}).AddRow(1))
	mock.ExpectQuery(regexp.QuoteMeta(createDocumentVersionQuery)).
		WithArgs(projectID, ownerID, 1, fileID, "problematic.docx", docxContent, int64(len(storage.content)), "pending", "pending", nil, nil).
		WillReturnRows(sqlmock.NewRows([]string{"id", "project_id", "uploaded_by_user_id", "version_number", "original_file_id", "original_filename", "content_type", "file_size_bytes", "extraction_status", "analysis_status", "analysis_run_id", "raw_text_preview", "created_at"}).
			AddRow(versionID, projectID, ownerID, 1, fileID, "problematic.docx", docxContent, int64(len(storage.content)), "pending", "pending", nil, nil, now))
	mock.ExpectExec(updateProjectOnCreateVersionQuery).
		WithArgs(projectID, versionID).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()

	// Analyze version and persist the notebook-shaped response.
	mock.ExpectQuery(regexp.QuoteMeta(getProjectByIDQuery)).
		WithArgs(projectID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "owner_user_id", "title", "organization_name", "status", "active_version_id", "final_version_id", "created_at", "updated_at"}).
			AddRow(projectID, ownerID, "Demo project", "Satpayev University", "active", versionID, nil, now, now))
	mock.ExpectQuery(regexp.QuoteMeta(getVersionByIDQuery)).
		WithArgs(versionID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "project_id", "uploaded_by_user_id", "version_number", "original_file_id", "original_filename", "content_type", "file_size_bytes", "extraction_status", "analysis_status", "analysis_run_id", "raw_text_preview", "created_at"}).
			AddRow(versionID, projectID, ownerID, 1, fileID, "problematic.docx", docxContent, int64(len(storage.content)), "pending", "pending", nil, nil, now))
	mock.ExpectQuery(regexp.QuoteMeta(getFileRecordByIDQuery)).
		WithArgs(fileID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "uploaded_by_user_id", "original_filename", "content_type", "size_bytes", "bucket_name", "object_key", "etag", "created_at"}).
			AddRow(fileID, ownerID, "problematic.docx", docxContent, int64(len(storage.content)), storage.bucket, storage.objectKey, storage.etag, now))
	mock.ExpectBegin()
	mock.ExpectQuery(regexp.QuoteMeta(createAnalysisRunQuery)).
		WithArgs(versionID, "running", "ai-service", "v1", sqlmock.AnyArg(), nil, nil, sqlmock.AnyArg(), nil).
		WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(runID))
	mock.ExpectCommit()

	analysisResponse := aiClient.AnalyzeResponse{
		AnalysisStatus: "completed",
		ImprovedTZ:     "улучшенный текст",
		Recommendations: []aiClient.Recommendation{
			{Category: "structure", Title: "Добавить цель", Description: "Явно сформулируйте цель документа", Priority: 1},
		},
		AIDocumentAnalysisScorecard: aiClient.Scorecard{
			ScoreType:     "ai_document_analysis_scorecard",
			TotalScore:    70,
			MaxTotalScore: 100,
			Items: []aiClient.ScorecardItem{
				{Key: "structure", Label: "Структура", Score: 70, MaxScore: 100, Explanation: "Хорошая структура"},
			},
		},
		AIPreliminaryEvaluationScorecard: aiClient.Scorecard{
			ScoreType:     "ai_preliminary_evaluation_scorecard",
			TotalScore:    81.5,
			MaxTotalScore: 100,
			Items: []aiClient.ScorecardItem{
				{Key: "scientific_novelty", Label: "Научная новизна", Score: 12, MaxScore: 15, Explanation: "Нужна детализация"},
			},
		},
		ModelMetadata: aiClient.ModelMetadata{Mode: "heuristic", PromptVersion: "v1"},
	}
	responseJSON, _ := json.Marshal(analysisResponse)

	mock.ExpectBegin()
	mock.ExpectExec(updateAnalysisRunQuery).
		WithArgs(runID, sqlmock.AnyArg(), nil, "v1", sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectExec(updateVersionQuery).
		WithArgs(versionID, runID, sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectExec(updateProjectAfterAnalysisQuery).
		WithArgs(versionID, versionID).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectQuery(insertScorecardQuery).
		WithArgs(runID, nil, "ai_document_analysis_scorecard", 70.0, 100.0, nil).
		WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(scorecardOneID))
	mock.ExpectExec(insertScorecardItemQuery).
		WithArgs(scorecardOneID, "structure", "Структура", 70.0, 100.0, "Хорошая структура").
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectQuery(insertScorecardQuery).
		WithArgs(runID, nil, "ai_preliminary_evaluation_scorecard", 81.5, 100.0, nil).
		WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(scorecardTwoID))
	mock.ExpectExec(insertScorecardItemQuery).
		WithArgs(scorecardTwoID, "scientific_novelty", "Научная новизна", 12.0, 15.0, "Нужна детализация").
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()

	// Read persisted analysis back from backend.
	mock.ExpectQuery(regexp.QuoteMeta(getProjectByIDQuery)).
		WithArgs(projectID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "owner_user_id", "title", "organization_name", "status", "active_version_id", "final_version_id", "created_at", "updated_at"}).
			AddRow(projectID, ownerID, "Demo project", "Satpayev University", "analyzed", versionID, nil, now, now))
	mock.ExpectQuery(regexp.QuoteMeta(getVersionByIDQuery)).
		WithArgs(versionID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "project_id", "uploaded_by_user_id", "version_number", "original_file_id", "original_filename", "content_type", "file_size_bytes", "extraction_status", "analysis_status", "analysis_run_id", "raw_text_preview", "created_at"}).
			AddRow(versionID, projectID, ownerID, 1, fileID, "problematic.docx", docxContent, int64(len(storage.content)), "completed", "completed", runID, "preview", now))
	mock.ExpectQuery(analysisRunReadQuery).
		WithArgs(versionID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "document_version_id", "status", "model_name", "prompt_version", "request_json", "response_json", "error_message", "started_at", "completed_at", "created_at"}).
			AddRow(runID, versionID, "completed", "ai-service", "v1", json.RawMessage(`{"file_base64":"..."}`), responseJSON, nil, now, now, now))
	mock.ExpectQuery(regexp.QuoteMeta(listScorecardsByAnalysisRunQuery)).
		WithArgs(runID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "analysis_run_id", "review_submission_id", "score_type", "total_score", "max_total_score", "created_by_user_id", "created_at"}).
			AddRow(scorecardOneID, runID, nil, "ai_document_analysis_scorecard", 70, 100, nil, now).
			AddRow(scorecardTwoID, runID, nil, "ai_preliminary_evaluation_scorecard", 81.5, 100, nil, now))
	mock.ExpectQuery(regexp.QuoteMeta(listScorecardItemsQuery)).
		WithArgs(scorecardOneID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "scorecard_id", "item_key", "label", "score", "max_score", "explanation"}).
			AddRow(uuid.New(), scorecardOneID, "structure", "Структура", 70, 100, "Хорошая структура"))
	mock.ExpectQuery(regexp.QuoteMeta(listScorecardItemsQuery)).
		WithArgs(scorecardTwoID).
		WillReturnRows(sqlmock.NewRows([]string{"id", "scorecard_id", "item_key", "label", "score", "max_score", "explanation"}).
			AddRow(uuid.New(), scorecardTwoID, "scientific_novelty", "Научная новизна", 12, 15, "Нужна детализация"))

	aiServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/v1/analyze" {
			t.Fatalf("AI path = %q; want %q", r.URL.Path, "/v1/analyze")
		}
		body, _ := io.ReadAll(r.Body)
		var req aiClient.AnalyzeRequest
		if err := json.Unmarshal(body, &req); err != nil {
			t.Fatalf("decode AI request error = %v", err)
		}
		decoded, err := base64.StdEncoding.DecodeString(req.FileBase64)
		if err != nil {
			t.Fatalf("base64 decode error = %v", err)
		}
		if !bytes.Equal(decoded, storage.content) {
			t.Fatalf("AI received %q; want %q", string(decoded), string(storage.content))
		}
		if req.Filename != "problematic.docx" {
			t.Fatalf("AI filename = %q; want %q", req.Filename, "problematic.docx")
		}
		if req.ContentType != docxContent {
			t.Fatalf("AI content_type = %q; want %q", req.ContentType, docxContent)
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(aiClient.ResponseEnvelope[aiClient.AnalyzeResponse]{
			RequestID: "req-1",
			Status:    "ok",
			Data:      analysisResponse,
		})
	}))
	t.Cleanup(aiServer.Close)

	app := fiber.New()
	app.Use(func(c fiber.Ctx) error {
		logger := zerolog.Nop()
		c.Locals("log", &logger)
		return c.Next()
	})

	accessManager := pkgAuth.NewTokenManager("secret", 3600)
	cfg := &config.Config{AIService: config.AIServiceConfig{URL: aiServer.URL, RequestTimeoutSeconds: 2}}
	aiSvc := aiClient.NewClient(cfg.AIService)

	assetsModule.Init(app, trackedDB, accessManager, storage)
	RegisterRoutes(app, trackedDB, cfg, accessManager, storage, aiSvc)

	token, _, err := accessManager.Generate(ownerID, md.RoleUser, pkgAuth.TokenTypeAccess)
	if err != nil {
		t.Fatalf("Generate() error = %v", err)
	}

	projectResp := doJSONRequest(t, app, http.MethodPost, "/api/v1/projects", token, map[string]any{
		"title":             "Demo project",
		"organization_name": "Satpayev University",
	}, nil)
	if projectResp.StatusCode != http.StatusCreated {
		t.Fatalf("POST /api/v1/projects status = %d; want %d", projectResp.StatusCode, http.StatusCreated)
	}
	var project Project
	decodeJSONResponse(t, projectResp, &project)
	if project.ID != projectID {
		t.Fatalf("project.id = %s; want %s", project.ID, projectID)
	}

	uploadResp := doMultipartUpload(t, app, "/assets", token, "portfolio", "problematic.docx", docxContent, storage.content)
	if uploadResp.StatusCode != http.StatusCreated {
		t.Fatalf("POST /assets status = %d; want %d", uploadResp.StatusCode, http.StatusCreated)
	}
	var upload assetsModule.Response
	decodeJSONResponse(t, uploadResp, &upload)
	if upload.FileID != fileID {
		t.Fatalf("upload.file_id = %s; want %s", upload.FileID, fileID)
	}

	versionResp := doJSONRequest(t, app, http.MethodPost, fmt.Sprintf("/api/v1/projects/%s/versions", project.ID), token, map[string]any{
		"file_id": upload.FileID.String(),
	}, nil)
	if versionResp.StatusCode != http.StatusCreated {
		body, _ := io.ReadAll(versionResp.Body)
		t.Fatalf("POST /versions status = %d; want %d; body=%s", versionResp.StatusCode, http.StatusCreated, string(body))
	}
	var version DocumentVersion
	decodeJSONResponse(t, versionResp, &version)
	if version.ID != versionID {
		t.Fatalf("version.id = %s; want %s", version.ID, versionID)
	}

	analyzeResp := doJSONRequest(t, app, http.MethodPost, fmt.Sprintf("/api/v1/projects/%s/versions/%s/analyze", project.ID, version.ID), token, nil, nil)
	if analyzeResp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(analyzeResp.Body)
		t.Fatalf("POST /analyze status = %d; want %d; body=%s", analyzeResp.StatusCode, http.StatusOK, string(body))
	}
	var analyze LatestAnalysisResponse
	decodeJSONResponse(t, analyzeResp, &analyze)
	if len(analyze.Analysis.Recommendations) != 1 {
		t.Fatalf("analyze.recommendations len = %d; want 1", len(analyze.Analysis.Recommendations))
	}
	if analyze.Analysis.Recommendations[0].Title != "Добавить цель" {
		t.Fatalf("recommendation title = %q; want %q", analyze.Analysis.Recommendations[0].Title, "Добавить цель")
	}

	latestResp := doJSONRequest(t, app, http.MethodGet, fmt.Sprintf("/api/v1/projects/%s/versions/%s/analysis/latest", project.ID, version.ID), token, nil, nil)
	if latestResp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(latestResp.Body)
		t.Fatalf("GET /analysis/latest status = %d; want %d; body=%s", latestResp.StatusCode, http.StatusOK, string(body))
	}
	var latest LatestAnalysisResponse
	decodeJSONResponse(t, latestResp, &latest)
	if latest.AnalysisRunID != runID {
		t.Fatalf("latest.analysis_run_id = %s; want %s", latest.AnalysisRunID, runID)
	}
	if latest.Analysis.ImprovedTZ != "улучшенный текст" {
		t.Fatalf("latest.improved_tz = %q; want %q", latest.Analysis.ImprovedTZ, "улучшенный текст")
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("unmet SQL expectations: %v", err)
	}
}

func doJSONRequest(t *testing.T, app *fiber.App, method, path, token string, body any, headers map[string]string) *http.Response {
	t.Helper()

	var reader io.Reader
	if body != nil {
		payload, err := json.Marshal(body)
		if err != nil {
			t.Fatalf("json.Marshal() error = %v", err)
		}
		reader = bytes.NewReader(payload)
	}

	req := httptest.NewRequest(method, path, reader)
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	for k, v := range headers {
		req.Header.Set(k, v)
	}

	resp, err := app.Test(req, fiber.TestConfig{Timeout: 0})
	if err != nil {
		t.Fatalf("%s %s request error = %v", method, path, err)
	}
	return resp
}

func doMultipartUpload(t *testing.T, app *fiber.App, path, token, fileType, filename, contentType string, content []byte) *http.Response {
	t.Helper()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)

	if err := writer.WriteField("file_type", fileType); err != nil {
		t.Fatalf("WriteField error = %v", err)
	}
	partHeader := textproto.MIMEHeader{}
	partHeader.Set("Content-Disposition", fmt.Sprintf(`form-data; name="file"; filename="%s"`, filename))
	partHeader.Set("Content-Type", contentType)
	part, err := writer.CreatePart(partHeader)
	if err != nil {
		t.Fatalf("CreatePart error = %v", err)
	}
	if _, err := part.Write(content); err != nil {
		t.Fatalf("part.Write error = %v", err)
	}
	if err := writer.Close(); err != nil {
		t.Fatalf("writer.Close error = %v", err)
	}

	req := httptest.NewRequest(http.MethodPost, path, body)
	req.Header.Set("Content-Type", writer.FormDataContentType())
	req.Header.Set("Authorization", "Bearer "+token)

	resp, err := app.Test(req, fiber.TestConfig{Timeout: 0})
	if err != nil {
		t.Fatalf("multipart request error = %v", err)
	}
	return resp
}

func decodeJSONResponse(t *testing.T, resp *http.Response, out any) {
	t.Helper()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("ReadAll response body error = %v", err)
	}
	if err := json.Unmarshal(body, out); err != nil {
		t.Fatalf("json.Unmarshal response error = %v; body=%s", err, string(body))
	}
}
