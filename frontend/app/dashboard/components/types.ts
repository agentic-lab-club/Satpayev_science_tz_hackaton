// ─── Types ────────────────────────────────────────────────────────────────────

export type AnalysisStatus = "completed" | "processing" | "error" | "pending";
export type UploadStage = "idle" | "uploading" | "analyzing" | "done" | "error";

export interface ProjectType {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  accent: string;
  border: string;
}

export interface TZDocument {
  id: string;
  name: string;
  uploadedAt: string;
  size: string;
  format: "PDF" | "DOCX" | "TXT";
  status: AnalysisStatus;
  score?: number;
  issuesFound?: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}
