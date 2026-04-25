import Background from "../Comp/Background";
import SideNav from "../Comp/Sidebar";
import Footer from "../Comp/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { idShrine } from "../Data/Vow1";

import { sdata } from "../Data/SData";

import { parsesectoTime, traitAspect, aspectsFinder } from "../Data/Misc";

// const findBiomeName = (bio) => {
//   switch (bio) {
//     case "N":
//       return `Ephyra`;
//     case "F":
//       return `Erebus`;
//     case "C":
//       return `Elysium`;
//     case "P":
//       return `Olympus`;
//     case "G":
//       return `Oceanus`;
//     case "H":
//       return `Fields`;
//     case "I":
//       return `Tartarus`;
//     case "O":
//       return `Thessaly`;
//     case "Q":
//       return `Summit`;
//     case "Anomaly":
//       return `Asphodel`;
//     default:
//       return bio;
//   }
// };

const exclude = [`Essence`, `Familiar`, `Keepsake`, `Display`, `MaxHealthTrait`, `MaxManaTrait`, `Aspect`];

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
  let csv = [];

  if (data) {
    const gameState = data.CurrentRun;
    const history = Object.entries(data.GameState.RunHistory)
      .filter((arr) => Object.entries(arr[1]).length > 2)
      .filter((arr) => arr[1].RunResult == 1 || arr[1].RunResult == 3);

    for (let i = 0; i < history.length; i++) {
      const object = {};
      //
      object.Id = Number(Number(history[i][0]) + history[i][1].GameplayTime.toString().slice(-3));
      object.Aspect = aspectsFinder(
        traitAspect.find((ite) => Object.keys(history[i][1].TraitCache).some((a) => a === ite)),
      );
      object.Time = parsesectoTime(history[i][1].GameplayTime);
      object.Region = history[i][1].RunResult === 1 ? `Underworld` : `Surface`;
      object.Fear = history[i][1].ShrinePointsCache;
      object.Keep = Object.values(history[i][1].KeepsakeCache)
        .map((ite) => sdata[ite])
        .join(",");
      object.Shrine = Object.entries(history[i][1].ShrineUpgradesCache)
        .filter((arr) => arr[1] != 0)
        .map(([key, value]) => `${idShrine[key]}${value}`)
        .join(",");
      object.Traits = Object.keys(history[i][1].TraitCache)
        .filter((item) => !exclude.some((ex) => item.includes(ex)))
        .join(",");
      //
      csv.push(object);
    }
    // console.log(csv);
    info = {
      runHistory: history,
    };
  }

  // Download to CSV

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);

    const rows = data.map((row) => headers.map((field) => JSON.stringify(row[field] ?? "")).join(","));

    return [headers.join(","), ...rows].join("\n");
  };

  const downloadCSV = (data) => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "table-data.csv";
    a.click();
  };

  return (
    <div className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <SideNav />
      <div className="max-w-[1400px] font-[Ale] text-[14px] mx-auto px-1 my-4">
        <div className="my-4 flex flex-col gap-1">
          <input type="file" className="file-input bg-black" onChange={handleFileChange} />
        </div>
        <Link to={`https://jakobhellermann.github.io/hades2-tools/`} target="_blank">
          <div className="bg-black my-4 p-2 rounded">
            <div>Savefile to JSON | By jakobhellermann</div>
            <div className="text-blue-400 hover:underline">https://jakobhellermann.github.io/hades2-tools/</div>
          </div>
        </Link>
        {data ? (
          <div className="bg-black/70 rounded p-2 py-4">
            <div className="flex justify-center">
              <button
                onClick={() => downloadCSV(csv)}
                className="font-[Exo] text-[12px] bg-white text-black rounded px-1 py-0.5"
              >
                Export CSV
              </button>
            </div>
            {/* Previous History */}
            <div className="px-2">Previous History</div>
            <div className="overflow-x-auto">
              <table className="table whitespace-nowrap table-xs table-zebra font-[Ubuntu] border-separate border-spacing-0.5">
                <thead className="font-[Ale]">
                  <tr>
                    <th className="border-0">Run #</th>
                    <th className="border-0">Result</th>
                    <th className="border-0">Aspect</th>
                    <th className="border-0">Gameplay Time</th>
                    <th className="border-0">Region</th>
                    <th className="border-0">Fear</th>
                    <th className="border-0">Keepsakes</th>
                    {/* <th className="border-0">TraitsNum</th>
                    <th className="border-0">Traits</th> */}
                  </tr>
                </thead>
                <tbody>
                  {info.runHistory.map((arr) => (
                    <tr>
                      <td className="border-0">{arr[0]}</td>
                      <td className="border-0">{arr[1].RunResult}</td>
                      <td className="border-0">
                        {aspectsFinder(
                          traitAspect.find((ite) => Object.keys(arr[1].TraitCache).some((a) => a === ite)),
                        )}
                      </td>
                      <td className="border-0">{parsesectoTime(arr[1].GameplayTime)}</td>
                      <td className="border-0">{arr[1].RunResult === 1 ? `Underworld` : `Surface`}</td>
                      <td className="border-0">{arr[1].ShrinePointsCache}</td>
                      <td className="border-0">
                        <div>
                          {Object.values(arr[1].KeepsakeCache)
                            .map((ite) => sdata[ite])
                            .join(",")}
                        </div>
                      </td>
                      {/* <td className="border-0">
                        <div>{Object.keys(arr[1].TraitCache).length}</div>
                      </td>
                      <td className="border-0">
                        <div className="flex w-[1500px] flex-wrap  gap-2">
                          {Object.keys(arr[1].TraitCache)
                            .filter((item) => !exclude.some((ex) => item.includes(ex)))
                            .map((arr, index) => (
                              <div>
                                {index + 1}
                                {arr}
                                <span className="text-[orange]">{sdata[arr]}</span>
                              </div>
                            ))}
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-[#00ffaa] px-2 text-[16px]">*Parsing JSON Error</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
