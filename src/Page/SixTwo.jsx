import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { p9data } from "../Data/P9Data";
import { p11data } from "../Data/P11Data";
import { v1data } from "../Data/V1data";
import { useState } from "react";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

import { parseTimetoms, findValue2, orderMap2, sToA, biomeS, biomeU, findValue, orderMap, getYTid } from "../Data/Misc";
import { p9boons } from "../Data/P9BoonObj";
import { boonCodex } from "../Data/Boon2";

export default function SixTwo() {
  const { posts, loader } = useData();

  const allData = [...p9data, ...p11data, ...v1data, ...(posts || [])];

  const targetData = allData.filter((obj) => obj.fea == 62);
  const allPlayer = [...new Set(targetData.map((obj) => obj.nam))];

  const sortedOrderByTime = targetData.sort((a, b) => parseTimetoms(a.tim) - parseTimetoms(b.tim));

  const seen = new Set();
  const uniquePlayer = sortedOrderByTime.filter((p) => {
    if (!allPlayer.includes(p.nam)) return false;
    if (seen.has(p.nam)) return false;
    seen.add(p.nam);
    return true;
  });

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1200px] font-[Ale] text-[12px] md:text-[13px] mx-auto px-2">
        <SideNav />
        {loader ? (
          <Loading />
        ) : (
          <div className="my-6">
            <div className="text-center text-[20px] mb-2 font-[Cinzel]">Fear Six Two</div>
            <div>Total 62 Fear Entries: {targetData.length}</div>
            <div>Total 62 Fear Unique Players: {allPlayer.length}</div>
            {uniquePlayer.map((obj, index) => (
              <div className="flex gap-2 mb-1 min-h-[175px]">
                <div
                  className={`w-full p-2 py-1 flex flex-col gap-1 relative overflow-hidden bg-[#1013248b] rounded shadow-[0_0_20px_black]`}
                  style={{
                    borderStyle: "solid", // Required
                    borderWidth: "4px",
                    borderImage: "url('/Misc/frame.webp') 40 stretch",
                  }}
                >
                  <div className="absolute top-0 right-0 -z-10 h-full w-full">
                    <img
                      src={`/GUI_Card/c${obj.asp}.png`}
                      alt="Aspect"
                      className="hidden md:block absolute top-1/2 -translate-y-[50%] left-5 w-[90px] lg:w-[75px] rounded mx-auto drop-shadow-[0_0_10px_purple]"
                      draggable={false}
                      loading="lazy"
                    />
                    <img
                      src={`/GUI_Card/c${obj.asp}.png`}
                      alt="Aspect"
                      className="hidden md:block absolute top-1/2 -translate-y-[50%] right-5 w-[90px] lg:w-[75px] rounded mx-auto drop-shadow-[0_0_10px_purple]"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                  {/* Content */}
                  <div className="w-full text-center">
                    <div className={`text-[14px] my-2 ${obj.loc == `Underworld` ? `text-[#00ffaa]` : `text-[yellow]`}`}>
                      {index + 1} | {obj.nam} | {obj.tim}
                    </div>
                    {obj.ks && (
                      <div className="flex justify-center flex-wrap gap-0.5 rounded font-[Ubuntu] text-[10px]">
                        {sToA(obj.ks).map((ite, index) => (
                          <div className="px-2 py-1 bg-[#000000] rounded flex items-center gap-1">
                            <img
                              draggable={false}
                              src={`/buildgui/${ite}.png`}
                              alt="Keepsake"
                              className="size-5 sm:size-6"
                            />
                            <div>
                              <div>{obj.loc === `Underworld` ? biomeU[index] : biomeS[index]}</div>
                              <div>{ite}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-center items-center flex-wrap my-1 gap-0.5">
                      <div className="flex gap-0.5 rounded">
                        <div className="tooltip shrink-0">
                          <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                            <div className="text-[11px]">{obj.asp}</div>
                          </div>
                          <img draggable={false} src={`/P9/${obj.asp}.png`} alt="Core Boon" className="size-8" />
                        </div>
                        <div className="tooltip shrink-0">
                          <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                            <div className="text-[11px]">{obj.fam}</div>
                          </div>
                          <img draggable={false} src={`/P9/${obj.fam}.png`} alt="Core Boon" className="size-8" />
                        </div>
                      </div>
                      {obj.ham && (
                        <div className="flex gap-0.5 rounded">
                          {findValue(
                            sToA(obj.ham).sort((a, b) => {
                              const aIndex = orderMap.get(a) ?? Infinity;
                              const bIndex = orderMap.get(b) ?? Infinity;
                              return aIndex - bIndex;
                            })
                          ).map((ite, index) => (
                            <div className="tooltip shrink-0">
                              <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                                <div className="text-[11px]">{p9boons[ite]}</div>
                              </div>
                              <img draggable={false} src={`/P9/${ite}.png`} alt="Core Boon" className="size-8" />
                            </div>
                          ))}
                        </div>
                      )}
                      {sToA(obj.cor).map((ite, index) => (
                        <div className="tooltip shrink-0" key={index}>
                          <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                            <div className="text-[11px]">{ite}</div>
                          </div>
                          <img draggable={false} src={`/H2Boons/${ite}.png`} alt="Core Boon" className="size-8" />
                        </div>
                      ))}
                    </div>
                    {obj.boon && (
                      <div className="flex justify-center items-center flex-wrap my-1">
                        <div className="flex flex-wrap gap-0.5 rounded">
                          {findValue2(
                            sToA(obj.boon).sort((a, b) => {
                              const aIndex = orderMap2.get(a) ?? Infinity;
                              const bIndex = orderMap2.get(b) ?? Infinity;
                              return aIndex - bIndex;
                            })
                          ).map((ite, index) => (
                            <div className="tooltip shrink-0">
                              <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                                <div className="text-[11px]">{boonCodex[ite]}</div>
                              </div>
                              <img draggable={false} src={`/P9/${ite}.png`} alt="Core Boon" className={`size-7`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="px-2 text-gray-300 my-2 max-w-[800px] mx-auto">{obj.des}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
