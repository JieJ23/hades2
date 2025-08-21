import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  h2AspectOrder,
  sToA,
  parseTimetoms,
  deCodeVow,
  deCodeArcana,
  deckMatch,
  oathMatch,
  vowMatch,
} from "./Data/Misc";
import { p9data } from "./Data/P9Data";
import { p11data } from "./Data/P11Data";
import { testData } from "./Data/P9TestData";
import { p9boons_reverse, p9boons, allP9 } from "./Data/P9BoonObj";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";
import { allVows } from "./Data/FearTrait";
import { defineDeck } from "./Data/DeckTrait";
import { bOrder } from "./Data/Boon2";
import { boonCodexr, boonCodex } from "./Data/Boon2";

import { useData } from "./Hook/DataFetch";
import Loading from "./Hook/Loading";

export const orderMap = new Map(allP9.map((item, index) => [item, index]));
export const orderMap2 = new Map(bOrder.map((item, index) => [item, index]));

export const findGUIcard = (asp) => {
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

export const findValue = (arr) => {
  const finalized = arr.map((ite) => p9boons_reverse[ite]);
  return finalized;
};
export const findValue2 = (arr) => {
  const finalized = arr.map((ite) => boonCodexr[ite]);
  return finalized;
};
//

export const handleLoadMore = (updater) => {
  updater((prev) => prev + 50);
};

export default function App() {
  const [patch, setPatch] = useState(0);
  const [region, setRegion] = useState(`All`);
  const [category, setCategory] = useState(`All`);
  const [show, setShow] = useState(20);
  const [min, setMin] = useState(22);
  const [max, setMax] = useState(67);
  const [has, setHas] = useState([]);
  const [hasvod, setHasVod] = useState(false);
  const { posts, loader } = useData();

  const availableRegion = [`Underworld`, `Surface`];
  const allPatches = [[...p11data, ...(posts || [])], p9data];

  const highfear = allPatches[patch].slice().sort((a, b) => {
    const feaDiff = +b.fea - +a.fea;
    if (feaDiff !== 0) return feaDiff;
    return parseTimetoms(a.tim) - parseTimetoms(b.tim);
  });
  //
  const entriesOnlyVod = highfear.slice().filter((obj) => obj.src !== "");

  const baseData = hasvod ? entriesOnlyVod : highfear;

  const selectedHighfear = (
    region === `Latest` ? [...baseData].sort((a, b) => new Date(b.dat) - new Date(a.dat)) : baseData
  ).filter((obj) => obj.fea >= min && obj.fea <= max);

  const highfear_region =
    region === `All` || region === `Latest` ? selectedHighfear : selectedHighfear.filter((obj) => obj.loc === region);

  const highfear_category =
    category === `All` ? highfear_region : highfear_region.filter((obj) => obj.asp === category);

  const availableAspects = (
    region === `All` || region === `Latest`
      ? [...new Set(selectedHighfear.map((obj) => obj.asp))]
      : [...new Set(highfear_region.map((obj) => obj.asp))]
  ).sort((a, b) => (h2AspectOrder.indexOf(a) > h2AspectOrder.indexOf(b) ? 1 : -1));

  //
  const filteredData = highfear_category.filter((item) => {
    // Combine all relevant fields into a single string (lowercase for case-insensitive)
    const combined = [item.cor, item.ham]
      .filter(Boolean) // remove empty strings
      .join(",") // join them into one string
      .toLowerCase();
    // Check if all "has" items exist in combined string
    return has.every((h) => combined.includes(h.toLowerCase()));
  });
  //

  const displayEntries = has.length >= 1 ? filteredData : highfear_category;
  //

  return (
    <main className="h-full min-h-lvh relative select-none overflow-hidden">
      <Background />
      <div className="max-w-[1200px] font-[Source] text-[12px] md:text-[13px] mx-auto">
        <SideNav />
        {loader ? (
          <Loading />
        ) : (
          <>
            <section className="w-full p-2">
              <div className="flex gap-1 px-2">
                <button
                  onClick={() => {
                    setRegion(`All`);
                    setCategory(`All`);
                    setPatch(0);
                  }}
                  className={`cursor-pointer px-2 py-1 text-black font-[Source] text-[12px] rounded ${
                    patch == 0 ? `bg-[#00ffaa]` : `bg-white`
                  }`}
                >
                  Patch 11
                </button>
                <button
                  onClick={() => {
                    setRegion(`All`);
                    setCategory(`All`);
                    setPatch(1);
                  }}
                  className={`cursor-pointer px-2 py-1 text-black font-[Source] text-[12px] rounded ${
                    patch == 1 ? `bg-[#00ffaa]` : `bg-white`
                  }`}
                >
                  Patch 9 & 10
                </button>
              </div>
              <div className="px-2 py-1 flex gap-1">
                <input
                  type="number"
                  className="input input-sm border-1 border-[#f18043] w-[60px] focus:outline-0 rounded"
                  value={min}
                  min={22}
                  max={67}
                  onChange={(e) => {
                    setRegion(region);
                    setCategory(`All`);
                    setMin(e.target.value);
                  }}
                />
                <input
                  type="number"
                  className="input input-sm border-1 border-[#f18043] w-[60px] focus:outline-0 rounded"
                  value={max}
                  min={22}
                  max={67}
                  onChange={(e) => {
                    setRegion(region);
                    setCategory(`All`);
                    setMax(e.target.value);
                  }}
                />
                <select
                  value={region}
                  className="select select-sm w-[100px] border-1 border-[#f05bdc] focus:outline-0 rounded"
                  onChange={(e) => {
                    setShow(20);
                    setRegion(e.target.value);
                    setCategory(`All`);
                  }}
                >
                  <option value={`Latest`}>Latest</option>
                  <option value={`All`}>All</option>
                  {availableRegion.map((ite, index) => (
                    <option value={ite} key={index}>
                      {ite}
                    </option>
                  ))}
                </select>
                <select
                  value={category}
                  className="select select-sm w-[100px] border-1 border-[#00ffaa] focus:outline-0 rounded"
                  onChange={(e) => {
                    setShow(20);
                    setCategory(e.target.value);
                  }}
                >
                  <option value={`All`}>All</option>
                  {availableAspects.map((ite, index) => (
                    <option value={ite} key={index}>
                      {ite}
                    </option>
                  ))}
                </select>
              </div>
              <label className="label font-[Source]  p-1 text-white/80">
                Require Video
                <input
                  type="checkbox"
                  className=" border-white/80 checkbox checkbox-white w-4 h-4 rounded checked:checkbox-warning"
                  checked={hasvod}
                  onChange={(e) => setHasVod(e.target.checked)}
                />
              </label>
              <div className=" px-1 flex gap-1">
                <div>Query Data:</div>
                <div className="text-[#f05bdc]">Region [{region}]</div>
                <div className="text-[#00ffaa]">Aspect [{category}]</div>
                <div className="text-[#fff200]">[{displayEntries.length}]</div>
              </div>
              <div className=" px-1 pt-1 flex gap-1">
                <div>Query Fear:</div>
                <div className="text-[#f18043]">Min [{min}]</div>
                <div className="text-[#f18043]">Max [{max}]</div>
              </div>
              {has.length >= 1 && (
                <div className=" px-1 pt-1 flex items-center gap-1">
                  <div>Query Has:</div>
                  <div className="flex flex-wrap gap-0.5">
                    {has.map((ite, index) => (
                      <div
                        className="text-white bg-[black] px-1 rounded border-1 border-white/20 flex gap-0.5 items-center cursor-pointer hover:border-[red]"
                        key={index}
                        onClick={() => {
                          setHas((prev) => prev.filter((item) => item !== ite));
                        }}
                      >
                        <img
                          src={`P9/${p9boons_reverse[ite]}.png`}
                          alt="Boons"
                          className="size-6 border-1 border-black"
                        />
                        <div className="line-clamp-1">{ite}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="p-1 flex gap-2">
                <div>Category Leader: </div>
                <div className="text-[#ffb700]">{displayEntries[0]?.nam ?? `Null`}</div>
              </div>
            </section>
            <section className="p-1 overflow-visible">
              {displayEntries.slice(0, show).map((obj, index) => (
                <div
                  className={`flex items-center w-full rounded px-2 gap-2 relative mb-2
            ${
              obj.fea > 64
                ? `bg-gradient-to-r from-[#00000098] via-[#131835bc] to-[#121a40bc] border-1 border-black shadow-[inset_0_0_100px_black]`
                : `bg-[#00000098]`
            }
            `}
                  key={index}
                >
                  {obj.fea > 64 && (
                    <div className="absolute top-0 left-0 w-full h-full -z-10">
                      <img src={`/Misc/max.webp`} alt="Max Fear" className="w-full h-full object-cover rounded" />
                    </div>
                  )}
                  <div
                    className={`absolute top-0 left-0 h-full w-[4px] md:w-[6px] ${
                      obj.loc === `Underworld` ? `bg-[#00ffaa]` : `bg-[#fff200]`
                    } rounded-l`}
                  />
                  <div className="flex flex-col w-full pt-1">
                    <div className="w-full flex items-center gap-2">
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
                        <div className="flex flex-wrap gap-1 text-[11px]">
                          <div className="flex items-center gap-0.5 bg-[#28282b] text-white rounded pe-2 p-1">
                            <img src={`/Misc/star.png`} alt="Top" className="size-4" draggable={false} />
                            <div>{obj.dat}</div>
                          </div>

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
                        </div>
                        <div className="flex items-center flex-wrap py-1 gap-0.5">
                          <div className="flex gap-0.5 p-1 rounded bg-[#28282b]">
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
                          <div className="flex gap-0.5 p-1 rounded bg-[#28282b]">
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
                            <div className="flex gap-0.5 p-1 rounded bg-[#28282b]">
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
                            <div className="flex gap-0.5 p-1 rounded bg-[#28282b]">
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
                        <div className="flex items-center flex-wrap gap-0.5">
                          {obj.boon && (
                            <div className="flex flex-wrap gap-0.5 pb-1 rounded">
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
                          )}
                        </div>
                        <div className="text-white z-20 text-[11px]">{obj.des}</div>
                        <div className="flex flex-wrap gap-1 text-[10px] my-0.5">
                          {obj.arcana &&
                            deCodeArcana(obj.arcana)
                              .map((ite) => deckMatch[ite])
                              .map((ite) => <div className="px-1 py-0.5 bg-[#28282b] rounded">{ite}</div>)}
                        </div>
                        <div className="flex flex-wrap gap-1 text-[10px] my-0.5">
                          {obj.oath &&
                            obj.fea < 62 &&
                            deCodeVow(obj.oath)
                              .map((ite1, index) => oathMatch[index].indexOf(ite1))
                              .map(
                                (ite, index) =>
                                  ite !== 0 && (
                                    <div className="px-1 py-0.5 bg-[#28282b] rounded">
                                      {vowMatch[index]} {ite}
                                    </div>
                                  )
                              )}
                        </div>
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
                    {(obj.arcana || obj.oath) && (
                      <div className="w-full my-0.5">
                        <div tabIndex={0} className="collapse rounded ps-1 font-[Source] text-[11px]">
                          <input type="checkbox" name={`accordion-${index}`} className="absolute w-[1px] h-[1px]" />
                          <div className="collapse-title min-h-0 p-0 flex justify-start items-center text-[11px] font-[Source]">
                            <div className="p-1 ps-2 bg-white rounded text-black flex items-center">
                              Quick View Arcana & Vows{" "}
                              <img src={`/Misc/ra.png`} alt="Oath" className="size-3" draggable={false} />
                            </div>
                          </div>
                          <div className="collapse-content p-0 flex flex-col sm:flex-row">
                            <div className="grid grid-cols-5 rounded">
                              {obj.arcana &&
                                (() => {
                                  const decoded = deCodeArcana(obj.arcana);
                                  // Create an array of 25 items, filling in the decoded values or 'x'
                                  return Array.from({ length: 25 }, (_, i) => {
                                    const expectedValue = `c${i + 1}`;
                                    return decoded.includes(expectedValue) ? expectedValue : "x";
                                  });
                                })().map((item, index) => (
                                  <div key={index} className="w-full">
                                    {item !== `x` ? (
                                      <img
                                        src={`/Arcane/${item}.png`}
                                        alt="Arcana"
                                        loading="lazy"
                                        className="sm:w-14"
                                        draggable={false}
                                      />
                                    ) : (
                                      <img
                                        src={`/Arcane/c0.png`}
                                        alt="Arcana"
                                        loading="lazy"
                                        className="sm:w-14"
                                        draggable={false}
                                      />
                                    )}
                                  </div>
                                ))}
                            </div>
                            <div>
                              {obj.oath && (
                                <div className="grid grid-cols-4 gap-2 py-1">
                                  {allVows.map((item, index) => (
                                    <div
                                      className={`rounded p-2 sm:px-4 py-2 bg-[#131111] relative ${
                                        index === 16 && `col-start-2 col-span-2`
                                      }`}
                                    >
                                      <div className="text-center text-white">{item}</div>
                                      <img
                                        src={`/Vows/${item}.png`}
                                        alt="Vows"
                                        loading="lazy"
                                        className="w-8 sm:w-9 mx-auto"
                                        draggable={false}
                                      />
                                      <div className="absolute text-[#f18043] font-mono text-[11px] right-1 bottom-0">
                                        {deCodeVow(obj.oath)[index]}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 px-2">
                              {obj.oath && (
                                <div className="text-[#00ffaa]">
                                  Total Fear: {deCodeVow(obj.oath).reduce((a, b) => a + b, 0)}
                                </div>
                              )}
                              {obj.arcana && (
                                <div className="text-[#00ffaa]">
                                  Total Grasp: {deCodeArcana(obj.arcana).reduce((a, b) => a + defineDeck(b).g, 0)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
            <div className="flex justify-center mb-4 my-2 gap-2">
              {show < displayEntries.length && (
                <button
                  className="btn bg-transparent rounded border-1 border-[#00ffaa] btn-sm font-[Source]"
                  onClick={() => handleLoadMore(setShow)}
                >
                  Show More
                </button>
              )}
              {show > 20 && (
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
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
