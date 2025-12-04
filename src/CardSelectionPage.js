// src/CardSelectionPage.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/logo.png";
import GiftIcon from "./assets/gift.svg";

const CARD_OPTIONS = [
  { id: "card1", name: "Confetti Celebration Card", cost: 25 },
  { id: "card2", name: "Rainbow Birthday Card", cost: 25 },
  { id: "card3", name: "Stars & Wishes Card", cost: 25 },
];

export default function CardSelectionPage({ points, onAddToCart }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChoose = (card) => {
    setError("");

    if (onAddToCart) {
      const result = onAddToCart(card);
      if (result && !result.ok && result.reason === "insufficient") {
        setError("Not enough points remaining for this card.");
        return;
      }
    }

    navigate("/select-treat");
  };

  return (
    <div className="screen">
      {/* same header style as login/survey */}
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
        <h2 className="category-title">Choose a birthday card</h2>
        <p className="category-subtitle">
          Select one card to include in your child&apos;s birthday bundle.
        </p>

        <div className="category-grid">
          {CARD_OPTIONS.map((card) => (
            <button
              key={card.id}
              type="button"
              className="product-card"
              onClick={() => handleChoose(card)}
            >
              <div className="product-main">
                <div className="product-info">
                  <div className="product-name">{card.name}</div>
                </div>
                <div className="product-points">
                  <img src={GiftIcon} alt="Points" className="points-svg" />
                  <span>{card.cost}</span>
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
