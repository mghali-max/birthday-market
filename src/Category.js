import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import logo from "./assets/logo.png";
import GiftIcon from "./assets/gift.svg";
import hamburger from "./assets/hamburger.svg";
import { CATEGORIES, PRODUCTS } from "./data";
import backChevron from "./assets/back-chevron.svg";

const AGE_FILTERS = [
  { value: "all", label: "All ages" },
  { value: "under5", label: "Under 5 years" },
  { value: "5to12", label: "5–12 years" },
  { value: "12plus", label: "12+ years" },
];

export default function Category({ points = 100 }) {
  const { id } = useParams();
  const navigate = useNavigate(); // (currently unused, ok to delete if you want)

  const [ageFilter, setAgeFilter] = useState("all");
  const [isAgeMenuOpen, setIsAgeMenuOpen] = useState(false);

  const category = CATEGORIES.find((c) => c.id === id);
  const title = category ? category.name : "Category";

  const products = PRODUCTS[id] || [];

  // Safe age filtering
  const filteredProducts = products.filter((p) => {
    if (ageFilter === "all") return true;
    if (!p.ageGroup) return true;
    return p.ageGroup === ageFilter;
  });

  // Label for the collapsed pill
  const currentFilterLabel =
    AGE_FILTERS.find((f) => f.value === ageFilter)?.label || "All ages";

  return (
    <div className="screen category-screen">
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

      {/* MAIN CONTENT */}
      <main className="content">
        <h2 className="category-title">{title}</h2>

        {/* Age filter: pill + dropdown menu */}
        <div className="age-filter-bar">
          <button
            type="button"
            className="age-filter-toggle"
            onClick={() => setIsAgeMenuOpen((open) => !open)}
            aria-expanded={isAgeMenuOpen}
            aria-haspopup="listbox"
          >
            <span className="age-filter-label">Filter</span>
            <span className="age-filter-value">
              {currentFilterLabel}
              <span
                className={
                  "age-filter-caret" + (isAgeMenuOpen ? " open" : "")
                }
              />
            </span>
          </button>

          {isAgeMenuOpen && (
            <div className="age-filter-menu" role="listbox">
              {AGE_FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  role="option"
                  aria-selected={ageFilter === f.value}
                  className={
                    "age-filter-option" +
                    (ageFilter === f.value ? " active" : "")
                  }
                  onClick={() => {
                    setAgeFilter(f.value);
                    setIsAgeMenuOpen(false);
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-list">
          {filteredProducts.map((p, index) => (
            <Link
              key={p.id ?? `${id}-${index}`}
              to={`/product/${p.id ?? index}`}
              className="product-row-link"
              style={{ textDecoration: "none", color: "inherit" }}
              state={{ product: p }}
            >
              <div className="product-row">
                <div className="product-image" />

                <div className="product-info">
                  <div className="product-name">{p.name}</div>

                  <div className="product-points-row">
  <span className="product-gift-icon">
    <img src={GiftIcon} alt="Points" className="points-svg" />
  </span>
  <span className="product-points">{p.cost}</span>
</div>

                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
