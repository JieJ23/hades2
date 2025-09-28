import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { v1data } from "../Data/V1data";

import {
  h2AspectOrder,
  sToA,
  deCodeArcana,
  deckMatch,
  deCodeVow,
  oathMatch,
  vowMatch,
  parseTimetoms,
  // getYTid,
  // getBilibiliid,
  biomeS,
  biomeU,
  getOlympusCore,
  handleLoadMore,
  orderMap,
  orderMap2,
  findValue,
  findValue2,
} from "../Data/Misc";
import { p9boons } from "../Data/P9BoonObj";

import { boonCodex, bOrder, bHamDuoEleOrder } from "../Data/Boon2";
import { boonid, idboon } from "../Data/IDs";
import { aspectid, idaspect } from "../Data/QueryTrait";

import { allVows } from "../Data/FearTrait";
import { vowid, idvow } from "../Data/Vow1";
import { arcanaid, idarcana } from "../Data/Arcana1";

// import { useData } from "../Hook/DataFetch";
// import Loading from "../Hook/Loading";

export default function Query() {
  const [asp, setAsp] = useState([]);
  const [reg, setReg] = useState(`Region`);
  const [minmax, setMinMax] = useState([1, 67]);
  const [query, setQuery] = useState("");
  const [has, setHas] = useState([]);
  const [vow, setVow] = useState([]);
  const [arc, setArc] = useState([]);
  const [player, setPlayer] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shareableURL, setShareableURL] = useState("");
  const [show, setShow] = useState(20);
  // const { posts, loader } = useData();
  const [speed, setSpeed] = useState(false);

  const allEntries = [...v1data].sort((a, b) => {
    if (speed) {
      return parseTimetoms(a.tim) - parseTimetoms(b.tim);
    } else {
      const feaDiff = +b.fea - +a.fea;
      if (feaDiff !== 0) return feaDiff;
      return parseTimetoms(a.tim) - parseTimetoms(b.tim);
    }
  });

  const allPlayers = [...new Set([...v1data].map((obj) => obj.nam))].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const base64Asp = searchParams.get("asp");
    const base64MinMax = searchParams.get("minmax");
    const base64Has = searchParams.get("has");
    const base64Vow = searchParams.get("vow");
    const base64Arc = searchParams.get("arc");
    const base64Reg = searchParams.get("reg");
    const base64Player = searchParams.get("player");

    if (base64Asp) {
      try {
        const decodedAsp = JSON.parse(atob(base64Asp)); // Decode the Base64
        setAsp(decodedAsp);
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    if (base64Has) {
      try {
        const decodedHas = JSON.parse(atob(base64Has)); // Decode the Base64
        setHas(decodedHas);
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    if (base64MinMax) {
      try {
        const decodedMinMax = JSON.parse(atob(base64MinMax)); // Decode the Base64
        setMinMax(decodedMinMax);
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    if (base64Vow) {
      try {
        const decodedVow = JSON.parse(atob(base64Vow)); // Decode the Base64
        setVow(decodedVow);
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    if (base64Arc) {
      try {
        const decodedArc = JSON.parse(atob(base64Arc)); // Decode the Base64
        setArc(decodedArc);
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    if (base64Reg) {
      try {
        const decodedReg = JSON.parse(atob(base64Reg)); // Decode the Base64
        setReg(decodedReg);
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    if (base64Player) {
      try {
        const decodedPlayer = JSON.parse(atob(base64Player)); // Decode the Base64
        setPlayer(decodedPlayer);
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
  }, []);

  //
  const generateShareableURL = () => {
    // Match your actual initial states
    const defaults = {
      asp: [],
      reg: "Region",
      minmax: [1, 67],
      has: [],
      vow: [],
      arc: [],
      player: "",
    };

    const params = new URLSearchParams();

    const addParamIfNotDefault = (key, value) => {
      if (JSON.stringify(value) !== JSON.stringify(defaults[key])) {
        params.set(key, btoa(JSON.stringify(value)));
      }
    };

    addParamIfNotDefault("asp", asp);
    addParamIfNotDefault("reg", reg);
    addParamIfNotDefault("minmax", minmax);
    addParamIfNotDefault("has", has);
    addParamIfNotDefault("vow", vow);
    addParamIfNotDefault("arc", arc);
    addParamIfNotDefault("player", player);

    const newURL = `${window.location.origin}/V1Query/?${params.toString()}`;
    setShareableURL(newURL);
  };
  const copyURLToClipboard = () => {
    navigator.clipboard.writeText(shareableURL).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    });
  };
  //

  const filteredBoons = [...bOrder, ...bHamDuoEleOrder].filter((boon) =>
    boon.toLowerCase().includes(query.toLowerCase())
  );

  const displayData = (asp.length <= 0 ? allEntries : allEntries.filter((obj) => asp.includes(aspectid[obj.asp])))
    .filter((obj) => obj.fea >= minmax[0] && obj.fea <= minmax[1])
    .filter((item) => {
      // Combine all relevant fields into a single string (lowercase for case-insensitive)
      const combined = [item.cor, item.ham, item.boon, item.ks, item.fam]
        .filter(Boolean) // remove empty strings
        .join(",") // join them into one string
        .toLowerCase();
      // Check if all "has" items exist in combined string
      return has.every((h) => combined.includes(idboon[h].toLowerCase()));
    });

  const displayData2 =
    vow.length > 0 || arc.length > 0
      ? displayData
          .filter((obj) => obj.oath && vow.every((sel) => deCodeVow(obj.oath)[sel - 1] !== 0))
          .filter((obj) => obj.arcana && arc.every((sel) => deCodeArcana(obj.arcana).includes(sel)))
      : displayData;

  const displayData3 = (reg === `Region` ? displayData2 : displayData2.filter((obj) => obj.loc === reg)).filter(
    (obj) => {
      return player === "" || obj.nam === player;
    }
  );

  return (
    <main className="relative">
      <Background />
      <div className="max-w-[1200px] font-[Ale] text-[11px] md:text-[12px] mx-auto px-1 overflow-hidden">
        <SideNav />
        {/* {loader ? (
          <Loading />
        ) : ( */}
        <>
          <div className="flex flex-wrap gap-1 pt-2">
            <button className="bg-white cursor-pointer text-black rounded px-2 py-1" onClick={generateShareableURL}>
              Generate URL
            </button>
            <button className="bg-white cursor-pointer text-black rounded px-2 py-1" onClick={copyURLToClipboard}>
              {isCopied ? "Copied!" : "Copy URL"}
            </button>
            <button
              className="bg-white cursor-pointer text-black rounded px-2 py-1"
              onClick={() => {
                setAsp([]);
                setReg(`Region`);
                setMinMax([1, 67]);
                setHas([]);
                setVow([]);
                setArc([]);
                setPlayer("Player");
              }}
            >
              Reset Selection
            </button>
          </div>
          <div className="w-full max-w-[1000px] bg-[#28282b] text-white overflow-hidden p-2 truncate text-[12px] rounded my-2">
            {shareableURL || "No URL Generated Yet"}
          </div>
          <div className="my-2 flex flex-wrap gap-1">
            <input
              type="number"
              className="input input-sm w-[60px] focus:outline-0 rounded"
              value={minmax[0]}
              min={1}
              max={67}
              onChange={(e) => {
                setShow(20);
                const newMin = +e.target.value; // Clamp 50-67
                setMinMax([newMin, minmax[1]]);
              }}
            />
            <input
              type="number"
              className="input input-sm w-[60px] focus:outline-0 rounded"
              value={minmax[1]}
              min={1}
              max={67}
              onChange={(e) => {
                setShow(20);
                const newMax = +e.target.value; // Clamp 50-67
                setMinMax([minmax[0], newMax]);
              }}
            />
            <select
              className="select select-sm w-[120px] focus:outline-0 rounded"
              defaultValue={`Region`}
              onChange={(e) => {
                setShow(20);
                setReg(e.target.value);
              }}
            >
              <option value={`Region`}>Region</option>
              <option value={`Surface`}>Surface</option>
              <option value={`Underworld`}>Underworld</option>
            </select>
            <select
              className="select select-sm w-[120px] focus:outline-0 rounded"
              defaultValue={`All`}
              onChange={(e) => {
                setShow(20);
                setAsp((prev) => {
                  if (!prev.includes(aspectid[e.target.value])) {
                    return [...prev, aspectid[e.target.value]];
                  }
                  return prev;
                });
              }}
            >
              <option value={`All`} disabled={true}>
                All
              </option>
              {h2AspectOrder.map((ite, index) => (
                <option value={ite}>{ite}</option>
              ))}
            </select>
            <select
              className="select select-sm w-[120px] focus:outline-0 rounded"
              defaultValue={`Vows`}
              onChange={(e) => {
                setShow(20);
                setVow((prev) => {
                  if (!prev.includes(vowid[e.target.value])) {
                    return [...prev, vowid[e.target.value]];
                  }
                  return prev;
                });
              }}
            >
              <option value={`Vows`} disabled={true}>
                Vows
              </option>
              {allVows.map((ite, index) => (
                <option value={ite}>{ite}</option>
              ))}
            </select>
            <select
              className="select select-sm w-[120px] focus:outline-0 rounded"
              defaultValue={`Arcana`}
              onChange={(e) => {
                setShow(20);
                setArc((prev) => {
                  if (!prev.includes(arcanaid[e.target.value])) {
                    return [...prev, arcanaid[e.target.value]];
                  }
                  return prev;
                });
              }}
            >
              <option value={`Arcana`} disabled={true}>
                Arcana
              </option>
              {Object.values(deckMatch).map((ite, index) => (
                <option value={ite}>{ite}</option>
              ))}
            </select>
            <select
              className="select select-sm w-[120px] focus:outline-0 rounded"
              defaultValue={`Player`}
              onChange={(e) => {
                setShow(20);
                setPlayer(e.target.value);
              }}
            >
              <option value={`Player`} disabled={true}>
                Player
              </option>
              {allPlayers.map((ite, index) => (
                <option value={ite}>{ite}</option>
              ))}
            </select>
            <select
              className="select select-sm w-[120px] focus:outline-0 rounded"
              value={speed.toString()}
              onChange={(e) => {
                setSpeed(e.target.value === "true");
              }}
            >
              <option value={"false"} disabled={true}>
                Speed
              </option>
              <option value={"false"}>{`False`}</option>
              <option value={"true"}>{`True`}</option>
            </select>
          </div>
          <div className="my-2 flex gap-2 relative">
            <input
              type="text"
              placeholder="Search Boons"
              className="input input-sm w-[200px] focus:outline-0 rounded"
              value={query}
              onChange={(e) => {
                setShow(20);
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 100)} // allow click
            />
            {isOpen && query.length >= 3 && (
              <ul className="absolute top-full left-0 w-[200px] bg-[black] border-1 border-white/20 rounded -mt-0.5  z-40 overflow-y-auto">
                {filteredBoons.length > 0 ? (
                  filteredBoons.map((boon, index) => (
                    <li
                      className="px-3 py-1 hover:bg-base-200 cursor-pointer flex items-center gap-1"
                      onMouseDown={() => {
                        if (!has.includes(boonid[boon])) {
                          setHas((prev) => [...prev, boonid[boon]]);
                        }
                        setQuery("");
                        setIsOpen(false);
                      }}
                    >
                      {boon}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-1 text-gray-500">No matches</li>
                )}
              </ul>
            )}
          </div>
          {reg && (
            <div className="flex flex-wrap text-[11px] my-1 gap-1">
              <div className="px-2 py-1 rounded bg-white text-black">Region: {reg === `Region` ? `All` : reg}</div>
              <div className="px-2 py-1 rounded bg-white text-black">
                Fear Range: {minmax[0]} - {minmax[1]}
              </div>
              {player !== "" && (
                <div className="px-2 py-1 rounded bg-[#28282b] text-white cursor-pointer" onClick={() => setPlayer(``)}>
                  Player: {player}
                </div>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-0.5 my-1">
            {asp.length > 0 && (
              <div className="flex flex-wrap gap-0.5 text-[10px] md:text-[11px]">
                {asp.map((ite) => (
                  <div
                    className="bg-[#28282b] text-white px-2 py-0.5 rounded cursor-pointer hover:bg-[#fff] hover:text-black duration-100 ease-in"
                    onClick={() => {
                      setShow(20);
                      setAsp((prev) => prev.filter((item) => item !== ite));
                    }}
                  >
                    {idaspect[ite]}
                  </div>
                ))}
              </div>
            )}
            {has.length > 0 && (
              <div className="flex flex-wrap gap-0.5 text-[10px] md:text-[11px]">
                {has.map((ite) => (
                  <div
                    className="bg-[#28282b] text-white px-2 py-0.5 rounded cursor-pointer hover:bg-[#fff] hover:text-black duration-100 ease-in"
                    onClick={() => {
                      setShow(20);
                      setHas((prev) => prev.filter((item) => item !== ite));
                    }}
                  >
                    {idboon[ite]}
                  </div>
                ))}
              </div>
            )}
            {vow.length > 0 && (
              <div className="flex flex-wrap gap-0.5 text-[10px] md:text-[11px]">
                {vow.map((ite) => (
                  <div
                    className="bg-[#28282b] text-white px-2 py-0.5 rounded cursor-pointer hover:bg-[#fff] hover:text-black duration-100 ease-in"
                    onClick={() => {
                      setShow(20);
                      setVow((prev) => prev.filter((item) => item !== ite));
                    }}
                  >
                    {idvow[ite]}
                  </div>
                ))}
              </div>
            )}
            {arc.length > 0 && (
              <div className="flex flex-wrap gap-0.5 text-[10px] md:text-[11px]">
                {arc.map((ite) => (
                  <div
                    className="bg-[#28282b] text-white px-2 py-0.5 rounded cursor-pointer hover:bg-[#fff] hover:text-black duration-100 ease-in"
                    onClick={() => {
                      setShow(20);
                      setArc((prev) => prev.filter((item) => item !== ite));
                    }}
                  >
                    {idarcana[ite]}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="px-1 text-white">
            Query: {displayData3.length}/{allEntries.length} |{" "}
            {((displayData3.length / allEntries.length) * 100).toFixed(2)}%
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-4 gap-y-2">
            {displayData3.slice(0, show).map((obj, index) => (
              <div
                className={`p-2 py-1 flex flex-col lg:flex-row gap-1 relative overflow-hidden border-1 border-[#000000] rounded shadow-[0_0_20px_black]`}
              >
                <div className="absolute top-0 right-0 -z-10 h-full w-full">
                  <img src={`/Misc/${obj.loc}.webp`} alt="Region" className="h-full w-full object-cover object-top" />
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r to-[#131313aa] via-[#131111be] from-[#131111]" />
                  <img
                    src={`/GUI_Card/c${obj.asp}.png`}
                    alt="Aspect"
                    className="absolute top-1/2 -translate-y-[50%] right-2 w-[100px] lg:w-[75px] rounded mx-auto drop-shadow-[0_0_10px_black] opacity-50"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
                {/* Content */}
                <div className="w-full lg:w-[400px] text-[14px] text-center my-auto">
                  <div
                    className={`flex items-center lg:flex-col justify-between ${
                      obj.loc === `Underworld` ? `text-[#00ffaa]` : `text-[yellow]`
                    }`}
                  >
                    <div className="text-[18px]">{obj.fea}</div>
                    <div>{obj.nam}</div>
                    <div>{obj.tim}</div>
                  </div>
                  <div className="flex items-center lg:justify-center gap-0.5 text-[9px] font-[Ubuntu] my-1">
                    {obj.src !== "" && (
                      <Link
                        className="flex items-center rounded bg-[#fff] text-black ps-2 p-1"
                        to={obj.src}
                        target="_blank"
                      >
                        <div>{`Video`}</div>
                        <img src={`/Misc/ra.png`} alt="Oath" className="size-3" draggable={false} />
                      </Link>
                    )}
                    {obj.arcana && (
                      <Link
                        to={obj.arcana}
                        target="_blank"
                        className="flex items-center rounded justify-center bg-[#fff] text-black ps-2 p-1"
                      >
                        <span>Arcana</span>
                        <img src={`/Misc/ra.png`} alt="Oath" className="size-3" draggable={false} />
                      </Link>
                    )}
                    {obj.oath && (
                      <Link
                        to={obj.oath}
                        target="_blank"
                        className="flex items-center rounded justify-center bg-[#fff] text-black ps-2 p-1"
                      >
                        <span>Oath</span>
                        <img src={`/Misc/ra.png`} alt="Oath" className="size-3" draggable={false} />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  {obj.ks && (
                    <div className="flex flex-wrap gap-0.5 rounded font-[Ubuntu] text-[10px]">
                      {sToA(obj.ks).map((ite, index) => (
                        <div className="px-2 py-1 bg-[#00000099] rounded flex items-center gap-1">
                          <img
                            draggable={false}
                            src={`/buildgui/${ite}.png`}
                            alt="Keepsake"
                            className="size-5 sm:size-6"
                          />
                          <div>
                            <div>{obj.loc === `Underworld` ? biomeU[index] : biomeS[index]}</div>
                            <div>{ite}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center flex-wrap my-1 gap-0.5">
                    <div className="flex gap-0.5 rounded">
                      <div className="tooltip shrink-0">
                        <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                          <div className="text-[11px]">{obj.asp}</div>
                        </div>
                        <img
                          draggable={false}
                          src={`/P9/${obj.asp}.png`}
                          alt="Core Boon"
                          className="size-8 rounded-full border-1 border-black"
                        />
                      </div>
                      <div className="tooltip shrink-0">
                        <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                          <div className="text-[11px]">{obj.fam}</div>
                        </div>
                        <img
                          draggable={false}
                          src={`/P9/${obj.fam}.png`}
                          alt="Core Boon"
                          className="size-8 rounded-full border-1 border-black"
                        />
                      </div>
                    </div>
                    {obj.ham && (
                      <div className="flex gap-0.5 rounded">
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
                              className="size-8 rounded-full border-1 border-black"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center flex-wrap my-1 gap-1">
                    <div className="flex gap-0.5 rounded">
                      {sToA(obj.cor).map((ite, index) => (
                        <div className="tooltip shrink-0" key={index}>
                          <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                            <div className="text-[11px]">{ite}</div>
                          </div>
                          <img
                            draggable={false}
                            src={`/H2Boons/${ite}.png`}
                            alt="Core Boon"
                            className="size-8 rounded-full border-1 border-black"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {obj.boon && (
                    <div className="flex items-center flex-wrap my-1">
                      <div className="flex flex-wrap gap-0.5 rounded">
                        {findValue2(
                          sToA(obj.boon).sort((a, b) => {
                            const aIndex = orderMap2.get(a) ?? Infinity;
                            const bIndex = orderMap2.get(b) ?? Infinity;
                            return aIndex - bIndex;
                          })
                        ).map((ite, index) => (
                          <div className="tooltip shrink-0">
                            <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                              <div className="text-[11px]">{boonCodex[ite]}</div>
                            </div>
                            <img
                              draggable={false}
                              src={`/P9/${ite}.png`}
                              alt="Core Boon"
                              className={`size-7 rounded-full border-1 ${
                                has.includes(boonid[boonCodex[ite]]) ? `border-[#00ffaa]` : `border-black`
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full mx-auto">
                  <div className="hidden lg:block">
                    <div className="flex gap-1 rounded my-1">
                      {sToA(obj.cor).map((ite, index) => (
                        <img
                          draggable={false}
                          src={`/Olympus/${getOlympusCore(ite.slice(0, 3))}.png`}
                          alt="Olympians"
                          className="size-7 bg-[#00000099] rounded"
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-[12px] text-white my-0.5 font-[Fontin]">{obj.des}</div>
                  <div className="text-gray-300 my-0.5 font-[Fontin]">{obj.dat}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center my-4 gap-2">
            {show < displayData3.length && (
              <button
                className="px-2 py-1 rounded bg-white text-black cursor-pointer"
                onClick={() => handleLoadMore(setShow)}
              >
                Show More
              </button>
            )}
            {displayData3.length > 20 && (
              <button
                className="px-2 py-1 rounded bg-white text-black cursor-pointer"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Back Top
              </button>
            )}
          </div>
        </>
        {/* )} */}
      </div>
      <Footer />
    </main>
  );
}
