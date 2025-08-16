import { useState } from "react";
import DestinationsList from "./components/DestinationsList";
import { fetchSuggestions } from "./api";
import "./style/App.css";

function App() {
  const [name, setName] = useState("");
  const [preferences, setPreferences] = useState({
    beach: false,
    mountains: false,
    city: false,
    adventure: false,
    culture: false,
  });
  const [visitedCountries, setVisitedCountries] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [suggestedDestinations, setSuggestedDestinations] = useState([]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const suggestions = await fetchSuggestions(preferences, visitedCountries, Number(maxBudget));
      setSuggestedDestinations(suggestions);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestedDestinations([]);
    }
  };

  const handleReset = () => {
    setName("");
    setPreferences({ beach: false, mountains: false, city: false, adventure: false, culture: false });
    setVisitedCountries("");
    setMaxBudget("");
    setSubmitted(false);
    setSuggestedDestinations([]);
  };

  return (
    <div className="app-container">
      <h1>Travel Bug</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <h3>Preferences:</h3>
          <div className="checkbox-group">
            {["beach", "mountains", "city", "adventure", "culture"].map((pref) => (
              <label key={pref}>
                <input
                  type="checkbox"
                  name={pref}
                  checked={preferences[pref]}
                  onChange={handleCheckboxChange}
                />
                {pref.charAt(0).toUpperCase() + pref.slice(1)}
              </label>
            ))}
          </div>

          <h3>Previously Visited Countries:</h3>
          <textarea
            placeholder="Separate countries with commas"
            value={visitedCountries}
            onChange={(e) => setVisitedCountries(e.target.value)}
          ></textarea>

          <h3>Maximum Budget (USD):</h3>
          <input
            type="number"
            placeholder="e.g., 2500"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
          />

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : (
        <div>
          <h2>Hello, {name}!</h2>

          <p>Your preferences:</p>
          <ul>
            {Object.entries(preferences)
              .filter(([_, val]) => val)
              .map(([key]) => (
                <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</li>
              ))}
          </ul>

          <p>Favorite countries you’ve visited:</p>
          <ul>
            {visitedCountries
              .split(",")
              .map((c) => c.trim())
              .filter((c) => c)
              .map((country, i) => (
                <li key={i}>{country}</li>
              ))}
          </ul>

          <p>Maximum Budget: ${maxBudget}</p>

          <h3>Suggested Destinations:</h3>
          {suggestedDestinations.length > 0 ? (
            <DestinationsList destinations={suggestedDestinations} />
          ) : (
            <p>No suggestions available.</p>
          )}

          <div>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
