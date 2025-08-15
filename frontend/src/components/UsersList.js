export default function UsersList({ users }) {
  return (
    <div className="users-list">
      <h2>Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>{user.name}</strong> - Preferences: {Object.keys(user.preferences).filter(p => user.preferences[p]).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
