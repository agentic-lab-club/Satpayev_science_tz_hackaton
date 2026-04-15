package tzworkflow

import (
	"regexp"
	"testing"
	"time"

	sqlmock "github.com/DATA-DOG/go-sqlmock"
	"github.com/agentic-lab-club/Satpayev_science_tz_hackaton/backend/pkg/database"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

func TestRepositoryGetFileRecordByID(t *testing.T) {
	sqlDB, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("sqlmock.New() error = %v", err)
	}
	t.Cleanup(func() { _ = sqlDB.Close() })

	mock.ExpectQuery(regexp.QuoteMeta(`
		SELECT id, uploaded_by_user_id, original_filename, content_type, size_bytes,
		       bucket_name, object_key, etag, created_at
		FROM application_files
		WHERE id = $1
	`)).
		WithArgs(uuid.MustParse("11111111-1111-1111-1111-111111111111")).
		WillReturnRows(sqlmock.NewRows([]string{
			"id",
			"uploaded_by_user_id",
			"original_filename",
			"content_type",
			"size_bytes",
			"bucket_name",
			"object_key",
			"etag",
			"created_at",
		}).AddRow(
			"22222222-2222-2222-2222-222222222222",
			"33333333-3333-3333-3333-333333333333",
			"demo.docx",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			2048,
			"bucket-a",
			"docs/demo.docx",
			"etag-123",
			time.Date(2026, 4, 15, 12, 0, 0, 0, time.UTC),
		))

	repo := NewRepository(database.NewTrackedDB(sqlx.NewDb(sqlDB, "sqlmock")))

	record, err := repo.GetFileRecordByID(uuid.MustParse("11111111-1111-1111-1111-111111111111"))
	if err != nil {
		t.Fatalf("GetFileRecordByID() error = %v", err)
	}

	if record == nil {
		t.Fatalf("GetFileRecordByID() record = nil; want record")
	}
	if record.OriginalFilename != "demo.docx" {
		t.Fatalf("OriginalFilename = %q; want %q", record.OriginalFilename, "demo.docx")
	}
	if record.BucketName != "bucket-a" {
		t.Fatalf("BucketName = %q; want %q", record.BucketName, "bucket-a")
	}
	if record.SizeBytes != 2048 {
		t.Fatalf("SizeBytes = %d; want %d", record.SizeBytes, 2048)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("unmet SQL expectations: %v", err)
	}
}
