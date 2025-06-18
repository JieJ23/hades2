import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Summary from "./Page/Summary.jsx";
import Tester from "./Page/Tester.jsx";
import FearCalculator from "./Page/FearCalculator.jsx";
import ArcaneDeck from "./Page/ArcaneDeck.jsx";
import Boons from "./Page/Boons.jsx";
import Hammer from "./Page/Hammer.jsx";
import HeatCalculator from "./Page/HeatCalculator.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Summary" element={<Summary />} />
        <Route path="/Tester" element={<Tester />} />
        <Route path="/FearCalculator" element={<FearCalculator />} />
        <Route path="/ArcaneDeck" element={<ArcaneDeck />} />
        <Route path="/Hammer" element={<Hammer />} />
        <Route path="/Boons" element={<Boons />} />
        <Route path="/HeatCalculator" element={<HeatCalculator />} />
      </Routes>
    </Router>
  </StrictMode>
);
