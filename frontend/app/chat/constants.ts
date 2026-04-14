export interface ExamplePrompt {
  title: string;
  description: string;
  icon: string;
  category: "rules" | "improve";
}

export const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  // Rules Category
  {
    title: "Структура ГОСТ 34",
    description: "Напиши структуру ТЗ по ГОСТ 34 с описанием каждого раздела",
    icon: "📋",
    category: "rules"
  },
  {
    title: "Требования к безопасности",
    description: "Как правильно описать требования к информационной безопасности?",
    icon: "✅",
    category: "rules"
  },
  {
    title: "Метрики качества",
    description: "Какие метрики стоит добавить для оценки качества системы?",
    icon: "🎯",
    category: "rules"
  },
  
  // Improve Category
  {
    title: "Проверка на конфликты",
    description: "Проверь мое ТЗ на наличие логических противоречий",
    icon: "⚙️",
    category: "improve"
  },
  {
    title: "Поиск уязвимостей",
    description: "Найди потенциальные уязвимости в описании архитектуры",
    icon: "🐛",
    category: "improve"
  },
  {
    title: "Генерация Use Cases",
    description: "Сгенерируй Use Cases на основе описанных требований",
    icon: "💡",
    category: "improve"
  }
];

export interface ChatHistoryItem {
  id: string;
  title: string;
  messageCount: number;
  date: string;
}

export const MOCK_HISTORY: ChatHistoryItem[] = [
  { id: "1", title: "Анализ ТЗ 'Интернет-магазин'", messageCount: 12, date: "Сегодня" },
  { id: "2", title: "Генерация требований безопасности", messageCount: 4, date: "Вчера" },
  { id: "3", title: "Проверка структуры ГОСТ 34", messageCount: 8, date: "12 апр" },
  { id: "4", title: "Архитектура микросервисов", messageCount: 15, date: "10 апр" }
];

export const INITIAL_MESSAGE = {
  id: "1",
  type: "bot" as const,
  content: "Привет! Я эксперт в области анализа и составления технических заданий. \n\nЯ могу помочь вам:\n1. Проверить ТЗ на соответствие ГОСТ 34\n2. Найти логические противоречия и уязвимости в требованиях\n3. Сгенерировать или дополнить недостающие разделы\n\nМожете задать мне вопрос или выбрать один из примеров ниже.",
};

export const MOCK_CHAT_HISTORY = [
  { id: "1", title: "Анализ ТЗ 'Интернет-магазин'", time: "Сегодня", messageCount: 12, date: "Сегодня" },
  { id: "2", title: "Генерация требований безопасности", time: "Вчера", messageCount: 4, date: "Вчера" },
  { id: "3", title: "Проверка структуры ГОСТ 34", time: "12 апр", messageCount: 8, date: "12 апр" },
  { id: "4", title: "Архитектура микросервисов", time: "10 апр", messageCount: 15, date: "10 апр" }
];

export const MOCK_CHAT_MESSAGES_DATA: Record<string, any[]> = {
  "1": [
    INITIAL_MESSAGE,
    { id: "2", type: "user", content: "Проанализировать ТЗ для интернет-магазина." },
    { id: "3", type: "bot", content: "Хорошо. Я проанализирую ТЗ для интернет-магазина. Пожалуйста, предоставьте текст." }
  ],
  "2": [
    INITIAL_MESSAGE,
    { id: "2", type: "user", content: "Помогите с требованиями безопасности." },
    { id: "3", type: "bot", content: "Конечно. Требования безопасности должны включать аутентификацию, авторизацию и т.д." }
  ]
};
