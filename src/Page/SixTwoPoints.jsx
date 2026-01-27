import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { v1bundle, eabundle } from "../Data/DataBundle";
import { useState } from "react";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

import { parseTimetoms, h2AspectOrder } from "../Data/Misc";

//
export default function SixTwoPoints() {
  const { posts, loader } = useData();
  const [category, setCategory] = useState(null);
  const [addea, setAddEa] = useState(true);

  const availableData = [...(addea ? eabundle : []), ...v1bundle, ...(posts || [])]
    .filter((obj) => obj.fea == 62)
    .filter((obj) => {
      if (category === null) {
        return obj.loc;
      } else {
        return obj.loc === category;
      }
    });
  const availablePlayer = [...new Set(availableData.map((obj) => obj.nam))];

  const store_pb = [];
  for (let i = 0; i < availablePlayer.length; i++) {
    const store = [];

    const player_runs = availableData.filter((obj) => obj.nam === availablePlayer[i]);
    const availableAspects = [...new Set(player_runs.map((obj) => obj.asp))];

    for (let x = 0; x < availableAspects.length; x++) {
      const aspect_runs = player_runs
        .filter((obj) => obj.asp === availableAspects[x])
        .sort((a, b) => parseTimetoms(a.tim) - parseTimetoms(b.tim))
        .sort((a, b) => +b.fea - +a.fea);
      store.push(aspect_runs[0]);
    }
    store_pb.push(store);
  }
  const finalized_store = store_pb
    .sort((a, b) => b.reduce((a, b) => a + +b.fea, 0) - a.reduce((a, b) => a + +b.fea, 0))
    .slice(0, 50);

  finalized_store.forEach((arr) => {
    arr.sort((a, b) => h2AspectOrder.indexOf(a.asp) - h2AspectOrder.indexOf(b.asp));
  });

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <SideNav />
      <div className="max-w-[1600px] mx-auto px-2">
        {loader ? (
          <Loading />
        ) : (
          <div className="my-6 font-[Ale] text-[12px] md:text-[13px]">
            <div className="flex flex-wrap gap-1 justify-center mb-2">
              <div
                className={`${
                  category === null ? `bg-white text-black` : `text-white`
                } px-2 py-1 rounded cursor-pointer`}
                onClick={() => setCategory(null)}
              >
                Both Region
              </div>
              <div
                className={`${
                  category === `Surface` ? `bg-white text-black` : `text-white`
                } px-2 py-1 rounded cursor-pointer`}
                onClick={() => setCategory(`Surface`)}
              >
                Surface
              </div>
              <div
                className={`${
                  category === `Underworld` ? `bg-white text-black` : `text-white`
                } px-2 py-1 rounded cursor-pointer`}
                onClick={() => setCategory(`Underworld`)}
              >
                Underworld
              </div>
              <div
                className={`${addea === true ? `bg-white text-black` : `text-white`} px-2 py-1 rounded cursor-pointer`}
                onClick={() => setAddEa(!addea)}
              >
                Early Access
              </div>
            </div>
            <div className="overflow-x-scroll my-4">
              <table className="table whitespace-nowrap table-xs font-[Ubuntu] bg-black/80 border-separate border-spacing-0.5 rounded-none">
                <thead className="font-[Ale] bg-black">
                  <tr>
                    <th>IDX</th>
                    <th>Player</th>
                    {h2AspectOrder.map((ite) => (
                      <th className="min-w-15">
                        <div className="min-w-[32px] flex justify-center">
                          <img src={`/P9/${ite}.png`} alt="Aspects" className="size-8" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {finalized_store.map((obj, ind) => {
                    // build lookup for this row
                    const byAspect = {};
                    obj.forEach((item) => {
                      byAspect[item.asp] = item;
                    });

                    return (
                      <tr key={ind}>
                        <td className="border border-white/10">{ind + 1}</td>
                        <td className="border border-white/10">{obj[0].nam}</td>
                        {h2AspectOrder.map((asp) => {
                          const entry = byAspect[asp];
                          return (
                            <td
                              key={asp}
                              className={`border border-white/10 text-black text-center ${entry && (parseTimetoms(entry.tim) < 72000 ? `bg-[#00ffaa]` : parseTimetoms(entry.tim) < 84000 ? `bg-[red]` : parseTimetoms(entry.tim) < 90000 ? `bg-[orange]` : parseTimetoms(entry.tim) > 0 ? `bg-[lightblue]` : `text-white`)}`}
                            >
                              {entry ? entry.tim : "-"}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
