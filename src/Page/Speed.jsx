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
      <div className="max-w-[1400px] font-[Source] text-[12px] md:text-[13px] mx-auto text-white select-none">
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
          <div className="p-2 pb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {displayData.map((obj, index) => (
              <div className="bg-[#000000b1] text-white rounded border-1 border-white/20 relative ps-2">
                <div
                  className={`absolute top-0 left-0 h-full w-[4px] ${
                    obj.loc === `Underworld` ? `bg-[#00ffaa]` : `bg-[#fff200]`
                  } rounded-l`}
                />
                <div className={`flex flex-col justify-center rounded p-2 pb-1`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px]">{index + 1}.</span>
                    <span className="font-[Cinzel] text-[#f18043]">{obj.nam}</span>
                  </div>
                  <div className="px-2 py-1">
                    <div>
                      {obj.asp} / {obj.loc}
                    </div>
                    <div>
                      {obj.fea} / {obj.tim}
                    </div>
                  </div>
                  {index !== displayData.length - 1 && (
                    <div className="text-end rounded">
                      - {parsemstoTime(parseTimetoms(displayData[index + 1].tim) - parseTimetoms(obj.tim))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
