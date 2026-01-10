import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { v1bundle } from "../Data/DataBundle";
import { parseTimetoms, sToA, findValue, orderMap } from "../Data/Misc";
import { p9boons } from "../Data/P9BoonObj";
import { Link } from "react-router-dom";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

import { useMemo, useState } from "react";
//
export default function Speed62() {
  const { posts, loader } = useData();
  const [pageIndex, setPageIndex] = useState(1); // current page

  const orderData = useMemo(() => {
    return [...v1bundle, ...posts]
      .filter((obj) => obj.des.includes("#speed"))
      .sort((a, b) => {
        const feaDiff = +b.fea - +a.fea;
        if (feaDiff !== 0) return feaDiff;
        return parseTimetoms(a.tim) - parseTimetoms(b.tim);
      });
  }, [posts]);

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
      <div className="max-w-[1600px] font-[Ubuntu] text-[10px] md:text-[11px] mx-auto px-1">
        {loader ? (
          <Loading />
        ) : (
          <>
            <div className="overflow-x-scroll my-4">
              <table className="table whitespace-nowrap table-xs table-zebra max-w-[1400px] mx-auto font-[Ubuntu] bg-black/50 border-separate border-spacing-0.5 rounded-none">
                <thead className="font-[Ale] bg-black">
                  <tr>
                    <th>Idx</th>
                    <th>Name</th>
                    <th>Fear</th>
                    <th>Aspect</th>
                    <th className="min-w-[120px]">Keep</th>
                    <th className="min-w-[150px]">Fammer</th>
                    <th className="min-w-[150px]">Core</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th className="min-w-[100px]">Link</th>
                    {/* <th className="min-w-[250px]">Pool</th> */}
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
                                })
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
                        <div>{obj.tim}</div>
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
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
