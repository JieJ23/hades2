import Footer from "../Comp/Footer";
import Background from "../Comp/Background";
import Sidebar from "../Comp/Sidebar";

import { v1bundle, eabundle } from "../Data/DataBundle";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

import { sToA, h2AspectOrder } from "../Data/Misc";
import { boonCodexr } from "../Data/Boon2";
import { p9boons_reverse } from "../Data/P9BoonObj";

import {
  bAphrodite,
  bZeus,
  bApollo,
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
  bStaff,
  bDagger,
  bAxe,
  bSuit,
  bLob,
  bTorch,
} from "../Data/Boon1";

import { useState } from "react";

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
  "Inf",
  "Duo",
];

const weaponLabel = [`Staff`, `Blades`, `Axe`, `Torch`, `Lob`, `Suit`];

export default function StatsCodex() {
  const { posts, loader } = useData();
  const [minfear, setMinFear] = useState(1);
  const [maxfear, setMaxFear] = useState(67);
  const [aspect, setAspect] = useState("All");

  const boonAvailableData = [...eabundle].filter((obj) => obj.boon);

  const availableData = [...boonAvailableData, ...v1bundle, ...(posts || [])]
    .filter((obj) => obj.fea >= +minfear && obj.fea <= +maxfear)
    .filter((obj) => {
      if (aspect === "All") {
        return obj.asp;
      } else {
        return obj.asp === aspect;
      }
    });

  const store_boons = availableData.reduce((acc, entry) => {
    const boonArray = sToA(entry.boon); // Convert string to array

    boonArray.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});

  const store_core = availableData.reduce((acc, entry) => {
    const boonArray = sToA(entry.cor); // Convert string to array

    boonArray.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});

  const store_ham = availableData.reduce((acc, entry) => {
    const boonArray = sToA(entry.ham); // Convert string to array

    boonArray.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});
  //
  const categories = {
    Attack: [],
    Special: [],
    Cast: [],
    Sprint: [],
    Magick: [],
  };
  // 1️⃣ Categorize (fast single pass)
  for (const [key, value] of Object.entries(store_core)) {
    if (key.endsWith("Attack")) categories.Attack.push({ key, value });
    else if (key.endsWith("Special")) categories.Special.push({ key, value });
    else if (key.endsWith("Cast")) categories.Cast.push({ key, value });
    else if (key.endsWith("Sprint")) categories.Sprint.push({ key, value });
    else if (key.endsWith("Magick")) categories.Magick.push({ key, value });
  }

  // 2️⃣ Sort each category by value (descending)
  for (const type in categories) {
    categories[type].sort((a, b) => b.value - a.value);
  }

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

    set24: new Set(Object.values(bStaff)),
    set25: new Set(Object.values(bDagger)),
    set26: new Set(Object.values(bAxe)),
    set27: new Set(Object.values(bTorch)),
    set28: new Set(Object.values(bLob)),
    set29: new Set(Object.values(bSuit)),
  };

  //
  const boonAph = Object.entries(filterBySet(store_boons, sets.set1))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonApo = Object.entries(filterBySet(store_boons, sets.set2))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonHep = Object.entries(filterBySet(store_boons, sets.set3))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonHer = Object.entries(filterBySet(store_boons, sets.set4))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonHes = Object.entries(filterBySet(store_boons, sets.set5))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonPos = Object.entries(filterBySet(store_boons, sets.set6))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonDem = Object.entries(filterBySet(store_boons, sets.set7))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonZeu = Object.entries(filterBySet(store_boons, sets.set8))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonAre = Object.entries(filterBySet(store_boons, sets.set9))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const boonArt = Object.entries(filterBySet(store_boons, sets.set10))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonAth = Object.entries(filterBySet(store_boons, sets.set11))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonCir = Object.entries(filterBySet(store_boons, sets.set12))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonDio = Object.entries(filterBySet(store_boons, sets.set13))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonEco = Object.entries(filterBySet(store_boons, sets.set14))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonHad = Object.entries(filterBySet(store_boons, sets.set15))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonHerm = Object.entries(filterBySet(store_boons, sets.set16))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonIca = Object.entries(filterBySet(store_boons, sets.set17))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonMed = Object.entries(filterBySet(store_boons, sets.set18))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const boonNar = Object.entries(filterBySet(store_boons, sets.set19))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonCha = Object.entries(filterBySet(store_boons, sets.set20))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonTal = Object.entries(filterBySet(store_boons, sets.set21))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonEle = Object.entries(filterBySet(store_boons, sets.set22))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonDuo = Object.entries(filterBySet(store_boons, sets.set23))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const boonStaff = Object.entries(filterBySet(store_ham, sets.set24))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonDagger = Object.entries(filterBySet(store_ham, sets.set25))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonAxe = Object.entries(filterBySet(store_ham, sets.set26))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonTorch = Object.entries(filterBySet(store_ham, sets.set27))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonLob = Object.entries(filterBySet(store_ham, sets.set28))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const boonSuit = Object.entries(filterBySet(store_ham, sets.set29))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

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
  const boon_arms = [boonStaff, boonDagger, boonAxe, boonTorch, boonLob, boonSuit];
  //

  return (
    <>
      <Background />
      <Sidebar />
      {loader ? (
        <Loading />
      ) : (
        <div className="w-full max-w-[1600px] mx-auto font-[Ale] text-[12px] md:text-[13px] select-none">
          <div className="flex gap-1 px-2 justify-center my-4">
            <div>
              <div>Min Fear</div>
              <input
                type="number"
                placeholder="Min Fear"
                className="input input-sm w-[80px]"
                onChange={(e) => setMinFear(e.target.value)}
                value={minfear}
                max={67}
                min={1}
              />
            </div>
            <div>
              <div>Max Fear</div>
              <input
                type="number"
                placeholder="Max Fear"
                className="input input-sm w-[80px]"
                onChange={(e) => setMaxFear(e.target.value)}
                value={maxfear}
                max={67}
                min={1}
              />
            </div>
            <div>
              <div>Aspect</div>
              <select
                defaultValue="Pick Aspect"
                className="select select-sm"
                onChange={(e) => setAspect(e.target.value)}
              >
                <option value="All">All</option>
                {h2AspectOrder.map((ite, index) => (
                  <option value={ite} key={index}>
                    {ite}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1 gap-y-6 my-5 px-2">
              {boon_arms.map((arr, ind1) => {
                const calcValue = Object.entries(arr).reduce((a, b) => a + b[1][1], 0);
                return (
                  <div>
                    <div
                      className="text-[20px] font-[Cinzel] text-center bg-black rounded-none py-2"
                      style={{
                        backgroundImage: `
      url('/Misc/fl.webp'),
      url('/Misc/fr.webp'),
      url('/Misc/fm.webp')
    `,
                        backgroundPosition: "left center, right center, center center",
                        backgroundRepeat: "no-repeat, no-repeat, repeat",
                        backgroundSize: "contain, contain, contain",
                      }}
                    >
                      {weaponLabel[ind1]}
                    </div>
                    <div className="bg-gradient-to-b from-[black] via-black to-[#131111]/60 rounded-none px-2">
                      {arr.map((obj, ind2) => {
                        return (
                          <div className={`flex items-center gap-1 rounded py-0.5 px-1 mb-0.5`} key={ind2}>
                            <img
                              loading="lazy"
                              draggable={false}
                              src={`/P9/${p9boons_reverse[obj[0]]}.png`}
                              alt="Core Boon"
                              className="size-8 rounded-full"
                            />
                            <div className={`flex items-center justify-between w-full `}>
                              <div>{obj[0]}</div>
                              <div>{((obj[1] / calcValue) * 100).toFixed(2)}%</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          }
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 gap-y-6 my-5 p-2 w-full max-w-[1600px] mx-auto">
            {Object.entries(categories).map((arr) => (
              <div className="bg-gradient-to-b from-[black] to-[#131111]/60 rounded h-full">
                <div
                  className="text-[20px] font-[Cinzel] text-center bg-black rounded-none py-2"
                  style={{
                    backgroundImage: `
      url('/Misc/fl.webp'),
      url('/Misc/fr.webp'),
      url('/Misc/fm.webp')
    `,
                    backgroundPosition: "left center, right center, center center",
                    backgroundRepeat: "no-repeat, no-repeat, repeat",
                    backgroundSize: "contain, contain, contain",
                  }}
                >
                  {arr[0]}
                </div>
                {arr[1].map((obj) => {
                  const calcValue = ((obj.value / availableData.length) * 100).toFixed(2);
                  return (
                    <div className={`flex items-center gap-2 rounded py-0.5 px-1 mb-0.5`}>
                      <img loading="lazy" src={`/P9/${obj.key}.png`} alt="Core" className="size-8 rounded-full" />
                      <div className="w-full flex items-center justify-between">
                        <div>{obj.key}</div>
                        <div>{calcValue}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 gap-y-6 my-5 px-2">
            {boon_top3.map((arr, ind1) => {
              if (boon_top3[ind1].length == 0) {
                return;
              }
              return (
                <div>
                  <div
                    className="text-[20px] font-[Cinzel] text-center text-white bg-black rounded-none py-2"
                    style={{
                      backgroundImage: `
      url('/Misc/fl.webp'),
      url('/Misc/fr.webp'),
      url('/Misc/fm.webp')
    `,
                      backgroundPosition: "left center, right center, center center",
                      backgroundRepeat: "no-repeat, no-repeat, repeat",
                      backgroundSize: "contain, contain, contain",
                    }}
                  >
                    {character[ind1]}
                  </div>
                  <div className="bg-gradient-to-b from-[black] to-[#131111]/60 rounded-none">
                    {arr.map((obj, ind2) => {
                      const calcValue = ((obj[1] / availableData.length) * 100).toFixed(2);
                      return (
                        <div className={`flex items-center gap-2 rounded py-0.5 px-1 mb-0.5`} key={ind2}>
                          <img
                            loading="lazy"
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
              );
            })}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
