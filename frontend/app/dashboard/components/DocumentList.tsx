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
    <section className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
      {/* Decorative gradients */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-500" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-500" />

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            История документов
          </h3>
          <p className="text-sm text-slate-400 mt-1">Остальные недавние загрузки и проверки ТЗ</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative group/search">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/search:text-indigo-400 transition-colors" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/>
            </svg>
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Поиск документов..."
              className="w-full sm:w-64 bg-slate-950/50 border border-slate-800/80 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
            />
          </div>
          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => onFilterStatus(e.target.value as AnalysisStatus | "all")}
            className="w-full sm:w-auto appearance-none bg-slate-950/50 border border-slate-800/80 text-slate-200 text-sm rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1em"
            }}
          >
            <option value="all">Все статусы</option>
            <option value="completed">Завершён</option>
            <option value="processing">В процессе</option>
            <option value="error">Ошибка</option>
          </select>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        {documents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-800/50 rounded-xl bg-slate-900/20">
            <svg className="w-10 h-10 text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <p className="text-slate-300 font-medium">Документы не найдены</p>
            <p className="text-slate-500 text-sm mt-1">Попробуйте изменить параметры поиска или фильтры</p>
          </div>
        )}
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="group/item relative flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-slate-800/50 bg-slate-950/30 hover:bg-slate-800/40 hover:border-slate-700/80 transition-all duration-300 p-4 sm:px-5 sm:py-4 cursor-pointer overflow-hidden backdrop-blur-sm"
          >
            {/* Format badge */}
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 shadow-inner group-hover/item:border-slate-700 transition-colors">
              <FormatIcon format={doc.format} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-base text-slate-200 font-medium truncate group-hover:item:text-indigo-300 transition-colors mb-1">
                {doc.name}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-xs font-medium text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800">
                  {formatDate(doc.uploadedAt)}
                </span>
                <span className="text-xs text-slate-500">{doc.size}</span>
                {doc.issuesFound !== undefined && doc.issuesFound > 0 && (
                  <span className="text-xs font-medium text-rose-400/90 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {doc.issuesFound} проблем
                  </span>
                )}
                {doc.issuesFound === 0 && (
                  <span className="text-xs font-medium text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Без проблем
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-800/50 sm:border-0">
              {/* Score section */}
              <div className="shrink-0 min-w-[80px] flex flex-col items-center justify-center">
                {doc.score !== undefined ? (
                  <div className="flex items-center gap-3">
                    <ScoreRing score={doc.score} />
                    <div className="flex flex-col sm:hidden">
                      <span className={`text-xs font-bold ${scoreColor(doc.score)}`}>{doc.score}/100</span>
                      <span className={`text-[10px] uppercase tracking-wider font-semibold opacity-80 ${scoreColor(doc.score)}`}>{scoreLabel(doc.score)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-slate-700 border-t-indigo-500 animate-spin" />
                    <span className="text-xs text-slate-400">Анализ...</span>
                  </div>
                )}
              </div>

              {/* Status & Desktop Score Label */}
              <div className="shrink-0 flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end min-w-[80px]">
                  {doc.score !== undefined && (
                    <span className={`text-[10px] uppercase tracking-wider font-bold ${scoreColor(doc.score)}`}>
                      {scoreLabel(doc.score)}
                    </span>
                  )}
                </div>
                <div className="min-w-[110px] flex justify-end">
                  <StatusBadge status={doc.status} />
                </div>
              </div>

              {/* Arrow */}
              <div className="shrink-0 text-slate-600 group-hover/item:text-indigo-400 group-hover/item:translate-x-1 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                  <path d="M7 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Hover glow line */}
            {doc.score !== undefined && (
               <div className={`absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover/item:opacity-100 transition-opacity ${
                 doc.score >= 80 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : doc.score >= 60 ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
               }`} />
            )}
            {doc.score === undefined && (
               <div className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover/item:opacity-100 transition-opacity bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-pulse" />
            )}
          </div>
        ))}
      </div>

      {/* Load more */}
      <div className="mt-8 flex justify-center relative z-10">
        <button className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 rounded-xl px-6 py-2.5 group/btn">
          Показать все документы
          <svg className="w-4 h-4 group-hover/btn:translate-y-0.5 group-hover/btn:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
            <path d="M7 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
