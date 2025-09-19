import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";

import QueryV1 from "./Page/QueryV1.jsx";

import EALadder from "./Page/EALadder.jsx";
import EAQuery from "./Page/EAQuery.jsx";
import EARanking from "./Page/EARanking.jsx";
import EAStat from "./Page/EAStat.jsx";

import FearCalculator from "./Page/FearCalculator.jsx";
import ArcanaDeck from "./Page/ArcanaDeck.jsx";
import GameplaySubmission from "./Page/GameplaySubmission.jsx";

// import { DataProvider } from "./Hook/DataFetch.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <DataProvider> */}
    <Router>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/QueryV1" element={<QueryV1 />} />

        <Route path="/EALadder" element={<EALadder />} />
        <Route path="/EAStat" element={<EAStat />} />
        <Route path="/EARanking" element={<EARanking />} />
        <Route path="/EAQuery" element={<EAQuery />} />

        <Route path="/FearCalculator" element={<FearCalculator />} />
        <Route path="/ArcanaDeck" element={<ArcanaDeck />} />
        <Route path="/GameplaySubmission" element={<GameplaySubmission />} />
      </Routes>
    </Router>
    {/* </DataProvider> */}
  </StrictMode>
);
