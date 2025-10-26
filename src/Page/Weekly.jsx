import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { p9data } from "../Data/P9Data";
import { p11data } from "../Data/P11Data";
import { v1data } from "../Data/V1data";
import { Link } from "react-router-dom";
import BarAspect from "../Comp/BarAspect";
import BarFear from "../Comp/BarFear";

import {
  sToA,
  getYTid,
  findValue,
  findValue2,
  orderMap,
  orderMap2,
  findStatus,
  getStatusColor,
  biomeS,
  biomeU,
  handleLoadMore,
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
  const [show, setShow] = useState(25);

  const aData = [...p9data, ...p11data, ...v1data, ...(posts || [])].sort((a, b) => new Date(a.dat) - new Date(b.dat));

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
  const underworld_data = displayData.filter((obj) => obj.loc === `Underworld`);
  const surface_data = displayData.filter((obj) => obj.loc === `Surface`);

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1500px] font-[Ale] text-[11px] md:text-[12px] mx-auto px-1 overflow-hidden">
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
                    setShow(25);
                    setWeek(index);
                  }}
                >
                  {obj.week.slice(5)}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1400px] mx-auto my-6">
              <BarAspect data={displayData} title={`Aspects`} />
              <BarFear data={displayData} />
            </div>
            <div className="text-[14px] px-2 text-white flex gap-2 mt-4 mb-2">
              <div>Week: {weeklyData[week].week.slice(6)}:</div>
              <div>Entries: {displayData.length}</div>
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              {displayData.slice(0, show).map((obj, index) => (
                <div className="flex gap-2">
                  <div
                    className={`w-full p-2 py-1 flex flex-col lg:flex-row gap-1 relative overflow-hidden bg-[#1013248b] rounded shadow-[0_0_20px_black]`}
                    style={{
                      borderStyle: "solid", // Required
                      borderWidth: "4px",
                      borderImage: "url('/Misc/frame.webp') 40 stretch",
                    }}
                  >
                    <div className="absolute top-0 right-0 -z-10 h-full w-full">
                      <img
                        src={`/GUI_Card/c${obj.asp}.png`}
                        alt="Aspect"
                        className="absolute rotate-10 top-1/2 -translate-y-[50%] right-5 w-[100px] lg:w-[75px] rounded mx-auto drop-shadow-[0_0_10px_purple]"
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
                                  className={`size-7 rounded-full border-1 border-black`}
                                />
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
                              className="px-1 py-0.5 rounded-b-md text-black min-w-[40px] text-center text-[12px]"
                              style={{ backgroundColor: getStatusColor(ite) }}
                            >
                              {ite}
                            </div>
                          ))}
                      </div>
                      <div className="text-[12px] text-white my-0.5">{obj.des}</div>
                      <div className="text-gray-300 my-0.5">{obj.dat.slice(0, 10)}</div>
                    </div>
                  </div>
                  <div
                    className="hidden xl:block w-full max-w-[300px] h-auto aspect-video"
                    style={{
                      borderStyle: "solid", // Required
                      borderWidth: "4px",
                      borderImage: "url('/Misc/frame.webp') 40 stretch",
                    }}
                  >
                    {obj.src.includes(`youtu`) ? (
                      <div className="rounded aspect-video overflow-hidden w-full h-full">
                        <img
                          src={`https://img.youtube.com/vi/${getYTid(obj.src)}/maxresdefault.jpg`}
                          alt="Gameplay Video"
                          className="h-full w-full"
                          loading="lazy"
                          draggable={false}
                        />
                      </div>
                    ) : obj.src.includes(`bilibil`) ? (
                      <div className="rounded aspect-video overflow-hidden w-full h-full">
                        <img
                          src="/gameplay2.webp"
                          alt="Thumbnails"
                          className="h-full w-full"
                          loading="lazy"
                          draggable={false}
                        />
                      </div>
                    ) : (
                      <div className="hidden md:block w-full h-full">
                        <img src="/gameplay1.webp" alt="Thumbnails" className="h-full w-full" loading="lazy" />
                      </div>
                    )}
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
              {displayData.length > 25 && (
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
