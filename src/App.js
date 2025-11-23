// src/App.js
import "./App.css";
import Home from "./Home";
import Category from "./Category";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const startingPoints = 100; // we'll hook this into state later

  return (
    <div className="app-root">
      <Router>
        <Routes>
          <Route path="/" element={<Home points={startingPoints} />} />
          <Route path="/category/:id" element={<Category points={startingPoints} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
