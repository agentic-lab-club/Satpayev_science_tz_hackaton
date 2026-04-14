"use client";

import Link from "next/link";
import { Zap, MessageSquare, Upload, Zap as AnalyzeIcon, AlertCircle, BarChart3, Lightbulb, Bot } from "lucide-react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("../../components/ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="w-10 h-10" />
});

interface HeaderProps {
  onUploadClick: () => void;
}

export function DashboardHeader({ onUploadClick }: HeaderProps) {
  return (
    <>
      {/* Top Nav */}
      <header className="flex items-center justify-between dark:bg-slate-900/40 light:bg-white/40 p-4 rounded-lg border dark:border-slate-700/30 light:border-slate-200/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold dark:text-white light:text-slate-900 tracking-wide">TZ<span className="text-amber-400">·AI</span></h1>
            <p className="text-[10px] dark:text-slate-500 light:text-slate-600">НТЗ LAB Hackathon</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/chat" className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full dark:border-slate-700 dark:hover:border-amber-400/30 dark:text-slate-400 dark:hover:text-amber-400 light:border-slate-300 light:hover:border-blue-400/30 light:text-slate-700 light:hover:text-blue-600 border transition-colors">
            <MessageSquare className="w-3 h-3" />
            Ассистент
          </Link>
          <div className="hidden sm:flex items-center gap-2 dark:bg-slate-900/60 light:bg-slate-100/60 dark:border-slate-800 light:border-slate-200 border rounded-full px-3 py-1.5 dark:hover:border-slate-700 light:hover:border-slate-300 transition-colors">
            <div className="w-6 h-6 rounded-full dark:bg-indigo-400/20 dark:border-indigo-400/30 light:bg-indigo-100 light:border-indigo-300 border text-xs flex items-center justify-center font-bold dark:text-indigo-300 light:text-indigo-700">А</div>
            <span className="text-xs dark:text-slate-300 light:text-slate-700">Алимбеков Д.</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero / Welcome */}
      <section className="relative rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden p-8 hover:border-slate-700 transition-colors">
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
            {[
              { icon: AnalyzeIcon, label: "Анализ структуры" },
              { icon: AlertCircle, label: "Выявление ошибок" },
              { icon: BarChart3, label: "Оценка качества" },
              { icon: Lightbulb, label: "Рекомендации" },
              { icon: Bot, label: "AI-ассистент" }
            ].map((cap) => (
              <div key={cap.label} className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/70 border border-slate-700 rounded-full px-3 py-1 hover:border-slate-600 transition-colors">
                <cap.icon className="w-3 h-3" />
                {cap.label}
              </div>
            ))}
          </div>

          <button
            onClick={onUploadClick}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-95 text-white font-bold text-sm rounded-xl px-6 py-3 transition-all duration-150 shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40"
          >
            <Upload className="w-4 h-4" />
            Загрузить новое ТЗ
          </button>
        </div>
      </section>
    </>
  );
}
