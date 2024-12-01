import requests
import json

# Define the URL of the FastAPI server
url = "http://127.0.0.1:8000/predict"

# Example text to send for prediction
data = {"text": "Hello, how are you?"}

# Send a POST request to the FastAPI server
response = requests.post(url, json=data)

# Print the response
print(f"Response: {response.json()}")
