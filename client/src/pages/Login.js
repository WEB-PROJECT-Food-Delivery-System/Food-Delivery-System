import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token); // store token
      alert("Login successful!");
      navigate("/dashboard"); // or home
    } catch (err) {
      setError(err.response.data.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
