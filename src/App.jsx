import SideNav from "./Comp/Sidebar";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";

import { p11data } from "./Data/P11Data";
import { sToA, getYTid, getBilibiliid, getTwitchid, orderMap2, findValue2 } from "./Data/Misc";
import { boonCodex } from "./Data/Boon2";

import { useState } from "react";

const latest10videos = p11data
  .filter((obj) => obj.src)
  .sort((a, b) => new Date(b.dat) - new Date(a.dat))
  .slice();

export default function App() {
  const [url, setURL] = useState(latest10videos[0]);

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1600px] text-[10px] md:text-[11px] mx-auto px-1">
        <SideNav />
        <div className="max-w-[800px] mx-auto font-[Ubuntu]">
          <div className="my-2">
            {url.src.includes(`youtu`) ? (
              <iframe
                src={`https://www.youtube.com/embed/${getYTid(url.src)}`}
                title="Gameplay Video"
                allowFullScreen
                className="w-full h-full rounded-xl aspect-video"
              />
            ) : url.src.includes(`bilibil`) ? (
              <iframe
                src={`//player.bilibili.com/player.html?bvid=${getBilibiliid(url.src)}&autoplay=0`}
                allowFullScreen
                className="w-full h-full rounded-xl aspect-video"
              />
            ) : (
              <iframe
                src={`https://player.twitch.tv/?video=${getTwitchid(
                  url.src
                )}&parent=h2crossroads.pages.dev&autoplay=false`}
                className="w-full h-full rounded-xl aspect-video"
                allowfullscreen
              ></iframe>
            )}
            <div className="px-2 py-1 bg-[#000000a1] text-white rounded">
              <div className="flex flex-wrap justify-between items-center my-1">
                <div>Player: {url.nam}</div>
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
                  <>
                    {sToA(url.ham).map((ite, index) => (
                      <div className="tooltip shrink-0">
                        <div className="tooltip-content bg-black border-1 text-[#00ffaa] rounded">
                          <div className="text-[10px]">{ite}</div>
                        </div>
                        <img draggable={false} src={`/buildgui/${ite}.png`} alt="Keepsake" className="size-7" />
                      </div>
                    ))}
                  </>
                )}
                <div>
                  {sToA(url.cor).map((ite, index) => (
                    <div className="tooltip shrink-0">
                      <div className="tooltip-content bg-black border-1 text-[#00ffaa] rounded">
                        <div className="text-[10px]">{ite}</div>
                      </div>
                      <img draggable={false} src={`/H2Boons/${ite}.png`} alt="Core Boon" className="size-7" />
                    </div>
                  ))}
                </div>
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
            </div>
          </div>
          <div className="my-4 bg-[#000000a1] rounded py-1">
            <div className="px-2 text-[14px] mb-2">Gameplay Videos</div>
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
                <div>{obj.nam}</div>
                <div className="hidden sm:block">
                  <div className="flex gap-0.5 rounded">
                    {sToA(obj.cor).map((ite, index) => (
                      <div className="tooltip shrink-0">
                        <div className="tooltip-content bg-black border-1 text-[#00ffaa] rounded">
                          <div className="text-[10px]">{ite}</div>
                        </div>
                        <img
                          draggable={false}
                          src={`/H2Boons/${ite}.png`}
                          alt="Core Boon"
                          className="size-6 rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-end">
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
