"use client";

import { useState } from "react";
import Link from "next/link";
import { ChatMessage } from "./types";
import { mockChatHistory } from "./constants";

interface ChatWidgetProps {
  onClose: () => void;
}

export function ChatWidget({ onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: "user", text: input };
    const botMsg: ChatMessage = {
      role: "assistant",
      text: "Анализирую ваш запрос... Могу помочь улучшить структуру раздела «Цель разработки» или проверить полноту требований. Уточните, какой документ или раздел вас интересует?",
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/60 flex flex-col overflow-hidden"
      style={{ maxHeight: "460px" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-sm">AS</div>
          <div>
            <p className="text-sm font-semibold text-white">AI-Ассистент</p>
            <p className="text-[10px] text-emerald-400">● онлайн</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Link href="/chat" className="text-slate-500 hover:text-amber-400 transition-colors text-lg" title="Открыть полный чат">
            ↗
          </Link>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-lg leading-none">×</button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ minHeight: "220px", maxHeight: "280px" }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
              m.role === "user"
                ? "bg-amber-400/20 text-amber-100 border border-amber-400/20"
                : "bg-slate-800 text-slate-300 border border-slate-700"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      {/* Input */}
      <div className="p-3 border-t border-slate-700 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Задайте вопрос..."
          className="flex-1 bg-slate-800 text-white placeholder-slate-500 text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-400/50"
        />
        <button
          onClick={send}
          className="bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-lg px-3 py-2 text-xs font-bold transition-colors"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
