import joblib
import faiss
import os
import pickle
from keras import models

# Define paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "..", "models")

# Load MLP Classifier artifacts
artifacts = joblib.load(os.path.join(MODEL_DIR, "text_preprocessor.joblib"))
mlp_vectorizer = artifacts["vectorizer"]
selector = artifacts["selector"]
model = models.load_model(os.path.join(MODEL_DIR, "mlp_model.keras"))

# Load Faiss index and metadata
faiss_index = faiss.read_index(os.path.join(MODEL_DIR, "faiss_role_index.idx"))
with open(os.path.join(MODEL_DIR, "job_metadata.bin"), "rb") as f:
    metadata = pickle.load(f)

# Load global feature importance dictionary
with open(os.path.join(MODEL_DIR, "global_importance.pkl"), "rb") as f:
    global_importance_dict = pickle.load(f)
with open(os.path.join(MODEL_DIR, "tfidf.pkl"), "rb") as f:
    vectorizer = joblib.load(f)

