export async function fetchSuggestions(preferences, visitedCountries, maxBudget) {
  const res = await fetch("http://localhost:8000/suggestions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ preferences, visitedCountries, maxBudget }),
  });
  return res.json().then((data) => data.suggestions);
}
