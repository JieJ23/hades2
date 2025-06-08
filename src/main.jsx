import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Hades2 from "./Page/Hades2.jsx";
import FearCalculator from "./Page/FearCalculator.jsx";
import H2Stats from "./Page/H2Stats.jsx";
import ArcaneDeck from "./Page/ArcaneDeck.jsx";
import Builder from "./Page/Builder.jsx";
import Hammer from "./Page/Hammer.jsx";
import HeatCalculator from "./Page/HeatCalculator.jsx";
import Hades_v2 from "./Page/Hades_v2.jsx";
import Hades from "./Page/Hades.jsx";

import { DataProvider } from "./Comp/Hook.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Hades2" element={<Hades2 />} />
          <Route path="/H2Stats" element={<H2Stats />} />
          <Route path="/FearCalculator" element={<FearCalculator />} />
          <Route path="/ArcaneDeck" element={<ArcaneDeck />} />
          <Route path="/Hammer" element={<Hammer />} />
          <Route path="/Builder" element={<Builder />} />
          <Route path="/HeatCalculator" element={<HeatCalculator />} />
          <Route path="/Hades" element={<Hades />} />
          <Route path="/Hades_v2" element={<Hades_v2 />} />
        </Routes>
      </Router>
    </DataProvider>
  </StrictMode>
);
