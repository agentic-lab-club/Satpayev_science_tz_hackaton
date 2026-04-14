import uuid
from sqlalchemy import Column, String, Float, Text, DateTime, JSON
from datetime import datetime
from database import Base

class TZAnalysis(Base):
    __tablename__ = "tz_analyses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    filename = Column(String(255), index=True)
    status = Column(String(50), default="pending")  # pending, processing, completed, error
    
    # AI Results
    scores = Column(JSON, nullable=True)  # Dictionary of scores
    total_score = Column(Float, nullable=True)
    issues = Column(JSON, nullable=True)  # List of issues
    recommendations = Column(JSON, nullable=True) # List of recommendations
    generated_structure = Column(JSON, nullable=True) # Recommended structure
    
    # Meta
    raw_text = Column(Text, nullable=True)
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, default=datetime.utcnow)
    original_text = Column(Text, nullable=False)
    
    # Решение ИИ
    is_scientific_document = Column(String(10), default="true") # SQLite handles boolean oddly, String is safer or Boolean
    rejection_reason = Column(Text, nullable=True)
    
    # Оценки
    scientific_novelty_score = Column(Float, nullable=True)
    socio_economic_score = Column(Float, nullable=True)
    total_score = Column(Float, nullable=True)
    
    # Полный JSON результат
    raw_analysis_json = Column(JSON, nullable=True)
