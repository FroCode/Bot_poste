import joblib
from sklearn.ensemble import RandomForestClassifier
import numpy as np

# Dummy training data (e.g., text length vs category)
X = np.array([ [10], [20], [30], [40], [50] ])  # Simple feature: text length
y = np.array([0, 1, 0, 1, 0])  # Categories based on length (just a dummy)

# Create a RandomForestClassifier (or any model you'd like)
model = RandomForestClassifier()

# Train the model
model.fit(X, y)

# Save the model to a file (model.pkl)
joblib.dump(model, 'model.pkl')

print("Model trained and saved as model.pkl")
