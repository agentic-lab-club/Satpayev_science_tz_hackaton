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

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
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
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
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
          className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-[#080d14] shadow-2xl shadow-black/80 transition-all duration-300 ${
            isOpen ? "scale-100" : "scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient effects */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 left-1/3 w-96 h-64 bg-amber-500/4 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-500/4 rounded-full blur-3xl" />
          </div>

          {/* Close button */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#080d14]/80 backdrop-blur-sm border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">Загрузить ТЗ</h2>
            <button
              onClick={closeModal}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-all"
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
                <p className="text-sm text-slate-500">
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
                    ? "border-slate-700 bg-slate-900/40 cursor-default"
                    : "border-slate-700 hover:border-slate-600 bg-slate-900/30 hover:bg-slate-900/50"
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
                      dragOver ? "bg-amber-400/15 border border-amber-400/40" : "bg-slate-800 border border-slate-700"
                    }`}>
                      <svg
                        className={`w-7 h-7 transition-colors ${dragOver ? "text-amber-400" : "text-slate-500"}`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      >
                        <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12M8 8l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">
                      {dragOver ? "Отпустите для загрузки" : "Перетащите файл сюда"}
                    </p>
                    <p className="text-xs text-slate-500 mb-4">или</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                      className="text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 active:scale-95 px-4 py-2 rounded-lg transition-all"
                    >
                      Выбрать файл
                    </button>
                    {/* Supported formats */}
                    <div className="flex items-center gap-2 mt-5">
                      {["PDF", "DOC", "DOCX"].map((fmt) => (
                        <span key={fmt} className={`text-[10px] font-bold px-2 py-0.5 rounded border ${FORMAT_META[fmt.toLowerCase()]?.bg ?? "bg-slate-700 border-slate-600"} ${FORMAT_META[fmt.toLowerCase()]?.color ?? "text-slate-400"}`}>
                          {fmt}
                        </span>
                      ))}
                      <span className="text-[10px] text-slate-600 ml-1">до 20 МБ</span>
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
                      <p className="text-sm font-semibold text-white truncate">{file.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{formatBytes(file.size)}</p>
                    </div>
                    {/* Remove */}
                    <button
                      onClick={(e) => { e.stopPropagation(); reset(); }}
                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 transition-all"
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
              <div className="flex items-start gap-3 bg-rose-400/10 border border-rose-400/25 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="7"/><path d="M8 5v3.5M8 11h.01" strokeLinecap="round"/>
                </svg>
                <p className="text-xs text-rose-300 leading-relaxed">{fileError}</p>
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
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-5">
                {/* File summary */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${fmeta.bg} shrink-0`}>
                    <span className={`text-[10px] font-bold uppercase ${fmeta.color}`}>{ext}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{file?.name}</p>
                    <p className="text-xs text-slate-500">{file && formatBytes(file.size)}</p>
                  </div>
                  {stage === "done" && (
                    <svg className="w-5 h-5 text-emerald-400 shrink-0" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M6.5 10l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">
                      {stage === "uploading" && "Загрузка файла..."}
                      {stage === "analyzing" && "AI-анализ документа..."}
                      {stage === "done" && "Анализ завершён"}
                    </span>
                    <span className="text-xs font-semibold text-amber-400">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-200 ${stage === "done" ? "bg-emerald-400" : "bg-amber-400"}`}
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
                        <CheckIcon done={isDone} active={isActive} />
                        <div>
                          <p className="text-xs font-medium text-white">{step.label}</p>
                          {isActive && (
                            <p className="text-[10px] text-slate-500">{step.sub}</p>
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
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-base">✅</div>
                  <div>
                    <p className="text-sm font-semibold text-white">Анализ готов</p>
                    <p className="text-xs text-slate-500">Результаты ожидают вас на странице отчёта</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex-1 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 text-xs font-bold rounded-xl py-2.5 transition-all">
                    Посмотреть результаты →
                  </button>
                  <button onClick={reset} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl py-2.5 transition-all">
                    Загрузить ещё
                  </button>
                </div>
              </div>
            )}

            {/* ══════════════ SUBMIT BUTTON ══════════════ */}
            {stage === "idle" && (
              <div className="pt-1">
                {!projectType && file && (
                  <p className="text-xs text-amber-400/80 mb-3 flex items-center gap-1.5">
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
                      ? "bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-slate-900 shadow-lg shadow-amber-400/15"
                      : "bg-slate-800 text-slate-600 cursor-not-allowed"
                    }`}
                >
                  {!file ? "Сначала выберите файл" : !projectType ? "Выберите тип проекта" : "Запустить AI-анализ"}
                </button>

                {canUpload && (
                  <p className="text-[11px] text-slate-600 text-center mt-2">
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
