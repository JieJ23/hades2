import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { p9data } from "../Data/P9Data";
import { v1data } from "../Data/V1data";
import { p11data } from "../Data/P11Data";
import { useState } from "react";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

import { parseTimetoms, h2AspectOrder } from "../Data/Misc";

//
export default function FearPoints() {
  const { posts, loader } = useData();
  const [category, setCategory] = useState(null);
  const [addea, setAddEa] = useState(true);

  const availableData = [...(addea ? p9data : []), ...(addea ? p11data : []), ...v1data, ...(posts || [])].filter(
    (obj) => {
      if (category === null) {
        return obj.loc;
      } else {
        return obj.loc === category;
      }
    }
  );
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
  const finalized_store = store_pb.sort(
    (a, b) => b.reduce((a, b) => a + +b.fea, 0) - a.reduce((a, b) => a + +b.fea, 0)
  );

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1400px] mx-auto px-2">
        <SideNav />
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
            <div>
              {finalized_store.map((arr, index) => {
                const haveAspects = [...new Set(finalized_store[index].map((obj) => obj.asp))];
                const totalPoints = finalized_store[index].reduce((a, b) => a + +b.fea, 0);
                return (
                  <div className="bg-black/80 mb-1 p-2 rounded">
                    <div className="text-[16px] flex justify-between">
                      <div>{arr[0].nam}</div>
                      <div className="flex gap-4">
                        <div>{finalized_store[index].length} Aspects</div>
                        <div>{totalPoints} Points</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-12 xl:grid-cols-24 gap-2 items-center py-1">
                      {h2AspectOrder.map((item, index2) =>
                        haveAspects.includes(item) ? (
                          <div className="flex flex-col items-center">
                            <img src={`/P9/${item}.png`} alt="Aspects" className="size-10 mx-auto" />
                            <div className="text-[12px]">
                              {finalized_store[index].find((obj) => obj.asp === item).fea}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <div className={`size-10 rounded-sm bg-[#131111] mx-auto`} />
                            <div className="text-[12px]">-</div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
