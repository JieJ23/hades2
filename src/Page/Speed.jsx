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
      <div className="max-w-[800px] font-[PT] text-[10px] md:text-[12px] mx-auto text-white select-none">
        <SideNav />
        <div className="p-2">
          <div className="text-[12px] px-2 py-1 flex gap-2">
            <input
              type="number"
              className="input input-sm border-1 border-[#f18043] w-[50px]"
              value={min}
              min={22}
              max={67}
              onChange={(e) => {
                setMin(e.target.value);
              }}
            />
            <input
              type="number"
              className="input input-sm border-1 border-[#f18043] w-[50px]"
              value={max}
              min={22}
              max={67}
              onChange={(e) => {
                setMax(e.target.value);
              }}
            />
            <select
              value={category}
              className="select select-sm w-[100px] border-1 border-[#00ffaa]"
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
          <div className="text-[12px] px-2 py-1 flex gap-2">
            <div>Query Entries:</div>
            <div className="text-[#f18043] backdrop-blur-lg">Min [{min}]</div>
            <div className="text-[#f18043] backdrop-blur-lg">Max [{max}]</div>
          </div>
          <div className="p-2 pb-4">
            {displayData.map((obj, index) => (
              <>
                <div
                  className={`grid grid-cols-5 items-center ${
                    obj.fea >= 60 ? `bg-[#321b49d0]` : `bg-[#050512d0]`
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
                  <div className="text-center text-[#f05bdc] py-0.5 font-mono text-[11px]">
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
