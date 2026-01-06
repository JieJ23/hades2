import SideNav from "./Comp/Sidebar";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";

import { useData } from "./Hook/DataFetch";
import Loading from "./Hook/Loading";
import { bundleData } from "./Data/DataBundle";
// Utility
import { sToA, findValue, orderMap, parseTimetoms, getPoolColor } from "./Data/Misc";
import { p9boons } from "./Data/P9BoonObj";
import { Link } from "react-router-dom";
import { h2AspectOrder } from "./Data/Misc";

import { useMemo, useState, useEffect } from "react";

export default function App() {
  const { posts, loader } = useData();
  const [pageIndex, setPageIndex] = useState(1); // current page
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [fill, setFill] = useState("Latest");
  const [player, setPlayer] = useState("");

  const orderData = useMemo(() => {
    return [...bundleData, ...posts]
      .filter((obj) => {
        const playerMatch = player === "" || obj.nam === player;
        const categoryMatch = category === "" || obj.asp === category;
        const regionMatch = region === "" || obj.loc === region;

        return categoryMatch && regionMatch && playerMatch;
      })
      .sort((a, b) => {
        if (fill === "Latest") return new Date(b.dat) - new Date(a.dat);
        else {
          const feaDiff = +b.fea - +a.fea;
          if (feaDiff !== 0) return feaDiff;
          return parseTimetoms(a.tim) - parseTimetoms(b.tim);
        }
      });
  }, [posts, category, region, fill, player]);

  // Pagnition
  const ITEMS_PER_PAGE = 50;
  const TOTAL_Page = Math.ceil(orderData.length / 50);

  const paginatedData = useMemo(() => {
    const start = (pageIndex - 1) * ITEMS_PER_PAGE; // 50
    const end = start + ITEMS_PER_PAGE; // 100
    return orderData.slice(start, end);
  }, [orderData, pageIndex]);

  // UseEffect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const page = params.get("page");
    const region = params.get("region");
    const aspect = params.get("aspect");
    const sort = params.get("sort");
    const player = params.get("player");

    if (page && !isNaN(+page)) setPageIndex(+page);
    if (region) setRegion(region);
    if (aspect) setCategory(aspect);
    if (sort) setFill(sort);
    if (player) setPlayer(player);

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // skip first update

    const url = new URL(window.location);

    // Only add non-default values
    if (pageIndex !== 1) {
      url.searchParams.set("page", pageIndex);
    } else {
      url.searchParams.delete("page");
    }

    if (region !== "") {
      url.searchParams.set("region", region);
    } else {
      url.searchParams.delete("region");
    }

    if (category !== "") {
      url.searchParams.set("aspect", category);
    } else {
      url.searchParams.delete("aspect");
    }

    if (fill !== "Latest") {
      // whatever your default sort is
      url.searchParams.set("sort", fill);
    } else {
      url.searchParams.delete("sort");
    }

    if (player !== "") {
      url.searchParams.set("player", player);
    } else {
      url.searchParams.delete("player");
    }

    window.history.replaceState({}, document.title, url);
  }, [pageIndex, region, category, fill, mounted, player]);

  const allPlayers = [...new Set([...bundleData, ...(posts || [])].map((obj) => obj.nam))].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
  return (
    <main className="h-full min-h-lvh relative overflow-hidden text-[13px] md:text-[14px] font-[Ale] select-none">
      <Background />
      <SideNav />
      {loader ? (
        <Loading />
      ) : (
        <>
          <div className="max-w-[1400px] mx-auto">
            <div className="px-2">Total Entries: {orderData.length}</div>
            <div className="flex gap-2 px-2">
              <select
                className="select select-sm rounded-none focus:outline-none focus:border-transparent text-[13px]"
                value={category}
                onChange={(e) => {
                  setPageIndex(1);
                  setCategory(e.target.value);
                }}
              >
                <option value={""}>{`All Aspects`}</option>
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
                <option value={""}>{`All Region`}</option>
                <option value={`Surface`}>Surface</option>
                <option value={`Underworld`}>Underworld</option>
              </select>
              <select
                className="select select-sm rounded-none focus:outline-none focus:border-transparent text-[13px]"
                value={fill}
                onChange={(e) => {
                  setPageIndex(1);
                  setFill(e.target.value);
                }}
              >
                <option value={`Latest`}>Latest</option>
                <option value={`Fear`}>Fear</option>
              </select>
              <select
                className="select select-sm rounded-none focus:outline-none focus:border-transparent text-[13px]"
                value={player}
                onChange={(e) => {
                  setPageIndex(1);
                  setFill("Latest");
                  setCategory("");
                  setRegion("");
                  setPlayer(e.target.value);
                }}
              >
                <option value={""}>All Player</option>
                {allPlayers.map((ite) => (
                  <option value={ite}>{ite}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Table Content */}
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
                      <div className={obj.loc === `Underworld` ? `text-[#00ffaa]` : `text-[yellow]`}>
                        {orderData.length - (index + 50 * (pageIndex - 1))}
                      </div>
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
                    {/* <td>
                      {obj.pool && (
                        <div className="flex flex-wrap gap-0.5">
                          {sToA(obj.pool)
                            .sort()
                            .map((ite) => (
                              <div
                                className="text-black px-1 rounded-t-sm"
                                style={{
                                  backgroundColor: getPoolColor(ite),
                                }}
                              >
                                {ite.slice(0, 4)}.
                              </div>
                            ))}
                        </div>
                      )}
                    </td> */}
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

      <Footer />
    </main>
  );
}
