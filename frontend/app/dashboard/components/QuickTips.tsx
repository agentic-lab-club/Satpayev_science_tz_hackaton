"use client";

import { useTheme } from "../../providers/ThemeProvider";

interface QuickTipsProps {}

export function QuickTips({}: QuickTipsProps) {
  const { isDark } = useTheme();

  const tips = [
    {
      icon: "📋",
      title: "Структурируйте разделы",
      desc: "ТЗ с чётко выделенными разделами получают на 30% более высокий балл качества.",
    },
    {
      icon: "📏",
      title: "Задайте KPI",
      desc: "Отсутствие измеримых показателей — самая распространённая причина низкого балла.",
    },
    {
      icon: "🔗",
      title: "Устраните противоречия",
      desc: "Внутренние несоответствия в требованиях значительно снижают оценку документа.",
    },
  ];

  return (
    <section className="grid sm:grid-cols-3 gap-4">
      {tips.map((tip) => (
        <div key={tip.title} className={`rounded-xl border p-4 transition-colors ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white/60 shadow-sm hover:shadow'}`}>
          <div className="text-2xl mb-2">{tip.icon}</div>
          <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{tip.title}</p>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>{tip.desc}</p>
        </div>
      ))}
    </section>
  );
}
