import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/auth/register.css"


export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message || "Registration failed");
    }
  };

  return (
<div className="register-form">
  <h2>Register</h2>
  {error && <p className="error">{error}</p>}
  <form onSubmit={handleSubmit}>
    <input name="name" placeholder="Name" onChange={handleChange} required /><br />
    <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
    <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
    <select name="role" onChange={handleChange}>
      <option value="customer">Customer</option>
      <option value="restaurant">Restaurant</option>
    </select><br />
    <button type="submit">Register</button>
  </form>
</div>
  );
}
