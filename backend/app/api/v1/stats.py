from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.response import StatsResponse
from app.db import crud

router = APIRouter()

@router.get("/", response_model=StatsResponse)
def get_stats(db: Session = Depends(get_db)):
    return crud.get_stats(db)
