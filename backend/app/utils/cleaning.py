import re
import unicodedata
import pandas as pd
from functools import lru_cache
from pathlib import Path


def clean_text(text: str) -> str:
    """
    Membersihkan dan menormalkan teks input.

    Fungsi ini melakukan normalisasi Unicode, menyamakan tanda kutip,
    menghapus karakter kontrol, serta merapikan pemisah dan spasi agar
    teks siap digunakan untuk pemrosesan lanjutan (misalnya NLP).

    Proses yang dilakukan meliputi:
    - Normalisasi Unicode (NFKC).
    - Konversi smart quotes menjadi tanda kutip standar.
    - Penghapusan karakter kontrol non-cetak.
    - Penggantian newline dan tab menjadi spasi.
    - Penghapusan bullet point dan pemisah tidak umum.
    - Normalisasi spasi berlebih.

    Args:
        text (str): Teks mentah yang akan dibersihkan.

    Returns:
        str: Teks yang telah dibersihkan dan dinormalisasi.
    """
    if not text:
        return ""
    
    text = unicodedata.normalize("NFKC", text)
    text = text.replace("“", '"').replace("”", '"')
    text = text.replace("‘", "'").replace("’", "'")
    text = re.sub(r"[\x00-\x08\x0B\x0C\x0E-\x1F]", "", text)
    text = re.sub(r"[\n\r\t]+", " ", text)
    text = re.sub(r"[•▪●►–—]", " ", text)
    text = re.sub(r"\s{2,}", " ", text)
    return text.strip()

def _normalize_location_name(name: str) -> str:
    name = clean_text(name.lower())
    name = re.sub(r"\b(kota|kabupaten|provinsi)\b", "", name)
    name = re.sub(r"\s{2,}", " ", name)
    return name.strip()

@lru_cache(maxsize=1)
def _load_location_pattern() -> re.Pattern:
    base_dir = Path(__file__).resolve().parent.parent.parent / "app/utils/data"
    kab_path = base_dir / "kabupaten_kota.csv"
    prov_path = base_dir / "provinsi.csv"
    kab_df = pd.read_csv(kab_path)
    prov_df = pd.read_csv(prov_path)

    locations = set()

    for name in kab_df["name"].dropna():
        locations.add(_normalize_location_name(name))
    for name in prov_df["name"].dropna():
        locations.add(_normalize_location_name(name))

    locations = sorted(locations, key=len, reverse=True)
    pattern = r"\b(" + "|".join(map(re.escape, locations)) + r")\b"
    return re.compile(pattern, flags=re.IGNORECASE)


def clean_job_title_location(job_title: str) -> str:
    """
    Membersihkan nama daerah Indonesia dari job title.

    Cocok digunakan untuk post-processing output prediksi
    atau sebelum ditampilkan ke user.
    """
    if not job_title or not isinstance(job_title, str):
        return ""

    title = clean_text(job_title.lower())
    pattern = _load_location_pattern()
    title = pattern.sub("", title)
    title = re.sub(r"[\(\)\-,/]+", " ", title)
    title = re.sub(r"\s{2,}", " ", title)
    return title.strip().title()

