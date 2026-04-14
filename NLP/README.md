# TZ Analysis MVP

MVP-прототип для анализа и улучшения технических заданий научных и инновационных проектов в формате Jupyter Notebook.

## Что умеет

- загружает `PDF`, `DOCX`, `TXT`;
- нормализует документ и строит внутреннюю модель;
- выделяет разделы и сравнивает их с эталонной структурой ТЗ;
- ищет структурные и смысловые проблемы;
- считает explainable score `0-100`;
- генерирует рекомендации и две версии улучшенного текста:
  - `targeted_rewrite`
  - `full_rewrite`
- извлекает сущности:
  - требования
  - сроки
  - KPI
  - ожидаемые результаты
- поддерживает human-in-the-loop подтверждение сущностей через notebook;
- сохраняет артефакты в локальные `CSV`, `JSON`, `MD`.

## Структура

```text
notebooks/
  tz_analysis_demo.ipynb
src/
  tz_mvp/
    core/
    ingestion/
    structuring/
    semantics/
    scoring/
    rewriting/
    extraction/
    reporting/
    prompts/
    schemas/
    utils/
    ui/
data/
  demo/
outputs/
tests/
```

## Быстрый старт

1. Установить зависимости:

```bash
pip install -r requirements.txt
```

2. При желании задать `GROQ_API_KEY`.

LLM-слой опционален. Без ключа система работает в эвристическом режиме, достаточном для hackathon demo.

3. Запустить Jupyter:

```bash
jupyter lab
```

4. Открыть `notebooks/tz_analysis_demo.ipynb` и выполнить notebook сверху вниз.

## Основные сценарии

- загрузка demo-документа из `data/demo/demo_tz.txt`;
- замена пути на любой `PDF/DOCX/TXT`;
- просмотр структурного анализа и score;
- просмотр замечаний и rewrite-версий;
- подтверждение извлеченных сущностей;
- экспорт результатов в `outputs/<analysis_id>/`.

## Тесты

```bash
python -m pytest tests
```

## Примечания

- `DOCX` читается через `python-docx`, а при его отсутствии есть fallback через `zip/xml`.
- `PDF` читается через `pypdf` или `pdfplumber`. OCR запускается только если доступны `pytesseract` и `pdf2image`.
- Все результаты хранятся в памяти notebook-сессии через `SessionStore` и могут быть дополнительно сохранены в локальный JSON.
