import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { hadesEntries } from "../Data/HadesEntries";
import { h1Data } from "../Data/H1Data";
import { Link } from "react-router-dom";
import { useState } from "react";
import { sToA } from "../App";

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
    const aspectArray50 = h1sortByHeat.filter((obj) => obj.aspect === allAspects[i]).slice(0, 5);
    fullAspectArray.push(aspectArray50);
  }

  //

  const fullCategoryDetails = [];

  for (let i = 0; i < allAspects.length; i++) {
    const targetAspect = h1Data
      .filter((obj) => obj.aspect === allAspects[i])
      .sort((a, b) => (a.heat > b.heat ? -1 : 1));
    const seededRun = targetAspect.filter((obj) => obj.category === `Seeded`);
    const moddedRun = targetAspect.filter((obj) => obj.category === `Modded`);
    const unseededRun = targetAspect.filter((obj) => obj.category === `Unseeded`);

    const s_max = Math.max.apply(Math, [...new Set(seededRun.map((obj) => obj.heat))]);
    const m_max = Math.max.apply(Math, [...new Set(moddedRun.map((obj) => obj.heat))]);
    const u_max = Math.max.apply(Math, [...new Set(unseededRun.map((obj) => obj.heat))]);

    const finalizedSeeded = seededRun.filter((obj) => obj.heat === s_max);
    const finalizedModded = moddedRun.filter((obj) => obj.heat === m_max);
    const finalizedUnseeded = unseededRun.filter((obj) => obj.heat === u_max);

    fullCategoryDetails.push([...finalizedSeeded, ...finalizedModded, ...finalizedUnseeded]);
  }
  //

  const currentDisplay = fullCategoryDetails[category];

  return (
    <main className="h-full min-h-lvh  select-none">
      <Head />
      <div className="flex flex-col md:flex-row gap-1 max-w-[1400px] mx-auto">
        <SideNav />
        <div className="p-1 w-full overflow-hidden">
          <ul className="list bg-base-100 rounded-box mb-2">
            <li className="flex border-1 border-white/20 p-2 pb-1 font-[PT] text-[12px] my-0.5 bg-[#00000050] gap-1 overflow-x-scroll w-full rounded-sm">
              {allAspects.map((ite, index) => (
                <button
                  key={index}
                  className={`btn btn-sm h-full w-[80px] ${category == index ? `btn-error` : `btn-base btn-soft`}`}
                  onClick={() => handleChangeCategory(index)}
                >
                  <div className="flex flex-col items-center">
                    <img src={`/H1Boon/${ite}.png`} alt="Aspects" className="w-8 rounded" />
                    <div className="font-[Cinzel] text-[10px]">
                      {ite.includes(`Zagreus`) ? ite.replace(`Zagreus`, `Z. `) : ite}
                    </div>
                  </div>
                </button>
              ))}
            </li>
          </ul>
          <div className="h-[180px] rounded overflow-x-scroll">
            <div className="flex gap-2">
              {hades64SortByDate.map((obj, index) => (
                <div
                  className=" p-1 border-1 border-white/20 rounded min-w-[180px] font-[PT] text-[12px] bg-gradient-to-t from-[#3e1a1a] to-[transparnt]"
                  key={index}
                >
                  <div className="text-center font-[Cinzel] py-1">{obj.n}</div>
                  <div className="flex justify-center gap-2 my-2">
                    <div className="w-8">
                      <img draggable={false} className="size-8 rounded-none" src={`/H1Boon/${obj.a}.png`} />
                    </div>
                    <div>
                      <div className="font-[Cinzel] text-[10px]">{obj.a}</div>
                      <div className="opacity-80 text-[10px]">{obj.t}</div>
                    </div>
                  </div>
                  <div className="flex justify-center my-2">
                    {obj.b.map((item, index) => (
                      <img src={`/H1Boon/${item}.png`} alt="Core" className="w-7 rounded" key={index} />
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-[10px]">
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
                    <Link to={`${obj.src}`} target="_blank">
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
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-x-scroll ">
            <table className="table select-none table-zebra">
              <thead>
                <tr className="font-[Cinzel]">
                  <td></td>
                  <th></th>
                  <th className="min-w-[120px]"></th>
                  <th className="min-w-[180px]"></th>
                  <th className="min-w-[80px]"></th>
                  <th className="min-w-[80px]"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentDisplay
                  .sort((a, b) => (a.t > b.t ? 1 : -1))
                  .sort((a, b) => (a.heat > b.heat ? -1 : 1))
                  .map((obj, index) => (
                    <tr key={index} className="font-[PT] text-[12px] overflow-hidden">
                      <td className="relative">
                        <div className="absolute top-0 left-1 font-[PT] text-[8px]">{index + 1}</div>
                        <div className="w-8">
                          <img src={`/H1Boon/${obj.aspect}.png`} alt="Aspect" className="w-8 rounded-none" />
                        </div>
                      </td>
                      <td className="font-[Cinzel] ">
                        <div className="text-[12px] font-[PT]">{obj.name}</div>
                        <div className="text-[8px] opacity-70">{obj.aspect}</div>
                      </td>
                      <td>
                        <img src={`/H1Weapons/${obj.aspect}.png`} alt="Aspects" className="w-[120px] rounded" />
                      </td>
                      <td>
                        <div className="flex justify-start gap-0.5 my-2">
                          {obj.b &&
                            sToA(obj.b).map((item, index) => (
                              <img src={`/H1Boon/${item}.png`} alt="Core" className="size-8 rounded-none" key={index} />
                            ))}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <img draggable={false} className="size-8 rounded-none" src={`HeatCalculator.png`} />
                          <div>
                            <div>{obj.heat}</div>
                            <div className="opacity-60 text-[10px]">{obj.t}</div>
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
        </div>
      </div>
    </main>
  );
}
