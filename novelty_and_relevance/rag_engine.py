import uuid
import chromadb
from chromadb.utils import embedding_functions

# Создаем in-memory клиент ChromaDB (живет пока работает приложение)
chroma_client = chromadb.Client()

# Используем легковесную локальную модель для кодирования (~80MB)
sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")

def chunk_text(text: str, chunk_size: int = 1500, overlap: int = 300) -> list[str]:
    """Разбивает длинный текст на куски (чанки) с перекрытием (overlap)"""
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        
        # Интеллектуальный разрыв: ищем последний абзац или пробел, чтобы не оборвать слово на полуслове
        if end < len(text):
            last_space = text.rfind(' ', start, end)
            if last_space != -1 and last_space > start + chunk_size // 2:
                end = last_space
                
        chunks.append(text[start:end])
        # Отступаем назад на overlap символов, чтобы контекст не терялся на разрыве
        start = end - overlap
        if start >= len(text):
            break
    return chunks

def extract_key_information(text: str) -> str:
    """
    RAG Pipeline:
    1. Если текст мал, отдает сразу.
    2. Если велик, чанкует, векторизует и достает только абзацы про новизну и экономику.
    """
    # Если текст меньше 10 000 символов, Gemini и так моментально его 'проглотит' без RAG
    if len(text) < 10000:
        return text

    print(f"[RAG] Запуск векторного поиска для документа размером {len(text)} символов...")
    
    collection_name = f"doc_{uuid.uuid4().hex}"
    collection = chroma_client.create_collection(
        name=collection_name, 
        embedding_function=sentence_transformer_ef
    )
    
    chunks = chunk_text(text)
    ids = [str(i) for i in range(len(chunks))]
    
    # Сохраняем в Векторную БД (прогоняем через all-MiniLM-L6-v2)
    collection.add(documents=chunks, ids=ids)
    
    # Формируем целевые запросы эксперта
    novelty_query = "научная новизна, методы исследования, инновации, актуальность проблемы, алгоритмы, сравнение с аналогами, разработанные схемы"
    economy_query = "социально-экономический эффект, бюджет, затраты, окупаемость, сэкономленное время, рабочие места, KZT, тенге, рентабельность, коммерциализация"
    
    # Ищем самые похожие по смыслу чанки
    results = collection.query(
        query_texts=[novelty_query, economy_query],
        n_results=7 # Берем Топ-7 лучших результатов по каждой теме
    )
    
    # Склеиваем отфильтрованные куски
    unique_documents = set()
    for query_result in results['documents']:
        for doc in query_result:
            unique_documents.add(doc)
            
    # Удаляем временную коллекцию, чтобы не мусорить память сервера
    chroma_client.delete_collection(name=collection_name)
    
    rag_text = "\n\n...[RAG: ФРАГМЕНТ ИЗ ТЗ]...\n".join(list(unique_documents))
    print(f"[RAG] Успешно! Текст сжат с {len(text)} до {len(rag_text)} символов (Оставлена только суть).")
    
    return rag_text
