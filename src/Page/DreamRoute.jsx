import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";
import { bundleData } from "../Data/DataBundle";
// Utility
import { sToA, findValue, orderMap, parseTimetoms, getPoolColor, getYTid } from "../Data/Misc";
import { p9boons } from "../Data/P9BoonObj";
import { Link } from "react-router-dom";
import { h2AspectOrder } from "../Data/Misc";

import { useMemo, useState, useEffect } from "react";
import PageBlock from "../Block/PageBlock";

import { biomes } from "./GameplaySubmission";

//
function getBiomeColor(biome) {
  switch (biome) {
    case "Ephyra":
      return "#C98A2E"; // Burnished Amber

    case "Erebus":
      return "#4B2C6F"; // Shadow Violet

    case "Fields":
      return "#2F8F57"; // Verdant Emerald

    case "Oceanus":
      return "#0F7D88"; // Abyssal Teal

    case "Olympus":
      return "#E7C64A"; // Divine Gold

    case "Summit":
      return "#76B8E8"; // Frosted Azure

    case "Tartarus":
      return "#A12632"; // Infernal Crimson

    case "Thessaly":
      return "#5D5ABF"; // Witch's Indigo

    default:
      return "#808080"; // Gray fallback
  }
}
//

export default function DreamRoute() {
  const { posts, loader } = useData();
  const [bio, setBio] = useState([]);
  const [count, setCount] = useState(10);

  const orderData = useMemo(() => {
    return [...bundleData, ...posts]
      .filter((obj) => obj.loc !== "Underworld" && obj.loc !== "Surface")
      .sort((a, b) => {
        const feaDiff = +b.fea - +a.fea;
        if (feaDiff !== 0) return feaDiff;
        return parseTimetoms(a.tim) - parseTimetoms(b.tim);
      });
  }, [posts]);

  const availableRoutes = [...new Set(orderData.map((obj) => obj.loc))];

  const displayData = orderData.filter((obj) => {
    if (bio.length === 0) {
      return obj;
    } else {
      return obj.loc.startsWith(bio.join());
    }
  });

  function showMore() {
    setCount((prev) => prev + 25);
  }

  function addBio(item) {
    setBio((prev) => {
      if (prev.length === 0 && (item === "Erebus" || item === "Ephyra")) return prev;
      if (prev.includes(item)) return prev;
      if (prev.length >= 4) return prev;
      return [...prev, item];
    });
  }
  function removeBio(item) {
    setBio((prev) => prev.filter((i) => i !== item));
  }

  return (
    <div>
      <PageBlock>
        {loader ? (
          <Loading />
        ) : (
          <div className="py-16 max-w-250 mx-auto">
            <div className="font-[Sr] mb-4 text-[16px] text-center">
              <div>
                Total Dream Routes Cleared:{" "}
                <span className="text-[#00ffaa] text-[23px] font-[UbuntuMono]">{availableRoutes.length}</span>
              </div>
            </div>
            <div className="mt-2 px-2 text-orange-300 font-[Ale]">*Dream Route Cannot Begin with Erebus Nor Ephyra</div>
            {/* Selection */}
            <div className="flex flex-wrap gap-1 font-[Ale] mb-2 px-2">
              {biomes.slice(2).map((item) => (
                <div
                  className={`${bio.includes(item) ? `bg-[#00ffaa] text-black` : `bg-[#0e0c12]`} rounded p-1 min-w-20 text-center flex justify-center items-center gap-1 cursor-pointer border border-white/10`}
                  onClick={() => addBio(item)}
                >
                  <img src={`/DreamDive/${item}.png`} alt="Biome" className="w-7 h-auto" />
                  {item}
                </div>
              ))}
            </div>
            {bio.length > 0 && (
              <>
                <div className="flex items-center my-2">
                  <div className="px-2 font-[Ale]">Selected:</div>
                  <div className="flex gap-1">
                    {bio.map((item, index) => (
                      <div
                        className={`min-w-14 p-0.5 text-center font-[UbuntuMono] text-[11px] uppercase rounded text-white cursor-pointer`}
                        style={{ backgroundColor: getBiomeColor(item) }}
                        onClick={() => removeBio(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="px-2 font-[Ale]">(Click To Remove Region)</div>
                </div>
                <div className="px-2 font-[Ale] flex gap-1 items-center">
                  Total Entries For Selected Route:
                  <span className="text-[23px] font-[UbuntuMono] text-[#00ffaa]">{displayData.length}</span>
                </div>
              </>
            )}
            {/* Entries */}
            <div>
              {displayData.slice(0, count).map((obj, index) => (
                <div
                  className="border border-white/10 rounded p-2 flex flex-col gap-2 relative overflow-hidden"
                  style={{
                    borderStyle: "solid",
                    borderWidth: "10px",
                    borderImage: "url('/Misc/frame.webp') 40 stretch",
                  }}
                >
                  {/* Background */}
                  <img
                    src={`/Enemy/Biome${sToA(obj.loc)[0]}.png`}
                    alt="Starting Region"
                    className="absolute h-full w-full top-0 right-0 object-cover object-center -z-10 translate-x-4"
                  />
                  <img
                    src={`/GUI_Card/c${obj.asp}.png`}
                    alt="Aspects"
                    className="absolute h-full w-auto top-0 right-0 -z-10 -rotate-15 -translate-y-3 -translate-x-12"
                  />
                  <img
                    src={`/GUI_Card/${obj.fam}.png`}
                    alt="Aspects"
                    className="absolute h-full w-auto top-0 right-0 -z-10 rotate-15 translate-y-9 translate-x-5"
                  />
                  <div className="absolute left-0 top-0 w-full h-full bg-linear-to-r from-black via-[#0e0c12]/80 to-[#0e0c12]/50 -z-10" />
                  <div className="absolute top-1 right-1 text-[11px] font-[UbuntuMono] text-gray-400">{index + 1}</div>
                  {/* Player Info */}
                  <div className="flex gap-2 items-end font-[Sr]">
                    <div className="relative w-8 h-8">
                      <img
                        src={`/Avatar/${obj.nam.toLowerCase()}.webp`}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-8 h-8 rounded bg-[#28282b] text-white items-center justify-center hidden truncate">
                        {obj.nam.slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <div>{obj.nam}</div>
                  </div>
                  {/* Region Info */}
                  <div className="flex flex-wrap gap-1 items-end">
                    <div className="flex gap-1">
                      {sToA(obj.loc).map((ite, index) => (
                        <img draggable={false} src={`/DreamDive/${ite}.png`} alt="Biome" className="w-auto h-7" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      {sToA(obj.loc).map((ite, index) => (
                        <div
                          className={`min-w-14 p-0.5 text-center font-[UbuntuMono] text-[11px] uppercase rounded text-white`}
                          style={{ backgroundColor: getBiomeColor(ite) }}
                        >
                          {ite}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Core Info */}
                  <div className="flex gap-1 items-end">
                    <div className="flex">
                      {sToA(obj.cor).map((ite, index) => (
                        <div className="relative size-8 shrink-0">
                          <img
                            src="/BoonBorder/Common.png"
                            alt="Border"
                            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                          />
                          <img
                            src={`/H2Boons/${ite}.png`}
                            alt="Core Boon"
                            className="absolute inset-0 w-full h-full p-1 object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Hammer Info */}
                  <div className="flex gap-1">
                    {sToA(obj.ham).map((ite, index) => (
                      <div className="bg-[#0e0c12] border rounded border-white/10 px-2 text-center text-[12px] font-[Ale]">
                        {ite}
                      </div>
                    ))}
                  </div>
                  {/* Entries Info */}
                  <div className="flex justify-center gap-4 font-[Ale]">
                    <div>Fear: {obj.fea}</div>
                    <div>Time: {obj.tim}</div>
                    <div>Date: {obj.dat.slice(0, 10)}</div>
                  </div>
                </div>
              ))}
              {bio < displayData.length && (
                <div className="flex justify-center mt-4">
                  <div
                    className="min-w-20 text-[14px] text-center p-1 rounded font-[UbuntuMono] border border-white/10 bg-[#0e0c12] cursor-pointer"
                    onClick={() => showMore()}
                  >
                    Show More
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </PageBlock>
    </div>
  );
}
