"use client";

import { BookOpen, CheckCircle, Target, Settings, Bug, Lightbulb } from "lucide-react";
import { EXAMPLE_PROMPTS } from "../constants";

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
  visible: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "📋": BookOpen,
  "✅": CheckCircle,
  "🎯": Target,
  "⚙️": Settings,
  "🐛": Bug,
  "💡": Lightbulb,
};

export function ExamplePrompts({ onSelect, visible }: ExamplePromptsProps) {
  if (!visible) return null;

  const rulesPrompts = EXAMPLE_PROMPTS.filter((p) => p.category === "rules");
  const improvePrompts = EXAMPLE_PROMPTS.filter((p) => p.category === "improve");

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Rules Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Правила составления ТЗ
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rulesPrompts.map((prompt, idx) => {
            const Icon = iconMap[prompt.icon] || BookOpen;
            return (
              <button
                key={idx}
                onClick={() => onSelect(prompt.description)}
                className="text-left p-4 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800/60 hover:border-blue-400/50 transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white group-hover:text-blue-400 transition-colors text-sm">
                      {prompt.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {prompt.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Improve Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Улучшение текущего ТЗ
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {improvePrompts.map((prompt, idx) => {
            const Icon = iconMap[prompt.icon] || Lightbulb;
            return (
              <button
                key={idx}
                onClick={() => onSelect(prompt.description)}
                className="text-left p-4 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800/60 hover:border-amber-400/50 transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/30 transition-colors">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
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
            );
          })}
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
