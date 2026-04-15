package tzworkflow

const (
	createProjectQuery = `
		INSERT INTO projects (owner_user_id, title, organization_name, status)
		VALUES ($1, $2, $3, COALESCE($4, 'draft'))
		RETURNING id, owner_user_id, title, organization_name, status, active_version_id, final_version_id, created_at, updated_at
	`

	listProjectsByOwnerQuery = `
		SELECT id, owner_user_id, title, organization_name, status, active_version_id, final_version_id, created_at, updated_at
		FROM projects
		WHERE owner_user_id = $1
		ORDER BY created_at DESC
	`

	listProjectsAllQuery = `
		SELECT id, owner_user_id, title, organization_name, status, active_version_id, final_version_id, created_at, updated_at
		FROM projects
		ORDER BY created_at DESC
	`

	getProjectByIDQuery = `
		SELECT id, owner_user_id, title, organization_name, status, active_version_id, final_version_id, created_at, updated_at
		FROM projects
		WHERE id = $1
	`

	updateProjectPointersQuery = `
		UPDATE projects
		SET active_version_id = COALESCE($2, active_version_id),
		    final_version_id = COALESCE($3, final_version_id),
		    status = COALESCE($4, status),
		    updated_at = NOW()
		WHERE id = $1
		RETURNING id, owner_user_id, title, organization_name, status, active_version_id, final_version_id, created_at, updated_at
	`

	createDocumentVersionQuery = `
		INSERT INTO document_versions (
		    project_id, uploaded_by_user_id, version_number, original_file_id,
		    original_filename, content_type, file_size_bytes, extraction_status,
		    analysis_status, analysis_run_id, raw_text_preview
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8, 'pending'), COALESCE($9, 'pending'), $10, $11)
		RETURNING id, project_id, uploaded_by_user_id, version_number, original_file_id,
		          original_filename, content_type, file_size_bytes, extraction_status,
		          analysis_status, analysis_run_id, raw_text_preview, created_at
	`

	listVersionsByProjectQuery = `
		SELECT id, project_id, uploaded_by_user_id, version_number, original_file_id,
		       original_filename, content_type, file_size_bytes, extraction_status,
		       analysis_status, analysis_run_id, raw_text_preview, created_at
		FROM document_versions
		WHERE project_id = $1
		ORDER BY version_number DESC, created_at DESC
	`

	getVersionByIDQuery = `
		SELECT id, project_id, uploaded_by_user_id, version_number, original_file_id,
		       original_filename, content_type, file_size_bytes, extraction_status,
		       analysis_status, analysis_run_id, raw_text_preview, created_at
		FROM document_versions
		WHERE id = $1
	`

	getFileRecordByIDQuery = `
		SELECT id, uploaded_by_user_id, original_filename, content_type, size_bytes,
		       bucket_name, object_key, etag, created_at
		FROM application_files
		WHERE id = $1
	`

	createAnalysisRunQuery = `
		INSERT INTO analysis_runs (
		    document_version_id, status, model_name, prompt_version,
		    request_json, response_json, error_message, started_at, completed_at
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING id
	`

	finishAnalysisRunQuery = `
		UPDATE analysis_runs
		SET status = $2,
		    response_json = $3,
		    error_message = $4,
		    completed_at = $5
		WHERE id = $1
		RETURNING id, document_version_id, status, model_name, prompt_version,
		          request_json, response_json, error_message, started_at, completed_at, created_at
	`

	failureAnalysisRunQuery = `
		UPDATE analysis_runs
		SET status = 'failed',
		    error_message = $2,
		    completed_at = NOW()
		WHERE id = $1
		RETURNING id, document_version_id, status, model_name, prompt_version,
		          request_json, response_json, error_message, started_at, completed_at, created_at
	`

	createScorecardQuery = `
		INSERT INTO scorecards (
		    analysis_run_id, review_submission_id, score_type,
		    total_score, max_total_score, created_by_user_id
		)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id
	`

	createScorecardItemQuery = `
		INSERT INTO scorecard_items (scorecard_id, item_key, label, score, max_score, explanation)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id, scorecard_id, item_key, label, score, max_score, explanation
	`

	listScorecardsByAnalysisRunQuery = `
		SELECT id, analysis_run_id, review_submission_id, score_type, total_score,
		       max_total_score, created_by_user_id, created_at
		FROM scorecards
		WHERE analysis_run_id = $1
		ORDER BY created_at ASC
	`

	listScorecardItemsQuery = `
		SELECT id, scorecard_id, item_key, label, score, max_score, explanation
		FROM scorecard_items
		WHERE scorecard_id = $1
		ORDER BY id ASC
	`

	createChatSessionQuery = `
		INSERT INTO chat_sessions (project_id, document_version_id, analysis_run_id, created_by_user_id, title)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, project_id, document_version_id, analysis_run_id, created_by_user_id, title, created_at
	`

	getChatSessionByIDQuery = `
		SELECT id, project_id, document_version_id, analysis_run_id, created_by_user_id, title, created_at
		FROM chat_sessions
		WHERE id = $1
	`

	listChatMessagesBySessionQuery = `
		SELECT id, chat_session_id, role, content, metadata_json, created_at
		FROM chat_messages
		WHERE chat_session_id = $1
		ORDER BY created_at ASC
	`

	createChatMessageQuery = `
		INSERT INTO chat_messages (chat_session_id, role, content, metadata_json)
		VALUES ($1, $2, $3, NULLIF($4, '')::jsonb)
		RETURNING id, chat_session_id, role, content, metadata_json, created_at
	`

	createReviewSubmissionQuery = `
		INSERT INTO review_submissions (project_id, document_version_id, submitted_by_user_id, status, submitted_at)
		VALUES ($1, $2, $3, $4, COALESCE($5, NOW()))
		RETURNING id, project_id, document_version_id, submitted_by_user_id, status, submitted_at
	`

	listReviewSubmissionsQuery = `
		SELECT id, project_id, document_version_id, submitted_by_user_id, status, submitted_at
		FROM review_submissions
		ORDER BY submitted_at DESC
	`

	createAdminReviewQuery = `
		INSERT INTO admin_reviews (
		    review_submission_id, reviewed_by_user_id, decision,
		    review_feedback, expert_report_comment, final_scorecard_id, reviewed_at
		)
		VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, NOW()))
		RETURNING id, review_submission_id, reviewed_by_user_id, decision,
		          review_feedback, expert_report_comment, final_scorecard_id, reviewed_at
	`

	createReportExportQuery = `
		INSERT INTO report_exports (created_by_user_id, export_type, status, file_id, created_at, completed_at)
		VALUES ($1, $2, $3, $4, COALESCE($5, NOW()), $6)
		RETURNING id, created_by_user_id, export_type, status, file_id, created_at, completed_at
	`
)
