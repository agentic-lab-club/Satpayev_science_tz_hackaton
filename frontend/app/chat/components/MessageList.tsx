"use client";

import { useState, useEffect } from "react";
import { ChatMessage } from "../../dashboard/components/types";

// Компонент для печати текста посимвольно
const TypewriterText = ({ text, skipAnimation = false }: { text: string; skipAnimation?: boolean }) => {
  const [displayedText, setDisplayedText] = useState(skipAnimation ? text : "");

  useEffect(() => {
    if (skipAnimation) {
      setDisplayedText(text);
      return;
    }
    
    setDisplayedText(""); // сброс при новом тексте
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 15); // скорость печати, чем меньше, тем быстрее
    return () => clearInterval(interval);
  }, [text, skipAnimation]);

  return <>{displayedText}</>;
};

interface MessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  isDark?: boolean;
  isHistoryLoading?: boolean;
}

export function MessageList({ messages, isLoading, isDark = true, isHistoryLoading = false }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      <div className="space-y-8 max-w-4xl mx-auto">
        {messages.map((message, idx) => {
          // Определяем, является ли это самым последним сообщением ассистента
          const isLatestAssistantMessage =
            message.role === "assistant" && idx === messages.length - 1 && idx !== 0 && !isHistoryLoading;

          return (
            <div
              key={idx}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-2xl px-4 py-3 rounded-2xl text-sm leading-relaxed border whitespace-pre-wrap ${
                  message.role === "user"
                    ? isDark 
                      ? "bg-amber-400/20 text-amber-100 border-amber-400/20"
                      : "bg-blue-600 text-white border-blue-500/20"
                    : isDark
                      ? "bg-slate-800 text-slate-300 border-slate-700"
                      : "bg-white text-slate-700 border-slate-200 shadow-sm"
                }`}
              >
                {isLatestAssistantMessage ? (
                  <TypewriterText text={message.text} />
                ) : (
                  message.text
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className={`px-4 py-3 rounded-2xl border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-700 border-slate-200 shadow-sm'}`}>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
