"use client";

import { useEffect, useRef, useState } from "react";
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

  const carouselItems = [
    {
      title: "Анализ структуры",
      desc: "ИИ проверяет документ на наличие всех необходимых разделов ГОСТ 34",
      icon: <BarChart3 className="w-12 h-12 text-indigo-400" />
    },
    {
      title: "Выявление конфликтов",
      desc: "Система находит логические нестыковки в требованиях",
      icon: <Brain className="w-12 h-12 text-purple-400" />
    },
    {
      title: "Умные рекомендации",
      desc: "Автоматическая генерация текста для недостающих пунктов",
      icon: <Lightbulb className="w-12 h-12 text-amber-400" />
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const [isMounted, setIsMounted] = useState(false);
  const featureScrollRef = useRef<HTMLElement>(null);
  const [featureProgress, setFeatureProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      if (!featureScrollRef.current) return;
      const rect = featureScrollRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      setFeatureProgress(p);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background animated elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] -left-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] -right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              TZ<span className="text-indigo-400">·AI</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
              <BarChart3 className="w-4 h-4" /> Дашборд
            </Link>
            <Link href="/chat" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
              <MessageSquare className="w-4 h-4" /> AI-Ассистент
            </Link>
            <div className="w-px h-6 bg-slate-800" />
            <ThemeToggle />
            <Link href="/login" className="px-5 py-2.5 rounded-xl font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all">
              Вход
            </Link>
          </nav>
          {/* Mobile menu button placeholder */}
          <button className="md:hidden p-2 text-slate-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-8 backdrop-blur-sm transition-all duration-1000 ease-out transform ${isMounted ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-12 opacity-0 scale-90'}`}>
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-sm font-medium text-indigo-300">Платформа анализа ТЗ на базе ИИ</span>
          </div>

          <h2 className={`text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 transition-all duration-1000 ease-out delay-[200ms] transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            Забудьте о неточных<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400">
              технических заданиях
            </span>
          </h2>

          <p className={`text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-medium transition-all duration-1000 ease-out delay-[400ms] transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            Нейросетевая система, которая автоматически проверяет структуру, находит конфликты в требованиях и оценивает качество вашего ТЗ за секунды.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ease-out delay-[600ms] transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-2xl font-bold transition-all hover:scale-105 shadow-xl shadow-indigo-500/25">
              <Upload className="w-5 h-5" />
              Загрузить документ
            </Link>
            <Link href="/chat" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 border border-slate-700 hover:border-indigo-400 hover:bg-slate-800 text-slate-200 rounded-2xl font-bold transition-all group">
              <MessageSquare className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              Задать вопрос ИИ
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
            </Link>
          </div>
          
          {/* Dashboard Preview Mockup */}
          <div className={`mt-20 relative mx-auto max-w-4xl transition-all duration-1000 ease-out delay-[800ms] transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-2 shadow-[0_0_50px_-12px_rgba(99,102,241,0.25)] relative overflow-hidden backdrop-blur-sm group hover:shadow-[0_0_80px_-12px_rgba(99,102,241,0.4)] transition-shadow duration-500">
              <div className="h-6 flex items-center gap-1.5 px-3 border-b border-slate-800/80 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="aspect-[16/9] md:aspect-[21/9] bg-slate-950/50 rounded-lg flex items-center justify-center border border-slate-800/50 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
                <div className="flex flex-col items-center gap-4 border border-indigo-500/20 bg-indigo-500/5 p-8 rounded-2xl">
                   <div className="relative">
                     <svg className="w-16 h-16 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                     </svg>
                     <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-slate-900">85/100</div>
                   </div>
                   <p className="font-medium text-slate-300 text-lg">Проект "E-commerce App.pdf"</p>
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                     <span className="text-sm text-emerald-400 font-medium">Анализ успешно завершен</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-screen Scroll Slideshow (Features) */}
      <section ref={featureScrollRef} className="relative h-[400vh] bg-slate-950 border-y border-slate-800/80">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
          
          {/* Dynamic Background Glow */}
          {(() => {
            const activeFeatureIdx = Math.min(features.length - 1, Math.floor(featureProgress * features.length));
            const colors = ['#3b82f6', '#a855f7', '#eab308', '#10b981'];
            
            return (
              <>
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full blur-[120px] opacity-20 transition-colors duration-700 pointer-events-none" 
                  style={{ backgroundColor: colors[activeFeatureIdx] }}
                />

                <div className="max-w-6xl w-full mx-auto relative z-10">
                  <div className="text-center mb-10 md:mb-16">
                    <h3 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Интеллектуальные возможности</h3>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                      Скролльте вниз, чтобы изучить все инструменты платформы
                    </p>
                  </div>

                  {/* Slides */}
                  <div className="relative h-[400px] md:h-[450px] w-full perspective-1000">
                    {features.map((feature, idx) => {
                      const Icon = feature.icon;
                      const isActive = idx === activeFeatureIdx;
                      const isPassed = idx < activeFeatureIdx;
                      
                      return (
                        <div 
                          key={idx} 
                          className={`absolute inset-0 transition-all duration-[800ms] cubic-bezier(0.23,1,0.32,1) flex flex-col items-center justify-center p-8 md:p-16 rounded-[2.5rem] border border-slate-800/80 bg-slate-900/60 backdrop-blur-2xl text-center
                            ${isActive ? 'opacity-100 translate-y-0 scale-100 z-20 shadow-2xl' : 
                              isPassed ? 'opacity-0 -translate-y-32 scale-90 z-10 pointer-events-none' : 'opacity-0 translate-y-32 scale-90 z-10 pointer-events-none'}
                          `}
                        >
                          <div className={`w-28 h-28 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br ${feature.gradient} p-1 mb-8 shadow-[0_0_40px_rgba(0,0,0,0.3)]`}>
                            <div className="w-full h-full bg-slate-950 rounded-[1.8rem] flex items-center justify-center">
                              <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                            </div>
                          </div>
                          <h4 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{feature.title}</h4>
                          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl leading-relaxed">{feature.description}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress dots */}
                  <div className="flex justify-center gap-4 mt-12 md:mt-20">
                    {features.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-2 rounded-full transition-all duration-500 ease-out bg-gradient-to-r ${idx === activeFeatureIdx ? 'w-20 md:w-24 from-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'w-4 md:w-6 bg-slate-800'}`} 
                      />
                    ))}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* How it works */}
      <section className="relative px-6 py-24 overflow-hidden">
        {/* Static Ambient Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[250px] bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">Как это работает</h3>
            <p className="text-slate-400">Процесс анализа занимает не более минуты</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Glowing connecting line */}
            <div className="hidden md:block absolute top-12 left-[18%] right-[18%] h-0.5 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-slate-950 border border-indigo-500/30 flex items-center justify-center mb-6 relative shadow-[0_0_50px_rgba(79,70,229,0.25)]">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-[0_0_25px_rgba(168,85,247,0.6)] text-white">
                      {step.number}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                  <p className="text-slate-400 leading-relaxed max-w-xs">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative px-6 py-24 bg-slate-900/30 border-y border-slate-800/80">
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
            
            {/* Interactive Carousel Mockup */}
            <div className="bg-gradient-to-br from-indigo-500/5 to-purple-600/5 rounded-[2rem] p-2 border border-slate-800 relative overflow-hidden backdrop-blur-sm group h-96">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
              
              <div className="bg-slate-950/80 rounded-[1.75rem] h-full w-full border border-slate-800/80 p-8 flex flex-col relative z-10 overflow-hidden">
                <div className="flex gap-2 mb-8">
                  {carouselItems.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-500 flex-1 ${i === activeSlide ? 'bg-indigo-500' : 'bg-slate-800'}`} />
                  ))}
                </div>
                
                <div className="relative flex-1">
                  {carouselItems.map((item, i) => (
                    <div 
                      key={i}
                      className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 ease-out flex-1
                        ${i === activeSlide ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}
                    >
                      <div className="w-24 h-24 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-6 shadow-2xl relative">
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />
                        <div className="relative z-10">
                          {item.icon}
                        </div>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                      <p className="text-slate-400 font-medium max-w-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24">
        <div className="max-w-4xl mx-auto relative group">
          
          {/* Outer glowing aura that spins synchronously with the border */}
          <div className="absolute inset-0 z-0 blur-xl scale-100 pointer-events-none">
            <div className="absolute inset-0 rounded-[26px] overflow-hidden p-[2px]">
              <div className="absolute -inset-[250%] opacity-100 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_75%,#6366f1_85%,#a855f7_100%)] animate-[spin_5s_linear_infinite]" />
              <div className="bg-slate-950 h-full w-full rounded-[24px]" />
            </div>
          </div>

          <div className="relative rounded-[26px] overflow-hidden p-[2px] bg-slate-800/50 shadow-2xl z-10">
            
            {/* Animated moving border glow */}
            <div className="absolute -inset-[250%] opacity-100 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_75%,#6366f1_85%,#a855f7_100%)] animate-[spin_5s_linear_infinite]" />
            
            <div className="bg-slate-950 rounded-[24px] px-8 py-16 text-center relative overflow-hidden backdrop-blur-xl h-full w-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Готовы улучшить ваши ТЗ?</h2>
              <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto relative z-10">
                Присоединяйтесь к платформе и сократите время на проверку документов в 10 раз.
              </p>
              <Link href="/dashboard" className="relative z-10 inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-2xl font-bold transition-all hover:scale-105 shadow-xl shadow-indigo-500/25">
                Попробовать бесплатно
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <Zap className="w-5 h-5 text-indigo-500" />
             <span className="font-bold text-lg text-slate-300">TZ·AI</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 НТЗ LAB Hackathon. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
