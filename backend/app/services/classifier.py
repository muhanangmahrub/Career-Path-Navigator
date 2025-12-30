import joblib
import os
from tensorflow.keras import models

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "..", "models")

artifacts = joblib.load(os.path.join(MODEL_DIR, "text_preprocessor.joblib"))
vectorizer = artifacts["vectorizer"]
selector = artifacts["selector"]
label_map = {
    0: 'Creative & Media',
    1: 'Education',
    2: 'Engineering',
    3: 'Finance & Accounting',
    4: 'HR & Administration',
    5: 'Hospitality & Service',
    6: 'IT & Software',
    7: 'Manufacturing & Operations',
    8: 'Other',
    9: 'Sales & Marketing'
    }

model = models.load_model(os.path.join(MODEL_DIR, "mlp_model.keras"))

def predict_job_function(texts, vectorizer, selector, model):
    X = vectorizer.transform(texts)
    X = selector.transform(X).toarray()
    probs = model.predict(X)
    labels = probs.argmax(axis=1)
    labels = label_map[int(labels[0])]
    return labels, probs
