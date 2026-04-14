# 🌓 Dark/Light Mode Implementation Guide

## 📋 Обзор

Приложение теперь полностью поддерживает **Dark Mode** и **Light Mode** с использованием:
- `ThemeProvider` - провайдер для управления темой
- `useTheme()` - хук для доступа к текущей теме
- `ThemeToggle` - компонент переключения между темами
- `themeClasses` - утилиты для стилизации

## 🔧 Компоненты

### 1. ThemeProvider (`app/providers/ThemeProvider.tsx`)

**Функции:**
- Инициализирует тему из localStorage или системных предпочтений
- Управляет переключением между темами
- Применяет классы `dark`/`light` к HTML элементам
- Сохраняет выбор пользователя в localStorage

**Использование в layout.tsx:**
```tsx
<html className="dark">
  <body>
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>
```

### 2. useTheme() Hook

**Возвращает объект:**
```tsx
{
  theme: "dark" | "light",      // Текущая тема
  toggleTheme: () => void,       // Функция переключения
  isDark: boolean,               // true если темная тема
  isLight: boolean,              // true если светлая тема
}
```

**Использование:**
```tsx
import { useTheme } from "@/app/providers/ThemeProvider";

export function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Переключиться на {isDark ? "светлую" : "тёмную"} тему
    </button>
  );
}
```

### 3. ThemeToggle (`app/components/ThemeToggle.tsx`)

**Готовый компонент для переключения тем с анимацией.**

**Использование:**
```tsx
import { ThemeToggle } from "@/app/components/ThemeToggle";

export function Header() {
  return (
    <header>
      <nav>
        <ThemeToggle /> {/* Готовая кнопка переключения */}
      </nav>
    </header>
  );
}
```

## 🎨 Tailwind Dark/Light Модификаторы

### Структура CSS классов:

```tsx
// Темный режим
<div className="dark:bg-slate-900 dark:text-white">
  
// Светлый режим
<div className="light:bg-white light:text-slate-900">

// Оба
<div className="dark:bg-slate-900 dark:text-white light:bg-white light:text-slate-900">
```

### Примеры стилизации:

```tsx
// Background
<div className="dark:bg-[#080d14] light:bg-white">

// Text
<span className="dark:text-white light:text-slate-900">

// Borders
<div className="dark:border-slate-700 light:border-slate-300">

// Hover
<button className="dark:hover:bg-slate-700 light:hover:bg-slate-200">

// Gradients
<div className="bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 light:from-blue-400 light:to-purple-500">
```

## 📦 Готовые Утилиты (`app/utils/themeClasses.ts`)

### themeClasses объект

```tsx
import { themeClasses } from "@/app/utils/themeClasses";

// Background colors
themeClasses.bg.primary       // Основной фон
themeClasses.bg.secondary     // Вторичный фон
themeClasses.bg.card          // Фон карточки
themeClasses.bg.input         // Фон инпута

// Text colors
themeClasses.text.primary     // Основной текст
themeClasses.text.secondary   // Вторичный текст
themeClasses.text.accent      // Акцентный текст

// Border
themeClasses.border.primary   // Основная граница
themeClasses.border.hover     // Граница при hover
themeClasses.border.focus     // Граница при focus

// Button styles
themeClasses.button.primary   // Основная кнопка
themeClasses.button.secondary // Вторичная кнопка
themeClasses.button.outline   // Контурная кнопка

// Card styles
themeClasses.card             // Стиль карточки

// Input styles
themeClasses.input            // Стиль инпута
```

### Использование:

```tsx
import { themeClasses } from "@/app/utils/themeClasses";

export function Button() {
  return (
    <button className={themeClasses.button.primary}>
      Нажми меня
    </button>
  );
}

export function Card() {
  return (
    <div className={themeClasses.card}>
      <h3 className={themeClasses.text.primary}>Заголовок</h3>
      <p className={themeClasses.text.secondary}>Описание</p>
    </div>
  );
}
```

## 🔄 Как обновить существующие страницы

### Вариант 1: Использовать готовые классы

```tsx
// Было (только темный режим)
<div className="bg-[#080d14] text-white border border-slate-700">

// Стало (поддержка обоих режимов)
<div className={`${themeClasses.bg.primary} ${themeClasses.text.primary} ${themeClasses.border.primary}`}>
```

### Вариант 2: Использовать Tailwind модификаторы

```tsx
// Было
<div className="bg-[#080d14] text-white border border-slate-700">

// Стало
<div className="dark:bg-[#080d14] dark:text-white dark:border-slate-700 light:bg-white light:text-slate-900 light:border-slate-300">
```

### Вариант 3: Комбинировать

```tsx
<div className={`${themeClasses.bg.primary} ${themeClasses.text.primary} dark:border-slate-700 light:border-slate-300`}>
```

## 📄 Примеры для каждой страницы

### Главная страница (page.tsx)

```tsx
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { themeClasses } from "@/app/utils/themeClasses";

export default function Home() {
  return (
    <div className={themeClasses.bg.primary}>
      {/* Header */}
      <header className={`${themeClasses.bg.secondary} border-b ${themeClasses.border.primary}`}>
        <div className="flex justify-between items-center p-4">
          <h1 className={themeClasses.text.primary}>TZ·AI</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className={themeClasses.text.primary}>Добро пожаловать</h2>
        <button className={themeClasses.button.primary}>
          Начать
        </button>
      </main>
    </div>
  );
}
```

### Дашборд (dashboard/page.tsx)

```tsx
export default function Dashboard() {
  return (
    <div className={themeClasses.bg.primary}>
      {/* Header */}
      <header className={`${themeClasses.bg.secondary} border-b ${themeClasses.border.primary}`}>
        <ThemeToggle />
      </header>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className={themeClasses.card}>
          <h3 className={themeClasses.text.secondary}>Статистика</h3>
          <p className={themeClasses.text.primary}>100</p>
        </div>
      </div>
    </div>
  );
}
```

### Логин (login/page.tsx)

```tsx
export default function LoginPage() {
  return (
    <div className={themeClasses.bg.primary}>
      <form className={themeClasses.card}>
        <input 
          className={themeClasses.input}
          type="email"
          placeholder="Email"
        />
        <button className={themeClasses.button.primary}>
          Войти
        </button>
      </form>
    </div>
  );
}
```

### Чат (chat/page.tsx)

```tsx
export default function ChatPage() {
  return (
    <div className={themeClasses.bg.primary}>
      {/* Messages */}
      <div className="space-y-4">
        <div className={`${themeClasses.bg.secondary} dark:border-slate-700 light:border-slate-300 rounded-lg p-4`}>
          <p className={themeClasses.text.primary}>Сообщение</p>
        </div>
      </div>

      {/* Input */}
      <input 
        className={themeClasses.input}
        type="text"
        placeholder="Напишите сообщение..."
      />
    </div>
  );
}
```

## 🎯 Миграция существующего кода

### Шаг 1: Добавить ThemeToggle в навигацию

```tsx
// В компонент Header добавить:
import { ThemeToggle } from "@/app/components/ThemeToggle";

<nav>
  {/* ... links ... */}
  <ThemeToggle />
</nav>
```

### Шаг 2: Заменить классы в компонентах

**Поиск и замена:**
- `bg-\[#080d14\]` → `dark:bg-[#080d14] light:bg-white`
- `text-white` → `dark:text-white light:text-slate-900`
- `bg-slate-900` → `dark:bg-slate-900 light:bg-slate-50`
- `border-slate-700` → `dark:border-slate-700 light:border-slate-300`

### Шаг 3: Тестировать переключение

1. Откройте DevTools
2. Нажмите на ThemeToggle кнопку
3. Проверьте, что все элементы переходят на светлый/темный режим

## 🔍 Проверка в DevTools

```javascript
// Проверить текущую тему
document.documentElement.classList.contains('dark') // true/false

// Изменить тему вручную
document.documentElement.classList.add('light')
document.documentElement.classList.remove('dark')
```

## ⚙️ Конфигурация Tailwind CSS

В файле `tailwind.config.ts` уже настроено:

```ts
module.exports = {
  darkMode: 'class', // Используем классы вместо media queries
  theme: {
    extend: {
      colors: {
        // Dark theme
        dark: '#080d14',
        // Light theme
      },
    },
  },
}
```

## 📝 Чек-лист для обновления страниц

- [ ] Добавить `ThemeToggle` в Header/Navbar
- [ ] Заменить классы основного фона
- [ ] Заменить классы текста
- [ ] Заменить классы бордеров
- [ ] Заменить классы кнопок
- [ ] Тестировать оба режима
- [ ] Проверить контрастность текста

## 🚀 Продвинутые возможности

### Условный рендер в зависимости от темы

```tsx
import { useTheme } from "@/app/providers/ThemeProvider";

export function AdaptiveImage() {
  const { isDark } = useTheme();

  return (
    <img 
      src={isDark ? "/images/dark.png" : "/images/light.png"} 
      alt="Theme-aware image"
    />
  );
}
```

### Динамические цвета

```tsx
import { useTheme } from "@/app/providers/ThemeProvider";

export function DynamicBadge() {
  const { isDark } = useTheme();

  const bgColor = isDark ? "bg-blue-500" : "bg-blue-400";
  const textColor = isDark ? "text-white" : "text-slate-900";

  return <span className={`${bgColor} ${textColor}`}>Badge</span>;
}
```

## 📚 Дополнительные ресурсы

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [React Context API](https://react.dev/reference/react/useContext)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## ❓ Часто задаваемые вопросы

**Q: Как сохранить выбор пользователя?**
A: ThemeProvider автоматически сохраняет выбор в localStorage.

**Q: Как исключить какой-то элемент от переключения темы?**
A: Просто не добавляйте классы `dark:` или `light:` к элементу.

**Q: Как проверить текущую тему в компоненте?**
A: Используйте хук `useTheme()` и его свойства `isDark` или `isLight`.

---

**Дата обновления:** 14 апреля 2026  
**Статус:** Production ready ✅
