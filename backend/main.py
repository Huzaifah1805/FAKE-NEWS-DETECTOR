from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import detect, history, stats
from app.db.database import engine, Base
from app.db import models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Fake News Detector API",
    description="API for detecting fake news using ML",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, change this to the React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(detect.router, prefix="/api/v1", tags=["detect"])
app.include_router(history.router, prefix="/api/v1", tags=["history"])
app.include_router(stats.router, prefix="/api/v1", tags=["stats"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Fake News Detector API"}
