import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { sdata } from "../Data/SData";
import { mainID } from "../Data/MainID";
import { boonCodex } from "../Data/Boon2";
import { boonid } from "../Data/IDs";

import { boonTraitMap, boonTraitHammerMap, boonTraitTraitMap, boonDuoMap, boonNpcMap } from "../Mod/BoonTraitMap";

import { useState, useEffect } from "react";

const convertTraitsArray = (traitsArray) => {
  return traitsArray
    .map((trait) => {
      return `\t\t\t{ Name = "${trait}", Rarity = "Heroic", },`;
    })
    .join("\n");
};

export default function CustomStart() {
  const [boon, setBoon] = useState([]);
  const [category, setCategory] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [shareableURL, setShareableURL] = useState("");

  //
  const boonString = convertTraitsArray(boon);
  //
  // Generate and Share URLs
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const baseBoon = searchParams.get("boon");

    if (baseBoon) {
      try {
        const decodeBoon = JSON.parse(decodeURIComponent(atob(baseBoon)));
        setBoon(decodeBoon);
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
  }, []);

  const generateShareableURL = () => {
    const params = new URLSearchParams();

    if (boon.length > 0) {
      params.set("boon", btoa(encodeURIComponent(JSON.stringify(boon))));
    }

    const newURL = `${window.location.origin}/CustomStart/?${params.toString()}`;
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
    const res = await fetch("/old/HeroData.lua");
    let content = await res.text();

    // 1️⃣ Find HeroData start
    const heroIndex = content.indexOf("HeroData");
    if (heroIndex === -1) {
      console.error("HeroData block not found!");
      return;
    }

    const braceStart = content.indexOf("{", heroIndex);
    if (braceStart === -1) {
      console.error("HeroData opening brace not found!");
      return;
    }

    // 2️⃣ Properly find matching closing brace
    let braceCount = 0;
    let endIndex = braceStart;

    for (let i = braceStart; i < content.length; i++) {
      if (content[i] === "{") braceCount++;
      if (content[i] === "}") braceCount--;

      if (braceCount === 0) {
        endIndex = i + 1;
        break;
      }
    }

    const originalBlock = content.slice(heroIndex, endIndex);
    let blockContent = originalBlock;

    const traitsIndex = blockContent.indexOf("Traits");

    if (traitsIndex !== -1) {
      const braceStart = blockContent.indexOf("{", traitsIndex);

      let braceCount = 0;
      let braceEnd = braceStart;

      for (let i = braceStart; i < blockContent.length; i++) {
        if (blockContent[i] === "{") braceCount++;
        if (blockContent[i] === "}") braceCount--;

        if (braceCount === 0) {
          braceEnd = i + 1;
          break;
        }
      }

      blockContent =
        blockContent.slice(0, traitsIndex) + `Traits = {\n${boonString}\n},` + blockContent.slice(braceEnd + 1);
    }

    // 4️⃣ Replace block in file
    content = content.slice(0, heroIndex) + blockContent + content.slice(endIndex);

    // 5️⃣ Download
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "HeroData.lua";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const fullData = [boonTraitMap, boonTraitHammerMap, boonTraitTraitMap, boonDuoMap, boonNpcMap];
  const fullDataName = [`Core`, `Hammers`, `God Traits`, `Duo`, `NPC`];
  const currentCategory = fullData[category];
  return (
    <div className="h-full min-h-lvh relative overflow-hidden text-[12px] md:text-[13px] font-[Ubuntu] select-none">
      <Background />
      <SideNav />
      <div className="w-full max-w-[1200px] mx-auto border bg-black border-white/20 rounded p-2">
        <section className="my-2">
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
            <button
              className="btn btn-sm rounded-none bg-white text-black font-normal border border-white/10"
              onClick={() => {
                setBoon([]);
                setShareableURL("");
              }}
            >
              Clear All
            </button>
          </div>

          <div className="w-full bg-[#28282b] text-white overflow-hidden p-2 truncate text-[12px] rounded-none my-2">
            {shareableURL || "No URL Generated Yet"}
          </div>
        </section>
        {boon.length > 0 && (
          <div className="my-4">
            <div>Trait Cache ({boon.length})</div>
            <div className="flex flex-wrap gap-1 bg-[#28282b] rounded p-1">
              {boon.map((ite) => (
                <div className="flex items-center gap-1">
                  <img src={`/P9/${mainID[ite]}.png`} alt="Boon" className="size-8" />
                  <div className="text-[12px]">
                    <div className="text-[11px]">{ite}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Content */}
        <div className="flex flex-wrap gap-1 font-[Ale] text-[14px] text-black text-center my-4">
          {fullDataName.map((item, index) => (
            <button
              className={` ${category === index ? `bg-[#00ffaa]` : `bg-white`} min-w-25 p-1 rounded cursor-pointer`}
              onClick={() => setCategory(index)}
            >
              {item}
            </button>
          ))}
        </div>
        {/* Content */}
        <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {currentCategory.map((ite) => (
            <div
              className={`flex items-center gap-1 p-1 rounded cursor-pointer ${boon.includes(ite) ? `bg-[#00ffaa] text-black` : `bg-[#28282b] text-gray-300`}`}
              onClick={() =>
                setBoon((prev) => {
                  if (prev.includes(ite)) {
                    const newArray = prev.filter((obj) => obj != ite);
                    return newArray;
                  }
                  if (prev.length >= 10) return prev;
                  return [...prev, ite];
                })
              }
            >
              <img src={`/P9/${mainID[ite]}.png`} alt="Boon" className="size-10" />
              <div className="text-[12px]">
                {category === 1 ? <div>{sdata[ite]}</div> : <div>{boonCodex[mainID[ite]]}</div>}
                <div className="text-[11px]">{ite}</div>
              </div>
            </div>
          ))}
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
          </div>
        </div>
        <div className="my-4">
          <div>
            <div>Original Files:</div>
            <div className="flex gap-2">
              <a href="/old/HeroData.lua" className="underline" download="BountyData.lua">
                HeroData.lua
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
