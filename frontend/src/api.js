const BASE_URL = "http://127.0.0.1:8000";

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

export const fetchDestinations = async () => {
  const response = await fetch(`${BASE_URL}/destinations`);
  if (!response.ok) throw new Error("Failed to fetch destinations");
  return response.json();
};
