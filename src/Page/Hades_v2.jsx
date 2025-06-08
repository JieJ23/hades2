import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { Link } from "react-router-dom";
import { daysAgo } from "../Data/Misc";
import { sToA } from "../Page/Hades2";
import { useState, useEffect } from "react";
import { formatSentence, h1AspectOrder } from "../Data/Misc";
import { h1Data } from "../Data/H1Data";

export function getYTid(text) {
  return text.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
}

const handleLoadMore = (updater) => {
  updater((prev) => prev + 100);
};
const handleChangeSub = (str, updater, depend) => {
  depend("");
  updater(str);
};

export default function Hades_v2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(100);
  const [sub, setSub] = useState(`All`);
  const [min, setMin] = useState(32);
  const [max, setMax] = useState(64);

  const data_grand = [...h1Data].sort((a, b) => b.heat - a.heat).filter((obj) => obj.heat >= min && obj.heat <= max);

  useEffect(() => {
    setShow(100);
    setSub(`All`);
  }, [searchTerm]);

  const displayAnyHeatData = searchTerm
    ? data_grand.filter(
        (obj) =>
          obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.aspect.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : sub === `All`
    ? data_grand
    : data_grand.filter((obj) => obj.aspect === sub);

  return (
    <main className="h-full min-h-lvh relative">
      <div className="fixed w-full h-full bg-[url('/mbg.webp')] -z-10 bg-top"></div>
      <Head />
      <div className="flex flex-col md:flex-row gap-1 max-w-[1400px] mx-auto items-start font-[PT]">
        <SideNav />
        <div className="w-full overflow-hidden">
          <div className="mb-2 px-1">
            <div className="flex border-1 border-white/20 p-1 font-[PT] text-[12px] bg-[#00000050] gap-1 overflow-x-scroll w-full rounded-sm">
              {h1AspectOrder.map((ite, index) => (
                <button
                  onClick={() => handleChangeSub(ite, setSub, setSearchTerm)}
                  className={`btn btn-sm rounded pt-1 h-full min-w-[80px] active:border-0 ${
                    sub == ite ? `bg-[orange] text-black` : `bg-transparent`
                  }`}
                  key={index}
                >
                  <div className="flex flex-col items-center">
                    <img draggable={false} src={`/H1Boon/${ite}.png`} alt="Aspects" className="w-8 rounded" />
                    <div className="font-[PT] text-[12px]">
                      {ite.includes(`Zagreus`) ? ite.replace(`Zagreus`, `Z. `) : ite}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="font-[PT] text-[12px] flex flex-wrap items-center gap-1">
              <button
                className="btn btn-soft text-white border-1 border-white/20 rounded text-[12px] px-3"
                onClick={() => handleChangeSub(`All`, setSub, setSearchTerm)}
              >
                Show All
              </button>
              <label className="floating-label my-2 min-w-[150px]">
                <input
                  type="text"
                  placeholder="Search Keyword / Aspect"
                  className="input rounded border-1 border-white/20 text-[12px] bg-base-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
              <input
                type="number"
                className="input w-12 text-[12px] rounded"
                value={`${min}`}
                min={32}
                max={64}
                onChange={(e) => setMin(Number(e.target.value))}
              />
              <input
                type="number"
                className="input w-12 text-[12px] rounded"
                value={`${max}`}
                min={32}
                max={64}
                onChange={(e) => setMax(Number(e.target.value))}
              />
            </div>
            <div className="flex text-[11px] gap-2 px-2 mb-1">
              <div className="whitespace-nowrap">"{searchTerm ? searchTerm : sub}" Query</div>
              <div className="whitespace-nowrap">{displayAnyHeatData.length} Entries</div>
            </div>
            <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {displayAnyHeatData.slice(0, show).map((obj, index) => (
                <div
                  key={index}
                  className="font-[PT] text-[12px] rounded overflow-hidden bg-black/80 border-1 border-white/20"
                >
                  <Link to={`${obj.src}`} target="_blank">
                    <img
                      src={
                        obj.src.includes(`bilibili`) || obj.src.includes(`twitch`)
                          ? `/hades2.webp`
                          : `https://img.youtube.com/vi/${getYTid(obj.src)}/mqdefault.jpg`
                      }
                      alt="Video"
                      className="border-1 border-white/20 rounded rounded-b-none"
                      draggable={false}
                    />
                  </Link>
                  <div className="px-1 py-1 flex flex-col justify-between gap-0.5">
                    <div className="line-clamp-1">
                      {obj.aspect} - {obj.heat} -{" "}
                      <span
                        className={`${
                          obj.category === `Modded`
                            ? `text-[#05f66e]`
                            : obj.category === `Unseeded`
                            ? `text-[#f8b808]`
                            : `text-[#08e4f8]`
                        }`}
                      >
                        {obj.category}
                      </span>
                    </div>
                    <>
                      {obj.b && (
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            {obj.b &&
                              sToA(obj.b).map((ite) => (
                                <div>
                                  <img
                                    draggable={false}
                                    src={`/H1Boon/${ite}.png`}
                                    alt="Core Boon"
                                    className="w-5 md:w-6 rounded-none"
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </>
                    <div className="flex justify-between">
                      {obj.name}
                      <div className="flex gap-0.5 items-center">
                        <div className="avatar">
                          <div className="size-4 md:size-5 rounded">
                            <img
                              src={
                                obj.src.includes(`bilibil`)
                                  ? `/bilibili.png`
                                  : obj.src.includes(`youtu`)
                                  ? `/youtube.png`
                                  : `/twitch.png`
                              }
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
        {show < displayAnyHeatData.length && (
          <button
            className="btn rounded btn-neutral border-1 border-white/20 btn-sm font-[PT]"
            onClick={() => handleLoadMore(setShow)}
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
