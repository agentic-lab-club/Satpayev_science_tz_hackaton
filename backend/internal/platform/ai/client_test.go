package ai_test

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/internal/platform/ai"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/config"
)

func TestClientAnalyzePostsNotebookRequest(t *testing.T) {
	t.Helper()

	var gotPath string
	var gotBody []byte

	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotPath = r.URL.Path
		body, err := io.ReadAll(r.Body)
		if err != nil {
			t.Fatalf("read body error = %v", err)
		}
		gotBody = body

		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(ai.ResponseEnvelope[ai.AnalyzeResponse]{
			RequestID: "req-1",
			Status:    "ok",
			Data: ai.AnalyzeResponse{
				AnalysisStatus: "completed",
				ImprovedTZ:     "улучшенный текст",
				ModelMetadata: ai.ModelMetadata{
					Mode:          "heuristic",
					PromptVersion: "v1",
				},
			},
		})
	}))
	t.Cleanup(srv.Close)

	client := ai.NewClient(config.AIServiceConfig{
		URL:                   srv.URL,
		RequestTimeoutSeconds: 2,
	})

	resp, err := client.Analyze(context.Background(), ai.AnalyzeRequest{
		FileURL:     "TZ_digital_polegon.docx",
		Filename:    "TZ_digital_polegon.docx",
		ContentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	})
	if err != nil {
		t.Fatalf("Analyze() error = %v", err)
	}

	if gotPath != "/v1/analyze" {
		t.Fatalf("request path = %q; want %q", gotPath, "/v1/analyze")
	}
	if !strings.Contains(string(gotBody), `"file_url":"TZ_digital_polegon.docx"`) {
		t.Fatalf("request body = %s; want file_url field", string(gotBody))
	}
	if resp == nil || resp.Status != "ok" {
		t.Fatalf("Analyze() response status = %#v; want ok", resp)
	}
	if resp.Data.AnalysisStatus != "completed" {
		t.Fatalf("Analyze() analysis_status = %q; want %q", resp.Data.AnalysisStatus, "completed")
	}
}

func TestClientReturnsAIErrorMessage(t *testing.T) {
	t.Helper()

	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		_ = json.NewEncoder(w).Encode(ai.ResponseEnvelope[any]{
			RequestID: "req-2",
			Status:    "error",
			Error: &ai.ErrorDetail{
				Code:    "bad_request",
				Message: "invalid payload",
			},
		})
	}))
	t.Cleanup(srv.Close)

	client := ai.NewClient(config.AIServiceConfig{
		URL:                   srv.URL,
		RequestTimeoutSeconds: 2,
	})

	_, err := client.Chat(context.Background(), ai.ChatRequest{
		UserMessage: "привет",
	})
	if err == nil {
		t.Fatalf("Chat() error = nil; want error")
	}
	if !strings.Contains(err.Error(), "invalid payload") {
		t.Fatalf("Chat() error = %q; want to contain %q", err.Error(), "invalid payload")
	}
}
