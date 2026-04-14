"use client";

import { useState } from "react";
import { AnalysisStatus } from "./components/types";
import { mockDocuments } from "./components/constants";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatCard } from "./components/StatCard";
import { DocumentList } from "./components/DocumentList";
import { QuickTips } from "./components/QuickTips";
import { ChatWidget } from "./components/ChatWidget";
import { UploadModal } from "./components/UploadModal";

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

  return (
    <div className="min-h-screen bg-[#080d14] text-white font-sans">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* ── Header & Hero ── */}
        <DashboardHeader onUploadClick={() => setUploadModalOpen(true)} />

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon="📄" value={String(mockDocuments.length)} label="Всего документов" accent="bg-blue-400" />
          <StatCard icon="✅" value={String(completed.length)} label="Проанализировано" accent="bg-emerald-400" />
          <StatCard icon="🎯" value={`${avgScore}/100`} label="Средний балл" accent="bg-amber-400" />
          <StatCard icon="⚠️" value={String(mockDocuments.reduce((s, d) => s + (d.issuesFound ?? 0), 0))} label="Найдено проблем" accent="bg-rose-400" />
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 shadow-xl shadow-amber-400/30 flex items-center justify-center transition-all duration-150"
        aria-label="Открыть AI-ассистент"
      >
        {chatOpen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Notification dot on chat button */}
      {!chatOpen && (
        <span className="fixed bottom-[62px] right-5 z-50 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#080d14]" />
      )}
    </div>
  );
}

