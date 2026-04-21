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
    fulldata_ArrArrObject.push(removeDup);
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

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <SideNav />
      <div className="max-w-[1600px] mx-auto px-1">
        {loader ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center gap-8 max-w-250 mx-auto my-10 font-[Exo] text-[18px] relative">
              <div className="w-full bg-gradient-to-b from-green-100/10 to-transparent">
                <div
                  className="text-center py-2"
                  style={{
                    backgroundImage: `url('/Misc/fl3.webp'),url('/Misc/fr3.webp'),url('/Misc/fm3.webp')`,
                    backgroundPosition: "left center, right center, center center",
                    backgroundRepeat: "no-repeat, no-repeat, repeat",
                    backgroundSize: "contain, contain, contain",
                  }}
                >
                  Underworld
                </div>
                {uwTop.map((obj, index) => (
                  <div className="font-[Ale] text-[14px] text-center flex justify-center gap-2">
                    <img src={`/P9/${obj.asp}.png`} alt="Aspect" className="size-6" />
                    <span className="min-w-30">{obj.nam}</span>
                    <span>{obj.tim}</span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gradient-to-b from-yellow-100/10 to-transparent">
                <div
                  className="text-center py-2"
                  style={{
                    backgroundImage: `url('/Misc/fl2.webp'),url('/Misc/fr2.webp'),url('/Misc/fm2.webp')`,
                    backgroundPosition: "left center, right center, center center",
                    backgroundRepeat: "no-repeat, no-repeat, repeat",
                    backgroundSize: "contain, contain, contain",
                  }}
                >
                  Surface
                </div>
                {sTop.map((obj, index) => (
                  <div className="font-[Ale] text-[14px] text-center flex justify-center gap-2">
                    <img src={`/P9/${obj.asp}.png`} alt="Aspect" className="size-6" />
                    <span className="min-w-30">{obj.nam}</span>
                    <span>{obj.tim}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-1 flex flex-wrap justify-center gap-1 my-2 font-[Exo] text-[12px]">
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
                <div className={`rounded-sm px-2 py-1 relative bg-black/80`}>
                  <div className="grid grid-cols-3" key={oi}>
                    <div>
                      Avg{" "}
                      {(arr.slice(0, 10).reduce((a, b) => a + +b.fea, 0) / (arr.slice(0, 10).length || 10)).toFixed(1)}
                    </div>
                    <div>{h2AspectOrder[oi]}</div>
                    <div className="text-end">
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
                              <img draggable={false} src={`/buildgui/${ite}.png`} alt="Core Boon" className="size-6" />
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
