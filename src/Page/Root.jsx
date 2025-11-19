import Background from "../Comp/Background";
import SideNav from "../Comp/Sidebar";

import { p9data } from "../Data/P9Data";
import { p11data } from "../Data/P11Data";
import { v1data } from "../Data/V1data";

import { h2AspectOrder, parseTimetoms, sToA, findValue, orderMap, getStatusColor, findStatus } from "../Data/Misc";
import { p9boons } from "../Data/P9BoonObj";
import { Link } from "react-router-dom";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";
import { useState } from "react";

export default function Root() {
  const { posts, loader } = useData();
  const [type, setType] = useState(`Fear`);
  const [region, setRegion] = useState(`All Region`);
  const [video, setVideo] = useState(false);
  const [bili, setBili] = useState(false);
  const [arc, setArc] = useState(null);
  const [fea, setFea] = useState(null);
  const [unique, setUnique] = useState(true);

  const bundle = [...p9data, ...p11data, ...v1data, ...(posts || [])];

  const fullAspectData = [];

  for (let i = 0; i < h2AspectOrder.length; i++) {
    const aspectArray = bundle.filter((obj) => {
      const videoCheck = video ? obj.src && obj.src !== "" : true;
      const biliCheck = bili ? !obj.src.includes("bili") : true;
      const aspectCheck = obj.asp === h2AspectOrder[i];
      const regionCheck = region === "All Region" ? true : obj.loc === region;
      const arcanaCheck = arc !== null && arc !== "" ? obj.arcana === arc : true;
      const oathCheck = fea !== null && fea !== "" ? obj.oath === fea : true;
      return videoCheck && aspectCheck && regionCheck && biliCheck && arcanaCheck && oathCheck;
    });
    let orderedArray = aspectArray.sort((a, b) => {
      if (type === `Fear`) {
        const feaDiff = +b.fea - +a.fea;
        if (feaDiff !== 0) return feaDiff;
        return parseTimetoms(a.tim) - parseTimetoms(b.tim);
      } else {
        return new Date(b.dat) - new Date(a.dat);
      }
    });
    if (unique) {
      const seen = {};
      orderedArray = orderedArray
        .filter((item) => {
          if (seen[item.nam]) return false;
          seen[item.nam] = true;
          return true;
        })
        .slice(0, 15);
    } else {
      orderedArray = orderedArray.slice(0, 20);
    }
    fullAspectData.push(orderedArray);
  }
  return (
    <main className="relative font-[Source] text-[12px] text-gray-300 select-none">
      <Background />
      <div>
        {loader ? (
          <Loading />
        ) : (
          <div className="flex gap-2 overflow-x-scroll w-full min-h-screen relative p-2" id="scroll-container">
            <div
              className="fixed cursor-pointer bottom-5 right-2 bg-[white] w-8 h-8 text-black text-[20px] flex justify-center items-center rounded z-40"
              onClick={() => {
                const el = document.getElementById("scroll-container");
                el.scrollTo({ left: 0, behavior: "smooth" });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {"<"}
            </div>
            <div className="w-full min-w-[120px] font-[Ale]">
              <div className="bg-[black] text-white text-center text-[12px] font-[Ale] rounded">Setting</div>
              <div
                className={`p-1 cursor-pointer my-0.5 border-1 border-white/10 rounded-none text-center ${
                  type === `Fear` ? `bg-[#00ffaa] text-black` : `bg-[#131111] text-white`
                }`}
                onClick={() => setType(`Fear`)}
              >
                Fear
              </div>
              <div
                className={`p-1 cursor-pointer my-0.5 border-1 border-white/10 rounded-none text-center ${
                  type === `Latest` ? `bg-[#00ffaa] text-black` : `bg-[#131111] text-white`
                }`}
                onClick={() => setType(`Latest`)}
              >
                Latest
              </div>
              <div
                className={`p-1 cursor-pointer my-0.5 border-1 border-white/10 rounded-none text-center ${
                  region === `All Region` ? `bg-[#00ffaa] text-black` : `bg-[#131111] text-white`
                }`}
                onClick={() => setRegion(`All Region`)}
              >
                All Region
              </div>
              <div
                className={`p-1 cursor-pointer my-0.5 border-1 border-white/10 rounded-none text-center ${
                  region === `Underworld` ? `bg-[#00ffaa] text-black` : `bg-[#131111] text-white`
                }`}
                onClick={() => setRegion(`Underworld`)}
              >
                Underworld
              </div>
              <div
                className={`p-1 cursor-pointer my-0.5 border-1 border-white/10 rounded-none text-center ${
                  region === `Surface` ? `bg-[#00ffaa] text-black` : `bg-[#131111] text-white`
                }`}
                onClick={() => setRegion(`Surface`)}
              >
                Surface
              </div>
              <div
                className={`p-1 cursor-pointer my-0.5 border-1 border-white/10 rounded-none text-center ${
                  unique === true ? `bg-[#00ffaa] text-black` : `bg-[#131111] text-white`
                }`}
                onClick={() => setUnique(!unique)}
              >
                PB Unique
              </div>
              <div
                className={`p-1 cursor-pointer my-0.5 border-1 border-white/10 rounded-none text-center ${
                  video === true ? `bg-[#00ffaa] text-black` : `bg-[#131111] text-white`
                }`}
                onClick={() => setVideo(!video)}
              >
                Has Video
              </div>
              <div
                className={`p-1 cursor-pointer my-0.5 border-1 border-white/10 rounded-none text-center ${
                  bili === true ? `bg-[#00ffaa] text-black` : `bg-[#131111] text-white`
                }`}
                onClick={() => setBili(!bili)}
              >
                No Bilibili
              </div>
              <div className="my-0.5 flex flex-col">
                <input
                  type="text"
                  className={`${
                    arc !== "" && arc !== null ? `bg-[#00ffaa]` : `bg-white`
                  } w-full text-black px-1 focus:outline-none focus:border-transparent`}
                  value={arc}
                  onChange={(e) => setArc(e.target.value)}
                />
                <div
                  className={`p-1 my-0.5 border-1 border-white/10 rounded-none text-center ${
                    arc !== "" && arc !== null ? `bg-[#00ffaa] text-black` : `bg-[#131111] text-white`
                  }`}
                >
                  Match Arcana
                </div>
              </div>
              <div className="my-0.5 flex flex-col">
                <input
                  type="text"
                  className={`${
                    fea !== "" && fea !== null ? `bg-[#00ffaa]` : `bg-white`
                  } w-full text-black px-1 focus:outline-none focus:border-transparent`}
                  value={fea}
                  onChange={(e) => setFea(e.target.value)}
                />
                <div
                  className={`p-1 my-0.5 border-1 border-white/10 rounded-none text-center ${
                    fea !== "" && fea !== null ? `bg-[#00ffaa] text-black` : `bg-[#131111] text-white`
                  }`}
                >
                  Match Oath
                </div>
                <Link to={"/"} className="my-0.5 text-center bg-[#28282b] border-white/10 border p-1 text-white">
                  Main Menu
                </Link>
              </div>
            </div>
            {fullAspectData.map((holder, index) => (
              <div className="w-full min-w-[250px]">
                <div className="bg-[black] text-white text-center text-[12px] font-[Ale] rounded">
                  {h2AspectOrder[index]}
                </div>
                {holder.map((obj, index) => (
                  <div
                    key={index}
                    className={`p-1 my-1 border-1 border-white/20 ${
                      +obj.fea == 67 ? `bg-[#0e3523]` : `bg-[#050505]`
                    } rounded relative`}
                  >
                    <div
                      className={`absolute right-1 bottom-1 h-2 w-2 rounded-none ${
                        obj.loc === `Underworld` ? `bg-[#00ffaa]` : `bg-[yellow] rotate-45`
                      }`}
                    />
                    <div className="flex items-end gap-0.5">
                      <div className="text-[11px]">
                        {obj.nam} ({obj.fea}) - {obj.tim}
                      </div>
                      {obj.src && (
                        <Link to={obj.src} target="_blank">
                          {obj.src.includes(`twitch`) ? (
                            <img src="/Misc/twitch.png" alt="Twitch" className="size-5" />
                          ) : obj.src.includes(`bilibil`) ? (
                            <img src="/Misc/bilibili.png" alt="Bilibili" className="size-5" />
                          ) : obj.src.includes(`youtu`) ? (
                            <img src="/Misc/youtube.png" alt="Youtube" className="size-5" />
                          ) : (
                            `?`
                          )}
                        </Link>
                      )}
                      {obj.arcana && (
                        <Link to={obj.arcana} target="_blank">
                          <img src="/Misc/arcana.png" alt="Arcana" className="size-5" />
                        </Link>
                      )}
                      {obj.oath && (
                        <Link to={obj.oath} target="_blank">
                          <img src="/Misc/fear.webp" alt="Arcana" className="size-5" />
                        </Link>
                      )}
                    </div>
                    <div className="flex">
                      <div className="tooltip shrink-0">
                        <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                          <div className="text-[11px]">{obj.fam}</div>
                        </div>
                        <img
                          draggable={false}
                          src={`/H2Boons/${obj.fam}.png`}
                          alt="Core Boon"
                          className="size-6 rounded-none"
                        />
                      </div>
                      {sToA(obj.cor).map((ite, index) => (
                        <div className="tooltip shrink-0" key={index}>
                          <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                            <div className="text-[11px]">{ite}</div>
                          </div>
                          <img
                            draggable={false}
                            src={`/H2Boons/${ite}.png`}
                            alt="Core Boon"
                            className="size-6 rounded-none"
                          />
                        </div>
                      ))}
                      {obj.ham && (
                        <div className="flex">
                          {findValue(
                            sToA(obj.ham).sort((a, b) => {
                              const aIndex = orderMap.get(a) ?? Infinity;
                              const bIndex = orderMap.get(b) ?? Infinity;
                              return aIndex - bIndex;
                            })
                          ).map((ite, index) => (
                            <div className="tooltip shrink-0">
                              <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                                <div className="text-[11px]">{p9boons[ite]}</div>
                              </div>
                              <img
                                draggable={false}
                                src={`/P9/${ite}.png`}
                                alt="Core Boon"
                                className="size-6 rounded-none"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-0.5 mt-0.5">
                      {findStatus(obj).map((ite) => (
                        <div
                          className="px-1 pt-0.5 rounded-xs text-black min-w-[40px] text-center text-[11px]"
                          style={{ backgroundColor: getStatusColor(ite) }}
                        >
                          {ite}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
