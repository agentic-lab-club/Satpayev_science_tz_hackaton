"use client";

import { UploadStage } from "./types";

interface CheckIconProps {
  done: boolean;
  active: boolean;
}

export function CheckIcon({ done, active }: CheckIconProps) {
  if (done)
    return (
      <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (active)
    return (
      <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
    );
  return <div className="w-4 h-4 rounded-full border border-slate-700" />;
}

interface ProjectTypeSelectProps {
  projectType: string | null;
  onSelect: (id: string | null) => void;
  visibleTypes: any[];
  showAllTypes: boolean;
  onShowAllTypes: () => void;
}

export function ProjectTypeSelect({
  projectType,
  onSelect,
  visibleTypes,
  showAllTypes,
  onShowAllTypes,
}: ProjectTypeSelectProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-white">Тип проекта</p>
          <p className="text-xs text-slate-500 mt-0.5">Улучшает точность AI-анализа</p>
        </div>
        <span className="text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-2 py-0.5">
          Рекомендуется
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {visibleTypes.map((pt) => (
          <button
            key={pt.id}
            onClick={() => onSelect(pt.id === projectType ? null : pt.id)}
            className={`group relative text-left rounded-xl border p-3.5 transition-all duration-150
              ${projectType === pt.id
                ? `${pt.color} ${pt.border} border`
                : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
              }`}
          >
            {/* Selected checkmark */}
            {projectType === pt.id && (
              <div className="absolute top-2.5 right-2.5">
                <svg className={`w-3.5 h-3.5 ${pt.accent}`} viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            <div className="text-base mb-1.5">{pt.icon}</div>
            <p className={`text-xs font-semibold leading-tight mb-0.5 ${projectType === pt.id ? pt.accent : "text-white"}`}>
              {pt.label}
            </p>
            <p className="text-[10px] text-slate-500 leading-tight">{pt.description}</p>
          </button>
        ))}
      </div>

      {!showAllTypes && (
        <button
          onClick={onShowAllTypes}
          className="mt-2 text-xs text-slate-500 hover:text-slate-300 transition-colors w-full text-center py-2"
        >
          Показать все типы ↓
        </button>
      )}
    </div>
  );
}
