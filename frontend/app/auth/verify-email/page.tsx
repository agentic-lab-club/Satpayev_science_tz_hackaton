"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Zap, Mail, ArrowRight, Bot } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "../../providers/ThemeProvider";

const ThemeToggle = dynamic(() => import("../../components/ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="w-10 h-10" />
});

function VerifyEmailContent() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const [email, setEmail] = useState(emailParam);

  const { isDark } = useTheme();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/backend/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        throw new Error("Неверный код");
      }

      alert("Email успешно подтвержден!");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Неверный код подтверждения. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const response = await fetch(`/api/backend/auth/resend-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке");
      }
      alert("Новый код отправлен на вашу почту");
    } catch (error) {
      console.error(error);
      alert("Не удалось отправить код повторно");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080d14] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Декоративные фоновые элементы */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/5'} rounded-full blur-[100px] -translate-y-1/2`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] ${isDark ? 'bg-purple-500/10' : 'bg-purple-500/5'} rounded-full blur-[100px] translate-y-1/2`} />
      </div>

      {/* Header */}
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
                  <span className="text-emerald-500">Подтверждение Email</span>
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <ThemeToggle />
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
                 <Mail className={`w-10 h-10 ${isDark ? 'text-white' : 'text-indigo-600'}`} />
               </div>
            </div>
            <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Подтверждение Email
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              На ваш почтовый ящик отправлен код. Введите его ниже.
            </p>
          </div>

          <div className={`backdrop-blur-xl border rounded-2xl p-6 sm:p-8 shadow-2xl transition-colors duration-300 ${
            isDark 
              ? 'bg-slate-900/50 border-slate-800 shadow-black/50' 
              : 'bg-white/80 border-slate-200 shadow-slate-200/50'
          }`}>
            <form onSubmit={handleVerify} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className={`block text-xs font-medium ml-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Код подтверждения
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${
                    isDark ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-500'
                  }`}>
                    <Zap className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`block w-full pl-11 pr-4 py-3.5 border rounded-xl focus:ring-2 focus:ring-offset-0 focus:outline-none transition-all duration-300 ${
                      isDark 
                        ? 'bg-[#0a0f18] border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 text-white placeholder-slate-600' 
                        : 'bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 text-slate-900 placeholder-slate-400'
                    }`}
                    placeholder="Введите 6-значный код"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/25 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5 mt-8 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                } ${isDark ? 'focus:ring-offset-[#080d14]' : ''}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Подтвердить
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className={`mt-8 pt-6 border-t text-center space-y-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Не получили код?{" "}
                <button 
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className={`font-medium hover:underline transition-colors ${
                    isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'
                  }`}
                >
                  {isResending ? "Отправляем..." : "Отправить повторно"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
