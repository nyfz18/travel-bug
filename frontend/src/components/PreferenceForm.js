import { useState } from "react";
import "../style/PreferencesForm.css";

export default function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    beach: false,
    mountain: false,
    city: false,
  });

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User preferences:", preferences);
    alert("Preferences saved!");
  };

  return (
    <form className="preferences-form" onSubmit={handleSubmit}>
      <label>
        <input type="checkbox" name="beach" checked={preferences.beach} onChange={handleChange} />
        Beach
      </label>
      <label>
        <input type="checkbox" name="mountain" checked={preferences.mountain} onChange={handleChange} />
        Mountain
      </label>
      <label>
        <input type="checkbox" name="city" checked={preferences.city} onChange={handleChange} />
        City
      </label>
      <button type="submit">Save Preferences</button>
    </form>
  );
}
