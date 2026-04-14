package email

import (
	"testing"

	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/config"
)

func TestNewSMTPSenderUsesProjectName(t *testing.T) {
	sender := NewSMTPSender(config.EmailConfig{
		FromName:  "Sender",
		FromEmail: "noreply@example.com",
		SMTPHost:  "smtp.example.com",
		SMTPPort:  587,
		SMTPUser:  "user",
		SMTPPass:  "pass",
	}, "Satpayev Science TZ")

	if sender.projectName != "Satpayev Science TZ" {
		t.Fatalf("expected project name to be propagated, got %q", sender.projectName)
	}
}
