# train_yield.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error
)
import joblib
import os

# Check file
print("Current Folder:", os.getcwd())
print("File Exists:", os.path.exists("dataset/crop_yield.csv"))

# Load dataset
data = pd.read_csv("dataset/crop_yield.csv")

# Dataset information
print("\nDataset Shape:")
print(data.shape)

print("\nColumns:")
print(data.columns)

# Features and Target
X = data.drop("Yield", axis=1)
y = data["Yield"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.4,
    random_state=42
)

# Random Forest Model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

# Train model
model.fit(X_train, y_train)

# Predict
pred = model.predict(X_test)

# Evaluation Metrics
print("\nModel Evaluation")

print("R2 Score:",
      r2_score(y_test, pred))

print("MAE:",
      mean_absolute_error(y_test, pred))

print("RMSE:",
      mean_squared_error(
          y_test,
          pred
      ) ** 0.5)

# Save model
joblib.dump(
    model,
    "yield_model.pkl"
)

print("\nYield model saved successfully!")