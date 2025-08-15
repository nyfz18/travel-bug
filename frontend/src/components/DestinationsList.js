import { useEffect, useState } from "react";
import { fetchDestinations } from "../api";

export default function DestinationsList() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations()
      .then(data => setDestinations(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading destinations...</p>;

  return (
    <div>
      <h2>Destinations</h2>
      <ul>
        {destinations.map(dest => (
          <li key={dest.destination_id}>
            {dest.name}, {dest.country} - {dest.type}
          </li>
        ))}
      </ul>
    </div>
  );
}
