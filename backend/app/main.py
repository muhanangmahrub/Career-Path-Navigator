from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import router as recommender_router

app = FastAPI(title="Career Path Navigator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {
        "status": "ok",
        "service": "Career Path Navigator API"
    }

@app.on_event("startup")
def startup_event():
    print("🚀 Career Path Navigator API is starting...")

app.include_router(
    recommender_router,
    prefix="/api",
    tags=["recommendations"]
)
