import SideNav from "./Comp/Sidebar";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";

import { p11data } from "./Data/P11Data";
import { sToA, getYTid, getBilibiliid, orderMap2, findValue2 } from "./Data/Misc";
import { boonCodex } from "./Data/Boon2";

import { useState, useEffect } from "react";

const targetDate = new Date("September 25, 2025 00:00:00").getTime();

const latest10videos = p11data
  .filter((obj) => obj.src)
  .sort((a, b) => new Date(b.dat) - new Date(a.dat))
  .slice(0, 50);

export default function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [url, setURL] = useState(latest10videos[0]);

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1600px] font-[Ubuntu] text-[10px] md:text-[11px] mx-auto px-1">
        <SideNav />
        <div className="flex flex-col items-center justify-center bg-transparent my-4 p-2">
          <h1 className="font-[Ale] text-[24px] text-white font-bold mb-6">Countdown to September 25</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-[Ale] text-[11px] md:text-[12px]">
            <div className="p-6 bg-[#fff] rounded shadow text-black relative">
              <div className="font-[Ale] font-bold text-[28px]">{timeLeft.days}</div>
              <span>Days</span>
            </div>
            <div className="p-6 bg-[#fff] rounded shadow text-black">
              <div className="font-[Ale] font-bold text-[28px]">{timeLeft.hours}</div>
              <span>Hours</span>
            </div>
            <div className="p-6 bg-[#fff] rounded shadow text-black">
              <div className="font-[Ale] font-bold text-[28px]">{timeLeft.minutes}</div>
              <span>Minutes</span>
            </div>
            <div className="p-6 bg-[#fff] rounded shadow text-black counter">
              <div className="font-[Ale] font-bold text-[28px]">{timeLeft.seconds}</div>
              <span>Seconds</span>
            </div>
          </div>
        </div>
        <div className="max-w-[800px] mx-auto">
          <div className="my-4">
            {url.src.includes(`youtu`) ? (
              <iframe
                src={`https://www.youtube.com/embed/${getYTid(url.src)}`}
                title="Gameplay Video"
                allowFullScreen
                className="w-full h-full rounded aspect-video"
                loading="lazy"
              />
            ) : (
              <iframe
                src={`//player.bilibili.com/player.html?bvid=${getBilibiliid(url.src)}`}
                allowfullscreen="true"
                className="w-full h-full rounded aspect-video"
                loading="lazy"
              />
            )}
            <div className="px-2 py-1 bg-[#000000a1] text-white rounded mt-1">
              <div className="flex flex-wrap justify-between items-center">
                <div>Player: {url.nam}</div>
                <div className="text-end">
                  {url.asp} / {url.fea}
                </div>
                <div className="text-end">{url.tim}</div>
                <div className="text-end">{url.dat}</div>
              </div>
              <div className="flex flex-wrap justify-between items-center my-1">
                <div>
                  {sToA(url.cor).map((ite, index) => (
                    <div className="tooltip shrink-0">
                      <div className="tooltip-content bg-white text-black font-[Ubuntu] rounded-none">
                        <div className="text-[11px]">{ite}</div>
                      </div>
                      <img draggable={false} src={`/H2Boons/${ite}.png`} alt="Core Boon" className="size-7" />
                    </div>
                  ))}
                </div>
                {url.boon && (
                  <div className="flex items-center flex-wrap">
                    <div className="flex flex-wrap gap-0.5 rounded">
                      {findValue2(
                        sToA(url.boon).sort((a, b) => {
                          const aIndex = orderMap2.get(a) ?? Infinity;
                          const bIndex = orderMap2.get(b) ?? Infinity;
                          return aIndex - bIndex;
                        })
                      ).map((ite, index) => (
                        <div className="tooltip shrink-0">
                          <div className="tooltip-content bg-white text-black font-[Ubuntu] rounded-none">
                            <div className="text-[11px]">{boonCodex[ite]}</div>
                          </div>
                          <img draggable={false} src={`/P9/${ite}.png`} alt="Core Boon" className={`size-7`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {url.ks && (
                  <div className="flex gap-0.5 rounded">
                    {sToA(url.ks).map((ite, index) => (
                      <div className="tooltip shrink-0">
                        <div className="tooltip-content bg-white text-black font-[Ubuntu] rounded-none">
                          <div className="text-[11px]">{ite}</div>
                        </div>
                        <img draggable={false} src={`/buildgui/${ite}.png`} alt="Keepsake" className="size-6" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="my-4 bg-[#000000a1] rounded py-1">
            <div className="px-2 text-[14px] mb-2">Latest Gameplay Videos</div>
            {latest10videos.map((obj) => (
              <div
                className={`grid grid-cols-4 sm:grid-cols-5 items-center cursor-pointer px-2 hover:bg-[#00ffaaa1] ${
                  obj.src === url ? `bg-[#00ffaa] text-black` : ``
                }`}
                onClick={() => setURL(obj)}
              >
                <div>{obj.nam}</div>
                <div className="hidden sm:block">
                  <div className="flex gap-0.5 rounded">
                    {sToA(obj.cor).map((ite, index) => (
                      <div className="tooltip shrink-0">
                        <div className="tooltip-content bg-white text-black font-[Ubuntu] rounded-none">
                          <div className="text-[11px]">{ite}</div>
                        </div>
                        <img draggable={false} src={`/H2Boons/${ite}.png`} alt="Core Boon" className="size-6" />
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
