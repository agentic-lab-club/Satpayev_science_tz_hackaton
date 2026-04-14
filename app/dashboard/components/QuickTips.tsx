"use client";

interface QuickTipsProps {}

export function QuickTips({}: QuickTipsProps) {
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
        <div key={tip.title} className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
          <div className="text-2xl mb-2">{tip.icon}</div>
          <p className="text-sm font-semibold text-white mb-1">{tip.title}</p>
          <p className="text-xs text-slate-500 leading-relaxed">{tip.desc}</p>
        </div>
      ))}
    </section>
  );
}
