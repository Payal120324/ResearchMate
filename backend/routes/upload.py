import os
from fastapi import APIRouter, UploadFile, File, Header
from jose import jwt
import uuid
from utils.rag_pipeline import create_vector_store
from utils.pdf_parser import extract_text

router = APIRouter()
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...), 
    authorization: str = Header(None)
):
    user_id = "guest_user"
    if authorization:
        try:
            token = authorization.replace("Bearer ", "")
            decoded = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"], options={"verify_aud": False})
            user_id = decoded.get("sub", user_id) 
        except:
            pass 

    
    contents = await file.read()
    full_text = extract_text(contents)
    doc_id = str(uuid.uuid4())

   
    create_vector_store(full_text, user_id, doc_id)

    preview = full_text[:1000] + "..." if full_text else "No text extracted"
    return {
        "message": "Uploaded & indexed",
        "doc_id": doc_id,
        "user_id": user_id,
        "preview": preview
    }
