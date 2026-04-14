"use client";

import { LucideIcon } from "lucide-react";
import { useTheme } from "../../providers/ThemeProvider";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  accent: string;
}

export function StatCard({ icon: Icon, value, label, accent }: StatCardProps) {
  const { isDark } = useTheme();

  return (
    <div className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm p-5 transition-colors ${isDark ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700' : 'border-slate-200 bg-white/80 hover:border-slate-300 shadow-sm hover:shadow'}`}>
      <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full ${accent} ${isDark ? 'opacity-10' : 'opacity-5'}`} />
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${accent} ${accent === 'bg-blue-400' ? 'to-blue-600' : accent === 'bg-emerald-400' ? 'to-emerald-600' : accent === 'bg-amber-400' ? 'to-amber-600' : 'to-rose-600'} p-2 mb-3 flex items-center justify-center shadow-sm`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>{value}</div>
      <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{label}</div>
    </div>
  );
}
