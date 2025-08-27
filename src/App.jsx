import SideNav from "./Comp/Sidebar";
import { p9boons } from "./Data/P9BoonObj";
import { p9boons_reverse, allP9 } from "./Data/P9BoonObj";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";
import { bOrder } from "./Data/Boon2";
import { boonCodexr } from "./Data/Boon2";
import { h2AspectOrder, parseTimetoms, sToA } from "./Data/Misc";

import { p11data } from "./Data/P11Data";
import { p9data } from "./Data/P9Data";
import { useData } from "./Hook/DataFetch";
import Loading from "./Hook/Loading";
import { useState } from "react";

export const orderMap = new Map(allP9.map((item, index) => [item, index]));
export const orderMap2 = new Map(bOrder.map((item, index) => [item, index]));

export const findGUIcard = (asp) => {
  switch (asp) {
    case `Anubis`:
      return `Melinoe Staff`;
    case `Morrigan`:
      return `Melinoe Blades`;
    case `Nergal`:
      return `Melinoe Axe`;
    case `Hel`:
      return `Melinoe Skull`;
    case `Shiva`:
      return `Melinoe Coat`;
    case `Supay`:
      return `Melinoe Flames`;
    default:
      return asp;
  }
};
export const findValue = (arr) => {
  const finalized = arr.map((ite) => p9boons_reverse[ite]);
  return finalized;
};
export const findValue2 = (arr) => {
  const finalized = arr.map((ite) => boonCodexr[ite]);
  return finalized;
};
export const handleLoadMore = (updater) => {
  updater((prev) => prev + 50);
};

export default function App() {
  const { posts, loader } = useData();
  const [location, setLocation] = useState(`Underworld`);
  const [category, setCategory] = useState(`Fear`);
  const [boon, setBoon] = useState(`Core`);

  const fullData = [...p11data, ...p9data, ...(posts || [])];
  const regionData = fullData.filter((obj) => obj.loc === location);
  // const targetData = underworld.filter((obj) => obj.asp === `Supay`).sort((a, b) => b.fea - a.fea);
  // const uniquePlayers = targetData.filter(
  //   (player, index, self) => index === self.findIndex((p) => p.nam === player.nam)
  // );

  const fulldata_ArrArrObject = [];

  for (let i = 0; i < h2AspectOrder.length; i++) {
    const aspectArray = regionData
      .filter((obj) => obj.asp === h2AspectOrder[i])
      .sort((a, b) =>
        category === `Speed`
          ? parseTimetoms(a.tim) - parseTimetoms(b.tim)
          : b.fea - a.fea || parseTimetoms(a.tim) - parseTimetoms(b.tim)
      );
    const removeDup = aspectArray.filter(
      (player, index, self) => index === self.findIndex((p) => p.nam === player.nam)
    );
    fulldata_ArrArrObject.push(removeDup);
  }

  return (
    <main className="h-full min-h-lvh relative select-none overflow-hidden">
      <Background />
      <div className="max-w-[1600px] font-[Ale] text-[11px] md:text-[12px] mx-auto px-1">
        <SideNav />
        {loader ? (
          <Loading />
        ) : (
          <>
            <div className="p-1 flex justify-center gap-1 my-2">
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
                  category === `Fear` ? `bg-white text-black` : `bg-transparent text-white`
                }`}
                onClick={() => setCategory(`Fear`)}
              >
                Fear
              </button>
              <button
                className={`cursor-pointer text-black rounded p-1 ${
                  category === `Speed` ? `bg-white text-black` : `bg-transparent text-white`
                }`}
                onClick={() => setCategory(`Speed`)}
              >
                Speed
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2 my-2">
              {fulldata_ArrArrObject.map((arr, oi) => (
                <div className="bg-[#211f1fa6] rounded px-2 py-1 relative">
                  <img
                    src={`/GUI_Card/c${findGUIcard(h2AspectOrder[oi])}.png`}
                    alt="Aspect"
                    className="absolute w-auto h-full top-1/2 left-1/2 -z-10 opacity-40 -translate-x-[50%] -translate-y-[50%]"
                  />
                  <div className="grid grid-cols-3 text-center text-[12px] text-white" key={oi}>
                    <div className="text-start text-[#ffa200] text-[13px]">{h2AspectOrder[oi]}</div>
                  </div>
                  {arr.slice(0, 10).map((obj, index) => (
                    <div
                      className="grid grid-cols-4 text-center hover:bg-[#131111] hover:text-[#00ffaa] relative text-white items-center"
                      key={index}
                    >
                      <div className="text-start line-clamp-1">{obj.nam}</div>
                      <div>{obj.fea}</div>
                      <div className="w-full flex gap-0.5">
                        {boon === `Core`
                          ? sToA(obj.cor).map((ite, index) => (
                              <div className="tooltip shrink-0" key={index}>
                                <div className="tooltip-content bg-white text-black rounded">
                                  <div className="text-[11px]">{ite}</div>
                                </div>
                                <img
                                  draggable={false}
                                  src={`/H2Boons/${ite}.png`}
                                  alt="Core Boon"
                                  className="w-[22px] h-[22px]"
                                />
                              </div>
                            ))
                          : obj.ham && (
                              <div className="flex gap-0.5 rounded">
                                {findValue(
                                  sToA(obj.ham).sort((a, b) => {
                                    const aIndex = orderMap.get(a) ?? Infinity;
                                    const bIndex = orderMap.get(b) ?? Infinity;
                                    return aIndex - bIndex;
                                  })
                                ).map((ite, index) => (
                                  <div className="tooltip shrink-0" key={index}>
                                    <div className="tooltip-content bg-white text-black rounded">
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
