// src/App.js
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Category from "./Category";
import ProductPage from "./ProductPage";
import Cart from "./Cart";
import "./App.css";

function App() {
  const INITIAL_POINTS = 650;

  const [cartItems, setCartItems] = useState([]);

  // how many points have been spent
  const totalCost = cartItems.reduce(
    (sum, item) => sum + (item.cost || 0),
    0
  );

  // points left for the user
  const remainingPoints = INITIAL_POINTS - totalCost;

  // Add a product to cart
  const handleAddToCart = (product) => {
    if (!product) return;
    setCartItems((prev) => [...prev, product]);
  };

  // Remove item by index
  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<Home points={remainingPoints} />} />

          <Route
            path="/category/:id"
            element={<Category points={remainingPoints} />}
          />

          <Route
            path="/product/:id"
            element={
              <ProductPage
                points={remainingPoints}
                onAddToCart={handleAddToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                points={remainingPoints}
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
