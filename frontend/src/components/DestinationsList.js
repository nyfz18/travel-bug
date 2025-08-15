export default function DestinationsList({ destinations }) {
  const safeDestinations = Array.isArray(destinations) ? destinations : [];

  if (safeDestinations.length === 0) {
    return (
      <div className="destinations-list">
        <h2>Destinations</h2>
        <p>No destinations to show.</p>
      </div>
    );
  }

  return (
    <div className="destinations-list">
      <h2>Destinations</h2>
      <ul>
        {safeDestinations.map((dest, index) => (
          <li key={index}>{dest}</li>
        ))}
      </ul>
    </div>
  );
}
