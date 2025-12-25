from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import json
import os
import time
from dotenv import load_dotenv

from database import engine, get_db, Base
from models import ResumeAnalysis
from utils import extract_text_from_pdf, analyze_resume_with_bailian
from logger import logger

load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Resume Analyzer")

# Request Logging Middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"{request.method} {request.url.path} - Status: {response.status_code} - Time: {process_time:.4f}s")
    return response

# CORS Configuration
origins = os.getenv("CORS_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Resume Analyzer API"}

@app.post("/api/analyze")
async def analyze_resume(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    try:
        # Read file content
        file_content = await file.read()
        
        # Extract text
        text = extract_text_from_pdf(file_content)
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")

        # Analyze with AI
        analysis_result = analyze_resume_with_bailian(text)

        # Save to database
        db_record = ResumeAnalysis(
            filename=file.filename,
            name=analysis_result.get("name", "Unknown"),
            email=analysis_result.get("email", "Unknown"),
            ai_skills=json.dumps(analysis_result.get("ai_skills", []), ensure_ascii=False),
            role_match_score=analysis_result.get("role_match_score", 0),
            project_depth_score=analysis_result.get("project_depth_score", 0),
            suggestions=json.dumps(analysis_result.get("suggestions", []), ensure_ascii=False)
        )
        db.add(db_record)
        db.commit()
        db.refresh(db_record)

        return {
            "success": True,
            "data": analysis_result
        }

    except Exception as e:
        logger.error(f"Error processing resume: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting AI Resume Analyzer API...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
