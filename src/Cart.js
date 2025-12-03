// src/Cart.js
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import GiftIcon from "./assets/gift.svg";
import hamburger from "./assets/hamburger.svg";

export default function Cart({
  points = 100,
  cartItems = [],
  onRemoveFromCart,
}) {
  const navigate = useNavigate();

  const totalCost = cartItems.reduce((sum, item) => sum + (item.cost || 0), 0);

  return (
    <div className="screen category-screen">
      <header className="header">
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

      {/* MAIN */}
      <main className="content">
        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
  {cartItems.map((item, index) => (
    <li key={index} className="cart-item-row">
      {/* LEFT: thumbnail + text */}
      <div className="cart-item-info">
        {/* Thumbnail placeholder */}
        <div className="cart-thumb"></div>

        {/* Name + points */}
        <div className="cart-text">
          <div className="cart-item-name">{item.name}</div>

          <div className="cart-item-points">
            <span className="gift-icon">
              <img src={GiftIcon} alt="Points" className="points-svg" />
            </span>
            <span className="product-points">{item.cost}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: remove button */}
      {onRemoveFromCart && (
        <button
          className="cart-remove-btn"
          onClick={() => onRemoveFromCart(index)}
        >
          Remove
        </button>
      )}
    </li>
  ))}
</ul>

            <div className="cart-summary">
              <div className="cart-summary-row">
  <span>Total cost</span>
  <span className="cart-summary-points">
    <span className="gift-icon">
      <img src={GiftIcon} alt="Points" className="points-svg" />
    </span>
    <span className="product-points">{totalCost}</span>
  </span>
</div>

            </div>
          </>
        )}
      </main>
    </div>
  );
}
