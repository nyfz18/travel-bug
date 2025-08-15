export async function fetchSuggestions(preferences, visitedCountries) {
  const response = await fetch("http://localhost:8000/suggestions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ preferences, visitedCountries })
  });

  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }

  const data = await response.json();
  return data.suggestions || [];
}
