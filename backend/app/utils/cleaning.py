import re
import unicodedata

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
