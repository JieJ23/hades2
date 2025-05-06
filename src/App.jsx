import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";
import { h2Data } from "./Data/H2Data";
import { Link } from "react-router-dom";
import { useState } from "react";

function sToA(string) {
  const array = string.split(`,`);
  return array;
}

function App() {
  const [category, setCategory] = useState(0);
  const [sub, setSub] = useState(0);

  const arrayData = [];
  const aspectArrayData = [];

  const customCategory = [`Latest`, `Time`];
  const allAvailableAspects = [...new Set(h2Data.map((obj) => obj.a))].sort();

  const handleChangeCategory = (num) => {
    setCategory(num);
  };
  const handleChangeAspect = (num) => {
    setSub(num);
  };
  //
  const currentData = h2Data.slice().sort((a, b) => (new Date(a.d) > new Date(b.d) ? -1 : 1));
  const timeData = h2Data.slice().sort((a, b) => (a.t > b.t ? 1 : -1));
  arrayData.push(currentData);
  arrayData.push(timeData);
  //
  const allAspectData = arrayData[category].filter((obj) => obj.a);
  aspectArrayData.push(allAspectData);
  for (let i = 0; i < allAvailableAspects.length; i++) {
    const aspectData = arrayData[category].filter((obj) => obj.a === allAvailableAspects[i]);
    aspectArrayData.push(aspectData);
  }
  //

  const currentDisplay = aspectArrayData[sub];

  return (
    <main className="h-full min-h-lvh">
      <Head />
      <div className="flex flex-col md:flex-row gap-1 max-w-[1400px] mx-auto">
        <SideNav />
        <div className="p-1 w-full overflow-hidden">
          <div className="p-1 flex gap-1 font-[PT]">
            {customCategory.map((ite, index) => (
              <button
                class={`btn btn-sm ${category == index ? `btn-warning` : `btn-secondary btn-soft`}`}
                onClick={() => handleChangeCategory(index)}
              >
                {ite}
              </button>
            ))}
          </div>
          <div className="flex border-1 border-white/20 p-1 font-[PT] text-[12px] my-0.5 bg-[#00000050] gap-1 overflow-x-scroll w-full rounded-sm">
            <button
              onClick={() => handleChangeAspect(0)}
              class={`btn btn-sm ${sub == 0 ? `btn-warning` : `btn-secondary btn-soft`}`}
            >
              All
            </button>
            {allAvailableAspects.map((ite, index) => (
              <button
                onClick={() => handleChangeAspect(index + 1)}
                class={`btn btn-sm ${sub == 1 + index ? `btn-warning` : `btn-secondary btn-soft`}`}
              >
                {ite}
              </button>
            ))}
          </div>
          <div className="overflow-x-scroll">
            <table className="table select-none table-zebra">
              <thead>
                <tr className="font-[Cinzel]">
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
                {currentDisplay.map((obj, index) => (
                  <tr key={index} className="font-[PT] text-[12px] overflow-hidden">
                    <td className="relative">
                      <div className="w-8">
                        <img draggable={false} className="size-8 rounded-none" src={`/H2Boons/${obj.a}.png`} />
                      </div>
                      <div className="absolute top-0 left-1 text-[10px]">{index + 1}</div>
                    </td>
                    <td className="font-[Cinzel]">
                      <div className="text-[12px] font-[PT]">{obj.n}</div>
                      <div className="text-[8px] opacity-70">{obj.a}</div>
                    </td>
                    <td>
                      <div className="flex">
                        {obj.h &&
                          sToA(obj.h).map((item, index) => (
                            <div className="tooltip" key={index}>
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
                        <img draggable={false} className="size-8 rounded-none" src={`FearCalculator.png`} />
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
        </div>
      </div>
    </main>
  );
}

export default App;
