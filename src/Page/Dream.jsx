import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";
import { bundleData } from "../Data/DataBundle";
// Utility
import { sToA, findValue, orderMap, parseTimetoms, getPoolColor, getYTid } from "../Data/Misc";
import { p9boons } from "../Data/P9BoonObj";
import { Link } from "react-router-dom";
import { h2AspectOrder } from "../Data/Misc";

import { useMemo, useState, useEffect } from "react";
import PageBlock from "../Block/PageBlock";

export default function Dream() {
  const { posts, loader } = useData();
  const [pageIndex, setPageIndex] = useState(1); // current page
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState("");
  const [fill, setFill] = useState("Latest");
  const [format, setFormat] = useState("Grid");
  const [vidOnly, setVidOnly] = useState(true);

  const orderData = useMemo(() => {
    return [...bundleData, ...posts]
      .filter((obj) => obj.loc !== "Underworld" && obj.loc !== "Surface")
      .filter((obj) => {
        const categoryMatch = category === "" || obj.asp === category;
        const videoOnly = vidOnly ? obj.src.includes("youtu") : obj;

        return categoryMatch && videoOnly;
      })
      .sort((a, b) => {
        if (fill === "Latest") return new Date(b.dat) - new Date(a.dat);
        else {
          const feaDiff = +b.fea - +a.fea;
          if (feaDiff !== 0) return feaDiff;
          return parseTimetoms(a.tim) - parseTimetoms(b.tim);
        }
      });
  }, [posts, category, fill, vidOnly]);

  // Pagnition
  const ITEMS_PER_PAGE = 25;
  const TOTAL_Page = Math.ceil(orderData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (pageIndex - 1) * ITEMS_PER_PAGE; // 50
    const end = start + ITEMS_PER_PAGE; // 100
    return orderData.slice(start, end);
  }, [orderData, pageIndex]);

  // UseEffect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const page = params.get("page");
    const aspect = params.get("aspect");
    const sort = params.get("sort");

    if (page && !isNaN(+page)) setPageIndex(+page);
    if (aspect) setCategory(aspect);
    if (sort) setFill(sort);

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // skip first update

    const url = new URL(window.location);

    if (pageIndex !== 1) {
      url.searchParams.set("page", pageIndex);
    } else {
      url.searchParams.delete("page");
    }

    if (category !== "") {
      url.searchParams.set("aspect", category);
    } else {
      url.searchParams.delete("aspect");
    }

    if (fill !== "Latest") {
      url.searchParams.set("sort", fill);
    } else {
      url.searchParams.delete("sort");
    }

    window.history.replaceState({}, document.title, url);
  }, [pageIndex, category, fill, mounted]);

  const allPlayers = [...new Set([...bundleData, ...(posts || [])].map((obj) => obj.nam))].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );

  return (
    <main className="h-full min-h-lvh relative overflow-hidden text-[14px] font-[Ale] select-none">
      <PageBlock>
        {loader ? (
          <Loading />
        ) : (
          <div className="py-16">
            <div className="py-2 my-2">
              <div className="px-2">Total Entries: {orderData.length}</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-2">
                <select
                  className="w-full select select-sm bg-[#0e0c12] rounded border focus:outline-none focus:border-transparent"
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
                  className="w-full select select-sm bg-[#0e0c12] rounded border focus:outline-none focus:border-transparent"
                  value={fill}
                  onChange={(e) => {
                    setPageIndex(1);
                    setFill(e.target.value);
                  }}
                >
                  <option value={`Latest`}>Latest</option>
                  <option value={`Fear`}>Fear</option>
                </select>
              </div>
            </div>
            <div className="my-1 flex justify-center gap-1 font-[UbuntuMono]">
              <button
                className={`min-w-15 cursor-pointer  px-1 py-0.5 rounded text-center ${format === "List" ? `bg-white text-black` : ``}`}
                onClick={() => setFormat("List")}
              >
                List
              </button>
              <button
                className={`min-w-15 cursor-pointer  px-1 py-0.5 rounded text-center ${format === "Grid" ? `bg-white text-black` : ``}`}
                onClick={() => setFormat("Grid")}
              >
                Grid
              </button>
              <button
                className={`min-w-15 cursor-pointer  px-1 py-0.5 rounded text-center ${vidOnly === true ? `bg-white text-black` : ``}`}
                onClick={() => {
                  setVidOnly(!vidOnly);
                  setPageIndex(1);
                }}
              >
                Video
              </button>
            </div>
            {/* Table Content */}
            {format === "Grid" ? (
              <div className="p-2">
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {paginatedData.slice(0, 25).map((obj, index) => (
                    <div className="rounded">
                      {obj.src.includes("youtu") ? (
                        <Link to={obj.src} target="_blank" className="group">
                          <img
                            src={`https://img.youtube.com/vi/${getYTid(obj.src)}/maxresdefault.jpg`}
                            alt="Video Thumbnail"
                            className="aspect-video w-full group-hover:scale-95 duration-150 rounded-lg"
                            loading="lazy"
                            onLoad={(e) => {
                              if (e.currentTarget.naturalWidth === 120 && e.currentTarget.naturalHeight === 90) {
                                e.currentTarget.src = "./dream.webp";
                              }
                            }}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "./dream.webp";
                            }}
                          />
                        </Link>
                      ) : (
                        <Link to={obj.src} target="_blank" className="group">
                          <img
                            src={`/melinoe.webp`}
                            alt="Cover Img"
                            className="aspect-video w-full group-hover:scale-95 duration-150 rounded-lg"
                            loading="lazy"
                          />
                        </Link>
                      )}
                      <div className="px-2 pb-1">
                        <div className="flex flex-wrap justify-center gap-1 my-1">
                          <span className="font-[Sr]">{obj.fea}</span>
                          <span className="text-orange-400">{obj.nam}</span>
                          <span>{obj.asp}</span>:<span>{obj.tim}</span>
                        </div>
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="flex">
                            {obj.fam && (
                              <div className="relative size-10 sm:size-8 shrink-0">
                                <img
                                  src="/BoonBorder/Legendary.png"
                                  alt="Border"
                                  className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                                />
                                <img
                                  draggable={false}
                                  src={`/P9/${obj.fam}.png`}
                                  alt="Familiar"
                                  className="absolute inset-0 w-full h-full p-1 object-contain"
                                />
                              </div>
                            )}
                            {obj.ham &&
                              findValue(sToA(obj.ham)).map((ite, index) => (
                                <div className="tooltip">
                                  <div className="tooltip-content p-0">
                                    <div className=" border border-white/10 text-white font-[Ale] px-2 py-1 rounded">
                                      {p9boons[ite]}
                                    </div>
                                  </div>
                                  <div className="relative size-10 sm:size-8 shrink-0">
                                    <img
                                      src="/BoonBorder/Hammer.png"
                                      alt="Border"
                                      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                                    />
                                    <img
                                      src={`/P9/${ite}.png`}
                                      alt="Hammers"
                                      className="absolute inset-0 w-full h-full p-1 object-contain"
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                          {obj.ks && (
                            <div className="flex">
                              {sToA(obj.ks).map((ite, index) => (
                                <div className="relative size-10 sm:size-8 shrink-0">
                                  <img
                                    src="/BoonBorder/Common.png"
                                    alt="Border"
                                    className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                                  />
                                  <img
                                    draggable={false}
                                    src={`/buildgui/${ite}.png`}
                                    alt="Keepsake"
                                    className="absolute inset-0 w-full h-full p-1.5 object-contain"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-start">
                          {obj.cor
                            ? sToA(obj.cor).map((ite, index) => (
                                <div className="relative size-10 sm:size-8 shrink-0">
                                  <img
                                    src="/BoonBorder/Common.png"
                                    alt="Border"
                                    className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                                  />
                                  <img
                                    src={`/H2Boons/${ite}.png`}
                                    alt="Core Boon"
                                    className="absolute inset-0 w-full h-full p-1 object-contain"
                                  />
                                </div>
                              ))
                            : ``}
                        </div>
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
                        <div className="flex justify-start gap-0.5 py-1">
                          {sToA(obj.loc).map((item) => (
                            <div className="border border-white/10 bg-[#0e0c12] font-[UbuntuMono] px-1 rounded uppercase">
                              {item}
                            </div>
                          ))}
                        </div>
                        <div className="line-clamp-2 leading-[1.2] min-h-8 text-gray-400">{obj.des}</div>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            ) : (
              <div className="overflow-x-scroll py-2 my-2">
                <table className="table whitespace-nowrap table-xs font-[Ale] rounded-none">
                  <thead className="font-[Ale]">
                    <tr>
                      <th>Idx</th>
                      <th>Name</th>
                      <th>Fear</th>
                      <th className="min-w-30 w-30">Biome</th>
                      <th>Aspect</th>
                      <th className="min-w-30 w-30">Keep</th>
                      <th className="min-w-40 w-40">Fammer</th>
                      <th className="min-w-40 w-40">Core</th>
                      <th>Time</th>
                      <th>Date</th>
                      <th className="min-w-25">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.slice(0, 100).map((obj, index) => (
                      <tr key={index} className="text-[14px]">
                        <td className="border-0 border-y border-y-white/5">
                          <div className={`text-pink-500`}>
                            {/* {orderData.length - (index + 25 * (pageIndex - 1))} */}
                            {index + 1 + ITEMS_PER_PAGE * (pageIndex - 1)}
                          </div>
                        </td>
                        <td className="border-0 border-y border-y-white/5">
                          <div className="flex gap-1">
                            <div>{obj.nam}</div>
                          </div>
                        </td>
                        <td className="border-0 border-y border-y-white/5">
                          <div>{obj.fea}</div>
                        </td>
                        <td className="border-0 border-y border-y-white/5">
                          <div className="flex gap-1">
                            {sToA(obj.loc).map((ite, index) => (
                              <div className="tooltip shrink-0">
                                <div className="tooltip-content p-0">
                                  <div className="bg-black border border-white/10 text-white font-[Ale] px-2 py-1 rounded">
                                    {ite}
                                  </div>
                                </div>
                                <img draggable={false} src={`/DreamDive/${ite}.png`} alt="Biome" className="size-6" />
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="border-0 border-y border-y-white/5">
                          <div className="flex gap-2 justify-between items-center">
                            <div>{obj.asp}</div>
                            {obj.des && (
                              <div className="w-6.25">
                                <div
                                  className={`tooltip ${
                                    index < paginatedData.length / 2 ? `tooltip-bottom` : `tooltip-top`
                                  }`}
                                >
                                  <div className="tooltip-content p-0">
                                    <div className="bg-black border border-white/10 text-white font-[Ale] px-2 py-1 rounded">
                                      {obj.des}
                                    </div>
                                  </div>
                                  <img src="/Misc/comment.png" alt="Comment" className="size-5" />
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="border-0 border-y border-y-white/5">
                          {obj.ks && (
                            <div className="flex gap-1">
                              {sToA(obj.ks).map((ite, index) => (
                                <div className="tooltip shrink-0">
                                  <div className="tooltip-content p-0">
                                    <div className="bg-black border border-white/10 text-white font-[Ale] px-2 py-1 rounded">
                                      {ite}
                                    </div>
                                  </div>
                                  <img
                                    draggable={false}
                                    src={`/buildgui/${ite}.png`}
                                    alt="Keepsake"
                                    className="size-6"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="border-0 border-y border-y-white/5">
                          <div className="flex gap-0.5">
                            {obj.fam && (
                              <div className="tooltip">
                                <div className="tooltip-content p-0">
                                  <div className="bg-black border border-white/10 text-white font-[Ale] px-2 py-1 rounded">
                                    {obj.fam}
                                  </div>
                                </div>
                                <img draggable={false} src={`/P9/${obj.fam}.png`} alt="Familiar" className="size-6" />
                              </div>
                            )}
                            {obj.ham &&
                              findValue(sToA(obj.ham)).map((ite, index) => (
                                <div className="tooltip">
                                  <div className="tooltip-content p-0">
                                    <div className="bg-black border border-white/10 text-white font-[Ale] px-2 py-1 rounded">
                                      {p9boons[ite]}
                                    </div>
                                  </div>
                                  <img draggable={false} src={`/P9/${ite}.png`} alt="Hammers" className="size-6" />
                                </div>
                              ))}
                          </div>
                        </td>
                        <td className="border-0 border-y border-y-white/5">
                          <div className="flex gap-0.5">
                            {obj.cor
                              ? sToA(obj.cor).map((ite, index) => (
                                  <div className="tooltip">
                                    <div className="tooltip-content p-0">
                                      <div className="bg-black border border-white/10 text-white font-[Ale] px-2 py-1 rounded">
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
                        <td className="border-0 border-y border-y-white/5">
                          <div>{obj.tim}</div>
                        </td>
                        <td className="border-0 border-y border-y-white/5">
                          <div>{obj.dat.slice(0, 10)}</div>
                        </td>
                        <td className="border-0 border-y border-y-white/5">
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
            )}
            {/* Pagination controls */}
            <div className="flex justify-center gap-4 items-center text-[14px] font-[UbuntuMono] py-2 my-2">
              <button
                disabled={pageIndex === 1}
                onClick={() => setPageIndex((prev) => prev - 1)}
                className="min-w-15 bg-[white] text-black rounded cursor-pointer hover:scale-[90%] transition-transform duration-100 ease-linear"
              >
                Prev
              </button>
              <div className="text-[18px] text-white font-[Ale]">
                {pageIndex}/{TOTAL_Page}
              </div>
              <button
                disabled={pageIndex * ITEMS_PER_PAGE >= orderData.length}
                onClick={() => setPageIndex((prev) => prev + 1)}
                className="min-w-15 bg-[white] text-black rounded cursor-pointer hover:scale-[90%] transition-transform duration-100 ease-linear"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </PageBlock>
    </main>
  );
}
