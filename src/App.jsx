import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";
import { h2Data } from "./Data/H2Data";
import { Link } from "react-router-dom";
import { useState } from "react";

function getHammer(data) {
  const hammerCount = {};

  data.forEach((item) => {
    const hammer = item.h.split(",");
    hammer.forEach((fruit) => {
      const trimmed = fruit.trim(); // optional: removes extra spaces
      hammerCount[trimmed] = (hammerCount[trimmed] || 0) + 1;
    });
  });

  return hammerCount;
}

function getTotal(obj) {
  return Object.values(obj).reduce((sum, val) => sum + val, 0);
}

function getUnique(arr) {
  const result = [];
  const seen = new Set();

  for (const item of arr) {
    const key = `${item.n}-${item.a}-${item.l}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}

export function sToA(string) {
  const array = string.split(`,`);
  return array;
}

function App() {
  const [unique, setUnique] = useState(false);
  const [sub, setSub] = useState(1);
  const [show, setShow] = useState(25);

  const handleLoadMore = () => {
    setShow((prev) => prev + 25);
  };

  const aspectArrayData = [];

  const allAvailableAspects = [...new Set(h2Data.map((obj) => obj.a))].sort();

  const handleChangeAspect = (num) => {
    setSub(num);
  };
  //
  const sortByFearAndTime = h2Data.sort((a, b) => (a.t > b.t ? 1 : -1)).sort((a, b) => (a.f > b.f ? -1 : 1));

  //
  aspectArrayData.push(sortByFearAndTime);
  for (let i = 0; i < allAvailableAspects.length; i++) {
    const aspectData = sortByFearAndTime.filter((obj) => obj.a === allAvailableAspects[i]);
    aspectArrayData.push(aspectData);
  }
  //

  const currentDisplay = unique === true ? getUnique(aspectArrayData[sub]) : aspectArrayData[sub];

  return (
    <main className="h-full min-h-lvh">
      <Head />
      <div className="flex flex-col md:flex-row gap-1 max-w-[1400px] mx-auto">
        <SideNav />
        <div className="p-1 w-full overflow-hidden">
          <div className="flex border-1 border-white/20 p-1 font-[PT] text-[12px] my-0.5 bg-[#00000050] gap-1 overflow-x-scroll w-full rounded-sm">
            <button
              onClick={() => handleChangeAspect(0)}
              className={`btn btn-sm h-[52px] min-w-[80px] font-[Cinzel] text-[10px]  ${
                sub == 0 ? `btn-success` : `btn-base btn-soft`
              }`}
            >
              All Aspects
            </button>
            {allAvailableAspects.map((ite, index) => (
              <button
                onClick={() => handleChangeAspect(index + 1)}
                className={`btn btn-sm h-full min-w-[80px] ${sub == 1 + index ? `btn-success` : `btn-base btn-soft`}`}
                key={index}
              >
                <div className="flex flex-col items-center">
                  <img src={`/H2Boons/${ite}.png`} alt="Aspects" className="w-8 rounded" />
                  <div className="font-[Cinzel] text-[10px]">
                    {ite.includes(`Melinoe`) ? ite.replace(`Melinoe`, `M. `) : ite}
                  </div>
                </div>
              </button>
            ))}
          </div>
          {sub !== 0 && (
            <div className="rounded p-2">
              <div className="flex flex-wrap gap-2">
                {Object.entries(getHammer(currentDisplay))
                  .sort((a, b) => (a[1] > b[1] ? -1 : 1))
                  .map(([prop, value], index) => (
                    <div key={index} className="rounded p-1 flex gap-1 items-center font-[PT] text-[12px]">
                      <img src={`/Hammer/${prop}.png`} alt="Hammers" className="w-10 rounded" />
                      <div className="flex flex-col items-start">
                        <div>{prop}</div>
                        <div className="text-success">
                          {(100 * (value / getTotal(getHammer(currentDisplay)))).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <div className="flex items-center text-[12px] font-[PT] gap-1 p-2">
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              onClick={(e) => {
                setUnique(e.target.checked);
              }}
            />
            <label>Unique Sort</label>
          </div>
          <div className="overflow-x-scroll">
            <table className="table select-none table-zebra">
              <thead>
                <tr className="font-[Cinzel] hidden">
                  <th></th>
                  <th></th>
                  <th className="min-w-[108px]"></th>
                  <th className="min-w-[180px]"></th>
                  <th className="min-w-[100px]"></th>
                  <th className="min-w-[100px]"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentDisplay.slice(0, show).map((obj, index) => (
                  <tr key={index} className="font-[PT] text-[12px] overflow-hidden">
                    <td className="relative">
                      <div className="w-8">
                        <img draggable={false} className="size-8 rounded-none" src={`/H2Boons/${obj.a}.png`} />
                      </div>
                      <div className="absolute top-0 left-1 text-[10px]">{index + 1}</div>
                    </td>
                    <td className="font-[Cinzel]">
                      <div className="text-[12px] font-[PT] whitespace-nowrap">{obj.n}</div>
                      <div className="text-[8px] opacity-70">{obj.a}</div>
                    </td>
                    <td>
                      <div className="flex">
                        {obj.h &&
                          sToA(obj.h)
                            .sort()
                            .map((item, index) => (
                              <div className="tooltip shrink-0" key={index}>
                                <div className="tooltip-content">
                                  <div className="text-[12px] font-[PT]">{item}</div>
                                </div>
                                <img
                                  draggable={false}
                                  src={`/Hammer/${item}.png`}
                                  alt="Hammer Boon"
                                  className="size-8 rounded-none"
                                />
                              </div>
                            ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex">
                        {sToA(obj.boon).map((item, index) => (
                          <div key={index} className="shrink-0">
                            <img
                              draggable={false}
                              src={`/H2Boons/${item}.png`}
                              alt="Core Boon"
                              className="size-8 rounded-none"
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <img draggable={false} className="size-8 rounded-none" src={`/H2Boons/${obj.fam}.png`} />
                        <div>
                          <div>{obj.fam}</div>
                          <div className="opacity-80 text-[10px]">Patch {obj.p}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {obj.l === `Underworld` ? (
                          <img draggable={false} className="size-8 rounded-none" src={`Underworld.png`} />
                        ) : (
                          <img draggable={false} className="size-8 rounded-none" src={`Surface.png`} />
                        )}
                        <div>
                          <div>{obj.f}</div>
                          <div
                            className={`opacity-80 text-[10px] ${
                              obj.l == `Surface` ? `text-[yellow]` : `text-[#0df388]`
                            }`}
                          >
                            {obj.l}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <img draggable={false} className="size-8 rounded-none" src={`time.png`} />
                        <div>
                          {/* <div
                            className={`${
                              obj.c === `Modded`
                                ? `text-[#0df490]`
                                : obj.c === `Unseeded`
                                ? `text-[#f4970b]`
                                : `text-[#0eaeed]`
                            }`}
                          >
                            {obj.c}
                          </div> */}
                          <div>{obj.t}</div>
                          <div className="opacity-60 text-[10px]">{obj.d}</div>
                        </div>
                      </div>
                    </td>
                    <td className="flex flex-col justify-center items-center">
                      <Link to={`${obj.src}`} target="_blank" className="px-2">
                        <button className="btn btn-square btn-ghost">
                          <img
                            draggable={false}
                            src={`${obj.src.includes(`bilibil`) ? `/bilibili.png` : `youtube.png`}`}
                            className="w-8 rounded"
                          />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {show < currentDisplay.length && (
            <div className=" flex justify-center my-2">
              <button
                onClick={handleLoadMore}
                className="btn btn-base text-[12px] border-white/20 border-[1px] font-[PT]"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
