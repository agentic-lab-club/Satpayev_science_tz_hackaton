"use client";

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  accent: string;
}

export function StatCard({ icon, value, label, accent }: StatCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-5`}>
      <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10 ${accent}`} />
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}
