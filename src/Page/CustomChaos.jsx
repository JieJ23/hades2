import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import LZString from "lz-string";

import { sdata } from "../Data/SData";

import { bossMap } from "../Mod/BossMap";
import { weaponMap, findWeaponKit } from "../Mod/WeaponMap";
import { metaCardMap, shrineMap } from "../Mod/MetaCard";
import { boonTraitMap, boonTraitHammerMap, boonTraitTraitMap, boonDuoMap } from "../Mod/BoonTraitMap";

import { shrineObj } from "../Data/Shrine";
import { oathMatch } from "../Data/Misc";

import { useState, useEffect } from "react";
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
const convertShrineArray = (arr) => {
  return arr
    .map((item) => {
      // Extract the last character as number
      const lastChar = item.slice(-1);
      const nameChar = item.slice(0, -1);
      const number = parseInt(lastChar) || 0;
      return `${nameChar} = ${number}`;
    })
    .join(", ");
};

const convertTraitsArray = (traitsArray) => {
  return traitsArray
    .map((trait) => {
      // Split by underscore to get boon name and rarity
      const [boonPart, rarityPart] = trait.split("_");

      // Convert to proper format
      const name = boonPart; // e.g., "AphroditeWeaponBoon"
      const rarity = rarityPart.charAt(0).toUpperCase() + rarityPart.slice(1).toLowerCase(); // e.g., "Common"

      return `\t\t\t{ Name = "${name}", Rarity = "${rarity}", },`;
    })
    .join("\n");
};

export default function CustomChaos() {
  const [room, setRoom] = useState("F_Boss01");
  const [aspect, setAspect] = useState("BaseStaffAspect");
  const [metaCard, setMetaCard] = useState([]);
  const [shrine, setShrine] = useState([]);
  const [boon, setBoon] = useState([]);
  const [currentBoon, setCurrentBoon] = useState("AphroditeWeaponBoon");
  const [currentRarity, setCurrentRarity] = useState("Common");
  // Other Parameters
  const [currentHammer, setCurrentHammer] = useState("StaffSecondStageTrait");
  const [currentTrait, setCurrentTrait] = useState("HighHealthOffenseBoon");
  const [currentTraitRarity, setCurrentTraitRarity] = useState("Common");
  const [currentDuo, setCurrentDuo] = useState("ManaBurstCountBoon");
  const [currentDuoRarity, setCurrentDuoRarity] = useState("Common");
  //
  const [isCopied, setIsCopied] = useState(false);
  const [shareableURL, setShareableURL] = useState("");

  //
  const metaString = metaCard.map((s) => `"${s}"`).join(",");
  const shrineString = convertShrineArray(shrine);
  const boonString = convertTraitsArray(boon);
  //
  // Generate and Share URLs
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const baseRoom = searchParams.get("room");
    const baseAspect = searchParams.get("aspect");
    const baseMetaCard = searchParams.get("metaCard");
    const baseShrine = searchParams.get("shrine");
    const baseBoon = searchParams.get("boon");

    if (baseBoon) {
      try {
        const decodeBoon = JSON.parse(LZString.decompressFromEncodedURIComponent(baseBoon));
        setBoon(decodeBoon);
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    if (baseShrine) {
      try {
        const decodeShrine = JSON.parse(LZString.decompressFromEncodedURIComponent(baseShrine));
        setShrine(decodeShrine);
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    if (baseMetaCard) {
      try {
        const decodeMeta = JSON.parse(LZString.decompressFromEncodedURIComponent(baseMetaCard));
        setMetaCard(decodeMeta);
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    if (baseRoom) {
      try {
        const decodeRoom = JSON.parse(LZString.decompressFromEncodedURIComponent(baseRoom));
        setRoom(decodeRoom);
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    if (baseAspect) {
      try {
        const decodeAspect = JSON.parse(LZString.decompressFromEncodedURIComponent(baseAspect));
        setAspect(decodeAspect);
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
  }, []);
  const generateShareableURL = () => {
    const params = new URLSearchParams();

    if (room !== "F_Boss01") {
      params.set("room", LZString.compressToEncodedURIComponent(JSON.stringify(room)));
    }

    if (aspect !== "BaseStaffAspect") {
      params.set("aspect", LZString.compressToEncodedURIComponent(JSON.stringify(aspect)));
    }

    if (metaCard.length > 0) {
      params.set("metaCard", LZString.compressToEncodedURIComponent(JSON.stringify(metaCard)));
    }

    if (shrine.length > 0) {
      params.set("shrine", LZString.compressToEncodedURIComponent(JSON.stringify(shrine)));
    }

    if (boon.length > 0) {
      params.set("boon", LZString.compressToEncodedURIComponent(JSON.stringify(boon)));
    }

    const newURL = `${window.location.origin}/CustomChaos/?${params.toString()}`;
    setShareableURL(newURL);
  };
  const copyURLToClipboard = () => {
    navigator.clipboard.writeText(shareableURL).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    });
  };
  // Blob
  const editAndDownloadLua = async () => {
    const res = await fetch("/new/BountyData.lua");
    let content = await res.text();

    // Match the PackageBountyHestia block
    const blockRegex = /(PackageBountyHestia\s*=\s*\{[\s\S]*?\n\s*\},)/m;
    const match = content.match(blockRegex);

    if (!match) {
      console.error("PackageBountyHestia block not found!");
      return;
    }

    let blockContent = match[0];
    const originalBlock = match[0];

    // Replace WeaponKitName
    blockContent = blockContent.replace(/WeaponKitName\s*=\s*"[^"]*"/, `WeaponKitName = "${findWeaponKit(aspect)}"`);

    // Replace RoomName
    blockContent = blockContent.replace(/RoomName\s*=\s*"[^"]*"/, `RoomName = "${room}"`);

    // Replace WeaponUpgradeName
    blockContent = blockContent.replace(/WeaponUpgradeName\s*=\s*"[^"]*"/, `WeaponUpgradeName = "${aspect}"`);

    // Replace MetaUpgradeStateEquipped
    blockContent = blockContent.replace(
      /MetaUpgradeStateEquipped\s*=\s*\{[^}]*\}/,
      `MetaUpgradeStateEquipped = {${metaString}}`
    );

    const metaInsertPoint = blockContent.indexOf("MetaUpgradeStateEquipped = {");
    if (metaInsertPoint !== -1) {
      const metaEnd = blockContent.indexOf("},", metaInsertPoint) + 2;
      blockContent =
        blockContent.slice(0, metaEnd) +
        `\n\n\t\tShrineUpgradesActive = {${shrineString}},` +
        `\n\n\t\tStartingTraits =\n\t\t{${boonString}},` +
        blockContent.slice(metaEnd);
    } else {
      const lastBrace = blockContent.lastIndexOf("\t},");
      blockContent =
        blockContent.slice(0, lastBrace) +
        `\n\n\t\tShrineUpgradesActive = {${shrineString}},` +
        `\n\n\t\tStartingTraits =\n\t\t{${boonString}},` +
        blockContent.slice(lastBrace);
    }

    // Replace the original block
    content = content.replace(originalBlock, blockContent);

    // Trigger download
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "BountyData.lua";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  //
  return (
    <div className="h-full min-h-lvh relative overflow-hidden text-[13px] md:text-[14px] font-[Ubuntu] select-none">
      <Background />
      <SideNav />
      <div className="w-full max-w-[1200px] mx-auto border bg-black border-white/20 rounded p-2">
        <section>
          <div className="flex flex-wrap gap-1">
            <button
              className="btn btn-sm rounded-none bg-white text-black font-normal border border-white/10"
              onClick={generateShareableURL}
            >
              Generate URL
            </button>
            <button
              className="btn btn-sm rounded-none bg-white text-black font-normal border border-white/10"
              onClick={copyURLToClipboard}
            >
              {isCopied ? "Copied!" : "Copy URL"}
            </button>
          </div>

          <div className="w-full max-w-[1000px] bg-[#28282b] text-white overflow-hidden p-2 truncate text-[12px] rounded-none my-2">
            {shareableURL || "No URL Generated Yet"}
          </div>
        </section>
        {/* Content */}
        <div className="font-[Ale] ps-1 mt-6">Encounter / Aspect Selection</div>
        <div className="flex gap-2">
          <select
            className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            {Object.entries(bossMap).map(([ke, val], index) => (
              <option value={ke} key={index}>
                {ke} - {val}
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
        <div className="mb-1 flex gap-1">
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
        {/* God Traits */}
        <div className="mb-1 flex gap-1">
          <select
            className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent"
            onChange={(e) => setCurrentTrait(e.target.value)}
          >
            {boonTraitTraitMap.map((item) => (
              <option value={item}>{sdata[item]}</option>
            ))}
          </select>
          <select
            className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent"
            onChange={(e) => setCurrentTraitRarity(e.target.value)}
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
                const value = `${currentTrait}_${currentTraitRarity}`;

                // remove any existing entry for the same boon
                const filtered = prev.filter((i) => !i.startsWith(`${currentTrait}_`));

                return [...filtered, value];
              })
            }
          >
            Add
          </button>
        </div>
        {/* Duo Traits */}
        <div className="mb-1 flex gap-1">
          <select
            className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent"
            onChange={(e) => setCurrentDuo(e.target.value)}
          >
            {boonDuoMap.map((item) => (
              <option value={item}>{sdata[item]}</option>
            ))}
          </select>
          <select
            className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent"
            onChange={(e) => setCurrentDuoRarity(e.target.value)}
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
                const value = `${currentDuo}_${currentDuoRarity}`;

                // remove any existing entry for the same boon
                const filtered = prev.filter((i) => !i.startsWith(`${currentDuo}_`));

                return [...filtered, value];
              })
            }
          >
            Add
          </button>
        </div>
        {/* Hammer Section */}
        <div className="mb-6 flex gap-1">
          <select
            className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent"
            onChange={(e) => setCurrentHammer(e.target.value)}
          >
            {boonTraitHammerMap.map((item) => (
              <option value={item}>{sdata[item]}</option>
            ))}
          </select>
          <button
            className="btn btn-sm rounded-none bg-[#131111] border border-white/10"
            onClick={() =>
              setBoon((prev) => {
                const value = `${currentHammer}_Common`;

                // remove any existing entry for the same boon
                const filtered = prev.filter((i) => !i.startsWith(`${currentHammer}_`));

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
            Selected Traits (Click on selected trait to remove):
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
            <div>Modified Files:</div>
            <div className="my-2">
              <button
                onClick={editAndDownloadLua}
                className="btn btn-sm rounded-none font-normal bg-[#00ffaa] text-black"
              >
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
              <a href="/new/RoomPresentation.lua" className="underline" download="RoomPresentation.lua">
                RoomPresentation.lua
              </a>
            </div>
          </div>
        </div>
        <div className="my-4">
          <div>
            <div>Original Files:</div>
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
              <a href="/old/RoomPresentation.lua" className="underline" download="RoomPresentation.lua">
                RoomPresentation.lua
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
