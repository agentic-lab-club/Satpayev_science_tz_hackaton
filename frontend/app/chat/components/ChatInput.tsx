"use client";

import { Send, Trash2 } from "lucide-react";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onClear: () => void;
  isLoading?: boolean;
  isDark?: boolean;
}

export function ChatInput({
  input,
  onInputChange,
  onSend,
  onClear,
  isLoading,
  isDark = true,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div
      className={`border-t transition-colors p-4 ${
        isDark
          ? "border-slate-700/30 bg-slate-900/50 hover:border-slate-700/50"
          : "border-slate-200/30 bg-white/50 hover:border-slate-300/50"
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Input Area */}
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Напишите ваш вопрос... (Shift+Enter для новой строки)"
            className={`flex-1 text-sm rounded-xl px-4 py-3 border focus:outline-none focus:ring-1 resize-none max-h-11 transition-colors ${
              isDark
                ? "bg-slate-800/70 text-white placeholder-slate-500 border-slate-700 focus:border-purple-400/50 focus:ring-purple-400/20 hover:border-slate-600"
                : "bg-slate-100 text-slate-900 placeholder-slate-500 border-slate-300 focus:border-purple-500/50 focus:ring-purple-500/20 hover:border-slate-400"
            }`}
            rows={3}
            disabled={isLoading}
          />
          <button
            onClick={onSend}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-xl px-4 py-3 font-bold transition-all flex items-center justify-center h-fit shadow-lg shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/40"
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 text-center justify-center items-center">
          <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>
            ИИ чатбот может допускать ошибки. Рекомендуем проверять важную информацию
          </p>
        </div>
      </div>
    </div>
  );
}
