from fastapi import FastAPI
from app.api.recommender import router as recommender_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Career Path Navigator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the recommender router
app.include_router(
    recommender_router,
    prefix="/api",
    tags=["recommendations"]
)
