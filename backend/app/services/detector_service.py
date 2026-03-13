import pickle
import os
import math

class DetectorService:
    def __init__(self):
        models_dir = os.path.join(os.path.dirname(__file__), '..', 'ml', 'saved_models')
        with open(os.path.join(models_dir, 'model.pkl'), 'rb') as f:
            self.model = pickle.load(f)
        with open(os.path.join(models_dir, 'vectorizer.pkl'), 'rb') as f:
            self.vectorizer = pickle.load(f)

    def predict(self, text: str):
        # Vectorize text
        tfidf_text = self.vectorizer.transform([text])
        
        # Predict
        prediction = self.model.predict(tfidf_text)[0] 
        
        # PAC doesn't have predict_proba natively. We use decision_function.
        dec_func = self.model.decision_function(tfidf_text)[0]
        
        # Calculate pseudo-confidence score using sigmoid function
        confidence = 1 / (1 + math.exp(-abs(dec_func)))
        
        return prediction.upper(), round(confidence, 4)
