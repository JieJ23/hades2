import Background from "../Comp/Background";
import SideNav from "../Comp/Sidebar";
import Footer from "../Comp/Footer";

import { Link } from "react-router-dom";
import { useState } from "react";

import { sdata } from "../Data/SData";

import { parsesectoTime, oathMatch } from "../Data/Misc";
import { idMetaUpgrade } from "../Data/Arcana1";
import { idShrine, vowid } from "../Data/Vow1";
import { mainID } from "../Data/MainID";

const findBiomeName = (bio) => {
  switch (bio) {
    case "N":
      return `Ephyra`;
    case "F":
      return `Erebus`;
    case "C":
      return `Elysium`;
    case "P":
      return `Olympus`;
    case "G":
      return `Oceanus`;
    case "H":
      return `Fields`;
    case "I":
      return `Tartarus`;
    case "O":
      return `Thessaly`;
    case "Q":
      return `Summit`;
    case "Anomaly":
      return `Asphodel`;
    default:
      return bio;
  }
};

export default function ProfileSum() {
  const [data, setData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setData(json);
      } catch (err) {
        console.error("Invalid JSON file", err);
      }
    };

    reader.readAsText(file);
  };

  //   Assignment

  let info = null;

  if (data) {
    const gameState = data.CurrentRun;

    info = {
      clearRun: gameState.Cleared,
      biomeTimes: Object.entries(gameState.BiomeGameplayTimes),
      keepsakes: Object.entries(gameState.KeepsakeCache),
      shrinePoints: gameState.ShrinePointsCache,
      runTime: gameState.GameplayTime,
      traitCache: Object.entries(gameState.TraitRarityCache)
        .filter((ite) => !ite[0].toLowerCase().includes("metaupgrade"))
        .filter((item) => mainID[item[0]] !== undefined),
      bossEncounter: Object.keys(gameState.BossHealthBarRecord),
      bossRunTime: Object.entries(gameState.EncounterClearStats),
      lootHistory: Object.entries(gameState.LootChoiceHistory ?? {}),
      // Misc
      shrineCache: Object.entries(gameState.ShrineUpgradesCache).sort(
        (a, b) => vowid[idShrine[a[0]]] - vowid[idShrine[b[0]]]
      ),
      metaCards: Object.keys(gameState.TraitRarityCache).filter((ite) => ite.toLowerCase().includes("metaupgrade")),
    };
  }
  //   Other Calculations

  console.log(data);
  return (
    <div className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <SideNav />
      <div className="max-w-[1400px] font-[Ale] text-[14px] mx-auto px-1 my-4">
        <div className="my-4 flex flex-col gap-1">
          <input
            type="file"
            className="file-input bg-black"
            onChange={handleFileChange}
            style={{
              borderStyle: "solid", // Required
              borderWidth: "4px",
              borderImage: "url('/Misc/frame.webp') 40 stretch",
            }}
          />
        </div>
        <Link to={`https://jakobhellermann.github.io/hades2-tools/`} target="_blank">
          <div
            className="bg-black my-4 p-2 rounded"
            style={{
              borderStyle: "solid", // Required
              borderWidth: "6px",
              borderImage: "url('/Misc/frame.webp') 40 stretch",
            }}
          >
            <div>Savefile to JSON | By jakobhellermann</div>
            <div className="text-blue-400 hover:underline">https://jakobhellermann.github.io/hades2-tools/</div>
          </div>
        </Link>
        {data ? (
          <div
            className="bg-black/70 rounded p-2"
            style={{
              borderStyle: "solid", // Required
              borderWidth: "6px",
              borderImage: "url('/Misc/frame.webp') 40 stretch",
            }}
          >
            <div className="flex flex-wrap gap-6 my-4">
              <div className="gap-4">
                {info.biomeTimes.map((arr, index) => (
                  <div className="flex gap-2">
                    <div>{findBiomeName(arr[0])}:</div>
                    <div>
                      {index === 0
                        ? parsesectoTime(arr[1])
                        : parsesectoTime(info.biomeTimes[index][1] - info.biomeTimes[index - 1][1])}
                    </div>
                  </div>
                ))}
              </div>
              <div className="gap-4">
                {info.keepsakes.map((arr, index) => (
                  <div className="flex flex-col gap-2">
                    <div>
                      {arr[0]}: {sdata[arr[1]]}
                    </div>
                  </div>
                ))}
              </div>
              <div>Fear: {info.shrinePoints}</div>
              <div>Time: {parsesectoTime(info.runTime)}</div>
            </div>
            <div className="flex flex-wrap gap-1 my-4">
              {info.bossEncounter.map((ite) => (
                <div className="border border-white/20 p-2 py-1 rounded">{ite}</div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 my-4">
              {info.bossRunTime.map((arr) => (
                <div className="border border-white/20 p-2 py-1 rounded">
                  <div>{arr[0]}</div>
                  <div className="text-center">{parsesectoTime(arr[1].ClearTime)}</div>
                  <div className="text-center">{arr[1].TookDamage ? "-" : `Damageless`}</div>
                </div>
              ))}
            </div>
            {/* Arcana & Shrine */}
            <div className="flex flex-wrap gap-4 my-4">
              <div>
                <div>
                  {(() => {
                    const deckCards = info.metaCards
                      .map((ite) => idMetaUpgrade[ite])
                      .sort((a, b) => a.slice(1) - b.slice(1));

                    let newDeck = [];

                    for (let i = 0; i < 25; i++) {
                      let order = `c${i + 1}`;
                      if (deckCards.includes(order)) {
                        newDeck.push(order);
                      } else {
                        newDeck.push(`c0`);
                      }
                    }

                    return (
                      <div className="grid grid-cols-5 justify-start items-start w-full max-w-[350px]">
                        {newDeck.map((ite) => (
                          <img src={`/Arcane/${ite}.png`} className="w-full" />
                        ))}
                      </div>
                    );
                  })()}
                </div>
                {/* <div>
                  {info.metaCards.map((item) => (
                    <div>
                      {item} | {idMetaUpgrade[item]}
                    </div>
                  ))}
                </div> */}
              </div>
              <div>
                <div className="grid grid-cols-4 gap-1 w-full max-w-[450px] font-[Ubuntu] text-[12px]">
                  {info.shrineCache.map((arr, index) => (
                    <div
                      className={`bg-[#28282b] rounded p-1 py-2 flex gap-1 items-center ${
                        index === 16 && `col-start-2 col-span-2`
                      }`}
                      key={index}
                    >
                      <img src={`/Vows/${idShrine[arr[0]]}.png`} alt="Vows" className="size-7 md:size-8" />
                      <div>
                        <div>{idShrine[arr[0]]}</div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: oathMatch[vowid[idShrine[arr[0]]] - 1].length - 1 }, (_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${i < arr[1] ? `bg-[#00ffaa]` : `bg-[black]`}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div>
                  {info.shrineCache.map((arr) => (
                    <div className="grid grid-cols-2 max-w-[500px]">
                      <div>{idShrine[arr[0]]}</div>
                      <div>{arr[1]}</div>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
            {/*  */}
            <div className="gap-2 flex flex-wrap">
              {info.traitCache.map((arr, index) => (
                <div className="flex gap-1 text-[12px] min-w-[220px]">
                  <div className="relative">
                    <img
                      src={`/BoonBorder/${arr[1]}.png`}
                      alt="Boon Border"
                      className="absolute top-0 left-0 h-full w-full"
                    />
                    <img src={`/P9/${mainID[arr[0]]}.png`} alt="Boons" className="size-12 p-1" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div>{sdata[arr[0]]}</div>
                    <div>{arr[0]}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Room History */}
            <div className="my-4 w-full text-[12px] text-gray-300">
              {info.lootHistory.map((arr) => (
                <div className="my-2 rounded p-1">
                  <div>
                    Depth: {arr[1].Depth} | {arr[1].UpgradeName}
                  </div>
                  <div className="grid grid-cols-3 gap-2 max-w-[500px]">
                    {Object.entries(arr[1].UpgradeChoices).map((arr) => (
                      <div
                        className={`border border-white/20 rounded p-1 ${
                          arr[1].Chosen === "true" ? `bg-[#141736]` : ``
                        }`}
                      >
                        <div className="text-center truncate">{sdata[arr[1].Name]}</div>
                        <div className="relative flex justify-center">
                          <img
                            src={`/BoonBorder/${arr[1].Rarity}.png`}
                            alt="Boon Border"
                            className="absolute top-0 left-1/2 -translate-x-[50%] h-full"
                          />
                          <img src={`/P9/${mainID[arr[1].Name]}.png`} alt="Boon" className="size-10 p-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-[#00ffaa] px-2 text-[16px]">*Latest Run Must be Clear</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
