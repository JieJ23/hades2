import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { Link } from "react-router-dom";

import { p9data } from "../Data/P9Data";
import { p11data } from "../Data/P11Data";
import { useState, useEffect } from "react";

import {
  h2AspectOrder,
  sToA,
  deCodeArcana,
  deckMatch,
  deCodeVow,
  oathMatch,
  vowMatch,
  parseTimetoms,
} from "../Data/Misc";
import { orderMap, orderMap2, findValue, findValue2, handleLoadMore } from "../App";
import { p9boons } from "../Data/P9BoonObj";

import { boonCodex, bOrder, bHamDuoEleOrder } from "../Data/Boon2";
import { boonid, idboon } from "../Data/IDs";
import { aspectid, idaspect } from "../Data/QueryTrait";

import { allVows } from "../Data/FearTrait";
import { vowid, idvow } from "../Data/Vow1";
import { arcanaid, idarcana } from "../Data/Arcana1";

const allEntries = [...p9data, ...p11data].sort((a, b) => {
  const feaDiff = +b.fea - +a.fea;
  if (feaDiff !== 0) return feaDiff;
  return parseTimetoms(a.tim) - parseTimetoms(b.tim);
});

export default function Query() {
  const [asp, setAsp] = useState([]);
  const [reg, setReg] = useState(`Region`);
  const [minmax, setMinMax] = useState([22, 67]);
  const [query, setQuery] = useState("");
  const [has, setHas] = useState([]);
  const [vow, setVow] = useState([]);
  const [arc, setArc] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shareableURL, setShareableURL] = useState("");
  const [show, setShow] = useState(20);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const base64Asp = searchParams.get("asp");
    const base64MinMax = searchParams.get("minmax");
    const base64Has = searchParams.get("has");
    const base64Vow = searchParams.get("vow");
    const base64Arc = searchParams.get("arc");
    const base64Reg = searchParams.get("reg");

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
    window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
  }, []);

  //
  const generateShareableURL = () => {
    const base64Asp = btoa(JSON.stringify(asp));
    const base64MinMax = btoa(JSON.stringify(minmax));
    const base64Has = btoa(JSON.stringify(has));
    const base64Vow = btoa(JSON.stringify(vow));
    const base64Arc = btoa(JSON.stringify(arc));
    const base64Reg = btoa(JSON.stringify(reg));

    const newURL = `${window.location.origin}/Query/?asp=${base64Asp}&minmax=${base64MinMax}&has=${base64Has}&vow=${base64Vow}&arcana=${base64Arc}&reg=${base64Reg}`;
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

  const displayData3 = reg === `Region` ? displayData2 : displayData2.filter((obj) => obj.loc === reg);

  return (
    <main className="relative">
      <Background />
      <Head />
      <div className="max-w-[1200px] font-[Source] text-[11px] mx-auto px-2">
        <SideNav />
        <div className="flex flex-wrap gap-1">
          <button
            className="btn btn-sm bg-white text-black rounded px-2 py-1 font-[Source] text-[11px]"
            onClick={generateShareableURL}
          >
            Generate URL
          </button>
          <button
            className="btn btn-sm bg-white text-black rounded px-2 py-1 font-[Source] text-[11px]"
            onClick={copyURLToClipboard}
          >
            {isCopied ? "Copied!" : "Copy URL"}
          </button>
          <button
            className="btn btn-sm bg-white text-black rounded px-2 py-1 font-[Source] text-[11px]"
            onClick={() => {
              setAsp([]);
            }}
          >
            Reset Selection
          </button>
        </div>

        <div className="w-full max-w-[1000px] bg-[#28282b98] text-white overflow-hidden p-2 truncate text-[12px] rounded my-2">
          {shareableURL || "No URL Generated Yet"}
        </div>
        <div className="my-2 flex gap-1">
          <input
            type="number"
            className="input input-sm border-1 border-[#f18043] w-[50px] focus:outline-0 rounded"
            value={minmax[0]}
            min={22}
            max={67}
            onChange={(e) => {
              setShow(20);
              const newMin = e.target.value; // Clamp 50-67
              setMinMax([newMin, minmax[1]]);
            }}
          />
          <input
            type="number"
            className="input input-sm border-1 border-[#f18043] w-[50px] focus:outline-0 rounded"
            value={minmax[1]}
            min={22}
            max={67}
            onChange={(e) => {
              setShow(20);
              const newMax = e.target.value; // Clamp 50-67
              setMinMax([minmax[0], newMax]);
            }}
          />
          <select
            className="select select-sm w-[100px] border-1 border-[#ff8000] focus:outline-0 rounded"
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
            className="select select-sm w-[120px] border-1 border-[#00ffaa] focus:outline-0 rounded"
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
              <option value={ite} key={index}>
                {ite}
              </option>
            ))}
          </select>
          <select
            className="select select-sm w-[100px] border-1 border-[#b300ff] focus:outline-0 rounded"
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
              <option value={ite} key={index}>
                {ite}
              </option>
            ))}
          </select>
          <select
            className="select select-sm w-[100px] border-1 border-[#b300ff] focus:outline-0 rounded"
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
              <option value={ite} key={index}>
                {ite}
              </option>
            ))}
          </select>
        </div>
        <div className="my-2 flex gap-2 relative">
          <input
            type="text"
            placeholder="Search Boons"
            className="input input-sm border-white w-[200px] focus:outline-0 rounded"
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
                    key={index}
                    className="px-3 py-1 hover:bg-base-200 cursor-pointer flex items-center gap-1"
                    onMouseDown={() => {
                      // if (has.length >= 5) {
                      //   alert("You can only select up to 5 boons");
                      //   return;
                      // }
                      if (!has.includes(boonid[boon])) {
                        setHas((prev) => [...prev, boonid[boon]]);
                      }
                      setQuery("");
                      setIsOpen(false);
                    }}
                  >
                    {/* <img src={`P9/${boonCodexr[boon]}.png`} alt="Boons" className="size-6" /> */}
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
          <div className="flex text-[10px] md:text-[11px] my-1 gap-1">
            <div className="px-2 py-1 rounded bg-[white] text-black">Region: {reg === `Region` ? `All` : reg}</div>
            <div className="px-2 py-1 rounded bg-[white] text-black">
              Fear Range: {minmax[0]} - {minmax[1]}
            </div>
          </div>
        )}
        {asp.length > 0 && (
          <div className="flex flex-wrap gap-0.5 my-1 text-[10px] md:text-[11px]">
            {asp.map((ite) => (
              <div
                className="bg-[white] text-black px-2 py-0.5 rounded cursor-pointer hover:scale-[95%] hover:bg-[#00ffaa] duration-75 ease-in"
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
          <div className="flex flex-wrap gap-0.5 my-1 text-[10px] md:text-[11px]">
            {has.map((ite) => (
              <div
                className="bg-[white] text-black px-2 py-0.5 rounded cursor-pointer hover:scale-[95%] hover:bg-[#00ffaa] duration-75 ease-in"
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
          <div className="flex flex-wrap gap-0.5 my-1 text-[10px] md:text-[11px]">
            {vow.map((ite) => (
              <div
                className="bg-[white] text-black px-2 py-0.5 rounded cursor-pointer hover:scale-[95%] hover:bg-[#b300ff] duration-75 ease-in"
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
          <div className="flex flex-wrap gap-0.5 my-1 text-[10px] md:text-[11px]">
            {arc.map((ite) => (
              <div
                className="bg-[white] text-black px-2 py-0.5 rounded cursor-pointer hover:scale-[95%] hover:bg-[#b300ff] duration-75 ease-in"
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
        <div>
          Query: {displayData3.length}/{allEntries.length} |{" "}
          {((displayData3.length / allEntries.length) * 100).toFixed(2)}%
        </div>
        <div className="select-none">
          {displayData3.slice(0, show).map((obj, index) => (
            <div className="my-1 rounded bg-[#00000098] p-2 py-1">
              <div className="flex justify-between text-[12px] items-center px-1">
                <div className="font-[Cinzel] flex gap-1 items-center">
                  <div className="font-mono font-semibold text-[#f18043]">{obj.fea}</div>
                  <div>{obj.nam}</div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-0.5 text-[10px] md:text-[11px]">
                  {obj.src !== "" && (
                    <Link
                      className="flex items-center bg-[#fff] text-black border-1 border-black rounded ps-2 p-1"
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
                      className="flex items-center justify-center bg-[#fff] text-black rounded ps-2 p-1"
                    >
                      <span>Arcana</span>
                      <img src={`/Misc/ra.png`} alt="Oath" className="size-3" draggable={false} />
                    </Link>
                  )}
                  {obj.oath && (
                    <Link
                      to={obj.oath}
                      target="_blank"
                      className="flex items-center justify-center bg-[#fff] text-black rounded ps-2 p-1"
                    >
                      <span>Oath</span>
                      <img src={`/Misc/ra.png`} alt="Oath" className="size-3" draggable={false} />
                    </Link>
                  )}
                  <div className="flex items-center bg-[#00ffaa] text-black border-1 border-black rounded p-1">
                    {obj.tim}
                  </div>
                  <img src={`/${obj.loc}.png`} alt="Region" className="size-6 rounded" />
                </div>
              </div>
              <div className="flex items-center flex-wrap my-1 gap-1">
                <div className="flex gap-0.5 rounded">
                  <img
                    draggable={false}
                    src={`/P9/${obj.asp}.png`}
                    alt="Core Boon"
                    className="size-6 md:size-7 border-1 border-black rounded-lg"
                  />
                  <img
                    draggable={false}
                    src={`/P9/${obj.fam}.png`}
                    alt="Core Boon"
                    className="size-6 md:size-7 border-1 border-black rounded-lg"
                  />
                </div>
                <div className="flex gap-0.5 rounded">
                  {sToA(obj.cor).map((ite, index) => (
                    <div className="tooltip shrink-0" key={index}>
                      <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                        <div className="font-[Source] text-[11px]">{ite}</div>
                      </div>
                      <img
                        draggable={false}
                        src={`/H2Boons/${ite}.png`}
                        alt="Core Boon"
                        className="size-6 md:size-7 border-1 border-black rounded-lg"
                      />
                    </div>
                  ))}
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
                      <div className="tooltip shrink-0" key={index}>
                        <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                          <div className="font-[Source] text-[11px]">{p9boons[ite]}</div>
                        </div>
                        <img
                          draggable={false}
                          src={`/P9/${ite}.png`}
                          alt="Core Boon"
                          className="size-6 md:size-7 border-1 border-black rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {obj.ks && (
                  <div className="flex gap-0.5 rounded">
                    {sToA(obj.ks).map((ite, index) => (
                      <div className="tooltip shrink-0" key={index}>
                        <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                          <div className="font-[Source] text-[11px]">{ite}</div>
                        </div>
                        <img
                          draggable={false}
                          src={`/buildgui/${ite}.png`}
                          alt="Keepsake"
                          className="size-6 md:size-7"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {obj.boon && (
                <div className="flex items-center flex-wrap my-1">
                  <div className="flex flex-wrap rounded">
                    {findValue2(
                      sToA(obj.boon).sort((a, b) => {
                        const aIndex = orderMap2.get(a) ?? Infinity;
                        const bIndex = orderMap2.get(b) ?? Infinity;
                        return aIndex - bIndex;
                      })
                    ).map((ite, index) => (
                      <div className="tooltip shrink-0" key={index}>
                        <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                          <div className="font-[Source] text-[11px]">{boonCodex[ite]}</div>
                        </div>
                        <img
                          draggable={false}
                          src={`/P9/${ite}.png`}
                          alt="Core Boon"
                          className="size-6 md:size-7 border-1 border-black rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-[11px] text-gray-300 ps-1">{obj.des}</div>
              {obj.arcana && (
                <div className="flex flex-wrap gap-1 text-[10px] md:text-[11px] my-0.5">
                  {obj.arcana &&
                    deCodeArcana(obj.arcana)
                      .map((ite) => deckMatch[ite])
                      .map((ite) => (
                        <div
                          className={`px-1 py-0.5 rounded ${
                            arc.includes(arcanaid[ite]) ? `bg-[#00ffaa] text-black` : `bg-[#28282b]`
                          }`}
                        >
                          {ite}
                        </div>
                      ))}
                </div>
              )}
              {obj.oath && (
                <div className="flex flex-wrap gap-1 text-[10px] md:text-[11px] my-0.5">
                  {obj.oath &&
                    deCodeVow(obj.oath)
                      .map((ite1, index) => oathMatch[index].indexOf(ite1))
                      .map(
                        (ite, index) =>
                          ite !== 0 && (
                            <div
                              className={`px-1 py-0.5 rounded ${
                                vow.includes(vowid[vowMatch[index]]) ? `bg-[#00ffaa] text-black` : `bg-[#28282b]`
                              }  `}
                            >
                              {vowMatch[index]} {ite}
                            </div>
                          )
                      )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center my-4 gap-2">
          {show < displayData3.length && (
            <button
              className="btn bg-transparent rounded border-1 border-[#00ffaa] btn-sm font-[Source]"
              onClick={() => handleLoadMore(setShow)}
            >
              Show More
            </button>
          )}
          {displayData3.length > 20 && (
            <button
              className="btn bg-transparent rounded border-1 border-[#00ffaa] btn-sm font-[Source]"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Back Top
            </button>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
