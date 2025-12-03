// src/Login.js
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just send them to the main shopping home.
    // Later we'll change this to go to /survey once that page exists.
    navigate("/");
  };

  return (
    <div className="screen">
      <header className="header">
        <div className="home-header-row home-header-row1">
          <div className="header-left" />
          <div className="header-center">
            <img
              src={logo}
              alt="Birthday Connections"
              className="logo-img header-logo"
            />
          </div>
          <div className="header-right-spacer" />
        </div>
      </header>

      <main className="auth-content">
        <h2 className="auth-title">Welcome</h2>
        <p className="auth-subtitle">
          Please log in to start your birthday shopping.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label" htmlFor="parentName">
              Your name
            </label>
            <input
              id="parentName"
              className="auth-input"
              type="text"
              placeholder="Parent or guardian name"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="childName">
              Birthday child’s name
            </label>
            <input
              id="childName"
              className="auth-input"
              type="text"
              placeholder="First name"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="code">
              Access code
            </label>
            <input
              id="code"
              className="auth-input"
              type="password"
              placeholder="Enter access code"
            />
          </div>

          <button type="submit" className="auth-button">
            CONTINUE
          </button>
        </form>
      </main>
    </div>
  );
}
