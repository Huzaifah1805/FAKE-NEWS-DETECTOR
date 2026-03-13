import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle
import os

print("Starting Fake News Model Training...")

# 1. Load Data
data_path = 'dataset/fake_or_real_news.csv'
df = pd.read_csv(data_path)

# 2. Basic Cleaning
df = df.dropna()
df['text'] = df['text'].str.lower()
df['text'] = df['text'].str.replace('[^\w\s]', '', regex=True)

# 3. Prepare features and labels
X = df['text']
y = df['label'] # Assuming 'label' is the target column (FAKE/REAL)

# 4. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. TF-IDF Vectorization
tfidf_vectorizer = TfidfVectorizer(stop_words='english', max_df=0.7)
tfidf_train = tfidf_vectorizer.fit_transform(X_train) 
tfidf_test = tfidf_vectorizer.transform(X_test)

# 6. Train PassiveAggressiveClassifier (Usually gets >93% on this dataset)
pac = PassiveAggressiveClassifier(max_iter=50)
pac.fit(tfidf_train, y_train)

# 7. Predict & Evaluate
y_pred = pac.predict(tfidf_test)
score = accuracy_score(y_test, y_pred)
print(f'Accuracy: {round(score*100,2)}%')
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# 8. Save Models
os.makedirs('backend/app/ml/saved_models', exist_ok=True)
with open('backend/app/ml/saved_models/model.pkl', 'wb') as f:
    pickle.dump(pac, f)
    
with open('backend/app/ml/saved_models/vectorizer.pkl', 'wb') as f:
    pickle.dump(tfidf_vectorizer, f)

print("Model and Vectorizer saved to backend/app/ml/saved_models/")
