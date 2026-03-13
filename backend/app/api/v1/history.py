from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.response import HistoryResponse
from app.db import crud

router = APIRouter()

@router.get("/", response_model=List[HistoryResponse])
def get_history(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    records = crud.get_history(db, skip=skip, limit=limit)
    return records
