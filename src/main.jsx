import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Stats from "./Page/Stats.jsx";
import Speed from "./Page/Speed.jsx";
import Player from "./Page/Player.jsx";
import Ranking from "./Page/Ranking.jsx";
import Patch8 from "./Page/Patch8.jsx";
import FearCalculator from "./Page/FearCalculator.jsx";
import ArcanaDeck from "./Page/ArcanaDeck.jsx";
import Boons from "./Page/Boons.jsx";
import Hammer from "./Page/Hammer.jsx";
import Enemy from "./Page/Enemy.jsx";
import Blank from "./Page/Blank.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Stats" element={<Stats />} />
        <Route path="/Speed" element={<Speed />} />
        <Route path="/Player" element={<Player />} />
        <Route path="/Ranking" element={<Ranking />} />
        <Route path="/Patch8" element={<Patch8 />} />
        <Route path="/FearCalculator" element={<FearCalculator />} />
        <Route path="/ArcanaDeck" element={<ArcanaDeck />} />
        <Route path="/Hammer" element={<Hammer />} />
        <Route path="/Boons" element={<Boons />} />
        <Route path="/Enemy" element={<Enemy />} />
        <Route path="/Blank" element={<Blank />} />
      </Routes>
    </Router>
  </StrictMode>
);
