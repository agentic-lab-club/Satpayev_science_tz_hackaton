# MVP-анализатор ТЗ научных и инновационных проектов

Notebook-first MVP для хакатонного демо:

- загрузка `PDF` / `DOCX` / `TXT`;
- нормализация и структурирование ТЗ;
- алгоритмический и AI/NLP-анализ;
- explainable score `0-100`;
- рекомендации и улучшенная версия ТЗ;
- подтверждение извлеченных сущностей в Jupyter;
- экспорт результатов в локальные `JSON` / `CSV` / `Markdown`.

## Структура проекта

```text
project/
  notebooks/
    tz_analysis_demo.ipynb
  src/
    tz_mvp/
      app/
      core/
      extraction/
      ingestion/
      prompts/
      reporting/
      rewriting/
      schemas/
      scoring/
      semantics/
      structuring/
      utils/
  data/
  outputs/
  tests/
  README.md
  requirements.txt
```

## Быстрый старт

1. Создайте окружение Python 3.11+.
2. Установите зависимости:

```bash
pip install -r requirements.txt
```

3. При использовании OpenAI API задайте переменную окружения:

```bash
export OPENAI_API_KEY="your_key"
```

4. Запустите Jupyter:

```bash
jupyter notebook
```

5. Откройте [notebooks/tz_analysis_demo.ipynb](notebooks/tz_analysis_demo.ipynb).

## Что умеет MVP

- ingest документа из пути или `ipywidgets.FileUpload`;
- базовое OCR для PDF при пустом текстовом слое;
- выделение разделов по regex, нумерации и семантическим синонимам;
- проверка обязательных разделов, порядка и наполненности;
- NLP/LLM пайплайны:
  - `detect_ambiguities`
  - `detect_contradictions`
  - `detect_missing_requirements`
  - `extract_requirements`
  - `extract_deadlines`
  - `extract_kpis`
  - `extract_expected_results`
  - `detect_logical_gaps`
  - `classify_sections_semantically`
- прозрачный scoring со штрафами и объяснениями;
- `targeted_rewrite` и `full_rewrite`;
- подтверждение сущностей перед финальным сохранением;
- история запусков внутри notebook-сессии;
- экспорт:
  - `issues.csv`
  - `extracted_entities.csv`
  - `analysis_summary.json`
  - `improved_tz.md`
  - `final_report.md`

## Демо-файлы

- [data/demo_tz_problematic.txt](data/demo_tz_problematic.txt)
- существующие DOCX-шаблоны в `docs/`

## Тесты

```bash
pytest
```

## Ограничения MVP

- эвристический анализ работает офлайн;
- LLM-обогащение включается только при наличии API-ключа;
- PDF OCR требует `pytesseract` и установленный бинарник `tesseract`.
