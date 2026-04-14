# Dashboard Components Structure

## Структура файлов

```
dashboard/
├── page.tsx                    # Главная страница (root component)
└── components/
    ├── types.ts               # Типы и интерфейсы
    ├── constants.ts           # Константы и mock данные
    ├── helpers.ts             # Утилита функции
    ├── shared-components.tsx  # Общие компоненты (StatusBadge, FormatIcon, ScoreRing)
    ├── StatCard.tsx          # Карточка статистики
    ├── DashboardHeader.tsx    # Заголовок + Hero секция
    ├── DocumentList.tsx       # Список документов с поиском и фильтром
    ├── QuickTips.tsx         # Быстрые советы
    ├── ChatWidget.tsx        # Чат с ИИ
    └── UploadModal.tsx       # Модальное окно загрузки файлов
```

## Компоненты

### `page.tsx` (Main Dashboard)
Главная страница, собирает все компоненты вместе. Управляет состояниями:
- `chatOpen` - открыто ли окно чата
- `uploadModalOpen` - открыто ли модальное окно загрузки
- `filterStatus` - фильтр по статусу
- `search` - текст поиска

### `types.ts`
Определяет все TypeScript типы и интерфейсы:
- `AnalysisStatus` - статус анализа
- `UploadStage` - этап загрузки
- `ProjectType` - тип проекта
- `TZDocument` - документ
- `ChatMessage` - сообщение чата

### `constants.ts`
Содержит:
- `mockDocuments` - данные тестовых документов
- `mockChatHistory` - история чата
- `PROJECT_TYPES` - типы проектов с цветами и описаниями
- `FORMAT_META` - метаданные форматов файлов
- `STAGE_STEPS` - этапы загрузки
- `ALLOWED_EXTENSIONS` и `ALLOWED_MIME` - разрешённые форматы

### `helpers.ts`
Утилита функции:
- `formatDate()` - форматирование дат
- `formatBytes()` - форматирование размера файлов
- `getExt()` - получение расширения файла
- `isAllowed()` - проверка разрешённого формата
- `scoreColor()` - цвет для оценки
- `scoreLabel()` - текст оценки
- `scoreBg()` - фон для оценки

### `shared-components.tsx`
Переиспользуемые компоненты:
- `StatusBadge` - значок статуса анализа
- `FormatIcon` - значок формата файла
- `ScoreRing` - круговой индикатор оценки

### `StatCard.tsx`
Карточка со статистикой (количество документов, средний балл и т.д.)

### `DashboardHeader.tsx`
Заголовок страницы + hero секция с кнопкой загрузки

### `DocumentList.tsx`
Список документов с:
- Поиском по названию
- Фильтром по статусу
- Отображением всех деталей (формат, дата, размер, баллы)

### `QuickTips.tsx`
3 совета для повышения качества документов

### `ChatWidget.tsx`
Плавающее окно чата с ИИ:
- История сообщений
- Ввод текста
- Отправка сообщений (по Enter или кнопка)

### `UploadModal.tsx`
Модальное окно загрузки с:
- Drag & Drop зоной
- Выбором типа проекта (8 вариантов)
- Симуляцией загрузки с прогресс-баром
- Плавной анимацией входа/выхода
- Отображением этапов обработки

## Использование

### Добавление нового компонента

1. Создайте файл в `dashboard/components/`
2. Если нужны новые типы - добавьте в `types.ts`
3. Если нужны константы - добавьте в `constants.ts`
4. Импортируйте в `page.tsx`

### Примеры импортов

```tsx
import { AnalysisStatus, TZDocument } from "./components/types";
import { mockDocuments, PROJECT_TYPES } from "./components/constants";
import { formatDate, scoreColor } from "./components/helpers";
import { StatusBadge, ScoreRing } from "./components/shared-components";
```

## Стили

Все компоненты используют Tailwind CSS с кастомной цветовой схемой:
- Primary: `#080d14` (background)
- Accent: `amber-400` (buttons, highlights)
- Success: `emerald-400`
- Warning: `amber-400`
- Error: `rose-400`

## Mock Data

Все данные находятся в `constants.ts`. Для подключения реального API:

1. Замените `mockDocuments` на API call
2. Замените `mockChatHistory` на запрос истории чата
3. Обновите функции загрузки в `UploadModal.tsx`

## Анимации

- **Модальное окно**: Scale + Fade (300ms)
- **Backdrop**: Fade (300ms)
- **Загрузка**: Спинер 180ms + прогресс-бар
- **Hover эффекты**: 150ms transition
