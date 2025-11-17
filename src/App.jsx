import SideNav from "./Comp/Sidebar";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";

import { p9data } from "./Data/P9Data";
import { p11data } from "./Data/P11Data";
import { v1data } from "./Data/V1data";

import { useData } from "./Hook/DataFetch";
import Loading from "./Hook/Loading";
import { Link } from "react-router-dom";

import { useState } from "react";

import {
  h2AspectOrder,
  parseTimetoms,
  sToA,
  orderMap,
  findValue,
  findStatus,
  getStatusColor,
  deCodeArcana,
  deCodeVow,
  vowMatch,
  oathMatch,
} from "./Data/Misc";
import { defineDeck } from "./Data/DeckTrait";
import { p9boons } from "./Data/P9BoonObj";

export default function App() {
  const { posts, loader } = useData();
  const [aspect, setAspect] = useState(`Melinoe Staff`);

  const bundle = [...p9data, ...p11data, ...v1data, ...(posts || [])];
  const displayData = bundle.filter((obj) => obj.asp == aspect);

  const arcanaData = displayData.filter((obj) => obj.arcana);
  const oathData = displayData.filter((obj) => obj.oath);

  // Has Arcana & Fear Setup
  const check1 = displayData.filter((obj) => obj.oath);
  // Highest Fear
  const highestFear = displayData
    .filter((obj) => obj.src && obj.src != "")
    .sort((a, b) => {
      const feaDiff = +b.fea - +a.fea;
      if (feaDiff !== 0) return feaDiff;
      return parseTimetoms(a.tim) - parseTimetoms(b.tim);
    })
    .slice(0, 10);
  // Latest Gameplay
  const latestGame = displayData.sort((a, b) => new Date(b.dat) - new Date(a.dat)).slice(0, 10);
  const fastestGame = displayData.sort((a, b) => parseTimetoms(a.tim) - parseTimetoms(b.tim)).slice(0, 10);

  // Arcana Store
  const store_arcana = Object.entries(
    arcanaData.reduce((acc, val) => {
      const arcanaArry = deCodeArcana(val.arcana);

      acc[arcanaArry] = (acc[arcanaArry] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Oath Store
  const store_oath = Object.entries(
    oathData.reduce((acc, val) => {
      const oathArry = deCodeVow(val.oath);

      acc[oathArry] = (acc[oathArry] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => sToA(a[0]).reduce((acc, val) => acc + +val, 0) - sToA(b[0]).reduce((acc, val) => acc + +val, 0));

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1600px] font-[Ale] text-[14px] mx-auto">
        <SideNav />
        {/* Main Section */}
        {loader ? (
          <Loading />
        ) : (
          <div className="p-1 py-4">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div>Select Aspect</div>
              <select
                className="select select-sm focus:outline-none focus:border-transparent text-[14px] max-w-[200px]"
                onChange={(e) => setAspect(e.target.value)}
              >
                {h2AspectOrder.map((ite, index) => (
                  <option value={ite} key={index}>
                    {ite}
                  </option>
                ))}
              </select>
              {check1.length}/{displayData.length}/{bundle.length}
            </div>
            {/* Entries Data  */}
            <div
              className="my-2 grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-2 p-1 text-gray-300 bg-black/50"
              style={{
                borderStyle: "solid", // Required
                borderWidth: "6px",
                borderImage: "url('/Misc/frame.webp') 40 stretch",
              }}
            >
              <div>
                <div className="text-[16px]">Best {aspect}:</div>
                {highestFear.map((obj, index) => (
                  <div key={index} className="p-1 mb-0.5 rounded relative hover:bg-black/70">
                    <div
                      className={`absolute right-0 top-0 h-full w-2 ${
                        obj.loc === `Underworld` ? `bg-[#00ffaa]` : `bg-[yellow]`
                      }`}
                    />
                    <div className="flex gap-0.5 items-center">
                      <Link to={obj.src} target="_blank">
                        {obj.src.includes(`twitch`) ? (
                          <img src="/Misc/twitch.png" alt="Twitch" className="size-5" />
                        ) : obj.src.includes(`bilibil`) ? (
                          <img src="/Misc/bilibili.png" alt="Bilibili" className="size-5" />
                        ) : obj.src.includes(`youtu`) ? (
                          <img src="/Misc/youtube.png" alt="Youtube" className="size-5" />
                        ) : (
                          `?`
                        )}
                      </Link>
                      <div>
                        {obj.nam} ({obj.fea}) - {obj.tim}
                      </div>
                    </div>
                    <div className="flex">
                      {sToA(obj.cor).map((ite, index) => (
                        <div className="tooltip shrink-0" key={index}>
                          <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                            <div className="text-[11px]">{ite}</div>
                          </div>
                          <img
                            draggable={false}
                            src={`/H2Boons/${ite}.png`}
                            alt="Core Boon"
                            className="size-7 rounded-none"
                          />
                        </div>
                      ))}
                      {obj.ham && (
                        <div className="flex">
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
                              <img
                                draggable={false}
                                src={`/P9/${ite}.png`}
                                alt="Core Boon"
                                className="size-7 rounded-none"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 rounded my-1">
                      {findStatus(obj).map((ite) => (
                        <div
                          className="px-1 py-0.5 rounded-none text-black min-w-[40px] text-center font-[Ubuntu] text-[10px]"
                          style={{ backgroundColor: getStatusColor(ite) }}
                        >
                          {ite}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[16px]">Latest {aspect}:</div>
                {latestGame.map((obj, index) => (
                  <div key={index} className="p-1 mb-0.5 rounded relative hover:bg-black/70">
                    <div
                      className={`absolute right-0 top-0 h-full w-2 ${
                        obj.loc === `Underworld` ? `bg-[#00ffaa]` : `bg-[yellow]`
                      }`}
                    />
                    <div className="flex gap-0.5">
                      <div>
                        {obj.nam} ({obj.fea}) - {obj.dat.slice(0, 10)}
                      </div>
                      {obj.src && (
                        <Link to={obj.src} target="_blank">
                          {obj.src.includes(`twitch`) ? (
                            <img src="/Misc/twitch.png" alt="Twitch" className="size-5" />
                          ) : obj.src.includes(`bilibil`) ? (
                            <img src="/Misc/bilibili.png" alt="Bilibili" className="size-5" />
                          ) : obj.src.includes(`youtu`) ? (
                            <img src="/Misc/youtube.png" alt="Youtube" className="size-5" />
                          ) : (
                            `?`
                          )}
                        </Link>
                      )}
                    </div>
                    <div className="flex">
                      {sToA(obj.cor).map((ite, index) => (
                        <div className="tooltip shrink-0" key={index}>
                          <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                            <div className="text-[11px]">{ite}</div>
                          </div>
                          <img
                            draggable={false}
                            src={`/H2Boons/${ite}.png`}
                            alt="Core Boon"
                            className="size-7 rounded-none"
                          />
                        </div>
                      ))}
                      {obj.ham && (
                        <div className="flex">
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
                              <img
                                draggable={false}
                                src={`/P9/${ite}.png`}
                                alt="Core Boon"
                                className="size-7 rounded-none"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 rounded my-1">
                      {findStatus(obj).map((ite) => (
                        <div
                          className="px-1 py-0.5 rounded-none text-black min-w-[40px] text-center font-[Ubuntu] text-[10px]"
                          style={{ backgroundColor: getStatusColor(ite) }}
                        >
                          {ite}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[16px]">Fastest {aspect}:</div>
                {fastestGame.map((obj, index) => (
                  <div key={index} className="p-1 mb-0.5 rounded relative hover:bg-black/70">
                    <div
                      className={`absolute right-0 top-0 h-full w-2 ${
                        obj.loc === `Underworld` ? `bg-[#00ffaa]` : `bg-[yellow]`
                      }`}
                    />
                    <div className="flex gap-0.5">
                      <div>
                        {obj.nam} ({obj.fea}) - {obj.tim}
                      </div>
                      {obj.src && (
                        <Link to={obj.src} target="_blank">
                          {obj.src.includes(`twitch`) ? (
                            <img src="/Misc/twitch.png" alt="Twitch" className="size-5" />
                          ) : obj.src.includes(`bilibil`) ? (
                            <img src="/Misc/bilibili.png" alt="Bilibili" className="size-5" />
                          ) : obj.src.includes(`youtu`) ? (
                            <img src="/Misc/youtube.png" alt="Youtube" className="size-5" />
                          ) : (
                            `?`
                          )}
                        </Link>
                      )}
                    </div>
                    <div className="flex">
                      {sToA(obj.cor).map((ite, index) => (
                        <div className="tooltip shrink-0" key={index}>
                          <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                            <div className="text-[11px]">{ite}</div>
                          </div>
                          <img
                            draggable={false}
                            src={`/H2Boons/${ite}.png`}
                            alt="Core Boon"
                            className="size-7 rounded-none"
                          />
                        </div>
                      ))}
                      {obj.ham && (
                        <div className="flex">
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
                              <img
                                draggable={false}
                                src={`/P9/${ite}.png`}
                                alt="Core Boon"
                                className="size-7 rounded-none"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 rounded my-1">
                      {findStatus(obj).map((ite) => (
                        <div
                          className="px-1 py-0.5 rounded-none text-black min-w-[40px] text-center font-[Ubuntu] text-[10px]"
                          style={{ backgroundColor: getStatusColor(ite) }}
                        >
                          {ite}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Aspect Oath && Arcana */}
            <div className="flex flex-col lg:flex-row gap-x-2 select-none">
              <div
                className="my-2 text-gray-300 w-full flex gap-4 overflow-x-scroll p-1 bg-black/50 rounded select-none"
                style={{
                  borderStyle: "solid", // Required
                  borderWidth: "6px",
                  borderImage: "url('/Misc/frame.webp') 40 stretch",
                }}
              >
                {store_oath.map((obj, ind1) => (
                  <div className="p-2 mx-auto min-w-[400px] rounded">
                    <div className="text-center text-[16px]">
                      Fear {sToA(obj[0]).reduce((acc, val) => acc + +val, 0)}
                    </div>
                    <div className="grid grid-cols-4 gap-1 rounded">
                      {sToA(obj[0]).map((ite, index) => (
                        <div
                          className={`bg-[#131111] min-h-[75px] rounded border border-white/10 p-1 py-2 flex gap-1 items-center ${
                            index === 16 && `col-start-2 col-span-2`
                          }`}
                          key={index}
                        >
                          <img src={`/Vows/${vowMatch[index]}.png`} alt="Vows" className="size-7" />
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[12px]">{vowMatch[index]}</div>
                            <div className="flex gap-0.5">
                              {Array.from({ length: oathMatch[index].length - 1 }, (_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i <= oathMatch[index].indexOf(+ite) - 1 ? "bg-[#00ffaa]" : "bg-[#474749]"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="my-2 text-gray-300 w-full flex overflow-x-scroll gap-2 p-1 bg-black/50 rounded"
                style={{
                  borderStyle: "solid", // Required
                  borderWidth: "6px",
                  borderImage: "url('/Misc/frame.webp') 40 stretch",
                }}
              >
                {store_arcana.map((obj, ind1) => (
                  <div className="min-w-[320px] p-2 rounded">
                    <div className="text-center">
                      (
                      {sToA(obj[0])
                        .map((ite) => defineDeck(ite)?.g)
                        .reduce((a, b) => a + b, 0)}
                      ) Deck #{ind1 + 1}
                    </div>
                    <div className={`grid grid-cols-5 w-full max-w-[300px] mx-auto rounded`}>
                      {Array.from({ length: 25 }, (_, i) => {
                        const cardId = `c${i + 1}`;
                        const selection = store_arcana[ind1][0].split(","); // ensure it’s an array
                        return (
                          <img
                            key={cardId}
                            src={`${selection.includes(cardId) ? `/Arcane/${cardId}.png` : `/Arcane/c0.png`}`}
                            className="w-full"
                            loading="lazy"
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
