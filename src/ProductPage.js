// src/ProductPage.js
import { useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";

import logo from "./assets/logo.png";
import GiftIcon from "./assets/gift.svg";
import hamburger from "./assets/hamburger.svg";
import backChevron from "./assets/back-chevron.svg";
import { PRODUCTS } from "./data";

export default function ProductPage({ points = 100, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // controls the "Added to cart" toast
  const [showAdded, setShowAdded] = useState(false);

  const handleAddClick = () => {
    if (onAddToCart && product) {
      onAddToCart(product);
      setShowAdded(true);

      // hide message after 1.5s
      setTimeout(() => setShowAdded(false), 1500);
    }
  };

  // 1) Prefer the product passed via Link state from Category.js
  let product = location.state?.product || null;

  // 2) Fallback: scan PRODUCTS and match by id (string-safe)
  if (!product) {
    outer: for (const key of Object.keys(PRODUCTS)) {
      for (const p of PRODUCTS[key]) {
        if (String(p.id) === String(id)) {
          product = p;
          break outer;
        }
      }
    }
  }

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="screen product-screen">
      {/* HEADER — same pattern as Category.js */}
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

          <div className="header-right-spacer" />
        </div>

        {/* ROW 2: back link + points + cart */}
        <div className="home-header-row home-header-row2 header-row-with-back">
          <Link to="/" className="back-link">
            <img src={backChevron} alt="" className="back-icon-svg" />
            <span className="back-text">Back to categories</span>
          </Link>

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
      <main className="product-content">
        {/* IMAGE */}
        <div className="product-image-large"></div>

        {/* PRODUCT INFORMATION */}
        <h2 className="product-title">{product.name}</h2>

        <p className="product-description">
          {product.description || "Description coming soon."}
        </p>

        <p className="product-age">
          Recommended ages {product.ageRange || "5–18"}
        </p>

        {/* PRICE PANEL */}
        <div className="product-price-panel">
          <span className="price-label">Price</span>

          <div className="price-box">
            <span className="gift-icon">
              <img src={GiftIcon} alt="Points" className="points-svg" />
            </span>
            <span className="price-value">{product.cost}</span>
          </div>
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          className="add-to-cart-btn"
          onClick={handleAddClick}
        >
          ADD TO CART
        </button>

        {showAdded && (
          <div className="add-to-cart-toast">
            Added to cart
          </div>
        )}
      </main>
    </div>
  );
}
