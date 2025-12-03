// src/Home.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "./assets/logo.png";
import GiftIcon from "./assets/gift.svg";
import hamburger from "./assets/hamburger.svg";
import { CATEGORIES } from "./data";

export default function Home({ points = 100 }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <div className="screen">
      {/* Everything that shifts lives inside screen-inner */}
      <div className={`screen-inner ${menuOpen ? "shifted" : ""}`}>
        <header className="header">
          <div className="home-header-row home-header-row1">
            <div className="header-left">
              <button
                className="icon-button"
                aria-label="Menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <img src={hamburger} alt="Menu" className="hamburger-svg" />
              </button>
            </div>

            <div className="header-center">
              <img
                src={logo}
                alt="Birthday Connections"
                className="logo-img header-logo"
              />
            </div>

            <div className="header-right-spacer" />
          </div>

          <div className="home-header-row home-header-row2">
            <div className="header-right">
              <div className="points-inline">
                <span className="points-icon">
                  <img src={GiftIcon} alt="Points" className="points-svg" />
                </span>
                <span className="points-value">{points}</span>
              </div>

              <Link to="/cart" className="icon-button cart-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cart-svg"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </Link>
            </div>
          </div>
        </header>

        <main className="content">
          <div className="content-header">
            <h3 className="section-title">Categories</h3>
          </div>

          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className={`category-card ${cat.colorClass}`}
                style={{ textDecoration: "none" }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </main>
      </div>

      {/* DRAWER */}
      {menuOpen && (
        <>
          <div
            className="drawer-overlay"
            onClick={() => setMenuOpen(false)}
          />

          <nav className="drawer">
            {/* Close btn */}
            <button
              className="drawer-close-btn"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>

            {/* HOME LINK (NEW) */}
            <button
              className="drawer-item"
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              Home
            </button>

            {/* CATEGORIES (expandable) */}
            <button
              className="drawer-item drawer-item-header"
              onClick={() => setCategoriesOpen((open) => !open)}
            >
              <span>Categories</span>
              <span
                className={`drawer-caret ${
                  categoriesOpen ? "open" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {categoriesOpen && (
              <div className="drawer-sublist">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className="drawer-subitem"
                    onClick={() => {
                      navigate(`/category/${cat.id}`);
                      setMenuOpen(false);
                      setCategoriesOpen(false);
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}

            {/* CART */}
            <button
              className="drawer-item"
              onClick={() => {
                navigate("/cart");
                setMenuOpen(false);
              }}
            >
              My Cart
            </button>

            {/* SIGN OUT */}
            <button
              className="drawer-item drawer-item-danger"
              onClick={() => {
                alert("Signed out (placeholder)");
                setMenuOpen(false);
              }}
            >
              Sign out
            </button>
          </nav>
        </>
      )}
    </div>
  );
}
