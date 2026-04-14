# 🎨 Примеры использования Dark/Light Mode

Здесь представлены конкретные примеры того, как обновить существующие компоненты для поддержки светлого и темного режимов.

## 1️⃣ Header/Navigation Component

### Было (только темный режим):
```tsx
<header className="border-b border-slate-700/50 bg-slate-900/30 backdrop-blur-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <Zap className="w-5 h-5 text-white" />
      </div>
      <h1 className="text-lg font-bold text-white">TZ·AI</h1>
    </div>
  </div>
</header>
```

### Стало (с поддержкой обоих режимов):
```tsx
import { themeClasses } from "@/app/utils/themeClasses";
import { ThemeToggle } from "@/app/components/ThemeToggle";

<header className={`border-b sticky top-0 z-50 ${themeClasses.border.primary} ${themeClasses.backdrop}`}>
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <Zap className="w-5 h-5 text-white" />
      </div>
      <h1 className={`text-lg font-bold ${themeClasses.text.primary}`}>TZ·AI</h1>
    </div>
    <ThemeToggle />
  </div>
</header>
```

## 2️⃣ Card Component

### Было:
```tsx
<div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-800/60 transition-colors">
  <h3 className="font-bold text-white">Заголовок</h3>
  <p className="text-slate-400">Описание</p>
</div>
```

### Стало:
```tsx
<div className={`p-8 rounded-2xl backdrop-blur-sm hover:bg-slate-700/40 dark:hover:bg-slate-800/60 light:hover:bg-slate-100/80 transition-colors ${themeClasses.card}`}>
  <h3 className={`font-bold ${themeClasses.text.primary}`}>Заголовок</h3>
  <p className={themeClasses.text.secondary}>Описание</p>
</div>
```

## 3️⃣ Button Component

### Было:
```tsx
<button className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all">
  Действие
</button>
```

### Стало (опция 1 - использовать готовый класс):
```tsx
<button className={themeClasses.button.primary}>
  Действие
</button>
```

### Стало (опция 2 - использовать Tailwind модификаторы):
```tsx
<button className="bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 dark:hover:from-blue-600 dark:hover:to-purple-700 light:from-blue-400 light:to-purple-500 light:hover:from-blue-500 light:hover:to-purple-600 text-white font-bold px-6 py-3 rounded-xl transition-all">
  Действие
</button>
```

## 4️⃣ Form Input Component

### Было:
```tsx
<input
  type="email"
  placeholder="your@email.com"
  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/20 transition-all"
/>
```

### Стало:
```tsx
<input
  type="email"
  placeholder="your@email.com"
  className={`w-full ${themeClasses.input}`}
/>
```

## 5️⃣ Message/Chat Bubble

### Было:
```tsx
<div className={`max-w-2xl px-4 py-3 rounded-2xl text-sm ${
  isUser 
    ? "bg-amber-400/20 text-amber-100 border border-amber-400/20"
    : "bg-slate-800 text-slate-300 border border-slate-700"
}`}>
  {message}
</div>
```

### Стало:
```tsx
<div className={`max-w-2xl px-4 py-3 rounded-2xl text-sm ${
  isUser 
    ? "dark:bg-amber-400/20 dark:text-amber-100 dark:border-amber-400/20 light:bg-amber-400/10 light:text-amber-700 light:border-amber-400/30"
    : `${themeClasses.bg.tertiary} ${themeClasses.text.secondary} ${themeClasses.border.primary}`
}`}>
  {message}
</div>
```

## 6️⃣ Stat Card

### Было:
```tsx
<div className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-5`}>
  <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10 bg-blue-400`} />
  <h4 className="text-2xl font-bold text-white">100</h4>
  <p className="text-xs text-slate-500">Документов</p>
</div>
```

### Стало:
```tsx
<div className={`relative overflow-hidden rounded-2xl backdrop-blur-sm p-5 ${themeClasses.card}`}>
  <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10 dark:bg-blue-400 light:bg-blue-300`} />
  <h4 className={`text-2xl font-bold ${themeClasses.text.primary}`}>100</h4>
  <p className={themeClasses.text.tertiary}>Документов</p>
</div>
```

## 7️⃣ Modal/Dialog

### Было:
```tsx
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md">
    <h2 className="text-2xl font-bold text-white mb-4">Заголовок</h2>
    <p className="text-slate-400 mb-6">Содержимое</p>
    <button className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-6 py-2 rounded-xl">
      Закрыть
    </button>
  </div>
</div>
```

### Стало:
```tsx
<div className={`fixed inset-0 dark:bg-black/50 light:bg-white/50 flex items-center justify-center z-50`}>
  <div className={`rounded-2xl p-8 max-w-md ${themeClasses.card} ${themeClasses.border.primary}`}>
    <h2 className={`text-2xl font-bold mb-4 ${themeClasses.text.primary}`}>Заголовок</h2>
    <p className={`mb-6 ${themeClasses.text.secondary}`}>Содержимое</p>
    <button className={themeClasses.button.primary}>
      Закрыть
    </button>
  </div>
</div>
```

## 8️⃣ Badge/Tag Component

### Было:
```tsx
<span className="inline-flex items-center gap-2 px-3 py-1 text-xs text-blue-400 bg-blue-400/10 border border-blue-400/25 rounded-full">
  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
  Активно
</span>
```

### Стало:
```tsx
<span className="inline-flex items-center gap-2 px-3 py-1 text-xs dark:text-blue-400 light:text-blue-600 dark:bg-blue-400/10 light:bg-blue-400/5 dark:border-blue-400/25 light:border-blue-400/30 rounded-full border">
  <span className="w-1.5 h-1.5 rounded-full dark:bg-blue-400 light:bg-blue-600" />
  Активно
</span>
```

## 9️⃣ List Item Component

### Было:
```tsx
<div className="p-4 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800/60 transition-all">
  <h3 className="font-semibold text-white">Название</h3>
  <p className="text-sm text-slate-400">Описание</p>
</div>
```

### Стало:
```tsx
<div className={`p-4 rounded-xl transition-all ${themeClasses.card} hover:dark:bg-slate-800/60 hover:light:bg-slate-100/80 ${themeClasses.border.primary} hover:${themeClasses.border.hover}`}>
  <h3 className={`font-semibold ${themeClasses.text.primary}`}>Название</h3>
  <p className={`text-sm ${themeClasses.text.secondary}`}>Описание</p>
</div>
```

## 🔟 Feature Grid

### Было:
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {features.map((feature) => (
    <div key={feature.id} className="p-8 rounded-2xl border border-slate-700 bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3 mb-4">
        <feature.Icon className="w-6 h-6 text-white" />
      </div>
      <h4 className="font-bold mb-2">{feature.title}</h4>
      <p className="text-sm text-slate-400">{feature.description}</p>
    </div>
  ))}
</div>
```

### Стало:
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {features.map((feature) => (
    <div 
      key={feature.id} 
      className={`p-8 rounded-2xl transition-all ${themeClasses.card} ${themeClasses.border.primary} hover:${themeClasses.border.hover}`}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3 mb-4">
        <feature.Icon className="w-6 h-6 text-white" />
      </div>
      <h4 className={`font-bold mb-2 ${themeClasses.text.primary}`}>{feature.title}</h4>
      <p className={`text-sm ${themeClasses.text.secondary}`}>{feature.description}</p>
    </div>
  ))}
</div>
```

## 🎯 Чек-лист для обновления компонента

- [ ] Заменить `bg-slate-900` на `dark:bg-slate-900 light:bg-white`
- [ ] Заменить `text-white` на `dark:text-white light:text-slate-900`
- [ ] Заменить `border-slate-700` на `dark:border-slate-700 light:border-slate-300`
- [ ] Заменить `text-slate-400` на использование `themeClasses.text.secondary`
- [ ] Заменить `hover:bg-slate-800` на `hover:dark:bg-slate-800 hover:light:bg-slate-100`
- [ ] Добавить `ThemeToggle` в Header
- [ ] Протестировать оба режима в браузере
- [ ] Проверить контрастность текста

## 📋 Быстрые замены для RegEx

Если вы используете VS Code Find and Replace, можете использовать эти паттерны:

```
Find: bg-\[#080d14\]
Replace: dark:bg-[#080d14] light:bg-white

Find: text-white\b
Replace: dark:text-white light:text-slate-900

Find: border-slate-700\b
Replace: dark:border-slate-700 light:border-slate-300

Find: bg-slate-900
Replace: dark:bg-slate-900 light:bg-white

Find: text-slate-400
Replace: dark:text-slate-400 light:text-slate-600
```

---

**Дата:** 14 апреля 2026  
**Версия:** 1.0  
**Статус:** Ready to use ✅
