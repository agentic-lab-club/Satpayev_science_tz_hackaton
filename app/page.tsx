import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080d14] text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/30 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⚡</div>
            <h1 className="text-xl font-bold">TZ·AI</h1>
          </div>
          <nav className="flex gap-6">
            <Link href="/dashboard" className="text-sm hover:text-amber-400 transition-colors">
              📊 Дашборд
            </Link>
            <Link href="/chat" className="text-sm hover:text-amber-400 transition-colors">
              💬 Чат
            </Link>
            <Link href="/login" className="text-sm hover:text-amber-400 transition-colors">
              🔐 Вход
            </Link>
            <Link href="/registration" className="text-sm hover:text-amber-400 transition-colors">
              ✍️ Регистрация
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl text-center space-y-8">
          {/* Hero */}
          <div className="space-y-4">
            <div className="flex justify-center text-6xl mb-4">🤖</div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Анализ технических заданий с помощью ИИ
            </h2>
            <p className="text-xl text-slate-400">
              TZ·AI помогает улучшить качество ваших технических заданий с помощью искусственного интеллекта
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-4 pt-8">
            <div className="p-6 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800/60 transition-colors">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-2">Дашборд</h3>
              <p className="text-sm text-slate-400 mb-4">
                Загружайте и анализируйте ваши ТЗ, просматривайте историю анализов и статистику
              </p>
              <Link href="/dashboard" className="inline-block px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-lg font-semibold text-sm transition-colors">
                Перейти →
              </Link>
            </div>

            <div className="p-6 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800/60 transition-colors">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold mb-2">AI-Ассистент</h3>
              <p className="text-sm text-slate-400 mb-4">
                Задавайте вопросы о правилах составления ТЗ и получайте подробные рекомендации
              </p>
              <Link href="/chat" className="inline-block px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-lg font-semibold text-sm transition-colors">
                Перейти →
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8 flex gap-4 justify-center flex-wrap">
            <Link href="/login" className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-lg font-bold transition-colors">
              🔐 Войти
            </Link>
            <Link href="/registration" className="px-8 py-3 border border-amber-400 hover:border-amber-300 hover:text-amber-400 rounded-lg font-bold transition-colors">
              ✍️ Регистрация
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/30 py-6 text-center text-sm text-slate-500">
        <p>TZ·AI © 2025 - Инструмент для анализа технических заданий</p>
      </footer>
    </div>
  );
}
