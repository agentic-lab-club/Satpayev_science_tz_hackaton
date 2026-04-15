package ai

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/config"
)

type Client struct {
	baseURL string
	http    *http.Client
}

func NewClient(cfg config.AIServiceConfig) *Client {
	timeout := cfg.RequestTimeoutSeconds
	if timeout <= 0 {
		timeout = 5
	}
	return &Client{
		baseURL: strings.TrimRight(strings.TrimSpace(cfg.URL), "/"),
		http:    &http.Client{Timeout: time.Duration(timeout) * time.Second},
	}
}

func (c *Client) Enabled() bool {
	return c.baseURL != ""
}

func (c *Client) Analyze(ctx context.Context, req AnalyzeRequest) (*ResponseEnvelope[AnalyzeResponse], error) {
	var env ResponseEnvelope[AnalyzeResponse]
	if err := c.post(ctx, "/v1/analyze", req, &env); err != nil {
		return nil, err
	}
	return &env, nil
}

func (c *Client) Generate(ctx context.Context, req GenerateRequest) (*ResponseEnvelope[GenerateResponse], error) {
	var env ResponseEnvelope[GenerateResponse]
	if err := c.post(ctx, "/v1/generate", req, &env); err != nil {
		return nil, err
	}
	return &env, nil
}

func (c *Client) Chat(ctx context.Context, req ChatRequest) (*ResponseEnvelope[ChatResponse], error) {
	var env ResponseEnvelope[ChatResponse]
	if err := c.post(ctx, "/v1/chat/respond", req, &env); err != nil {
		return nil, err
	}
	return &env, nil
}

func (c *Client) post(ctx context.Context, path string, req any, out any) error {
	if !c.Enabled() {
		return fmt.Errorf("ai service url is not configured")
	}

	body, err := json.Marshal(req)
	if err != nil {
		return fmt.Errorf("failed to marshal ai request: %w", err)
	}

	httpReq, err := http.NewRequestWithContext(ctx, http.MethodPost, c.baseURL+path, bytes.NewReader(body))
	if err != nil {
		return fmt.Errorf("failed to build ai request: %w", err)
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := c.http.Do(httpReq)
	if err != nil {
		return fmt.Errorf("ai service request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		var errorEnvelope ResponseEnvelope[any]
		if err := json.NewDecoder(resp.Body).Decode(&errorEnvelope); err == nil && errorEnvelope.Error != nil {
			return fmt.Errorf("ai service error: %s", errorEnvelope.Error.Message)
		}
		return fmt.Errorf("ai service returned http status %d", resp.StatusCode)
	}

	if err := json.NewDecoder(resp.Body).Decode(out); err != nil {
		return fmt.Errorf("failed to decode ai response: %w", err)
	}
	return nil
}
