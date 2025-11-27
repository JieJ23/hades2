import SideNav from "../Comp/Sidebar";
import { p9boons } from "../Data/P9BoonObj";
import { p9boons_reverse, allP9 } from "../Data/P9BoonObj";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { bOrder } from "../Data/Boon2";
import { boonCodexr } from "../Data/Boon2";
import { h2AspectOrder, parsemstoTime, parseTimetoms, sToA, deCodeArcana } from "../Data/Misc";

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
export const findValue2 = (arr) => {
  const finalized = arr.map((ite) => boonCodexr[ite]);
  return finalized;
};
//
export default function Ladder() {
  const [location, setLocation] = useState(`Underworld`);
  const [boon, setBoon] = useState(`Core`);
  const [minfear, setMinFear] = useState(1);
  const [maxfear, setMaxFear] = useState(67);

  const { posts, loader } = useData();

  const regionData = [...v1bundle, ...(posts || [])]
    .filter((obj) => obj.loc === location)
    .filter((obj) => obj.fea >= +minfear && obj.fea <= +maxfear);
  const fulldata_ArrArrObject = [];

  for (let i = 0; i < h2AspectOrder.length; i++) {
    const aspectArray = regionData
      .filter((obj) => obj.asp === h2AspectOrder[i])
      .sort((a, b) => b.fea - a.fea || parseTimetoms(a.tim) - parseTimetoms(b.tim));
    const removeDup = aspectArray.filter(
      (player, index, self) => index === self.findIndex((p) => p.nam === player.nam)
    );
    fulldata_ArrArrObject.push(removeDup);
  }

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <SideNav />
      <div className="max-w-[1600px] font-[Ubuntu] text-[10px] md:text-[11px] mx-auto px-1">
        {loader ? (
          <Loading />
        ) : (
          <>
            <div className="flex justify-center gap-1 font-[Ale]">
              <div>
                <div>Min Fear</div>
                <input
                  type="number"
                  placeholder="Min Fear"
                  className="input input-sm w-[80px]"
                  onChange={(e) => setMinFear(e.target.value)}
                  value={minfear}
                  max={67}
                  min={1}
                />
              </div>
              <div>
                <div>Max Fear</div>
                <input
                  type="number"
                  placeholder="Max Fear"
                  className="input input-sm w-[80px]"
                  onChange={(e) => setMaxFear(e.target.value)}
                  value={maxfear}
                  max={67}
                  min={1}
                />
              </div>
            </div>
            <div className="p-1 flex flex-wrap justify-center gap-1 my-2">
              <button
                className={`cursor-pointer rounded p-1 ${
                  location === `Underworld` ? `bg-white text-black` : `bg-transparent text-white`
                }`}
                onClick={() => setLocation(`Underworld`)}
              >
                Underworld
              </button>
              <button
                className={`cursor-pointer text-black rounded p-1 ${
                  location === `Surface` ? `bg-white text-black` : `bg-transparent text-white`
                }`}
                onClick={() => setLocation(`Surface`)}
              >
                Surface
              </button>
              <button
                className={`cursor-pointer rounded p-1 ${
                  boon === `Core` ? `bg-white text-black` : `bg-transparent text-white`
                }`}
                onClick={() => setBoon(`Core`)}
              >
                Core
              </button>
              <button
                className={`cursor-pointer text-black rounded p-1 ${
                  boon === `Hammer` ? `bg-white text-black` : `bg-transparent text-white`
                }`}
                onClick={() => setBoon(`Hammer`)}
              >
                Hammer
              </button>
              <button
                className={`cursor-pointer text-black rounded p-1 ${
                  boon === `Keep` ? `bg-white text-black` : `bg-transparent text-white`
                }`}
                onClick={() => setBoon(`Keep`)}
              >
                Keep
              </button>
              <button
                className={`cursor-pointer text-black rounded p-1 ${
                  boon === `Arcana` ? `bg-white text-black` : `bg-transparent text-white`
                }`}
                onClick={() => setBoon(`Arcana`)}
              >
                Arcana
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2 my-2">
              {fulldata_ArrArrObject.map((arr, oi) => (
                <div
                  className={`rounded-t-md px-2 py-1 relative border-1 border-[#000000] hover:border-[#00ffaa] duration-200 ease-in transition-colors h-[250px] ${
                    arr[0] && arr[0].fea >= 62 ? `bg-[#141537a6]` : `bg-[#0e0e0ec4]`
                  }`}
                >
                  <img
                    src={`/GUI_Card/c${h2AspectOrder[oi]}.png`}
                    alt="Aspect"
                    className="absolute w-auto h-full top-1/2 left-1/2 -z-10 opacity-50 -translate-x-[50%] -translate-y-[50%]"
                  />
                  <div className="grid grid-cols-3 text-center text-white" key={oi}>
                    <div className="text-start text-[#00ffaa]">{h2AspectOrder[oi]}</div>
                    <div className="text-start text-[#00ffaa]">
                      {(arr.slice(0, 10).reduce((a, b) => a + +b.fea, 0) / (arr.slice(0, 10).length || 10)).toFixed(1)}
                    </div>
                    <div className="text-end text-[#00ffaa]">
                      {parsemstoTime(
                        arr.slice(0, 10).reduce((a, b) => a + parseTimetoms(b.tim), 0) / (arr.slice(0, 10).length || 10)
                      )}
                    </div>
                  </div>
                  {arr.slice(0, 10).map((obj, index) => (
                    <div
                      className="grid grid-cols-4 text-center hover:bg-[#131111] hover:text-[#00ffaa] relative text-gray-300 items-center"
                      key={index}
                    >
                      <div className="text-start line-clamp-1">{obj.nam}</div>
                      <div>{obj.fea}</div>
                      <div className="w-full flex">
                        {boon === `Core` &&
                          sToA(obj.cor).map((ite, index) => (
                            <div className="tooltip shrink-0" key={index}>
                              <div className="tooltip-content bg-white text-black font-[Ubuntu] rounded-none">
                                <div className="text-[11px]">{ite}</div>
                              </div>
                              <img
                                draggable={false}
                                src={`/H2Boons/${ite}.png`}
                                alt="Core Boon"
                                className="w-[22px] h-[22px]"
                              />
                            </div>
                          ))}
                        {boon === `Hammer` && obj.ham && (
                          <div className="flex gap-0.5 rounded">
                            <div className="tooltip shrink-0">
                              <div className="tooltip-content bg-white text-black font-[Ubuntu] rounded-none">
                                <div className="text-[11px]">{obj.fam}</div>
                              </div>
                              <img
                                draggable={false}
                                src={`/P9/${obj.fam}.png`}
                                alt="Fam"
                                className="w-[22px] h-[22px]"
                              />
                            </div>
                            {findValue(
                              sToA(obj.ham).sort((a, b) => {
                                const aIndex = orderMap.get(a) ?? Infinity;
                                const bIndex = orderMap.get(b) ?? Infinity;
                                return aIndex - bIndex;
                              })
                            ).map((ite, index) => (
                              <div className="tooltip shrink-0" key={index}>
                                <div className="tooltip-content bg-white text-black font-[Ubuntu] rounded-none">
                                  <div className="text-[11px]">{p9boons[ite]}</div>
                                </div>
                                <img
                                  draggable={false}
                                  src={`/P9/${ite}.png`}
                                  alt="Hammer"
                                  className="w-[22px] h-[22px]"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        {boon === `Keep` &&
                          obj.ks &&
                          sToA(obj.ks).map((ite, index) => (
                            <div className="tooltip shrink-0 flex" key={index}>
                              <div className="tooltip-content bg-white text-black font-[Ubuntu] rounded-none">
                                <div className="text-[11px]">{ite}</div>
                              </div>
                              <img
                                draggable={false}
                                src={`/buildgui/${ite}.png`}
                                alt="Core Boon"
                                className="w-[22px] h-[22px]"
                              />
                            </div>
                          ))}
                        {boon === `Arcana` && obj.arcana && (
                          <div>
                            {deCodeArcana(obj.arcana)?.includes(`c12`) ? (
                              <div className="text-red-400">Death</div>
                            ) : deCodeArcana(obj.arcana)?.includes(`c23`) ? (
                              <div className="text-orange-200">Strength</div>
                            ) : (
                              ``
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-end">{obj.tim}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
