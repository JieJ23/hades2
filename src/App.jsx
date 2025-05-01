import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";
import { h2Data } from "./Data/H2Data";
import { Link } from "react-router-dom";

function sToA(string) {
  const array = string.split(`,`);
  return array;
}

function App() {
  return (
    <main className="h-full min-h-lvh">
      <Head />
      <div className="flex flex-col md:flex-row gap-1 max-w-[1400px] mx-auto">
        <SideNav />
        <div className="p-1 w-full overflow-hidden">
          <div className="overflow-x-scroll">
            <table className="table select-none table-zebra">
              <thead>
                <tr className="font-[Cinzel]">
                  <th className="text-[10px] text-white"> Hades II</th>
                  <th></th>
                  <th className="min-w-[150px]"></th>
                  <th className="min-w-[100px]"></th>
                  <th className="min-w-[100px]"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {h2Data.map((obj, index) => (
                  <tr key={index} className="font-[PT] text-[12px] overflow-hidden">
                    <td className="absolute">
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
                          <div className="opacity-60 text-[10px]">Familiar</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <img draggable={false} className="size-8 rounded-none" src={`FearCalculator.png`} />
                        <div>
                          <div>{obj.f}</div>
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
