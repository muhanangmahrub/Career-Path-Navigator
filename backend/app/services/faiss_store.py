import faiss
import numpy as np
import pickle
import os

class FaissStore:
    def __init__(self):
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        MODEL_DIR = os.path.join(BASE_DIR, "..", "models")

        self.index = faiss.read_index(
            os.path.join(MODEL_DIR, "faiss_role_index.idx")
        )
        self.role_embeddings = np.load(
            os.path.join(MODEL_DIR, "role_embeddings.npy")
        )
        self.skill_embeddings = np.load(
            os.path.join(MODEL_DIR, "skill_embeddings.npy")
        )
        with open(os.path.join(MODEL_DIR, "job_metadata.bin"), "rb") as f:
            self.metadata = pickle.load(f)

    def search(self, query_embedding, k=10):
        D, I = self.index.search(
            query_embedding, k
        )

        results = []
        for dist, idx in zip(D[0], I[0]):
            job = self.metadata[idx].copy()
            job["distance"] = float(dist)
            job["similarity"] = float(1 / (1 + dist))  # optional
            results.append(job)

        return results


faiss_store = FaissStore()
