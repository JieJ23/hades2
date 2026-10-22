import { p9boons } from "../Data/P9BoonObj";
import { p9boons_reverse, allP9 } from "../Data/P9BoonObj";
import { bOrder } from "../Data/Boon2";
import { boonCodexr } from "../Data/Boon2";
import { h2AspectOrder, parsemstoTime, parseTimetoms, sToA } from "../Data/Misc";
import { Link } from "react-router-dom";
import PageBlock from "../Block/PageBlock";
import { ComposedChart, Line, Bar, YAxis } from "recharts";

import { v1bundle } from "../Data/DataBundle";

import s1data from "../Data/srcData.json";

import { useState } from "react";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

//
export const orderMap = new Map(allP9.map((item, index) => [item, index]));
const findValue = (arr) => {
  const finalized = arr.map((ite) => p9boons_reverse[ite]);
  return finalized;
};
//

export default function LadderSrc() {
  const [location, setLocation] = useState(`Underworld`);

  const regionData = [...s1data]
    .filter((obj) => obj.des && obj.des.includes("#usum"))
    .filter((obj) => obj.loc === location);

  const fulldata_ArrArrObject = [];

  for (let i = 0; i < h2AspectOrder.length; i++) {
    const aspectArray = regionData
      .filter((obj) => obj.asp === h2AspectOrder[i])
      .sort((a, b) => b.fea - a.fea || parseTimetoms(a.tim) - parseTimetoms(b.tim));
    const removeDup = aspectArray.filter(
      (player, index, self) => index === self.findIndex((p) => p.nam === player.nam),
    );
    const formatTime = removeDup.map((entry) => ({ ...entry, lineGraph: parseTimetoms(entry.tim) }));
    fulldata_ArrArrObject.push(formatTime);
  }
  //
  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <PageBlock>
        <div className="py-16">
          <div className="p-1 flex flex-wrap justify-center gap-1 my-2 font-[Mar] text-[14px]">
            <button
              className={`cursor-pointer rounded p-0.5 px-1 ${
                location === `Underworld` ? `bg-white text-black` : `bg-transparent text-white`
              }`}
              onClick={() => setLocation(`Underworld`)}
            >
              Underworld
            </button>
            <button
              className={`cursor-pointer text-black rounded p-0.5 px-1 ${
                location === `Surface` ? `bg-white text-black` : `bg-transparent text-white`
              }`}
              onClick={() => setLocation(`Surface`)}
            >
              Surface
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2 text-[12px]">
            {fulldata_ArrArrObject.map((arr, oi) => (
              <div className={`rounded-sm px-2 py-1 relative bg-linear-to-b from-black to-[#0e0c12]/80`}>
                <div className="text-center font-[Mar] text-[16px] text-white">{h2AspectOrder[oi]}</div>
                <div className="w-full h-30 border border-white/10 p-1 rounded relative" key={oi}>
                  <div className="absolute bottom-0 right-1  uppercase">Bar Fear/Line Time</div>
                  <ComposedChart
                    style={{ width: "100%", maxHeight: "100px", aspectRatio: 1.618 }}
                    responsive
                    data={fulldata_ArrArrObject[oi].slice(0, 10)}
                  >
                    <Bar dataKey="lineGraph" yAxisId="left" fill="#28282b" radius={5} />
                    <YAxis yAxisId="right" orientation="right" domain={[6000, 60000]} hide />
                    <Line type="monotone" yAxisId="right" dataKey="lineGraph" stroke="#fff" />
                    <YAxis yAxisId="left" domain={[6000, 60000]} hide />
                  </ComposedChart>
                </div>
                {arr.slice(0, 10).map((obj, index) => (
                  <div className="grid grid-cols-4 relative text-gray-300 items-center" key={index}>
                    <div
                      className={`text-start truncate ${obj.fea == 67 ? `text-[yellow]` : obj.fea >= 65 ? `text-[#00ffaa]` : `text-gray-300`}`}
                    >
                      <Link to={obj.src} target="_blank">
                        {obj.nam}
                      </Link>
                    </div>
                    {arr[index + 1] ? (
                      <div className="text-end text-green-300">
                        {parsemstoTime(parseTimetoms(arr[index + 1].tim) - parseTimetoms(arr[index].tim))}
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="text-end">{obj.tim}</div>
                    <div className="text-end text-gray-400">{obj.patch}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </PageBlock>
    </main>
  );
}
