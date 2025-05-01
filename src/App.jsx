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
      <div className="flex flex-col md:flex-row gap-1">
        <SideNav />
        <div className="p-1 w-full overflow-hidden">
          <div className="p-2 pb-0 text-xs opacity-80 tracking-wide font-[PT] text-[12px]">
            Recent Hades II Gameplay
          </div>
          <div className="overflow-x-scroll">
            <table className="table select-none table-zebra">
              {/* head */}
              <thead>
                <tr className="font-[Cinzel]">
                  <th></th>
                  <th></th>
                  <th className="min-w-[180px]"></th>
                  <th className="min-w-[100px]"></th>
                  <th className="min-w-[100px]"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {h2Data.map((obj, index) => (
                  <tr key={index} className="font-[PT] text-[12px] overflow-hidden">
                    <td>
                      <div className="w-8">
                        <img draggable={false} className="size-8 rounded-none" src={`/H2Boons/${obj.a}.png`} />
                      </div>
                    </td>
                    <td className="font-[Cinzel]">
                      <div className="text-[10px]">{obj.n}</div>
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
                              className="size-6 md:size-8 rounded-none"
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <img
                          draggable={false}
                          className="size-6 md:size-8 rounded-none"
                          src={`/H2Boons/${obj.fam}.png`}
                        />
                        <div>
                          <div>{obj.fam}</div>
                          <div className="opacity-60 text-[10px]">Familiar</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <img draggable={false} className="size-6 md:size-8 rounded-none" src={`FearCalculator.png`} />
                        <div>
                          <div>{obj.f}</div>
                          <div className="opacity-60 text-[10px]">{obj.l}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <img draggable={false} className="size-6 md:size-8 rounded-none" src={`time.png`} />
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
                            <div className="size-6 md:size-8 rounded">
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
        {/* <div className="w-full block md:hidden xl:block xl:w-[500px] m-1 rounded font-[PT] text-[12px]">
          <div className="p-2 bg-base-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, saepe, qui placeat laudantium doloremque
            maxime voluptatum dicta blanditiis at fugit eius aspernatur facilis minima excepturi quae ad corrupti
            perspiciatis quam adipisci alias, fugiat minus dolorem a! Illum saepe neque aperiam. Cupiditate est et
            dolores nesciunt possimus consectetur architecto reiciendis minima atque nostrum in alias nihil eum quam,
            quas ex, molestiae illo inventore fugit delectus animi. Libero ullam expedita eum, voluptatibus rem
            blanditiis natus architecto incidunt. Autem sequi eligendi harum facilis provident nisi magnam nemo modi
            eius, velit libero illum quos debitis quibusdam, sed perspiciatis suscipit recusandae nostrum. Voluptates,
            quisquam dolor?
          </div>
        </div> */}
      </div>
    </main>
  );
}

export default App;
