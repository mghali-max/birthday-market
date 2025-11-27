// src/Home.js
import logo from "./assets/logo.png";

import { Link } from "react-router-dom";
import { CATEGORIES } from "./data";

export default function Home({ points = 100, cartCount = 1 }) {
  return (
    <div className="screen">
      {/* Header */}
      <header className="header">
        <button className="icon-button">☰</button>

   <img
  src={logo}
  alt="Birthday Connections"
  className="logo-img"
/>



        <div className="header-right">
          {/* Points display */}
          <div className="points-inline">
            <span className="points-icon">🎁</span>
            <span className="points-label">Points</span>
            <span className="points-value">{points}</span>
          </div>

          {/* CLEAN CART ICON + BADGE */}
          <Link to="/cart" className="icon-button cart-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* wheels */}
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>

              {/* clean frame */}
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>

            {/* Badge – always visible for now */}
            <span className="cart-badge"></span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="content">
        <div className="content-header">
          <h3>Categories</h3>

          <button className="age-filter">
            <span>Filter by age</span>
            <span className="chevron">▾</span>
          </button>
        </div>

        {/* Category grid */}
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
  );
}
