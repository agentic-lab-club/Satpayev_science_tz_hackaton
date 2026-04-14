"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log("Register", { name, email, password });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080d14] text-white">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2" />
      </div>

      <header className="relative z-10 border-b border-slate-700/50 bg-slate-900/30 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-xl">
              ⚡
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">
                TZ<span className="text-amber-400">·AI</span>
              </h1>
              <p className="text-[10px] text-slate-500">НТЗ LAB</p>
            </div>
          </Link>
          <div className="text-xs text-slate-400">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-amber-400 hover:text-amber-300 transition-colors font-semibold">
              Войдите
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Создать аккаунт</h2>
            <p className="text-slate-400">
              Зарегистрируйтесь, чтобы начать анализ ТЗ с помощью ИИ
            </p>
          </div>

          <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl p-8 shadow-2xl shadow-black/50">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                  Имя
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше полное имя"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                  Пароль
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-300 mb-2">
                  Подтвердите пароль
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
                  required
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input type="checkbox" required className="w-4 h-4 accent-amber-400 rounded" />
                <span className="text-slate-400">
                  Я согласен с{" "}
                  <button type="button" className="text-amber-400 hover:text-amber-300 transition-colors">
                    условиями использования
                  </button>
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-8 bg-amber-400 hover:bg-amber-300 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-900 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
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
                    <svg
                      className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center text-xs text-slate-500 space-y-2">
            <p>
              Продолжая, вы принимаете наши{" "}
              <button type="button" className="text-amber-400 hover:text-amber-300 transition-colors">
                условия использования
              </button>{" "}
              и{" "}
              <button type="button" className="text-amber-400 hover:text-amber-300 transition-colors">
                политику конфиденциальности
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-700/50 bg-slate-900/30 py-6 text-center text-xs text-slate-500">
        <p>TZ·AI © 2025 - Анализ технических заданий с помощью ИИ</p>
      </footer>
    </div>
  );
}
