// src/ProductPage.js
import { useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";

import logo from "./assets/logo.png";
import GiftIcon from "./assets/gift.svg";
import hamburger from "./assets/hamburger.svg";
import backChevron from "./assets/back-chevron.svg";
import { PRODUCTS, CATEGORIES } from "./data";

export default function ProductPage({ points = 100, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // drawer state
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // modal states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [insufficientOpen, setInsufficientOpen] = useState(false);

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

  // --- Find this product's parent category so we can show "Back to Toys", etc. ---
  let parentCategoryId = null;

  for (const key of Object.keys(PRODUCTS)) {
    if (PRODUCTS[key].some((p) => String(p.id) === String(product.id))) {
      parentCategoryId = key;
      break;
    }
  }

  const parentCategoryName =
    CATEGORIES.find((c) => c.id === parentCategoryId)?.name || "categories";

  const parentCategoryPath = parentCategoryId
    ? `/category/${parentCategoryId}`
    : "/";

  // Main button click
  const handleAddClick = () => {
    const cost = Number(product.cost) || 0;

    // if not enough points, show "insufficient" modal
    if (cost > points) {
      setInsufficientOpen(true);
      return;
    }

    // otherwise, show confirm modal
    setConfirmOpen(true);
  };

  // Confirm inside modal
  const handleConfirmAdd = () => {
    if (!onAddToCart) {
      setConfirmOpen(false);
      return;
    }

    const result = onAddToCart(product);

    if (result && result.ok) {
      // success: just close the modal (header points + cart already reflect it)
      setConfirmOpen(false);
    } else if (result && result.reason === "insufficient") {
      // in case points changed between click and confirm
      setConfirmOpen(false);
      setInsufficientOpen(true);
    } else {
      setConfirmOpen(false);
    }
  };

  return (
    <div className="screen product-screen">
      {/* Everything that slides lives in screen-inner */}
      <div className={`screen-inner ${menuOpen ? "shifted" : ""}`}>
        {/* HEADER — same pattern as Category.js */}
        <header className="header">
          {/* ROW 1: hamburger + centered logo */}
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

          {/* ROW 2: dynamic back link + points + cart */}
          <div className="home-header-row home-header-row2 header-row-with-back">
            <Link to={parentCategoryPath} className="back-link">
              <img src={backChevron} alt="" className="back-icon-svg" />
              <span className="back-text">Back to {parentCategoryName}</span>
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
        </main>
      </div>

      {/* DRAWER + OVERLAY */}
      {menuOpen && (
        <>
          <div
            className="drawer-overlay"
            onClick={() => setMenuOpen(false)}
          />

          <nav className="drawer">
            {/* Close button */}
            <button
              className="drawer-close-btn"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>

            {/* HOME */}
            <button
              className="drawer-item"
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              Home
            </button>

            {/* CATEGORIES ACCORDION */}
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

      {/* CONFIRM ADD MODAL */}
      {confirmOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Add to cart?</h3>
            <p className="modal-text">
              Add <strong>{product.name}</strong> for{" "}
              <strong>{product.cost}</strong> points?
            </p>
            <p className="modal-text">
              You’ll have{" "}
              <strong>{points - (Number(product.cost) || 0)}</strong>{" "}
              points left.
            </p>

            <div className="modal-actions">
              <button
                className="modal-btn secondary"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="modal-btn primary"
                onClick={handleConfirmAdd}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INSUFFICIENT POINTS MODAL */}
      {insufficientOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Not enough points</h3>
            <p className="modal-text">
              This item costs <strong>{product.cost}</strong> points, but
              you only have <strong>{points}</strong> points.
            </p>
            <p className="modal-text">
              Please choose another item or remove something from your cart.
            </p>

            <div className="modal-actions">
              <button
                className="modal-btn primary"
                onClick={() => setInsufficientOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
