import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import { useState, useEffect } from "react";
import Footer from "../Comp/Footer";
import { afvariables } from "../Data/AnyFearV";
import { Link } from "react-router-dom";

import { runs } from "../Data/AnyFearData";

export function getTime(decimalSeconds) {
  const minutes = Math.floor(decimalSeconds / 60);
  const remainingSeconds = decimalSeconds - minutes * 60;
  const seconds = Math.floor(remainingSeconds);
  const milliseconds = Math.round((remainingSeconds - seconds) * 100);

  return `${minutes}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
}

const regions = [`qyz4vnd1`, `ln8345nl`];
const patches = [
  "lx54x231",
  "q5v8ow7l",
  "qoxnd6xq",
  "1pynz7v1",
  "lr30g6ol",
  "1gno50ol",
  "qzn7x78q",
  "1pywp8e1",
  "qyze29d1",
];

export default function AnyFearSRC() {
  const [region, setRegion] = useState(`qyz4vnd1`);
  const [patch, setPatch] = useState(`qyze29d1`);
  const [aspect, setAspect] = useState(null);

  // const [feed, setFeed] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function load() {
  //     try {
  //       const cached = localStorage.getItem("are");
  //       if (cached) {
  //         setFeed(JSON.parse(cached));
  //         setLoading(false);
  //         return; // Skip fetching if cached exists
  //       }
  //       const response = await fetch(`https://www.speedrun.com/api/v1/leaderboards/3dxy5vv6/category/wk6yjved`);
  //       const posts = await response.json();
  //       setFeed(posts);
  //       localStorage.setItem("are", JSON.stringify(posts)); // save for next time
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     }
  //   }

  //   load();
  // }, []);

  //
  const srcRanking = runs.filter((obj) => obj.place);
  const filterData = srcRanking.filter(
    (obj) => obj.run.values["68k17yzl"] === region && obj.run.values["onv5935l"] === patch
  );
  const allAspects = [...new Set(filterData.map((obj) => obj.run.values["2lge1eq8"]))];

  const displayData = aspect === null ? filterData : filterData.filter((obj) => obj.run.values["2lge1eq8"] === aspect);

  return (
    <div className="relative">
      <Background />
      <div className="max-w-[1400px] font-[Ale] text-[12px] mx-auto text-gray-300 select-none px-1">
        <SideNav />
        <>
          <div className="flex flex-wrap gap-1 px-2 font-[Ubuntu] text-[10px] uppercase my-1">
            {regions.map((item) => (
              <button
                className={`rounded px-2 py-1 text-[10px] uppercase cursor-pointer ${
                  region === item ? `text-black bg-[#00ffaa]` : `text-white`
                }`}
                onClick={() => setRegion(item)}
              >
                {afvariables[item]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 px-2 font-[Ubuntu] text-[10px] uppercase my-1">
            {patches.map((item) => (
              <button
                className={`rounded px-2 py-1 text-[10px] uppercase cursor-pointer ${
                  patch === item ? `text-black bg-white` : `text-white`
                }`}
                onClick={() => setPatch(item)}
              >
                {afvariables[item]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 px-2 font-[Ubuntu] text-[10px] uppercase my-1 bg-[black] rounded py-1">
            {allAspects.map((item) => (
              <button
                className={`rounded px-2 py-1 text-[10px] uppercase cursor-pointer ${
                  aspect === item ? `text-black bg-[#00ffaa]` : `text-white`
                }`}
                onClick={() => setAspect(item)}
              >
                {afvariables[item]}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 my-2">
            {displayData.map((obj) => (
              <div className="bg-[#00000098] p-2 flex flex-col justify-between">
                <div className="flex gap-4 rounded">
                  <div>
                    <img
                      src={`https://www.speedrun.com/static/user/${obj.run.players[0].id}/image`}
                      alt="Profile"
                      className="size-6"
                      onError={(e) => {
                        e.currentTarget.onerror = null; // prevent looping
                        e.currentTarget.src = "/Melinoe.png"; // fallback image
                      }}
                    />
                    <div>Place #{obj.place}</div>
                    <div>Date: {obj.run.date}</div>
                    <div>Time: {getTime(obj.run.times.primary_t)}</div>
                  </div>
                  <div className="text-center">
                    {Object.entries(obj.run.values).map((arr) => (
                      <div className="flex gap-2">
                        <div>{afvariables[arr[0]]}:</div>
                        <div className="text-[#00ffaa]/98">{afvariables[arr[1]]}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="font-[Ubuntu] text-[10px] my-2">{obj.run.comment || `n/a`}</div>
                <div className="flex gap-1 my-1">
                  <Link
                    to={obj.run.videos.links[0].uri}
                    target="_blank"
                    className="flex bg-[white] px-2 text-black rounded"
                  >
                    <div>Gameplay</div>
                    <img src={`/Misc/ra.png`} alt="Gameplay" className="size-4" draggable={false} />
                  </Link>
                  <Link to={obj.run.players[0].uri} target="_blank" className="flex bg-[white] px-2 text-black rounded">
                    <div>Profile</div>
                    <img src={`/Misc/ra.png`} alt="Profile" className="size-4" draggable={false} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      </div>
      <Footer />
    </div>
  );
}
