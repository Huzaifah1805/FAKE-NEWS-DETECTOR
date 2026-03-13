from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.request import DetectRequest
from app.models.response import DetectResponse
from app.services.detector_service import DetectorService
from app.services.scraper_service import ScraperService
from app.db import crud

router = APIRouter()
detector_service = DetectorService()

@router.post("/", response_model=DetectResponse)
def detect_news(request: DetectRequest, db: Session = Depends(get_db)):
    if not request.text and not request.url:
        raise HTTPException(status_code=400, detail="Provide either text or url")
    
    text_to_analyze = request.text
    scraped_text = None
    
    if request.url:
        try:
            scraped_text = ScraperService.scrape_text_from_url(request.url)
            text_to_analyze = scraped_text
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
            
    if not text_to_analyze:
         raise HTTPException(status_code=400, detail="No text could be extracted or provided.")
         
    prediction, confidence = detector_service.predict(text_to_analyze)
    
    # Save to history
    crud.create_history_record(
        db, 
        text=text_to_analyze[:500] + "..." if len(text_to_analyze) > 500 else text_to_analyze, 
        url=request.url,
        prediction=prediction, 
        confidence=confidence
    )
    
    return DetectResponse(
        prediction=prediction,
        confidence=confidence,
        scraped_text=scraped_text
    )
