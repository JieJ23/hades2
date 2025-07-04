import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { p9data } from "../Data/P9Data";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sToA } from "../Data/Misc";
import { findValue, orderMap } from "../App";
import { p9boons } from "../Data/P9BoonObj";
import Background from "../Comp/Background";
import RaderP from "../Comp/RadarP";
import { findGUIcard } from "../App";
import { daysAgo, parseTimetoms } from "../Data/Misc";

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
                <div className="font-[monospace] text-[16px] text-[#f18043]">{target_aspect.length}/24</div>
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
            <div className="h-[400px]">
              <RaderP target={playerhistory} targetHistory={selectedPlayerData} />
            </div>
            <section className="p-1 text-[12px] overflow-hidden">
              {selectedPlayerData.map((obj, index) => (
                <div
                  className="flex items-center w-full rounded px-2 py-1 border-1 border-white/20 bg-black gap-2 relative mb-2"
                  key={index}
                >
                  <div className="hidden md:block">
                    <img
                      src={`/GUI_Card/c${findGUIcard(obj.asp)}.png`}
                      alt="Aspect"
                      className="w-[80px] rounded"
                      draggable={false}
                    />
                  </div>
                  <div className="w-full gap-2">
                    <div className="flex items-center justify-between">
                      <div className="text-[16px] font-[Cinzel] ps-2">{obj.nam}</div>
                      <div className="flex gap-2 text-[12px] font-[Cinzel]">
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
                    <div className="py-1 flex flex-wrap gap-1 text-[12px]">
                      <div className="flex items-center gap-1 bg-[#101122] border-1 border-white/20 rounded px-2 py-1">
                        <img
                          src={`/P9/${obj.asp}.png`}
                          alt="Aspect"
                          className="size-6 border-1 border-white/20 rounded-lg"
                          draggable={false}
                        />
                        <div>
                          <div>{obj.asp}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-[#101122] border-1 border-white/20 rounded px-2 py-1">
                        <img
                          src={`/P9/${obj.fam}.png`}
                          alt="Familiar"
                          className="size-6 border-1 border-white/20 rounded-lg"
                          draggable={false}
                        />
                        <div>
                          <div>{obj.fam}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-[#101122] text-white border-1 border-white/20 rounded px-2 py-1">
                        <img src={`/Misc/star.png`} alt="Top" className="size-4" draggable={false} />

                        <div>{daysAgo(obj.dat)}</div>
                      </div>
                      {obj.fea >= 60 && (
                        <div className="flex items-center gap-0.5 bg-[#922fd840] text-white border-1 border-[#922fd8] rounded p-1 pe-2">
                          <img src={`/Misc/Primordial.png`} alt="Speed" className="size-4" draggable={false} />

                          <div className="uppercase text-[10px]">Primordial</div>
                        </div>
                      )}
                      {obj.fea >= 50 && obj.fea < 60 && (
                        <div className="flex items-center gap-0.5 bg-[#d82f2f40] text-white border-1 border-[#d82f2f] rounded p-1 pe-2">
                          <img src={`/Misc/Titan.png`} alt="Speed" className="size-4" draggable={false} />

                          <div className="uppercase text-[10px]">Titan</div>
                        </div>
                      )}
                      {obj.fea >= 40 && obj.fea < 50 && (
                        <div className="flex items-center gap-0.5 bg-[#2f6ad840] text-white border-1 border-[#2f6ad8] rounded p-1 pe-2">
                          <img src={`/Misc/Demigod.png`} alt="Speed" className="size-4" draggable={false} />

                          <div className="uppercase text-[10px]">Demigod</div>
                        </div>
                      )}
                      {parseTimetoms(obj.tim) < 90000 && (
                        <div className="flex items-center bg-[#cdd82f30] text-white border-1 border-[#cdd82f] rounded p-1 pe-2">
                          <img src={`/Misc/speed.png`} alt="Speed" className="w-6 h-6" draggable={false} />

                          <div className="uppercase text-[10px]">Speed</div>
                        </div>
                      )}
                      {obj.src !== "" && (
                        <Link
                          className="flex items-center gap-1 bg-[white] text-black border-1 border-black rounded px-2 py-1"
                          to={obj.src}
                          target="_blank"
                        >
                          <img src={`/Misc/play.png`} alt="Play" className="size-4" draggable={false} />
                          <div>{`Video`}</div>
                        </Link>
                      )}
                    </div>
                    <div className="flex items-center flex-wrap py-1 gap-2 gap-y-1">
                      <div className="flex gap-0.5 p-2 rounded bg-[#101123]">
                        {sToA(obj.cor).map((ite, index) => (
                          <div className="tooltip shrink-0" key={index}>
                            <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                              <div className="text-[12px] font-[PT]">{ite}</div>
                            </div>
                            <img
                              draggable={false}
                              src={`/H2Boons/${ite}.png`}
                              alt="Core Boon"
                              className="size-7 md:size-8 border-1 border-white/20 rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                      {obj.ham && (
                        <div className="flex gap-0.5 p-2 rounded bg-[#101123]">
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
                                className="size-7 md:size-8 border-1 border-white/20 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {obj.mis && (
                        <div className="flex gap-0.5 p-2 rounded bg-[#101123]">
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
                                className="size-7 md:size-8 border-1 border-white/20 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {(obj.duo || obj.ele) && (
                        <div className="flex flex-wrap gap-0.5 p-2 rounded bg-[#101123]">
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
                                  className="size-7 md:size-8 border-1 border-white/20 rounded-lg"
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
                                  className="size-7 md:size-8 border-1 border-white/20 rounded-lg"
                                />
                              </div>
                            ))}
                        </div>
                      )}
                      {obj.cha && (
                        <div className="flex gap-0.5 p-2 rounded bg-[#101123]">
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
                                className="size-7 md:size-8 border-1 border-white/20 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-gray-400 z-20 px-2 text-[11px]">{obj.des}</div>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src={`/GUI_Card/c${findGUIcard(obj.asp)}.png`}
                      alt="Aspect"
                      className="w-[80px] rounded"
                      draggable={false}
                    />
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
