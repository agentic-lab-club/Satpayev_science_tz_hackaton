"use client";

import { ChatMessage } from "../../dashboard/components/types";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((message, idx) => (
        <div
          key={idx}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
        >
          <div
            className={`max-w-2xl px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              message.role === "user"
                ? "bg-amber-400/20 text-amber-100 border border-amber-400/20"
                : "bg-slate-800 text-slate-300 border border-slate-700"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-slate-800 text-slate-300 border border-slate-700 px-4 py-3 rounded-2xl">
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
  );
}
