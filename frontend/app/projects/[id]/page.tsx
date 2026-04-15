"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Info,
  MessageCircle,
  Wand2,
  ChevronRight,
  Clock,
  FileText,
  Target,
  ExternalLink,
} from "lucide-react";
import { ScoreRing } from "../../dashboard/components/shared-components";
import { scoreColor, scoreLabel, formatDate, formatBytes } from "../../dashboard/components/helpers";
import { useTheme } from "../../providers/ThemeProvider";
import {
  BackendAnalyzeResponse,
  BackendDocumentVersion,
  BackendProject,
  getFileFormat,
  getLatestAnalysis,
  getProject,
  listProjectVersions,
  submitForReview,
} from "../../lib/tz-api";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isDark } = useTheme();

  const projectId = params.id;
  const queryVersionId = searchParams.get("versionId");

  const [project, setProject] = useState<BackendProject | null>(null);
  const [versions, setVersions] = useState<BackendDocumentVersion[]>([]);
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(queryVersionId);
  const [analysis, setAnalysis] = useState<BackendAnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const selectedVersion = useMemo(
    () => versions.find((version) => version.id === selectedVersionId) || versions[versions.length - 1] || null,
    [versions, selectedVersionId],
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const loadProject = async () => {
      try {
        setLoading(true);
        const [projectData, versionData] = await Promise.all([
          getProject(projectId),
          listProjectVersions(projectId),
        ]);

        setProject(projectData);
        setVersions(versionData);

        const fallbackVersionId = queryVersionId || projectData.active_version_id || versionData[versionData.length - 1]?.id || null;
        setSelectedVersionId(fallbackVersionId);

        if (fallbackVersionId) {
          setAnalysisLoading(true);
          const latest = await getLatestAnalysis(projectId, fallbackVersionId).catch(() => null);
          setAnalysis(latest?.analysis ?? null);
        } else {
          setAnalysis(null);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to load project page", err);
        setError("Не удалось загрузить проект и версию из backend.");
      } finally {
        setLoading(false);
        setAnalysisLoading(false);
      }
    };

    loadProject();
  }, [projectId, queryVersionId]);

  const loadVersionAnalysis = async (versionId: string) => {
    setSelectedVersionId(versionId);
    setAnalysisLoading(true);
    setSubmitMessage(null);
    router.replace(`/projects/${projectId}?versionId=${versionId}`);

    try {
      const latest = await getLatestAnalysis(projectId, versionId);
      setAnalysis(latest.analysis);
      setError(null);
    } catch (err) {
      console.error("Failed to load version analysis", err);
      setAnalysis(null);
      setError("Анализ для этой версии пока не найден.");
    } finally {
      setAnalysisLoading(false);
    }
  };

  const diagnosticScore = analysis?.ai_document_analysis_scorecard?.total_score ?? 0;
  const preliminaryScore = analysis?.ai_preliminary_evaluation_scorecard?.total_score ?? 0;
  const totalFindings = analysis?.findings?.length ?? 0;
  const totalRecommendations = analysis?.recommendations?.length ?? 0;
  const latestImprovementText = analysis?.improved_tz || analysis?.improved_text || analysis?.generate_improved_tz?.improved_text || "";

  const handleSubmitForReview = async () => {
    if (!selectedVersionId) return;
    try {
      const submission = await submitForReview(projectId, selectedVersionId);
      setSubmitMessage(`Версия отправлена на ревью: ${submission.status}`);
    } catch (err) {
      console.error("Failed to submit for review", err);
      setSubmitMessage("Не удалось отправить версию на ревью.");
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans pb-24 ${isDark ? "bg-[#080d14] text-white" : "bg-slate-50 text-slate-900"}`}>
      <header className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors ${isDark ? "bg-[#080d14]/80 border-slate-800" : "bg-white/80 border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => router.push("/dashboard")}
              className={`p-2 rounded-xl transition-colors ${isDark ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold truncate max-w-[220px] sm:max-w-xl">
                {project?.title || "Загрузка проекта..."}
              </h1>
              <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                {selectedVersion ? `Версия ${selectedVersion.version_number}` : "Без активной версии"}
              </p>
            </div>
          </div>

          <div className="hidden md:flex flex-col text-xs text-slate-500 items-start md:items-end">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {project?.organization_name || "Нет организации"}
            </span>
            <span>{project?.status || "unknown"}</span>
          </div>

          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => {
                if (selectedVersionId) {
                  router.push(`/chat?projectId=${projectId}&versionId=${selectedVersionId}`);
                } else {
                  router.push(`/chat?projectId=${projectId}`);
                }
              }}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-2 ${isDark ? "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"}`}
            >
              <MessageCircle className="w-4 h-4" />
              Чат по версии
            </button>
            <button
              onClick={handleSubmitForReview}
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors min-w-[150px] shadow-sm ${isDark ? "bg-amber-400 text-slate-900 hover:bg-amber-300" : "bg-indigo-600 text-white hover:bg-indigo-500"}`}
            >
              Отправить на ревью
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {error && (
          <div className={`rounded-2xl border p-4 text-sm ${isDark ? "border-rose-500/20 bg-rose-500/10 text-rose-200" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
            {error}
          </div>
        )}
        {submitMessage && (
          <div className={`rounded-2xl border p-4 text-sm ${isDark ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
            {submitMessage}
          </div>
        )}

        <section className={`rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
          <div className="flex shrink-0 items-center justify-center">
            <ScoreRing score={analysis?.ai_document_analysis_scorecard?.total_score ?? 0} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              {loading ? "Загружаем проект..." : analysisLoading ? "Загружаем анализ..." : "Backend уже хранит анализ и scorecards"}
            </h2>
            <p className={`mb-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Диагностический score: {diagnosticScore}%. Предварительный официальный score: {preliminaryScore}%.
              {selectedVersion ? ` Сейчас открыта версия ${selectedVersion.version_number}.` : ""}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${isDark ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>
                <CheckCircle className="w-3.5 h-3.5" /> {analysis?.analysis_status || "pending"}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${isDark ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                <AlertTriangle className="w-3.5 h-3.5" /> {totalFindings} замечаний
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${isDark ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-blue-50 text-blue-700 border border-blue-200"}`}>
                <Target className="w-3.5 h-3.5" /> {totalRecommendations} рекомендаций
              </span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className={`rounded-2xl border p-6 ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-indigo-500" />
                Версии проекта
              </h3>
              <div className="space-y-3">
                {versions.map((version) => {
                  const active = version.id === selectedVersionId;
                  return (
                    <button
                      key={version.id}
                      onClick={() => loadVersionAnalysis(version.id)}
                      className={`w-full text-left rounded-xl border p-4 transition-colors ${active ? (isDark ? "bg-indigo-500/10 border-indigo-500/30" : "bg-indigo-50 border-indigo-200") : isDark ? "bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70" : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Версия {version.version_number}</p>
                          <p className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>{formatDate(version.created_at)}</p>
                        </div>
                        <div className={`text-xs ${active ? "text-indigo-400" : isDark ? "text-slate-500" : "text-slate-400"}`}>
                          {version.analysis_status}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs">
                        <FileText className="w-3.5 h-3.5" />
                        {version.original_filename}
                      </div>
                    </button>
                  );
                })}
                {versions.length === 0 && (
                  <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>Версии проекта ещё не загружены.</p>
                )}
              </div>
            </div>

            <div className={`rounded-2xl border p-6 ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-indigo-500" />
                Метаданные версии
              </h3>
              {selectedVersion ? (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className={isDark ? "text-slate-400" : "text-slate-500"}>Файл</span>
                    <span className="text-right">{selectedVersion.original_filename}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className={isDark ? "text-slate-400" : "text-slate-500"}>Тип</span>
                    <span>{getFileFormat(selectedVersion.original_filename)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className={isDark ? "text-slate-400" : "text-slate-500"}>Размер</span>
                    <span>{formatBytes(selectedVersion.file_size_bytes)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className={isDark ? "text-slate-400" : "text-slate-500"}>Проверка</span>
                    <span>{selectedVersion.analysis_status}</span>
                  </div>
                </div>
              ) : (
                <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>Нет активной версии.</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className={`rounded-2xl border p-6 ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-500" />
                  Диагностическая оценка AI
                </h3>
                <span className={`text-xs font-semibold ${scoreColor(diagnosticScore)}`}>
                  {scoreLabel(diagnosticScore)}
                </span>
              </div>
              <div className="space-y-4">
                {Object.entries(analysis?.score?.breakdown || {}).map(([key, value]) => (
                  <ScoreRow key={key} label={key} value={value} max={100} isDark={isDark} />
                ))}
                {!analysis && !analysisLoading && (
                  <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                    Для выбранной версии пока нет сохранённого анализа.
                  </p>
                )}
              </div>
            </div>

            <div className={`rounded-2xl border p-6 ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  Официальная предварительная оценка
                </h3>
                <span className={`text-xs font-semibold ${scoreColor(preliminaryScore)}`}>
                  {preliminaryScore} / {analysis?.ai_preliminary_evaluation_scorecard?.max_total_score ?? 100}
                </span>
              </div>
              <div className="space-y-4">
                {(analysis?.ai_preliminary_evaluation_scorecard?.items || []).map((item) => (
                  <ScoreRow
                    key={item.key}
                    label={item.label}
                    value={item.score}
                    max={item.max_score}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>

            <div className={`rounded-2xl border p-6 ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <AlertTriangle className={`w-5 h-5 ${isDark ? "text-amber-400" : "text-amber-500"}`} />
                Найденные проблемы ({totalFindings})
              </h3>
              <div className="space-y-3">
                {(analysis?.findings || []).map((finding, idx) => (
                  <div
                    key={`${finding.finding_type}-${idx}`}
                    className={`p-4 rounded-xl border flex items-start gap-4 ${finding.severity === "error" ? (isDark ? "bg-rose-500/5 border-rose-500/20" : "bg-rose-50 border-rose-100") : (isDark ? "bg-amber-500/5 border-amber-500/20" : "bg-amber-50 border-amber-100")}`}
                  >
                    <div className={`mt-0.5 shrink-0 ${finding.severity === "error" ? "text-rose-500" : "text-amber-500"}`}>
                      {finding.severity === "error" ? <Info className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    </div>
                    <div className="space-y-1">
                      <p className={`text-xs font-bold uppercase tracking-wider ${finding.severity === "error" ? "text-rose-500" : "text-amber-500"}`}>
                        {finding.section_key || finding.finding_type}
                      </p>
                      <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>{finding.explanation}</p>
                      <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>{finding.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-2xl border p-6 ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <CheckCircle className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-500"}`} />
                Рекомендации по улучшению
              </h3>
              <ul className="space-y-2">
                {(analysis?.recommendations || []).map((rec, idx) => (
                  <li key={`${rec.category}-${idx}`} className={`flex items-start gap-3 text-sm p-3 rounded-xl ${isDark ? "bg-slate-800/50" : "bg-slate-50"}`}>
                    <span className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-600"}`}>{idx + 1}</span>
                    <span className={isDark ? "text-slate-300" : "text-slate-700"}>
                      <strong>{rec.title}:</strong> {rec.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`rounded-2xl border p-6 ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Wand2 className={`w-5 h-5 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
                  Улучшенная версия ТЗ
                </h3>
                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className={`text-xs font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${isDark ? "bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30" : "bg-indigo-500 text-white hover:bg-indigo-600"}`}
                >
                  Открыть модальный просмотр <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <p className={`text-sm whitespace-pre-wrap ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                {latestImprovementText || "Улучшенный текст ещё не сформирован для этой версии."}
              </p>
              {(analysis?.generate_improved_tz?.summary_of_changes || []).length > 0 && (
                <div className="mt-4">
                  <p className={`text-xs font-semibold mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Кратко о правках</p>
                  <ul className={`list-disc pl-5 text-sm space-y-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {analysis?.generate_improved_tz?.summary_of_changes?.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-black/40 animate-in fade-in duration-200">
          <div className={`w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col ${isDark ? "bg-slate-900 border border-slate-800" : "bg-white border border-slate-200"}`}>
            <div className={`flex items-center justify-between p-4 sm:p-6 border-b shrink-0 ${isDark ? "border-slate-800" : "border-slate-100"}`}>
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Wand2 className={`w-5 h-5 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
                  AI-рекомендации по улучшению
                </h2>
                <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Сохранённый ответ AI-service из backend</p>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500"}`}
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {latestImprovementText ? (
                <div className={`p-5 rounded-xl border ${isDark ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                  <h3 className="font-bold text-sm mb-4 px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-500 inline-block">
                    Улучшенный текст
                  </h3>
                  <p className={`text-sm whitespace-pre-wrap ${isDark ? "text-slate-300" : "text-slate-700"}`}>{latestImprovementText}</p>
                </div>
              ) : (
                <div className={`text-center py-12 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Нет доступной улучшенной версии для этой версии документа.</p>
                </div>
              )}
            </div>

            <div className={`p-4 sm:p-6 border-t shrink-0 flex justify-end gap-3 ${isDark ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${isDark ? "border-slate-700 hover:bg-slate-800 text-slate-300" : "border-slate-300 hover:bg-slate-100 text-slate-600"}`}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreRow({ label, value, max, isDark }: { label: string; value: number; max: number; isDark: boolean }) {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className={`font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>{label}</span>
        <span className={`font-bold ${isDark ? "text-slate-400" : "text-slate-500"}`}>{value} / {max}</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
        <div
          className={`h-full rounded-full ${percentage >= 80 ? "bg-emerald-500" : percentage >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
