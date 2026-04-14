"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, MessageSquare, Upload, Zap as AnalyzeIcon, AlertCircle, BarChart3, Lightbulb, Bot, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "../../providers/ThemeProvider";

const ThemeToggle = dynamic(() => import("../../components/ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="w-10 h-10" />
});

interface HeaderProps {
  onUploadClick: () => void;
}

export function DashboardHeader({ onUploadClick }: HeaderProps) {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const { isDark } = useTheme();

  return (
    <div className="space-y-6">
      {/* Top Nav */}
      <header className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${isDark ? 'bg-slate-900/40 border-slate-700/30' : 'bg-white/60 border-slate-200/80 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg shadow-sm">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-sm font-bold tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>TZ<span className={isDark ? "text-amber-400" : "text-amber-500"}>·AI</span></h1>
            <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>НТЗ LAB Hackathon</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/chat" className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border transition-colors ${isDark ? 'border-slate-700 hover:border-amber-400/30 text-slate-400 hover:text-amber-400' : 'border-slate-300 hover:border-blue-400/30 text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50/50'}`}>
            <MessageSquare className="w-3 h-3" />
            Ассистент
          </Link>
          <div className={`hidden sm:flex items-center gap-2 border rounded-full px-3 py-1.5 transition-colors ${isDark ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'}`}>
            <div className={`w-6 h-6 rounded-full border text-xs flex items-center justify-center font-bold ${isDark ? 'bg-indigo-400/20 border-indigo-400/30 text-indigo-300' : 'bg-indigo-100 border-indigo-200 text-indigo-700'}`}>А</div>
            <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Алимбеков Д.</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero / Welcome Banner */}
      {isBannerVisible && (
        <section className={`relative rounded-3xl border backdrop-blur-sm overflow-hidden p-8 transition-colors ${isDark ? 'border-indigo-500/20 bg-gradient-to-br from-indigo-900/40 via-slate-900/40 to-slate-900/40' : 'border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-white shadow-sm'}`}>
          <button 
            onClick={() => setIsBannerVisible(false)}
            className={`absolute top-4 right-4 rounded-full p-1.5 transition-colors z-10 ${isDark ? 'text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50' : 'text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'}`}
            title="Закрыть интро"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none transition-colors ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-400/15'}`} />
          <div className="relative">
            <div className={`inline-flex items-center gap-2 border rounded-full px-3 py-1 text-xs font-medium mb-4 ${isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-100 border-indigo-200 text-indigo-700'}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
              AI-система активна
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Анализ технических<br />
              <span className={isDark ? "text-yellow-400" : "text-amber-500"}>заданий</span> с помощью ИИ
            </h2>
            <p className={`text-sm max-w-lg leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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
                <div key={i} className={`flex items-center gap-1.5 text-xs border rounded-full px-3 py-1.5 ${isDark ? 'text-slate-400 bg-slate-800/50 border-slate-700/50' : 'text-slate-600 bg-white border-slate-200 shadow-sm'}`}>
                  <cap.icon className={`w-3.5 h-3.5 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
                  {cap.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upload Block */}
      <section className={`flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl border rounded-2xl p-6 shadow-xl relative overflow-hidden group transition-colors ${isDark ? 'bg-slate-900/40 border-slate-800/60' : 'bg-white/60 border-slate-200/80'}`}>
        <div className={`absolute -left-20 -top-20 w-40 h-40 rounded-full blur-[50px] pointer-events-none transition-colors duration-500 ${isDark ? 'bg-indigo-500/10 group-hover:bg-indigo-500/20' : 'bg-indigo-400/20 group-hover:bg-indigo-400/30'}`} />
        
        <div className="relative flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 ${isDark ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'}`}>
            <Upload className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
          </div>
          <div>
            <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>Проверить новое ТЗ</h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Загрузите документ или перетащите его сюда</p>
          </div>
        </div>
        
        <button
          onClick={onUploadClick}
          className={`relative shrink-0 w-full sm:w-auto inline-flex justify-center items-center gap-2.5 text-white font-medium text-sm rounded-xl px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5 ${isDark ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md hover:shadow-lg shadow-indigo-600/20'}`}
        >
          <Upload className="w-4 h-4" />
          Загрузить документ
        </button>
      </section>
    </div>
  );
}
