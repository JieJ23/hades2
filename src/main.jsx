import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Dream from "./Page/Dream.jsx";
import GameStats from "./Page/GameStats.jsx";
import Loadout from "./Page/Loadout.jsx";
import Ladder from "./Page/Ladder.jsx";
import FearCalculator from "./Page/FearCalculator.jsx";
import ArcanaDeck from "./Page/ArcanaDeck.jsx";
import GameplaySubmission from "./Page/GameplaySubmission.jsx";

import Stats from "./Page/Stats.jsx";
import Resources from "./Page/Resources.jsx";

import DreamParameter from "./Page/DreamParameter.jsx";
import Speed62 from "./Page/Speed62.jsx";
import Enemy from "./Page/Enemy.jsx";
import ProfileSum from "./Page/ProfileSum.jsx";
import CustomChaos from "./Page/CustomChaos.jsx";
import CustomStart from "./Page/CustomStart.jsx";
import FearPoints from "./Page/FearPoints.jsx";
import TimePB from "./Page/TimePB.jsx";

import EALadder from "./Page/EALadder.jsx";
import EAQuery from "./Page/EAQuery.jsx";
import EARanking from "./Page/EARanking.jsx";
import EAStat from "./Page/EAStat.jsx";

import PeriodicTable from "./Page/PeriodicTable.jsx";
import { DataProvider } from "./Hook/DataFetch.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Dream" element={<Dream />} />
          <Route path="/GameStats" element={<GameStats />} />
          <Route path="/Loadout" element={<Loadout />} />
          <Route path="/Ladder" element={<Ladder />} />
          <Route path="/FearCalculator" element={<FearCalculator />} />
          <Route path="/ArcanaDeck" element={<ArcanaDeck />} />
          <Route path="/GameplaySubmission" element={<GameplaySubmission />} />

          <Route path="/Stats" element={<Stats />} />
          <Route path="/Resources" element={<Resources />} />

          <Route path="/DreamParameter" element={<DreamParameter />} />
          <Route path="/Speed62" element={<Speed62 />} />
          <Route path="/TimePB" element={<TimePB />} />
          <Route path="/FearPoints" element={<FearPoints />} />
          <Route path="/CustomChaos" element={<CustomChaos />} />
          <Route path="/CustomStart" element={<CustomStart />} />
          <Route path="/Enemy" element={<Enemy />} />
          <Route path="/ProfileSum" element={<ProfileSum />} />

          <Route path="/EALadder" element={<EALadder />} />
          <Route path="/EAStat" element={<EAStat />} />
          <Route path="/EARanking" element={<EARanking />} />
          <Route path="/EAQuery" element={<EAQuery />} />

          <Route path="/PeriodicTable" element={<PeriodicTable />} />
        </Routes>
      </Router>
    </DataProvider>
  </StrictMode>,
);
