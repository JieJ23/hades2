import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { p9data } from "../Data/P9Data";
import { p11data } from "../Data/P11Data";
import { v1data } from "../Data/V1data";
import { Link } from "react-router-dom";
import BarAspect from "../Comp/BarAspect";
import BarFear from "../Comp/BarFear";

import { ttarray } from "../Data/TT";
import { ttID } from "../Data/TTid";
import {
  sToA,
  findValue,
  findValue2,
  orderMap,
  orderMap2,
  findStatus,
  getStatusColor,
  handleLoadMore,
  parseTimetoms,
  getYTid,
} from "../Data/Misc";
import { boonCodex } from "../Data/Boon2";
import { p9boons } from "../Data/P9BoonObj";
import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";
import { useState } from "react";
//

function getISOWeekKey(dateStr) {
  const date = new Date(dateStr);
  const target = new Date(date.valueOf());

  // Set to nearest Thursday (ISO week date standard)
  const dayNr = (date.getUTCDay() + 6) % 7; // Monday = 0, Sunday = 6
  target.setUTCDate(target.getUTCDate() - dayNr + 3);

  // First week of the year starts on the Monday of the week containing Jan 4
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const firstWeekDayNr = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstWeekDayNr + 3);

  // Calculate week number
  const weekNo = 1 + Math.round((target - firstThursday) / (7 * 24 * 60 * 60 * 1000));

  return `${target.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}
//

export default function Weekly() {
  const { posts, loader } = useData();
  const [week, setWeek] = useState(0);
  const [show, setShow] = useState(20);

  const aData = [...p9data, ...p11data, ...v1data, ...(posts || [])].sort((a, b) => {
    const feaDiff = +b.fea - +a.fea;
    if (feaDiff !== 0) return feaDiff;
    return parseTimetoms(a.tim) - parseTimetoms(b.tim);
  });

  const groupedByWeek = aData.reduce((acc, item) => {
    const weekKey = getISOWeekKey(item.dat);
    acc[weekKey] = acc[weekKey] || [];
    acc[weekKey].push(item);
    return acc;
  }, {});

  // Step 4. Convert to sorted array (optional)
  const weeklyData = Object.entries(groupedByWeek)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, items]) => ({ week, items }))
    .reverse();

  const displayData = weeklyData[week].items.sort((a, b) => +b.fea - +a.fea);

  //
  const firstplace_surface = [];
  const firstplace_uw = [];
  for (let i = 0; i < weeklyData.length; i++) {
    const firstEntries = weeklyData[i].items.filter((obj) => obj.loc === `Surface`)[0];
    const secondEntries = weeklyData[i].items.filter((obj) => obj.loc === `Underworld`)[0];
    firstplace_surface.push(firstEntries);
    firstplace_uw.push(secondEntries);
  }

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1500px] font-[Ale] text-[11px] md:text-[12px] mx-auto px-1">
        <SideNav />
        {loader ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-1 mb-4 mt-2">
              {weeklyData.map((obj, index) => (
                <div
                  className={`${
                    week === index ? `bg-[#00ffaa]` : ` bg-white`
                  } text-black px-3 py-1 rounded cursor-pointer`}
                  onClick={() => {
                    setShow(20);
                    setWeek(index);
                  }}
                >
                  {obj.week.slice(5)}
                </div>
              ))}
            </div>
            {/*  */}
            {loader ? (
              <Loading />
            ) : (
              <div className="flex flex-col gap-1 overflow-x-scroll border-2 rounded border-black">
                <div className="flex gap-1">
                  {firstplace_surface.map((obj, index) => (
                    <div className="bg-gradient-to-b from-[black] via-[#131111] to-[#ffff0050] min-w-[120px] text-center p-2 rounded-sm flex flex-col justify-between select-none">
                      <div>Week #{weeklyData[index].week.slice(6)}</div>
                      <div className="line-clamp-1 text-[yellow]">{obj.nam}</div>
                      <div>{obj.fea}</div>
                      <div>{obj.tim}</div>
                      <div>{obj.asp}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-1">
                  {firstplace_uw.map((obj, index) => (
                    <div className="bg-gradient-to-b from-[black] via-[#131111] to-[#00ffaa50] min-w-[120px] text-center p-2 rounded-sm flex flex-col justify-between select-none">
                      <div>Week #{weeklyData[index].week.slice(6)}</div>
                      <div className="line-clamp-1 text-[#00ffaa]">{obj.nam}</div>
                      <div>{obj.fea}</div>
                      <div>{obj.tim}</div>
                      <div>{obj.asp}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1400px] mx-auto my-6">
              <BarAspect data={displayData} title={`Aspects`} />
              <BarFear data={displayData} />
            </div>
            <div className="text-[14px] px-2 text-white flex gap-2 mt-4 mb-2">
              <div>Week: {weeklyData[week].week.slice(6)}:</div>
              <div>Entries: {displayData.length}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {displayData.slice(0, show).map((obj, index) => (
                <div className="flex gap-2 relative" key={index}>
                  <div className="absolute w-[55%] h-auto top-1 right-1 p-1">
                    {obj.src.includes(`youtu`) && (
                      <img
                        src={`https://img.youtube.com/vi/${getYTid(obj.src)}/mqdefault.jpg`}
                        alt="Gameplay Video"
                        className="w-full h-full rounded"
                        loading="lazy"
                        draggable={false}
                      />
                    )}
                  </div>
                  <div
                    className={`w-full p-2 py-1 flex flex-col relative bg-[#1013248b] rounded shadow-[0_0_20px_black]`}
                    style={{
                      borderStyle: "solid",
                      borderWidth: "4px",
                      borderImage: "url('/Misc/frame.webp') 40 stretch",
                    }}
                  >
                    <div className="w-full text-[14px]">
                      <div
                        className={`flex justify-start ${
                          obj.loc === `Underworld` ? `text-[#00ffaa]` : `text-[yellow]`
                        }`}
                      >
                        <div>
                          {obj.fea} | {obj.nam} | {obj.tim}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-[9px] font-[Ubuntu] my-1">
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
                    <div className="w-full h-full">
                      {obj.ks && (
                        <div className="flex flex-wrap just gap-0.5 rounded font-[Ubuntu] text-[10px]">
                          {sToA(obj.ks).map((ite, index) => (
                            <img
                              draggable={false}
                              src={`/buildgui/${ite}.png`}
                              alt="Keepsake"
                              className="size-7 border-1 border-black p-0.5"
                            />
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
                              className="size-7 rounded border-1 border-black"
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
                              className="size-7 rounded border-1 border-black"
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
                                  className="size-7 rounded border-1 border-black"
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
                                className="size-7 rounded border-1 border-black"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      {obj.boon && (
                        <div className="flex items-center flex-wrap my-1 relative">
                          <div className="flex flex-wrap gap-0.5 rounded">
                            {findValue2(
                              sToA(obj.boon).sort((a, b) => {
                                const aIndex = orderMap2.get(a) ?? Infinity;
                                const bIndex = orderMap2.get(b) ?? Infinity;
                                return aIndex - bIndex;
                              })
                            ).map((ite, index) => (
                              <div className="group inline-block">
                                <img
                                  draggable={false}
                                  src={`/P9/${ite}.png`}
                                  alt="Core Boon"
                                  className="size-7 rounded border border-black cursor-pointer"
                                />

                                {/* Tooltip content */}
                                <div className="absolute left-1/2 bottom-full hidden w-[90%] -translate-x-1/2 group-hover:flex flex-col items-center z-50">
                                  <div className="relative bg-black text-white text-[12px]">
                                    <div
                                      className="flex h-[40px] w-full min-w-[250px] items-center justify-center text-[14px]"
                                      style={{
                                        backgroundImage: `
            url('/Misc/fl.webp'),
            url('/Misc/fr.webp'),
            url('/Misc/fm.webp')
          `,
                                        backgroundPosition: "left center, right center, center center",
                                        backgroundRepeat: "no-repeat, no-repeat, repeat",
                                        backgroundSize: "contain, contain, contain",
                                      }}
                                    >
                                      {ttarray[ttID[boonCodex[ite]]]
                                        ? ttarray[ttID[boonCodex[ite]]].BoonName
                                        : boonCodex[ite]}
                                    </div>

                                    {ttarray[ttID[boonCodex[ite]]] && (
                                      <div className="text-start flex flex-col gap-2 font-[Ubuntu] text-[11px] p-2">
                                        <div>Category: {ttarray[ttID[boonCodex[ite]]].Category}</div>
                                        <div>Type: {ttarray[ttID[boonCodex[ite]]].Purpose}</div>
                                        <div>{ttarray[ttID[boonCodex[ite]]].Description}</div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-full mx-auto">
                      <div className="flex flex-wrap gap-1 rounded my-1">
                        {displayData.length > 0 &&
                          findStatus(obj).map((ite) => (
                            <div
                              className="px-1 rounded-none text-black text-center"
                              style={{ backgroundColor: getStatusColor(ite) }}
                            >
                              {ite}
                            </div>
                          ))}
                      </div>
                      <div className="text-gray-300 my-0.5 text-end">{obj.dat.slice(0, 10)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center my-4 gap-2">
              {show < displayData.length && (
                <button
                  className="px-2 py-1 rounded bg-white text-black cursor-pointer"
                  onClick={() => handleLoadMore(setShow)}
                >
                  Show More
                </button>
              )}
              {displayData.length > 20 && (
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
        )}
      </div>
      <Footer />
    </main>
  );
}
