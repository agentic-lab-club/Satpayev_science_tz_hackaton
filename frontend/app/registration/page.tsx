"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Bot } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "../providers/ThemeProvider";

const ThemeToggle = dynamic(() => import("../components/ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="w-10 h-10" />
});

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    if (password.length < 8) {
      alert("Пароль должен содержать минимум 8 символов");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Ошибка регистрации");
      }

      window.location.href = `/auth/verify-email?email=${encodeURIComponent(email)}`;
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Не удалось зарегистрироваться. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080d14] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/5'} rounded-full blur-[100px] -translate-y-1/2`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] ${isDark ? 'bg-purple-500/10' : 'bg-purple-500/5'} rounded-full blur-[100px] translate-y-1/2`} />
      </div>

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
                  <span className="text-emerald-500">Регистрация</span>
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/login" className={`px-4 h-10 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 border shadow-sm ${
                  isDark
                  ? "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700"
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                }`}>
                Войти
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="mx-auto w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-xl">
              <div className={`w-full h-full rounded-[21px] flex items-center justify-center relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                <User className={`w-10 h-10 ${isDark ? 'text-white' : 'text-indigo-600'}`} />
              </div>
            </div>
            <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Создать аккаунт
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Зарегистрируйтесь, чтобы начать работу с AI-помощником
            </p>
          </div>

          <div className={`backdrop-blur-xl border rounded-2xl p-6 sm:p-8 shadow-2xl transition-colors duration-300 ${
              isDark 
              ? 'bg-slate-900/50 border-slate-800 shadow-black/50' 
              : 'bg-white/80 border-slate-200 shadow-slate-200/50'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <User className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
                  Имя
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className={`w-full px-4 py-3 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
                      isDark 
                      ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/20' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:ring-indigo-400/20'
                  }`}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Mail className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
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
                      ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20'
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

              <div>
                <label htmlFor="confirmPassword" className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <CheckCircle className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`} />
                  Подтвердите пароль
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 pr-10 ${
                        isDark 
                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/20' 
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                           isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs mt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" required className="w-4 h-4 accent-indigo-500 rounded border-slate-300" />
                  <span className={`transition-colors ${isDark ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 group-hover:text-slate-700'}`}>
                    Я согласен с{" "}
                    <button type="button" className={`font-medium transition-colors hover:underline ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
                      условиями
                    </button>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
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
                    Зарегистрироваться
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      </main>

      <footer className={`relative z-10 border-t py-6 text-center text-xs transition-colors duration-300 ${isDark ? 'border-slate-700/30 bg-slate-900/30 text-slate-500' : 'border-slate-200 bg-slate-100/50 text-slate-500'}`}>
        <p>TZ·AI © 2026 - Анализ технических заданий с помощью ИИ</p>
      </footer>
    </div>
  );
}
