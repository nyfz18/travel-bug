import { useEffect, useState } from "react";
import { fetchUsers } from "../api";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.user_id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}
