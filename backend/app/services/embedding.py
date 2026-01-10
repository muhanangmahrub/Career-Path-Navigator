import numpy as np
from sentence_transformers import SentenceTransformer

MODEL_NAME = "paraphrase-multilingual-MiniLM-L12-v2"
model = SentenceTransformer(MODEL_NAME)

def embed_user_persona(text: str) -> np.ndarray:
    """
    Membuat embedding dari teks persona pengguna.

    Args:
        text (str): Deskripsi persona pengguna.

    Returns:
        np.ndarray: Vektor embedding dari teks input.
    """
    return model.encode(text, show_progress_bar=True, batch_size=64, convert_to_numpy=True)
