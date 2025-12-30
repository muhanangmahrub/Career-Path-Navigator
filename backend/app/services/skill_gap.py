import ast
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from app.core.state import vectorizer as tfidf, global_importance_dict


class SkillGapModule:
    def __init__(self, vectorizer, global_imp_dict):
        self.vectorizer = vectorizer
        self.feature_names = vectorizer.get_feature_names_out()
        self.global_imp = global_imp_dict
        
    def _clean_skill_string(self, skill_str):
        """
        Fungsi untuk membersihkan string skill
        """
        try:
            # Jika bentuknya string list python
            if skill_str.startswith("[") and skill_str.endswith("]"):
                skill_list = ast.literal_eval(skill_str)
                return " ".join(skill_list)
            return skill_str
        except:
            return skill_str

    def get_target_vector_from_recs(self, recommendation_list):
        """
        Membuat vektor target berdasarkan RATA-RATA skill dari top rekomendasi.
        """
        if not recommendation_list:
            return None
        
        # Ambil skill dari setiap job di rekomendasi
        cleaned_skills = []
        for job in recommendation_list:
            raw_skill = str(job.get('skills', ''))
            cleaned_text = self._clean_skill_string(raw_skill)
            cleaned_skills.append(cleaned_text)
            
        # Buat Matrix TF-IDF untuk job-job rekomendasi ini
        target_vec_matrix = self.vectorizer.transform(cleaned_skills)
        
        # Hitung Centroid (Rata-rata vektor)
        # Ini merepresentasikan "Skill Ideal" untuk cluster rekomendasi ini
        composite_vector = np.asarray(target_vec_matrix.mean(axis=0)).flatten()
        
        return composite_vector

    def analyze(self, user_text, recommendation_list, top_n=10):
        """
        user_text: Text input dari user (persona)
        recommendation_list: List dictionary hasil search() atau get_top_roles_by_text()
        """
        # Dapatkan Vektor Target dari Rekomendasi
        target_vec = self.get_target_vector_from_recs(recommendation_list)
        
        if target_vec is None:
            return []
        
        # Hitung Vektor User (Skill yang user punya)
        user_vec = self.vectorizer.transform([user_text]).toarray().flatten()
        
        # Hitung Gap (Target - User) -> Ambil yang positif saja (Missing Skills)
        gap_vec = np.maximum(0, target_vec - user_vec)
        
        # Threshold filter noise (agar skill dengan bobot sangat kecil tidak muncul)
        gap_indices = np.where(gap_vec > 0.005)[0]
        
        if len(gap_indices) == 0:
            return [] # Tidak ada gap signifikan

        # Scoring Kandidat Skill
        candidates = []
        for idx in gap_indices:
            skill_name = self.feature_names[idx]
            
            # RELEVANCE: Seberapa besar gap skill ini di job rekomendasi?
            relevance = gap_vec[idx]
            
            # IMPORTANCE: Seberapa penting skill ini secara global (Model MLP)?
            importance = self.global_imp.get(skill_name, 0)
            
            candidates.append({
                'skill': skill_name,
                'relevance': relevance,
                'importance': importance
            })
            
        if not candidates:
            return []
            
        # Normalisasi & Harmonic Mean (F1-like Score)
        df_cand = pd.DataFrame(candidates)
        scaler = MinMaxScaler()
        
        if len(df_cand) > 1:
            scaled_vals = scaler.fit_transform(df_cand[['relevance', 'importance']])
            df_cand['rel_norm'] = scaled_vals[:, 0]
            df_cand['imp_norm'] = scaled_vals[:, 1]
        else:
            df_cand['rel_norm'] = 1.0
            df_cand['imp_norm'] = 1.0
            
        epsilon = 1e-5
        # Rumus Harmonic Mean: Mengutamakan skill yang Relevan DAN Penting
        df_cand['final_score'] = 2 * (df_cand['rel_norm'] * df_cand['imp_norm']) / \
                                     (df_cand['rel_norm'] + df_cand['imp_norm'] + epsilon)
        
        # Ambil Top N Score Tertinggi
        results = df_cand.sort_values('final_score', ascending=False).head(top_n)
        
        return results[['skill', 'final_score']].to_dict('records')

# Inisiasi Modul
gap_analyzer = SkillGapModule(tfidf, global_importance_dict)