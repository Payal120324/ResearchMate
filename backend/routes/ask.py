from fastapi import APIRouter
from pydantic import BaseModel
from utils.rag_pipeline import answer_query

router = APIRouter()

class AskRequest(BaseModel):
    question: str
    user_id: str
    doc_id: str

@router.post("/ask")
def ask(req: AskRequest):
    answer = answer_query(req.question, req.user_id, req.doc_id)
    return {"answer": answer}