from fastapi import APIRouter
from pydantic import BaseModel
from services.idea_service import process_ideas

router = APIRouter()

class IdeaRequest(BaseModel):
    text: str

@router.post("/ideas")
def get_ideas(req: IdeaRequest):
    return process_ideas(req.text)