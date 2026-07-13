import PageBlock from "../Block/PageBlock";
import { bundleData } from "../Data/DataBundle";
import { BarChart, Bar, XAxis, YAxis, Label, LabelList } from "recharts";
import { parseTimetoms } from "../Data/Misc";

import { h2AspectOrder } from "../Data/Misc";

import { useData } from "../Hook/DataFetch";
import { useState } from "react";
import Loading from "../Hook/Loading";
//
const staff = h2AspectOrder.slice(0, 4);
const blade = h2AspectOrder.slice(4, 8);
const axe = h2AspectOrder.slice(8, 12);
const torch = h2AspectOrder.slice(12, 16);
const lob = h2AspectOrder.slice(16, 20);
const coat = h2AspectOrder.slice(20);
//

export default function Player() {
  const { posts, loader } = useData();
  const [player, setPlayer] = useState("All Players");

  const allData = [...bundleData, ...(posts || [])];

  const sortedData = allData
    .slice()
    .filter((obj) => {
      if (player === "All Players") {
        return obj;
      } else {
        return obj.nam === player;
      }
    })
    .sort((a, b) => {
      const feaDiff = +b.fea - +a.fea;
      if (feaDiff !== 0) return feaDiff;
      return parseTimetoms(a.tim) - parseTimetoms(b.tim);
    });
  const allPlayers = [...new Set(allData.map((obj) => obj.nam))].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );

  const groups = { staff, blade, axe, torch, lob, coat };

  // Build a map: aspectValue -> bucketName, so lookup is O(1) instead of scanning arrays
  const aspToBucket = Object.entries(groups).reduce((map, [bucketName, aspList]) => {
    aspList.forEach((asp) => {
      map[asp] = bucketName;
    });
    return map;
  }, {});

  const initialS = { staff: [], blade: [], axe: [], torch: [], lob: [], coat: [] };
  const initialUW = { staff: [], blade: [], axe: [], torch: [], lob: [], coat: [] };

  const underWorld = sortedData.slice().filter((obj) => obj.loc === "Underworld");
  const surfaceWorld = sortedData.slice().filter((obj) => obj.loc === "Surface");

  const resultUW = underWorld.reduce((acc, item) => {
    const bucket = aspToBucket[item.asp];
    if (bucket) {
      acc[bucket].push(item);
    }
    return acc;
  }, initialUW);

  const resultS = surfaceWorld.reduce((acc, item) => {
    const bucket = aspToBucket[item.asp];
    if (bucket) {
      acc[bucket].push(item);
    }
    return acc;
  }, initialS);

  const { staff: staffData, blade: bladeData, axe: axeData, torch: torchData, lob: lobData, coat: coatData } = resultS;
  const {
    staff: staffDataUW,
    blade: bladeDataUW,
    axe: axeDataUW,
    torch: torchDataUW,
    lob: lobDataUW,
    coat: coatDataUW,
  } = resultUW;

  const weaponLength = [
    {
      weapon: `Staff`,
      runs: resultS.staff.length || 0,
      runsUW: resultUW.staff.length || 0,
    },
    {
      weapon: `Blade`,
      runs: resultS.blade.length || 0,
      runsUW: resultUW.blade.length || 0,
    },
    {
      weapon: `Axe`,
      runs: resultS.axe.length || 0,
      runsUW: resultUW.axe.length || 0,
    },
    {
      weapon: `Torch`,
      runs: resultS.torch.length || 0,
      runsUW: resultUW.torch.length || 0,
    },
    {
      weapon: `Lob`,
      runs: resultS.lob.length || 0,
      runsUW: resultUW.lob.length || 0,
    },
    {
      weapon: `Coat`,
      runs: resultS.coat.length || 0,
      runsUW: resultUW.coat.length || 0,
    },
  ];

  return (
    <PageBlock>
      <div className="py-16 max-w-300 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-2 mb-4">
          <select
            className="w-full select select-sm bg-[#0e0c12] rounded border focus:outline-none focus:border-transparent"
            value={player}
            onChange={(e) => {
              setPlayer(e.target.value);
            }}
          >
            <option value={"All Players"}>All Players</option>
            {allPlayers.map((ite) => (
              <option value={ite}>{ite}</option>
            ))}
          </select>
        </div>
        <BarChart className="w-full h-50 font-[Ale]" responsive data={weaponLength}>
          <XAxis dataKey="weapon" tick={{ fill: "#ffffff" }} />
          <YAxis width="auto" tick={{ fill: "#ffffff" }} />
          <Bar dataKey="runs" fill="yellow" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="runs" position="center" fill="#000" />
          </Bar>
          <Bar dataKey="runsUW" fill="#00ffaa" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="runsUW" position="center" fill="#000" />
          </Bar>
        </BarChart>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
          {h2AspectOrder.map((obj, index) => (
            <div
              className="h-30 w-full rounded flex flex-col items-center justify-center relative overflow-hidden"
              style={{
                borderStyle: "solid",
                borderWidth: "10px",
                borderImage: "url('/Misc/frame.webp') 40 stretch",
              }}
            >
              <div className="absolute top-0 w-full h-full -z-10 bg-black/50" />
              {sortedData.find((obj) => obj.asp === h2AspectOrder[index]) ? (
                <div className="h-full w-full grid grid-cols-3 place-items-center place-content-center font-[Ale] text-[14px] relative">
                  <img
                    src={`/GUI_Card/c${h2AspectOrder[index]}.png`}
                    alt="Aspect Card"
                    className="w-25 min-w-25 p-2 translate-y-5 translate-x-3 -rotate-12 -z-10"
                  />
                  {underWorld.find((obj) => obj.asp === h2AspectOrder[index]) && (
                    <div className="flex flex-col gap-0.5 items-center">
                      <img src="/Underworld.png" alt="Region" className="w-6 h-6" />
                      <div
                        className={
                          +underWorld.find((obj) => obj.asp === h2AspectOrder[index]).fea === 67 &&
                          `border px-1 rounded bg-[#00ffaa] text-black`
                        }
                      >
                        {+underWorld.find((obj) => obj.asp === h2AspectOrder[index]).fea === 67
                          ? `Max`
                          : +underWorld.find((obj) => obj.asp === h2AspectOrder[index]).fea}{" "}
                        Fear
                      </div>
                      <div>{underWorld.find((obj) => obj.asp === h2AspectOrder[index]).tim}</div>
                    </div>
                  )}
                  {surfaceWorld.find((obj) => obj.asp === h2AspectOrder[index]) && (
                    <div className="flex flex-col gap-0.5 items-center">
                      <img src="/Surface.png" alt="Region" className="w-6 h-6" />
                      <div
                        className={
                          +surfaceWorld.find((obj) => obj.asp === h2AspectOrder[index]).fea === 67 &&
                          `border px-1 rounded bg-[yellow] text-black`
                        }
                      >
                        {+surfaceWorld.find((obj) => obj.asp === h2AspectOrder[index]).fea === 67
                          ? `Max`
                          : +surfaceWorld.find((obj) => obj.asp === h2AspectOrder[index]).fea}{" "}
                        Fear
                      </div>
                      <div>{surfaceWorld.find((obj) => obj.asp === h2AspectOrder[index]).tim}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-end flex-col font-[Sr] text-[14px] p-2 relative">
                  <div
                    style={{ backgroundImage: `url("/hover/TGA.png")` }}
                    className="absolute top-0 w-25 h-auto mx-auto inset-0 bg-cover bg-top -z-10"
                  />
                  <div className="absolute top-0 h-full w-full bg-linear-to-t from-black to-[#0e0c12]/20 -z-10" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageBlock>
  );
}
