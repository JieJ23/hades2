import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { sToA, deCodeArcana, deckMatch } from "../Data/Misc";
import { p9boons } from "../Data/P9BoonObj";
import { findValue, orderMap } from "../App";
import { Link } from "react-router-dom";

import { savestates } from "../Data/SavesData";

import { p9data } from "../Data/P9Data";
import { p11data } from "../Data/P11Data";

const findBoss = (loc) => {
  switch (loc) {
    case `Tartarus`:
      return `Chronos`;
    case `Oceanus`:
      return `Scylla`;
    case `Fields`:
      return `Cerberus`;
    case `Erebus`:
      return `Hecate`;
    case `Olympus`:
      return `Prometheus`;
  }
};

export default function Playground() {
  // const displayData = savestates.sort((a, b) => b.fea - a.fea);

  const allPatches = [...p9data, ...p11data].sort((a, b) => new Date(b.dat) - new Date(a.dat));

  const fear60 = allPatches.filter((obj) => obj.fea >= 60);
  const fear50 = allPatches.filter((obj) => obj.fea >= 50 && obj.fea < 60);
  const fear32 = allPatches.filter((obj) => obj.fea >= 22 && obj.fea < 50);

  return (
    <main className="relative">
      <Background />
      <Head />
      <div className="max-w-[1200px] font-[Source] text-[11px] mx-auto">
        <SideNav />
        {/* <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-1 px-2">
          {displayData.map((obj, index) => (
            <div
              key={index}
              className="border-1 border-[black] rounded bg-[#28282bb5] flex flex-col justify-between gap-1 gap p-1"
            >
              <div className="flex flex-wrap gap-1 text-[11px]">
                <div className="px-2 py-1 bg-[#00ffaa] text-black rounded">{obj.share}</div>
                <div className="px-2 py-1 bg-[#00ffaa] text-black rounded">{obj.asp}</div>
                <div className="px-2 py-1 bg-[#00ffaa] text-black rounded">{obj.patch}</div>
                <div className="px-2 py-1 bg-[#131111] rounded">{obj.fam}</div>
                <div className="px-2 py-1 bg-[#131111] rounded">{obj.loc}</div>
                <div className="px-2 py-1 bg-[#131111] rounded">{obj.ks}</div>
                <div className="px-2 py-1 bg-[#f18043] text-black rounded">{obj.fea}</div>
              </div>
              <div>
                <div className="flex flex-wrap gap-0.5 p-0.5">
                  {sToA(obj.cor).map((ite, index) => (
                    <div className="tooltip shrink-0" key={index}>
                      <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                        <div className="font-[Source] text-[11px]">{ite}</div>
                      </div>
                      <img
                        draggable={false}
                        src={`/H2Boons/${ite}.png`}
                        alt="Core Boon"
                        className="size-7 border-1 border-black rounded-lg"
                      />
                    </div>
                  ))}
                </div>
                {obj.oth && (
                  <div className="flex flex-wrap gap-0.5 p-0.5">
                    {findValue(
                      sToA(obj.oth).sort((a, b) => {
                        const aIndex = orderMap.get(a) ?? Infinity;
                        const bIndex = orderMap.get(b) ?? Infinity;
                        return aIndex - bIndex;
                      })
                    ).map((ite, index) => (
                      <div className="tooltip shrink-0" key={index}>
                        <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                          <div className="font-[Source] text-[11px]">{p9boons[ite]}</div>
                        </div>
                        <img
                          draggable={false}
                          src={`/P9/${ite}.png`}
                          alt="Core Boon"
                          className="size-7 border-1 border-black rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <img src={`Enemy/Biome${obj.loc}.png`} alt="Biome" className="h-[100px]" />
                <img src={`Enemy/${findBoss(obj.loc)}.png`} alt="Biome" className="h-[100px]" />
              </div>
              <div className="flex flex-wrap gap-1 gap-y-0.5 text-[10px]">
                {obj.arcana &&
                  deCodeArcana(obj.arcana)
                    .map((ite) => deckMatch[ite])
                    .map((ite) => <div className="px-1 py-0.5 bg-[#131111] rounded">{ite}</div>)}
              </div>
              <div className="flex text-[11px] gap-1 w-full">
                <Link
                  className="w-full flex justify-center items-center py-1 bg-[#fff] text-black border-1 border-black rounded"
                  to={obj.save}
                  target="_blank"
                >
                  <div>{`Savestates`}</div>
                  <img src={`/Misc/ra.png`} alt="Oath" className="size-3" draggable={false} />
                </Link>
                <Link
                  className="w-full flex justify-center items-center py-1 bg-[#fff] text-black border-1 border-black rounded"
                  to={obj.arcana}
                  target="_blank"
                >
                  <div>{`Arcana`}</div>
                  <img src={`/Misc/ra.png`} alt="Oath" className="size-3" draggable={false} />
                </Link>
                <Link
                  className="w-full flex justify-center items-center py-1 bg-[#fff] text-black border-1 border-black rounded"
                  to={obj.oath}
                  target="_blank"
                >
                  <div>{`Vows`}</div>
                  <img src={`/Misc/ra.png`} alt="Oath" className="size-3" draggable={false} />
                </Link>
              </div>
            </div>
          ))}
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 py-4">
          <div>
            <div className="text-center text-[12px] font-[Cinzel]">{`Fear >= 60`}</div>
            {fear60.map((obj, index) => (
              <div className="flex items-center gap-0.5 px-2 rounded justify-center">
                <div>#{fear60.length - index}</div>
                {sToA(obj.cor).map((ite, index) => (
                  <div className="tooltip shrink-0" key={index}>
                    <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                      <div className="font-[Source] text-[12px]">{ite}</div>
                    </div>
                    <img
                      draggable={false}
                      src={`/H2Boons/${ite}.png`}
                      alt="Core Boon"
                      className="size-7 md:size-8 border-1 border-black rounded-lg"
                    />
                  </div>
                ))}
                <img
                  draggable={false}
                  src={`/P9/${obj.asp}.png`}
                  alt="Core Boon"
                  className="size-7 md:size-8 border-1 border-black rounded-lg"
                />
                <img
                  draggable={false}
                  src={`/P9/${obj.fam}.png`}
                  alt="Core Boon"
                  className="size-7 md:size-8 border-1 border-black rounded-lg"
                />
              </div>
            ))}
          </div>
          <div>
            <div className="text-center text-[12px] font-[Cinzel]">{`Fear 50 - 60`}</div>
            {fear50.map((obj, index) => (
              <div className="flex items-center gap-0.5 px-2 rounded justify-center">
                <div>#{fear50.length - index}</div>
                {sToA(obj.cor).map((ite, index) => (
                  <div className="tooltip shrink-0" key={index}>
                    <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                      <div className="font-[Source] text-[12px]">{ite}</div>
                    </div>
                    <img
                      draggable={false}
                      src={`/H2Boons/${ite}.png`}
                      alt="Core Boon"
                      className="size-7 md:size-8 border-1 border-black rounded-lg"
                    />
                  </div>
                ))}
                <img
                  draggable={false}
                  src={`/P9/${obj.asp}.png`}
                  alt="Core Boon"
                  className="size-7 md:size-8 border-1 border-black rounded-lg"
                />
                <img
                  draggable={false}
                  src={`/P9/${obj.fam}.png`}
                  alt="Core Boon"
                  className="size-7 md:size-8 border-1 border-black rounded-lg"
                />
              </div>
            ))}
          </div>
          <div>
            <div className="text-center text-[12px] font-[Cinzel]">{`Fear < 50`}</div>
            {fear32.map((obj, index) => (
              <div className="flex items-center gap-0.5 px-2 rounded justify-center">
                <div>#{fear32.length - index}</div>
                {sToA(obj.cor).map((ite, index) => (
                  <div className="tooltip shrink-0" key={index}>
                    <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded">
                      <div className="font-[Source] text-[12px]">{ite}</div>
                    </div>
                    <img
                      draggable={false}
                      src={`/H2Boons/${ite}.png`}
                      alt="Core Boon"
                      className="size-7 md:size-8 border-1 border-black rounded-lg"
                    />
                  </div>
                ))}
                <img
                  draggable={false}
                  src={`/P9/${obj.asp}.png`}
                  alt="Core Boon"
                  className="size-7 md:size-8 border-1 border-black rounded-lg"
                />
                <img
                  draggable={false}
                  src={`/P9/${obj.fam}.png`}
                  alt="Core Boon"
                  className="size-7 md:size-8 border-1 border-black rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
