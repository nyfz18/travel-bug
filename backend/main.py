import ollama
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load countries.json
with open("countries.json") as f:
    countries_data = json.load(f)

class PreferencesInput(BaseModel):
    preferences: dict
    visitedCountries: str

@app.post("/suggestions")
async def get_suggestions(data: PreferencesInput):
    prefs = [k for k, v in data.preferences.items() if v]
    visited = [c.strip() for c in data.visitedCountries.split(",") if c.strip()]

    filtered = []
    for country in countries_data:
        if country["name"] in visited:
            continue
        match_score = sum(tag in prefs for tag in country["tags"])
        if match_score > 0:
            filtered.append(country["name"])

    if not filtered:
        return {"suggestions": []}

    prompt = f"""
    You are a travel recommender AI. The user likes: {prefs}.
    They have visited: {visited}.
    Choose 3 countries from this list: {filtered}.
    Only return a JSON array of 3 country names.
    """

    try:
        response = ollama.chat("llama3.2:1b", prompt)
        suggestions = json.loads(response.strip())
    except:
        suggestions = random.sample(filtered, min(3, len(filtered)))

    return {"suggestions": suggestions}
