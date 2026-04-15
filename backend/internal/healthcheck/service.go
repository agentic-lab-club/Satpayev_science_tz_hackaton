package healthcheck

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/config"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/database"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/timekit"
)

type Service struct {
	repo     *Repository
	cfg      *config.Config
	aiClient *http.Client
}

func NewService(db *database.TrackedDB, cfg *config.Config) *Service {
	timeout := cfg.AIService.RequestTimeoutSeconds
	if timeout <= 0 {
		timeout = 5
	}
	return &Service{
		repo:     NewRepository(db),
		cfg:      cfg,
		aiClient: &http.Client{Timeout: time.Duration(timeout) * time.Second},
	}
}

// PerformHealthCheck executes all health checks and returns the overall status
func (s *Service) PerformHealthCheck(ctx context.Context) (*HealthCheckResponse, error) {
	checks := make(map[string]CheckResult)
	overallStatus := HealthStatusHealthy

	// Check database ping
	pingLatency, pingErr := s.repo.PingDatabase(ctx)
	if pingErr != nil {
		checks["database_ping"] = CheckResult{
			Status:  HealthStatusUnhealthy,
			Message: pingErr.Error(),
			Latency: pingLatency.String(),
		}
		overallStatus = HealthStatusUnhealthy
	} else {
		checks["database_ping"] = CheckResult{
			Status:  HealthStatusHealthy,
			Message: "Database is reachable",
			Latency: pingLatency.String(),
		}
	}

	// Check database connection with query
	queryLatency, queryErr := s.repo.CheckDatabaseConnection(ctx)
	if queryErr != nil {
		checks["database_query"] = CheckResult{
			Status:  HealthStatusUnhealthy,
			Message: queryErr.Error(),
			Latency: queryLatency.String(),
		}
		overallStatus = HealthStatusUnhealthy
	} else {
		// Warn if query is slow (> 100ms)
		if queryLatency > 100*time.Millisecond {
			checks["database_query"] = CheckResult{
				Status:  HealthStatusDegraded,
				Message: "Database queries are slow",
				Latency: queryLatency.String(),
			}
			if overallStatus == HealthStatusHealthy {
				overallStatus = HealthStatusDegraded
			}
		} else {
			checks["database_query"] = CheckResult{
				Status:  HealthStatusHealthy,
				Message: "Database queries working",
				Latency: queryLatency.String(),
			}
		}
	}

	aiLatency, aiErr := s.checkAIService(ctx)
	if aiErr != nil {
		checks["ai_service"] = CheckResult{
			Status:  HealthStatusUnhealthy,
			Message: aiErr.Error(),
			Latency: aiLatency.String(),
		}
		overallStatus = HealthStatusUnhealthy
	} else if aiLatency > 0 {
		checks["ai_service"] = CheckResult{
			Status:  HealthStatusHealthy,
			Message: "AI service is reachable",
			Latency: aiLatency.String(),
		}
	}

	return &HealthCheckResponse{
		Status:    overallStatus,
		Timestamp: timekit.NowUTC(),
		Checks:    checks,
	}, nil
}

// GetDatabaseStats returns detailed database connection pool statistics
func (s *Service) GetDatabaseStats() (*DatabaseStatsResponse, error) {
	return s.repo.GetDatabaseStats()
}

// CheckLiveness returns a simple liveness check (application is running)
func (s *Service) CheckLiveness() *LivenessResponse {
	return &LivenessResponse{Status: "alive"}
}

// CheckReadiness checks if the application is ready to serve traffic
func (s *Service) CheckReadiness(ctx context.Context) (*ReadinessResponse, error) {
	// Check if database is accessible
	_, err := s.repo.PingDatabase(ctx)
	if err != nil {
		return nil, fmt.Errorf("readiness check failed: %w", err)
	}

	if _, err := s.checkAIService(ctx); err != nil {
		return nil, fmt.Errorf("readiness ai service check failed: %w", err)
	}

	return &ReadinessResponse{Status: "ready"}, nil
}

func (s *Service) checkAIService(ctx context.Context) (time.Duration, error) {
	baseURL := strings.TrimSpace(s.cfg.AIService.URL)
	if baseURL == "" {
		return 0, nil
	}

	healthPath := strings.TrimSpace(s.cfg.AIService.HealthPath)
	if healthPath == "" {
		healthPath = "/health"
	}
	healthPath = "/" + strings.TrimLeft(healthPath, "/")

	start := time.Now()
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, strings.TrimRight(baseURL, "/")+healthPath, nil)
	if err != nil {
		return time.Since(start), fmt.Errorf("AI service request build failed: %w", err)
	}

	resp, err := s.aiClient.Do(req)
	latency := time.Since(start)
	if err != nil {
		return latency, fmt.Errorf("AI service ping failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return latency, fmt.Errorf("AI service unhealthy: http status %d", resp.StatusCode)
	}

	return latency, nil
}
