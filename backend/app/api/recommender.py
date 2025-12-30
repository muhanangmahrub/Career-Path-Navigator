from fastapi import APIRouter
from app.services.embedding import embed_user_persona
from app.services.faiss_store import faiss_store
from app.services.classifier import predict_job_function, vectorizer, selector, model

router = APIRouter()
@router.post("/recommendations/")
async def get_recommendations(user_persona: str, top_k: int = 10):
    """
    Get job recommendations based on user persona
    """
    # Step 1:Predict job function using classifier

    job_function_labels, job_function_probs = predict_job_function([user_persona], vectorizer, selector, model)

    # Step 2: Embed the user persona
    query_embedding = embed_user_persona([user_persona])

    # Step 3: Search for similar jobs in Faiss store
    recommendations = faiss_store.search(query_embedding, k=top_k)

    return {
        "recommendations": {
            "faiss": recommendations,
            "predicted_job_field": {
                "labels": job_function_labels,
                "probabilities": job_function_probs.tolist()
            }
        }
    }