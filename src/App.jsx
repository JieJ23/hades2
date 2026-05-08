import SideNav from "./Comp/Sidebar";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";

import { useData } from "./Hook/DataFetch";
import Loading from "./Hook/Loading";
import { bundleData } from "./Data/DataBundle";
// Utility
import { sToA, findValue, orderMap, parseTimetoms, getPoolColor, getYTid } from "./Data/Misc";
import { p9boons } from "./Data/P9BoonObj";
import { Link } from "react-router-dom";
import { h2AspectOrder } from "./Data/Misc";

import { useMemo, useState } from "react";

export default function App() {
  const { posts, loader } = useData();

  const orderData = useMemo(() => {
    return [...bundleData, ...posts].sort((a, b) => {
      const feaDiff = +b.fea - +a.fea;
      if (feaDiff !== 0) return feaDiff;
      return parseTimetoms(a.tim) - parseTimetoms(b.tim);
    });
  }, [posts]);

  const [runs62, runs65, runs67] = orderData.reduce(
    (acc, item) => {
      if (item.fea == 62) {
        acc[0].push(item);
      } else if (item.fea == 65 && item.des.includes("#usum")) {
        acc[1].push(item);
      } else if (item.fea == 67 && item.des.includes("#usum")) {
        acc[2].push(item);
      }
      return acc;
    },
    [[], [], []],
  );
  const allAvailablePlayers = [...new Set(orderData.map((obj) => obj.nam))];
  const [aspects50, aspects62, aspects65] = allAvailablePlayers.reduce(
    (acc, playerName) => {
      const playerArray = orderData.filter((obj) => obj.nam === playerName);
      const above50 = playerArray.filter((obj) => obj.fea >= 50);
      const above62 = above50.filter((obj) => obj.fea >= 62);
      const above65 = above62.filter((obj) => obj.fea >= 65);
      const uniqueAspects50 = [...new Set(above50.map((obj) => obj.asp))];
      const uniqueAspects62 = [...new Set(above62.map((obj) => obj.asp))];
      const uniqueAspects65 = [...new Set(above65.map((obj) => obj.asp))];

      if (uniqueAspects50.length === 24) {
        acc[0].push(playerName);

        if (uniqueAspects62.length === 24) {
          acc[1].push(playerName);
        }

        if (uniqueAspects65.length === 24) {
          acc[2].push(playerName);
        }
      }

      return acc;
    },
    [[], [], []],
  );
  const allaspect65 = aspects65.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const allaspect62 = aspects62
    .filter((item) => !allaspect65.includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const allaspect50 = aspects50
    .filter((item) => ![...allaspect62, ...allaspect65].includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const allplayers67 = [...new Set(runs67.map((obj) => obj.nam))].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );
  const allplayers65 = [...new Set(runs65.map((obj) => obj.nam))]
    .filter((item) => !allplayers67.includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const allplayers62 = [...new Set(runs62.map((obj) => obj.nam))]
    .filter((item) => ![...allplayers65, ...allplayers67].includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  //

  const under67 = runs67.filter((obj) => obj.loc === "Underworld").filter((obj) => obj.des.includes("#usum"));
  const surface67 = runs67.filter((obj) => obj.loc === "Surface").filter((obj) => obj.des.includes("#usum"));
  const dream67 = runs67
    .filter((obj) => obj.loc != "Underworld" && obj.loc != "Surface")
    .filter((obj) => obj.des.includes("#usum"));
  const uwAspects = [];
  const surfaceAspect = [];

  for (let i = 0; i < h2AspectOrder.length; i++) {
    if (under67.some((obj) => obj.asp === h2AspectOrder[i])) {
      uwAspects.push(h2AspectOrder[i]);
    } else {
      uwAspects.push("Slot1");
    }
    if (surface67.some((obj) => obj.asp === h2AspectOrder[i])) {
      surfaceAspect.push(h2AspectOrder[i]);
    } else {
      surfaceAspect.push("Slot1");
    }
  }

  const sub1060 = [
    ...new Set(
      runs62
        .filter((obj) => obj.des && obj.des.includes("#usum") && parseTimetoms(obj.tim) <= 60000)
        .map((obj) => obj.nam),
    ),
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const maxFearDreamPlayers = [...new Set(dream67.map((obj) => obj.nam))];

  return (
    <main className="h-full min-h-lvh relative overflow-hidden text-[12px] md:text-[14px] font-[Ale] select-none">
      <Background />
      <SideNav />
      {loader ? (
        <Loading />
      ) : (
        <>
          <div
            className="text-center font-[Exo] p-2 max-w-[1200px] mx-auto md:text-[16px] mt-4"
            style={{
              backgroundImage: `url('/Misc/fl3.webp'),url('/Misc/fr3.webp'),url('/Misc/fm3.webp')`,
              backgroundPosition: "left center, right center, center center",
              backgroundRepeat: "no-repeat, no-repeat, repeat",
              backgroundSize: "contain, contain, contain",
            }}
          >
            Community Max Fear Conquest
          </div>
          <div className="flex flex-col md:flex-row justify-center max-w-[1200px] mx-auto bg-gradient-to-br from-green-300/30 via-transparent to-yellow-200/30 rounded-b-xl relative">
            <div
              className="absolute top-0 left-0 w-full h-full -z-10"
              style={{
                borderStyle: "solid", // Required
                borderWidth: "15px",
                borderImage: "url('/dynamic.png') 30 stretch",
              }}
            />
            <div className="w-full flex flex-wrap justify-center mx-auto p-4">
              {uwAspects.map((item) => (
                <img
                  src={item === "Slot1" ? `/Slot1.png` : `/GUI_Card/c${item}.png`}
                  alt="Aspects"
                  className={`w-13 md:w-15 h-auto ${item === "Slot1" ? `opacity-50` : ``}`}
                />
              ))}
            </div>
            <div className="w-full flex flex-wrap justify-center mx-auto p-4">
              {surfaceAspect.map((item) => (
                <img
                  src={item == "Slot1" ? `/Slot1.png` : `/GUI_Card/c${item}.png`}
                  alt="Aspects"
                  className={`w-13 md:w-15 h-auto ${item === "Slot1" ? `opacity-50` : ``}`}
                />
              ))}
            </div>
          </div>
          <div className="max-w-[1400px] mx-auto p-4">
            <div className="max-w-[1000px] mx-auto">
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] text-green-300">Completed Max Fear Dream Dive</div>
                <div className="flex justify-center gap-0.5 flex-wrap">
                  {maxFearDreamPlayers.map((ite) => (
                    <div className="bg-black text-white rounded px-2 py-1 w-23 text-[12px] aspect-square mask mask-hexagon-2 flex items-center justify-center relative">
                      <img
                        src={`/Avatar/${ite.toLowerCase()}.webp`}
                        alt="Avatar"
                        className="absolute h-full w-full -z-10 top-0 left-0 object-cover opacity-70"
                        onError={(e) => {
                          e.target.src = "/Avatar/default.jpg";
                        }}
                      />
                      <div className="bg-black/50 rounded px-1">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] text-green-300">Completed Max Fear</div>
                <div className="flex justify-center gap-0.5 flex-wrap">
                  {allplayers67.map((ite) => (
                    <div className="bg-black text-white rounded px-2 py-1 w-23 text-[12px] aspect-square mask mask-hexagon flex items-center justify-center relative">
                      <img
                        src={`/Avatar/${ite.toLowerCase()}.webp`}
                        alt="Avatar"
                        className="absolute h-full w-full -z-10 top-0 left-0 object-cover opacity-70"
                        onError={(e) => {
                          e.target.src = "/Avatar/default.jpg";
                        }}
                      />
                      <div className="bg-black/50 rounded px-1">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] text-green-300">Completed 65 Fear, All Aspects</div>
                <div className="flex justify-center gap-0.5 flex-wrap">
                  {allaspect65.map((ite) => (
                    <div className="bg-black text-white rounded px-2 py-1 w-23 text-[12px] aspect-square mask mask-hexagon-2 flex items-center justify-center relative">
                      <img
                        src={`/Avatar/${ite.toLowerCase()}.webp`}
                        alt="Avatar"
                        className="absolute h-full w-full -z-10 top-0 left-0 object-cover opacity-70"
                        onError={(e) => {
                          e.target.src = "/Avatar/default.jpg";
                        }}
                      />
                      <div className="bg-black/50 rounded px-1">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] text-pink-400">Completed 62+ Fear, Sub 10 Mins</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {sub1060.map((ite) => (
                    <div className="bg-black text-white rounded px-2 py-1 w-23 text-[12px] aspect-square mask mask-hexagon-2 flex items-center justify-center relative">
                      <img
                        src={`/Avatar/${ite.toLowerCase()}.webp`}
                        alt="Avatar"
                        className="absolute h-full w-full -z-10 top-0 left-0 object-cover opacity-70"
                        onError={(e) => {
                          e.target.src = "/Avatar/default.jpg";
                        }}
                      />
                      <div className="bg-black/50 rounded px-1">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center my-8">
              <div className="font-[Exo] text-[16px] text-orange-400">Completed 65 Fear</div>
              <div className="flex justify-center gap-1 flex-wrap">
                {allplayers65.map((ite) => (
                  <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                ))}
              </div>
            </div>
            <div className="text-center my-8">
              <div className="font-[Exo] text-[16px] text-orange-300">Completed 62 Fear, All Aspects</div>
              <div className="flex justify-center gap-1 flex-wrap">
                {allaspect62.map((ite) => (
                  <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                ))}
              </div>
            </div>
            <div className="text-center my-8">
              <div className="font-[Exo] text-[16px] text-yellow-200">Completed 62 Fear</div>
              <div className="flex justify-center gap-1 flex-wrap">
                {allplayers62.map((ite) => (
                  <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                ))}
              </div>
            </div>
            <div className="text-center my-8">
              <div className="font-[Exo] text-[16px] text-yellow-200">Completed 50 Fear, All Aspects</div>
              <div className="flex justify-center gap-1 flex-wrap">
                {allaspect50.map((ite) => (
                  <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                ))}
              </div>
            </div>
            <div className="flex justify-center my-4">
              <div className="hover-3d">
                <figure className="max-w-100 rounded-2xl">
                  <img src="/CC/Melinoe.png" alt="3D card" draggable="false" />
                </figure>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </main>
  );
}
