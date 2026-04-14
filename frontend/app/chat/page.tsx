"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../dashboard/components/types";
import { MessageList } from "./components/MessageList";
import { ChatInput } from "./components/ChatInput";
import { ExamplePrompts } from "./components/ExamplePrompts";
import { useTheme } from "../providers/ThemeProvider";
import { Moon, Sun, Bot, PanelLeftClose, PanelLeft, MessageSquare, Clock, ArrowRight, Sparkles, Send } from "lucide-react";

export const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  text: "Привет! Я ИИ-ассистент по анализу ТЗ. Я могу помочь вам:\n\n• Проверить структуру документа\n• Найти логические нестыковки\n• Сформулировать требования по ГОСТ\n• Предложить улучшения для разделов\n\nЗадайте вопрос или выберите пример ниже!"
};

export const MOCK_CHAT_HISTORY = [
  { id: 1, title: "Текущий диалог", time: "Сегодня", isActive: true },
  { id: 2, title: "Анализ E-commerce", time: "Вчера", isActive: false },
  { id: 3, title: "Проверка API", time: "Вчера", isActive: false },
  { id: 4, title: "Вопросы по ГОСТ 34", time: "3 дня назад", isActive: false },
  { id: 5, title: "Требования безопасности", time: "Неделю назад", isActive: false },
];

export const MOCK_CHAT_MESSAGES_DATA: Record<number, ChatMessage[]> = {
  1: [INITIAL_MESSAGE],
  2: [
    INITIAL_MESSAGE,
    {
      role: "user",
      text: "Проанализируй мое ТЗ и найди ошибки",
    },
    {
      role: "assistant",
      text: "Техническое задание должно содержать следующие основные разделы: 1. Цель разработки - четкая формулировка целей проекта. 2. Требования - функциональные и технические требования. 3. Ограничения - технические и бюджетные ограничения. 4. Критерии принятия - как будет оцениваться успех. 5. Сроки - план реализации с ключевыми этапами.",
    },
    {
      role: "assistant",
      text: "Для проверки качества ТЗ рекомендую обратить внимание на:\n✓ Полнота всех разделов\n✓ Отсутствие противоречий между требованиями\n✓ Ясность формулировок (избегайте расплывчатых терминов)\n✓ Наличие критериев принятия для каждого требования\n✓ Реалистичность сроков и бюджета",
    },
    {
      role: "assistant",
      text: "При формулировке целей используйте методику SMART:\nS (Specific) - конкретность\nM (Measurable) - измеримость\nA (Achievable) - достижимость\nR (Relevant) - релевантность\nT (Time-bound) - ограниченность по времени",
    },
    {
      role: "assistant",
      text: "Технические требования должны быть:\n- Конкретными и проверяемыми\n- Не содержать предположений о способе реализации\n- Написаны максимально ясно\n- Сгруппированы по категориям\n- Дополнены примерами, где это необходимо",
    },
  ],
  3: [
    INITIAL_MESSAGE,
    {
      role: "user",
      text: "Как правильно составить раздел 'Требования'?",
    },
    {
      role: "assistant",
      text: "Раздел 'Требования' в техническом задании должен включать в себя:\n\n1. Функциональные требования:\n  - Описание функций, которые должна выполнять система.\n  - Взаимодействие системы с пользователями и другими системами.\n\n2. Нефункциональные требования:\n  - Требования к производительности (скорость, отзывчивость).\n  - Требования к безопасности (аутентификация, авторизация, шифрование данных).\n  - Требования к надежности и доступности.\n\n3. Ограничения:\n  - Технические ограничения (аппаратные, программные).\n  - Бюджетные ограничения.\n  - Сроки выполнения.",
    },
  ],
  4: [
    INITIAL_MESSAGE,
    {
      role: "user",
      text: "Вопросы по ГОСТ 34",
    },
    {
      role: "assistant",
      text: "ГОСТ 34 - это стандарт, регулирующий требования к содержанию и оформлению технических заданий в России. Основные требования включают:\n\n1. Техническое задание должно быть оформлено на русском языке.\n2. Должно содержать четкое и однозначное описание объекта разработки.\n3. Все требования должны быть проверяемыми и осуществимыми.\n4. Должны быть определены критерии приемки работы.\n5. Техническое задание должно быть подписано уполномоченными лицами.",
    },
  ],
  5: [
    INITIAL_MESSAGE,
    {
      role: "user",
      text: "Требования безопасности",
    },
    {
      role: "assistant",
      text: "При разработке технического задания важно учитывать требования безопасности, такие как:\n\n1. Защита данных:\n  - Шифрование конфиденциальной информации.\n  - Ограничение доступа к данным.\n\n2. Аутентификация и авторизация:\n  - Подтверждение личности пользователей.\n  - Назначение ролей и прав доступа.\n\n3. Защита от внешних угроз:\n  - Использование брандмауэров и антивирусов.\n  - Регулярные обновления и патчи системы.",
    },
  ],
};

const RESPONSE_SAMPLES = [
  "Техническое задание должно содержать следующие основные разделы: 1. Цель разработки - четкая формулировка целей проекта. 2. Требования - функциональные и технические требования. 3. Ограничения - технические и бюджетные ограничения. 4. Критерии принятия - как будет оцениваться успех. 5. Сроки - план реализации с ключевыми этапами.",
  
  "Для проверки качества ТЗ рекомендую обратить внимание на:\n✓ Полнота всех разделов\n✓ Отсутствие противоречий между требованиями\n✓ Ясность формулировок (избегайте расплывчатых терминов)\n✓ Наличие критериев принятия для каждого требования\n✓ Реалистичность сроков и бюджета",
  
  "При формулировке целей используйте методику SMART:\nS (Specific) - конкретность\nM (Measurable) - измеримость\nA (Achievable) - достижимость\nR (Relevant) - релевантность\nT (Time-bound) - ограниченность по времени",
  
  "Технические требования должны быть:\n- Конкретными и проверяемыми\n- Не содержать предположений о способе реализации\n- Написаны максимально ясно\n- Сгруппированы по категориям\n- Дополнены примерами, где это необходимо",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setIsHistoryLoading(false); // Новое сообщение - не история

    // Add user message
    const userMessage: ChatMessage = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const responseText =
        RESPONSE_SAMPLES[Math.floor(Math.random() * RESPONSE_SAMPLES.length)];
      const botMessage: ChatMessage = {
        role: "assistant",
        text: responseText,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSend = () => {
    handleSendMessage(input);
  };

  const handleClearDialog = () => {
    if (window.confirm("Вы уверены? История диалога будет удалена.")) {
      setMessages([INITIAL_MESSAGE]);
      setInput("");
    }
  };

  const handleExamplePromptSelect = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleSelectChat = (chatId: number, chatTitle: string) => {
    if (activeChatId === chatId) return;
    
    setActiveChatId(chatId);
    setIsLoading(true);
    setIsHistoryLoading(true); // Загружаем историю
    setMessages([]); // Очищаем экран на время "загрузки"
    
    // Скрываем боковое окно на мобильных устройствах после выбора
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }

    setTimeout(() => {
      const mockChatData = MOCK_CHAT_MESSAGES_DATA[chatId];
      if (mockChatData) {
        setMessages(mockChatData as ChatMessage[]);
      } else {
        // Мок фоллбэка, если нет данных для ID
        setMessages([
          { role: "user", text: `Продолжить работу над: "${chatTitle}"` },
          { role: "assistant", text: `Загружена история диалога "${chatTitle}". Чем я могу помочь вам дальше?` }
        ]);
      }
      setIsLoading(false);
    }, 400); // небольшая задержка для имитации загрузки
  };

  // Получаем тему из глобального контекста вместо локального
  const { isDark, toggleTheme } = useTheme();

  // Управление боковым меню (история диалогов) - слева
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Управление правым модульным окном (приветствие/информация)
  const [isInfoSidebarOpen, setIsInfoSidebarOpen] = useState(false);

  // Стейт анимации для сцен робота (0, 1, 2, 3)
  const [robotScene, setRobotScene] = useState(0);

  useEffect(() => {
    if (isInfoSidebarOpen) {
      setRobotScene(1);
      const timer1 = setTimeout(() => setRobotScene(2), 2000); // 1 -> 2
      const timer2 = setTimeout(() => setRobotScene(3), 5000); // 2 -> 3
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setRobotScene(0); // reset if closed
    }
  }, [isInfoSidebarOpen]);

  const showExamples = messages.length === 1;

  return (
    <div className={`h-screen flex flex-col relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#080d14] text-white' : 'bg-slate-50 text-slate-900'}`}>

      {/* Оверлей для закрытия меню на мобильных */}
      {(isSidebarOpen || isInfoSidebarOpen) && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => {
            setIsSidebarOpen(false);
            setIsInfoSidebarOpen(false);
          }}
        />
      )}

      {/* Левое модульное окно (История) */}
      <div 
        className={`fixed md:absolute left-0 md:left-4 top-0 md:top-1/2 md:-translate-y-1/2 h-full md:h-[60%] w-[85%] sm:w-80 md:w-64 md:rounded-2xl shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 flex flex-col border-r md:border ${
          isSidebarOpen 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-[150%] md:pointer-events-none pointer-events-none'
        } ${
          isDark 
            ? 'bg-slate-900/95 border-slate-700/50 backdrop-blur-xl' 
            : 'bg-white/95 border-slate-200/50 backdrop-blur-xl'
        }`}
      >
        <div className={`p-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} flex items-center justify-between mt-safe pt-safe`}>
          <h2 className={`font-semibold text-sm ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            История
          </h2>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {MOCK_CHAT_HISTORY.map((chat: any) => {
            const isActive = activeChatId === chat.id;
            return (
            <div 
              key={chat.id}
              onClick={() => handleSelectChat(chat.id, chat.title)}
              className={`p-3 rounded-xl cursor-pointer transition-colors group flex flex-col gap-1.5 ${
                isActive
                  ? isDark ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-indigo-50 border border-indigo-100'
                  : isDark ? 'hover:bg-slate-800/50 border border-transparent' : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : isDark ? 'text-slate-500 group-hover:text-slate-400' : 'text-slate-400 group-hover:text-slate-500'}`} />
                <span className={`text-sm font-medium truncate ${isActive ? (isDark ? 'text-indigo-300' : 'text-indigo-700') : (isDark ? 'text-slate-300' : 'text-slate-700')}`}>
                  {chat.title}
                </span>
              </div>
              <div className="flex items-center gap-1 pl-5">
                <Clock className={`w-3 h-3 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {chat.time}
                </span>
              </div>
            </div>
          )})}
        </div>
      </div>

      {/* Правое модульное окно (Сцена с роботом) */}
      <div 
        className={`fixed md:absolute right-0 md:right-4 top-0 md:top-1/2 md:-translate-y-1/2 h-full md:h-[60%] w-[85%] sm:w-[320px] md:w-[320px] md:rounded-2xl shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 flex flex-col border-l md:border overflow-hidden ${
          isInfoSidebarOpen 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-[150%] md:pointer-events-none pointer-events-none'
        } ${
          isDark
            ? 'bg-slate-900/95 border-slate-700/50 backdrop-blur-xl' 
            : 'bg-white/95 border-slate-200/50 backdrop-blur-xl'
        }`}
      >
        <div className={`p-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} flex items-center justify-between mt-safe pt-safe`}>
          <button 
            onClick={() => setIsInfoSidebarOpen(false)}
            className={`p-1.5 rounded-lg transition-colors rotate-180 ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center relative">
          
          {/* Анимация робота */}
          <div className="mb-8 relative">
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-xl transition-transform duration-700 ease-in-out ${robotScene >= 1 ? 'scale-100 rotate-0 translate-y-0' : 'scale-50 rotate-12 translate-y-10 opacity-0'}`}>
              <div className={`w-full h-full rounded-[21px] flex items-center justify-center relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                 <Bot className={`w-10 h-10 ${robotScene === 2 ? 'animate-bounce text-purple-500' : robotScene === 3 ? 'text-emerald-500' : isDark ? 'text-white' : 'text-indigo-600'} transition-colors duration-500`} />
              </div>
            </div>
            {/* Декоративные волны позади робота */}
            {robotScene >= 2 && (
              <div className={`absolute inset-0 bg-purple-500/20 rounded-full animate-ping blur-xl -z-10 transition-opacity duration-500 ${robotScene === 3 ? 'bg-emerald-500/20' : ''}`} />
            )}
          </div>

          {/* Тексты сцен */}
          <div className="w-full min-h-[220px] relative">
            
            {/* Сцена 1 */}
            <div className={`absolute inset-0 flex flex-col items-center justify-start gap-5 transition-all duration-700 ${robotScene === 1 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-8 pointer-events-none -z-10'}`}>
              <p className={`text-sm font-medium text-center leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Привет! 👋 Я — ваш <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold">интеллектуальный помощник</span> по работе с научными и техническими заданиями.
              </p>
              <button 
                onClick={() => setRobotScene(2)}
                className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2 group"
              >
                Что ты умеешь? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Сцена 2 */}
            <div className={`absolute inset-0 flex flex-col items-start gap-4 transition-all duration-700 ${robotScene === 2 ? 'opacity-100 translate-x-0 z-10' : robotScene < 2 ? 'opacity-0 translate-x-8 pointer-events-none -z-10' : 'opacity-0 -translate-x-8 pointer-events-none -z-10'}`}>
              <p className={`font-semibold text-sm w-full text-center ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Мои основные навыки:</p>
              <ul className={`text-sm space-y-3 w-full ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'}`}>
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500"><Sparkles className="w-3.5 h-3.5" /></div>
                  Структурирую ТЗ
                </li>
                <li className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'}`}>
                  <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500"><Sparkles className="w-3.5 h-3.5" /></div>
                  Убираю «воду» и неточности
                </li>
                <li className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'}`}>
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500"><Sparkles className="w-3.5 h-3.5" /></div>
                  Даю рекомендации к улучшению
                </li>
              </ul>
              <button 
                onClick={() => setRobotScene(3)}
                className="mt-2 mx-auto px-5 py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-sm hover:bg-slate-700 active:scale-95 transition-all border border-slate-700 flex items-center gap-2 group"
              >
                Хорошо, а как начать? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Сцена 3 */}
            <div className={`absolute inset-0 flex flex-col items-center gap-4 transition-all duration-700 ${robotScene === 3 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 pointer-events-none -z-10'}`}>
              <p className={`text-sm text-center leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Напишите свой первый запрос, либо выберите один из <span className="font-semibold text-emerald-500">моих шаблонов</span>, чтобы увидеть магию в деле!
              </p>
              
              <div className="w-full space-y-2 mt-2">
                <button 
                  onClick={() => {
                    handleSendMessage("Проанализируй мое ТЗ и найди ошибки");
                    setIsInfoSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-sm transition-all group border flex items-center justify-between ${
                    isDark 
                      ? 'bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/50 text-emerald-100' 
                      : 'bg-emerald-50 border-emerald-200 hover:border-emerald-400 text-emerald-800'
                  }`}
                >
                  <span className="truncate">Проанализировать моё ТЗ</span>
                  <Send className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>

                <button 
                  onClick={() => {
                    handleSendMessage("Как правильно составить раздел 'Требования'?");
                    setIsInfoSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-sm transition-all group border flex items-center justify-between ${
                    isDark 
                      ? 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50 text-blue-100' 
                      : 'bg-blue-50 border-blue-200 hover:border-blue-400 text-blue-800'
                  }`}
                >
                  <span className="truncate">Правила раздела "Требования"</span>
                  <Send className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              <div className="mt-4 text-[10px] text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-2">
                <div className="w-8 h-px bg-slate-700"></div>
                Или напишите свой вопрос
                <div className="w-8 h-px bg-slate-700"></div>
              </div>
            </div>
            
          </div>
          
          {/* Индикаторы (точки) прогресса */}
          <div className="absolute bottom-4 flex gap-2">
            <button onClick={() => setRobotScene(1)} className={`h-1.5 rounded-full transition-all duration-300 ${robotScene === 1 ? 'w-4 bg-purple-500' : isDark ? 'w-1.5 bg-slate-600 hover:bg-slate-500' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`} aria-label="Сцена 1" />
            <button onClick={() => setRobotScene(2)} className={`h-1.5 rounded-full transition-all duration-300 ${robotScene === 2 ? 'w-4 bg-purple-500' : isDark ? 'w-1.5 bg-slate-600 hover:bg-slate-500' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`} aria-label="Сцена 2" />
            <button onClick={() => setRobotScene(3)} className={`h-1.5 rounded-full transition-all duration-300 ${robotScene === 3 ? 'w-4 bg-emerald-500' : isDark ? 'w-1.5 bg-slate-600 hover:bg-slate-500' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`} aria-label="Сцена 3" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className={`backdrop-blur-xl sticky top-0 z-30 border-b transition-all duration-300 ${isDark ? 'border-slate-800/80 bg-[#080d14]/80 shadow-lg shadow-black/20' : 'border-slate-200 bg-white/80 shadow-sm'}`}>
        <div className="max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`p-2 sm:p-2.5 rounded-xl transition-colors flex-shrink-0 ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                title={isSidebarOpen ? "Скрыть историю" : "Показать историю"}
              >
                <PanelLeft className="w-5 h-5 sm:w-5 sm:h-5" />
              </button>
              
              <div className="relative flex-shrink-0 hidden sm:block">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-lg shadow-purple-500/30">
                  <div className={`w-full h-full rounded-[14px] flex items-center justify-center transition-transform hover:scale-105 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                    <Bot className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? 'text-white' : 'text-indigo-600'}`} />
                  </div>
                </div>
                
                <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                  <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${isLoading ? 'bg-cyan-500 animate-pulse' : 'bg-emerald-500'}`} />
                </div>
              </div>
              
              <div className="min-w-0 flex flex-col justify-center">
                <h1 className={`text-base sm:text-xl font-extrabold tracking-tight truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  AI-Ассистент
                </h1>
                <p className={`text-[10px] sm:text-xs font-medium flex items-center gap-1 sm:gap-1.5 truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isLoading ? (
                    <span className="text-cyan-500 truncate">Анализирую данные...</span>
                  ) : (
                    <span className="text-emerald-500 truncate">Помогаю в науке и в радости</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <button
                onClick={() => setIsInfoSidebarOpen(!isInfoSidebarOpen)}
                className={`px-3 sm:px-4 h-9 sm:h-10 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 active:scale-95 border shadow-sm ${
                  isDark
                    ? "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <span className="hidden sm:inline">О чат-боте</span>
                <span className="sm:hidden">О боте</span>
              </button>

              <div className={`w-[1px] h-6 hidden sm:block ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>

              <button
                onClick={toggleTheme}
                className={`relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isDark
                    ? "bg-slate-800/80 hover:bg-slate-700 text-amber-400 border border-slate-700 shadow-sm"
                    : "bg-white hover:bg-slate-50 text-indigo-500 border border-slate-200 shadow-sm"
                }`}
                aria-label="Переключить тему"
              >
                {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showExamples ? (
          <div className="flex-1 overflow-y-auto p-6">
            <ExamplePrompts
              visible={showExamples}
              onSelect={handleExamplePromptSelect}
              isDark={isDark}
            />
          </div>
        ) : (
          <MessageList messages={messages} isLoading={isLoading} isDark={isDark} isHistoryLoading={isHistoryLoading} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        onClear={handleClearDialog}
        isLoading={isLoading}
        isDark={isDark}
      />
    </div>
  );
}
