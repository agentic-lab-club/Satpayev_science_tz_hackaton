"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  accent: string;
}

export function StatCard({ icon: Icon, value, label, accent }: StatCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-5 hover:border-slate-700 transition-colors`}>
      <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10 ${accent}`} />
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${accent} ${accent === 'bg-blue-400' ? 'to-blue-600' : accent === 'bg-emerald-400' ? 'to-emerald-600' : accent === 'bg-amber-400' ? 'to-amber-600' : 'to-rose-600'} p-2 mb-3 flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}
