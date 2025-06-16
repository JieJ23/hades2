import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { h2Data } from "../Data/H2Data";
import { sToA } from "./Hades2";
import { Link } from "react-router-dom";

export function getYTid(text) {
  return text.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
}

export default function Ladder() {
  const fear55 = h2Data.filter((obj) => obj.f == 55).sort((a, b) => (a.t > b.t ? 1 : -1));
  const rankingPlayer = [...new Set(fear55.map((item) => item.n))];
  const rankingAspect = [...new Set(fear55.map((item) => item.a))];
  return (
    <main className="h-full min-h-lvh select-none relative">
      <div className="fixed w-full h-full bg-[url('/mbg.webp')] -z-10 bg-top"></div>
      <Head />
      <div className="flex flex-col lg:flex-row gap-1 max-w-[1400px] font-[PT] text-[14px] mx-auto">
        <SideNav />
        <section className="w-full px-2 py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="col-span-1 p-2 border-1 border-white/20 rounded-lg bg-black/85 text-[12px]">
              <div>
                <div className="font-[Cinzel] border-b border-white/20 mb-2">Ranking Player</div>
                <div className="grid grid-cols-2 gap-1">
                  {rankingPlayer.map((item, index) => (
                    <div key={index}>
                      {index + 1}. {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-1 p-2 border-1 border-white/20 rounded-lg bg-black/85 text-[12px]">
              <div>
                <div className="font-[Cinzel] border-b border-white/20 mb-2">Ranking Aspect</div>
                <div className="grid grid-cols-2 gap-1">
                  {rankingAspect.map((item, index) => (
                    <div key={index}>
                      {index + 1}. {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {fear55.map((item, index) => (
              <div
                key={index}
                className="w-full rounded-lg border-1 border-white/20 p-2 col-span-2 font-[PT] text-[12px] text-gray-300 relative overflow-hidden bg-black/85"
              >
                <div className={`absolute w-full h-full top-0 left-0 -z-10 opacity-50`}>
                  <img
                    src={
                      item.src.includes(`bilibili`) && item.l === `Underworld`
                        ? `/Underworld2.webp`
                        : item.src.includes(`bilibili`) && item.l === `Surface`
                        ? `/Surface2.webp`
                        : `https://img.youtube.com/vi/${getYTid(item.src)}/mqdefault.jpg`
                    }
                    alt="Video"
                    className="border-1 border-white/20 w-full h-full object-cover object-center"
                    draggable={false}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between border-b-1 border-white/20 mb-1 pb-1">
                    <div className="font-[Cinzel] text-white">
                      #{index + 1}. {item.n}
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={`/${item.l}.png`} alt="Region" className="w-5" />
                      {item.l} - P{item.p}
                    </div>
                  </div>
                  <div className="w-full text-[orange] pb-1 line-clamp-2 lg:line-clamp-1">
                    <div>{item.des && item.des}</div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1">
                    <div className="w-full flex flex-col gap-0.5">
                      <div className="flex items-center">
                        <div className="w-[55px]">Core:</div>
                        <div className="flex gap-0.5 min-h-[28px]">
                          {sToA(item.boon).map((ite, index) => (
                            <div className="tooltip shrink-0" key={index}>
                              <div className="tooltip-content">
                                <div className="text-[12px] font-[PT]">{ite}</div>
                              </div>
                              <img
                                draggable={false}
                                src={`/H2Boons/${ite}.png`}
                                alt="Core Boon"
                                className="size-7 border-1 border-white/20 rounded-md"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[55px]">Hammer:</div>
                        <div className="flex gap-0.5 min-h-[28px]">
                          {item.h &&
                            sToA(item.h)
                              .sort()
                              .map((ite, index) => (
                                <div className="tooltip shrink-0" key={index}>
                                  <div className="tooltip-content">
                                    <div className="text-[12px] font-[PT]">{ite}</div>
                                  </div>
                                  <img
                                    draggable={false}
                                    src={`/Hammer/${ite}.png`}
                                    alt="Hammer Boon"
                                    className="size-7 border-1 border-white/20 rounded-md"
                                  />
                                </div>
                              ))}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[55px]">Duo:</div>
                        <div className="flex gap-0.5 min-h-[28px]">
                          {item.duo &&
                            sToA(item.duo)
                              .sort()
                              .map((ite, index) => (
                                <div className="tooltip shrink-0" key={index}>
                                  <div className="tooltip-content">
                                    <div className="text-[12px] font-[PT]">{ite}</div>
                                  </div>
                                  <img
                                    draggable={false}
                                    src={`/buildgui/${ite}.png`}
                                    alt="Duo Boon"
                                    className="size-7 border-1 border-white/20 rounded-md"
                                  />
                                </div>
                              ))}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[55px]">Misc:</div>
                        <div className="flex gap-0.5 min-h-[28px]">
                          {item.m &&
                            sToA(item.m)
                              .sort()
                              .map((ite, index) => (
                                <div className="tooltip shrink-0" key={index}>
                                  <div className="tooltip-content">
                                    <div className="text-[12px] font-[PT]">{ite}</div>
                                  </div>
                                  <img
                                    draggable={false}
                                    src={`/buildgui/${ite}.png`}
                                    alt="Misc Boon"
                                    className="size-7 border-1 border-white/20 rounded-md"
                                  />
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-0.5">
                      <div className="flex items-center">
                        <div className="w-[55px]">Aspect:</div>
                        <img
                          src={`/H2Boons/${item.a}.png`}
                          alt="Aspect"
                          className="size-7 border-1 border-white/20 rounded-md me-1"
                        />
                        <div>{item.a}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[55px]">Time:</div>
                        <div>{item.t}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[55px]">Fear:</div>
                        <div>{item.f}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[55px]">Video:</div>
                        <div className="line-clamp-1">
                          <Link to={item.src} target="_blank" className="text-[#408fe4]">
                            {item.src}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
