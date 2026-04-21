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

export default function Dream() {
  const { posts, loader } = useData();
  const [pageIndex, setPageIndex] = useState(1); // current page
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState("");
  const [fill, setFill] = useState("Fear");

  const orderData = useMemo(() => {
    return [...bundleData, ...posts]
      .filter((obj) => obj.loc !== "Underworld" && obj.loc !== "Surface")
      .filter((obj) => obj.src.includes("youtu"))
      .filter((obj) => {
        const categoryMatch = category === "" || obj.asp === category;

        return categoryMatch;
      })
      .sort((a, b) => {
        if (fill === "Latest") return new Date(b.dat) - new Date(a.dat);
        else {
          const feaDiff = +b.fea - +a.fea;
          if (feaDiff !== 0) return feaDiff;
          return parseTimetoms(a.tim) - parseTimetoms(b.tim);
        }
      });
  }, [posts, category, fill]);

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

    if (fill !== "Fear") {
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
      <Background />
      <SideNav />
      {loader ? (
        <Loading />
      ) : (
        <>
          <div className="max-w-350 mx-auto py-2 my-2">
            <div className="px-2">Total Entries: {orderData.length}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-2">
              <select
                className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
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
                className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
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
          {/* Table Content */}
          <div className="max-w-350 mx-auto p-2">
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-8 gap-4">
              {paginatedData.slice(0, 25).map((obj, index) => (
                <div className="rounded">
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
                  <div className="px-2 pb-1">
                    <div className="flex flex-wrap justify-center gap-1">
                      <span>{obj.fea}</span>
                      <span className="text-orange-400">{obj.nam}</span>
                      <span>{obj.asp}</span>:<span>{obj.tim}</span>
                    </div>
                    <div className="flex justify-center my-1 gap-0.5">
                      {sToA(obj.loc).map((item) => (
                        <img src={`/DreamDive/${item}.png`} alt="Biomes" className="size-7" />
                      ))}
                    </div>
                    <div className="flex justify-center gap-0.5">
                      {sToA(obj.loc).map((item) => (
                        <div className="bg-gray-900 px-1 rounded">{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
          {/* Pagination controls */}
          <div className="flex justify-center gap-4 items-center text-[14px] font-[Ale] py-2 my-2">
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
