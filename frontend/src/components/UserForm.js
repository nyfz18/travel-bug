import { useState } from "react";
import { addUser } from "../api";
import "../style/UserForm.css";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser({ name, email });
      setName("");
      setEmail("");
      alert("User added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add user");
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}
