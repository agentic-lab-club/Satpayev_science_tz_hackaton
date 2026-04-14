# 🚀 Deployment & Setup Guide

## Быстрый старт на локальной машине

### 1️⃣ Установка зависимостей

```bash
cd /Users/ilassalimov/Projects/satpayev

# Установить npm пакеты
npm install
```

**Требования:**
- Node.js версии 18+ или выше
- npm или yarn пакетный менеджер

### 2️⃣ Запуск на локальной машине

```bash
# Development mode (с горячей перезагрузкой)
npm run dev

# Приложение будет доступно на:
# http://localhost:3000
```

### 3️⃣ Проверка что всё работает

```bash
# Проверить TypeScript ошибки
npm run type-check

# Результат должен быть:
# ✓ No TypeScript errors

# Собрать для production
npm run build

# Результат должен быть:
# ✓ Compiled successfully
# ✓ Generating static pages...
```

---

## 📱 Тестирование в браузере

После запуска `npm run dev`, откройте браузер на `http://localhost:3000`

### Проверить все страницы

1. **Главная страница** - `http://localhost:3000`
   - [ ] Видны кнопки навигации
   - [ ] Все 3 кнопки (Дашборд, Чат, Вход) видны
   - [ ] Клик на кнопку переводит на нужную страницу

2. **Dashboard** - `http://localhost:3000/dashboard`
   - [ ] Загрузиться без ошибок
   - [ ] Видны все компоненты
   - [ ] Работает drag-and-drop область
   - [ ] Видны примеры документов

3. **Chat** - `http://localhost:3000/chat`
   - [ ] Загрузиться без ошибок
   - [ ] Видны 6 примеров вопросов
   - [ ] Можно нажать на пример
   - [ ] Видна кнопка 🗑️ (Clear)
   - [ ] Счетчик символов работает

4. **Auth** - `http://localhost:3000/auth` ← **НОВОЕ!**
   - [ ] Загрузиться без ошибок
   - [ ] Форма Login видна
   - [ ] Кнопка для переключения на Register работает
   - [ ] Поля email и password видны
   - [ ] Поле name появляется только в режиме Register
   - [ ] Checkbox "Помнить меня" видна только в Login
   - [ ] Кнопки Google и GitHub видны
   - [ ] Loading spinner работает при нажатии

---

## 🌐 Развертывание на Vercel

### Вариант 1: Через GitHub (рекомендуется)

```bash
# 1. Инициализировать Git (если еще нет)
git init
git add .
git commit -m "Initial commit: TZ·AI application"

# 2. Загрузить на GitHub
# (создать репозиторий на github.com и загрузить туда)
git remote add origin https://github.com/YOUR_USERNAME/satpayev.git
git branch -M main
git push -u origin main

# 3. На vercel.com:
# - Нажать "New Project"
# - Выбрать GitHub репозиторий
# - Нажать "Deploy"
```

### Вариант 2: Через Vercel CLI

```bash
# 1. Установить Vercel CLI
npm i -g vercel

# 2. Развернуть
vercel

# Будет попрошено:
# - Подтверждение deploy
# - Project settings
# - Framework (выбрать Next.js)
# - Build command (npm run build)

# 3. Готово! URL будет выводиться
```

### Вариант 3: Вручную на другом хостинге

```bash
# 1. Собрать production версию
npm run build

# 2. Стартовать production сборку
npm start

# 3. Приложение будет доступно на порту 3000
# (или настроить в next.config.ts)
```

---

## 🔧 Production Build

### Собрать для production

```bash
# Создать оптимизированную сборку
npm run build

# Результат: .next/ директория с оптимизированным кодом
```

### Запустить production версию

```bash
# Запустить compiled версию (без dev tools)
npm start

# Откроется на http://localhost:3000
# (но это все еще локально)
```

### Проверить production на локальной машине

```bash
# 1. Build
npm run build

# 2. Start production
npm start

# 3. Открыть http://localhost:3000

# 4. Нажать F12 для DevTools - должны быть минимизированные файлы
```

---

## 🌍 Environment Variables (если нужны)

Создать файл `.env.local` в корне проекта:

```bash
# .env.local

# API endpoints (для future backend интеграции)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_API_KEY=your_api_key

# Auth (для будущей auth интеграции)
NEXT_PUBLIC_AUTH_DOMAIN=auth.example.com
NEXT_PUBLIC_AUTH_CLIENT_ID=your_client_id
```

**Примечание:** Переменные с `NEXT_PUBLIC_` будут доступны в браузере!

---

## 🔒 Security Checklist

Перед production деплоем:

- [ ] Удалить все console.log() из кода
- [ ] Добавить HTTPS сертификат
- [ ] Настроить CORS (если есть backend)
- [ ] Включить Content Security Policy
- [ ] Обновить .gitignore (исключить .env.local)
- [ ] Проверить что нет API ключей в коде
- [ ] Включить security headers в next.config.ts

### Пример security headers

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
];
```

---

## 📊 Performance Optimization

### 1. Image Optimization

```typescript
// Использовать Next.js Image компонент
import Image from 'next/image';

<Image
  src="/image.png"
  alt="Description"
  width={100}
  height={100}
/>
```

### 2. Code Splitting

```typescript
// Lazy loading для тяжелых компонентов
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { loading: () => <p>Loading...</p> }
);
```

### 3. Font Optimization

```typescript
// next/font для локальных шрифтов
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

---

## 🧪 Testing & Validation

### TypeScript Type Checking

```bash
# Проверить все type ошибки
npm run type-check

# Должно быть: ✓ No TypeScript errors
```

### Lint Code

```bash
# Проверить код стиль
npm run lint

# Результат: ✓ No ESLint errors
```

### Build Production

```bash
# Полная проверка сборки
npm run build

# Должно быть: ✓ Compiled successfully
```

---

## 📈 Monitoring (для production)

### Добавить Google Analytics

```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXX" />
    </html>
  )
}
```

### Добавить Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

```typescript
// next.config.ts
import { withSentryConfig } from "@sentry/nextjs";

export default withSentryConfig(
  {
    // your existing config
  },
  {
    // Sentry options
    org: "your-org",
    project: "your-project",
  }
);
```

---

## 🐛 Troubleshooting

### Проблема: "Module not found"

```bash
# Решение: переустановить зависимости
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Проблема: "Port 3000 already in use"

```bash
# Решение: Использовать другой порт
npm run dev -- -p 3001
# или
PORT=3001 npm run dev
```

### Проблема: TypeScript ошибки при build

```bash
# Решение: Проверить ошибки
npm run type-check

# Исправить найденные ошибки
```

### Проблема: Build не проходит

```bash
# Решение: Проверить все команды
npm run build          # Check build
npm run type-check     # Check types
npm run lint          # Check linting

# Посмотреть детали ошибки в output
```

---

## 📋 Deployment Checklist

Перед каждым deployment:

- [ ] Все файлы сохранены
- [ ] `npm run type-check` - 0 ошибок
- [ ] `npm run build` - успешно
- [ ] Локально тестировано на `npm start`
- [ ] Все страницы работают
- [ ] Нет console.log() в production коде
- [ ] Environment variables настроены
- [ ] Нет hardcoded API ключей
- [ ] .env.local в .gitignore
- [ ] README обновлен

---

## 📞 Git Workflow

### Первый commit

```bash
# Инициализировать Git
git init

# Добавить все файлы
git add .

# Первый commit
git commit -m "Initial: TZ·AI application

- Phase 1: Modal upload with animations
- Phase 2: Dashboard refactoring to components
- Phase 3: Chat assistant with examples
- Phase 4: Auth page with login/register"

# Создать GitHub репозиторий и загрузить
git remote add origin https://github.com/YOUR_USERNAME/satpayev
git branch -M main
git push -u origin main
```

### Обычные commits

```bash
# Делать after каждого изменения
git add .
git commit -m "Feature: Description"
git push origin main
```

---

## 🎯 Next Steps After Deployment

1. **Настроить Backend API**
   - Создать endpoints для upload, chat, auth
   - Обновить fetch URLs в компонентах

2. **Подключить Database**
   - Выбрать БД (PostgreSQL, MongoDB, etc)
   - Создать schemas для documents, messages, users

3. **Добавить Authentication**
   - Использовать NextAuth.js или Auth0
   - Заменить mock auth на реальную

4. **Интегрировать AI**
   - Подключить OpenAI/Claude API
   - Реализовать streaming responses

5. **Добавить Тестирование**
   - Jest unit tests
   - React Testing Library
   - Playwright e2e tests

---

## 📞 Support & Resources

### Официальная документация
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Деплой
- [Vercel Deployment](https://vercel.com/docs)
- [Self-hosted with Docker](https://nextjs.org/docs/deployment/docker)

---

**Готово к deployment! 🚀**

Приложение полностью готово к production и может быть развернуто в течение минут.
