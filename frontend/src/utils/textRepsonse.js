export const textResponse = (data) => {
  const labels = data.recommendations.predicted_job_field.labels;
  const faiss = data.recommendations.faiss
    .map((item) => item.job_title)
    .join(", ");
  const skill = data.recommendations.skill_gap
    .map((item) => `${item.skill} (${(item.final_score * 100).toFixed(0)}%)`)
    .join(", ");

  const role = jobRole(labels);
  const jobRecommend = recommendJob(faiss);
  const skillRecommend = recommendSkill(skill);

  return { role, jobRecommend, skillRecommend };
};

const jobRole = (label) => {
  const templates = {
    a: `Hasil analisis menunjukkan kecocokan pada bidang ${label}.`,
    b: `Kamu memiliki potensi berkembang di jalur karier ${label}.`,
    c: `Berdasarkan profilmu, ${label} adalah pilihan yang relevan.`,
    d: `Bidang ${label} direkomendasikan berdasarkan pemetaan keahlian.`,
  };

  const keys = Object.keys(templates);
  return templates[keys[Math.floor(Math.random() * keys.length)]];
};

const recommendJob = (faiss) => {
  const templates = {
    a: `Berdasarkan hasil analisis, beberapa peran yang paling relevan dengan profil kamu antara lain ${faiss}.`,
    b: `Profil keahlian kamu menunjukkan kecocokan yang kuat dengan peran seperti ${faiss}.`,
    c: `Dari pemetaan kemampuan dan minat, posisi ${faiss} menjadi rekomendasi utama untuk kamu pertimbangkan.`,
    d: `Kombinasi skill yang kamu miliki sesuai dengan kebutuhan peran ${faiss}.`,
  };

  const keys = Object.keys(templates);
  return templates[keys[Math.floor(Math.random() * keys.length)]];
};

const recommendSkill = (skills) => {
  const templates = {
    a: `Beberapa skill utama yang paling dominan dan perlu terus dikembangkan antara lain ${skills}.`,
    b: `Hasil analisis menunjukkan bahwa skill seperti ${skills} menjadi kekuatan utama kamu.`,
    c: `Penguasaan skill ${skills} sangat mendukung kesiapan kamu di bidang kreatif dan media.`,
    d: `Untuk memperkuat posisi kamu di dunia kerja, fokus pengembangan skill ${skills} sangat disarankan.`,
  };

  const keys = Object.keys(templates);
  return templates[keys[Math.floor(Math.random() * keys.length)]];
};
