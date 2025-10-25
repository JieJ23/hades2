import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { p9data } from "../Data/P9Data";
import { p11data } from "../Data/P11Data";
import { v1data } from "../Data/V1data";
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
  findStatus,
  getStatusColor,
} from "../Data/Misc";
import { p9boons } from "../Data/P9BoonObj";
import { boonCodex } from "../Data/Boon2";

import { useData } from "../Hook/DataFetch";
import { useMemo } from "react";

import { useState, useEffect } from "react";

const latest10videos = [...p11data, ...p9data]
  .filter((obj) => obj.src)
  .sort((a, b) => new Date(b.dat) - new Date(a.dat));

export default function Archive() {
  const { posts, loader } = useData();

  const latestVideos = useMemo(() => {
    return [...v1data, ...(posts || [])].sort((a, b) => new Date(b.dat) - new Date(a.dat));
  }, [v1data, posts]);

  const [url, setURL] = useState(null);

  // Update when posts change
  useEffect(() => {
    setURL(() => {
      const validVideo = latestVideos.find((video) => video.src && video.src.trim() !== "");
      return validVideo || latestVideos[0];
    });
  }, [posts]);

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1600px] text-[10px] md:text-[11px] mx-auto px-1">
        <SideNav />
        <div className="max-w-[800px] mx-auto font-[Ubuntu]">
          {loader ? (
            <div
              className="skeleton h-auto w-full aspect-video"
              style={{
                borderStyle: "solid", // Required
                borderWidth: "8px",
                borderImage: "url('/Misc/frame.webp') 40 stretch",
              }}
            />
          ) : (
            <>
              <div className="my-2">
                <div
                  style={{
                    borderStyle: "solid", // Required
                    borderWidth: "8px",
                    borderImage: "url('/Misc/frame.webp') 40 stretch",
                  }}
                >
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
                </div>
                <div
                  className="px-2 py-1 bg-[#000000] text-white rounded my-1"
                  style={{
                    borderStyle: "solid", // Required
                    borderWidth: "8px",
                    borderImage: "url('/Misc/frame.webp') 40 stretch",
                  }}
                >
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
                    <div className="text-end">{url.dat.slice(0, 10)}</div>
                  </div>
                  {url.ks && (
                    <div className="flex my-0.5 gap-0.5">
                      {sToA(url.ks).map((ite, index) => (
                        <div className="tooltip shrink-0" key={index}>
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
                          <div className="tooltip shrink-0" key={index}>
                            <div className="tooltip-content bg-black border-1 text-[#00ffaa] rounded">
                              <div className="text-[10px]">{p9boons[ite]}</div>
                            </div>
                            <img draggable={false} src={`/P9/${ite}.png`} alt="Core Boon" className="size-7" />
                          </div>
                        ))}
                      </div>
                    )}
                    {sToA(url.cor).map((ite, index) => (
                      <div className="tooltip shrink-0" key={index}>
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
                          <div className="tooltip shrink-0" key={index}>
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
                              key={index}
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
              <div
                className="my-4 bg-[#000000] rounded py-1"
                style={{
                  borderStyle: "solid", // Required
                  borderWidth: "8px",
                  borderImage: "url('/Misc/frame.webp') 40 stretch",
                }}
              >
                <div className="px-2 text-[14px] mb-2">v1.0 Gameplay</div>
                {latestVideos.map((obj, index) => (
                  <div
                    className={`grid grid-cols-4 sm:grid-cols-5 items-center cursor-pointer px-2 hover:bg-[#28282ba1] ${
                      obj == url ? `bg-[#28282b] text-white rounded` : ``
                    }`}
                    onClick={() => {
                      if (obj.src) {
                        setURL(obj);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        return;
                      }
                    }}
                    key={index}
                  >
                    <div
                      className={`flex items-center gap-0.5 ${
                        obj.loc === `Underworld` ? `text-[#00ffaa]` : `text-[yellow]`
                      }`}
                    >
                      {obj.src.includes(`twitch`) ? (
                        <img src="/Misc/twitch.png" alt="Twitch" className="size-5" />
                      ) : obj.src.includes(`bilibil`) ? (
                        <img src="/Misc/bilibili.png" alt="Bilibili" className="size-5" />
                      ) : obj.src.includes(`youtu`) ? (
                        <img src="/Misc/youtube.png" alt="Youtube" className="size-5" />
                      ) : (
                        <img src={`/${obj.loc}.png`} alt="Region" className="size-5" />
                      )}
                      {obj.nam}
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-end flex gap-1">
                        {findStatus(obj).map((ite) => (
                          <div style={{ color: getStatusColor(ite) }}>{ite}</div>
                        ))}
                      </div>
                    </div>
                    <div className={`text-end`}>
                      {obj.asp} / {obj.fea}
                    </div>
                    <div className="text-end">{obj.tim}</div>
                    <div className="text-end">{obj.dat.slice(0, 10)}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div
            className="my-4 bg-[#000000] rounded py-1"
            style={{
              borderStyle: "solid", // Required
              borderWidth: "8px",
              borderImage: "url('/Misc/frame.webp') 40 stretch",
            }}
          >
            <div className="px-2 text-[14px] mb-2">Early Access Gameplay</div>
            {latest10videos.map((obj, index) => (
              <div
                className={`grid grid-cols-4 sm:grid-cols-5 items-center cursor-pointer px-2 hover:bg-[#28282ba1] ${
                  obj == url ? `bg-[#28282b] text-white` : ``
                }`}
                onClick={() => {
                  setURL(obj);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                key={index}
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
