import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { p9data } from "../Data/P9Data";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sToA } from "../Data/Misc";
import { findGUIcard, findValue, orderMap } from "../App";
import { p9boons } from "../Data/P9BoonObj";
import Background from "../Comp/Background";
import RaderP from "../Comp/RadarP";
import { getYTid } from "../Data/Misc";

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
            <section className="p-2 pt-0 text-[11px] sm:text-[12px] overflow-hidden w-full max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 pb-4 gap-1 lg:gap-2">
              {selectedPlayerData.map((obj, index) => (
                <div className="w-full" key={index}>
                  {obj.ss ? (
                    <img
                      src={`/Misc/victory.webp`}
                      alt="Victory Screen"
                      className="rounded rounded-b-none border-white/20 border-1 w-full p-1"
                      draggable={false}
                    />
                  ) : (
                    <Link to={`${obj.src}`} target="_blank">
                      {obj.src.includes(`bilibil`) ? (
                        <img
                          src={`/Misc/bilibili.webp`}
                          alt="Video"
                          className="rounded rounded-b-none border-white/20 border-1 w-full p-1"
                          draggable={false}
                        />
                      ) : (
                        <img
                          src={`https://img.youtube.com/vi/${getYTid(obj.src)}/mqdefault.jpg`}
                          alt="Video"
                          className="rounded rounded-b-none border-white/20 border-1 w-full p-1"
                          draggable={false}
                          onError={(e) => {
                            e.currentTarget.onerror = null; // prevent infinite loop
                            e.currentTarget.src = "/Misc/bilibili.webp";
                          }}
                        />
                      )}
                    </Link>
                  )}
                  <div className="border-1 border-white/20 rounded rounded-t-none p-1 flex flex-col">
                    <section>
                      <div className="flex justify-between">
                        <div>
                          {obj.nam}
                          {obj.ss && ` (Victory Screen)`}
                        </div>
                        <div>{obj.loc}</div>
                      </div>
                    </section>
                    <section className="flex justify-between">
                      <div>
                        <span className="text-[#f18043] font-[monospace] text-[10px]">{obj.fea}</span>{" "}
                        <span className="text-[#00ffaa]">{obj.asp}</span>
                      </div>
                      <div className="font-[monospace] text-[10px]">{obj.tim}</div>
                    </section>
                    <section className="flex flex-col gap-1 lg:flex-row justify-between py-0.5">
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
                              className="size-5 md:size-6 border-1 border-white/20 rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                      {obj.ham && (
                        <div className="flex flex-col">
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
                                  className="size-5 md:size-6 border-1 border-white/20 rounded-md"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* {(obj.duo || obj.ele) && (
                        <div className="flex flex-col">
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
                                    className="size-6 border-1 border-white/20 rounded-md"
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
                                    className="size-6 border-1 border-white/20 rounded-md"
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                      {obj.mis && (
                        <div className="flex flex-col">
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
                                  className="size-6 border-1 border-white/20 rounded-md"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {obj.cha && (
                        <div className="flex flex-col">
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
                                  className="size-6 border-1 border-white/20 rounded-md"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )} */}
                    </section>
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
