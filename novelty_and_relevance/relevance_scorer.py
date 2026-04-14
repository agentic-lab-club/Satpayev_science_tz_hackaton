import json
from typing import List, Dict, Any
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

def score_by_embeddings(data: List[Dict[str, Any]], query: str, model_name: str = 'all-MiniLM-L6-v2') -> List[Dict[str, Any]]:
    """
    Вариант 1 (Быстрый и нейросетевой): 
    Использует huggingface эмбеддинги для поиска смыслового сходства (даже если слова не совпадают напрямую).
    
    :param data: Список JSON объектов с полями 'id' и 'text_ru'
    :param query: Текст-эталон или трендовый запрос
    :return: Тот же список, но с полем relevance_score, отсортированный по убыванию
    """
    if not data or not query:
        return []

    # Инициализация модели (скачается в кэш 1 раз). all-MiniLM-L6-v2 отлично работает с семантикой.
    model = SentenceTransformer(model_name)
    
    # Безопасное извлечение. Если текста нет, подменяем на пробел, чтобы не упал энкодер
    texts = [str(item.get("text_ru", "")) for item in data]
    texts = [t if t.strip() else " " for t in texts]
    
    # Превращаем тексты в векторы
    query_vector = model.encode([query])
    doc_vectors = model.encode(texts)
    
    # Считаем косинусное сходство (от -1.0 до 1.0)
    similarities = cosine_similarity(query_vector, doc_vectors)[0]
    
    results = []
    for item, score in zip(data, similarities):
        new_item = item.copy()
        # Корректируем отрицательные значения в 0.0 (совершенно не похожи)
        new_item["relevance_score"] = round(max(0.0, float(score)), 4)
        results.append(new_item)
        
    # Сортировка по убыванию актуальности
    return sorted(results, key=lambda x: x["relevance_score"], reverse=True)


def score_by_keywords(data: List[Dict[str, Any]], keywords: List[str]) -> List[Dict[str, Any]]:
    """
    Вариант 2 (Классический TF-IDF): 
    Считает статистический вес на основе прямого совпадения трендовых слов.
    Работает мгновенно, не требует видеокарт и нейросетей, требует точного вхождения корней.
    """
    if not data or not keywords:
        return []

    texts = [str(item.get("text_ru", "")) for item in data]
    texts = [t if t.strip() else " " for t in texts]
    query_str = " ".join(keywords)
    
    # TF-IDF сработает только на те слова, которые есть и там и там
    # Обучаем векторизатор на всех документах + запросе
    try:
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform([query_str] + texts)
        
        query_vector = tfidf_matrix[0:1]
        doc_vectors = tfidf_matrix[1:]
        
        similarities = cosine_similarity(query_vector, doc_vectors)[0]
    except ValueError:
        # Если ни одно слово из документов не совпадает с логикой TF-IDF (например, одни стоп-слова)
        similarities = [0.0] * len(data)

    results = []
    for item, score in zip(data, similarities):
        new_item = item.copy()
        new_item["relevance_score"] = round(max(0.0, float(score)), 4)
        results.append(new_item)
        
    return sorted(results, key=lambda x: x["relevance_score"], reverse=True)


if __name__ == "__main__":
    import os
    
    # ---------------------------------------------------------
    # ТЕСТОВЫЙ ЗАПУСК - Чтение твоих реальных файлов
    # ---------------------------------------------------------
    combined_projects = []
    
    # Файл 1: Гранты
    try:
        with open("granttyk_karzhylandyru_shenber1-v4.json", "r", encoding="utf-8") as f:
            grants = json.load(f)
            for i, p in enumerate(grants):
                # Извлекаем поле 'name'
                if "name" in p:
                    combined_projects.append({"id": f"grant_{i}", "text_ru": p["name"]})
    except FileNotFoundError:
        print("Файл granttyk... не найден")

    # Файл 2: Международные организации
    try:
        with open("halykaralyk_karzhy_uiymdarymen5-v8.json", "r", encoding="utf-8") as f:
            orgs = json.load(f)
            for i, p in enumerate(orgs):
                # Извлекаем поле 'naimenovanie_proekta'
                if "naimenovanie_proekta" in p:
                    combined_projects.append({"id": f"org_{i}", "text_ru": p["naimenovanie_proekta"]})
    except FileNotFoundError:
        print("Файл halykaralyk... не найден")

    if not combined_projects:
        print("Не удалось загрузить данные. Проверьте пути к JSON!")
        exit()

    trend_query = "инновации в образовании, обучение и интеллектуальный анализ, статистика"
    trend_keywords = ["инновация", "обучение", "интеллектуальный", "статистика"]

    print("=" * 60)
    print(f"Загружено проектов из JSON файлов: {len(combined_projects)}")
    print(f"Эталонный запрос: '{trend_query}'\n")
    print("ВАРИАНТ 1: Оценка эмбеддингами (Sentence-Transformers)\n")
    
    ai_scored = score_by_embeddings(combined_projects, query=trend_query)
    for p in ai_scored:
        print(f"[Score: {p['relevance_score']:.4f}] {p['text_ru'][:80]}...")
