from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db import models

def get_history(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.HistoryRecord).order_by(models.HistoryRecord.timestamp.desc()).offset(skip).limit(limit).all()

def create_history_record(db: Session, text: str, url: str, prediction: str, confidence: float):
    db_record = models.HistoryRecord(
        text=text,
        url=url,
        prediction=prediction,
        confidence=confidence
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def get_stats(db: Session):
    total = db.query(models.HistoryRecord).count()
    fake_count = db.query(models.HistoryRecord).filter(models.HistoryRecord.prediction == 'FAKE').count()
    real_count = db.query(models.HistoryRecord).filter(models.HistoryRecord.prediction == 'REAL').count()
    avg_conf = db.query(func.avg(models.HistoryRecord.confidence)).scalar() or 0.0
    
    return {
        "total_analyzed": total,
        "total_fake": fake_count,
        "total_real": real_count,
        "avg_confidence": round(avg_conf, 4)
    }
