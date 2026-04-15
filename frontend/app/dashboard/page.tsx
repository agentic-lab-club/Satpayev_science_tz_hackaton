"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, CheckCircle, Target, AlertTriangle, MessageCircle } from "lucide-react";
import { AnalysisStatus } from "./components/types";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatCard } from "./components/StatCard";
import { DocumentList } from "./components/DocumentList";
import { QuickTips } from "./components/QuickTips";
import { UploadModal } from "./components/UploadModal";
import { useTheme } from "../providers/ThemeProvider";
import { TZDocument } from "./components/types";
import {
  getLatestAnalysis,
  getFileFormat,
  getProjectPrimaryVersionId,
  listProjectVersions,
  listProjects,
  BackendProject,
} from "../lib/tz-api";
import { formatBytes } from "./components/helpers";

export default function Dashboard() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<AnalysisStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState<TZDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { isDark } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const projects = await listProjects();
        const mappedDocs = await Promise.all(
          projects.map(async (project: BackendProject) => {
            const versions = await listProjectVersions(project.id).catch(() => []);
            const versionId = getProjectPrimaryVersionId(project) || versions[versions.length - 1]?.id || null;
            const latestVersion = versionId
              ? versions.find((version) => version.id === versionId) || versions[versions.length - 1]
              : versions[versions.length - 1];

            const analysis = versionId
              ? await getLatestAnalysis(project.id, versionId).catch(() => null)
              : null;

            const analysisData = analysis?.analysis;
            const score = analysisData?.ai_document_analysis_scorecard?.total_score ?? undefined;
            const issuesFound = analysisData?.findings?.length ?? 0;
            const analysisStatus = latestVersion?.analysis_status ?? (analysisData ? "completed" : "pending");

            return {
              id: project.id,
              name: latestVersion?.original_filename || project.title,
              uploadedAt: latestVersion?.created_at || project.created_at,
              size: latestVersion ? formatBytes(latestVersion.file_size_bytes) : "—",
              format: latestVersion ? getFileFormat(latestVersion.original_filename) : "TXT",
              status: (analysisStatus === "completed" || analysisData) ? "completed" : analysisStatus === "error" ? "error" : "processing",
              score,
              issuesFound,
              versionId: versionId || undefined,
              projectTitle: project.title,
              organizationName: project.organization_name || undefined,
              versionNumber: latestVersion?.version_number,
              analysisRunId: analysis?.analysis_run_id,
            } satisfies TZDocument;
          }),
        );

        mappedDocs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        setDocuments(mappedDocs);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch projects", error);
        setError("Не удалось загрузить проекты. Проверьте подключение к backend.");
        setDocuments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const completed = documents.filter((d) => d.status === "completed");
  const avgScore = completed.length > 0 
    ? Math.round(completed.reduce((s, d) => s + (d.score ?? 0), 0) / completed.length)
    : 0;
  const totalIssues = documents.reduce((sum, d) => sum + (d.issuesFound ?? 0), 0);

  const filtered = documents.filter((d) => {
    const matchStatus = filterStatus === "all" || d.status === filterStatus;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDark ? 'bg-[#080d14] text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl transition-colors duration-300 ${isDark ? 'bg-amber-500/5' : 'bg-amber-300/20'}`} />
        <div className={`absolute top-1/2 -right-40 w-80 h-80 rounded-full blur-3xl transition-colors duration-300 ${isDark ? 'bg-blue-500/5' : 'bg-blue-300/20'}`} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* ── Header & Hero ── */}
        <DashboardHeader onUploadClick={() => setUploadModalOpen(true)} />

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon={FileText} value={isLoading ? "-" : String(documents.length)} label="Всего документов" accent="bg-blue-400" />
          <StatCard icon={CheckCircle} value={isLoading ? "-" : String(completed.length)} label="Проанализировано" accent="bg-emerald-400" />
          <StatCard icon={Target} value={isLoading ? "-" : `${avgScore}%`} label="Средний балл" accent="bg-indigo-400" />
          <StatCard icon={AlertTriangle} value={isLoading ? "-" : String(totalIssues)} label="Найдено замечаний" accent="bg-amber-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <DocumentList
              documents={filtered}
              onSearch={setSearch}
              onFilterStatus={setFilterStatus}
              search={search}
              filterStatus={filterStatus}
            />
          </div>

        </div>
          {/* ── Quick Tips ── */}
          {error && (
            <div className={`rounded-2xl border p-4 text-sm ${isDark ? "border-rose-500/20 bg-rose-500/10 text-rose-200" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
              {error}
            </div>
          )}
          <QuickTips />
      </div>

      {/* ── Upload Modal ── */}
      <UploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />

      <button
        onClick={() => router.push("/chat")}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-95 text-white shadow-xl shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center transition-all duration-150"
        aria-label="Открыть AI-ассистент"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Notification dot on chat button */}
      <span className={`fixed bottom-[62px] right-5 z-50 w-3 h-3 rounded-full bg-emerald-400 border-2 animate-pulse transition-colors duration-300 ${isDark ? 'border-[#080d14]' : 'border-slate-50'}`} />
    </div>
  );
}
