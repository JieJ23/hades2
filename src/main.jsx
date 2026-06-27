import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Night from "./Page/Night.jsx";
import Dream from "./Page/Dream.jsx";
import Ladder from "./Page/Ladder.jsx";
import FearCalculator from "./Page/FearCalculator.jsx";
import ArcanaDeck from "./Page/ArcanaDeck.jsx";
import GameplaySubmission from "./Page/GameplaySubmission.jsx";

import Stats from "./Page/Stats.jsx";
import Resources from "./Page/Resources.jsx";

import DreamParameter from "./Page/DreamParameter.jsx";
import Enemy from "./Page/Enemy.jsx";
import FearPoints from "./Page/FearPoints.jsx";
import TimePB from "./Page/TimePB.jsx";

import { DataProvider } from "./Hook/DataFetch.jsx";

// New Pages
import Bingo1 from "./Page/Bingo1.jsx";
import Bingo2 from "./Page/Bingo2.jsx";
import TheGameAward from "./Page/TheGameAward.jsx";

import MapErebus from "./Page/MapErebus.jsx";
import MapOceanus from "./Page/MapOceanus.jsx";
import MapField from "./Page/MapField.jsx";
import MapTartarus from "./Page/MapTartarus.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Night" element={<Night />} />
          <Route path="/Dream" element={<Dream />} />
          <Route path="/Ladder" element={<Ladder />} />
          <Route path="/GameplaySubmission" element={<GameplaySubmission />} />

          <Route path="/FearCalculator" element={<FearCalculator />} />
          <Route path="/ArcanaDeck" element={<ArcanaDeck />} />

          <Route path="/Resources" element={<Resources />} />
          <Route path="/Stats" element={<Stats />} />
          <Route path="/DreamParameter" element={<DreamParameter />} />
          <Route path="/TimePB" element={<TimePB />} />
          <Route path="/FearPoints" element={<FearPoints />} />
          <Route path="/Enemy" element={<Enemy />} />

          <Route path="/Bingo1" element={<Bingo1 />} />
          <Route path="/Bingo2" element={<Bingo2 />} />
          <Route path="/TheGameAward" element={<TheGameAward />} />
          <Route path="/MapErebus" element={<MapErebus />} />
          <Route path="/MapOceanus" element={<MapOceanus />} />
          <Route path="/MapField" element={<MapField />} />
          <Route path="/MapTartarus" element={<MapTartarus />} />

        </Routes>
      </Router>
    </DataProvider>
  </StrictMode>,
);
