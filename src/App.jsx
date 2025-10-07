import SideNav from "./Comp/Sidebar";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";

import { p9data } from "./Data/P9Data";
import { p11data } from "./Data/P11Data";
import { v1data } from "./Data/V1data";
import {
  sToA,
  getYTid,
  getBilibiliid,
  getTwitchid,
  orderMap2,
  findValue2,
  deCodeArcana,
  deCodeVow,
  oathMatch,
  vowMatch,
  findValue,
  orderMap,
  parseTimetoms,
  parsemstoTime,
} from "./Data/Misc";
import { p9boons } from "./Data/P9BoonObj";
import { boonCodex } from "./Data/Boon2";

import { useData } from "./Hook/DataFetch";
import Loading from "./Hook/Loading";

import { useState, useEffect } from "react";

const latest10videos = [...p11data, ...p9data]
  .filter((obj) => obj.src)
  .sort((a, b) => new Date(b.dat) - new Date(a.dat))
  .slice();

const orderByFearAndTime = [...p9data, ...p11data, ...v1data].sort((a, b) => {
  const feaDiff = +b.fea - +a.fea;
  if (feaDiff !== 0) return feaDiff;
  return parseTimetoms(a.tim) - parseTimetoms(b.tim);
});

const allPBs = orderByFearAndTime.reduce(
  (acc, curr) => {
    const key = `${curr.nam}_${curr.asp}`;
    if (!acc.map.has(key)) {
      acc.map.set(key, true);
      acc.result.push(curr);
    }
    return acc;
  },
  { map: new Map(), result: [] }
).result;

// Unique PBs
const totalUnique_uw = allPBs.filter((obj) => obj.loc === `Underworld`);
const totalUnique_s = allPBs.filter((obj) => obj.loc === `Surface`);
const totalFear_uw = totalUnique_uw.reduce((arc, cur) => arc + +cur.fea, 0);
const totalFear_s = totalUnique_s.reduce((arc, cur) => arc + +cur.fea, 0);

// Raw Data
const total_uw = orderByFearAndTime.filter((obj) => obj.loc === `Underworld`);
const total_s = orderByFearAndTime.filter((obj) => obj.loc === `Surface`);
const total_uwfear = total_uw.reduce((arc, cur) => arc + +cur.fea, 0);
const total_sfear = total_s.reduce((arc, cur) => arc + +cur.fea, 0);

const displayUnique = [
  { title: `Total PBs`, dat: totalUnique_uw.length, body: `UW` },
  { title: `Total PBs`, dat: totalUnique_s.length, body: `Surface` },
  { title: `Total Fear`, dat: totalFear_uw, body: `UW PBs` },
  { title: `Total Fear`, dat: totalFear_s, body: `Surface PBs` },
];

const displayRaw = [
  { title: `EA Included`, dat: total_uw.length, body: `UW Runs` },
  { title: `EA Included`, dat: total_s.length, body: `Surface Runs` },
  { title: `Total Fear`, dat: total_uwfear, body: `UW Runs` },
  { title: `Total Fear`, dat: total_sfear, body: `Surface Runs` },
];

export default function App() {
  const { posts, loader } = useData();

  const latestVideos = [...v1data, ...(posts || [])]
    .filter((obj) => obj.src)
    .sort((a, b) => new Date(b.dat) - new Date(a.dat))
    .slice();

  const [url, setURL] = useState(latestVideos[0]);

  // Update when posts change
  useEffect(() => {
    if (latestVideos.length > 0) {
      setURL(latestVideos[0]);
    }
  }, [posts]);

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1600px] text-[10px] md:text-[11px] mx-auto px-1">
        <SideNav />
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-1 md:gap-2 md:p-1 mx-auto max-w-[1000px]">
          {displayUnique.map((obj, index) => (
            <div className="w-full p-2 bg-gradient-to-tr from-[#28282b] to-[#0e0e0e] rounded-sm font-[Ale] text-[12px]">
              <div>{obj.body}</div>
              <div className="text-[18px] md:text-[20px] text-[#00ffaa]">{obj.dat.toLocaleString(`en-US`)}</div>
              <div>{obj.title}</div>
            </div>
          ))}
          {displayRaw.map((obj, index) => (
            <div className="w-full p-2 bg-gradient-to-tr from-[#28282b] to-[#0e0e0e] rounded-sm font-[Ale] text-[12px]">
              <div>{obj.body}</div>
              <div className="text-[18px] md:text-[20px] text-[#00ffaa]">{obj.dat.toLocaleString(`en-US`)}</div>
              <div>{obj.title}</div>
            </div>
          ))}
        </div>

        <div className="max-w-[800px] mx-auto font-[Ubuntu]">
          {loader ? (
            <Loading />
          ) : (
            <>
              <div className="my-2">
                {url.src.includes(`youtu`) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYTid(url.src)}`}
                    title="Gameplay Video"
                    allowFullScreen
                    className="w-full h-full rounded aspect-video"
                  />
                ) : url.src.includes(`bilibil`) ? (
                  <iframe
                    src={`//player.bilibili.com/player.html?bvid=${getBilibiliid(url.src)}&autoplay=0`}
                    allowFullScreen
                    className="w-full h-full rounded aspect-video"
                  />
                ) : (
                  <iframe
                    src={`https://player.twitch.tv/?video=${getTwitchid(
                      url.src
                    )}&parent=h2crossroads.pages.dev&autoplay=false`}
                    className="w-full h-full rounded aspect-video"
                    allowfullscreen
                  ></iframe>
                )}
                <div className="px-2 py-1 bg-[#000000] text-white rounded my-1">
                  <div className="grid grid-cols-4 mt-1">
                    <div>Player</div>
                    <div className="text-end">Aspect / Fear</div>
                    <div className="text-end">Time</div>
                    <div className="text-end">Date</div>
                  </div>
                  <div className="grid grid-cols-4 mb-1">
                    <div>{url.nam}</div>
                    <div className="text-end">
                      {url.asp} / {url.fea}
                    </div>
                    <div className="text-end">{url.tim}</div>
                    <div className="text-end">{url.dat}</div>
                  </div>
                  {url.ks && (
                    <div className="flex my-0.5 gap-0.5">
                      {sToA(url.ks).map((ite, index) => (
                        <div className="tooltip shrink-0">
                          <div className="tooltip-content bg-black border-1 text-[#00ffaa] rounded">
                            <div className="text-[10px]">{ite}</div>
                          </div>
                          <img draggable={false} src={`/buildgui/${ite}.png`} alt="Keepsake" className="size-6" />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap items-center my-0.5 gap-0.5">
                    {url.ham && (
                      <div className="flex gap-0.5 rounded">
                        {findValue(
                          sToA(url.ham).sort((a, b) => {
                            const aIndex = orderMap.get(a) ?? Infinity;
                            const bIndex = orderMap.get(b) ?? Infinity;
                            return aIndex - bIndex;
                          })
                        ).map((ite, index) => (
                          <div className="tooltip shrink-0">
                            <div className="tooltip-content bg-black border-1 text-[#00ffaa] rounded">
                              <div className="text-[10px]">{p9boons[ite]}</div>
                            </div>
                            <img draggable={false} src={`/P9/${ite}.png`} alt="Core Boon" className="size-7" />
                          </div>
                        ))}
                      </div>
                    )}
                    {sToA(url.cor).map((ite, index) => (
                      <div className="tooltip shrink-0">
                        <div className="tooltip-content bg-black border-1 text-[#00ffaa] rounded">
                          <div className="text-[10px]">{ite}</div>
                        </div>
                        <img draggable={false} src={`/H2Boons/${ite}.png`} alt="Core Boon" className="size-7" />
                      </div>
                    ))}
                  </div>
                  {url.boon && (
                    <div className="flex items-center flex-wrap my-0.5">
                      <div className="flex flex-wrap gap-0.5 rounded">
                        {findValue2(
                          sToA(url.boon).sort((a, b) => {
                            const aIndex = orderMap2.get(a) ?? Infinity;
                            const bIndex = orderMap2.get(b) ?? Infinity;
                            return aIndex - bIndex;
                          })
                        ).map((ite, index) => (
                          <div className="tooltip shrink-0">
                            <div className="tooltip-content bg-black border-1 text-[#00ffaa] rounded">
                              <div className="text-[10px]">{boonCodex[ite]}</div>
                            </div>
                            <img draggable={false} src={`/P9/${ite}.png`} alt="Core Boon" className={`size-7`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {(url.arcana || url.oath) && (
                    <div className="flex flex-col md:flex-row gap-x-2 items-start">
                      {url.arcana && (
                        <div className="grid grid-cols-5 justify-start items-start w-full max-w-[350px] my-1">
                          {Array.from({ length: 25 }, (_, i) => {
                            const cardId = `c${i + 1}`;
                            const selection = deCodeArcana(url.arcana);

                            return (
                              <img
                                key={cardId}
                                src={`${selection.includes(cardId) ? `/Arcane/${cardId}.png` : `/Arcane/c0.png`}`}
                                className="w-full"
                              />
                            );
                          })}
                        </div>
                      )}
                      {url.oath && (
                        <div className="grid grid-cols-4 my-1 gap-1 w-full max-w-[450px]">
                          {deCodeVow(url.oath).map((ite, index) => (
                            <div
                              className={`bg-[#28282b] rounded p-1 py-2 flex gap-1 items-center ${
                                index === 16 && `col-start-2 col-span-2`
                              }`}
                            >
                              <img src={`/Vows/${vowMatch[index]}.png`} alt="Vows" className="size-7 md:size-8" />
                              <div className="flex flex-col gap-0.5">
                                <div>{vowMatch[index]}</div>
                                <div className="flex gap-0.5">
                                  {Array.from({ length: oathMatch[index].length - 1 }, (_, i) => (
                                    <div
                                      key={i}
                                      className={`w-2 h-2 rounded-full ${
                                        i <= oathMatch[index].indexOf(ite) - 1 ? "bg-[#00ffaa]" : "bg-black"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="my-4 bg-[#000000] rounded py-1">
                <div className="px-2 text-[14px] mb-2">v1.0 Gameplay</div>
                {latestVideos.map((obj) => (
                  <div
                    className={`grid grid-cols-4 sm:grid-cols-5 items-center cursor-pointer px-2 hover:bg-[#0059ffa1] ${
                      obj == url ? `bg-[#0059ff] text-white rounded` : ``
                    }`}
                    onClick={() => {
                      setURL(obj);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <div className="flex items-center gap-0.5">
                      {obj.src.includes(`twitch`) ? (
                        <img src="/Misc/twitch.png" alt="Twitch" className="size-5" />
                      ) : obj.src.includes(`bilibil`) ? (
                        <img src="/Misc/bilibili.png" alt="Bilibili" className="size-5" />
                      ) : (
                        <img src="/Misc/youtube.png" alt="Youtube" className="size-5" />
                      )}
                      {obj.nam}
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-end">{obj.loc}</div>
                    </div>
                    <div className={`text-end ${obj.loc === `Underworld` ? `text-[#00ffaa]` : `text-[yellow]`}`}>
                      {obj.asp} / {obj.fea}
                    </div>
                    <div className="text-end">{obj.tim}</div>
                    <div className="text-end">{obj.dat}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="my-4 bg-[#000000] rounded py-1">
            <div className="px-2 text-[14px] mb-2">Early Access Gameplay</div>
            {latest10videos.map((obj) => (
              <div
                className={`grid grid-cols-4 sm:grid-cols-5 items-center cursor-pointer px-2 hover:bg-[#00ffaaa1] ${
                  obj == url ? `bg-[#00ffaa] text-black` : ``
                }`}
                onClick={() => {
                  setURL(obj);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className="flex items-center gap-0.5">
                  {obj.src.includes(`twitch`) ? (
                    <img src="/Misc/twitch.png" alt="Twitch" className="size-5" />
                  ) : obj.src.includes(`bilibil`) ? (
                    <img src="/Misc/bilibili.png" alt="Bilibili" className="size-5" />
                  ) : (
                    <img src="/Misc/youtube.png" alt="Youtube" className="size-5" />
                  )}
                  {obj.nam}
                </div>
                <div className="hidden sm:block">
                  <div className="text-end">{obj.loc}</div>
                </div>
                <div className={`text-end ${obj.loc === `Underworld` ? `text-[#00ffaa]` : `text-[yellow]`}`}>
                  {obj.asp} / {obj.fea}
                </div>
                <div className="text-end">{obj.tim}</div>
                <div className="text-end">{obj.dat}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
