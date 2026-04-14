import os
import json
import fitz # PyMuPDF
from fastapi import UploadFile, File
from dotenv import load_dotenv
from pydantic import BaseModel, Field, ValidationError
from fastapi import FastAPI, HTTPException, Depends
from openai import AsyncOpenAI
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import engine, Base, get_db
from models import AuditLog
from rag_engine import extract_key_information

# ==========================================
# 0. Инициализация окружения (Dotenv)
# ==========================================
load_dotenv(override=True)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-pro")

if not GEMINI_API_KEY or "вставь_" in GEMINI_API_KEY:
    print("ВНИМАНИЕ: Не настроен GEMINI_API_KEY. Пожалуйста, добавьте его в файл .env")

# ==========================================
# 1. Схемы данных Pydantic 
# ==========================================

class CriterionEvaluation(BaseModel):
    is_present: bool = Field(description="Присутствует ли описание данного критерия в тексте")
    score: int = Field(description="Выставленный балл")
    max_score: int = Field(description="Максимально возможный балл для данного критерия")
    extracted_text: str = Field(description="Цитата или выжимка из текста, подтверждающая оценку")
    found_features: list[str] = Field(description="Найденные конкретные элементы и метрики в тексте")
    missing_elements: list[str] = Field(description="Отсутствующие обязательные элементы (что нужно добавить)")
    improvement_suggestion: str = Field(description="Жесткая, но конструктивная рекомендация по улучшению")

class TZEvaluationResponse(BaseModel):
    is_scientific_document: bool = Field(description="Является ли текст научным ТЗ/проектом (false если это рецепт борща, спам, стихи и т.д.)", default=True)
    rejection_reason: str = Field(description="Если is_scientific_document = false, укажите подробную причину отказа. Иначе пустая строка.", default="")
    scientific_novelty: CriterionEvaluation = Field(description="Оценка критерия 'Научная новизна'")
    socio_economic_effect: CriterionEvaluation = Field(description="Оценка критерия 'Социально-экономический эффект'")
    total_score: int = Field(description="Суммарный балл по двум критериям")
    max_total_score: int = Field(description="Максимально возможный суммарный балл (25)")

class TZRequest(BaseModel):
    tz_text: str = Field(..., title="Текст ТЗ", description="Текст технического задания для оценки")

response_schema_json = TZEvaluationResponse.model_json_schema()

# ==========================================
# 2. Промпт эксперта
# ==========================================

SYSTEM_PROMPT = f"""Ты — Senior ML Backend Engineer, выступающий в роли очень жесткого, но объективного технического аудитора научных проектов.
Твоя задача — проанализировать текст технического задания (ТЗ) и оценить его СТРОГО по двум критериям: "Научная новизна" и "Социально-экономический эффект".

АНТИ-СПАМ ФИЛЬТР:
Сначала реши, является ли переданный текст хотя бы отдаленно научно-техническим или инновационным проектом/ТЗ. 
Если пользователь загрузил кулинарный рецепт, стихи, инструкцию к пылесосу или откровенный спам:
- Установи is_scientific_document = false
- Напиши профессиональную, но суровую причину отказа в rejection_reason
- Поставь 0 во всех баллах.

ПРАВИЛА ОЦЕНКИ И ШТРАФЫ:

1. КРИТЕРИЙ "Научная новизна" (максимально 15 баллов):
   - Ожидание: Описан конкретный метод или алгоритм и его специфика.
   - ШТРАФ (не больше 5/15 баллов): Если в тексте присутствуют только общие слова (например, "инновационный", "уникальный"), но нет описания конкретного метода и отличий от аналогов.

2. КРИТЕРИЙ "Социально-экономический эффект" (максимально 10 баллов):
   - Ожидание: Приведены точные метрики: KZT, проценты, штуки, рабочие места.
   - ШТРАФ (не больше 3/10 баллов): Если точных метрик нет, это расценивается как "вода".

ОГРАНИЧЕНИЕ ФАНТАЗИИ:
КАТЕГОРИЧЕСКИ ЗАПРЕЩАЕТСЯ придумывать цифры и методы за автора в поле improvement_suggestion. Указывай только то, чего не хватает в тексте.

ВАЖНО: ОТВЕТ ДОЛЖЕН БЫТЬ В ФОРМАТЕ JSON, СТОРОГО СООТВЕТСТВУЮЩЕМ ЭТОЙ СХЕМЕ:
{json.dumps(response_schema_json, indent=2, ensure_ascii=False)}
"""

# ==========================================
# 3. Настройка FastAPI и Gemini через OpenAI SDK Endpoint
# ==========================================

app = FastAPI(title="AI TZ Auditor (Gemini Edition)")

# Инициализируем таблицы БД
Base.metadata.create_all(bind=engine)

# Подключаем Gemini API через официальный OpenAI шлюз от Google!
client = AsyncOpenAI(
    api_key=GEMINI_API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

@app.post("/api/v1/evaluate", response_model=TZEvaluationResponse)
async def evaluate_tz_endpoint(request: TZRequest, db: Session = Depends(get_db)):
    if not request.tz_text.strip():
        raise HTTPException(status_code=400, detail="Текст ТЗ не может быть пустым")

    try:
        completion = await client.chat.completions.create(
            model=GEMINI_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"ВЕРНИ ТОЛЬКО VALID JSON ОТВЕТ.\n\nТекст ТЗ:\n{request.tz_text}"}
            ],
            response_format={"type": "json_object"},
            temperature=0.0,
        )
        
        raw_json_response = completion.choices[0].message.content
        result = TZEvaluationResponse.model_validate_json(raw_json_response)
        
        result.max_total_score = 25
        result.scientific_novelty.max_score = 15
        result.socio_economic_effect.max_score = 10
        
        if result.scientific_novelty.score > 15:
            result.scientific_novelty.score = 15
        if result.socio_economic_effect.score > 10:
            result.socio_economic_effect.score = 10
            
        result.total_score = result.scientific_novelty.score + result.socio_economic_effect.score

        # Сохранение в базу данных
        audit_record = AuditLog(
            original_text=request.tz_text,
            is_scientific_document=str(result.is_scientific_document).lower(),
            rejection_reason=result.rejection_reason,
            scientific_novelty_score=result.scientific_novelty.score if result.is_scientific_document else 0,
            socio_economic_score=result.socio_economic_effect.score if result.is_scientific_document else 0,
            total_score=result.total_score if result.is_scientific_document else 0,
            raw_analysis_json=result.model_dump()
        )
        db.add(audit_record)
        db.commit()

        return result

    except ValidationError as e:
        raise HTTPException(status_code=500, detail=f"Ошибка парсинга ответа от ИИ: {e.json()}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка API: {str(e)}")

@app.post("/api/v1/evaluate_file", response_model=TZEvaluationResponse)
async def evaluate_file_endpoint(file: UploadFile = File(...), db: Session = Depends(get_db)):
    text = ""
    try:
        content = await file.read()
        filename_lower = file.filename.lower()
        if filename_lower.endswith(".pdf"):
            doc = fitz.open(stream=content, filetype="pdf")
            for page in doc:
                text += page.get_text("text") + "\n"
        elif filename_lower.endswith(".docx"):
            import io
            from docx import Document
            doc = Document(io.BytesIO(content))
            for para in doc.paragraphs:
                text += para.text + "\n"
        else:
            text = content.decode("utf-8", errors="ignore")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Ошибка чтения файла: {e}")
        
    text = text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Файл пуст или не удалось извлечь текст.")

    # Точечный ВЕКТОРНЫЙ RAG ПОИСК (сжимаем 100 страниц до 10к символов выжимки)
    filtered_text = extract_key_information(text)
    
    try:
        completion = await client.chat.completions.create(
            model=GEMINI_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"ВЕРНИ ТОЛЬКО VALID JSON ОТВЕТ.\n\nТекст ТЗ:\n{filtered_text}"}
            ],
            response_format={"type": "json_object"},
            temperature=0.0,
        )
        
        raw_json_response = completion.choices[0].message.content
        result = TZEvaluationResponse.model_validate_json(raw_json_response)
        
        result.max_total_score = 25
        result.scientific_novelty.max_score = 15
        result.socio_economic_effect.max_score = 10
        
        if result.scientific_novelty.score > 15:
            result.scientific_novelty.score = 15
        if result.socio_economic_effect.score > 10:
            result.socio_economic_effect.score = 10
            
        result.total_score = result.scientific_novelty.score + result.socio_economic_effect.score

        # Сохранение лога в БД
        audit_record = AuditLog(
            original_text=f"[ФАЙЛ: {file.filename}]\n\n{text[:5000]}",
            is_scientific_document=str(result.is_scientific_document).lower(),
            rejection_reason=result.rejection_reason,
            scientific_novelty_score=result.scientific_novelty.score if result.is_scientific_document else 0,
            socio_economic_score=result.socio_economic_effect.score if result.is_scientific_document else 0,
            total_score=result.total_score if result.is_scientific_document else 0,
            raw_analysis_json=result.model_dump()
        )
        db.add(audit_record)
        db.commit()

        return result

    except ValidationError as e:
        raise HTTPException(status_code=500, detail=f"Ошибка валидации Pydantic: {e.json()}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка LLM API: {str(e)}")

@app.get("/api/v1/statistics")
def get_statistics(db: Session = Depends(get_db)):
    total_docs = db.query(AuditLog).count()
    spam_docs = db.query(AuditLog).filter(AuditLog.is_scientific_document == "false").count()
    
    avg_total = db.query(func.avg(AuditLog.total_score)).filter(AuditLog.is_scientific_document == "true").scalar() or 0.0
    avg_novelty = db.query(func.avg(AuditLog.scientific_novelty_score)).filter(AuditLog.is_scientific_document == "true").scalar() or 0.0
    avg_socio = db.query(func.avg(AuditLog.socio_economic_score)).filter(AuditLog.is_scientific_document == "true").scalar() or 0.0
    
    return {
        "total_documents_processed": total_docs,
        "spam_documents_rejected": spam_docs,
        "valid_documents": total_docs - spam_docs,
        "averages_for_valid_docs": {
            "average_total_score": round(avg_total, 2),
            "average_scientific_novelty": round(avg_novelty, 2),
            "average_socio_economic": round(avg_socio, 2)
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("tz_auditor:app", host="0.0.0.0", port=8000, reload=True)
