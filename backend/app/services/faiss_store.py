from app.core import faiss_index, metadata
from app.utils import clean_job_title_location

class FaissStore:
    """
    Penyimpanan FAISS untuk rekomendasi pekerjaan.

    Menyediakan fungsi pencarian lowongan pekerjaan yang serupa berdasarkan embedding.

    Attributes:
        index: Objek indeks FAISS untuk pencarian kemiripan.
        metadata: Daftar metadata lowongan yang sesuai dengan indeks.

    Methods:
        search(query_embedding, k): Mencari k lowongan paling mirip berdasarkan embedding kueri.
    """
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
            job["job_title"] = clean_job_title_location(job["job_title"])
            job["distance"] = float(dist)
            job["similarity"] = float(1 / (1 + dist))  # optional
            results.append(job)

        return results


faiss_store = FaissStore()
