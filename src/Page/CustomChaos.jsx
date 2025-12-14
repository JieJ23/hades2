import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { sdata } from "../Data/SData";

import { bossMap } from "../Mod/BossMap";
import { weaponMap } from "../Mod/WeaponMap";
import { metaCardMap, shrineMap } from "../Mod/MetaCard";
import { boonTraitMap } from "../Mod/BoonTraitMap";

import { shrineObj } from "../Data/Shrine";
import { oathMatch } from "../Data/Misc";

const allBosses = Object.values(bossMap);
const allBossesID = Object.keys(bossMap);

import { useState } from "react";
// LowHealthCritKeepsake - White Antler
// LowHealthBonus - Strength

// Template
// PackageBountyHestia
// RoomName = "Encounter"
// WeaponUpgradeName = "Aspect"
// KeepsakeName = "LowHealthCritKeepsake" [Hardcored]
// StartingTraits = Object of Objects, Name / Rarity Properties
// MetaUpgradeStateEquipped = Object of Strings
// ShrineUpgradesActive =. Object of VowName = Rank

export default function CustomChaos() {
  const [room, setRoom] = useState("F_Boss01");
  const [aspect, setAspect] = useState("BaseStaffAspect");
  const [metaCard, setMetaCard] = useState([]);
  const [shrine, setShrine] = useState([]);
  const [boon, setBoon] = useState([]);
  const [currentBoon, setCurrentBoon] = useState("AphroditeWeaponBoon");
  const [currentRarity, setCurrentRarity] = useState("Common");
  // Blob
  const editAndDownloadLua = async () => {
    const res = await fetch("/new/BountyData.lua");
    let content = await res.text();

    // Match the PackageBountyHestia block more reliably
    const blockRegex = /(PackageBountyHestia\s*=\s*\{[\s\S]*?\n\s*\},)/m;
    const match = content.match(blockRegex);

    if (!match) {
      console.error("PackageBountyHestia block not found!");
      return;
    }

    let blockContent = match[0];

    // Replace RoomName inside this block
    blockContent = blockContent.replace(/RoomName\s*=\s*".*?"/, `RoomName = "${room}"`);

    // Replace WeaponUpgradeName inside this block
    blockContent = blockContent.replace(/WeaponUpgradeName\s*=\s*".*?"/, `WeaponUpgradeName = "${aspect}"`);

    // Replace the original block in the file
    content = content.replace(blockRegex, blockContent);

    // Trigger download
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "BountyData123.lua";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  //

  return (
    <div className="h-full min-h-lvh relative overflow-hidden text-[13px] md:text-[14px] font-[Ubuntu] select-none">
      <Background />
      <SideNav />
      <div className="w-full max-w-[1200px] mx-auto border bg-black border-white/20 rounded p-2">
        <div className="font-[Ale] ps-1">Encounter / Aspect Selection</div>
        <div className="flex gap-2">
          <select
            className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            {allBosses.map((item, index) => (
              <option value={item} key={index}>
                {allBossesID[index]} - {item}
              </option>
            ))}
          </select>
          <select
            className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent"
            value={aspect}
            onChange={(e) => setAspect(e.target.value)}
          >
            {weaponMap.map((item, index) => (
              <option value={item} key={index}>
                {item} - {sdata[item]}
              </option>
            ))}
          </select>
        </div>
        {/* Divider */}
        <div className="font-[Ale] ps-1 mt-6">Arcana Meta Selection</div>
        <div className="grid grid-cols-5 mb-6 gap-2 font-[Ale]">
          {metaCardMap.map((item, index) => (
            <div
              className={`border border-white/10 rounded-none px-2 py-1 ${
                metaCard.includes(item) ? `bg-[#27277f] text-white` : `bg-[#131111]`
              }`}
              key={index}
              onClick={() =>
                setMetaCard((prev) => {
                  if (prev.includes(item)) {
                    return prev.filter((i) => i !== item);
                  } else {
                    return [...prev, item];
                  }
                })
              }
            >
              {sdata[item]}
            </div>
          ))}
        </div>
        {/* Divider */}
        <div className="font-[Ale] ps-1 mt-6">Oath Of Vows Selection</div>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {shrineMap.map((item, index) => (
            <div
              className={`border border-white/10 rounded-none p-2 flex flex-col lg:flex-row ${
                shrine.some((i) => i.startsWith(item)) ? `bg-[#27277f] text-white` : `bg-[#131111]`
              }`}
              key={index}
            >
              <div className="flex items-center gap-1 mb-1 w-full">
                <img src={`/Vows/${shrineObj[item]}.png`} alt="Vows" className="size-6" />
                <div className="font-[Ale]">{shrineObj[item]}</div>
              </div>
              <select
                className="select select-xs bg-[#131111] text-white w-full rounded-none focus:outline-none focus:border-white/20 font-[Ubuntu]"
                onChange={(e) =>
                  setShrine((prev) => {
                    const rank = e.target.value;

                    // Always remove existing entries for this item
                    const filtered = prev.filter((i) => !i.startsWith(item));

                    // If rank is 0, do not add it back
                    if (rank === "0" || rank === 0) {
                      return filtered;
                    }

                    // Otherwise, add the updated value
                    return [...filtered, `${item}${rank}`];
                  })
                }
              >
                {Array.from({ length: oathMatch[index].length }, (_, index) => (
                  <option value={index}>{index}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        {/* Divider */}
        <div className="font-[Ale] ps-1 mt-6">Boon Traits & Rarity Selection</div>
        <div className="mb-6 flex gap-1">
          <select
            className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent"
            onChange={(e) => setCurrentBoon(e.target.value)}
          >
            {boonTraitMap.map((item) => (
              <option value={item}>{sdata[item]}</option>
            ))}
          </select>
          <select
            className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent"
            onChange={(e) => setCurrentRarity(e.target.value)}
          >
            <option value="Common">Common</option>
            <option value="Rare">Rare</option>
            <option value="Epic">Epic</option>
            <option value="Heroic">Heroic</option>
          </select>
          <button
            className="btn btn-sm rounded-none bg-[#131111] border border-white/10"
            onClick={() =>
              setBoon((prev) => {
                const value = `${currentBoon}_${currentRarity}`;

                // remove any existing entry for the same boon
                const filtered = prev.filter((i) => !i.startsWith(`${currentBoon}_`));

                return [...filtered, value];
              })
            }
          >
            Add
          </button>
        </div>

        {/* Divider */}
        <div>
          <div className="my-1">
            Selected Traits:
            <div className="flex flex-wrap gap-0.5 text-[12px]">
              {boon.map((item) => (
                <div
                  className={`text-black p-1 py-0.5 rounded-none cursor-pointer ${
                    item.split("_")[1] === `Heroic`
                      ? `bg-[orange]`
                      : item.split("_")[1] === `Rare`
                      ? `bg-[cyan]`
                      : item.split("_")[1] === `Epic`
                      ? `bg-[#eb4aeb]`
                      : `bg-white`
                  }`}
                  onClick={() =>
                    setBoon((prev) => {
                      const filtered = prev.filter((i) => i !== item);
                      return filtered;
                    })
                  }
                >
                  {sdata[item.split("_")[0]]} ({item.split("_")[1]})
                </div>
              ))}
            </div>
          </div>
          <div>
            Selected Room: <span className="text-[#00ffaa]">{room}</span>
          </div>
          <div>
            Selected Aspect: <span className="text-[#00ffaa]">{sdata[aspect]}</span>
          </div>
          <div>
            Default Keepsake: <span className="text-[#00ffaa]">White Antler</span>
          </div>
          <div className="my-1">
            Selected Meta:
            <div className="flex flex-wrap gap-0.5 text-[12px]">
              {metaCard.map((item) => (
                <div className="bg-white text-black p-1 py-0.5 rounded-none">{sdata[item]}</div>
              ))}
            </div>
          </div>
          <div className="my-1">
            Selected Vows:
            <div className="flex flex-wrap gap-0.5 text-[12px]">
              {shrine.map((item) => (
                <div className="bg-white text-black p-1 py-0.5 rounded-none">
                  {shrineObj[item.slice(0, -1)]} {item.slice(-1)}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="divider">Download</div>
        <div className="my-4">
          <div>
            <div>Modified Files</div>
            <div className="my-4">
              <button onClick={editAndDownloadLua} className="btn btn-sm rounded-none">
                Download Modified Lua
              </button>
            </div>
            <div className="flex gap-2">
              <a href="/new/BountyLogic.lua" className="underline" download="BountyLogic.lua">
                BountyLogic.lua
              </a>
              <a href="/new/DeathLoopLogic.lua" className="underline" download="DeathLoopLogic.lua">
                DeathLoopLogic.lua
              </a>
              <a href="/new/RewardPresentation.lua" className="underline" download="RewardPresentation.lua">
                RewardPresentation.lua
              </a>
            </div>
          </div>
        </div>
        <div className="my-4">
          <div>
            <div>Original Files</div>
            <div className="flex gap-2">
              <a href="/old/BountyData.lua" className="underline" download="BountyData.lua">
                BountyData.lua
              </a>
              <a href="/old/BountyLogic.lua" className="underline" download="BountyLogic.lua">
                BountyLogic.lua
              </a>
              <a href="/old/DeathLoopLogic.lua" className="underline" download="DeathLoopLogic.lua">
                DeathLoopLogic.lua
              </a>
              <a href="/old/RewardPresentation.lua" className="underline" download="RewardPresentation.lua">
                RewardPresentation.lua
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
