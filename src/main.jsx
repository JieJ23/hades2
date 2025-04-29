import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import FearCalculator from "./Page/FearCalculator.jsx";
import ArcaneDeck from "./Page/ArcaneDeck.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/FearCalculator" element={<FearCalculator />} />
        <Route path="/ArcaneDeck" element={<ArcaneDeck />} />
      </Routes>
    </Router>
  </StrictMode>
);
