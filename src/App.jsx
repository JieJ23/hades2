import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";
import { sToA } from "./Data/Misc";
import { Link } from "react-router-dom";
import { useState } from "react";
import { h2AspectOrder } from "./Data/Misc";
import { p9data } from "./Data/P9Data";
import { p9boons_reverse, p9boons } from "./Data/P9BoonObj";

const findGUIcard = (asp) => {
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

const findValue = (arr) => {
  const finalized = arr.map((ite) => p9boons_reverse[ite]);
  return finalized;
};

export function getYTid(text) {
  return text.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
}
const highfear = p9data.sort((a, b) => (a.tim > b.tim ? 1 : -1)).sort((a, b) => (+a.fea > +b.fea ? -1 : 1));
// const rankingPlayer = [...new Set(highfear.map((item) => item.n))];
// const rankingAspect = [...new Set(highfear.map((item) => item.a))];

const availableRegion = [`Underworld`, `Surface`];

export default function App() {
  const [region, setRegion] = useState(`All`);
  const [category, setCategory] = useState(`All`);

  const highfear_region = region === `All` ? highfear : highfear.filter((obj) => obj.loc === region);

  const availableAspects =
    region === `All`
      ? [...new Set(highfear.map((obj) => obj.asp))].sort((a, b) =>
          h2AspectOrder.indexOf(a) > h2AspectOrder.indexOf(b) ? 1 : -1
        )
      : [...new Set(highfear_region.map((obj) => obj.asp))].sort((a, b) =>
          h2AspectOrder.indexOf(a) > h2AspectOrder.indexOf(b) ? 1 : -1
        );

  const displayEntries = category === `All` ? highfear_region : highfear_region.filter((obj) => obj.asp === category);

  return (
    <main className="h-full min-h-lvh relative">
      <div className="fixed w-full h-full bg-[url('/mbg2.webp')] -z-10 bg-left lg:bg-center bg-cover opacity-20"></div>
      <Head />
      <div className="max-w-[1200px] font-[PT] text-[14px] mx-auto">
        <SideNav />
        <section className="w-full px-2">
          <div className="text-[16px] p-2 py-0 font-[Cinzel]">Highest Fear Ladder - Patch 9</div>
          <div className="text-[12px] px-2 py-1 flex gap-2">
            <select
              value={region}
              className="select select-sm w-[100px] border-1 border-[#f05bdc]"
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
              className="select select-sm w-[100px] border-1 border-[#00ffaa]"
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
          <div className="text-[12px] px-1 flex gap-2">
            <div>Query:</div>
            <div className="text-[#f05bdc] backdrop-blur-lg">Region [ {region} ]</div>
            <div className="text-[#00ffaa] backdrop-blur-lg">Aspect [ {category} ]</div>
          </div>
          <div className="text-[12px] p-1 flex gap-2">
            <div>Category Leader: </div>
            <div className="text-[#ffb700] backdrop-blur-lg">{displayEntries[0].nam}</div>
          </div>
        </section>
        <section className="px-2 pb-8 text-[12px]">
          {displayEntries.map((obj, index) => (
            <div
              className="flex items-center w-full rounded-lg bg-black/90 px-2 py-1 border-1 border-white/40 gap-2 mb-4 relative"
              key={index}
            >
              <div className={`absolute w-full h-full top-0 left-0 opacity-15 lg:opacity-40`}>
                <img
                  src={`/FamPort/${obj.fam}bg.png`}
                  alt="Fam"
                  className="w-full h-full object-contain object-right"
                  draggable={false}
                />
              </div>
              <div className="hidden md:block">
                <img
                  src={`/GUI_Card/c${findGUIcard(obj.asp)}.png`}
                  alt="Aspect"
                  className="w-[80px] rounded"
                  draggable={false}
                />
              </div>
              <div className="w-full grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
                <div className="col-span-3 md:col-span-6 lg:col-span-8 flex items-center justify-between border-b-1 border-white/20">
                  <div className="text-[16px] font-[Cinzel]">{obj.nam}</div>
                  <div className="flex gap-2 text-[14px] font-[Cinzel]">
                    <div className="flex items-center gap-1">
                      <img src={`/${obj.loc}.png`} alt="Region" className="size-5" draggable={false} />
                      {obj.fea}
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={`/Misc/Time.png`} alt="Time" className="size-5" draggable={false} />
                      {obj.tim}
                    </div>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-6 lg:col-span-8 flex gap-4">
                  <div className="flex flex-col">
                    <div>
                      <div className="font-[Cinzel]">{obj.asp}</div>
                    </div>
                    <img
                      src={`/P9/${obj.asp}.png`}
                      alt="Aspect"
                      className="size-8 border-1 border-white/20 rounded-lg"
                      draggable={false}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <div className="font-[Cinzel]">{obj.fam}</div>
                    </div>
                    <img
                      src={`/P9/${obj.fam}.png`}
                      alt="Familiar"
                      className="size-8 border-1 border-white/20 rounded-lg"
                      draggable={false}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <div className="font-[Cinzel]">Region</div>
                    </div>
                    <div className="tooltip shrink-0">
                      <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                        <div className="text-[12px] font-[PT]">{obj.loc}</div>
                      </div>
                      <img src={`/${obj.loc}.png`} alt="Region" className="size-8" draggable={false} />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div>
                      <div className="font-[Cinzel]">{obj.sel === "f" ? `No` : `Yes`}</div>
                    </div>
                    <img src={`/Misc/Selene.png`} alt="Selene" className="size-8" draggable={false} />
                  </div>
                </div>
                <div className="col-span-3 md:col-span-6 lg:col-span-8 gap-y-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  <div className="flex flex-col">
                    <div className="font-[Cinzel]">Core</div>
                    <div className="flex gap-0.5">
                      {sToA(obj.cor).map((ite, index) => (
                        <div className="tooltip shrink-0" key={index}>
                          <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
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
                  <div className="flex flex-col">
                    <div className="font-[Cinzel]">Hammer</div>
                    <div className="flex gap-0.5">
                      {findValue(sToA(obj.ham)).map((ite, index) => (
                        <div className="tooltip shrink-0" key={index}>
                          <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                            <div className="text-[12px] font-[PT]">{p9boons[ite]}</div>
                          </div>
                          <img
                            draggable={false}
                            src={`/P9/${ite}.png`}
                            alt="Core Boon"
                            className="size-7 border-1 border-white/20 rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {(obj.duo || obj.ele) && (
                    <div className="flex flex-col">
                      <div className="font-[Cinzel]">Duo & Infusion</div>
                      <div className="flex gap-0.5">
                        {obj.duo &&
                          findValue(sToA(obj.duo)).map((ite, index) => (
                            <div className="tooltip shrink-0" key={index}>
                              <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                                <div className="text-[12px] font-[PT]">{p9boons[ite]}</div>
                              </div>
                              <img
                                draggable={false}
                                src={`/P9/${ite}.png`}
                                alt="Core Boon"
                                className="size-7 border-1 border-white/20 rounded-md"
                              />
                            </div>
                          ))}
                        {obj.ele &&
                          findValue(sToA(obj.ele)).map((ite, index) => (
                            <div className="tooltip shrink-0" key={index}>
                              <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                                <div className="text-[12px] font-[PT]">{p9boons[ite]}</div>
                              </div>
                              <img
                                draggable={false}
                                src={`/P9/${ite}.png`}
                                alt="Core Boon"
                                className="size-7 border-1 border-white/20 rounded-md"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  {obj.mis && (
                    <div className="flex flex-col">
                      <div className="font-[Cinzel]">Misc</div>
                      <div className="flex gap-0.5">
                        {findValue(sToA(obj.mis)).map((ite, index) => (
                          <div className="tooltip shrink-0" key={index}>
                            <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                              <div className="text-[12px] font-[PT]">{p9boons[ite]}</div>
                            </div>
                            <img
                              draggable={false}
                              src={`/P9/${ite}.png`}
                              alt="Core Boon"
                              className="size-7 border-1 border-white/20 rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {obj.cha && (
                    <div className="flex flex-col">
                      <div className="font-[Cinzel]">Chaos/S</div>
                      <div className="flex gap-0.5">
                        {findValue(sToA(obj.cha)).map((ite, index) => (
                          <div className="tooltip shrink-0" key={index}>
                            <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                              <div className="text-[12px] font-[PT]">{p9boons[ite]}</div>
                            </div>
                            <img
                              draggable={false}
                              src={`/P9/${ite}.png`}
                              alt="Core Boon"
                              className="size-7 border-1 border-white/20 rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-span-3 md:col-span-6 lg:col-span-8 text-[orange] z-40 border-t-1 border-white/20 pt-1">
                  <div>{obj.des}</div>
                  <Link to={obj.src} target="_blank" className="text-[#298af2] line-clamp-1">
                    {obj.src}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
