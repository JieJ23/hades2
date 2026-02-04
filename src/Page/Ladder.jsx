import SideNav from "../Comp/Sidebar";
import { p9boons } from "../Data/P9BoonObj";
import { p9boons_reverse, allP9 } from "../Data/P9BoonObj";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { bOrder } from "../Data/Boon2";
import { boonCodexr } from "../Data/Boon2";
import { h2AspectOrder, parsemstoTime, parseTimetoms, sToA } from "../Data/Misc";
import { Link } from "react-router-dom";

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
  const [billy, setBilly] = useState("No");

  const { posts, loader } = useData();

  const regionData = [...v1bundle, ...(posts || [])]
    .filter((obj) => obj.des.includes("#usum"))
    .filter((obj) => obj.loc === location)
    .filter((obj) => obj.fea >= +minfear && obj.fea <= +maxfear)
    .filter((obj) => {
      if (billy === "No") {
        return !obj.src.includes("bilibi");
      } else {
        return obj;
      }
    });

  const fulldata_ArrArrObject = [];

  for (let i = 0; i < h2AspectOrder.length; i++) {
    const aspectArray = regionData
      .filter((obj) => obj.asp === h2AspectOrder[i])
      .sort((a, b) => b.fea - a.fea || parseTimetoms(a.tim) - parseTimetoms(b.tim));
    const removeDup = aspectArray.filter(
      (player, index, self) => index === self.findIndex((p) => p.nam === player.nam),
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
                  className="input input-sm w-[80px] rounded-none focus:outline-none focus:border-transparent"
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
                  className="input input-sm w-[80px] rounded-none focus:outline-none focus:border-transparent"
                  onChange={(e) => setMaxFear(e.target.value)}
                  value={maxfear}
                  max={67}
                  min={1}
                />
              </div>
              <div>
                <div>Include Bilibili</div>
                <select
                  className="select select-sm w-[100px] rounded-none focus:outline-none focus:border-transparent"
                  value={billy}
                  onChange={(e) => setBilly(e.target.value)}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
            <div className="p-1 flex flex-wrap justify-center gap-1 my-2">
              <button
                className={`cursor-pointer rounded-none p-1 ${
                  location === `Underworld` ? `bg-white text-black` : `bg-transparent text-white`
                }`}
                onClick={() => setLocation(`Underworld`)}
              >
                Underworld
              </button>
              <button
                className={`cursor-pointer text-black rounded-none p-1 ${
                  location === `Surface` ? `bg-white text-black` : `bg-transparent text-white`
                }`}
                onClick={() => setLocation(`Surface`)}
              >
                Surface
              </button>
              <button
                className={`cursor-pointer rounded-none p-1 ${
                  boon === `Core` ? `bg-white text-black` : `bg-transparent text-white`
                }`}
                onClick={() => setBoon(`Core`)}
              >
                Core
              </button>
              <button
                className={`cursor-pointer text-black rounded-none p-1 ${
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
            </div>
            <div className="px-2 mt-2">* Click the player’s name to be redirected to the gameplay video.</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2">
              {fulldata_ArrArrObject.map((arr, oi) => (
                <div className={`rounded-sm px-2 py-1 relative bg-black/80 border-1 border-white/20 h-[250px]`}>
                  <div className="flex justify-between" key={oi}>
                    <div>
                      Avg{" "}
                      {(arr.slice(0, 10).reduce((a, b) => a + +b.fea, 0) / (arr.slice(0, 10).length || 10)).toFixed(1)}
                    </div>
                    <div>{h2AspectOrder[oi]}</div>
                    <div>
                      {parsemstoTime(
                        arr.slice(0, 10).reduce((a, b) => a + parseTimetoms(b.tim), 0) /
                          (arr.slice(0, 10).length || 10),
                      )}
                    </div>
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
                            <div className="tooltip" key={index}>
                              <div className="tooltip-content bg-black text-white font-[Ale] rounded-none">
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
                            <div className="tooltip">
                              <div className="tooltip-content bg-black text-white font-[Ale] rounded-none">
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
                              }),
                            ).map((ite, index) => (
                              <div className="tooltip" key={index}>
                                <div className="tooltip-content bg-black text-white font-[Ale] rounded-none">
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
                            <div className="tooltip flex" key={index}>
                              <div className="tooltip-content bg-black text-white font-[Ale] rounded-none">
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
