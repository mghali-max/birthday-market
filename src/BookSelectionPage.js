// src/BookSelectionPage.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/logo.png";
import GiftIcon from "./assets/gift.svg";

const BOOK_OPTIONS = [
  { id: "book1", name: "Adventure Story Book", cost: 35 },
  { id: "book2", name: "Animal Friends Book", cost: 35 },
  { id: "book3", name: "Bedtime Stories Book", cost: 35 },
];

export default function BookSelectionPage({ points, onAddToCart }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChoose = (book) => {
    setError("");

    if (onAddToCart) {
      const result = onAddToCart(book);
      if (result && !result.ok && result.reason === "insufficient") {
        setError("Not enough points remaining for this book.");
        return;
      }
    }

    // After book choice, go to main Birthday Market (Home)
    navigate("/");
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
        <h2 className="category-title">Choose a book</h2>
        <p className="category-subtitle">
          Select one book to add to your child&apos;s birthday bundle.
        </p>

        <div className="category-grid">
          {BOOK_OPTIONS.map((book) => (
            <button
              key={book.id}
              type="button"
              className="product-card"
              onClick={() => handleChoose(book)}
            >
              <div className="product-main">
                <div className="product-info">
                  <div className="product-name">{book.name}</div>
                </div>
                <div className="product-points">
                  <img src={GiftIcon} alt="Points" className="points-svg" />
                  <span>{book.cost}</span>
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
