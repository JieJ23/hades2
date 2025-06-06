import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";
import { h2Data } from "./Data/H2Data";
import { data_AnyFear } from "./Data/H2Fear";
import { Link } from "react-router-dom";
import { daysAgo } from "./Data/Misc";
import { sToA } from "./Page/Hades2";
import { useState, useEffect } from "react";
import { h2AspectOrder, formatSentence } from "./Data/Misc";

const data_grand = [...data_AnyFear, ...h2Data].sort((a, b) => (new Date(a.d) > new Date(b.d) ? -1 : 1));

export function getYTid(text) {
  return text.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(25);
  const [sub, setSub] = useState(`All`);

  useEffect(() => {
    setShow(25);
    setSub(`All`);
  }, [searchTerm]);

  const handleLoadMore = () => {
    setShow((prev) => prev + 50);
  };
  const handleChangeSub = (str) => {
    setSearchTerm("");
    setSub(str);
  };

  const displayAnyFearData = searchTerm
    ? data_grand.filter(
        (obj) =>
          (obj.des && obj.des.toLowerCase().includes(searchTerm.toLowerCase())) ||
          obj.n.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : sub === `All`
    ? data_grand
    : data_grand.filter((obj) => obj.a === sub);

  return (
    <main className="h-full min-h-lvh select-none relative">
      <div className="fixed w-full h-full bg-[url('/mbg.webp')] -z-10 bg-top"></div>
      <Head />
      <div className="flex flex-col md:flex-row gap-1 max-w-[1400px] mx-auto items-start font-[PT]">
        <SideNav />
        <div className="w-full overflow-hidden">
          <div className="mb-2 px-1">
            <div className="flex border-1 border-white/20 p-1 font-[PT] text-[12px] bg-[#00000050] gap-1 overflow-x-scroll w-full rounded-sm">
              {h2AspectOrder.map((ite, index) => (
                <button
                  onClick={() => handleChangeSub(ite)}
                  className={`btn btn-sm rounded pt-1 h-full min-w-[80px] active:border-0 ${
                    sub == ite ? `bg-[orange] text-black` : `bg-transparent`
                  }`}
                  key={index}
                >
                  <div className="flex flex-col items-center">
                    <img draggable={false} src={`/H2Boons/${ite}.png`} alt="Aspects" className="w-8 rounded" />
                    <div className="font-[PT] text-[12px]">
                      {ite.includes(`Melinoe`) ? ite.replace(`Melinoe`, `M. `) : ite}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="font-[PT] text-[12px] flex items-center gap-1">
              <button
                className="btn btn-soft text-white border-1 border-white/20 rounded text-[12px] px-3"
                onClick={() => handleChangeSub(`All`)}
              >
                Show All
              </button>
              <label className="floating-label my-2 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search Keyword / Aspect"
                  className="input rounded border-1 border-white/20 text-[12px] bg-base-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
              <div className="flex flex-col text-[11px]">
                <div>"{searchTerm ? searchTerm : sub}" Query</div>
                <div>{displayAnyFearData.length} Entries</div>
              </div>
            </div>
            <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {displayAnyFearData.slice(0, show).map((obj, index) => (
                <div
                  key={index}
                  className="font-[PT] text-[12px] rounded overflow-hidden bg-black/80 border-1 border-white/20"
                >
                  <Link to={`${obj.src}`} target="_blank">
                    <img
                      src={
                        obj.src.includes(`bilibili`) && obj.l === `Underworld`
                          ? `/Underworld2.webp`
                          : obj.src.includes(`bilibili`) && obj.l === `Surface`
                          ? `/Surface2.webp`
                          : `https://img.youtube.com/vi/${getYTid(obj.src)}/mqdefault.jpg`
                      }
                      alt="Video"
                      className="border-1 border-white/20 rounded rounded-b-none"
                      draggable={false}
                    />
                  </Link>
                  <div className="px-1 py-1 flex flex-col justify-between gap-0.5">
                    <div className="line-clamp-1">
                      {obj.a} - {obj.f} - {obj.l}
                    </div>
                    <>
                      {obj.boon ? (
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            {obj.boon &&
                              sToA(obj.boon).map((ite) => (
                                <div>
                                  <img
                                    draggable={false}
                                    src={`/H2Boons/${ite}.png`}
                                    alt="Core Boon"
                                    className="w-5 md:w-6 rounded-none"
                                  />
                                </div>
                              ))}
                          </div>
                          <div className="flex">
                            {obj.h &&
                              sToA(obj.h)
                                .sort()
                                .map((item, index) => (
                                  <div className="tooltip tooltip-left" key={index}>
                                    <div className="tooltip-content bg-black border-1 text-white border-white/20 rounded">
                                      <div className="text-[12px]">{item}</div>
                                    </div>
                                    <img
                                      draggable={false}
                                      src={`/Hammer/${item}.png`}
                                      alt="Hammer Boon"
                                      className="w-5 md:w-6 rounded-none"
                                    />
                                  </div>
                                ))}
                          </div>
                        </div>
                      ) : (
                        <div className="tooltip">
                          <div className="tooltip-content max-w-[95%] bg-black border-1 border-white/20 rounded text-start">
                            <div className="text-[12px]">{formatSentence(obj.des)}</div>
                          </div>
                          <div className="line-clamp-1 text-[#ffa006] text-[12px]">{formatSentence(obj.des)}</div>
                        </div>
                      )}
                    </>
                    <div className="flex justify-between">
                      {obj.n}
                      <div className="flex gap-0.5 items-center">
                        {daysAgo(obj.d)}
                        <div className="avatar">
                          <div className="size-4 md:size-5 rounded">
                            <img
                              src={obj.src.includes(`bilibil`) ? `/bilibili.png` : `/youtube.png`}
                              alt="Video Source"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-2 mb-4 gap-2">
        {show < displayAnyFearData.length && (
          <button
            className="btn rounded btn-neutral border-1 border-white/20 btn-sm font-[PT]"
            onClick={handleLoadMore}
          >
            Show More
          </button>
        )}
        {show > 25 && (
          <button
            className="btn rounded btn-neutral border-1 border-white/20 btn-sm font-[PT]"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back Top
          </button>
        )}
      </div>
    </main>
  );
}
