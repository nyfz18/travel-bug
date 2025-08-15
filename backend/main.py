from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

app = FastAPI()

# CORS setup for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PreferencesInput(BaseModel):
    preferences: dict
    visitedCountries: str
    
@app.post("/suggestions")
async def get_suggestions(data: PreferencesInput):
    print("HERE") #Debug
    print("Received data:", data)
    prefs = [k for k, v in data.preferences.items() if v]
    visited = data.visitedCountries

# need to continue...