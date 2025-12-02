// src/Home.js
import logo from "./assets/logo.png";
import GiftIcon from "./assets/gift.svg";   // <-- NEW
import { Link } from "react-router-dom";
import { CATEGORIES } from "./data";
import hamburger from "./assets/hamburger.svg";


export default function Home({ points = 100 }) {
  return (
    <div className="screen">
      <header className="header">
        {/* ROW 1: hamburger + centered logo */}
        <div className="home-header-row home-header-row1">
          <div className="header-left">
            <button className="icon-button" aria-label="Menu">
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

          {/* empty spacer so the logo is truly centered between left/right columns */}
          <div className="header-right-spacer" />
        </div>

        {/* ROW 2: points + cart, bottom-right */}
        <div className="home-header-row home-header-row2">
          <div className="header-right">
            <div className="points-inline">
              <span className="points-icon">
                <img src={GiftIcon} alt="Points" className="points-svg" />
              </span>
              <span className="points-value">{points}</span>
            </div>

            <Link
              to="/cart"
              className="icon-button cart-button"
              aria-label="Cart"
            >
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
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENT */}
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
  );
}
