import os
from fastapi import APIRouter, Header, Body
from jose import jwt

from services.recommendation_service import get_top_3_related_titles

router = APIRouter()

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")


@router.post("/recommend")
async def recommend_papers(
    payload: dict = Body(...),
    authorization: str = Header(None)
):
    query = payload.get("query", "").strip()
    user_email = "guest@example.com"

    if authorization:
        try:
            token = authorization.replace("Bearer ", "")
            decoded = jwt.decode(
                token,
                SUPABASE_JWT_SECRET,
                algorithms=["HS256"],
                options={"verify_aud": False}
            )
            user_email = decoded.get("email", user_email)
        except Exception as e:
            print("JWT Decode Error:", e)

  
    print("QUERY RECEIVED:", query[:200])

    if not query or len(query) < 50:
        return {
            "recommendations": ["Query too short. Please upload a proper document."]
        }

    try:
        titles = get_top_3_related_titles(query, user_email)
    except Exception as e:
        print("Recommendation Error:", e)
        return {"recommendations": ["Failed to fetch recommendations"]}

    return {
        "recommendations": titles if titles else ["No related papers found"]
    }