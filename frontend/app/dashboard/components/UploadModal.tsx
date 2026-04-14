"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { UploadStage } from "./types";
import {
  PROJECT_TYPES,
  ALLOWED_EXTENSIONS,
  ALLOWED_MIME,
  FORMAT_META,
  STAGE_STEPS,
} from "./constants";
import { formatBytes, getExt, isAllowed } from "./helpers";
import { CheckIcon, ProjectTypeSelect } from "./UploadComponents";
import { useTheme } from "../../providers/ThemeProvider";
import { useRouter } from "next/navigation";
import { fetchApi, API_BASE_URL } from "../../utils/fetchApi";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const { isDark } = useTheme();
  const router = useRouter();
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [stage, setStage] = useState<UploadStage>("idle");
  const [progress, setProgress] = useState(0);
  const [showAllTypes, setShowAllTypes] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => () => { if (progressInterval.current) clearInterval(progressInterval.current); }, []);

  // ── File handling ──
  const handleFile = useCallback((incoming: File) => {
    setFileError(null);
    const ext = getExt(incoming.name);
    if (!["pdf", "doc", "docx"].includes(ext)) {
      setFileError(`Формат .${ext} не поддерживается. Разрешены только PDF и DOC/DOCX.`);
      return;
    }
    if (incoming.size > 20 * 1024 * 1024) {
      setFileError("Файл слишком большой. Максимальный размер — 20 МБ.");
      return;
    }
    setFile(incoming);
    setStage("idle");
    setProgress(0);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = () => setDragOver(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    e.target.value = "";
  };

  // ── Mock upload simulation ──
  const startUpload = () => {
    if (!file || !projectType) return;
    setStage("uploading");
    setProgress(0);

    let p = 0;
    progressInterval.current = setInterval(() => {
      p += Math.random() * 12 + 3;
      if (p >= 60) {
        setProgress(60);
        clearInterval(progressInterval.current!);
        setStage("analyzing");

        setTimeout(() => {
          let q = 60;
          progressInterval.current = setInterval(() => {
            q += Math.random() * 8 + 2;
            if (q >= 100) {
              setProgress(100);
              clearInterval(progressInterval.current!);
              setTimeout(() => setStage("done"), 300);
            } else {
              setProgress(Math.min(q, 99));
            }
          }, 180);
        }, 400);
      } else {
        setProgress(p);
      }
    }, 120);
  };

  const reset = () => {
    setFile(null);
    setStage("idle");
    setProgress(0);
    setProjectType(null);
    setFileError(null);
  };

  const closeModal = () => {
    reset();
    onClose();
  };

  const ext = file ? getExt(file.name) : "";
  const fmeta = FORMAT_META[ext] ?? FORMAT_META["txt"];
  const visibleTypes = showAllTypes ? PROJECT_TYPES : PROJECT_TYPES.slice(0, 4);
  const canUpload = !!file && !!projectType && stage === "idle";

  return (
    <>
      {/* Modal backdrop with fade animation */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 ${isDark ? 'bg-black/50' : 'bg-slate-900/20'} ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeModal}
      />

      {/* Modal with scale and fade animation */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none hidden"
        }`}
        onClick={(e) => e.target === e.currentTarget && closeModal()}
      >
        <div
          className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl transition-all duration-300 ${
            isOpen ? "scale-100" : "scale-95"
          } ${isDark ? 'border-slate-800 bg-[#080d14] shadow-black/80' : 'border-slate-200 bg-white shadow-slate-900/10'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient effects */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute -top-24 left-1/3 w-96 h-64 rounded-full blur-3xl ${isDark ? 'bg-amber-500/4' : 'bg-amber-400/10'}`} />
            <div className={`absolute bottom-1/4 right-0 w-72 h-72 rounded-full blur-3xl ${isDark ? 'bg-blue-500/4' : 'bg-blue-400/10'}`} />
          </div>

          {/* Close button */}
          <div className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b ${isDark ? 'bg-[#080d14]/80 border-slate-800' : 'bg-white/80 border-slate-100'}`}>
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Загрузить ТЗ</h2>
            <button
              onClick={closeModal}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isDark ? 'text-slate-500 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
              aria-label="Закрыть"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Modal content */}
          <div className="relative px-6 py-6 space-y-6">

            {/* Header description */}
            {stage === "idle" && (
              <div>
                <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  Загрузите документ для автоматического анализа — ИИ оценит качество, структуру и полноту.
                </p>
              </div>
            )}

            {/* ══════════════ UPLOAD ZONE ══════════════ */}
            {stage === "idle" && (
              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => !file && inputRef.current?.click()}
                className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer
                  ${dragOver
                    ? "border-amber-400/70 bg-amber-400/5 scale-[1.005]"
                    : file
                    ? isDark ? "border-slate-700 bg-slate-900/40 cursor-default" : "border-slate-200 bg-slate-50 cursor-default"
                    : isDark ? "border-slate-700 hover:border-slate-600 bg-slate-900/30 hover:bg-slate-900/50" : "border-slate-300 hover:border-indigo-400/50 bg-slate-50 hover:bg-indigo-50/30"
                  }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={onInputChange}
                />

                {/* Empty state */}
                {!file && (
                  <div className="flex flex-col items-center justify-center py-14 px-6 select-none">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                      dragOver ? "bg-amber-400/15 border border-amber-400/40" : isDark ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-200 shadow-sm"
                    }`}>
                      <svg
                        className={`w-7 h-7 transition-colors ${dragOver ? "text-amber-400" : isDark ? "text-slate-500" : "text-slate-400"}`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      >
                        <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12M8 8l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {dragOver ? "Отпустите для загрузки" : "Перетащите файл сюда"}
                    </p>
                    <p className={`text-xs mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>или</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                      className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${isDark ? 'text-slate-900 bg-amber-400 hover:bg-amber-300 active:scale-95' : 'text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-600/20 active:scale-95'}`}
                    >
                      Выбрать файл
                    </button>
                    {/* Supported formats */}
                    <div className="flex items-center gap-2 mt-5">
                      {["PDF", "DOC", "DOCX"].map((fmt) => (
                        <span key={fmt} className={`text-[10px] font-bold px-2 py-0.5 rounded border ${FORMAT_META[fmt.toLowerCase()]?.bg ?? (isDark ? "bg-slate-700 border-slate-600" : "bg-slate-100 border-slate-200")} ${FORMAT_META[fmt.toLowerCase()]?.color ?? (isDark ? "text-slate-400" : "text-slate-500")}`}>
                          {fmt}
                        </span>
                      ))}
                      <span className={`text-[10px] ml-1 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>до 20 МБ</span>
                    </div>
                  </div>
                )}

                {/* File selected state */}
                {file && (
                  <div className="flex items-center gap-4 p-5">
                    {/* File icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${fmeta.bg}`}>
                      <span className={`text-xs font-bold uppercase ${fmeta.color}`}>{ext}</span>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{file.name}</p>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{formatBytes(file.size)}</p>
                    </div>
                    {/* Remove */}
                    <button
                      onClick={(e) => { e.stopPropagation(); reset(); }}
                      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isDark ? 'text-slate-500 hover:text-rose-400 hover:bg-rose-400/10' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'}`}
                      aria-label="Удалить файл"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4l8 8M12 4L4 12" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                )}

                {/* Drag overlay label */}
                {dragOver && (
                  <div className="absolute inset-0 rounded-2xl flex items-center justify-center pointer-events-none">
                    <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl px-4 py-2">
                      <p className="text-xs font-semibold text-amber-400">Отпустите файл</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* File error */}
            {fileError && (
              <div className={`flex items-start gap-3 border rounded-xl px-4 py-3 ${isDark ? 'bg-rose-400/10 border-rose-400/25' : 'bg-rose-50 border-rose-100'}`}>
                <svg className={`w-4 h-4 mt-0.5 shrink-0 ${isDark ? 'text-rose-400' : 'text-rose-500'}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="7"/><path d="M8 5v3.5M8 11h.01" strokeLinecap="round"/>
                </svg>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-rose-300' : 'text-rose-600'}`}>{fileError}</p>
              </div>
            )}

            {/* ══════════════ PROJECT TYPE ══════════════ */}
            {stage === "idle" && (
              <ProjectTypeSelect
                projectType={projectType}
                onSelect={setProjectType}
                visibleTypes={visibleTypes}
                showAllTypes={showAllTypes}
                onShowAllTypes={() => setShowAllTypes(true)}
              />
            )}

            {/* ══════════════ PROGRESS / STATUS ══════════════ */}
            {(stage === "uploading" || stage === "analyzing" || stage === "done") && (
              <div className={`rounded-2xl border p-5 space-y-5 ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50/50'}`}>
                {/* File summary */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${fmeta.bg} shrink-0`}>
                    <span className={`text-[10px] font-bold uppercase ${fmeta.color}`}>{ext}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{file?.name}</p>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{file && formatBytes(file.size)}</p>
                  </div>
                  {stage === "done" && (
                    <svg className={`w-5 h-5 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`} viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M6.5 10l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {stage === "uploading" && "Загрузка файла..."}
                      {stage === "analyzing" && "AI-анализ документа..."}
                      {stage === "done" && "Анализ завершён"}
                    </span>
                    <span className={`text-xs font-semibold ${isDark ? 'text-amber-400' : 'text-indigo-600'}`}>{Math.round(progress)}%</span>
                  </div>
                  <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-200 ${stage === "done" ? (isDark ? "bg-emerald-400" : "bg-emerald-500") : (isDark ? "bg-amber-400" : "bg-indigo-600")}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-3 pt-1">
                  {STAGE_STEPS.map((step, i) => {
                    const stageOrder: Record<UploadStage, number> = { idle: -1, uploading: 0, analyzing: 1, done: 2, error: -1 };
                    const currentOrder = stageOrder[stage];
                    const isDone = currentOrder > i;
                    const isActive = currentOrder === i;
                    return (
                      <div key={step.key} className={`flex items-center gap-3 transition-opacity ${
                        !isDone && !isActive ? "opacity-40" : "opacity-100"
                      }`}>
                        <CheckIcon done={isDone} active={isActive} isDark={isDark} />
                        <div>
                          <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{step.label}</p>
                          {isActive && (
                            <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{step.sub}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ══════════════ DONE CTA ══════════════ */}
            {stage === "done" && (
              <div className={`rounded-2xl border p-5 ${isDark ? 'border-emerald-400/20 bg-emerald-400/5' : 'border-emerald-100 bg-emerald-50/50'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-base ${isDark ? 'bg-emerald-400/15 border-emerald-400/30' : 'bg-emerald-100 border-emerald-200'}`}>✅</div>
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Анализ готов</p>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Результаты ожидают вас на странице отчёта</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => { closeModal(); router.push('/projects/1'); }} className={`flex-1 text-xs font-bold rounded-xl py-2.5 transition-all active:scale-95 ${isDark ? 'bg-amber-400 hover:bg-amber-300 text-slate-900' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/20'}`}>
                    Посмотреть результаты →
                  </button>
                  <button onClick={reset} className={`flex-1 text-xs font-semibold rounded-xl py-2.5 transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                    Загрузить ещё
                  </button>
                </div>
              </div>
            )}

            {/* ══════════════ SUBMIT BUTTON ══════════════ */}
            {stage === "idle" && (
              <div className="pt-1">
                {!projectType && file && (
                  <p className={`text-xs mb-3 flex items-center gap-1.5 ${isDark ? 'text-amber-400/80' : 'text-amber-600'}`}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="7" cy="7" r="6"/><path d="M7 4.5v3M7 9.5h.01" strokeLinecap="round"/>
                    </svg>
                    Выберите тип проекта для запуска анализа
                  </p>
                )}
                <button
                  onClick={startUpload}
                  disabled={!canUpload}
                  className={`w-full rounded-xl py-3.5 text-sm font-bold transition-all duration-150
                    ${canUpload
                      ? isDark ? "bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-slate-900 shadow-lg shadow-amber-400/15" : "bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white shadow-lg shadow-indigo-600/20"
                      : isDark ? "bg-slate-800 text-slate-600 cursor-not-allowed" : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                >
                  {!file ? "Сначала выберите файл" : !projectType ? "Выберите тип проекта" : "Запустить AI-анализ"}
                </button>

                {canUpload && (
                  <p className={`text-[11px] text-center mt-2 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                    Загрузка займёт несколько секунд
                  </p>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
