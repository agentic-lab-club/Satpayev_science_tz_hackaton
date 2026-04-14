"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Bot } from "lucide-react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("../components/ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="w-10 h-10" />
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Имитация загрузки и редирект (или логика авторизации)
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/chat";
    }, 1000);
  };

  // Локальное управление темой для совпадения со стилем /chat
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080d14] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Декоративные фоновые элементы (похоже на /chat) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/5'} rounded-full blur-[100px] -translate-y-1/2`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] ${isDark ? 'bg-purple-500/10' : 'bg-purple-500/5'} rounded-full blur-[100px] translate-y-1/2`} />
      </div>

      {/* Header, стилизованный как в /chat */}
      <div className={`backdrop-blur-xl sticky top-0 z-40 border-b transition-all duration-300 ${isDark ? 'border-slate-800/80 bg-[#080d14]/80 shadow-lg shadow-black/20' : 'border-slate-200 bg-white/80 shadow-sm'}`}>
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-lg shadow-purple-500/30">
                  <div className={`w-full h-full rounded-[14px] flex items-center justify-center transition-transform hover:scale-105 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                    <Bot className={`w-6 h-6 ${isDark ? 'text-white' : 'text-indigo-600'}`} />
                  </div>
                </div>
              </div>
              
              <div>
                <h1 className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  AI-Ассистент
                </h1>
                <p className={`text-xs font-medium flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span className="text-emerald-500">Вход в систему</span>
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/registration" className={`px-4 h-10 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 border shadow-sm ${
                isDark
                  ? "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700"
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
              }`}>
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="mx-auto w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-xl">
               <div className={`w-full h-full rounded-[21px] flex items-center justify-center relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                 <Lock className={`w-10 h-10 ${isDark ? 'text-white' : 'text-indigo-600'}`} />
               </div>
            </div>
            <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              С возвращением!
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Авторизуйтесь, чтобы продолжить работу с AI-помощником
            </p>
          </div>

          <div className={`backdrop-blur-xl border rounded-2xl p-6 sm:p-8 shadow-2xl transition-colors duration-300 ${
            isDark 
              ? 'bg-slate-900/50 border-slate-800 shadow-black/50' 
              : 'bg-white/80 border-slate-200 shadow-slate-200/50'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Mail className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
                  Электронная почта
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
                    isDark 
                      ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/20' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:ring-indigo-400/20'
                  }`}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Lock className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
                  Пароль
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 pr-10 ${
                      isDark 
                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500/50 focus:ring-purple-500/20' 
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                      isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs mt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-500 rounded border-slate-300" />
                  <span className={`transition-colors ${isDark ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 group-hover:text-slate-700'}`}>
                    Запомнить меня
                  </span>
                </label>
                <button type="button" className={`font-medium transition-colors hover:underline ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
                  Забыли пароль?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
              >
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Обработка...
                  </>
                ) : (
                  <>
                    Войти
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
              <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>или</span>
              <div className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button 
                type="button"
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm font-semibold border ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 hover:border-slate-600 text-white' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800 shadow-sm'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button 
                type="button"
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm font-semibold border ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 hover:border-slate-600 text-white' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800 shadow-sm'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-slate-500 space-y-2">
            <p>
              Продолжая, вы принимаете наши{" "}
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                условия использования
              </button>{" "}
              и{" "}
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                политику конфиденциальности
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-700/30 bg-slate-900/30 py-6 text-center text-xs text-slate-500">
        <p>TZ·AI © 2025 - Анализ технических заданий с помощью ИИ</p>
      </footer>
    </div>
  );
}
