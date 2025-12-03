// src/LoginPage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const TEMP_USER = "demo";
  const TEMP_PASS = "birthday123";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username !== TEMP_USER || password !== TEMP_PASS) {
      setError("Incorrect username or password.");
      return;
    }

    if (onLogin) onLogin();

    // 👉 go to survey first, not straight to home
    navigate("/survey");
  };

  return (
    <div className="screen">
      {/* LOGIN HEADER WITH CENTERED LOGO (login-only structure) */}
      <header className="header login-header">
        <div className="login-header-inner">
          <img
            src={logo}
            alt="Birthday Connections"
            className="logo-img header-logo"
          />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="auth-content">
        <h2 className="auth-title">Welcome</h2>
        <p className="auth-subtitle">Please log in to continue.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* USERNAME */}
          <div className="auth-field">
            <label className="auth-label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="auth-input"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="auth-field password-wrap">
            <label className="auth-label" htmlFor="password">
              Password
            </label>

            <input
              id="password"
              className="auth-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="show-hide-icon"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          {error && <div className="auth-error">{error}</div>}

          {/* LOGIN BUTTON */}
          <button type="submit" className="primary-login-btn">
            LOGIN
          </button>
        </form>

        {/* TEMP LOGIN INFO */}
        <p className="temp-login-hint">
          Temp Login: <b>demo</b> / <b>birthday123</b>
        </p>
      </main>
    </div>
  );
}
