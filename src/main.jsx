import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";

import Archive from "./Page/Archive.jsx";
import TheGameAward from "./Page/TheGameAward.jsx";
import ProfileSum from "./Page/ProfileSum.jsx";
import Enemy from "./Page/Enemy.jsx";

import Root from "./Page/Root.jsx";

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

import Service from "./Page/Service.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Service />} />

          <Route path="/Query" element={<Service />} />
          <Route path="/Archive" element={<Service />} />

          <Route path="/Root" element={<Service />} />
          <Route path="/Enemy" element={<Enemy />} />
          <Route path="/ProfileSum" element={<ProfileSum />} />

          <Route path="/TheGameAward" element={<TheGameAward />} />

          <Route path="/Ladder" element={<Service />} />
          <Route path="/FearPoints" element={<Service />} />
          <Route path="/StatsCodex" element={<Service />} />

          <Route path="/KeepsakesStats" element={<Service />} />
          <Route path="/VowsStats" element={<Service />} />
          <Route path="/ArcanaStats" element={<Service />} />
          <Route path="/Weekly" element={<Service />} />

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
