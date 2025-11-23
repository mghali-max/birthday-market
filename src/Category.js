// src/Category.js
import { useParams, Link } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "./data";

export default function Category({ points }) {
  const { id } = useParams();

  const items =
    id === "browse-all"
      ? Object.values(PRODUCTS).flat()
      : PRODUCTS[id] || [];

  const category = CATEGORIES.find((c) => c.id === id);

  return (
    <div className="category-screen">
      {/* HEADER */}
      <div className="category-header">
        <div className="header-top">
          <Link to="/" className="back-arrow">←</Link>
          <div className="header-title">Categories</div>
          <div className="header-icons">
            <div className="points-pill">
              <span className="points-icon">🎁</span>
              <span className="points-value">{points}</span>
            </div>
            <div className="cart-icon">🛒</div>
          </div>
        </div>

        <div className="logo-large">
          <span className="logo-main-large">BIRTHDAY</span>
          <span className="logo-sub-large">connections</span>
        </div>
      </div>

      {/* CATEGORY LABEL BAR */}
      <div className="category-label-bar">
        <div className="category-label">{category?.name || "Category"}</div>
      </div>

      {/* PRODUCT LIST */}
      <div className="product-list">
        {items.map((item) => (
          <div className="product-row" key={item.id}>
            <div className="product-image"></div>

            <div className="product-info">
              <div className="product-name">{item.name}</div>

              <div className="product-points-row">
                <span className="gift-icon">🎁</span>
                <span className="product-points">{item.cost}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
