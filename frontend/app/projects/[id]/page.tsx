"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Info, Download, MessageSquare, Wand2, X, ChevronRight, MessageCircle } from "lucide-react";
import { mockProjectDetails } from "./components/constants";
import { ScoreRing } from "../../dashboard/components/shared-components";
import { scoreColor, scoreLabel } from "../../dashboard/components/helpers";
import { useTheme } from "../../providers/ThemeProvider";
import { ChatWidget } from "../../dashboard/components/ChatWidget";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { isDark } = useTheme();
  
  // Use mock data until endpoints exist
  const [project] = useState(() => mockProjectDetails[params.id] || mockProjectDetails["1"]);
  const activeVersion = project.versions[project.versions.length - 1];
  const { analysis, aiImprovements } = activeVersion;
  
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans pb-24 ${isDark ? 'bg-[#080d14] text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors ${isDark ? 'bg-[#080d14]/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/dashboard')}
              className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm font-semibold truncate max-w-[200px] sm:max-w-md">{project.title}</h1>
              <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Версия {activeVersion.versionNumber}</p>
            </div>
          </div>
          <div className="hidden md:flex flex-col text-xs text-slate-500 items-start md:items-center">
            <span className="font-medium text-slate-700 dark:text-slate-300">{project.client}</span>
            <span>{project.organization}</span>
          </div>
          <div className="flex items-center gap-2 relative">
             <button 
               onClick={() => setIsAiModalOpen(true)}
               className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-2 ${isDark ? 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
             >
               <Wand2 className="w-4 h-4" />
               Улучшить с AI
             </button>
             <button className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors min-w-[140px] shadow-sm ${isDark ? 'bg-amber-400 text-slate-900 hover:bg-amber-300' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}>
               Отправить Admin-у
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        
        {/* Main Score Section */}
        <section className={`rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex shrink-0 items-center justify-center">
            <ScoreRing score={analysis.totalScore} />
          </div>
          <div className="flex-1">
             <h2 className="text-2xl font-bold mb-2">Отличный результат, но есть над чем работать</h2>
             <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Структура документа соответствует стандартам на {analysis.totalScore}%. Основные замечания касаются чёткости формулировки задач и измеримости результатов.</p>
             <div className="flex flex-wrap gap-2">
               <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                  <CheckCircle className="w-3.5 h-3.5" /> Хорошая новизна
               </span>
               <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${isDark ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                  <AlertTriangle className="w-3.5 h-3.5" /> Уточнить задачи
               </span>
             </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Left column: Scorecard */}
           <div className="lg:col-span-1 space-y-6">
              <div className={`rounded-2xl border p-6 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                 <h3 className="font-bold flex items-center gap-2 mb-4">
                   <TargetIcon /> Детализация оценки
                 </h3>
                 <div className="space-y-4">
                   <ScoreRow label="Стратегическая релевантность" value={analysis.scorecard.strategicRelevance} max={20} isDark={isDark} />
                   <ScoreRow label="Научная новизна" value={analysis.scorecard.scientificNovelty} max={15} isDark={isDark} />
                   <ScoreRow label="Практическая применимость" value={analysis.scorecard.practicalApplicability} max={20} isDark={isDark} />
                   <ScoreRow label="Ожидаемые результаты" value={analysis.scorecard.expectedResults} max={15} isDark={isDark} />
                   <ScoreRow label="Цель и задачи" value={analysis.scorecard.goalsAndTasks} max={10} isDark={isDark} />
                   <ScoreRow label="Соц-экономический эффект" value={analysis.scorecard.socioEconomicEffect} max={10} isDark={isDark} />
                   <ScoreRow label="Реализуемость" value={analysis.scorecard.feasibility} max={10} isDark={isDark} />
                 </div>
              </div>
           </div>

           {/* Right column: Findings and Recommendations */}
           <div className="lg:col-span-2 space-y-6">
              <div className={`rounded-2xl border p-6 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <AlertTriangle className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} /> Найдено проблем ({analysis.findings.length})
                </h3>
                <div className="space-y-3">
                  {analysis.findings.map((finding: any, idx: number) => (
                    <div key={idx} className={`p-4 rounded-xl border flex items-start gap-4 ${finding.type === 'error' ? (isDark ? 'bg-rose-500/5 border-rose-500/20' : 'bg-rose-50 border-rose-100') : (isDark ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50 border-amber-100')}`}>
                       <div className={`mt-0.5 shrink-0 ${finding.type === 'error' ? 'text-rose-500' : 'text-amber-500'}`}>
                          {finding.type === 'error' ? <Info className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                       </div>
                       <div>
                          <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${finding.type === 'error' ? 'text-rose-500' : 'text-amber-500'}`}>{finding.section}</p>
                          <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{finding.message}</p>
                       </div>
                       <button className={`shrink-0 ml-auto p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-indigo-600'}`}>
                          <MessageSquare className="w-4 h-4" />
                       </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-2xl border p-6 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <CheckCircle className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`} /> Рекомендации по улучшению
                </h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className={`flex items-start gap-3 text-sm p-3 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                      <span className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>{idx + 1}</span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
           </div>
        </div>
      </main>

      {/* AI Improvement Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-black/40 animate-in fade-in duration-200">
           <div className={`w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`}>
              
              <div className={`flex items-center justify-between p-4 sm:p-6 border-b shrink-0 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                 <div>
                   <h2 className="text-xl font-bold flex items-center gap-2">
                     <Wand2 className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                     AI-рекомендации по улучшению
                   </h2>
                   <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Автоматически сгенерированные предложения для вашего ТЗ</p>
                 </div>
                 <button 
                   onClick={() => setIsAiModalOpen(false)}
                   className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                 >
                   <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {aiImprovements && aiImprovements.length > 0 ? (
                  aiImprovements.map((improvement: any, idx: number) => (
                    <div key={idx} className={`p-5 rounded-xl border ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                       <h3 className="font-bold text-sm mb-4 px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-500 inline-block">
                         {improvement.title}
                       </h3>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                         <div className={`p-4 rounded-lg border ${isDark ? 'bg-slate-900 border-rose-500/20' : 'bg-white border-rose-200'}`}>
                           <p className="text-xs font-semibold text-rose-500 mb-2 flex items-center justify-between">
                             Исходный текст
                             <AlertTriangle className="w-3.5 h-3.5" />
                           </p>
                           <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{improvement.originalText}</p>
                         </div>
                         
                         <div className={`p-4 rounded-lg border ${isDark ? 'bg-indigo-950/20 border-emerald-500/30' : 'bg-emerald-50/50 border-emerald-200'}`}>
                           <p className="text-xs font-semibold text-emerald-500 mb-2 flex items-center justify-between">
                             Изменённый AI текст
                             <CheckCircle className="w-3.5 h-3.5 inline" />
                           </p>
                           <p className={`text-sm ${isDark ? 'text-emerald-100/90' : 'text-slate-800'}`}>{improvement.improvedText}</p>
                         </div>
                       </div>
                       
                       <div className="flex justify-end">
                         <button className={`text-xs font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${isDark ? 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}>
                           Применить изменение <ChevronRight className="w-3 h-3" />
                         </button>
                       </div>
                    </div>
                  ))
                ) : (
                  <div className={`text-center py-12 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Нет доступных AI-улучшений для этой версии.</p>
                  </div>
                )}
              </div>

              <div className={`p-4 sm:p-6 border-t shrink-0 flex justify-end gap-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                 <button 
                   onClick={() => setIsAiModalOpen(false)}
                   className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-600'}`}
                 >
                   Закрыть
                 </button>
              </div>

           </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {chatOpen && <ChatWidget onClose={() => setChatOpen(false)} />}
      <button
        onClick={() => setChatOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-95 text-white shadow-xl shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center transition-all duration-150"
        aria-label="Открыть AI-ассистент"
      >
        {chatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Notification dot on chat button */}
      {!chatOpen && (
        <span className={`fixed bottom-[62px] right-5 z-50 w-3 h-3 rounded-full bg-emerald-400 border-2 animate-pulse transition-colors duration-300 ${isDark ? 'border-[#080d14]' : 'border-slate-50'}`} />
      )}
    </div>
  );
}

function TargetIcon() {
  return (
    <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function ScoreRow({ label, value, max, isDark }: { label: string, value: number, max: number, isDark: boolean }) {
  const percentage = (value / max) * 100;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{label}</span>
        <span className={`font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{value} / {max}</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
        <div 
          className={`h-full rounded-full ${percentage >= 80 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </div>
  );
}
