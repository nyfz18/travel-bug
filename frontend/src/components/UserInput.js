import { useState } from "react";
import "../style/UserInput.css";

export default function UserInput({ users, setUsers, destinations, setDestinations }) {
  const [name, setName] = useState("");
  const [preferences, setPreferences] = useState({
    beach: false,
    mountain: false,
    city: false,
  });
  const [visited, setVisited] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      preferences,
      visited: visited.split(",").map(v => v.trim()).filter(Boolean),
    };
    setUsers([...users, newUser]);

    // Update destinations list
    setDestinations([...destinations, ...newUser.visited.filter(d => !destinations.includes(d))]);

    // Reset inputs
    setName("");
    setPreferences({ beach: false, mountain: false, city: false });
    setVisited("");
  };

  const handleCheckboxChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.checked });
  };

  return (
    <form className="user-input-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Your Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />

      <div className="checkbox-group">
        <label>
          <input type="checkbox" name="beach" checked={preferences.beach} onChange={handleCheckboxChange} />
          Beach
        </label>
        <label>
          <input type="checkbox" name="mountain" checked={preferences.mountain} onChange={handleCheckboxChange} />
          Mountain
        </label>
        <label>
          <input type="checkbox" name="city" checked={preferences.city} onChange={handleCheckboxChange} />
          City
        </label>
      </div>

      <input 
        type="text" 
        placeholder="Visited Countries (comma separated)" 
        value={visited} 
        onChange={(e) => setVisited(e.target.value)} 
      />

      <button type="submit">Add</button>
    </form>
  );
}
