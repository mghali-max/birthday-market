// src/SweetTreatSelectionPage.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/logo.png";
import GiftIcon from "./assets/gift.svg";

const TREAT_OPTIONS = [
  { id: "treat1", name: "Birthday Cupcakes", cost: 40 },
  { id: "treat2", name: "Cookie Platter", cost: 35 },
  { id: "treat3", name: "Mini Cake", cost: 45 },
];

export default function SweetTreatSelectionPage({ points, onAddToCart }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChoose = (treat) => {
    setError("");

    if (onAddToCart) {
      const result = onAddToCart(treat);
      if (result && !result.ok && result.reason === "insufficient") {
        setError("Not enough points remaining for this sweet treat.");
        return;
      }
    }

    navigate("/select-book");
  };

  return (
    <div className="screen">
      <header className="header login-header">
        <div className="login-header-inner">
          <img
            src={logo}
            alt="Birthday Connections"
            className="logo-img header-logo"
          />
        </div>
      </header>

      <main className="category-content">
        <h2 className="category-title">Choose a sweet treat</h2>
        <p className="category-subtitle">
          Pick one sweet treat to help celebrate your child&apos;s birthday.
        </p>

        <div className="category-grid">
          {TREAT_OPTIONS.map((treat) => (
            <button
              key={treat.id}
              type="button"
              className="product-card"
              onClick={() => handleChoose(treat)}
            >
              <div className="product-main">
                <div className="product-info">
                  <div className="product-name">{treat.name}</div>
                </div>
                <div className="product-points">
                  <img src={GiftIcon} alt="Points" className="points-svg" />
                  <span>{treat.cost}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {error && <div className="auth-error">{error}</div>}
      </main>
    </div>
  );
}
