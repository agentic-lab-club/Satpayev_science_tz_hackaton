"use client";

import { AnalysisStatus } from "./types";
import { scoreColor } from "./helpers";
import { useTheme } from "../../providers/ThemeProvider";

// ─── Status Badge ──────────────────────────────────────────────────────────────
export function StatusBadge({ status }: { status: AnalysisStatus }) {
  const { isDark } = useTheme();
  
  const darkMap: Record<AnalysisStatus, { label: string; cls: string; dot: string }> = {
    completed: {
      label: "Завершён",
      cls: "bg-emerald-400/10 text-emerald-400 border border-emerald-400/25",
      dot: "bg-emerald-400",
    },
    processing: {
      label: "Анализируется",
      cls: "bg-amber-400/10 text-amber-400 border border-amber-400/25",
      dot: "bg-amber-400 animate-pulse",
    },
    error: {
      label: "Ошибка",
      cls: "bg-rose-400/10 text-rose-400 border border-rose-400/25",
      dot: "bg-rose-400",
    },
    pending: {
      label: "В очереди",
      cls: "bg-slate-400/10 text-slate-400 border border-slate-400/25",
      dot: "bg-slate-400",
    },
  };
  
	const lightMap: Record<AnalysisStatus, { label: string; cls: string; dot: string }> = {
    completed: {
      label: "Завершён",
      cls: "bg-emerald-50 text-emerald-600 border border-emerald-200",
      dot: "bg-emerald-500",
    },
    processing: {
      label: "Анализируется",
      cls: "bg-amber-50 text-amber-600 border border-amber-200",
      dot: "bg-amber-500 animate-pulse",
    },
    error: {
      label: "Ошибка",
      cls: "bg-rose-50 text-rose-600 border border-rose-200",
      dot: "bg-rose-500",
    },
    pending: {
      label: "В очереди",
      cls: "bg-slate-100 text-slate-600 border border-slate-200",
      dot: "bg-slate-500",
    },
  };

  const { label, cls, dot } = isDark ? darkMap[status] : lightMap[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

// ─── Format Icon ──────────────────────────────────────────────────────────────
export function FormatIcon({ format }: { format: "PDF" | "DOCX" | "TXT" }) {
  const { isDark } = useTheme();
  
  const darkColors: Record<string, string> = {
    PDF: "text-rose-400 bg-rose-400/10 border-rose-400/25",
    DOCX: "text-blue-400 bg-blue-400/10 border-blue-400/25",
    TXT: "text-slate-400 bg-slate-400/10 border-slate-400/25",
  };
  
  const lightColors: Record<string, string> = {
    PDF: "text-rose-600 bg-rose-50 border-rose-200",
    DOCX: "text-blue-600 bg-blue-50 border-blue-200",
    TXT: "text-slate-600 bg-slate-100 border-slate-200",
  };
  
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border ${isDark ? darkColors[format] : lightColors[format]}`}>
      {format}
    </span>
  );
}

// ─── Score Ring ──────────────────────────────────────────────────────────────
export function ScoreRing({ score }: { score: number }) {
  const { isDark } = useTheme();
  const r = 18;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 80 ? "#34d399" : score >= 60 ? "#fbbf24" : "#f87171";
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={r} fill="none" stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeWidth="4" />
        <circle
          cx="24" cy="24" r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className={`text-xs font-bold ${scoreColor(score)}`}>{score}</span>
    </div>
  );
}
