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
import { bAxe, bDagger, bLob, bStaff, bSuit, bTorch } from "../Data/Boon1";

import PageBlock from "../Block/PageBlock";

import { useMemo, useState, useEffect } from "react";

const allAvailableHammers = Object.values({ ...bAxe, ...bDagger, ...bLob, ...bStaff, ...bSuit, ...bTorch }).sort();

export default function Night() {
  const { posts, loader } = useData();
  const [pageIndex, setPageIndex] = useState(1); // current page
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [fill, setFill] = useState("Latest");
  const [player, setPlayer] = useState("");
  const [format, setFormat] = useState("Grid");
  const [vidOnly, setVidOnly] = useState(false);
  // Filter Depth
  const [fearMin, setFearMin] = useState(0);
  const [fearMax, setFearMax] = useState(67);
  const [timeMin, setTimeMin] = useState(0);
  const [timeMax, setTimeMax] = useState(30);
  const [hasHammer, setHasHammer] = useState([]);
  const [doNotHammer, setDoNotHammer] = useState([]);

  const orderData = useMemo(() => {
    return [...bundleData, ...posts]
      .filter((obj) => obj.fea >= fearMin && obj.fea <= fearMax)
      .filter((obj) => parseTimetoms(obj.tim) >= timeMin * 6000 && parseTimetoms(obj.tim) <= timeMax * 6000)
      .filter((obj) => {
        const playerMatch = player === "" || obj.nam === player;
        const categoryMatch = category === "" || obj.asp === category;
        const regionMatch =
          region === ""
            ? true
            : region === "Underworld" || region === "Surface"
              ? obj.loc === region
              : obj.loc !== "Underworld" && obj.loc !== "Surface";
        const videoOnly = vidOnly ? obj.src.includes("youtu") : obj;
        const includeHammer = hasHammer.length === 0 || hasHammer.every((hammer) => obj.ham?.includes(hammer));

        const includeNotHammer = doNotHammer.length === 0 || doNotHammer.every((hammer) => !obj.ham?.includes(hammer));

        return categoryMatch && regionMatch && playerMatch && videoOnly && includeHammer && includeNotHammer;
      })
      .sort((a, b) => {
        if (fill === "Latest") return new Date(b.dat) - new Date(a.dat);
        if (fill === "Oldest") return new Date(a.dat) - new Date(b.dat);
        else {
          const feaDiff = +b.fea - +a.fea;
          if (feaDiff !== 0) return feaDiff;
          return parseTimetoms(a.tim) - parseTimetoms(b.tim);
        }
      });
  }, [posts, category, region, fill, player, vidOnly, fearMin, fearMax, timeMin, timeMax, hasHammer, doNotHammer]);

  // Pagnition
  const ITEMS_PER_PAGE = 20;
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
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );

  return (
    <PageBlock>
      {loader ? (
        <Loading />
      ) : (
        <div className="py-8">
          <div className="drawer">
            <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content p-1 flex gap-1">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-1"
                className="drawer-button rounded bg-white text-black p-1 py-0.5 font-[UbuntuMono] inline-block min-w-15 text-center"
              >
                Filter
              </label>
              <button
                className={`min-w-15 font-[UbuntuMono] cursor-pointer  px-1 py-0.5 rounded text-center bg-white text-black`}
                onClick={() => {
                  setFearMin(0);
                  setFearMax(67);
                  setTimeMin(0);
                  setTimeMax(30);
                  setHasHammer([]);
                }}
              >
                Reset
              </button>
            </div>
            <div className="drawer-side z-40">
              <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
              <div className="flex flex-col gap-2 bg-[#0e0c12] w-[80%] max-w-80 h-full p-4 relative">
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-10 bg-center -z-10"
                  style={{
                    backgroundImage: "url(hadestwo.webp)",
                  }}
                />
                <div className="px-2">Entries: {orderData.length}</div>
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
                  value={region}
                  onChange={(e) => {
                    setPageIndex(1);
                    setRegion(e.target.value);
                  }}
                >
                  <option value={""}>{`All Region`}</option>
                  <option value={`Surface`}>Surface</option>
                  <option value={`Underworld`}>Underworld</option>
                  <option value={`Dream`}>Dream</option>
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
                  <option value={`Oldest`}>Oldest</option>
                  <option value={`Fear`}>Fear</option>
                </select>
                <select
                  className="w-full select select-sm bg-[#0e0c12] rounded border focus:outline-none focus:border-transparent"
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
                <div className="flex text-center gap-2">
                  <div className="w-full">
                    <div>Min Fear</div>
                    <select
                      className="w-full select select-sm bg-[#0e0c12] rounded border focus:outline-none focus:border-transparent"
                      value={fearMin}
                      onChange={(e) => {
                        setPageIndex(1);
                        setFearMin(e.target.value);
                      }}
                    >
                      {Array.from({ length: 68 }).map((_, index) => (
                        <option value={index}>{index}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <div>Max Fear</div>
                    <select
                      className="w-full select select-sm bg-[#0e0c12] rounded border focus:outline-none focus:border-transparent"
                      value={fearMax}
                      onChange={(e) => {
                        setPageIndex(1);
                        setFearMax(e.target.value);
                      }}
                    >
                      {Array.from({ length: 68 }).map((_, index) => (
                        <option value={index}>{index}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex text-center gap-2">
                  <div className="w-full">
                    <div>Min Time (M)</div>
                    <select
                      className="w-full select select-sm bg-[#0e0c12] rounded border focus:outline-none focus:border-transparent"
                      value={timeMin}
                      onChange={(e) => {
                        setPageIndex(1);
                        setTimeMin(e.target.value);
                      }}
                    >
                      {Array.from({ length: 31 }).map((_, index) => (
                        <option value={index}>{index}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <div>Max Time (M)</div>
                    <select
                      className="w-full select select-sm bg-[#0e0c12] rounded border focus:outline-none focus:border-transparent"
                      value={timeMax}
                      onChange={(e) => {
                        setPageIndex(1);
                        setTimeMax(e.target.value);
                      }}
                    >
                      {Array.from({ length: 31 }).map((_, index) => (
                        <option value={index}>{index}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <select
                  className="w-full select select-sm bg-[#0e0c12] rounded border focus:outline-none focus:border-transparent"
                  defaultValue={"Include Hammer"}
                  value={hasHammer[0] || "Include Hammer"}
                  onChange={(e) => {
                    setPageIndex(1);
                    setHasHammer((prev) => {
                      if (prev.length >= 4) return prev;
                      if (prev.includes(e.target.value)) return prev;
                      return [...prev, e.target.value];
                    });
                  }}
                >
                  <option disabled={true}>{`Include Hammer`}</option>
                  {allAvailableHammers.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
                <select
                  className="w-full select select-sm bg-[#0e0c12] rounded border focus:outline-none focus:border-transparent"
                  defaultValue={"Not Include Hammer"}
                  value={doNotHammer[0] || "Not Include Hammer"}
                  onChange={(e) => {
                    setPageIndex(1);
                    setDoNotHammer((prev) => {
                      if (prev.length >= 4) return prev;
                      if (prev.includes(e.target.value)) return prev;
                      return [...prev, e.target.value];
                    });
                  }}
                >
                  <option disabled={true}>{`Not Include Hammer`}</option>
                  {allAvailableHammers.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="my-1 flex justify-start gap-1 font-[UbuntuMono] p-1">
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
          <div className="p-1 flex gap-1 flex-wrap font-[Ale] text-black">
            {fearMin !== 0 && <div className="bg-purple-400 p-2 py-1 rounded-r-xl rounded-l">Min Fear: {fearMin}</div>}
            {fearMax !== 67 && <div className="bg-purple-400 p-2 py-1 rounded-r-xl rounded-l">Max Fear: {fearMax}</div>}
            {timeMin !== 0 && <div className="bg-yellow-400 p-2 py-1 rounded-r-xl rounded-l">Min Time: {timeMin}</div>}
            {timeMax !== 30 && <div className="bg-yellow-400 p-2 py-1 rounded-r-xl rounded-l">Max Time: {timeMax}</div>}
            {hasHammer.length > 0 &&
              hasHammer.map((item) => (
                <div
                  className="bg-blue-400 p-2 py-1 rounded-r-xl rounded-l cursor-pointer"
                  onClick={() => setHasHammer((prev) => prev.filter((hammer) => hammer !== item))}
                >
                  Has: {item}
                </div>
              ))}
            {doNotHammer.length > 0 &&
              doNotHammer.map((item) => (
                <div
                  className="bg-red-400 p-2 py-1 rounded-r-xl rounded-l cursor-pointer"
                  onClick={() => setDoNotHammer((prev) => prev.filter((hammer) => hammer !== item))}
                >
                  Not Include: {item}
                </div>
              ))}
          </div>
          {/* Table Content */}
          {format === "Grid" ? (
            <div className="p-2">
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 gap-y-4">
                {paginatedData.map((obj, index) => (
                  <div className="rounded">
                    {obj.src.includes("youtu") ? (
                      <Link to={obj.src} target="_blank" className="group">
                        <img
                          src={`https://img.youtube.com/vi/${getYTid(obj.src)}/maxresdefault.jpg`}
                          alt="Video Thumbnail"
                          className="aspect-video w-full rounded border border-black/50"
                          loading="lazy"
                          draggable={false}
                          onLoad={(e) => {
                            if (e.currentTarget.naturalWidth === 120 && e.currentTarget.naturalHeight === 90) {
                              e.currentTarget.src = `/Misc/${obj.loc}.webp`;
                            }
                          }}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `/Misc/${obj.loc}.webp`;
                          }}
                        />
                      </Link>
                    ) : (
                      <Link to={obj.src} target="_blank" className="group">
                        {obj.loc === "Underworld" ? (
                          <div className="relative">
                            <div className="absolute inset-0 flex justify-center items-center">
                              <img
                                src={`/FullAspects/${obj.asp}.webp`}
                                alt="Victory Screen"
                                className="w-[50%] h-auto translate-x-3 drop-shadow-[0_0_10px_purple]"
                                loading="lazy"
                              />
                            </div>
                            <img
                              src={`/GUI_Card/${obj.fam}.png`}
                              alt="Victory Screen"
                              className="absolute bottom-2 right-2 w-15 sm:w-12 h-auto"
                              loading="lazy"
                            />
                            <img
                              src={`/Misc/Underworld.webp`}
                              alt="Victory Screen"
                              className="aspect-video w-full rounded border border-black/50"
                              loading="lazy"
                              draggable={false}
                            />
                          </div>
                        ) : obj.loc === "Surface" ? (
                          <div className="relative">
                            <div className="absolute inset-0 flex justify-center items-center">
                              <img
                                src={`/FullAspects/${obj.asp}.webp`}
                                alt="Victory Screen"
                                className="w-[50%] h-auto translate-x-3 drop-shadow-[0_0_10px_purple]"
                                loading="lazy"
                              />
                            </div>
                            <img
                              src={`/GUI_Card/${obj.fam}.png`}
                              alt="Victory Screen"
                              className="absolute bottom-2 right-2 w-15 sm:w-12 h-auto"
                              loading="lazy"
                            />
                            <img
                              src={`/Misc/Surface.webp`}
                              alt="Victory Screen"
                              className="aspect-video w-full rounded border border-black/50"
                              loading="lazy"
                              draggable={false}
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="absolute inset-0 flex justify-center items-center">
                              <img
                                src={`/FullAspects/${obj.asp}.webp`}
                                alt="Victory Screen"
                                className="w-[50%] h-auto translate-x-3 drop-shadow-[0_0_10px_purple]"
                                loading="lazy"
                              />
                            </div>
                            <img
                              src={`/GUI_Card/${obj.fam}.png`}
                              alt="Victory Screen"
                              className="absolute bottom-2 right-2 w-15 sm:w-12 h-auto"
                              loading="lazy"
                            />
                            <img
                              src={`/Misc/Dream.webp`}
                              alt="Victory Screen"
                              className="aspect-video w-full rounded border border-black/50"
                              loading="lazy"
                              draggable={false}
                            />
                          </div>
                        )}
                      </Link>
                    )}
                    <div className="p-1 flex flex-col gap-1">
                      <div className="font-[Ale] px-2">
                        <div>{obj.nam}</div>
                        <div>
                          <span>
                            {+obj.fea} | {obj.loc !== "Underworld" && obj.loc !== "Surface" ? `Dream Dive` : obj.loc} | {obj.tim}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-start">
                        <div className="relative size-10 sm:size-8 md:size-8 xl:size-9 shrink-0">
                          <img
                            src="/BoonBorder/Hammer.png"
                            alt="Border"
                            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                          />
                          <img
                            src={`/P9/${obj.asp}.png`}
                            alt="Core Boon"
                            className="absolute inset-0 w-full h-full p-1 object-contain"
                          />
                        </div>
                        {obj.fam && (
                          <div className="relative size-10 sm:size-8 md:size-8 xl:size-9 shrink-0">
                            <img
                              src="/BoonBorder/Hammer.png"
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
                        {obj.cor
                          ? sToA(obj.cor).map((ite, index) => (
                            <div className="relative size-10 sm:size-8 md:size-8 xl:size-9 shrink-0">
                              <img
                                src="/BoonBorder/Hammer.png"
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
                      {obj.ham && (
                        <div className="flex gap-1 flex-wrap font-[Ale] text-[14px] sm:text-[12px]">
                          {sToA(obj.ham).map((item, index) => (
                            <div className="bg-blue-950 px-1 text-gray-300">{item}</div>
                          ))}
                        </div>
                      )}
                      {obj.loc !== "Underworld" && obj.loc !== "Surface" && (
                        <div className="flex justify-start gap-0.5">
                          {sToA(obj.loc).map((item) => (
                            <div className=" bg-orange-950 text-[12px] font-[Ale] px-1 rounded-none">
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-1 font-[Ale]">
                        {obj.src && (
                          <Link to={obj.src} target="_blank" className="bg-[#28282b] rounded-b-lg text-gray-300 px-2">
                            {obj.src.includes("drive.google") ? `Image` : `Video`}
                          </Link>
                        )}
                        {obj.arcana && (
                          <Link
                            to={obj.arcana}
                            target="_blank"
                            className="bg-[#28282b] rounded-b-lg text-gray-300 px-2"
                          >
                            Arcana
                          </Link>
                        )}
                        {obj.oath && (
                          <Link to={obj.oath} target="_blank" className="bg-[#28282b] rounded-b-lg text-gray-300 px-2">
                            Vows
                          </Link>
                        )}
                      </div>
                      <div className="text-gray-300 font-[Ale] line-clamp-2 h-10">{obj.des}</div>
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
                    <td>Idx</td>
                    <th>Name</th>
                    <td>Fear</td>
                    <td>Aspect</td>
                    <td className="min-w-40 w-40">Keep</td>
                    <td className="min-w-40 w-40">Fammer</td>
                    <td className="min-w-40 w-40">Core</td>
                    <td>Time</td>
                    <td>Date</td>
                    <td className="min-w-25">Link</td>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((obj, index) => (
                    <tr key={index} className="text-[14px]">
                      <td className="border-0 border-y border-y-white/5">
                        <div
                          className={
                            obj.loc === `Underworld` ? `text-[#00ffaa]` : obj.loc === `Surface` ? `text-[yellow]` : `text-pink-500`
                          }
                        >
                          {/* {orderData.length - (index + 25 * (pageIndex - 1))} */}
                          {index + 1 + ITEMS_PER_PAGE * (pageIndex - 1)}
                        </div>
                      </td>
                      <td className="border-0 border-y border-y-white/5">
                        <div className="flex items-center gap-1">
                          <div>{obj.nam}</div>
                          <div className="shrink-0 size-4">
                            <img
                              src={
                                obj.loc === `Underworld`
                                  ? `/Underworld.png`
                                  : obj.loc === `Surface`
                                    ? `/Surface.png`
                                    : `/DreamDive/Dream.png`
                              }
                              alt="Region"
                              className="size-4"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border-0 border-y border-y-white/5">
                        <div>{+obj.fea}</div>
                      </td>
                      <td className="border-0 border-y border-y-white/5">
                        <div className="flex gap-2 justify-between items-center">
                          <div>{obj.asp}</div>
                          {obj.des && (
                            <div className="">
                              <div
                                className={`tooltip ${index < paginatedData.length / 2 ? `tooltip-bottom` : `tooltip-top`
                                  }`}
                              >
                                <div className="tooltip-content p-0">
                                  <div className=" border border-white/10 text-white font-[Ale] px-2 py-1 rounded">
                                    {obj.des}
                                  </div>
                                </div>
                                <img src="/Misc/comment.png" alt="Comment" className="size-4" />
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
                                  <div className=" border border-white/10 text-white font-[Ale] px-2 py-1 rounded">
                                    {ite}
                                  </div>
                                </div>
                                <img draggable={false} src={`/buildgui/${ite}.png`} alt="Keepsake" className="size-6" />
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
                                <div className=" border border-white/10 text-white font-[Ale] px-2 py-1 rounded">
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
                                  <div className=" border border-white/10 text-white font-[Ale] px-2 py-1 rounded">
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
                                  <div className=" border border-white/10 text-white font-[Ale] px-2 py-1 rounded">
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
              className="min-w-15 bg-[white] text-black rounded cursor-pointer p-1"
            >
              Prev
            </button>
            <div className="text-[18px] text-white font-[Ale]">
              {pageIndex}/{TOTAL_Page}
            </div>
            <button
              disabled={pageIndex * ITEMS_PER_PAGE >= orderData.length}
              onClick={() => setPageIndex((prev) => prev + 1)}
              className="min-w-15 bg-[white] text-black rounded cursor-pointer p-1"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </PageBlock>
  );
}
