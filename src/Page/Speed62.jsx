import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { v1bundle } from "../Data/DataBundle";
import { parseTimetoms, sToA, findValue, orderMap, h2AspectOrder, parsemstoTime } from "../Data/Misc";
import { p9boons } from "../Data/P9BoonObj";
import { Link } from "react-router-dom";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

import { useMemo, useState } from "react";
//
export default function Speed62() {
  const { posts, loader } = useData();
  const [pageIndex, setPageIndex] = useState(1); // current page
  const [aspect, setAspect] = useState("All");
  const [region, setRegion] = useState("Region");
  const [uplayer, setUplayer] = useState("0");

  const orderData = useMemo(() => {
    let data = [...v1bundle, ...posts]
      .filter((obj) => obj.des.includes("#speed"))
      .sort((a, b) => {
        const feaDiff = +b.fea - +a.fea;
        if (feaDiff !== 0) return feaDiff;
        return parseTimetoms(a.tim) - parseTimetoms(b.tim);
      })
      .filter((obj) => {
        const currentAspect = aspect === "All" || obj.asp === aspect;
        const currentBio = region === "Region" || obj.loc === region;
        return currentAspect && currentBio;
      });

    if (uplayer === "1") {
      const seen = new Set();
      data = data.filter((item) => {
        const key = `${item.asp}|${item.nam}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    return data;
  }, [posts, aspect, region, uplayer]);

  const ITEMS_PER_PAGE = 50;
  const TOTAL_Page = Math.ceil(orderData.length / 50);

  const paginatedData = useMemo(() => {
    const start = (pageIndex - 1) * ITEMS_PER_PAGE; // 50
    const end = start + ITEMS_PER_PAGE; // 100
    return orderData.slice(start, end);
  }, [orderData, pageIndex]);

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <SideNav />
      <div className="max-w-[1600px] text-[13px] md:text-[14px] font-[Ale] mx-auto px-1">
        {loader ? (
          <Loading />
        ) : (
          <>
            <div className="max-w-[1400px] mx-auto">
              <div className="px-2">Total Entries: {orderData.length}</div>
              <div className="flex gap-2 px-2">
                <select
                  className="select select-sm rounded-none focus:outline-none focus:border-transparent text-[13px]"
                  value={aspect}
                  onChange={(e) => {
                    setPageIndex(1);
                    setAspect(e.target.value);
                  }}
                >
                  <option value={"All"}>{`All Aspects`}</option>
                  {h2AspectOrder.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
                <select
                  className="select select-sm rounded-none focus:outline-none focus:border-transparent text-[13px]"
                  value={region}
                  onChange={(e) => {
                    setPageIndex(1);
                    setRegion(e.target.value);
                  }}
                >
                  <option value={"Region"}>All Region</option>
                  <option value={"Underworld"}>Underworld</option>
                  <option value={"Surface"}>Surface</option>
                </select>
                <select
                  className="select select-sm rounded-none focus:outline-none focus:border-transparent text-[13px]"
                  value={uplayer}
                  onChange={(e) => {
                    setPageIndex(1);
                    setUplayer(e.target.value);
                  }}
                >
                  <option value={"0"}>Non-Unique</option>
                  <option value={"1"}>Unique</option>
                </select>
              </div>
            </div>
            {/* Table Content */}
            <div className="overflow-x-scroll my-4">
              <table className="table whitespace-nowrap table-xs table-zebra max-w-[1400px] mx-auto font-[Ubuntu] bg-black/80 border-separate border-spacing-0.5 rounded-none">
                <thead className="font-[Ale] bg-black">
                  <tr>
                    <th>Idx</th>
                    <th>Name</th>
                    <th>Margin</th>
                    <th>Time</th>
                    <th>Fear</th>
                    <th>Aspect</th>
                    <th className="min-w-[120px]">Keep</th>
                    <th className="min-w-[150px]">Fammer</th>
                    <th className="min-w-[150px]">Core</th>
                    <th>Date</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.slice(0, 100).map((obj, index) => (
                    <tr key={index}>
                      <td>
                        <div className={obj.loc === `Underworld` ? `text-[#00ffaa]` : `text-[yellow]`}>{index + 1}</div>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <div>{obj.nam}</div>
                          <div className="shrink-0 size-4">
                            <img
                              src={obj.loc === `Underworld` ? `/Underworld.png` : `/Surface.png`}
                              alt="Region"
                              className="size-4"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-[#00ffaa]">
                          {index + 1 !== paginatedData.length &&
                            parsemstoTime(parseTimetoms(paginatedData[index + 1].tim) - parseTimetoms(obj.tim))}
                        </div>
                      </td>
                      <td>
                        <div>{obj.tim}</div>
                      </td>
                      <td>
                        <div>{obj.fea}</div>
                      </td>
                      <td>
                        <div className="flex gap-2 justify-between items-center">
                          <div>{obj.asp}</div>
                          {obj.des && (
                            <div className="w-[25px]">
                              <div
                                className={`tooltip ${
                                  index < paginatedData.length / 2 ? `tooltip-bottom` : `tooltip-top`
                                }`}
                              >
                                <div className="tooltip-content p-0">
                                  <div className="bg-black border border-white/10 text-white text-[13px] font-[Ale] px-2 py-1 rounded">
                                    {obj.des}
                                  </div>
                                </div>
                                <img src="/Misc/comment.png" alt="Comment" className="size-5" />
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        {obj.ks && (
                          <div className="flex gap-1">
                            {sToA(obj.ks).map((ite, index) => (
                              <div className="tooltip">
                                <div className="tooltip-content p-0">
                                  <div className="bg-black border border-white/10 text-white text-[13px] font-[Ale] px-2 py-1 rounded">
                                    {ite}
                                  </div>
                                </div>
                                <img draggable={false} src={`/buildgui/${ite}.png`} alt="Keepsake" className="size-6" />
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="flex gap-0.5">
                          {obj.fam && (
                            <div className="tooltip">
                              <div className="tooltip-content p-0">
                                <div className="bg-black border border-white/10 text-white text-[13px] font-[Ale] px-2 py-1 rounded">
                                  {obj.fam}
                                </div>
                              </div>
                              <img draggable={false} src={`/P9/${obj.fam}.png`} alt="Familiar" className="size-6" />
                            </div>
                          )}
                          {obj.ham
                            ? findValue(
                                sToA(obj.ham).sort((a, b) => {
                                  const aIndex = orderMap.get(a) ?? Infinity;
                                  const bIndex = orderMap.get(b) ?? Infinity;
                                  return aIndex - bIndex;
                                }),
                              ).map((ite, index) => (
                                <div className="tooltip">
                                  <div className="tooltip-content p-0">
                                    <div className="bg-black border border-white/10 text-white text-[13px] font-[Ale] px-2 py-1 rounded">
                                      {p9boons[ite]}
                                    </div>
                                  </div>
                                  <img draggable={false} src={`/P9/${ite}.png`} alt="Hammers" className="size-6" />
                                </div>
                              ))
                            : ``}
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-0.5">
                          {obj.cor
                            ? sToA(obj.cor).map((ite, index) => (
                                <div className="tooltip">
                                  <div className="tooltip-content p-0">
                                    <div className="bg-black border border-white/10 text-white text-[13px] font-[Ale] px-2 py-1 rounded">
                                      {p9boons[ite]}
                                    </div>
                                  </div>
                                  <img
                                    draggable={false}
                                    src={`/H2Boons/${ite}.png`}
                                    alt="Core Boon"
                                    className="size-6"
                                    loading="lazy"
                                  />
                                </div>
                              ))
                            : ``}
                        </div>
                      </td>
                      <td>
                        <div>{obj.dat.slice(0, 10)}</div>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          {obj.src && (
                            <Link to={obj.src} target="_blank" className="underline">
                              {obj.src.includes("drive.google") ? `Image` : `Video`}
                            </Link>
                          )}
                          {obj.arcana && (
                            <Link to={obj.arcana} target="_blank" className="underline">
                              Arcana
                            </Link>
                          )}
                          {obj.oath && (
                            <Link to={obj.oath} target="_blank" className="underline">
                              Vows
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination controls */}
            <div className="flex justify-center gap-4 items-center text-[14px] font-[Ale]">
              <button
                disabled={pageIndex === 1}
                onClick={() => setPageIndex((prev) => prev - 1)}
                className="min-w-[60px] bg-[white] text-black rounded cursor-pointer hover:scale-[90%] transition-transform duration-100 ease-linear"
              >
                Prev
              </button>
              <div className="text-[18px] text-white">
                {pageIndex}/{TOTAL_Page}
              </div>
              <button
                disabled={pageIndex * ITEMS_PER_PAGE >= orderData.length}
                onClick={() => setPageIndex((prev) => prev + 1)}
                className="min-w-[60px] bg-[white] text-black rounded cursor-pointer hover:scale-[90%] transition-transform duration-100 ease-linear"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
