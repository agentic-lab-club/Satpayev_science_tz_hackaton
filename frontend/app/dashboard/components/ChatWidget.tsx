"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChatMessage } from "./types";
import { mockChatHistory } from "./constants";
import { Bot, Send, X, ExternalLink, Sparkles } from "lucide-react";
import { useTheme } from "../../providers/ThemeProvider";

interface ChatWidgetProps {
  onClose: () => void;
}

export function ChatWidget({ onClose }: ChatWidgetProps) {
  const { isDark } = useTheme();
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
    <div className={`fixed bottom-24 right-6 z-50 w-[340px] rounded-2xl border backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-right ${isDark ? 'border-slate-700/60 bg-slate-900/95 shadow-indigo-900/20' : 'border-slate-200 bg-white/95 shadow-indigo-500/10'}`} style={{ maxHeight: "500px" }}>
      {/* Glow effect */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-400/20'}`} />

      {/* Header */}
      <div className={`relative flex items-center justify-between px-4 py-3 border-b backdrop-blur-sm ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50/60 border-slate-200/80'}`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 rounded-full ${isDark ? 'border-slate-900' : 'border-white'}`} />
          </div>
          <div>
            <h3 className={`text-sm font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              AI-Ассистент
              <Sparkles className="w-3 h-3 text-amber-400" />
            </h3>
            <p className={`text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Всегда готов помочь</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/chat" className={`p-1.5 rounded-md transition-colors ${isDark ? 'text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10' : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-500/10'}`} title="Открыть полный чат">
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button onClick={onClose} className={`p-1.5 rounded-md transition-colors ${isDark ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-400/10' : 'text-slate-500 hover:text-rose-600 hover:bg-rose-500/10'}`}>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-transparent relative z-10 ${isDark ? 'scrollbar-thumb-slate-700' : 'scrollbar-thumb-slate-300'}`} style={{ minHeight: "260px", maxHeight: "320px" }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`relative max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
              m.role === "user"
                ? "bg-indigo-600 text-white rounded-br-sm"
                : isDark ? "bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-bl-sm" : "bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-sm"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`p-3 border-t backdrop-blur-md relative z-10 ${isDark ? 'bg-slate-900/80 border-slate-700/60' : 'bg-white/80 border-slate-200/80'}`}>
        <div className={`flex items-end gap-2 border rounded-xl p-1 focus-within:ring-1 transition-all ${isDark ? 'bg-slate-950/50 border-slate-700/60 focus-within:border-indigo-500/50 focus-within:ring-indigo-500/50' : 'bg-slate-50/50 border-slate-300 focus-within:border-indigo-400/50 focus-within:ring-indigo-400/50 focus-within:bg-white'}`}>
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
            className={`flex-1 max-h-32 min-h-[40px] bg-transparent text-[13px] px-3 py-2.5 resize-none focus:outline-none scrollbar-thin ${isDark ? 'text-slate-200 placeholder-slate-500 scrollbar-thumb-slate-700' : 'text-slate-900 placeholder-slate-400 scrollbar-thumb-slate-300'}`}
            rows={1}
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className={`shrink-0 mb-1 mr-1 w-8 h-8 flex items-center justify-center rounded-lg text-white transition-colors ${isDark ? 'bg-indigo-500 hover:bg-indigo-400 disabled:bg-slate-800 disabled:text-slate-500' : 'bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 disabled:text-slate-400'}`}
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
        <p className={`text-center text-[10px] mt-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          AI может ошибаться. Проверяйте важную информацию.
        </p>
      </div>
    </div>
  );
}
