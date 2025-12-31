from fastapi import FastAPI
from app.api.recommender import router as recommender_router

app = FastAPI(title="Career Path Navigator API")

# Include the recommender router
app.include_router(
    recommender_router,
    prefix="/api",
    tags=["recommendations"]
)
