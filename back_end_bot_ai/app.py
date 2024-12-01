from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from data import dataset  # Ensure dataset is correctly imported
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware setup
origins = [
    "http://localhost:3001",  # React default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows the React app to connect to FastAPI
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Example dataset (replace with your real dataset)
qa_dataset = dataset

# Define the data model for the request body
class QueryRequest(BaseModel):
    query: str
class ClearHistoryRequest(BaseModel):
    session_id: str
    
# Gemini API details
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"
API_KEY = "AIzaSyDZePf7Ub48RK89XBC39PIjgiI34a94oso"

# Function to format the dataset into a readable format for Gemini
def format_dataset_for_gemini():
    formatted_data = ""
    for question, answer in qa_dataset.items():
        formatted_data += f"Question: {question}\nAnswer: {answer}\n\n"
    return formatted_data

# Function to send the request to Gemini
def ask_gemini_with_context(query, dataset_context):
    try:
        # Prepare the payload to send both the dataset context and the user query
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": dataset_context + "\n\nUser Question: " + query}
                    ]
                }
            ]
        }

        # Send the request to Gemini API with the dataset context
        response = requests.post(
            f"{GEMINI_API_URL}?key={API_KEY}",
            json=payload,
            headers={"Content-Type": "application/json"},
        )

        if response.status_code == 200:
            result = response.json()
            # Extract the generated text
            generated_text = result["candidates"][0]["content"]["parts"][0]["text"]
            
            # Clean up the response to remove unwanted phrases like "bot" or "Have a nice day"
            return clean_bot_response(generated_text)
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Function to clean the bot's response (removing duplicate words or unnecessary phrases)
def clean_bot_response(response_text):
    # List of common unwanted phrases that may be included in the bot's response
    unwanted_phrases = [
        "bot:",  # Prevent "bot" being included in the message
        "Have a nice day",  # Prevent automatic "Have a nice day" responses
        "We appreciate you contacting Algerie Poste",  # Prevent redundant thanks message
    ]
    
    # Loop through the unwanted phrases and remove them from the response
    for phrase in unwanted_phrases:
        response_text = response_text.replace(phrase, "")
    
    # Return the cleaned response
    return response_text.strip()

@app.post("/ask")
async def ask_gemini(request: QueryRequest):
    # Add an initial system-level instruction to make sure the bot understands it's always "Algerie Poste"
    # and should always use 'we' when responding.
    dataset_context = format_dataset_for_gemini()

    # Define a special instruction to tell Gemini to always reply as Algerie Poste (using "we")
    algerie_poste_context = """
    You are Algerie Poste, the official customer service bot. You always respond as if you represent Algerie Poste, and you use 'we' and 'our' in your responses.
    You should avoid generic greetings and focus on answering questions related to our services, including postal and financial services.
    Do not repeat your greeting unless explicitly asked.
    """

    # Combine this context with the dataset and user query
    complete_context = algerie_poste_context + "\n\n" + dataset_context

    # Send the user query along with the dataset context to Gemini
    answer = ask_gemini_with_context(request.query, complete_context)

    # Return the final answer, which will now include the "we" from Algerie Poste
    return {"answer": answer}
@app.post("/clear_history")
async def clear_history(request: ClearHistoryRequest):
    # Handle clearing the session history on the server-side if needed
    return {"status": "History cleared"}