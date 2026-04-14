"use client";

import { Bot } from "lucide-react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("../../components/ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="w-10 h-10" />
});

interface ChatHeaderProps {
  messageCount: number;
  isLoading?: boolean;
}

export function ChatHeader({ messageCount, isLoading }: ChatHeaderProps) {
  return (
    <div className="dark:border-slate-700/30 dark:bg-slate-900/50 light:border-slate-200/30 light:bg-white/50 backdrop-blur-md sticky top-0 z-40 dark:hover:border-slate-700/50 light:hover:border-slate-300/50 transition-colors border">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold dark:text-white light:text-slate-900">AI-Ассистент</h1>
                <p className="text-xs dark:text-slate-400 light:text-slate-600">
                  {isLoading ? (
                    <span className="text-cyan-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      Обработка запроса...
                    </span>
                  ) : (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      онлайн
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs dark:text-slate-500 light:text-slate-600">
              {messageCount} {messageCount === 1 ? "сообщение" : "сообщений"}
            </p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
