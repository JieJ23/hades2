import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import P910Stats from "./Page/P910Stats.jsx";
import EAstats from "./Page/EAstats.jsx";
import Trend from "./Page/Trend.jsx";
import Player from "./Page/Player.jsx";
import Ranking from "./Page/Ranking.jsx";
import Patch8 from "./Page/Patch8.jsx";
import FearCalculator from "./Page/FearCalculator.jsx";
import ArcanaDeck from "./Page/ArcanaDeck.jsx";
import Boons from "./Page/Boons.jsx";
import Hammer from "./Page/Hammer.jsx";
import Enemy from "./Page/Enemy.jsx";
import Playground from "./Page/Playground.jsx";
import GameplaySubmission from "./Page/GameplaySubmission.jsx";
import Query from "./Page/Query.jsx";
import Gameplay from "./Page/Gameplay.jsx";
import MetaUpgradeEditor from "./Page/MetaUpgradeEditor.jsx";
import { DataProvider } from "./Hook/DataFetch.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/P910Stats" element={<P910Stats />} />
          <Route path="/EAstats" element={<EAstats />} />
          <Route path="/Trend" element={<Trend />} />
          <Route path="/Player" element={<Player />} />
          <Route path="/Ranking" element={<Ranking />} />
          <Route path="/Patch8" element={<Patch8 />} />
          <Route path="/FearCalculator" element={<FearCalculator />} />
          <Route path="/ArcanaDeck" element={<ArcanaDeck />} />
          <Route path="/Hammer" element={<Hammer />} />
          <Route path="/Boons" element={<Boons />} />
          <Route path="/Enemy" element={<Enemy />} />
          <Route path="/Playground" element={<Playground />} />
          <Route path="/GameplaySubmission" element={<GameplaySubmission />} />
          <Route path="/Query" element={<Query />} />
          <Route path="/Gameplay" element={<Gameplay />} />
          <Route path="/MetaUpgradeEditor" element={<MetaUpgradeEditor />} />
        </Routes>
      </Router>
    </DataProvider>
  </StrictMode>
);
