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
      const suggestions = await fetchSuggestions(
        preferences,
        visitedCountries,
        Number(maxBudget)
      );
      setSuggestedDestinations(suggestions);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestedDestinations([]);
    }
  };

  const handleReset = () => {
    setName("");
    setPreferences({
      beach: false,
      mountains: false,
      city: false,
      adventure: false,
      culture: false,
    });
    setVisitedCountries("");
    setMaxBudget("");
    setSubmitted(false);
    setSuggestedDestinations([]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Travel Bug</h1>
        <p>Find your next dream destination!</p>
      </header>

      <div className="card">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <h3>Choose Your Preferences:</h3>
            <div className="checkbox-group">
              {["beach", "mountains", "city", "adventure", "culture"].map(
                (pref) => (
                  <label key={pref} className="checkbox">
                    <input
                      type="checkbox"
                      name={pref}
                      checked={preferences[pref]}
                      onChange={handleCheckboxChange}
                    />
                    <span>{pref.charAt(0).toUpperCase() + pref.slice(1)}</span>
                  </label>
                )
              )}
            </div>

            <h3>Favorite Previously Visited Countries:</h3>
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

            <button type="submit" className="btn-primary">
              Get Suggestions! 
            </button>
          </form>
        ) : (
          <div className="results">
            <h2>Hello, {name}! 👋</h2>

            <section>
              <h4>Your Preferences:</h4>
              <ul className="tag-list">
                {Object.entries(preferences)
                  .filter(([_, val]) => val)
                  .map(([key]) => (
                    <li key={key} className="tag">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </li>
                  ))}
              </ul>
            </section>

            <section>
              <h4>Your Favorite Visited Countries:</h4>
              <ul className="tag-list">
                {visitedCountries
                  .split(",")
                  .map((c) => c.trim())
                  .filter((c) => c)
                  .map((country, i) => (
                    <li key={i} className="tag">
                      {country}
                    </li>
                  ))}
              </ul>
            </section>

            <p className="budget"><b>Max Budget:</b> ${maxBudget}</p> 

            {suggestedDestinations.length > 0 ? (
              <DestinationsList destinations={suggestedDestinations} />
            ) : (
              <p className="no-results">No suggestions available.</p>
            )}

            <button onClick={handleReset} className="btn-secondary">
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
