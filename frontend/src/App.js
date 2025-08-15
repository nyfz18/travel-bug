import { useState } from "react";
import DestinationsList from "./components/DestinationsList";
import "./style/App.css";

function App() {
  const [name, setName] = useState("");
  const [preferences, setPreferences] = useState({
    beach: false,
    mountains: false,
    city: false,
    adventure: false,
  });
  const [visitedCountries, setVisitedCountries] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
        <label>
          <input
            type="checkbox"
            name="beach"
            checked={preferences.beach}
            onChange={handleCheckboxChange}
          />
          Beach
        </label>
        <label>
          <input
            type="checkbox"
            name="mountains"
            checked={preferences.mountains}
            onChange={handleCheckboxChange}
          />
          Mountains
        </label>
        <label>
          <input
            type="checkbox"
            name="city"
            checked={preferences.city}
            onChange={handleCheckboxChange}
          />
          City
        </label>
        <label>
          <input
            type="checkbox"
            name="adventure"
            checked={preferences.adventure}
            onChange={handleCheckboxChange}
          />
          Adventure
        </label>
      </div>

          <h3>Previously Visited Countries:</h3>
          <textarea
            placeholder="Separate countries with commas"
            value={visitedCountries}
            onChange={(e) => setVisitedCountries(e.target.value)}
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Hello, {name}!</h2>
          <p>Your preferences:</p>
          <ul>
            {Object.entries(preferences)
              .filter(([_, value]) => value)
              .map(([key]) => (
                <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</li>
              ))}
          </ul>

          <p>Countries you’ve visited:</p>
          <ul>
            {visitedCountries.split(",").map((country, index) => (
              <li key={index}>{country.trim()}</li>
            ))}
          </ul>

          <h3>Suggested Destinations:</h3>
          <DestinationsList />
        </div>
      )}
    </div>
  );
}

export default App;
