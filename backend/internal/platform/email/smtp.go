package email

import (
	"context"
	"fmt"
	"net/smtp"

	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/config"
)

type SMTPSender struct {
	addr        string
	auth        smtp.Auth
	from        string
	name        string
	projectName string
}

func NewSMTPSender(cfg config.EmailConfig, projectName string) *SMTPSender {
	addr := fmt.Sprintf("%s:%d", cfg.SMTPHost, cfg.SMTPPort)
	return &SMTPSender{
		addr:        addr,
		auth:        smtp.PlainAuth("", cfg.SMTPUser, cfg.SMTPPass, cfg.SMTPHost),
		from:        cfg.FromEmail,
		name:        cfg.FromName,
		projectName: projectName,
	}
}

func (s *SMTPSender) SendVerificationCode(_ context.Context, recipient string, code string) error {
	body := fmt.Sprintf("From: %s <%s>\r\nSubject: %s verification code\r\n\r\nYour verification code is: %s\r\n", s.name, s.from, s.projectName, code)
	if err := smtp.SendMail(s.addr, s.auth, s.from, []string{recipient}, []byte(body)); err != nil {
		return fmt.Errorf("failed to send verification email: %w", err)
	}
	return nil
}
