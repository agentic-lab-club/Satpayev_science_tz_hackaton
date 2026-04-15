import { fetchApi } from "../utils/fetchApi";

export interface BackendProject {
  id: string;
  owner_user_id: string;
  title: string;
  organization_name?: string | null;
  status: string;
  active_version_id?: string | null;
  final_version_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface BackendDocumentVersion {
  id: string;
  project_id: string;
  uploaded_by_user_id: string;
  version_number: number;
  original_file_id: string;
  original_filename: string;
  content_type: string;
  file_size_bytes: number;
  extraction_status: string;
  analysis_status: string;
  analysis_run_id?: string | null;
  raw_text_preview?: string | null;
  created_at: string;
}

export interface BackendScorecardItem {
  key: string;
  label: string;
  score: number;
  max_score: number;
  explanation: string;
}

export interface BackendScorecard {
  score_type: string;
  total_score: number;
  max_total_score: number;
  items: BackendScorecardItem[];
  is_placeholder: boolean;
}

export interface BackendSection {
  key: string;
  title: string;
  content_excerpt: string;
  start_index?: number | null;
  end_index?: number | null;
  confidence: number;
}

export interface BackendFinding {
  finding_type: string;
  severity: string;
  section_key?: string;
  quote: string;
  explanation: string;
  recommendation: string;
}

export interface BackendRecommendation {
  category: string;
  title: string;
  description: string;
  priority: number;
}

export interface BackendAnalyzeResponse {
  analysis_status: string;
  document: {
    file_path?: string;
    filename: string;
    content_type: string;
    character_count: number;
    parser: string;
  };
  raw_text_preview: string;
  structure: {
    sections: Array<{
      title: string;
      content: string;
      length: number;
    }>;
    found_sections: string[];
    missing_sections: string[];
    weak_sections: string[];
    empty_sections: string[];
    matched_required_sections: Record<string, string>;
  };
  semantic: {
    ambiguities: Array<{
      issue_type: string;
      section: string;
      quote: string;
      explanation: string;
      recommendation: string;
    }>;
    contradictions: Array<{
      issue_type: string;
      section: string;
      quote: string;
      explanation: string;
      recommendation: string;
    }>;
    missing_elements: Array<{
      issue_type: string;
      section: string;
      quote: string;
      explanation: string;
      recommendation: string;
    }>;
    requirements: Array<{
      issue_type: string;
      section: string;
      quote: string;
      explanation: string;
      recommendation: string;
    }>;
    deadlines: Array<{
      issue_type: string;
      section: string;
      quote: string;
      explanation: string;
      recommendation: string;
    }>;
    kpis: Array<{
      issue_type: string;
      section: string;
      quote: string;
      explanation: string;
      recommendation: string;
    }>;
    expected_results: Array<{
      issue_type: string;
      section: string;
      quote: string;
      explanation: string;
      recommendation: string;
    }>;
  };
  score: {
    total_score: number;
    breakdown: Record<string, number>;
    explanation: string[];
  };
  recommendations: BackendRecommendation[];
  generate_improved_tz: {
    summary_of_changes: string[];
    improved_text: string;
  };
  improved_tz: string;
  extracted_entities: Record<string, Array<{ value: string; section: string; confidence: number }>>;
  confirmed_entities: Record<string, Array<{ value: string; section: string; confidence: number }>>;
  detected_sections: BackendSection[];
  missing_required_sections: string[];
  weak_sections: string[];
  findings: BackendFinding[];
  suggested_structure: string;
  improved_text: string;
  ai_document_analysis_scorecard: BackendScorecard;
  ai_preliminary_evaluation_scorecard: BackendScorecard;
  model_metadata: {
    mode: string;
    provider?: string;
    model?: string;
    prompt_version: string;
  };
}

export interface BackendLatestAnalysisResponse {
  analysis_run_id: string;
  analysis: BackendAnalyzeResponse;
}

export interface BackendChatSession {
  id: string;
  project_id: string;
  document_version_id: string;
  analysis_run_id?: string | null;
  created_by_user_id: string;
  title: string;
  created_at: string;
}

export interface BackendChatResponse {
  response_status: string;
  answer: string;
  referenced_sections: string[];
  referenced_findings: string[];
  suggested_next_actions: string[];
}

export interface BackendSendChatMessageResponse {
  session_id: string;
  user_message: {
    id: string;
    chat_session_id: string;
    role: string;
    content: string;
    metadata_json?: string;
    created_at: string;
  };
  assistant_message: {
    id: string;
    chat_session_id: string;
    role: string;
    content: string;
    metadata_json?: string;
    created_at: string;
  };
  ai_response: BackendChatResponse;
}

export interface BackendReviewSubmission {
  id: string;
  project_id: string;
  document_version_id: string;
  submitted_by_user_id: string;
  status: string;
  submitted_at: string;
}

export interface BackendAssetUploadResponse {
  file_id: string;
  file_type: string;
  original_filename: string;
}

export function getFileFormat(filename: string): "PDF" | "DOCX" | "TXT" {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "PDF";
  if (ext === "doc" || ext === "docx") return "DOCX";
  return "TXT";
}

export function getProjectPrimaryVersionId(project: BackendProject): string | null {
  return project.active_version_id || project.final_version_id || null;
}

export async function listProjects(): Promise<BackendProject[]> {
  return fetchApi("/api/v1/projects");
}

export async function getProject(projectId: string): Promise<BackendProject> {
  return fetchApi(`/api/v1/projects/${projectId}`);
}

export async function createProject(payload: { title: string; organization_name?: string | null }): Promise<BackendProject> {
  return fetchApi("/api/v1/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function listProjectVersions(projectId: string): Promise<BackendDocumentVersion[]> {
  return fetchApi(`/api/v1/projects/${projectId}/versions`);
}

export async function createVersion(projectId: string, fileId: string): Promise<BackendDocumentVersion> {
  return fetchApi(`/api/v1/projects/${projectId}/versions`, {
    method: "POST",
    body: JSON.stringify({ file_id: fileId }),
  });
}

export async function analyzeVersion(projectId: string, versionId: string): Promise<BackendLatestAnalysisResponse> {
  return fetchApi(`/api/v1/projects/${projectId}/versions/${versionId}/analyze`, {
    method: "POST",
    body: JSON.stringify({}),
  });
}

export async function getLatestAnalysis(projectId: string, versionId: string): Promise<BackendLatestAnalysisResponse> {
  return fetchApi(`/api/v1/projects/${projectId}/versions/${versionId}/analysis/latest`);
}

export async function uploadAsset(file: File, fileType = "portfolio"): Promise<BackendAssetUploadResponse> {
  const formData = new FormData();
  formData.append("file_type", fileType);
  formData.append("file", file);
  return fetchApi("/assets", {
    method: "POST",
    body: formData,
  });
}

export async function createChatSession(projectId: string, title: string): Promise<BackendChatSession> {
  return fetchApi(`/api/v1/projects/${projectId}/chat-sessions`, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export async function sendChatMessage(
  projectId: string,
  sessionId: string,
  userMessage: string,
): Promise<BackendSendChatMessageResponse> {
  return fetchApi(`/api/v1/projects/${projectId}/chat-sessions/${sessionId}/messages`, {
    method: "POST",
    body: JSON.stringify({ user_message: userMessage }),
  });
}

export async function submitForReview(projectId: string, documentVersionId?: string | null): Promise<BackendReviewSubmission> {
  return fetchApi(`/api/v1/projects/${projectId}/submit-for-review`, {
    method: "POST",
    body: JSON.stringify({ document_version_id: documentVersionId || undefined }),
  });
}
