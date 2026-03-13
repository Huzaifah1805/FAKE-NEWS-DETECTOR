from sqlalchemy import Column, Integer, String, Float, DateTime
from app.db.database import Base
from datetime import datetime, timezone

class HistoryRecord(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)
    url = Column(String, nullable=True)
    prediction = Column(String)  # 'FAKE' or 'REAL'
    confidence = Column(Float)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
