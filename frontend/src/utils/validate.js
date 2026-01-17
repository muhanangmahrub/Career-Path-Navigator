export const validate = (text) => {
  if (!text || text.trim() === "") {
    return {
      error: true,
      msg: "Ooppss.. deskripsi dirimu tidak boleh kosong",
    };
  }

  if (text.length < 400) {
    return {
      error: true,
      msg: "Ooppss.. deskripsi dirimu kamu kurang panjang",
    };
  }

  const trimmed = text.trim();

  const numberCount = (trimmed.match(/\d/g) || []).length;
  const numberRatio = numberCount / trimmed.length;
  if (numberRatio > 0.3) {
    return {
      error: true,
      msg: "Ooppss.. deskripsi dirimu tidak boleh mengandung terlalu banyak angka",
    };
  }

  const symbolCount = (trimmed.match(/[^a-zA-Z0-9\s]/g) || []).length;
  const symbolRatio = symbolCount / trimmed.length;
  if (symbolRatio > 0.3) {
    return {
      error: true,
      msg: "Ooppss.. deskripsi dirimu tidak boleh mengandung terlalu banyak simbol atau karakter aneh",
    };
  }

  return { error: false };
};
