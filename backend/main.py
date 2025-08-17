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

with open("countries.json") as f:
    countries_data = json.load(f)

class PreferencesInput(BaseModel):
    preferences: dict 
    visitedCountries: str
    maxBudget: int  # USD

@app.post("/suggestions")
async def get_suggestions(data: PreferencesInput):
    prefs = [k for k, v in data.preferences.items() if v]
    visited = [c.strip() for c in data.visitedCountries.split(",") if c.strip()]
    max_budget = data.maxBudget

    filtered = []
    for country in countries_data:
        if country["name"] in visited:
            continue

        country_budget = country.get("avg_budget", 0)
        if country_budget > max_budget:
            continue  

        match_score = sum(tag in prefs for tag in country["tags"])
        filtered.append((match_score, abs(max_budget - country_budget), country["name"]))

    filtered.sort(key=lambda x: (-x[0], x[1]))

    country_names = [c[2] for c in filtered[:10]]

    prompt = f"""
    You are a travel recommender AI. The user likes: {prefs}.
    Their favorites they have visited (find similar): {visited}.
    Their maximum budget is: ${max_budget}.
    Choose 3 countries based on their preferences, from this list and ensure they are under budget: {country_names}.
    Only return a JSON array of 3 country names.
    """

    response = ollama.chat(
        model="llama3.2:1b",
        messages=[{"role": "user", "content": prompt}]
    )

    content = response["message"]["content"]

    try:
        suggestions = json.loads(content.strip())
    except:
        suggestions = random.sample(country_names, min(3, len(country_names)))

    return {"suggestions": suggestions}
