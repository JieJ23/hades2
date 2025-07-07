import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";

import { p9data } from "../Data/P9Data";
import { parseTimetoms, parsemstoTime, daysAgo, h2AspectOrder } from "../Data/Misc";
import { useState } from "react";

const sortByFastest = p9data.slice().sort((a, b) => parseTimetoms(a.tim) - parseTimetoms(b.tim));

export default function Speed() {
  const [min, setMin] = useState(50);
  const [max, setMax] = useState(67);
  const [category, setCategory] = useState(`All`);

  const selectedFear = sortByFastest.filter((obj) => (obj.fea >= min) & (obj.fea <= max));

  const availableAspects = [...new Set(selectedFear.map((obj) => obj.asp))].sort((a, b) =>
    h2AspectOrder.indexOf(a) > h2AspectOrder.indexOf(b) ? 1 : -1
  );

  const displayData = category === `All` ? selectedFear : selectedFear.filter((obj) => obj.asp === category);

  return (
    <main className="relative">
      <Background />
      <Head />
      <div className="max-w-[800px] font-[Source] text-[12px] md:text-[13px] mx-auto text-white select-none">
        <SideNav />
        <div className="p-2">
          <div className="px-2 py-1 flex gap-1">
            <input
              type="number"
              className="input input-sm border-1 border-[#f18043] w-[50px] focus:outline-0 rounded"
              value={min}
              min={22}
              max={67}
              onChange={(e) => {
                setMin(e.target.value);
              }}
            />
            <input
              type="number"
              className="input input-sm border-1 border-[#f18043] w-[50px] focus:outline-0 rounded"
              value={max}
              min={22}
              max={67}
              onChange={(e) => {
                setMax(e.target.value);
              }}
            />
            <select
              value={category}
              className="select select-sm w-[100px] border-1 border-[#00ffaa] focus:outline-0 rounded"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value={`All`}>All</option>
              {availableAspects.map((ite, index) => (
                <option value={ite} key={index}>
                  {ite}
                </option>
              ))}
            </select>
          </div>
          <div className="px-2 pt-1 flex gap-1">
            <div className="pe-1">Query Entries:</div>
            <div className="text-[#f18043]">Min [{min}]</div>
            <div className="text-[#f18043]">Max [{max}]</div>
          </div>
          <div className="px-2 flex gap-1">
            <div className="pe-1">Query Avg:</div>
            <div className="text-[#00ffaa]">
              {parsemstoTime(
                Math.round(displayData.reduce((total, item) => total + parseTimetoms(item.tim), 0) / displayData.length)
              )}
            </div>
            <div className="text-[#00ffaa]">[{displayData.length}]</div>
          </div>
          <div className="p-2 pb-4">
            {displayData.map((obj, index) => (
              <>
                <div
                  className={`grid grid-cols-5 items-center ${
                    obj.fea >= 60 ? `bg-[#46e7a1d0] text-black` : `bg-[#000000b5]`
                  } border-1 rounded p-2 border-white/20`}
                >
                  <div>
                    <span className={`text-[10px] pe-1`}>{index + 1}.</span>
                    {obj.nam}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <img src={`/P9/${obj.asp}.png`} alt="Aspect" className="size-6" />
                    {obj.asp.includes(`Melinoe`) ? obj.asp.replace(`Melinoe`, ``) : obj.asp}
                  </div>
                  <div className="flex items-center gap-1 justify-center">
                    <img src={`/${obj.loc}.png`} alt="Regions" className="size-6" />
                    {obj.tim}
                  </div>
                  <div className="text-center">{obj.fea}</div>
                  <div className="ml-auto">{daysAgo(obj.dat)}</div>
                </div>
                {index !== displayData.length - 1 && (
                  <div className="text-center text-[#f05bdc] py-2 my-0.5 text-[14px] rounded">
                    - {parsemstoTime(parseTimetoms(displayData[index + 1].tim) - parseTimetoms(obj.tim))}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
