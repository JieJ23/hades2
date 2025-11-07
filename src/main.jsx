import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";

import Archive from "./Page/Archive.jsx";

import Query from "./Page/Query.jsx";
import Ladder from "./Page/Ladder.jsx";
import FearPoints from "./Page/FearPoints.jsx";
import StatsCodex from "./Page/StatsCodex.jsx";
import Weekly from "./Page/Weekly.jsx";

//
import KeepsakesStats from "./Page/KeepsakesStats.jsx";
import VowsStats from "./Page/VowsStats.jsx";
import ArcanaStats from "./Page/ArcanaStats.jsx";

//

import EALadder from "./Page/EALadder.jsx";
import EAQuery from "./Page/EAQuery.jsx";
import EARanking from "./Page/EARanking.jsx";
import EAStat from "./Page/EAStat.jsx";

import FearCalculator from "./Page/FearCalculator.jsx";
import ArcanaDeck from "./Page/ArcanaDeck.jsx";
import GameplaySubmission from "./Page/GameplaySubmission.jsx";

import { DataProvider } from "./Hook/DataFetch.jsx";

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
