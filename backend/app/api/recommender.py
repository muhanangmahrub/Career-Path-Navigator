from fastapi import APIRouter
from app.services import embed_user_persona, faiss_store, predict_job_function, gap_analyzer
from app.core import mlp_vectorizer, selector, model
from pydantic import BaseModel, Field
from app.utils import clean_text

class RecommendationRequest(BaseModel):
    user_persona: str = Field(..., description="A description of the user's professional background and aspirations.")
    top_k: int = Field(10, description="Number of top recommendations to return.")

router = APIRouter()
@router.post("/recommendations/")
async def get_recommendations(request: RecommendationRequest):
    """
    Mendapatkan rekomendasi pekerjaan berdasarkan persona pengguna
    Args:
        request (RecommendationRequest): Body permintaan yang berisi persona pengguna dan nilai top_k.
    Returns:
        dict: Rekomendasi yang mencakup bidang pekerjaan hasil prediksi, hasil pencarian FAISS, serta analisis kesenjangan keterampilan (skill gap analysis).
    """
    user_persona = clean_text(request.user_persona)
    top_k = request.top_k

    # Step 1:Predict job function using classifier
    job_function_labels, job_function_probs = predict_job_function([user_persona], mlp_vectorizer, selector, model)

    # Step 2: Embed the user persona
    query_embedding = embed_user_persona([user_persona])

    # Step 3: Search for similar jobs in Faiss store
    recommendations = faiss_store.search(query_embedding, k=top_k)

    # Step 4: Return skill gap analysis along with recommendations
    skill_gaps = gap_analyzer.analyze(user_persona, recommendations)

    return {
        "recommendations": {
            "predicted_job_field": {
                "labels": job_function_labels,
                "probabilities": job_function_probs.tolist()
            },
            "faiss": recommendations,
            "skill_gap": skill_gaps
        }
    }