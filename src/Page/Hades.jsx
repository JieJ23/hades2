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
    const aspectArray50 = h1sortByHeat.filter((obj) => obj.aspect === allAspects[i]).slice(0, 10);
    fullAspectArray.push(aspectArray50);
  }

  const currentDisplay = fullAspectArray[category];

  return (
    <main className="h-full min-h-lvh">
      <Head />
      <div className="flex flex-col md:flex-row gap-1">
        <SideNav />
        <div className="flex w-full flex-col lg:flex-row select-none">
          <div className="p-1 w-full">
            <ul className="list bg-base-100 rounded-box shadow-md">
              <li className="p-2 text-xs opacity-80 tracking-wide font-[PT] text-[12px]">Hades Heat</li>
              <li className="flex border-1 border-white/20 p-2 pb-1 font-[PT] text-[12px] my-0.5 bg-[#00000050] gap-1 overflow-x-scroll w-full max-w-[500px] rounded-md">
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
              {currentDisplay.map((obj, index) => (
                <li
                  className="list-row flex items-center justify-between border-1 border-white/20 p-3 px-2 font-[PT] text-[12px] my-0.5 bg-[#00000050]"
                  key={index}
                >
                  <div className="w-[100px]">
                    <div className="font-[Cinzel]">{obj.name}</div>
                  </div>
                  <div className="flex items-center gap-2 w-[100px]">
                    <img className="size-8 rounded-none" src={`/H1Boon/${obj.aspect}.png`} />
                    <div>
                      <div>{obj.aspect}</div>
                      <div className="opacity-60 text-[10px]">{obj.weapon}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-[100px]">
                    <img className="size-8 rounded-none" src={`HeatCalculator.png`} />
                    <div>{obj.heat}</div>
                  </div>
                  <div className="flex items-center gap-2 w-[100px]">
                    <img className="size-8 rounded-none" src={`time.png`} />
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
                  <div className="flex flex-col justify-center items-center">
                    <Link to={`${obj.src}`} target="_blank">
                      <button className="btn btn-square btn-ghost">
                        <div className="avatar">
                          <div className="w-8 rounded">
                            <img src={`${obj.src.includes(`bilibil`) ? `/bilibili.png` : `youtube.png`}`} />
                          </div>
                        </div>
                      </button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-1 min-w-[400px]">
            <ul className="list bg-base-100 rounded-box shadow-md">
              <li className="p-2 text-xs opacity-80 tracking-wide font-[PT] text-[12px]">64 Heat</li>
              {hades64SortByDate.map((obj, index) => (
                <li
                  className="list-row flex items-center justify-between border-1 border-white/20 p-3 px-2 font-[PT] text-[12px] my-0.5 bg-[#00000050] relative"
                  key={index}
                >
                  <div className="absolute top-0.5 left-1 text-[10px] opacity-80">
                    #{hades64SortByDate.length - index}
                  </div>
                  <div className="flex items-center gap-2">
                    <img className="size-8 rounded-none" src={`/H1Boon/${obj.a}.png`} />
                    <div>
                      <div className="font-[Cinzel]">{obj.n}</div>
                      <div className="opacity-60 text-[10px]">
                        {obj.w} - {obj.a}
                      </div>
                      <div className="text-[10px] text-[yellow]">{obj.t}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {obj.b.map((ite) => (
                      <img className="size-6 md:size-8 rounded-none" src={`/H1Boon/${ite}.png`} />
                    ))}
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <Link to={`${obj.src}`} target="_blank">
                      <button className="btn btn-square btn-ghost">
                        <div className="avatar">
                          <div className="w-8 rounded">
                            <img src={`${obj.src.includes(`bilibil`) ? `/bilibili.png` : `youtube.png`}`} />
                          </div>
                        </div>
                      </button>
                    </Link>
                    <div className="text-[cyan] text-[10px]">{obj.c}</div>
                    <div className="text-[pink] text-[10px]">{obj.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
