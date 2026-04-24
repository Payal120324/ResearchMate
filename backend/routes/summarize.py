from fastapi import APIRouter
from pydantic import BaseModel
from services.summarizer_service import summarize_text
from utils.rag_pipeline import load_vector_store

router = APIRouter()

class SummaryRequest(BaseModel):
    text: str 

@router.post("/summarize")
def summarize(req: SummaryRequest):
    if not req.text.strip():
        return {"summary": "No text provided"}

    summary = summarize_text(req.text)
    return {"summary": summary}
