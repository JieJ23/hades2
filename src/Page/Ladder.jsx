import { p9boons } from "../Data/P9BoonObj";
import { p9boons_reverse, allP9 } from "../Data/P9BoonObj";
import { bOrder } from "../Data/Boon2";
import { boonCodexr } from "../Data/Boon2";
import { h2AspectOrder, parsemstoTime, parseTimetoms, sToA } from "../Data/Misc";
import { Link } from "react-router-dom";
import PageBlock from "../Block/PageBlock";
import { Line, LineChart, YAxis, ResponsiveContainer } from "recharts";

import { v1bundle } from "../Data/DataBundle";
import { useState } from "react";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

//
export const orderMap = new Map(allP9.map((item, index) => [item, index]));
export const orderMap2 = new Map(bOrder.map((item, index) => [item, index]));
export const findValue = (arr) => {
  const finalized = arr.map((ite) => p9boons_reverse[ite]);
  return finalized;
};
//

export default function Ladder() {
  const [location, setLocation] = useState(`Underworld`);
  const [boon, setBoon] = useState(`Core`);

  const { posts, loader } = useData();

  const regionData = [...v1bundle, ...(posts || [])]
    .filter((obj) => obj.des.includes("#usum"))
    .filter((obj) => obj.loc === location);

  const fulldata_ArrArrObject = [];

  for (let i = 0; i < h2AspectOrder.length; i++) {
    const aspectArray = regionData
      .filter((obj) => obj.asp === h2AspectOrder[i])
      .sort((a, b) => b.fea - a.fea || parseTimetoms(a.tim) - parseTimetoms(b.tim));
    const removeDup = aspectArray.filter(
      (player, index, self) => index === self.findIndex((p) => p.nam === player.nam),
    );
    const formatTime = removeDup.map((entry) => ({ ...entry, tim: parseTimetoms(entry.tim) }));
    fulldata_ArrArrObject.push(formatTime);
  }

  //
  const topData = [...v1bundle, ...(posts || [])]
    .filter((obj) => obj.des.includes("#usum"))
    .sort((a, b) => b.fea - a.fea || parseTimetoms(a.tim) - parseTimetoms(b.tim));

  const uwTop = [];
  const sTop = [];

  const uwNames = new Set();
  const sNames = new Set();

  for (const item of topData) {
    // stop early if both are filled
    if (uwTop.length >= 20 && sTop.length >= 20) break;

    if (item.loc === "Underworld") {
      if (uwTop.length < 20 && !uwNames.has(item.nam)) {
        uwTop.push(item);
        uwNames.add(item.nam);
      }
    }

    if (item.loc === "Surface") {
      if (sTop.length < 20 && !sNames.has(item.nam)) {
        sTop.push(item);
        sNames.add(item.nam);
      }
    }
  }
  //
  console.log(fulldata_ArrArrObject);
  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <PageBlock>
        <div className="py-16">
          {loader ? (
            <Loading />
          ) : (
            <>
              <div className="p-1 flex flex-wrap justify-center gap-1 my-2 font-[Sr] text-[13px]">
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
                <button
                  className={`cursor-pointer rounded p-0.5 px-1 ${
                    boon === `Core` ? `bg-white text-black` : `bg-transparent text-white`
                  }`}
                  onClick={() => setBoon(`Core`)}
                >
                  Core
                </button>
                <button
                  className={`cursor-pointer text-black rounded p-0.5 px-1 ${
                    boon === `Hammer` ? `bg-white text-black` : `bg-transparent text-white`
                  }`}
                  onClick={() => setBoon(`Hammer`)}
                >
                  Hammer
                </button>
                <button
                  className={`cursor-pointer text-black rounded p-0.5 px-1 ${
                    boon === `Keep` ? `bg-white text-black` : `bg-transparent text-white`
                  }`}
                  onClick={() => setBoon(`Keep`)}
                >
                  Keep
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2 text-[13px] font-[Ale]">
                {fulldata_ArrArrObject.map((arr, oi) => (
                  <div className={`rounded-sm px-2 py-1 relative bg-linear-to-b from-black to-[#0e0c12]/80`}>
                    <div className="text-center font-[Sr] text-white">{h2AspectOrder[oi]}</div>
                    <div className="w-full h-30 border border-white/10 p-1 rounded relative" key={oi}>
                      <div className="absolute bottom-1 left-1 font-[UbuntuMono] uppercase">Fear Top 24</div>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          style={{ width: "100%", aspectRatio: 1.618 }}
                          responsive
                          data={fulldata_ArrArrObject[oi].slice(0, 24)}
                        >
                          <YAxis
                            hide={true}
                            domain={[50, 70]} // Minimum = 0, Maximum = auto
                          />
                          <Line
                            type="monotone"
                            dataKey="fea"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={{
                              fill: "#fff",
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    {arr.slice(0, 10).map((obj, index) => (
                      <div className="grid grid-cols-3 relative text-gray-300 items-center" key={index}>
                        <div
                          className={`text-start truncate ${obj.fea == 67 ? `text-[yellow]` : obj.fea >= 65 ? `text-[#00ffaa]` : `text-gray-300`}`}
                        >
                          <Link to={obj.src} target="_blank">
                            {`${obj.fea} ${obj.nam}`}
                          </Link>
                        </div>

                        <div className="w-full flex">
                          {boon === `Core` &&
                            sToA(obj.cor).map((ite, index) => (
                              <div className="tooltip shrink-0" key={index}>
                                <div className="tooltip-content bg-black text-white rounded-none">
                                  <div>{ite}</div>
                                </div>
                                <img draggable={false} src={`/H2Boons/${ite}.png`} alt="Core Boon" className="size-6" />
                              </div>
                            ))}
                          {boon === `Hammer` && obj.ham && (
                            <div className="flex gap-0.5 rounded">
                              <div className="tooltip shrink-0">
                                <div className="tooltip-content bg-black text-white rounded-none">
                                  <div>{obj.fam}</div>
                                </div>
                                <img draggable={false} src={`/P9/${obj.fam}.png`} alt="Fam" className="size-6" />
                              </div>
                              {findValue(
                                sToA(obj.ham).sort((a, b) => {
                                  const aIndex = orderMap.get(a) ?? Infinity;
                                  const bIndex = orderMap.get(b) ?? Infinity;
                                  return aIndex - bIndex;
                                }),
                              ).map((ite, index) => (
                                <div className="tooltip shrink-0" key={index}>
                                  <div className="tooltip-content bg-black text-white rounded-none">
                                    <div>{p9boons[ite]}</div>
                                  </div>
                                  <img draggable={false} src={`/P9/${ite}.png`} alt="Hammer" className="size-6" />
                                </div>
                              ))}
                            </div>
                          )}
                          {boon === `Keep` &&
                            obj.ks &&
                            sToA(obj.ks).map((ite, index) => (
                              <div className="tooltip shrink-0" key={index}>
                                <div className="tooltip-content bg-black text-white rounded-none">
                                  <div>{ite}</div>
                                </div>
                                <img
                                  draggable={false}
                                  src={`/buildgui/${ite}.png`}
                                  alt="Core Boon"
                                  className="size-6"
                                />
                              </div>
                            ))}
                        </div>
                        <div className="text-end">{parsemstoTime(obj.tim)}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </PageBlock>
    </main>
  );
}
