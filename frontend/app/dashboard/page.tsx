"use client";

import { useState } from "react";
import { FileText, CheckCircle, Target, AlertTriangle, MessageCircle, X } from "lucide-react";
import { AnalysisStatus } from "./components/types";
import { mockDocuments } from "./components/constants";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatCard } from "./components/StatCard";
import { DocumentList } from "./components/DocumentList";
import { QuickTips } from "./components/QuickTips";
import { ChatWidget } from "./components/ChatWidget";
import { UploadModal } from "./components/UploadModal";
import { useTheme } from "../providers/ThemeProvider";

export default function Dashboard() {
  const [chatOpen, setChatOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<AnalysisStatus | "all">("all");
  const [search, setSearch] = useState("");

  const completed = mockDocuments.filter((d) => d.status === "completed");
  const avgScore = Math.round(
    completed.reduce((s, d) => s + (d.score ?? 0), 0) / completed.length
  );

  const filtered = mockDocuments.filter((d) => {
    const matchStatus = filterStatus === "all" || d.status === filterStatus;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const { isDark } = useTheme();

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
          <StatCard icon={FileText} value={String(mockDocuments.length)} label="Всего документов" accent="bg-blue-400" />
          <StatCard icon={CheckCircle} value={String(completed.length)} label="Проанализировано" accent="bg-emerald-400" />
          <StatCard icon={Target} value={`${avgScore}/100`} label="Средний балл" accent="bg-amber-400" />
          <StatCard icon={AlertTriangle} value={String(mockDocuments.reduce((s, d) => s + (d.issuesFound ?? 0), 0))} label="Найдено проблем" accent="bg-rose-400" />
        </div>

        {/* ── Document History ── */}
        <DocumentList
          documents={filtered}
          onSearch={setSearch}
          onFilterStatus={setFilterStatus}
          search={search}
          filterStatus={filterStatus}
        />

        {/* ── Quick Tips ── */}
        <QuickTips />

      </div>

      {/* ── Floating Chat Button ── */}
      {chatOpen && <ChatWidget onClose={() => setChatOpen(false)} />}

      {/* ── Upload Modal ── */}
      <UploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />

      <button
        onClick={() => setChatOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-95 text-white shadow-xl shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center transition-all duration-150"
        aria-label="Открыть AI-ассистент"
      >
        {chatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Notification dot on chat button */}
      {!chatOpen && (
        <span className={`fixed bottom-[62px] right-5 z-50 w-3 h-3 rounded-full bg-emerald-400 border-2 animate-pulse transition-colors duration-300 ${isDark ? 'border-[#080d14]' : 'border-slate-50'}`} />
      )}
    </div>
  );
}

