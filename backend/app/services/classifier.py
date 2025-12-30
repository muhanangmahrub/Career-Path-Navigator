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


def predict_job_function(texts, vectorizer, selector, model):
    X = vectorizer.transform(texts)
    X = selector.transform(X).toarray()
    probs = model.predict(X)
    labels = probs.argmax(axis=1)
    labels = label_map[int(labels[0])]
    return labels, probs
