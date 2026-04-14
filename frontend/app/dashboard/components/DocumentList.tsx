"use client";

import { TZDocument, AnalysisStatus } from "./types";
import { StatusBadge, FormatIcon, ScoreRing } from "./shared-components";
import { formatDate, scoreColor, scoreLabel } from "./helpers";

interface DocumentListProps {
  documents: TZDocument[];
  onSearch: (value: string) => void;
  onFilterStatus: (status: AnalysisStatus | "all") => void;
  search: string;
  filterStatus: AnalysisStatus | "all";
}

export function DocumentList({
  documents,
  onSearch,
  onFilterStatus,
  search,
  filterStatus,
}: DocumentListProps) {
  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-base font-bold text-white">История документов</h3>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/>
            </svg>
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Поиск..."
              className="bg-slate-900/60 border border-slate-800 text-slate-300 text-xs rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:border-amber-400/50 w-44"
            />
          </div>
          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => onFilterStatus(e.target.value as AnalysisStatus | "all")}
            className="bg-slate-900/60 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400/50"
          >
            <option value="all">Все статусы</option>
            <option value="completed">Завершён</option>
            <option value="processing">Анализируется</option>
            <option value="error">Ошибка</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {documents.length === 0 && (
          <div className="text-center py-12 text-slate-600 text-sm">Документы не найдены</div>
        )}
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="group relative flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/50 hover:border-slate-700 transition-all duration-150 px-4 py-3.5 cursor-pointer"
          >
            {/* Format badge */}
            <div className="shrink-0">
              <FormatIcon format={doc.format} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate group-hover:text-amber-300 transition-colors">
                {doc.name}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[11px] text-slate-500">{formatDate(doc.uploadedAt)}</span>
                <span className="text-[11px] text-slate-600">·</span>
                <span className="text-[11px] text-slate-500">{doc.size}</span>
                {doc.issuesFound !== undefined && (
                  <>
                    <span className="text-[11px] text-slate-600">·</span>
                    <span className="text-[11px] text-rose-400">{doc.issuesFound} проблем</span>
                  </>
                )}
              </div>
            </div>

            {/* Score ring */}
            <div className="shrink-0">
              {doc.score !== undefined ? (
                <div className="flex flex-col items-center gap-0.5">
                  <ScoreRing score={doc.score} />
                  <span className={`text-[9px] font-medium ${scoreColor(doc.score)}`}>
                    {scoreLabel(doc.score)}
                  </span>
                </div>
              ) : (
                <div className="w-12 h-12 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-amber-400 animate-spin" />
                </div>
              )}
            </div>

            {/* Status */}
            <div className="shrink-0 hidden sm:block">
              <StatusBadge status={doc.status} />
            </div>

            {/* Arrow */}
            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Hover glow line */}
            {doc.score !== undefined && (
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity ${
                doc.score >= 80 ? "bg-emerald-400" : doc.score >= 60 ? "bg-amber-400" : "bg-rose-400"
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Load more */}
      <div className="mt-4 text-center">
        <button className="text-xs text-slate-500 hover:text-slate-300 transition-colors border border-slate-800 hover:border-slate-700 rounded-lg px-4 py-2">
          Показать все документы
        </button>
      </div>
    </section>
  );
}
