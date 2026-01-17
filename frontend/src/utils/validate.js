export const validate = (text) => {
  if (!text || text.trim() === "") {
    return {
      error: true,
      msg: "Ooppss.. deskripsinya kosong nih, ceritain dikit dong tentang dirimu!",
    };
  }

  if (text.length < 400) {
    return {
      error: true,
      msg: "Waduh,, deskripsimu masih kependekan nih, coba tambahin sedikit cerita!",
    };
  }

  const trimmed = text.trim();

  const numberCount = (trimmed.match(/\d/g) || []).length;
  const numberRatio = numberCount / trimmed.length;
  if (numberRatio > 0.3) {
    return {
      error: true,
      msg: "Hayo, jangan kebanyakan angka ya di deskripsimu, nanti kayak kode rahasia",
    };
  }

  const symbolCount = (trimmed.match(/[^a-zA-Z0-9\s]/g) || []).length;
  const symbolRatio = symbolCount / trimmed.length;
  if (symbolRatio > 0.3) {
    return {
      error: true,
      msg: "Hmm, deskripsinya kebanyakan simbol aneh, santai aja, biar gampang dibaca",
    };
  }

  return { error: false };
};
