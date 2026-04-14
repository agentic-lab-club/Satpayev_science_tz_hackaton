"use client";

import { Send, Trash2 } from "lucide-react";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onClear: () => void;
  isLoading?: boolean;
}

export function ChatInput({
  input,
  onInputChange,
  onSend,
  onClear,
  isLoading,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-slate-700/30 bg-slate-900/50 p-4 hover:border-slate-700/50 transition-colors">
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Input Area */}
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Напишите ваш вопрос... (Shift+Enter для новой строки)"
            className="flex-1 bg-slate-800/70 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20 resize-none max-h-24 hover:border-slate-600 transition-colors"
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
        <div className="flex gap-2 justify-between items-center">
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-lg transition-colors border border-slate-700 hover:border-rose-400/30"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Очистить диалог
          </button>
          <p className="text-xs text-slate-500">
            {input.length}/2000
          </p>
        </div>
      </div>
    </div>
  );
}
