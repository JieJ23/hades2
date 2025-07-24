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

export const orderMap = new Map(allP9.map((item, index) => [item, index]));

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
//

const availableRegion = [`Underworld`, `Surface`];
const allPatches = [p11data, p9data];

const handleLoadMore = (updater) => {
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
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hasvod, setHasVod] = useState(false);

  const highfear = allPatches[patch].slice().sort((a, b) => {
    const feaDiff = +b.fea - +a.fea;
    if (feaDiff !== 0) return feaDiff;
    return parseTimetoms(a.tim) - parseTimetoms(b.tim);
  });
  //
  const entriesOnlyVod = highfear.slice().filter((obj) => obj.src !== "");

  const filteredBoons = allP9.filter((boon) => boon.toLowerCase().includes(query.toLowerCase()));

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
    <main className="h-full min-h-lvh relative">
      <Background />
      <Head />
      <div className="max-w-[1200px] font-[Source] text-[12px] md:text-[13px] mx-auto">
        <SideNav />
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
          <div className="px-2 py-1 flex gap-2 relative">
            <input
              type="text"
              placeholder="Search Boons"
              className="input input-sm border-white w-[200px] focus:outline-0 rounded"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 100)} // allow click
            />
            {isOpen && query.length >= 3 && (
              <ul className="absolute top-full left-0 w-[200px] bg-[black] border-1 border-white/20 rounded ml-2  z-40 overflow-y-auto">
                {filteredBoons.length > 0 ? (
                  filteredBoons.map((boon, index) => (
                    <li
                      key={index}
                      className="px-3 py-1 hover:bg-base-200 cursor-pointer flex gap-1"
                      onMouseDown={() => {
                        if (has.length >= 5) {
                          // Optionally alert or ignore
                          alert("You can only select up to 5 boons");
                          return;
                        }
                        if (!has.includes(boon)) {
                          setHas((prev) => [...prev, boon]);
                        }
                        setQuery("");
                        setIsOpen(false);
                      }}
                    >
                      <img src={`P9/${p9boons_reverse[boon]}.png`} alt="Boons" className="size-6" />
                      {boon}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-1 text-gray-500">No matches</li>
                )}
              </ul>
            )}
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
                    <img src={`P9/${p9boons_reverse[ite]}.png`} alt="Boons" className="size-6 border-1 border-black" />
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
        <section className="p-1 overflow-hidden">
          {displayEntries.slice(0, show).map((obj, index) => (
            <div
              className={`flex items-center w-full rounded px-2 py-1 gap-2 relative mb-4
            ${
              obj.fea == 67
                ? `md:min-h-[250px] bg-gradient-to-b from-[#000000b5] md:to-[#033777bc] to-[#033777bc] border-1 border-black`
                : `bg-[#000000b5]`
            }
            `}
              key={index}
            >
              <div
                className={`absolute top-0 left-0 h-full w-[4px] md:w-[6px] ${
                  obj.loc === `Underworld` ? `bg-[#00ffaa]` : `bg-[#fff200]`
                } rounded-l`}
              />
              {obj.fea == 67 && (
                <div className="absolute top-0 left-0 w-full h-full -z-10">
                  <img
                    src="/Misc/max.webp"
                    alt="Max Fear"
                    className="w-full h-full object-cover object-[center_10%] rounded"
                  />
                </div>
              )}
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
                <div className="py-1 flex flex-wrap gap-1 text-[11px]">
                  <div className="flex items-center gap-1 bg-[#28282b] rounded px-2 py-1">
                    <img src={`/P9/${obj.asp}.png`} alt="Aspect" className="size-4" draggable={false} />
                    <div>
                      <div>{obj.asp}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-[#28282b] rounded px-2 py-1">
                    <img src={`/P9/${obj.fam}.png`} alt="Familiar" className="size-4" draggable={false} />
                    <div>
                      <div>{obj.fam}</div>
                    </div>
                  </div>
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
                <div className="flex items-center flex-wrap py-1 gap-1 gap-y-1">
                  <div className="flex gap-0.5 p-1 rounded bg-[#28282b]">
                    {sToA(obj.cor).map((ite, index) => (
                      <div className="tooltip shrink-0" key={index}>
                        <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                          <div className="font-[Source] text-[12px]">{ite}</div>
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
                            <div className="font-[Source] text-[12px]">{p9boons[ite]}</div>
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
                  {obj.mis && (
                    <div className="flex gap-0.5 p-1 rounded bg-[#28282b]">
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
                            className="size-6 md:size-7 border-1 border-black rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {(obj.duo || obj.ele) && (
                    <div className="flex gap-0.5 p-1 rounded bg-[#28282b]">
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
                              className="size-6 md:size-7 border-1 border-black rounded-lg"
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
                              className="size-6 md:size-7 border-1 border-black rounded-lg"
                            />
                          </div>
                        ))}
                    </div>
                  )}
                  {obj.cha && (
                    <div className="flex gap-0.5 p-1 rounded bg-[#28282b]">
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
                            <div className="font-[Source] text-[12px]">{ite}</div>
                          </div>
                          <img draggable={false} src={`/buildgui/${ite}.png`} alt="Keepsake" className="size-7" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-white z-20 p-1 pt-0 text-[11px]">{obj.des}</div>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {obj.arcana &&
                    deCodeArcana(obj.arcana)
                      .map((ite) => deckMatch[ite])
                      .map((ite) => <div className="px-1 py-0.5 bg-[#28282b] rounded">{ite}</div>)}
                </div>
                <div className="flex flex-wrap gap-1 text-[10px] pt-1">
                  {obj.oath &&
                    obj.fea < 58 &&
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
                <img src={`/GUI_Card/${obj.fam}.png`} alt="Familiar" className="w-[80px] rounded" draggable={false} />
              </div>
              {/* {obj.arcana && (
                <Link target="_blank" to={obj.arcana} className="hidden md:block">
                  <img src={`/Arcane/c0.png`} alt="Arcana" className="w-[80px] rounded" draggable={false} />
                </Link>
              )}
              {obj.oath && (
                <Link target="_blank" to={obj.oath} className="hidden md:block">
                  <img src={`/Misc/Oath.png`} alt="Oath" className="w-[80px] rounded" draggable={false} />
                </Link>
              )} */}
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
      </div>
      <Footer />
    </main>
  );
}
