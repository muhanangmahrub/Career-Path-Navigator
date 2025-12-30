from app.core.state import faiss_index, metadata

class FaissStore:
    def __init__(self, index=faiss_index, metadata=metadata):
        self.index = index
        self.metadata = metadata

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
