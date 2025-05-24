import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import "../styles/auth/login.css";


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
      localStorage.setItem("role", res.data.user.role); // store role
localStorage.setItem("userId", res.data.user.id);

if (res.data.user.role === "customer") {
  navigate("/foods");
} else if (res.data.user.role === "restaurant") {
  navigate("/admin/dashboard");
}
    } catch (err) {
      setError(err.response.data.message || "Login failed");
    }
  };

  return (
    <div className="login-form">
  <h2>Login</h2>
  {error && <p className="error">{error}</p>}
  <form onSubmit={handleSubmit}>
    <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
    <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
    <button type="submit">Login</button>
    <hr />
    <a href="/register">Don't have an account? Register now</a>
  </form>
</div>

  );
}
