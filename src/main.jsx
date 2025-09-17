import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import EAstats from "./Page/EAstats.jsx";
import Ranking from "./Page/Ranking.jsx";
import FearCalculator from "./Page/FearCalculator.jsx";
import ArcanaDeck from "./Page/ArcanaDeck.jsx";
import GameplaySubmission from "./Page/GameplaySubmission.jsx";
import Query from "./Page/Query.jsx";
import QueryV1 from "./Page/QueryV1.jsx";
import { DataProvider } from "./Hook/DataFetch.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/EAstats" element={<EAstats />} />
          <Route path="/Ranking" element={<Ranking />} />
          <Route path="/FearCalculator" element={<FearCalculator />} />
          <Route path="/ArcanaDeck" element={<ArcanaDeck />} />
          <Route path="/GameplaySubmission" element={<GameplaySubmission />} />
          <Route path="/Query" element={<Query />} />
          <Route path="/QueryV1" element={<QueryV1 />} />
        </Routes>
      </Router>
    </DataProvider>
  </StrictMode>
);
