import Footer from "../Comp/Footer";
import Background from "../Comp/Background";
import Sidebar from "../Comp/Sidebar";
import { v1data } from "../Data/V1data";

import { useState } from "react";
import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

import { sToA } from "../Data/Misc";
import { boonCodexr } from "../Data/Boon2";

import {
  bAphrodite,
  bZeus,
  bApollo,
  bArachne,
  bAres,
  bArtemis,
  bAthena,
  bCirce,
  bDemeter,
  bDionysus,
  bHades,
  bHephaestus,
  bHera,
  bHermes,
  bHestia,
  bIcarus,
  bMedea,
  bNarcissus,
  bPoseidon,
  bChaos,
  bDuo,
  bElemental,
  bTalent,
  bEcho,
} from "../Data/Boon1";

const filterBySet = (obj, set) => Object.fromEntries(Object.entries(obj).filter(([key]) => set.has(key)));

const character = [
  "Aph",
  "Apo",
  "Hep",
  "Her",
  "Hes",
  "Pos",
  "Dem",
  "Zeu",
  "Are",
  "Art",
  "Ath",
  "Cir",
  "Dio",
  "Eco",
  "Had",
  "Herm",
  "Ica",
  "Med",
  "Nar",
  "Cha",
  "Sel",
  "Mel",
  "Mel2",
];

export default function StatsCodex() {
  const { posts, loader } = useData();

  const availableData = [...v1data, ...(posts || [])];

  const store_boons = availableData.reduce((acc, entry) => {
    const boonArray = sToA(entry.boon); // Convert string to array

    boonArray.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});

  //
  const sets = {
    set1: new Set(Object.values(bAphrodite)),
    set2: new Set(Object.values(bApollo)),
    set3: new Set(Object.values(bHephaestus)),
    set4: new Set(Object.values(bHera)),
    set5: new Set(Object.values(bHestia)),
    set6: new Set(Object.values(bPoseidon)),
    set7: new Set(Object.values(bDemeter)),
    set8: new Set(Object.values(bZeus)),
    set9: new Set(Object.values(bAres)),

    set10: new Set(Object.values(bArtemis)),
    set11: new Set(Object.values(bAthena)),
    set12: new Set(Object.values(bCirce)),
    set13: new Set(Object.values(bDionysus)),
    set14: new Set(Object.values(bEcho)),
    set15: new Set(Object.values(bHades)),
    set16: new Set(Object.values(bHermes)),
    set17: new Set(Object.values(bIcarus)),
    set18: new Set(Object.values(bMedea)),

    set19: new Set(Object.values(bNarcissus)),
    set20: new Set(Object.values(bChaos)),
    set21: new Set(Object.values(bTalent)),
    set22: new Set(Object.values(bElemental)),
    set23: new Set(Object.values(bDuo)),
  };
  //
  const boonAph = Object.entries(filterBySet(store_boons, sets.set1)).sort((a, b) => b[1] - a[1]);
  const boonApo = Object.entries(filterBySet(store_boons, sets.set2)).sort((a, b) => b[1] - a[1]);
  const boonHep = Object.entries(filterBySet(store_boons, sets.set3)).sort((a, b) => b[1] - a[1]);
  const boonHer = Object.entries(filterBySet(store_boons, sets.set4)).sort((a, b) => b[1] - a[1]);
  const boonHes = Object.entries(filterBySet(store_boons, sets.set5)).sort((a, b) => b[1] - a[1]);
  const boonPos = Object.entries(filterBySet(store_boons, sets.set6)).sort((a, b) => b[1] - a[1]);
  const boonDem = Object.entries(filterBySet(store_boons, sets.set7)).sort((a, b) => b[1] - a[1]);
  const boonZeu = Object.entries(filterBySet(store_boons, sets.set8)).sort((a, b) => b[1] - a[1]);
  const boonAre = Object.entries(filterBySet(store_boons, sets.set9)).sort((a, b) => b[1] - a[1]);

  const boonArt = Object.entries(filterBySet(store_boons, sets.set10)).sort((a, b) => b[1] - a[1]);
  const boonAth = Object.entries(filterBySet(store_boons, sets.set11)).sort((a, b) => b[1] - a[1]);
  const boonCir = Object.entries(filterBySet(store_boons, sets.set12)).sort((a, b) => b[1] - a[1]);
  const boonDio = Object.entries(filterBySet(store_boons, sets.set13)).sort((a, b) => b[1] - a[1]);
  const boonEco = Object.entries(filterBySet(store_boons, sets.set14)).sort((a, b) => b[1] - a[1]);
  const boonHad = Object.entries(filterBySet(store_boons, sets.set15)).sort((a, b) => b[1] - a[1]);
  const boonHerm = Object.entries(filterBySet(store_boons, sets.set16)).sort((a, b) => b[1] - a[1]);
  const boonIca = Object.entries(filterBySet(store_boons, sets.set17)).sort((a, b) => b[1] - a[1]);
  const boonMed = Object.entries(filterBySet(store_boons, sets.set18)).sort((a, b) => b[1] - a[1]);

  const boonNar = Object.entries(filterBySet(store_boons, sets.set19)).sort((a, b) => b[1] - a[1]);
  const boonCha = Object.entries(filterBySet(store_boons, sets.set20)).sort((a, b) => b[1] - a[1]);
  const boonTal = Object.entries(filterBySet(store_boons, sets.set21)).sort((a, b) => b[1] - a[1]);
  const boonEle = Object.entries(filterBySet(store_boons, sets.set22)).sort((a, b) => b[1] - a[1]);
  const boonDuo = Object.entries(filterBySet(store_boons, sets.set23)).sort((a, b) => b[1] - a[1]);

  const boon_top3 = [
    boonAph,
    boonApo,
    boonHep,
    boonHer,
    boonHes,
    boonPos,
    boonDem,
    boonZeu,
    boonAre,
    boonArt,
    boonAth,
    boonCir,
    boonDio,
    boonEco,
    boonHad,
    boonHerm,
    boonIca,
    boonMed,
    boonNar,
    boonCha,
    boonTal,
    boonEle,
    boonDuo,
  ];

  return (
    <>
      <Background />
      <Sidebar />
      {loader ? (
        <Loading />
      ) : (
        <div className="w-full max-w-[2000px] mx-auto p-2 py-10 font-[Ale] text-[12px] select-none pointer-events-none">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-2 gap-y-6">
            {boon_top3.map((arr, ind1) => (
              <div>
                <img src={`/Character/${character[ind1]}.webp`} alt="Character" className="h-[125px] w-auto mx-auto" />
                <div className="bg-gradient-to-b from-black to-transparent border-t-4 border-black rounded-xl">
                  {arr.slice(0, 5).map((obj, ind2) => {
                    const calcValue = ((obj[1] / availableData.length) * 100).toFixed(2);
                    return (
                      <div
                        className={`flex items-center gap-2 my-1 rounded py-0.5 px-1 ${
                          calcValue > 25 ? `text-[#00ffaa]` : `text-white`
                        }`}
                        key={ind2}
                      >
                        <img
                          draggable={false}
                          src={`/P9/${boonCodexr[obj[0]]}.png`}
                          alt="Core Boon"
                          className="size-8 rounded-full"
                        />
                        <div className={`flex items-center justify-between w-full`}>
                          <div>{obj[0]}</div>
                          <div>{calcValue}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
