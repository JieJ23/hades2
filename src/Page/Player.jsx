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
        <div className="px-2 relative flex gap-1 my-4 mb-2">
          <input
            type="text"
            placeholder="Search Player"
            className="input input-sm border-[#00ffaa] w-full max-w-[150px] focus:outline-0 rounded"
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
            className="select select-sm w-[150px] border-1 border-[#00ffaa] focus:outline-0 rounded"
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
                  className="flex items-center w-full rounded px-2 py-1 bg-[#000000b5] gap-2 relative mb-4"
                  key={index}
                >
                  <div
                    className={`absolute top-0 left-0 h-full w-[4px] md:w-[6px] ${
                      obj.loc === `Underworld` ? `bg-[#00ffaa]` : `bg-[#fff200]`
                    } rounded-l`}
                  />
                  <div className="w-full gap-2 ps-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[15px] font-[Cinzel] ps-2">{obj.nam}</div>
                      <div className="flex gap-2 font-[Cinzel]">
                        <div className="flex items-center gap-1 font-[Source]">
                          <img src={`/${obj.loc}.png`} alt="Region" className="size-5" draggable={false} />
                          {obj.fea}
                        </div>
                        <div className="flex items-center gap-1 font-[Source]">
                          <img src={`/Misc/Time.png`} alt="Time" className="size-5" draggable={false} />
                          {obj.tim}
                        </div>
                      </div>
                    </div>
                    <div className="py-1 flex flex-wrap gap-1 text-[12px]">
                      <div className="flex items-center gap-1 bg-[#101122] border-1 border-black rounded px-2 py-1">
                        <img src={`/P9/${obj.asp}.png`} alt="Aspect" className="size-6" draggable={false} />
                        <div>
                          <div>{obj.asp}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-[#101122] border-1 border-black rounded px-2 py-1">
                        <img src={`/P9/${obj.fam}.png`} alt="Familiar" className="size-6 " draggable={false} />
                        <div>
                          <div>{obj.fam}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 bg-[#101122] text-white border-1 border-black rounded p-1">
                        <img src={`/Misc/star.png`} alt="Top" className="size-4" draggable={false} />
                        <div>{daysAgo(obj.dat)}</div>
                      </div>
                      {obj.src !== "" && (
                        <Link
                          className="flex items-center gap-1 bg-[#101122] border-1 border-black rounded px-2 py-1"
                          to={obj.src}
                          target="_blank"
                        >
                          <img src={`/Misc/play.png`} alt="Play" className="size-4" draggable={false} />
                          <div>{`Video`}</div>
                        </Link>
                      )}
                      {obj.fea == 67 && (
                        <div className="flex justify-center items-center bg-[#101122] rounded px-1 border-1 border-yellow-200">
                          <img src={`/Misc/lighting.gif`} alt="Max" className="size-4" draggable={false} />
                          <img src={`/Misc/lighting.gif`} alt="Max" className="size-4" draggable={false} />
                          <div className="uppercase text-yellow-200 px-1">Max Fear</div>
                          <img src={`/Misc/lighting.gif`} alt="Max" className="size-4" draggable={false} />
                          <img src={`/Misc/lighting.gif`} alt="Max" className="size-4" draggable={false} />
                        </div>
                      )}
                      {obj.fea >= 60 && obj.fea < 67 && (
                        <div className="flex justify-center items-center bg-[#101122] rounded gap-1">
                          <img src={`/Misc/firepink.gif`} alt="Fire Pink" className="size-5" draggable={false} />
                          <div className="uppercase text-pink-300 pe-2">+60</div>
                        </div>
                      )}
                      {obj.fea >= 50 && obj.fea < 60 && (
                        <div className="flex justify-center items-center bg-[#101122] rounded gap-1">
                          <img src={`/Misc/firered.gif`} alt="Fire Red" className="size-5" draggable={false} />
                          <div className="uppercase pe-2 text-orange-400">+50</div>
                        </div>
                      )}
                      {/* {parseTimetoms(obj.tim) < 90000 && (
                    <div className="flex justify-center items-center bg-[#101122] rounded w-[32px]">
                      <img src={`/Misc/speed.gif`} alt="Speed" className="size-6" draggable={false} />
                    </div>
                  )} */}
                    </div>
                    <div className="flex items-center flex-wrap py-1 gap-2 gap-y-1">
                      <div className="flex gap-0.5 p-2 rounded bg-[#101122]">
                        {sToA(obj.cor).map((ite, index) => (
                          <div className="tooltip shrink-0" key={index}>
                            <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                              <div className="font-[Source] text-[12px]">{ite}</div>
                            </div>
                            <img
                              draggable={false}
                              src={`/H2Boons/${ite}.png`}
                              alt="Core Boon"
                              className="size-7 border-1 border-white/20 rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                      {obj.ham && (
                        <div className="flex gap-0.5 p-2 rounded bg-[#101122]">
                          {findValue(
                            sToA(obj.ham).sort((a, b) => {
                              const aIndex = orderMap.get(a) ?? Infinity;
                              const bIndex = orderMap.get(b) ?? Infinity;
                              return aIndex - bIndex;
                            })
                          ).map((ite, index) => (
                            <div className="tooltip shrink-0" key={index}>
                              <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                                <div className="font-[Source] text-[12px]">{p9boons[ite]}</div>
                              </div>
                              <img
                                draggable={false}
                                src={`/P9/${ite}.png`}
                                alt="Core Boon"
                                className="size-7 border-1 border-white/20 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {obj.mis && (
                        <div className="flex gap-0.5 p-2 rounded bg-[#101122]">
                          {findValue(
                            sToA(obj.mis).sort((a, b) => {
                              const aIndex = orderMap.get(a) ?? Infinity;
                              const bIndex = orderMap.get(b) ?? Infinity;
                              return aIndex - bIndex;
                            })
                          ).map((ite, index) => (
                            <div className="tooltip shrink-0" key={index}>
                              <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                                <div className="font-[Source] text-[12px]">{p9boons[ite]}</div>
                              </div>
                              <img
                                draggable={false}
                                src={`/P9/${ite}.png`}
                                alt="Core Boon"
                                className="size-7 border-1 border-white/20 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {(obj.duo || obj.ele) && (
                        <div className="flex flex-wrap gap-0.5 p-2 rounded bg-[#101122]">
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
                                  <div className="font-[Source] text-[12px]">{p9boons[ite]}</div>
                                </div>
                                <img
                                  draggable={false}
                                  src={`/P9/${ite}.png`}
                                  alt="Core Boon"
                                  className="size-7 border-1 border-white/20 rounded-lg"
                                />
                              </div>
                            ))}
                          {obj.ele &&
                            findValue(sToA(obj.ele)).map((ite, index) => (
                              <div className="tooltip shrink-0" key={index}>
                                <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                                  <div className="font-[Source] text-[12px]">{p9boons[ite]}</div>
                                </div>
                                <img
                                  draggable={false}
                                  src={`/P9/${ite}.png`}
                                  alt="Core Boon"
                                  className="size-7 border-1 border-white/20 rounded-lg"
                                />
                              </div>
                            ))}
                        </div>
                      )}
                      {obj.cha && (
                        <div className="flex gap-0.5 p-2 rounded bg-[#101122]">
                          {findValue(
                            sToA(obj.cha).sort((a, b) => {
                              const aIndex = orderMap.get(a) ?? Infinity;
                              const bIndex = orderMap.get(b) ?? Infinity;
                              return aIndex - bIndex;
                            })
                          ).map((ite, index) => (
                            <div className="tooltip shrink-0" key={index}>
                              <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                                <div className="font-[Source] text-[12px]">{p9boons[ite]}</div>
                              </div>
                              <img
                                draggable={false}
                                src={`/P9/${ite}.png`}
                                alt="Core Boon"
                                className="size-7 border-1 border-white/20 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {obj.ks && (
                        <div className="flex gap-0.5 p-2 rounded bg-[#101122]">
                          {sToA(obj.ks).map((ite, index) => (
                            <div className="tooltip shrink-0" key={index}>
                              <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                                <div className="font-[Source] text-[12px]">{ite}</div>
                              </div>
                              <img draggable={false} src={`/buildgui/${ite}.png`} alt="Keepsake" className="size-7" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-gray-300 z-20 px-2">{obj.des}</div>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src={`/GUI_Card/c${findGUIcard(obj.asp)}.png`}
                      alt="Aspect"
                      className="w-[80px] rounded"
                      draggable={false}
                    />
                  </div>
                  <div className="hidden md:block">
                    <img
                      src={`/GUI_Card/${obj.fam}.png`}
                      alt="Familiar"
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
