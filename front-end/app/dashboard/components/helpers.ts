// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
}

export function getExt(name: string): string {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

export function isAllowed(file: File): boolean {
  const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".txt"];
  const ALLOWED_MIME = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];
  const ext = "." + getExt(file.name);
  return ALLOWED_EXTENSIONS.includes(ext) || ALLOWED_MIME.includes(file.type);
}

export function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-amber-400";
  return "text-rose-400";
}

export function scoreLabel(score: number): string {
  if (score >= 80) return "Высокое";
  if (score >= 60) return "Среднее";
  return "Низкое";
}

export function scoreBg(score: number): string {
  if (score >= 80) return "bg-emerald-400/10 border-emerald-400/30";
  if (score >= 60) return "bg-amber-400/10 border-amber-400/30";
  return "bg-rose-400/10 border-rose-400/30";
}
