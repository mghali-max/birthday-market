// src/ProductPage.js
import { useParams, useNavigate, Link } from "react-router-dom";
import logo from "./assets/logo.png";
import { PRODUCTS, CATEGORIES } from "./data";

export default function ProductPage({ points = 100 }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // find which product this is by scanning PRODUCTS
  let product = null;
  Object.keys(PRODUCTS).forEach((key) => {
    const found = PRODUCTS[key].find((p) => p.id === id);
    if (found) product = found;
  });

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="screen product-screen">
      {/* HEADER */}
      <header className="product-header">
        <div className="product-header-row1">
          <button className="icon-button" onClick={() => navigate(-1)}>❮</button>
          <span className="header-title">Browse</span>

          <button className="icon-button">☰</button>
        </div>
      </header>

      {/* MAIN */}
      <main className="product-content">

        {/* IMAGE */}
        <div className="product-image-large"></div>

        {/* Points + cart top-right */}
        <div className="product-top-actions">
          <div className="points-inline">
            <span className="points-icon">🎁</span>
            <span className="points-value">{points}</span>
          </div>

          <Link to="/cart" className="icon-button cart-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </Link>
        </div>

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
            <span className="gift-icon">🎁</span>
            <span className="price-value">{product.cost}</span>
          </div>
        </div>

        {/* ADD TO CART BUTTON */}
        <button className="add-to-cart-btn">
          <span className="add-cart-icon">🛒</span>
          ADD TO CART
        </button>
      </main>
    </div>
  );
}
