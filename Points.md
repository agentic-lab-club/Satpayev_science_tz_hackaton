# Сервис 2 — Извлечение сущностей из подтверждённых секций

## Вход сервиса 2

Сервис 2 не читает сырой файл напрямую. Он берёт результат сервиса 1 из [LLM.md](LLM.md):
- подтверждённые `sections`;
- `document_id`;
- служебные поля (`parse_status`, метаданные, при необходимости `structure_overview`).

Источник правды для сервиса 2 — **только согласованная структура секций**.

Пример минимального input:

```json
{
  "document_id": "doc_001",
  "sections": [
    {
      "section_id": "sec_2_1",
      "number": "2.1",
      "title": "Цель программы",
      "text": "..."
    },
    {
      "section_id": "sec_4_1",
      "number": "4.1",
      "title": "Прямые результаты",
      "text": "..."
    }
  ]
}
```

---

## Что делает сервис 2 внутри

### 1) Берёт только подтверждённую структуру
- Использует уже очищенные и нормализованные секции из сервиса 1.
- Игнорирует шум парсинга из `raw_text`, если он не привязан к валидной секции.

### 2) Извлекает сущности по типам
Запускает 4 независимых пайплайна:
- `extract_requirements`
- `extract_deadlines`
- `extract_kpis`
- `extract_expected_results`

### 3) Привязывает каждую сущность к разделу
Для каждой извлечённой сущности фиксирует:
- из какого пункта извлечено (`source_section`);
- заголовок пункта (`source_title`);
- исходный фрагмент текста (`raw_value`);
- нормализованное значение (`normalized_value`);
- уверенность модели (`confidence`).

### 4) Отдаёт сущности в виде, готовом к подтверждению
Результат должен быть пригоден:
- к показу пользователю;
- к ручному редактированию;
- к сохранению в JSON/CSV/DataFrame.

У всех сущностей есть статус (`status`), по умолчанию `proposed`.

---

## Output сервиса 2

```json
{
  "document_id": "doc_001",
  "extraction_status": "success",
  "requirements": [
    {
      "entity_id": "req_001",
      "entity_type": "requirement",
      "source_section": "2.1",
      "source_title": "Функциональные требования",
      "raw_value": "Система должна выполнять анализ структуры документа.",
      "normalized_value": "Анализ структуры ТЗ",
      "confidence": 0.96,
      "status": "proposed"
    },
    {
      "entity_id": "req_002",
      "entity_type": "requirement",
      "source_section": "2.1",
      "source_title": "Функциональные требования",
      "raw_value": "Система должна выявлять противоречия.",
      "normalized_value": "Выявление противоречий в ТЗ",
      "confidence": 0.93,
      "status": "proposed"
    }
  ],
  "deadlines": [
    {
      "entity_id": "ddl_001",
      "entity_type": "deadline",
      "source_section": "4.1",
      "source_title": "Сроки",
      "raw_value": "Разработка MVP должна быть завершена до 15 мая 2026 года.",
      "normalized_value": {
        "type": "deadline_date",
        "date": "2026-05-15"
      },
      "confidence": 0.98,
      "status": "proposed"
    }
  ],
  "kpis": [
    {
      "entity_id": "kpi_001",
      "entity_type": "kpi",
      "source_section": "5.2",
      "source_title": "Ожидаемые результаты",
      "raw_value": "Итоговый score качества ТЗ не ниже 80 баллов.",
      "normalized_value": {
        "metric": "score_quality",
        "operator": ">=",
        "target": 80,
        "unit": "points"
      },
      "confidence": 0.91,
      "status": "proposed"
    }
  ],
  "expected_results": [
    {
      "entity_id": "res_001",
      "entity_type": "expected_result",
      "source_section": "5.2",
      "source_title": "Ожидаемые результаты",
      "raw_value": "Результатом является работающий прототип.",
      "normalized_value": "Работающий MVP-прототип системы",
      "confidence": 0.95,
      "status": "proposed"
    },
    {
      "entity_id": "res_002",
      "entity_type": "expected_result",
      "source_section": "5.2",
      "source_title": "Ожидаемые результаты",
      "raw_value": "Результатом является итоговый отчёт.",
      "normalized_value": "Итоговый аналитический отчёт по качеству ТЗ",
      "confidence": 0.90,
      "status": "proposed"
    }
  ],
  "extraction_summary": {
    "requirements_count": 2,
    "deadlines_count": 1,
    "kpis_count": 1,
    "expected_results_count": 2,
    "needs_user_review": true
  }
}
```

---

## Как трактовать output сервиса 2

- `requirements` — что система/проект должна делать (требования).
- `deadlines` — сроки и даты в нормализованном формате.
- `kpis` — измеримые целевые показатели.
- `expected_results` — ожидаемые итоговые результаты.

Ключевые поля качества:
- `confidence` — уверенность извлечения;
- `status` — стадия подтверждения (`proposed` → `approved`/`rejected`);
- `source_section` + `raw_value` — трассируемость до исходного текста.
