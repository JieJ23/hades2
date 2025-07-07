import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";
import { sToA } from "./Data/Misc";
import { Link } from "react-router-dom";
import { useState } from "react";
import { h2AspectOrder, parseTimetoms, daysAgo } from "./Data/Misc";
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
const entriesByData = highfear.slice().sort((a, b) => new Date(b.dat) - new Date(a.dat));

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

  const selectedHighfear = (hasvod ? entriesOnlyVod : region === `Latest` ? entriesByData : highfear).filter(
    (obj) => obj.fea >= min && obj.fea <= max
  );

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
      <div className="max-w-[1200px] font-[Source] text-[12px] md:text-[13px] mx-auto">
        <SideNav />
        <section className="w-full px-2">
          <div className="text-[15px] p-2 py-0 font-[Cinzel]">Highest Fear Patch 9 & 10</div>
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
            <div className="flex items-center w-full rounded px-2 py-1 bg-[#000000b5] gap-2 relative mb-4" key={index}>
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
                <img src={`/GUI_Card/${obj.fam}.png`} alt="Familiar" className="w-[80px] rounded" draggable={false} />
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
      </div>
    </main>
  );
}
