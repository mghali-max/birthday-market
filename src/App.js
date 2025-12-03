// src/App.js
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Home";
import Category from "./Category";
import ProductPage from "./ProductPage";
import Cart from "./Cart";
import LoginPage from "./LoginPage";
import SurveyPage from "./SurveyPage";
import "./App.css";

function App() {
  const INITIAL_POINTS = 650;

  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSurveyComplete, setIsSurveyComplete] = useState(false); // 👈 NEW

  // how many points have been spent
  const totalCost = cartItems.reduce(
    (sum, item) => sum + (item.cost || 0),
    0
  );

  // points left for the user
  const remainingPoints = INITIAL_POINTS - totalCost;

  // Add a product to cart, but NEVER allow negative points.
  // Returns an object so the caller can react:
  // { ok: true, remaining: number }
  // { ok: false, reason: "insufficient" | "no-product", points: number }
  const handleAddToCart = (product) => {
    if (!product) {
      return { ok: false, reason: "no-product", points: remainingPoints };
    }

    const cost = Number(product.cost) || 0;

    // If the item costs more than the points they have left, block it.
    if (cost > remainingPoints) {
      return { ok: false, reason: "insufficient", points: remainingPoints };
    }

    // Add item to cart
    setCartItems((prev) => [...prev, product]);

    const newRemaining = remainingPoints - cost;

    return { ok: true, remaining: newRemaining };
  };

  // Remove item by index
  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleLogin = () => {
    // later we can store child name / code here if needed
    setIsLoggedIn(true);
    setIsSurveyComplete(false); // 👈 reset on fresh login
  };

  const handleSurveyComplete = () => {
    setIsSurveyComplete(true);
  };

  // helper so we don't repeat logic
  const requireSurvey = (element) =>
    isLoggedIn
      ? isSurveyComplete
        ? element
        : <Navigate to="/survey" replace />
      : <Navigate to="/login" replace />;

  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          {/* LOGIN ROUTE (always allowed) */}
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          />

          {/* SURVEY ROUTE (must be logged in) */}
          <Route
            path="/survey"
            element={
              isLoggedIn ? (
                <SurveyPage onComplete={handleSurveyComplete} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* HOME (protected by login + survey) */}
          <Route
            path="/"
            element={requireSurvey(
              <Home points={remainingPoints} />
            )}
          />

          {/* CATEGORY (protected) */}
          <Route
            path="/category/:id"
            element={requireSurvey(
              <Category points={remainingPoints} />
            )}
          />

          {/* PRODUCT (protected) */}
          <Route
            path="/product/:id"
            element={requireSurvey(
              <ProductPage
                points={remainingPoints}
                onAddToCart={handleAddToCart}
              />
            )}
          />

          {/* CART (protected) */}
          <Route
            path="/cart"
            element={requireSurvey(
              <Cart
                points={remainingPoints}
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
              />
            )}
          />

          {/* CATCH-ALL: send people to the right place */}
          <Route
            path="*"
            element={
              !isLoggedIn ? (
                <Navigate to="/login" replace />
              ) : isSurveyComplete ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/survey" replace />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
