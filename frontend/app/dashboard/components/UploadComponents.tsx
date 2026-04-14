"use client";

import { UploadStage } from "./types";
import { useTheme } from "../../providers/ThemeProvider";

interface CheckIconProps {
  done: boolean;
  active: boolean;
  isDark?: boolean;
}

export function CheckIcon({ done, active, isDark = true }: CheckIconProps) {
  if (done)
    return (
      <svg className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (active)
    return (
      <div className={`w-4 h-4 rounded-full border-2 border-t-transparent animate-spin ${isDark ? 'border-amber-400' : 'border-indigo-600'}`} />
    );
  return <div className={`w-4 h-4 rounded-full border ${isDark ? 'border-slate-700' : 'border-slate-300'}`} />;
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
  const { isDark } = useTheme();
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Сфера науки</p>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Улучшает точность AI-анализа</p>
        </div>
        <span className={`text-[10px] rounded-full px-2 py-0.5 border ${isDark ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' : 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>
          Рекомендуется
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {visibleTypes.map((pt) => (
          <button
            key={pt.id}
            onClick={() => onSelect(pt.id === projectType ? null : pt.id)}
            className={`group relative text-left rounded-xl p-3.5 transition-all duration-150 border
              ${projectType === pt.id
                ? `${pt.color} ${pt.border} ${isDark ? '' : 'shadow-sm'}`
                : isDark ? "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60" : "bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/10 shadow-sm hover:shadow"
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
            <p className={`text-xs font-semibold leading-tight mb-0.5 ${projectType === pt.id ? pt.accent : isDark ? "text-white" : "text-slate-800"}`}>
              {pt.label}
            </p>
            <p className={`text-[10px] leading-tight ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{pt.description}</p>
          </button>
        ))}
      </div>

      {!showAllTypes && (
        <button
          onClick={onShowAllTypes}
          className={`mt-2 text-xs transition-colors w-full text-center py-2 ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Показать все типы ↓
        </button>
      )}
    </div>
  );
}
