import Head from "../Comp/Head";
import Background from "../Comp/Background";
import SideNav from "../Comp/Sidebar";
import Footer from "../Comp/Footer";

import { p9data } from "../Data/P9Data";
import { p11data } from "../Data/P11Data";
import { sheet_data } from "../Data/Sheet";
import { h2Data } from "../Data/H2Data";
import { data_AnyFear } from "../Data/H2Fear";
import { gameplay } from "../Data/GameplayData";

import { getYTid } from "../Data/Misc";
import { Link } from "react-router-dom";

import { useState } from "react";
import { h2AspectOrder } from "../Data/Misc";

const allYTvids = [...p9data, ...p11data, ...sheet_data, ...h2Data, ...data_AnyFear, ...gameplay].filter(
  (obj) => obj.src
);

export const handleLoadMoreGameplay = (updater) => {
  updater((prev) => prev + 60);
};

export default function Gameplay() {
  const [category, setCategory] = useState(`All Aspects`);
  const [minmax, setMinMax] = useState([0, 67]);
  const [show, setShow] = useState(60);

  const sortedByDate = allYTvids.sort((a, b) => new Date(b.d || b.dat) - new Date(a.d || a.dat));

  const displayData = (
    category === `All Aspects` ? sortedByDate : sortedByDate.filter((obj) => (obj.asp || obj.a) === category)
  ).filter((obj) => (obj.fea || obj.f) >= minmax[0] && (obj.fea || obj.f) <= minmax[1]);

  return (
    <main className="relative">
      <Background />
      <Head />
      <div className="max-w-[1600px] font-[PT] text-[11px] md:text-[12px] mx-auto">
        <SideNav />
        <div className="px-2 my-2 flex flex-wrap gap-1">
          <input
            type="number"
            className="input input-sm border-1 border-[#f18043] w-[60px] focus:outline-0 rounded"
            value={minmax[0]}
            min={0}
            max={67}
            onChange={(e) => {
              setShow(60);
              const newMin = Number(e.target.value);
              setMinMax([newMin, minmax[1]]);
            }}
          />
          <input
            type="number"
            className="input input-sm border-1 border-[#f18043] w-[60px] focus:outline-0 rounded"
            value={minmax[1]}
            min={0}
            max={67}
            onChange={(e) => {
              setShow(60);
              const newMax = Number(e.target.value);
              setMinMax([minmax[0], newMax]);
            }}
          />
          <select
            className="select select-sm w-[120px] border-1 border-[#00ffaa] focus:outline-0 rounded"
            defaultValue={`All Aspects`}
            onChange={(e) => {
              setShow(60);
              setCategory(e.target.value);
            }}
          >
            <option value={`All Aspects`}>All Aspects</option>
            {h2AspectOrder.map((ite, index) => (
              <option value={ite} key={index}>
                {ite}
              </option>
            ))}
          </select>
        </div>
        <div className="px-2 text-white font-[Source]">
          <div>
            Query: {displayData.length}/{allYTvids.length} Videos
          </div>
        </div>
        <div className="p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 gap-y-2 sm:gap-y-2 sm:gap-3 font-[Source] text-[11px] md:text-[12px]">
          {displayData.slice(0, show).map((obj, index) => (
            <div className="rounded group bg-[#00000098] border-1 border-[#131111]">
              <Link to={obj.src} target="_blank">
                <img
                  src={
                    obj.src.includes(`bilibil`)
                      ? `/Misc/bilibili.webp`
                      : `https://img.youtube.com/vi/${getYTid(obj.src)}/mqdefault.jpg`
                  }
                  alt="Video Image"
                  className="rounded w-full group-hover:scale-[95%] transition-all duration-150 ease-in max-h-[150px]"
                />
              </Link>
              <div className="p-1 text-white group-hover:text-[#00ffaa]">
                <div>
                  {obj.fea || obj.f} Fear {obj.asp || obj.a} {obj.l || obj.loc}
                </div>
                <div className="flex justify-between text-gray-400">
                  <div>{obj.nam || obj.n}</div>
                  <div>{obj.dat || obj.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center my-4 gap-2">
          {show < displayData.length && (
            <button
              className="btn bg-transparent rounded border-1 border-[#00ffaa] btn-sm font-[Source]"
              onClick={() => handleLoadMoreGameplay(setShow)}
            >
              Show More
            </button>
          )}
          {displayData.length > 60 && (
            <button
              className="btn bg-transparent rounded border-1 border-[#00ffaa] btn-sm font-[Source]"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Back Top
            </button>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
