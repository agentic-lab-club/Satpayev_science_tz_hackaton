"use client";

import { EXAMPLE_PROMPTS } from "../constants";

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
  visible: boolean;
}

export function ExamplePrompts({ onSelect, visible }: ExamplePromptsProps) {
  if (!visible) return null;

  const rulesPrompts = EXAMPLE_PROMPTS.filter((p) => p.category === "rules");
  const improvePrompts = EXAMPLE_PROMPTS.filter((p) => p.category === "improve");

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Rules Section */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          📖 Правила составления ТЗ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rulesPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(prompt.description)}
              className="text-left p-4 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800/60 hover:border-amber-400/30 transition-all group cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{prompt.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white group-hover:text-amber-400 transition-colors text-sm">
                    {prompt.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {prompt.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Improve Section */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          ⚡ Улучшение текущего ТЗ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {improvePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(prompt.description)}
              className="text-left p-4 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800/60 hover:border-amber-400/30 transition-all group cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{prompt.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white group-hover:text-amber-400 transition-colors text-sm">
                    {prompt.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {prompt.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-center pt-4 border-t border-slate-800">
        <p className="text-xs text-slate-500">
          Нажмите на любой пример или напишите свой вопрос ниже
        </p>
      </div>
    </div>
  );
}
