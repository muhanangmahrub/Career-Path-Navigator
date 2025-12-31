import ast
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from app.core.state import vectorizer as tfidf, global_importance_dict


class SkillGapModule:
    """
    Modul analisis kesenjangan keterampilan (skill gap).

    Modul ini membandingkan keterampilan pengguna dengan keterampilan ideal
    yang diekstraksi dari lowongan pekerjaan hasil rekomendasi, lalu
    menghasilkan daftar skill yang perlu ditingkatkan.

    Attributes:
        vectorizer: Vectorizer terlatih untuk representasi teks.
        feature_names: Daftar nama fitur (skill) dari vectorizer.
        global_imp: Kamus bobot kepentingan skill secara global.
    """
    def __init__(self, vectorizer, global_imp_dict):
        self.vectorizer = vectorizer
        self.feature_names = vectorizer.get_feature_names_out()
        self.global_imp = global_imp_dict
        
    def _clean_skill_string(self, skill_str):
        """
        Membersihkan dan menormalisasi string keterampilan.

        Args:
            skill_str (str): String keterampilan mentah.

        Returns:
            str: String keterampilan yang telah dibersihkan.
        """
        try:
            if skill_str.startswith("[") and skill_str.endswith("]"):
                skill_list = ast.literal_eval(skill_str)
                return " ".join(skill_list)
            return skill_str
        except:
            return skill_str

    def get_target_vector_from_recs(self, recommendation_list):
        """
        Membentuk vektor target keterampilan dari daftar rekomendasi pekerjaan.

        Vektor target dihitung sebagai rata-rata (centroid) vektor skill
        dari lowongan pekerjaan hasil rekomendasi.

        Args:
            recommendation_list (list[dict]): Daftar rekomendasi pekerjaan.

        Returns:
            np.ndarray | None: Vektor target keterampilan atau None jika kosong.
        """
        if not recommendation_list:
            return None
        
        cleaned_skills = []
        for job in recommendation_list:
            raw_skill = str(job.get('skills', ''))
            cleaned_text = self._clean_skill_string(raw_skill)
            cleaned_skills.append(cleaned_text)
        
        target_vec_matrix = self.vectorizer.transform(cleaned_skills)
        composite_vector = np.asarray(target_vec_matrix.mean(axis=0)).flatten()
        return composite_vector

    def analyze(self, user_text, recommendation_list, top_n=10):
        """
        Menganalisis kesenjangan keterampilan antara pengguna dan rekomendasi pekerjaan.

        Args:
            user_text (str): Deskripsi persona atau profil pengguna.
            recommendation_list (list[dict]): Daftar rekomendasi pekerjaan.
            top_n (int): Jumlah skill gap teratas yang dikembalikan.

        Returns:
            list[dict]: Daftar skill yang direkomendasikan untuk ditingkatkan
                        beserta skor prioritasnya.
        """
        target_vec = self.get_target_vector_from_recs(recommendation_list)
        
        if target_vec is None:
            return []
        
        user_vec = self.vectorizer.transform([user_text]).toarray().flatten()
        gap_vec = np.maximum(0, target_vec - user_vec)
        gap_indices = np.where(gap_vec > 0.005)[0]
        if len(gap_indices) == 0:
            return []

        candidates = []
        for idx in gap_indices:
            skill_name = self.feature_names[idx]
            relevance = gap_vec[idx]
            importance = self.global_imp.get(skill_name, 0)
            candidates.append({
                'skill': skill_name,
                'relevance': relevance,
                'importance': importance
            })
            
        if not candidates:
            return []
        
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
        df_cand['final_score'] = 2 * (df_cand['rel_norm'] * df_cand['imp_norm']) / \
                                     (df_cand['rel_norm'] + df_cand['imp_norm'] + epsilon)
        
        results = df_cand.sort_values('final_score', ascending=False).head(top_n)
        
        return results[['skill', 'final_score']].to_dict('records')

gap_analyzer = SkillGapModule(tfidf, global_importance_dict)
