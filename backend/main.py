import ollama
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load countries.json
with open("countries.json") as f:
    countries_data = json.load(f)

class PreferencesInput(BaseModel):
    preferences: dict  # e.g., {"beach": True, "mountains": False, "culture": True, ...}
    visitedCountries: str
    maxBudget: int  # maximum budget in USD

@app.post("/suggestions")
async def get_suggestions(data: PreferencesInput):
    # Extract preferences that are True
    prefs = [k for k, v in data.preferences.items() if v]
    visited = [c.strip() for c in data.visitedCountries.split(",") if c.strip()]
    max_budget = data.maxBudget

    # Filter countries by matching tags and budget
    filtered = []
    for country in countries_data:
        if country["name"] in visited:
            continue

        match_score = sum(tag in prefs for tag in country["tags"])
        country_budget = country.get("avg_budget", 0)

        # Include even if over budget; we'll sort later
        filtered.append((match_score, abs(max_budget - country_budget), country["name"]))

    # sort by highest match_score, then closest to budget
    filtered.sort(key=lambda x: (-x[0], x[1]))

    country_names = [c[2] for c in filtered[:10]]  # top 10 for LLM

    # Create prompt for Ollama LLM
    prompt = f"""
    You are a travel recommender AI. The user likes: {prefs}.
    They have visited: {visited}.
    Their maximum budget is: ${max_budget}.
    Choose 3 countries from this list: {country_names}.
    Only return a JSON array of 3 country names.
    """

    try:
        response = ollama.chat("llama3.2:1b", prompt)
        suggestions = json.loads(response.strip())
    except:
        # fallback in case LLM fails
        suggestions = random.sample(country_names, min(3, len(country_names)))

    return {"suggestions": suggestions}
