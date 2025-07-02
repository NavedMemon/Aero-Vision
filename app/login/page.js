"use client";
import "./login.css";
import Image from "next/image";
import aerologo from "@/public/images/airplane-logo.png.jpg";
import { useState } from "react";
import AirplaneCanvas from "./AirplaneCanvas.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    alert("✅ Login Successful!");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-wrapper">
          <Image src={aerologo} alt="Airplane Logo" className="login-logo" />
          <h1 className="brand-text">AEROVISION</h1>
        </div>
      </div>

      <div className="login-right">
        <h2 className="login-title">Welcome Back</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit" className="login-btn">
            Login
          </button>
          <p className="login-link">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
