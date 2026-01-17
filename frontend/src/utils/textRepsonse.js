export const textResponse = (data) => {
  let labels = data.recommendations.predicted_job_field.labels;
  const faiss = data.recommendations.faiss
    .map((item, index) => `${index + 1}. ${item.job_title}`)
    .join("\n");
  const skill = data.recommendations.skill_gap
    .map((item) => `${item.skill} (${(item.final_score * 100).toFixed(0)}%)`)
    .join(", ");

  labels = labels === "Other" ? "General / Umum" : labels;
  const role = jobRole(labels);
  const jobRecommend = recommendJob(faiss);
  const skillRecommend = recommendSkill(skill, labels);

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
    a: `Berdasarkan hasil analisis, berikut rekomendasi pekerjaan yang paling relevan untuk kamu : \n ${faiss}.`,
    b: `Profil keahlian kamu menunjukkan kecocokan yang kuat dengan beberapa pekerjaan berikut :\n ${faiss}.`,
    c: `Dari pemetaan kemampuan dan minat, pekerjaan yang direkomendasikan untuk kamu adalah :\n ${faiss}.`,
    d: `Kombinasi skill yang kamu miliki sesuai dengan kebutuhan beberapa pekerjaan berikut :\n ${faiss}.`,
  };

  const keys = Object.keys(templates);
  return templates[keys[Math.floor(Math.random() * keys.length)]];
};

const recommendSkill = (skills, label) => {
  const templates = {
    a: `Beberapa skill utama yang paling dominan dan perlu terus dikembangkan antara lain ${skills}.`,
    b: `Hasil analisis menunjukkan bahwa skill seperti ${skills} menjadi kekuatan utama kamu di bidang ${label}.`,
    c: `Penguasaan skill ${skills} sangat mendukung kesiapan kamu di bidang ${label}.`,
    d: `Untuk memperkuat posisi kamu di bidang ${label}, fokus pengembangan skill ${skills} sangat disarankan.`,
  };

  const keys = Object.keys(templates);
  return templates[keys[Math.floor(Math.random() * keys.length)]];
};
