import Background from "../Comp/Background";
import SideNav from "../Comp/Sidebar";
import Footer from "../Comp/Footer";

import { Link } from "react-router-dom";
import { useState } from "react";

import { sdata } from "../Data/SData";

import { parsesectoTime } from "../Data/Misc";

const findBiomeName = (bio) => {
  switch (bio) {
    case "N":
      return `Ephyra`;
    case "F":
      return `Erebus`;
    case "C":
      return `Elysium`;
    case "P":
      return `Olympus`;
    case "G":
      return `Oceanus`;
    case "H":
      return `Fields`;
    case "I":
      return `Tartarus`;
    case "O":
      return `Thessaly`;
    case "Q":
      return `Summit`;
    case "Anomaly":
      return `Asphodel`;
    default:
      return bio;
  }
};

export default function ProfileSum() {
  const [data, setData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setData(json);
      } catch (err) {
        console.error("Invalid JSON file", err);
      }
    };

    reader.readAsText(file);
  };

  //   Assignment

  let info = null;

  if (data) {
    const gameState = data.GameState;

    info = {
      totalRuns: gameState.CompletedRunsCache,
      totalClearRuns: gameState.ClearedRunsCache,
      totalClearRuns_UW: gameState.ClearedUnderworldRunsCache,
      totalClearRuns_S: gameState.ClearedSurfaceRunsCache,
      fastestSurfaceRun: gameState.FastestSurfaceClearTimeCache,
      fastestUWRun: gameState.FastestUnderworldClearTimeCache,
      highestFearSurface: gameState.HighestShrinePointClearSurfaceCache,
      highestFearUW: gameState.HighestShrinePointClearUnderworldCache,
      //   Misc
      //   damage_em: gameState.DamageDealtByEnemiesRecord,
      //   damage_hero: gameState.DamageDealtByHeroRecord,
      //   em_killed: gameState.EnemyKills,
      //   roomEntered: gameState.RoomsEntered,
      biomeVisits: gameState.BiomeVisits,

      //  Boon/KS
      keepsakes_store: gameState.KeepsakeChambers,
      loot_pickup: gameState.LootPickups,
      codexStats: gameState.LifetimeTraitStats,
    };
  }

  //   Other Calculations

  return (
    <div className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <SideNav />
      <div className="max-w-[1800px] font-[Ale] text-[12px] md:text-[13px] mx-auto px-1 my-4">
        <div className="my-4 flex flex-col gap-1">
          <input
            type="file"
            className="file-input bg-black"
            onChange={handleFileChange}
            style={{
              borderStyle: "solid", // Required
              borderWidth: "4px",
              borderImage: "url('/Misc/frame.webp') 40 stretch",
            }}
          />
        </div>
        <Link to={`https://jakobhellermann.github.io/hades2-tools/`} target="_blank">
          <div
            className="bg-black my-4 p-2 rounded"
            style={{
              borderStyle: "solid", // Required
              borderWidth: "6px",
              borderImage: "url('/Misc/frame.webp') 40 stretch",
            }}
          >
            <div>Savefile to JSON | By jakobhellermann</div>
            <div className="text-blue-400 hover:underline">https://jakobhellermann.github.io/hades2-tools/</div>
          </div>
        </Link>
        {data && (
          <div
            className="bg-black/70 rounded p-2"
            style={{
              borderStyle: "solid", // Required
              borderWidth: "6px",
              borderImage: "url('/Misc/frame.webp') 40 stretch",
            }}
          >
            <div className="flex flex-col gap-4">
              {/* Main Entries */}
              <div className="grid grid-cols-2 md:grid-cols-4 text-gray-300">
                <div className="flex flex-col">
                  <div>Total Runs / Cleared</div>
                  <div>
                    {info.totalRuns} | {info.totalClearRuns}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>Clear Region S/UW</div>
                  <div>
                    {info.totalClearRuns_S} | {info.totalClearRuns_UW}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>Speed S/UW</div>
                  <div>
                    {parsesectoTime(info.fastestSurfaceRun)} | {parsesectoTime(info.fastestUWRun)}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>Fear S/UW</div>
                  <div>
                    {info.highestFearSurface} | {info.highestFearUW}
                  </div>
                </div>
              </div>
              {/* Rooms Stats */}
              {/* <div>
                <div className="grid grid-cols-5">
                  {Object.entries(info.roomEntered)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 100)
                    .map(([ky, idx]) => (
                      <div>
                        {ky} : {idx}
                      </div>
                    ))}
                </div>
              </div> */}
              <div>
                <div className="grid grid-cols-4 text-gray-300">
                  {Object.entries(info.biomeVisits)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 100)
                    .map(([ky, idx]) => (
                      <div>
                        {findBiomeName(ky)} : {idx}
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <div className="grid grid-cols-4 text-gray-300">
                  {Object.entries(info.loot_pickup)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 200)
                    .map(([ky, idx]) => (
                      <div>
                        {ky} : {Math.round(idx).toLocaleString("en-US")}
                      </div>
                    ))}
                </div>
              </div>
              {/* EM Dmg / Hero Dmg / EM Killed / Elite Attribute Killed */}
              {/* <div>
                <div className="grid grid-cols-5">
                  {Object.entries(info.damage_em)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 100)
                    .map(([ky, idx]) => (
                      <div>
                        {ky} : {Math.round(idx).toLocaleString("en-US")}
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <div className="grid grid-cols-5">
                  {Object.entries(info.damage_hero)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 100)
                    .map(([ky, idx]) => (
                      <div>
                        {ky} : {Math.round(idx).toLocaleString("en-US")}
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <div className="grid grid-cols-5">
                  {Object.entries(info.damage_em)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 100)
                    .map(([ky, idx]) => (
                      <div>
                        {ky} : {Math.round(idx).toLocaleString("en-US")}
                      </div>
                    ))}
                </div>
              </div> */}
              {/* Keep / Loot / */}
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-gray-300">
                  {Object.entries(info.keepsakes_store)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 100)
                    .map(([ky, idx]) => (
                      <div className="flex gap-1 py-1">
                        <img src={`/buildgui/${sdata[ky]}.png`} alt="Keeps" className="size-8" />
                        <div className="flex flex-col">
                          <div>{sdata[ky]}</div>
                          <div>{Math.round(idx).toLocaleString("en-US")}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* Codex */}
              <div className="overflow-x-scroll w-full">
                <div className="flex w-full text-gray-300">
                  <div className="w-full min-w-[300px]">Name</div>
                  <div className="w-full min-w-[150px] text-center">Clear</div>
                  <div className="w-full min-w-[150px] text-center">Surface Clear</div>
                  <div className="w-full min-w-[150px] text-center">UW Clear</div>
                  <div className="w-full min-w-[150px] text-center">Fastest Surface</div>
                  <div className="w-full min-w-[150px] text-center">Fastest UW</div>
                  <div className="w-full min-w-[150px] text-center">H.F. Surface</div>
                  <div className="w-full min-w-[150px] text-center">H.F. UW</div>
                  <div className="w-full min-w-[150px] text-center">Total Use</div>
                </div>
                <div className="flex flex-col text-gray-300">
                  {Object.entries(info.codexStats)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 200)
                    .map(([ky, idx], index) => (
                      <div className={`flex`}>
                        <div className="w-full min-w-[300px] flex flex-col">
                          <div>
                            {index + 1}. {sdata[ky]} ({ky})
                          </div>
                        </div>
                        <div className="w-full min-w-[150px] text-center bg-[#131111]/50">{idx.ClearCount}</div>
                        <div className="w-full min-w-[150px] text-center ">{idx.ClearCountSurface}</div>
                        <div className="w-full min-w-[150px] text-center bg-[#131111]/50">
                          {idx.ClearCountUnderworld}
                        </div>
                        <div className="w-full min-w-[150px] text-center">
                          {idx.FastestTimeSurface && parsesectoTime(idx.FastestTimeSurface)}
                        </div>
                        <div className="w-full min-w-[150px] text-center bg-[#131111]/50">
                          {idx.FastestTimeUnderworld && parsesectoTime(idx.FastestTimeUnderworld)}
                        </div>
                        <div className="w-full min-w-[150px] text-center">{idx.HighestShrinePointsSurface}</div>
                        <div className="w-full min-w-[150px] text-center bg-[#131111]/50">
                          {idx.HighestShrinePointsUnderworld}
                        </div>
                        <div className="w-full min-w-[150px] text-center">{idx.UseCount}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
