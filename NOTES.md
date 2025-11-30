# 📌 **README -- SOP Kolaborasi GitHub**

**Project: Career Path Navigator**

Dokumen ini menjelaskan aturan penggunaan GitHub untuk kolaborasi tim.\
Model kolaborasi menggunakan **branch per kolaborator** agar workflow
rapi dan minim konflik.

---

# 🚀 1. **Struktur Branch**

Setiap anggota tim memiliki branch utama masing-masing:

    main                      → branch utama (bersih, stabil)
    dev-abrar                 → workspace Abrar
    dev-anang                 → workspace Anang
    dev-akbar                 → workspace Akbar
    dev-asyraf                → workspace Asyraf

Untuk fitur baru, buat sub-branch dari branch pribadi:

    dev-anang/feature-skill-extraction
    dev-akbar/feature-cleaning
    dev-asyraf/experiment-model

**Aturan:** - ❌ Tidak boleh push langsung ke `main` - ✔ Semua kerja
dilakukan di branch pribadi (`dev-*`) - ✔ Merge ke main dilakukan
melalui **Pull Request**

---

# 🗂 2. **Struktur Folder Repository**

    career-path-navigator/
    │
    ├── data/                 # Simpan dataset (hindari file besar!)
    │
    ├── notebooks/            # Notebook per kolaborator
    │   ├── akbar/
    │   ├── anang/
    │   ├── member3/
    │   ├── member4/
    │
    ├── src/                  # Script produksi (bersih & modular)
    │   ├── preprocessing/
    │   ├── models/
    │   ├── pipelines/
    │
    ├── docs/                 # Dokumentasi project
    │
    ├── tests/                # Unit tests
    │
    ├── .gitignore
    ├── requirements.txt
    └── README.md

---

# 🔄 3. **Workflow Kerja Setiap Anggota**

## 3.1. Clone Repository

```bash
git clone <repo-url>
cd career-path-navigator
```

## 3.2. Checkout ke Branch Pribadi

```bash
git checkout dev-anang
```

## 3.3. Update Branch Pribadi dari Main (setiap hari)

```bash
git checkout main
git pull origin main

git checkout dev-anang
git merge main
```

## 3.4. Kerjakan Task

Edit script / notebook pada folder masing-masing.

## 3.5. Commit Perubahan (format rapi)

    feat: add job cleaning script
    fix: resolve missing value issue
    docs: update preprocessing documentation

## 3.6. Push ke Branch Pribadi

```bash
git push origin dev-anang
```

---

# 🔀 4. **Pull Request (PR) Procedure**

Semua integrasi ke `main` dilakukan melalui Pull Request.

### **Buat PR:**

**From:** `dev-nama`\
**To:** `main`

### **Sebelum PR:**

```bash
git checkout dev-anang
git merge main
git push
```

### **Aturan PR:**

- Minimal 1 reviewer dari tim
- Tidak boleh merge PR sendiri
- Gunakan **Squash & Merge**
- PR harus berisi deskripsi jelas

---

# 🧪 5. **Aturan Notebook**

Untuk menghindari konflik: - Gunakan folder masing-masing
(`notebooks/anang/`, dll) - Kurangi output besar di notebook - Notebook
final dipindah ke `docs` atau diubah ke script `.py`

---

# 📁 6. **Aturan Data**

- Dataset besar **tidak boleh** di-commit ke repo
- Gunakan:
  - Google Drive\
  - Mega\
  - Git LFS (opsional)

Tambahkan nama dataset ke `.gitignore`.

---

# 🧹 7. **Git Best Practices**

✔ Commit kecil dan jelas\
✔ Sering push, jangan tunggu terlalu lama\
✔ Selalu pull saat mulai bekerja\
✔ Jangan mengubah file milik orang lain tanpa diskusi\
✔ Dokumentasi diperbarui ketika ada fitur baru

---

# 🔍 8. **Template Pull Request**

    # Ringkasan
    Jelaskan perubahan yang dilakukan.

    ## Perubahan
    - ...
    - ...

    ## Cara Testing
    - Langkah untuk memastikan PR berjalan baik

    ## Checklist
    - [ ] Sudah merge main ke branch pribadi
    - [ ] Tidak ada file milik anggota lain yang terubah
    - [ ] Script berjalan tanpa error
    - [ ] Notebook ditempatkan di folder pribadi

---

# 🏷 9. **Template Commit Message**

    feat: implement job title embedding with sentence transformers
    fix: handle null values in job_description field
    refactor: simplify preprocessing pipeline
    docs: add explanation of ML architecture

---

# 👥 10. **Roles (Opsional)**

---

Role Akses

---

**Maintainer** Approve + merge PR, manage branch

**Contributor** Kerja di branch pribadi, push, buat PR

**Reviewer** Review PR sebelum merge

---

---

# 📌 11. **Ringkasan Alur Singkat**

1.  Kerja di `dev-nama`
2.  Commit → push
3.  Merge `main` ke branch pribadi
4.  Buat PR ke `main`
5.  Review → merge
