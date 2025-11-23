// src/Home.js
import { Link } from "react-router-dom";
import { CATEGORIES } from "./data";

export default function Home({ points = 100 }) {
  return (
    <div className="screen">
      {/* Header */}
      <header className="header">
        <button className="icon-button">☰</button>

        <div className="logo">
          <span className="logo-main">BIRTHDAY</span>
          <span className="logo-sub">connections</span>
        </div>

        <div className="header-right">
          {/* Points display */}
          <div className="points-inline">
            <span className="points-icon">🎁</span>
            <span className="points-label">Points</span>
            <span className="points-value">{points}</span>
          </div>

          {/* CLEAN + CENTERED CART ICON */}
          <button className="icon-button cart-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
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

              {/* handle with small gap */}
              <path d="M1 1h3.2" />
              <path d="M5.2 1h1.8" />

              {/* top bar + basket */}
              <path d="M5 6H23" />
              <path d="M6 6l2.3 12.4a2 2 0 0 0 2 1.6h9.4a2 2 0 0 0 2-1.6L23 6" />

              {/* notification dot */}
              <circle cx="20.5" cy="4" r="2" fill="#df5c57" stroke="none" />
            </svg>
          </button>
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
