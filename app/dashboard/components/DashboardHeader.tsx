"use client";

import Link from "next/link";

interface HeaderProps {
  onUploadClick: () => void;
}

export function DashboardHeader({ onUploadClick }: HeaderProps) {
  return (
    <>
      {/* Top Nav */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-lg">⚡</div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">TZ<span className="text-amber-400">·AI</span></h1>
            <p className="text-[10px] text-slate-500">НТЗ LAB Hackathon</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/chat" className="text-xs px-3 py-1.5 rounded-full border border-slate-700 hover:border-amber-400/30 text-slate-400 hover:text-amber-400 transition-colors">
            💬 Ассистент
          </Link>
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-full px-3 py-1.5">
            <div className="w-6 h-6 rounded-full bg-indigo-400/20 border border-indigo-400/30 text-xs flex items-center justify-center">А</div>
            <span className="text-xs text-slate-300">Алимбеков Д.</span>
          </div>
        </div>
      </header>

      {/* Hero / Welcome */}
      <section className="relative rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/25 rounded-full px-3 py-1 text-xs text-amber-400 font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            AI-система активна
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Анализ технических<br />
            <span className="text-amber-400">заданий</span> с помощью ИИ
          </h2>
          <p className="text-slate-400 text-sm max-w-lg leading-relaxed mb-6">
            Загрузите ТЗ в формате PDF, DOCX или TXT — система автоматически выявит ошибки,
            оценит качество по 100-балльной шкале и сформирует рекомендации по улучшению.
          </p>

          {/* Capability pills */}
          <div className="flex flex-wrap gap-2 mb-7">
            {["🔍 Анализ структуры", "⚠️ Выявление ошибок", "📊 Оценка качества", "✏️ Рекомендации", "🤖 AI-ассистент"].map((cap) => (
              <span key={cap} className="text-xs text-slate-400 bg-slate-800/70 border border-slate-700 rounded-full px-3 py-1">
                {cap}
              </span>
            ))}
          </div>

          <button
            onClick={onUploadClick}
            className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-bold text-sm rounded-xl px-6 py-3 transition-all duration-150 shadow-lg shadow-amber-400/20"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.25 13.25V5.75M9.25 5.75L6.75 8.25M9.25 5.75L11.75 8.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M3.5 12.5v2a2 2 0 002 2h7.5a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            </svg>
            Загрузить новое ТЗ
          </button>
        </div>
      </section>
    </>
  );
}
