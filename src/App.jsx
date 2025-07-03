import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";
import { sToA } from "./Data/Misc";
import { Link } from "react-router-dom";
import { useState } from "react";
import { h2AspectOrder, parseTimetoms } from "./Data/Misc";
import { p9data } from "./Data/P9Data";
import { testData } from "./Data/P9TestData";
import { p9boons_reverse, p9boons, allP9 } from "./Data/P9BoonObj";
import Background from "./Comp/Background";

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
const highfear = p9data.slice().sort((a, b) => {
  const feaDiff = +b.fea - +a.fea;
  if (feaDiff !== 0) return feaDiff;
  return parseTimetoms(a.tim) - parseTimetoms(b.tim);
});
// const highfear = testData.slice().sort((a, b) => {
//   const feaDiff = +b.fea - +a.fea;
//   if (feaDiff !== 0) return feaDiff;
//   return parseTimetoms(a.tim) - parseTimetoms(b.tim);
// });
//
const entriesOnlyVod = highfear.filter((obj) => obj.src !== "");

const availableRegion = [`Underworld`, `Surface`];

const handleLoadMore = (updater) => {
  updater((prev) => prev + 50);
};

export default function App() {
  const [region, setRegion] = useState(`All`);
  const [category, setCategory] = useState(`All`);
  const [show, setShow] = useState(20);
  const [min, setMin] = useState(22);
  const [max, setMax] = useState(67);
  const [has, setHas] = useState([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hasvod, setHasVod] = useState(false);

  const filteredBoons = allP9.filter((boon) => boon.toLowerCase().includes(query.toLowerCase()));

  const selectedHighfear = (hasvod ? entriesOnlyVod : highfear).filter((obj) => obj.fea >= min && obj.fea <= max);

  const highfear_region = region === `All` ? selectedHighfear : selectedHighfear.filter((obj) => obj.loc === region);
  const highfear_category =
    category === `All` ? highfear_region : highfear_region.filter((obj) => obj.asp === category);

  const availableAspects = (
    region === `All`
      ? [...new Set(selectedHighfear.map((obj) => obj.asp))]
      : [...new Set(highfear_region.map((obj) => obj.asp))]
  ).sort((a, b) => (h2AspectOrder.indexOf(a) > h2AspectOrder.indexOf(b) ? 1 : -1));

  //
  const filteredData = highfear_category.filter((item) => {
    // Combine all relevant fields into a single string (lowercase for case-insensitive)
    const combined = [item.cor, item.ham, item.duo, item.ele, item.mis, item.cha]
      .filter(Boolean) // remove empty strings
      .join(",") // join them into one string
      .toLowerCase();
    // Check if all "has" items exist in combined string
    return has.every((h) => combined.includes(h.toLowerCase()));
  });
  //

  const displayEntries = has.length >= 1 ? filteredData : highfear_category;

  return (
    <main className="h-full min-h-lvh relative">
      <Background />
      <Head />
      <div className="max-w-[1200px] font-[PT] text-[14px] mx-auto">
        <SideNav />
        <section className="w-full px-2">
          <div className="text-[16px] p-2 py-0 font-[Cinzel]">Highest Fear Patch 9 & 10</div>
          <div className="text-[12px] px-2 py-1 flex gap-2">
            <input
              type="number"
              className="input input-sm border-1 border-[#f18043] w-[50px]"
              value={min}
              min={22}
              max={67}
              onChange={(e) => {
                setRegion(`All`);
                setCategory(`All`);
                setMin(e.target.value);
              }}
            />
            <input
              type="number"
              className="input input-sm border-1 border-[#f18043] w-[50px]"
              value={max}
              min={22}
              max={67}
              onChange={(e) => {
                setRegion(`All`);
                setCategory(`All`);
                setMax(e.target.value);
              }}
            />
            <select
              value={region}
              className="select select-sm w-[100px] border-1 border-[#f05bdc]"
              onChange={(e) => {
                setShow(20);
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
          <div className="text-[12px] px-2 py-1 flex gap-2 relative">
            <input
              type="text"
              placeholder="Search Boons"
              className="input input-sm border-white w-[200px]"
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
          <label className="label font-[PT] text-[] text-[12px] p-1 pb-0 text-white/80">
            Require VOD
            <input
              type="checkbox"
              className=" border-white/80 checkbox checkbox-white checkbox-xs rounded checked:checkbox-warning"
              checked={hasvod}
              onChange={(e) => setHasVod(e.target.checked)}
            />
          </label>
          <div className="text-[12px] px-1 flex gap-2">
            <div>Query Data:</div>
            <div className="text-[#f05bdc] backdrop-blur-lg">Region [{region}]</div>
            <div className="text-[#00ffaa] backdrop-blur-lg">Aspect [{category}]</div>
            <div className="text-[#fff200] backdrop-blur-lg">[{displayEntries.length}]</div>
          </div>
          <div className="text-[12px] px-1 pt-1 flex gap-2">
            <div>Query Fear:</div>
            <div className="text-[#f18043] backdrop-blur-lg">Min [{min}]</div>
            <div className="text-[#f18043] backdrop-blur-lg">Max [{max}]</div>
          </div>
          {has.length >= 1 && (
            <div className="text-[12px] px-1 pt-1 flex items-center gap-1">
              <div>Query Has:</div>
              <div className="flex flex-wrap gap-0.5">
                {has.map((ite, index) => (
                  <div
                    className="text-white bg-[black] px-1 rounded border-1 border-white/20 flex gap-0.5 items-center text-[12px] cursor-pointer hover:border-[red]"
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
          <div className="text-[12px] p-1 flex gap-2">
            <div>Category Leader: </div>
            <div className="text-[#ffb700] backdrop-blur-lg">{displayEntries[0]?.nam ?? `Null`}</div>
          </div>
        </section>
        <section className="p-1 text-[12px] overflow-hidden">
          {displayEntries.slice(0, show).map((obj, index) => (
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
                  <div className="flex items-center gap-1 bg-[#101122] border-1 border-white/20 rounded px-2 py-1">
                    <div className="tooltip shrink-0">
                      <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                        <div className="text-[12px] font-[PT]">{obj.loc}</div>
                      </div>
                      <img src={`/${obj.loc}.png`} alt="Region" className="size-6" draggable={false} />
                    </div>
                    <div>
                      <div>Region</div>
                    </div>
                  </div>
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
        <div className="flex justify-center mb-4 my-2 gap-2">
          {show < displayEntries.length && (
            <button
              className="btn bg-transparent rounded border-1 border-[#00ffaa] btn-sm font-[PT]"
              onClick={() => handleLoadMore(setShow)}
            >
              Show More
            </button>
          )}
          {show > 20 && (
            <button
              className="btn bg-transparent rounded border-1 border-[#00ffaa] btn-sm font-[PT]"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Back Top
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
