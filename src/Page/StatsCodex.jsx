import Footer from "../Comp/Footer";
import Background from "../Comp/Background";
import Sidebar from "../Comp/Sidebar";
import { v1data } from "../Data/V1data";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

import { sToA, deCodeArcana, deCodeVow, biomeS, biomeU } from "../Data/Misc";
import { idarcana } from "../Data/Arcana1";
import { idvow, vowid } from "../Data/Vow1";
import { boonCodexr } from "../Data/Boon2";
import { p9boons_reverse } from "../Data/P9BoonObj";

import { p11data } from "../Data/P11Data";

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

const weaponLabel = [`Staff`, `Blades`, `Axe`, `Torch`, `Lob`, `Suit`];

function findBiomeKS(biomeNum, data, region) {
  const biomeDataraw = data
    .filter((obj) => obj.loc === region)
    .reduce((acc, entry) => {
      const ks_value = sToA(entry.ks)[biomeNum]; // get first array
      acc[ks_value] = (acc[ks_value] || 0) + 1;
      return acc;
    }, {});
  const biomeData = Object.fromEntries(Object.entries(biomeDataraw).sort((a, b) => b[1] - a[1]));

  return biomeData;
}

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

  const boonStaff = Object.entries(filterBySet(store_ham, sets.set24)).sort((a, b) => b[1] - a[1]);
  const boonDagger = Object.entries(filterBySet(store_ham, sets.set25)).sort((a, b) => b[1] - a[1]);
  const boonAxe = Object.entries(filterBySet(store_ham, sets.set26)).sort((a, b) => b[1] - a[1]);
  const boonTorch = Object.entries(filterBySet(store_ham, sets.set27)).sort((a, b) => b[1] - a[1]);
  const boonLob = Object.entries(filterBySet(store_ham, sets.set28)).sort((a, b) => b[1] - a[1]);
  const boonSuit = Object.entries(filterBySet(store_ham, sets.set29)).sort((a, b) => b[1] - a[1]);

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

  const runs_av = availableData.filter((obj) => obj.arcana && obj.oath);
  const store_arcana = [...new Set(runs_av.map((obj) => deCodeArcana(obj.arcana)))].reduce((acc, entry) => {
    entry.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});
  const oathArray = [...new Set(runs_av.map((obj) => deCodeVow(obj.oath)))];

  const store_oath = oathArray[0].map((_, colIndex) => {
    const counts = {};
    for (const row of oathArray) {
      const val = row[colIndex];
      counts[val] = (counts[val] || 0) + 1;
    }
    return counts;
  });
  //
  return (
    <>
      <Background />
      <Sidebar />
      {loader ? (
        <Loading />
      ) : (
        <div className="w-full max-w-[1800px] mx-auto font-[Ale] text-[13px] select-none pointer-events-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-2 my-5 text-[13px] md:text-[12px] w-full max-w-[1400px] mx-auto">
            {biomeS.map((ite, index) => (
              <div className="bg-gradient-to-b from-[yellow]/30 via-black to-transparent rounded py-2">
                <div className="text-[16px] text-center">{ite}</div>
                <div>
                  {Object.entries(findBiomeKS(index, availableData, "Surface")).map(([ke, va]) => {
                    const totalSelection = Object.entries(findBiomeKS(index, availableData, "Surface")).reduce(
                      (a, b) => a + b[1],
                      0
                    );
                    return (
                      <div className="flex items-center gap-2 mb-1 px-2">
                        <img src={`/buildgui/${ke}.png`} alt="Keepsakes" className="size-8 md:size-6 lg:size-5" />
                        <div className="flex justify-between w-full">
                          <div>{ke}</div>
                          <div>{((va / totalSelection) * 100).toFixed(2)}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {biomeU.map((ite, index) => (
              <div className="bg-gradient-to-b from-[#00ffaa]/30 via-black to-transparent rounded py-2">
                <div className="text-[16px] text-center">{ite}</div>
                <div>
                  {Object.entries(findBiomeKS(index, availableData, "Underworld")).map(([ke, va]) => {
                    const totalSelection = Object.entries(findBiomeKS(index, availableData, "Underworld")).reduce(
                      (a, b) => a + b[1],
                      0
                    );
                    return (
                      <div className="flex items-center gap-2 mb-1 px-2">
                        <img src={`/buildgui/${ke}.png`} alt="Keepsakes" className="size-8 md:size-6 lg:size-5" />
                        <div className="flex justify-between w-full">
                          <div>{ke}</div>
                          <div>{((va / totalSelection) * 100).toFixed(2)}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-2 my-5 w-full max-w-[1200px] mx-auto">
            {Object.entries(store_oath).map(([key, value], index1) => (
              <div
                className={`flex items-start gap-2 bg-gradient-to-br from-black via-[black] to-transparent rounded p-2 py-4 w-full ${
                  index1 === 16 && `lg:col-start-2 lg:col-span-2`
                }`}
              >
                <img src={`/Vows/${idvow[+key + 1]}.png`} alt="Vows" className="size-10" />
                <div className="w-full px-1">
                  <div className="text-[15px]">{idvow[+key + 1]}</div>
                  <div>
                    {Object.entries(value).map(([key2, val2]) => (
                      <div className="flex gap-4">
                        <div>
                          {key2} <span className="text-[#cc4aff]">Fear</span>
                        </div>
                        <div className="flex gap-1">
                          <div>{((val2 / oathArray.length) * 100).toFixed(2)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 px-2 my-5 w-full max-w-[1400px] mx-auto">
            {Object.entries(store_arcana)
              .sort((a, b) => +a[0].slice(1) - +b[0].slice(1))
              .map(([key, val], index) => (
                <div
                  className="flex items-center gap-2 bg-gradient-to-r from-black via-[black] to-transparent rounded"
                  key={index}
                >
                  <img src={`/Arcane/${key}.png`} alt="Arcana Cards" className="w-[60px] md:w-[80px] h-auto" />
                  <div>
                    <div className="text-[15px]">{idarcana[key]}</div>
                    <div>{((+val / +runs_av.length) * 100).toFixed(2)}%</div>
                  </div>
                </div>
              ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 gap-y-6 my-5 p-2 w-full max-w-[1600px] mx-auto">
            {Object.entries(categories).map((arr) => (
              <div className="bg-gradient-to-b from-[black] to-transparent px-2 py-1 rounded h-full">
                <div className="text-[16px] text-center">{arr[0]}</div>
                {arr[1].map((obj) => {
                  const calcValue = ((obj.value / availableData.length) * 100).toFixed(2);
                  return (
                    <div
                      className={`flex items-center gap-2 rounded py-0.5 px-1 mb-0.5 ${
                        calcValue > 25
                          ? `bg-[orange] text-black`
                          : calcValue > 15
                          ? `bg-white text-black`
                          : `text-white`
                      }`}
                    >
                      <img src={`/P9/${obj.key}.png`} alt="Core" className="size-8 rounded-full" />
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 gap-y-6 my-5 px-2">
            {boon_arms.map((arr, ind1) => {
              const calcValue = Object.entries(arr).reduce((a, b) => a + b[1][1], 0);
              return (
                <div>
                  <div className="text-[16px] text-center bg-black py-1">{weaponLabel[ind1]}</div>
                  <div className="bg-gradient-to-b from-[black] via-black to-transparent rounded-none px-2">
                    {arr.map((obj, ind2) => {
                      return (
                        <div
                          className={`flex items-center gap-2 rounded py-0.5 px-1 mb-0.5 
                        ${
                          Math.round((obj[1] / calcValue) * 100) > 25
                            ? `bg-[orange] text-black`
                            : Math.round((obj[1] / calcValue) * 100) > 15
                            ? `bg-white text-black`
                            : `text-white`
                        }`}
                          key={ind2}
                        >
                          <img
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 gap-y-6 my-5 px-2">
            {boon_top3.map((arr, ind1) => (
              <div>
                <div className="bg-black rounded-t-lg relative pt-2">
                  <div className="absolute bottom-0 h-full w-full bg-gradient-to-b from-transparent to-black" />
                  <img
                    src={`/Character/${character[ind1]}.webp`}
                    alt="Character"
                    className="h-[125px] w-auto mx-auto"
                  />
                </div>
                <div className="bg-gradient-to-b from-[black] to-transparent rounded-none">
                  {arr.map((obj, ind2) => {
                    const calcValue = ((obj[1] / availableData.length) * 100).toFixed(2);
                    return (
                      <div
                        className={`flex items-center gap-2 rounded py-0.5 px-1 mb-0.5 ${
                          calcValue > 25
                            ? `bg-[orange] text-black`
                            : calcValue > 15
                            ? `bg-white text-black`
                            : `text-white`
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
