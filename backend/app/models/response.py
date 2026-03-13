from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class DetectResponse(BaseModel):
    prediction: str
    confidence: float
    scraped_text: Optional[str] = None

class HistoryResponse(BaseModel):
    id: int
    text: str
    url: Optional[str] = None
    prediction: str
    confidence: float
    timestamp: datetime

    class Config:
        from_attributes = True

class StatsResponse(BaseModel):
    total_analyzed: int
    total_fake: int
    total_real: int
    avg_confidence: float
