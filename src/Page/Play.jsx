import Head from "../Comp/Head";
import Background from "../Comp/Background";
import SideNav from "../Comp/Sidebar";
import {
  bAphrodite,
  bApollo,
  bAres,
  bDemeter,
  bHephaestus,
  bHera,
  bHestia,
  bPoseidon,
  bZeus,
  bArachne,
  bArtemis,
  bAthena,
  bCirce,
  bDionysus,
  bDuo,
  bEcho,
  bHades,
  bHermes,
  bIcarus,
  bMedea,
  bNarcissus,
  bAxe,
  bDagger,
  bLob,
  bStaff,
  bSuit,
  bTorch,
  bChaos,
  bSelene,
  bElemental,
  bTalent,
  bKeep,
} from "../Data/Boon1";
import { useState } from "react";

function swapKV(obj) {
  const swapped = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Convert the value to a string to use as a key
      const valueAsKey = String(obj[key]);
      swapped[valueAsKey] = key;
    }
  }

  return swapped;
}

const gods = [bAphrodite, bApollo, bAres, bDemeter, bHephaestus, bHera, bHestia, bPoseidon, bZeus];
const Unseen = [bArachne, bArtemis, bAthena, bCirce, bDionysus, bEcho, bHades, bHermes, bIcarus, bMedea, bNarcissus];
const weapons = [bAxe, bDagger, bLob, bStaff, bSuit, bTorch];
const misc = [bDuo, bElemental];
const other = [bChaos, bSelene, bTalent];
const keep = [bKeep];

export default function Play() {
  const [category, setCategory] = useState(0);
  const [list, setList] = useState([]);

  const allCategory = [gods, Unseen, weapons, misc, other, keep];
  const allCategoryTitle = [`Gods`, `Unseen`, `Weapons`, `Duo & Elemental`, `Chaos & Selene`, `Keepsakes`];

  const displayData = allCategory[category];

  return (
    <main className="relative select-none">
      <Background />
      <Head />
      <div className="max-w-[1200px] font-[PT] text-[12px] mx-auto">
        <SideNav />
        {list.length > 0 && (
          <div className="px-2 my-2 text-[11px]">
            <div className="my-2 rounded bg-[white] p-1 text-black">{list.join(",")}</div>
            <div className="flex flex-wrap gap-0.5">
              {list.map((item) => (
                <div
                  onClick={() => setList((prev) => prev.filter((ite) => ite !== item))}
                  className="rounded bg-[#00ffaa] p-1 text-black"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-1 px-2 mt-2">
          {allCategoryTitle.map((item, index) => (
            <button className="btn btn-xs px-2 py-1 bg-[white] text-black rounded" onClick={() => setCategory(index)}>
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap px-2 mb-2">
          {displayData.map((objs) => (
            <section className="my-2 flex flex-wrap gap-1">
              {category === 5
                ? objs.map((item) => (
                    <div
                      className={`flex items-center gap-2 rounded px-2 py-1 ${
                        list.includes(item) ? `bg-[#00ffaa] text-black` : `bg-[#28282bc0]`
                      }`}
                      onClick={() => {
                        if (!list.includes(item)) {
                          setList((prev) => [...prev, item]);
                        }
                      }}
                    >
                      <img src={`buildgui/${[item]}.png`} alt="Boons" className="size-9" draggable={false} />
                      <div>{item}</div>
                    </div>
                  ))
                : Object.keys(swapKV(objs)).map((item) => (
                    <div
                      className={`flex items-center gap-2 rounded px-2 py-1 ${
                        list.includes(item) ? `bg-[#00ffaa] text-black` : `bg-[#28282bc0]`
                      }`}
                      onClick={() => {
                        if (!list.includes(item)) {
                          setList((prev) => [...prev, item]);
                        }
                      }}
                    >
                      {category === 2 ? (
                        <img
                          src={`P9/Hammer${swapKV(objs)[item]}.png`}
                          alt="Boons"
                          className="size-9"
                          draggable={false}
                        />
                      ) : (
                        <img src={`P9/${swapKV(objs)[item]}.png`} alt="Boons" className="size-9" draggable={false} />
                      )}

                      <div>{item}</div>
                    </div>
                  ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
