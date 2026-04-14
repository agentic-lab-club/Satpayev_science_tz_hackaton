"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChatMessage } from "./types";
import { mockChatHistory } from "./constants";
import { Bot, Send, X, ExternalLink, Sparkles } from "lucide-react";

interface ChatWidgetProps {
  onClose: () => void;
}

export function ChatWidget({ onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: "user", text: input };
    const botMsg: ChatMessage = {
      role: "assistant",
      text: "Анализирую ваш запрос... Могу помочь улучшить структуру раздела «Цель разработки» или проверить полноту требований. Уточните, какой документ или раздел вас интересует?",
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    
    // Simulate thinking delay
    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[340px] rounded-2xl border border-slate-700/60 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-indigo-900/20 flex flex-col overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-right"
      style={{ maxHeight: "500px" }}>
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Header */}
      <div className="relative flex items-center justify-between px-4 py-3 bg-slate-800/40 border-b border-slate-700/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              AI-Ассистент
              <Sparkles className="w-3 h-3 text-amber-400" />
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Всегда готов помочь</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/chat" className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-md transition-colors" title="Открыть полный чат">
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-md transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent relative z-10" style={{ minHeight: "260px", maxHeight: "320px" }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`relative max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
              m.role === "user"
                ? "bg-indigo-600 text-white rounded-br-sm"
                : "bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-bl-sm"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-slate-900/80 border-t border-slate-700/60 backdrop-blur-md relative z-10">
        <div className="flex items-end gap-2 bg-slate-950/50 border border-slate-700/60 rounded-xl p-1 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Спросите AI-Ассистента..."
            className="flex-1 max-h-32 min-h-[40px] bg-transparent text-slate-200 placeholder-slate-500 text-[13px] px-3 py-2.5 resize-none focus:outline-none scrollbar-thin scrollbar-thumb-slate-700"
            rows={1}
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="shrink-0 mb-1 mr-1 w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-400 disabled:bg-slate-800 disabled:text-slate-500 text-white transition-colors"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-500 mt-2">
          AI может ошибаться. Проверяйте важную информацию.
        </p>
      </div>
    </div>
  );
}
