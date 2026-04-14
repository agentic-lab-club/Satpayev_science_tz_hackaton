# API для фронтенда – примеры запросов и ответов

**Базовый URL:** `http://localhost:3000` (или ваш сервер)  
**Формат:** JSON, `Content-Type: application/json`  
**Авторизация:** пока отключена (тестируйте без токена). Позже добавите заголовок `Authorization: Bearer <token>`.


## 1. Пациенты (`/patients`)

### Создать пациента (POST)
```json
// запрос
{
  "full_name": "Анна Смирнова",
  "date_of_birth": "1990-05-15",
  "gender": "female",
  "phone": "+7 999 123-45-67",
  "email": "anna@example.com",
  "address": "Москва, ул. Ленина 1",
  "risk_level": "medium",
  "status": "active",
  "notes": "Первичный приём"
}

// ответ (успех)
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "external_id": "#0123",
    "full_name": "Анна Смирнова",
    "date_of_birth": "1990-05-15",
    "age": 35,
    "gender": "female",
    "phone": "+7 999 123-45-67",
    "email": "anna@example.com",
    "address": "Москва, ул. Ленина 1",
    "risk_level": "medium",
    "status": "active",
    "notes": "Первичный приём",
    "created_at": "2026-04-04T10:00:00Z",
    "updated_at": "2026-04-04T10:00:00Z"
  }
}
```

### Обновить пациента (PATCH)
```json
// запрос (только изменяемые поля)
{
  "phone": "+7 999 987-65-43",
  "risk_level": "high"
}

// ответ – обновлённый объект пациента
```

### Получить список пациентов (GET)
```
GET /patients?search=Анна&risk=high&status=active&page=1&limit=20
```
```json
// ответ
{
  "success": true,
  "data": [
    {
      "id": "550e8400-...",
      "external_id": "#0123",
      "full_name": "Анна Смирнова",
      "age": 35,
      "risk_level": "high",
      "status": "active",
      "diagnosis": "Тяжёлое депрессивное расстройство",
      "ai_score": 92,
      "last_session": "2026-04-01T09:00:00Z",
      "next_appointment": "2026-04-10T10:00:00Z"
    }
  ],
  "meta": {
    "total": 127,
    "page": 1,
    "limit": 20,
    "pages": 7
  }
}
```

### Статистика для шапки (GET /patients/stats)
```json
// ответ
{
  "success": true,
  "data": {
    "total": 127,
    "critical": 15,
    "attention": 34,
    "stable": 78
  }
}
```

---

## 2. Диагнозы (`/diagnoses`)

### Добавить диагноз пациенту (POST)
```json
// запрос
{
  "patient_id": "550e8400-e29b-41d4-a716-446655440000",
  "diagnosis_text": "Тяжёлое депрессивное расстройство",
  "icd_code": "F32.2",
  "risk_level": "high",
  "accuracy": 95
}

// ответ
{
  "success": true,
  "data": {
    "id": "660e8400-...",
    "patient_id": "550e8400-...",
    "diagnosis_text": "Тяжёлое депрессивное расстройство",
    "icd_code": "F32.2",
    "risk_level": "high",
    "accuracy": 95,
    "status": "pending",
    "created_at": "2026-04-04T11:00:00Z"
  }
}
```

### Подтвердить диагноз (PATCH /diagnoses/{id}/confirm)
```json
// ответ – статус меняется на "confirmed"
```

### Получить список диагнозов (GET)
```
GET /diagnoses?status=pending&page=1&limit=20
```
```json
// ответ
{
  "success": true,
  "data": [
    {
      "id": "660e8400-...",
      "patient": {
        "id": "550e8400-...",
        "external_id": "#0123",
        "full_name": "Анна Смирнова",
        "age": 35
      },
      "diagnosis_text": "Тяжёлое депрессивное расстройство",
      "icd_code": "F32.2",
      "risk_level": "high",
      "accuracy": 95,
      "status": "pending",
      "created_at": "2026-04-04T11:00:00Z"
    }
  ],
  "meta": { ... }
}
```

### Статистика диагнозов (GET /diagnoses/stats)
```json
{
  "success": true,
  "data": {
    "total": 247,
    "pending": 24,
    "critical": 8,
    "confirmed": 215,
    "ai_accuracy": 94.7
  }
}
```

---

## 3. Приёмы (`/appointments`)

### Создать приём (POST)
```json
// запрос
{
  "patient_id": "550e8400-...",
  "doctor_id": "770e8400-...",   // опционально
  "start_time": "2026-04-10T09:00:00Z",
  "end_time": "2026-04-10T10:00:00Z",
  "type": "follow_up",
  "notes": "Контроль состояния"
}

// ответ
{
  "success": true,
  "data": {
    "id": "880e8400-...",
    "patient": {
      "id": "550e8400-...",
      "external_id": "#0123",
      "full_name": "Анна Смирнова",
      "risk_level": "high"
    },
    "doctor": { "id": "770e8400-...", "full_name": "Дмитрий В." },
    "start_time": "2026-04-10T09:00:00Z",
    "end_time": "2026-04-10T10:00:00Z",
    "status": "scheduled",
    "type": "follow_up",
    "notes": "Контроль состояния"
  }
}
```

### Приёмы на сегодня (GET /appointments/today)
```json
{
  "success": true,
  "data": [ ... ],
  "count": 6
}
```

---

## 4. Мониторинг (`/monitoring`)

### Добавить показатели (POST)
```json
// запрос
{
  "patient_id": "550e8400-...",
  "anxiety_level": 85,
  "mood_level": 30,
  "sleep_hours": 5.5,
  "steps": 4500,
  "heart_rate": 88
}

// ответ – созданная запись
```

### Лента мониторинга (GET /monitoring/live?limit=10)
```json
{
  "success": true,
  "data": [
    {
      "patient": {
        "id": "550e8400-...",
        "external_id": "#0123",
        "full_name": "Анна Смирнова",
        "risk_level": "high"
      },
      "anxiety_level": 85,
      "mood_level": 30,
      "sleep_hours": 5.5,
      "steps": 4500,
      "heart_rate": 88,
      "recorded_at": "2026-04-04T12:00:00Z"
    }
  ]
}
```

### Статистика мониторинга (GET /monitoring/stats)
```json
{
  "success": true,
  "data": {
    "active_sessions": 23,
    "online_patients": 12,
    "alerts": 8,
    "stable": 104,
    "avg_anxiety": 47,
    "avg_sleep": 5.2,
    "avg_activity": 32,
    "avg_social": 18,
    "ai_risk_forecast": 3
  }
}
```

---

## 5. События (Events) – лента истории

### Создать событие (POST /events)
```json
// запрос
{
  "patient_id": "550e8400-...",
  "type": "critical_alert",
  "title": "Резкий рост тревожности",
  "description": "Тревога 85%",
  "severity": "critical"
}

// ответ – созданное событие
```

### Получить события (GET /events)
```
GET /events?severity=critical&page=1
```
```json
{
  "success": true,
  "data": [
    {
      "id": "990e8400-...",
      "patient": {
        "id": "550e8400-...",
        "external_id": "#0123",
        "full_name": "Анна Смирнова"
      },
      "type": "critical_alert",
      "title": "Резкий рост тревожности",
      "description": "Тревога 85%",
      "severity": "critical",
      "created_at": "2026-04-04T13:00:00Z"
    }
  ],
  "meta": { ... }
}
```

### Статистика событий (GET /events/stats)
```json
{
  "success": true,
  "data": {
    "total": 1284,
    "critical": 23,
    "warnings": 147,
    "ai_events": 856,
    "comments": 258
  }
}
```

---

## 6. Аналитика (Analytics)

### Обзор (GET /analytics/overview?period=week)
```json
{
  "success": true,
  "data": {
    "avg_sleep": 5.8,
    "active_patients": 89,
    "total_patients": 127,
    "therapy_effectiveness": 76,
    "avg_anxiety": 47,
    "ai_accuracy": 94.7
  }
}
```

### Тренды (GET /analytics/trends?period=week)
```json
{
  "success": true,
  "data": [
    { "week": 1, "anxiety": 65, "mood": 39 },
    { "week": 2, "anxiety": 48, "mood": 29 },
    { "week": 3, "anxiety": 52, "mood": 35 }
  ]
}
```

### Распределение диагнозов (GET /analytics/diagnoses-distribution)
```json
{
  "success": true,
  "data": [
    { "label": "Депрессивные расстройства", "percent": 42, "count": 53 },
    { "label": "Тревожные расстройства", "percent": 31, "count": 39 },
    { "label": "Биполярные расстройства", "percent": 12, "count": 15 },
    { "label": "ПТСР", "percent": 8, "count": 10 },
    { "label": "Другие", "percent": 7, "count": 10 }
  ]
}
```

### Прогнозы (GET /analytics/predictions) – пока заглушка
```json
{
  "success": true,
  "data": [
    { "type": "crisis", "title": "Риск кризиса", "count": 3, "patients": ["Анна С.", "Ольга М."] },
    { "type": "medication", "title": "Пропуски медикаментов", "count": 5, "details": "Требуется напоминание" },
    { "type": "improvement", "title": "Улучшение", "count": 8, "details": "Возможна коррекция терапии" }
  ]
}
```

---

## 7. Дашборд (Dashboard)

### Статистика главной страницы (GET /dashboard/stats)
```json
{
  "success": true,
  "data": {
    "total_patients": 127,
    "new_patients_week": 12,
    "attention_required": 15,
    "attention_today": 5,
    "diagnoses_pending": 24,
    "diagnoses_new_today": 8,
    "ai_accuracy": 94.7,
    "ai_accuracy_change": 2.1,
    "ai_insights": {
      "critical": { "count": 3, "text": "У 3 пациентов выявлен риск суицидальных мыслей" },
      "warning": { "count": 5, "text": "5 пациентов пропускают приём препаратов" },
      "positive": { "count": 8, "text": "8 пациентов показывают устойчивое улучшение" }
    }
  }
}
```

## Важно
- **Все даты и время** передавайте в формате ISO 8601 (`2026-04-10T09:00:00Z`).
- **Опциональные поля** можно не передавать – сервер установит значения по умолчанию.
- **Обязательные поля** указаны в примерах (например, `full_name` для пациента, `diagnosis_text` для диагноза).
