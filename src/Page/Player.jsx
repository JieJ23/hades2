import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { p9data } from "../Data/P9Data";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sToA } from "../Data/Misc";
import { findGUIcard, findValue, orderMap } from "../App";
import { p9boons } from "../Data/P9BoonObj";
import Background from "../Comp/Background";

const defineAllPlayers = [...new Set(p9data.map((obj) => obj.nam))].sort();

export default function Player() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [playerhistory, setPlayerhistory] = useState(``);

  const filteredName = defineAllPlayers.filter((nam) => nam.toLowerCase().includes(query.toLowerCase()));

  const selectedPlayerData = p9data.filter((obj) => obj.nam == playerhistory);

  const target_aspect = [...new Set(selectedPlayerData.map((obj) => obj.asp))];
  const target_uw = selectedPlayerData.filter((obj) => obj.loc === `Underworld`);
  const target_surface = selectedPlayerData.filter((obj) => obj.loc === `Surface`);
  const target_fear = selectedPlayerData.reduce((total, sum) => total + +sum.fea, 0);

  return (
    <main className="relative">
      <Background />
      <Head />
      <div className="max-w-[1200px] font-[PT] text-[12px] md:text-[14px] mx-auto">
        <SideNav />
        <div className="px-2 relative flex gap-2 my-4 mb-2">
          <input
            type="text"
            placeholder="Search Player"
            className="input input-sm border-[#00ffaa] w-full max-w-[150px]"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 100)} // allow click
          />
          {isOpen && query.length >= 1 && (
            <ul className="absolute top-full left-0 w-full max-w-[150px] bg-[black] border-1 border-white/20 rounded ml-2 z-40 overflow-y-auto text-[12px]">
              {filteredName.length > 0 ? (
                filteredName.map((nam, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 hover:bg-base-200 cursor-pointer flex gap-1"
                    onMouseDown={() => {
                      setPlayerhistory(nam);
                      setQuery("");
                      setIsOpen(false);
                    }}
                  >
                    {nam}
                  </li>
                ))
              ) : (
                <li className="px-3 py-1 text-gray-500">No matches</li>
              )}
            </ul>
          )}
          <select
            value={`Player List`}
            className="select select-sm w-[150px] border-1 border-[#00ffaa]"
            onChange={(e) => {
              setPlayerhistory(e.target.value);
              setQuery("");
              setIsOpen(false);
            }}
            defaultValue="Player List"
          >
            <option disabled={true}>Player List</option>
            {defineAllPlayers.map((ite, index) => (
              <option value={ite} key={index}>
                {ite}
              </option>
            ))}
          </select>
        </div>
        {playerhistory && (
          <>
            <div className="text-[20px] font-[Cinzel] px-4">{playerhistory}'s History</div>
            <section className="p-2 grid grid-cols-4 md:grid-cols-6 gap-1 md:gap-2 font-[PT]">
              <div className="bg-black rounded border-1 border-white/20 text-[12px] flex flex-col p-3">
                <div className="line-clamp-1">Aspect Played</div>
                <div className="font-[monospace] text-[16px] text-[#f18043]">{target_aspect.length}</div>
              </div>
              <div className="bg-black rounded border-1 border-white/20 text-[12px] flex flex-col p-3">
                <div className="line-clamp-1">Underworld Runs</div>
                <div className="font-[monospace] text-[16px] text-[#f18043]">{target_uw.length}</div>
              </div>
              <div className="bg-black rounded border-1 border-white/20 text-[12px] flex flex-col p-3">
                <div className="line-clamp-1">Surface Runs</div>
                <div className="font-[monospace] text-[16px] text-[#f18043]">{target_surface.length}</div>
              </div>
              <div className="bg-black rounded border-1 border-white/20 text-[12px] flex flex-col p-3">
                <div className="line-clamp-1">Fear Amassed </div>
                <div className="font-[monospace] text-[16px] text-[#f18043]">{target_fear}</div>
              </div>
            </section>
            <section className="p-2 pt-0 text-[12px] overflow-hidden w-full max-w-[1200px] mx-auto">
              {selectedPlayerData.map((obj, index) => (
                <div
                  className="flex items-center w-full rounded bg-black/90 px-2 py-1 border-1 border-white/20 gap-2 mb-3 relative"
                  key={index}
                >
                  <div className={`absolute w-full h-full top-0 left-0 opacity-15 lg:opacity-25`}>
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
                    <div className="col-span-3 md:col-span-6 lg:col-span-8 flex items-center justify-between border-b-1 border-white/10">
                      <div className="text-[16px] font-[Cinzel]">{obj.nam}</div>
                      <div className="flex gap-2 text-[14px] font-[Cinzel]">
                        <div className="flex items-center gap-1 font-[PT]">
                          <img src={`/${obj.loc}.png`} alt="Region" className="size-5" draggable={false} />
                          {obj.fea}
                        </div>
                        <div className="flex items-center gap-1 font-[PT]">
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
                      {obj.ham && (
                        <div className="flex flex-col">
                          <div className="font-[Cinzel]">Hammer</div>
                          <div className="flex gap-0.5">
                            {findValue(
                              sToA(obj.ham).sort((a, b) => {
                                const aIndex = orderMap.get(a) ?? Infinity;
                                const bIndex = orderMap.get(b) ?? Infinity;
                                return aIndex - bIndex;
                              })
                            ).map((ite, index) => (
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
                      {(obj.duo || obj.ele) && (
                        <div className="flex flex-col">
                          <div className="font-[Cinzel]">Duo & Infusion</div>
                          <div className="flex flex-wrap gap-0.5">
                            {obj.duo &&
                              findValue(
                                sToA(obj.duo).sort((a, b) => {
                                  const aIndex = orderMap.get(a) ?? Infinity;
                                  const bIndex = orderMap.get(b) ?? Infinity;
                                  return aIndex - bIndex;
                                })
                              ).map((ite, index) => (
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
                            {findValue(
                              sToA(obj.mis).sort((a, b) => {
                                const aIndex = orderMap.get(a) ?? Infinity;
                                const bIndex = orderMap.get(b) ?? Infinity;
                                return aIndex - bIndex;
                              })
                            ).map((ite, index) => (
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
                            {findValue(
                              sToA(obj.cha).sort((a, b) => {
                                const aIndex = orderMap.get(a) ?? Infinity;
                                const bIndex = orderMap.get(b) ?? Infinity;
                                return aIndex - bIndex;
                              })
                            ).map((ite, index) => (
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
                    <div className="col-span-3 md:col-span-6 lg:col-span-8 text-gray-300 pt-1 z-20">
                      <div>{obj.des}</div>
                      {obj.ss ? (
                        <div className="text-[#10e410]">Discord ID: #{obj.ss}</div>
                      ) : (
                        <Link to={obj.src} target="_blank" className="text-[#109de4] line-clamp-1">
                          {obj.src}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
