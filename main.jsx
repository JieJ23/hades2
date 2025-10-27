import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./src/App.jsx";

import Archive from "./src/Page/Archive.jsx";

import Query from "./src/Page/Query.jsx";
import Ladder from "./src/Page/Ladder.jsx";
import FearPoints from "./src/Page/FearPoints.jsx";
import StatsCodex from "./src/Page/StatsCodex.jsx";
import Weekly from "./src/Page/Weekly.jsx";

//
import KeepsakesStats from "./src/Page/KeepsakesStats.jsx";
import VowsStats from "./src/Page/VowsStats.jsx";
import ArcanaStats from "./src/Page/ArcanaStats.jsx";

//

import EALadder from "./src/Page/EALadder.jsx";
import EAQuery from "./src/Page/EAQuery.jsx";
import EARanking from "./src/Page/EARanking.jsx";
import EAStat from "./src/Page/EAStat.jsx";

import FearCalculator from "./src/Page/FearCalculator.jsx";
import ArcanaDeck from "./src/Page/ArcanaDeck.jsx";
import GameplaySubmission from "./src/Page/GameplaySubmission.jsx";

import { DataProvider } from "./src/Hook/DataFetch.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />

          <Route path="/Query" element={<Query />} />
          <Route path="/Archive" element={<Archive />} />

          <Route path="/Ladder" element={<Ladder />} />
          <Route path="/FearPoints" element={<FearPoints />} />
          <Route path="/StatsCodex" element={<StatsCodex />} />

          <Route path="/KeepsakesStats" element={<KeepsakesStats />} />
          <Route path="/VowsStats" element={<VowsStats />} />
          <Route path="/ArcanaStats" element={<ArcanaStats />} />
          <Route path="/Weekly" element={<Weekly />} />

          <Route path="/EALadder" element={<EALadder />} />
          <Route path="/EAStat" element={<EAStat />} />
          <Route path="/EARanking" element={<EARanking />} />
          <Route path="/EAQuery" element={<EAQuery />} />

          <Route path="/FearCalculator" element={<FearCalculator />} />
          <Route path="/ArcanaDeck" element={<ArcanaDeck />} />
          <Route path="/GameplaySubmission" element={<GameplaySubmission />} />
        </Routes>
      </Router>
    </DataProvider>
  </StrictMode>
);
