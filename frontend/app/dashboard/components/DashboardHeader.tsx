"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, MessageSquare, Upload, Zap as AnalyzeIcon, AlertCircle, BarChart3, Lightbulb, Bot, X } from "lucide-react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("../../components/ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="w-10 h-10" />
});

interface HeaderProps {
  onUploadClick: () => void;
}

export function DashboardHeader({ onUploadClick }: HeaderProps) {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  return (
    <div className="space-y-6">
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

      {/* Hero / Welcome Banner */}
      {isBannerVisible && (
        <section className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-900/40 via-slate-900/40 to-slate-900/40 backdrop-blur-sm overflow-hidden p-8">
          <button 
            onClick={() => setIsBannerVisible(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 rounded-full p-1.5 transition-colors z-10"
            title="Закрыть интро"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 text-xs text-indigo-400 font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              AI-система активна
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              Анализ технических<br />
              <span className="text-yellow-400">заданий</span> с помощью ИИ
            </h2>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed mb-6">
              Загрузите ТЗ в формате PDF, DOCX или TXT — система автоматически выявит ошибки,
              оценит качество по 100-балльной шкале и сформирует рекомендации по улучшению.
            </p>

            {/* Capability pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: AnalyzeIcon, label: "Анализ структуры" },
                { icon: AlertCircle, label: "Выявление ошибок" },
                { icon: BarChart3, label: "Оценка качества" },
                { icon: Lightbulb, label: "Рекомендации" },
                { icon: Bot, label: "AI-ассистент" }
              ].map((cap, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/50 border border-slate-700/50 rounded-full px-3 py-1.5">
                  <cap.icon className="w-3.5 h-3.5 text-indigo-400" />
                  {cap.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upload Block */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
        <div className="absolute -left-20 -top-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-500" />
        
        <div className="relative flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            <Upload className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Проверить новое ТЗ</h3>
            <p className="text-sm text-slate-400">Загрузите документ или перетащите его сюда</p>
          </div>
        </div>
        
        <button
          onClick={onUploadClick}
          className="relative shrink-0 w-full sm:w-auto inline-flex justify-center items-center gap-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-medium text-sm rounded-xl px-8 py-3.5 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:-translate-y-0.5"
        >
          <Upload className="w-4 h-4" />
          Загрузить документ
        </button>
      </section>
    </div>
  );
}
