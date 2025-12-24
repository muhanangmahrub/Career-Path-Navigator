from fastapi import APIRouter
from app.services.embedding import embed_user_persona
from app.services.faiss_store import faiss_store

router = APIRouter()
@router.post("/recommendations/")
async def get_recommendations(user_persona: str, top_k: int = 10):
    """
    Get job recommendations based on user persona
    """
    # Step 1: Embed the user persona
    query_embedding = embed_user_persona([user_persona])

    # Step 2: Search for similar jobs in Faiss store
    recommendations = faiss_store.search(query_embedding, k=top_k)

    return {"recommendations": recommendations}