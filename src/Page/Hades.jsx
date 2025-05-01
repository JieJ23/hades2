import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { hadesEntries } from "../Data/HadesEntries";
import { h1Data } from "../Data/H1Data";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Hades() {
  const [category, setCategory] = useState(0);
  //
  const handleChangeCategory = (num) => {
    setCategory(num);
  };
  //

  const fullAspectArray = [];

  const hades64SortByDate = hadesEntries.sort((a, b) => (new Date(a.d) > new Date(b.d) ? -1 : 1));

  const allAspects = [...new Set(h1Data.map((obj) => obj.aspect))].sort();

  const h1sortByHeat = h1Data.sort((a, b) => (a.heat > b.heat ? -1 : 1));

  for (let i = 0; i < allAspects.length; i++) {
    const aspectArray50 = h1sortByHeat.filter((obj) => obj.aspect === allAspects[i]).slice(0, 20);
    fullAspectArray.push(aspectArray50);
  }

  const currentDisplay = fullAspectArray[category];

  return (
    <main className="h-full min-h-lvh">
      <Head />
      <div className="flex flex-col md:flex-row gap-1 max-w-[1400px] mx-auto">
        <SideNav />
        <div className="p-1 w-full overflow-hidden">
          <ul className="list bg-base-100 rounded-box mb-2">
            <li className="flex border-1 border-white/20 p-2 pb-1 font-[PT] text-[12px] my-0.5 bg-[#00000050] gap-1 overflow-x-scroll w-full rounded-sm">
              {allAspects.map((ite, index) => (
                <button
                  key={index}
                  className={`btn btn-sm ${category == index ? `btn-warning` : `btn-secondary btn-soft`}`}
                  onClick={() => handleChangeCategory(index)}
                >
                  {ite}
                </button>
              ))}
            </li>
          </ul>
          <div className="grid grid-col-1 xl:grid-cols-2 gap-2">
            <div className="overflow-x-scroll ">
              <table className="table select-none">
                <thead>
                  <tr className="font-[Cinzel]">
                    <th className="text-[10px] text-white">Hade Heat</th>
                    <th className="min-w-[120px]"></th>
                    <th className="min-w-[80px]"></th>
                    <th className="min-w-[80px]"></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentDisplay.map((obj, index) => (
                    <tr key={index} className="font-[PT] text-[12px] overflow-hidden">
                      <td className="font-[Cinzel] relative">
                        <div className="absolute top-0 left-1 font-[PT] text-[8px]">{index + 1}</div>
                        <div className="text-[12px]">{obj.name}</div>
                        <div className="text-[8px] opacity-70">{obj.aspect}</div>
                      </td>
                      <td>
                        <img src={`/H1Weapons/${obj.aspect}.png`} alt="Aspects" className="w-[120px] rounded" />
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <img draggable={false} className="size-8 rounded-none" src={`HeatCalculator.png`} />
                          <div>
                            <div>{obj.heat}</div>
                            <div className="opacity-60 text-[10px]">{obj.l}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <img draggable={false} className="size-8 rounded-none" src={`time.png`} />
                          <div>
                            <div
                              className={`${
                                obj.category === `Modded`
                                  ? `text-[#0df490]`
                                  : obj.category === `Unseeded`
                                  ? `text-[#f4970b]`
                                  : `text-[#0eaeed]`
                              }`}
                            >
                              {obj.category}
                            </div>
                            <div className="opacity-60 text-[10px]">{obj.date}</div>
                          </div>
                        </div>
                      </td>
                      <td className="flex flex-col justify-center items-center">
                        <Link to={`${obj.src}`} target="_blank" className="px-2">
                          <button className="btn btn-square btn-ghost">
                            <div className="avatar">
                              <div className="size-8 rounded">
                                <img
                                  draggable={false}
                                  src={`${obj.src.includes(`bilibil`) ? `/bilibili.png` : `youtube.png`}`}
                                />
                              </div>
                            </div>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-scroll">
              <table className="table select-none">
                <thead>
                  <tr className="font-[Cinzel]">
                    <th className="text-[10px] text-white">Heat 64</th>
                    <th></th>
                    <th className="min-w-[200px]"></th>
                    <th className="min-w-[100px]"></th>
                    <th className="min-w-[100px]"></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {hades64SortByDate.map((obj, index) => (
                    <tr key={index} className="font-[PT] text-[12px] overflow-hidden bg-base-300">
                      <td className="relative">
                        <div className="w-8">
                          <img draggable={false} className="size-8 rounded-none" src={`/H1Boon/${obj.a}.png`} />
                        </div>
                        <div className="absolute top-0 left-1 text-[10px]">{index + 1}</div>
                      </td>
                      <td className="font-[Cinzel]">
                        <div className="text-[12px]">{obj.n}</div>
                        <div className="text-[10px] font-[PT] opacity-70">{obj.a}</div>
                      </td>
                      <td>
                        <div className="flex">
                          {obj.b.map((item, index) => (
                            <img src={`/H1Boon/${item}.png`} alt="Core" className="w-8 rounded" key={index} />
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <img draggable={false} className="size-8 rounded-none" src={`HeatCalculator.png`} />
                          <div>
                            <div>64</div>
                            <div className="opacity-60 text-[10px]">{obj.l}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <img draggable={false} className="size-8 rounded-none" src={`time.png`} />
                          <div>
                            <div
                              className={`${
                                obj.c === `Modded`
                                  ? `text-[#0df490]`
                                  : obj.c === `Unseeded`
                                  ? `text-[#f4970b]`
                                  : `text-[#0eaeed]`
                              }`}
                            >
                              {obj.c}
                            </div>
                            <div className="opacity-60 text-[10px]">{obj.d}</div>
                          </div>
                        </div>
                      </td>
                      <td className="flex flex-col justify-center items-center">
                        <Link to={`${obj.src}`} target="_blank" className="px-2">
                          <button className="btn btn-square btn-ghost">
                            <div className="avatar">
                              <div className="size-8 rounded">
                                <img
                                  draggable={false}
                                  src={`${obj.src.includes(`bilibil`) ? `/bilibili.png` : `youtube.png`}`}
                                />
                              </div>
                            </div>
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
      </div>
    </main>
  );
}
