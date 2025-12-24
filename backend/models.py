from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base
import json

class ResumeAnalysis(Base):
    __tablename__ = "resume_analyses"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    name = Column(String(100))
    email = Column(String(255))
    ai_skills = Column(Text)  # Stored as JSON string
    role_match_score = Column(Integer)
    project_depth_score = Column(Integer)
    suggestions = Column(Text)  # Stored as JSON string
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "name": self.name,
            "email": self.email,
            "ai_skills": json.loads(self.ai_skills) if self.ai_skills else [],
            "role_match_score": self.role_match_score,
            "project_depth_score": self.project_depth_score,
            "suggestions": json.loads(self.suggestions) if self.suggestions else [],
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
