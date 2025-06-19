import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { h2Data } from "../Data/H2Data";
import { sToA } from "../Data/Misc";
import { Link } from "react-router-dom";
import { useState } from "react";
import { h2AspectOrder } from "../Data/Misc";

export function getYTid(text) {
  return text.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
}
const highfear = h2Data
  .filter((obj) => obj.f >= 51)
  .sort((a, b) => (a.t > b.t ? 1 : -1))
  .sort((a, b) => (a.f > b.f ? -1 : 1));
const rankingPlayer = [...new Set(highfear.map((item) => item.n))];
const rankingAspect = [...new Set(highfear.map((item) => item.a))];

const availableRegion = [`Underworld`, `Surface`];

export default function Patch8() {
  const [region, setRegion] = useState(`All`);
  const [category, setCategory] = useState(`All`);

  const highfear_region = region === `All` ? highfear : highfear.filter((obj) => obj.l === region);

  const availableAspects =
    region === `All`
      ? [...new Set(highfear.map((obj) => obj.a))].sort((a, b) =>
          h2AspectOrder.indexOf(a) > h2AspectOrder.indexOf(b) ? 1 : -1
        )
      : [...new Set(highfear_region.map((obj) => obj.a))].sort((a, b) =>
          h2AspectOrder.indexOf(a) > h2AspectOrder.indexOf(b) ? 1 : -1
        );

  const displayEntries = category === `All` ? highfear_region : highfear_region.filter((obj) => obj.a === category);

  return (
    <main className="h-full min-h-lvh select-none relative">
      <div className="fixed w-full h-full bg-[url('/mbg2.webp')] -z-10 bg-left lg:bg-center bg-cover opacity-20"></div>
      <div className="fixed w-full h-full bg-[url('/mbg3.webp')] -z-10 bg-center bg-cover opacity-40"></div>
      <Head />
      <div className="max-w-[1400px] font-[PT] text-[14px] mx-auto">
        <SideNav />
        <section className="w-full p-2">
          <div className="text-[16px] p-2 py-0 font-[Cinzel]">Highest Fear Ladder - Patch 8</div>
          <div className="text-[12px] px-2 py-1 flex gap-2">
            <select
              value={region}
              className="select select-sm w-[150px] border-[#f05bdc]"
              onChange={(e) => {
                setRegion(e.target.value);
                setCategory(`All`);
              }}
            >
              <option value={`All`}>All</option>
              {availableRegion.map((ite, index) => (
                <option value={ite} key={index}>
                  {ite}
                </option>
              ))}
            </select>
            <select
              value={category}
              className="select select-sm w-[150px] border-[#00ffaa]"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={`All`}>All</option>
              {availableAspects.map((ite, index) => (
                <option value={ite} key={index}>
                  {ite}
                </option>
              ))}
            </select>
          </div>
          <div className="text-[12px] p-1 pt-0 flex gap-2">
            <div>Query:</div>
            <div className="text-[#f05bdc]">Region [ {region} ]</div>
            <div className="text-[#00ffaa]">Aspect [ {category} ]</div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="col-span-1 p-2 border-1 border-[#00ffaa] rounded bg-black/85 text-[12px]">
              <div>
                <div className="font-[Cinzel] border-b border-[#00ffaa] mb-2">Top 10 Players</div>
                <div className="grid grid-cols-2 gap-1">
                  {rankingPlayer.slice(0, 10).map((item, index) => (
                    <div key={index}>
                      {index + 1}. {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-1 p-2 border-1 border-[#00ffaa] rounded bg-black/85 text-[12px]">
              <div>
                <div className="font-[Cinzel] border-b border-[#00ffaa] mb-2">Top 10 Aspects</div>
                <div className="grid grid-cols-2 gap-1">
                  {rankingAspect.slice(0, 10).map((item, index) => (
                    <div key={index}>
                      {index + 1}. {item.includes(`Melinoe`) ? item.replace(`Melinoe `, ``) : item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {displayEntries.map((item, index) => (
              <div
                key={index}
                className="w-full rounded border-1 border-white/20 col-span-2 font-[PT] text-[12px] text-gray-300 relative overflow-hidden bg-black/80"
              >
                <div>
                  <div className="flex items-center bg-black justify-between border-b-1 border-white/20 mb-1 px-2 pt-2 pb-1">
                    <div className="text-white">
                      #{index + 1}. {item.n}
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={`/${item.l}.png`} alt="Region" className="w-5" />
                      {item.l} - P{item.p}
                    </div>
                  </div>
                  <div className="relative px-2 pb-2">
                    <div className={`absolute w-full h-full top-0 left-0 -z-10 opacity-60`}>
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
                    <div className="w-full text-[orange] pb-1 line-clamp-2 lg:line-clamp-1">
                      <div>{item.des && item.des}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 relative">
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
                          <div className="w-[55px]">Fam:</div>
                          <img
                            src={`/H2Boons/${item.fam}.png`}
                            alt="Familiar"
                            className="size-7 border-1 border-white/20 rounded-md me-1"
                          />
                          <div>{item.fam}</div>
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
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
