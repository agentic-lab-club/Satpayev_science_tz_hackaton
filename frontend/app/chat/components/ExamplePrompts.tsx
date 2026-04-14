"use client";

import { BookOpen, CheckCircle, Target, Settings, Bug, Lightbulb, Sparkles } from "lucide-react";
import { EXAMPLE_PROMPTS } from "../constants";

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
  visible: boolean;
  isDark?: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "📋": BookOpen,
  "✅": CheckCircle,
  "🎯": Target,
  "⚙️": Settings,
  "🐛": Bug,
  "💡": Lightbulb,
};

export function ExamplePrompts({ onSelect, visible, isDark = true }: ExamplePromptsProps) {
  if (!visible) return null;

  const rulesPrompts = EXAMPLE_PROMPTS.filter((p) => p.category === "rules");
  const improvePrompts = EXAMPLE_PROMPTS.filter((p) => p.category === "improve");

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in space-y-8">
      <div className="text-center space-y-4 mb-12">
        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto shadow-lg shadow-purple-500/20 rotate-3 hover:rotate-6 transition-transform`}>
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className={`text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
          Чем я могу помочь?
        </h2>
        <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-lg mx-auto`}>
          Выберите один из примеров запроса или опишите вашу задачу своими словами
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Правила ТЗ */}
        <div className={`rounded-2xl p-5 border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <BookOpen className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Правила составления ТЗ</h3>
          </div>
          
          <div className="space-y-2">
            {rulesPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(prompt.description)}
                className={`w-full text-left p-3 rounded-xl text-sm transition-all group border ${
                  isDark 
                    ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50' 
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 hover:border-blue-400/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-base">{prompt.icon}</span>
                  <div>
                    <div className={`font-medium mb-0.5 ${isDark ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>
                      {prompt.title}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                      {prompt.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Улучшение ТЗ */}
        <div className={`rounded-2xl p-5 border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <Sparkles className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Анализ и улучшение</h3>
          </div>
          
          <div className="space-y-2">
            {improvePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(prompt.description)}
                className={`w-full text-left p-3 rounded-xl text-sm transition-all group border ${
                  isDark 
                    ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 text-slate-300 hover:text-white hover:border-purple-500/50' 
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 hover:border-purple-400/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-base">{prompt.icon}</span>
                  <div>
                    <div className={`font-medium mb-0.5 ${isDark ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>
                      {prompt.title}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                      {prompt.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
