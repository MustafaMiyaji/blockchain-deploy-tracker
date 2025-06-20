import React, { useState } from "react";
import AddLogForm from "./AddLogForm";

export default function ProtectedRoute() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [input, setInput] = useState("");

  // Environment variable or fallback to default
  const correctPassword = process.env.REACT_APP_LOG_PASSWORD || "admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === correctPassword) {
      setAccessGranted(true);
    } else {
      alert("🚫 Incorrect password");
    }
  };

  if (accessGranted) {
    return <AddLogForm />;
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🔐 Protected Access</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter password"
          style={{ padding: "0.5rem", marginRight: "1rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Unlock
        </button>
      </form>
    </div>
  );
}
