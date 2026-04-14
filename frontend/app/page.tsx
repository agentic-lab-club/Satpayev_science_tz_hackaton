"use client";

import Link from "next/link";
import { Zap, BarChart3, MessageSquare, Upload, Lightbulb, CheckCircle, ArrowRight, Sparkles, Code, Brain } from "lucide-react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./components/ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="w-10 h-10" />
});

export default function Home() {
  const features = [
    {
      icon: Upload,
      title: "Загрузка документов",
      description: "Загружайте технические задания в различных форматах для анализа",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Brain,
      title: "ИИ анализ",
      description: "Искусственный интеллект проанализирует качество и полноту ТЗ",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      title: "Рекомендации",
      description: "Получайте конкретные советы по улучшению документов",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: BarChart3,
      title: "Статистика",
      description: "Отслеживайте прогресс улучшения ваших ТЗ",
      gradient: "from-green-500 to-teal-500",
    },
  ];

  const steps = [
    { number: 1, title: "Загрузите ТЗ", description: "Выберите файл с техническим заданием" },
    { number: 2, title: "Анализ", description: "AI проанализирует документ за несколько секунд" },
    { number: 3, title: "Получите отчет", description: "Детальный отчет с рекомендациями" },
  ];

  const benefits = [
    "Улучшение качества документов",
    "Экономия времени на проверку",
    "Консистентность требований",
    "Минимизация конфликтов в проекте",
    "Лучшее взаимопонимание с разработчиками",
    "Профессиональный подход",
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080d14] text-slate-900 dark:text-white flex flex-col font-sans relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-50 dark:opacity-100">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-700/30 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TZ·AI
            </h1>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <Link href="/dashboard" className="hidden md:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors">
              Панель управления
            </Link>
            <Link href="/chat" className="hidden md:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-amber-400 transition-colors">
              <MessageSquare className="w-4 h-4" />
              AI-Ассистент
            </Link>
            <Link href="/login" className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-colors text-sm font-medium">
              Войти
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-400">Новая версия с AI-анализом</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Анализируйте технические задания
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                с помощью искусственного интеллекта
              </span>
            </h2>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              TZ·AI помогает создавать качественные технические задания, выявляет недостатки и предлагает улучшения автоматически
            </p>

            <div className="flex gap-4 justify-center flex-wrap pt-8">
              <Link href="/dashboard" className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-bold transition-all hover:scale-105">
                <Upload className="w-5 h-5" />
                Начать анализ
              </Link>
              <Link href="/chat" className="flex items-center gap-2 px-8 py-4 border border-slate-600 hover:border-amber-400 rounded-xl font-bold transition-all hover:bg-slate-900/50">
                <MessageSquare className="w-5 h-5" />
                Задать вопрос AI
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">Возможности платформы</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl border border-slate-700 bg-slate-800/30 hover:bg-slate-800/60 hover:border-amber-400/50 transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold mb-2 text-lg">{feature.title}</h4>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative px-6 py-20 border-y border-slate-700/30">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">Как это работает</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-slate-400">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-1 bg-gradient-to-r from-blue-500 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-8">Преимущества использования</h3>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
                    <span className="text-lg text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl p-8 border border-slate-700 flex items-center justify-center min-h-96">
              <div className="text-center space-y-4">
                <Code className="w-24 h-24 mx-auto text-blue-400 opacity-50" />
                <p className="text-slate-400">Визуализация анализа технических заданий</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20 border-t border-slate-700/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-3xl md:text-5xl font-bold">
            Готовы улучшить качество ваших ТЗ?
          </h3>
          <p className="text-xl text-slate-400">
            Присоединяйтесь к сотням специалистов, которые уже используют TZ·AI
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/registration" className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-bold transition-all hover:scale-105">
              <Sparkles className="w-5 h-5" />
              Начать бесплатно
            </Link>
            <Link href="/login" className="flex items-center justify-center gap-2 px-8 py-4 border border-slate-600 hover:border-amber-400 rounded-xl font-bold transition-all">
              Уже есть аккаунт?
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/30 bg-slate-900/40 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-blue-400" />
                <span className="font-bold">TZ·AI</span>
              </div>
              <p className="text-sm text-slate-400">Платформа для анализа технических заданий с ИИ</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/dashboard" className="hover:text-amber-400 transition">Дашборд</Link></li>
                <li><Link href="/chat" className="hover:text-amber-400 transition">AI Ассистент</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-amber-400 transition">О нас</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Лучше</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-amber-400 transition">Документация</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">API</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/30 pt-8 text-center text-sm text-slate-500">
            <p>TZ·AI © 2025 - Инструмент для анализа технических заданий с помощью искусственного интеллекта</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
