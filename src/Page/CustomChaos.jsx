import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { sdata } from "../Data/SData";

import { bossMap } from "../Mod/BossMap";
import { weaponMap } from "../Mod/WeaponMap"
import { metaCardMap, shrineMap } from "../Mod/MetaCard";

import { shrineObj } from "../Data/Shrine";
import { oathMatch } from "../Data/Misc";

const allBosses = Object.values(bossMap);
const allBossesID = Object.keys(bossMap);

import { useState } from "react";
// LowHealthCritKeepsake - White Antler
// LowHealthBonus - Strength

export default function CustomChaos() {
  const [room, setRoom] = useState("F_Boss01")
  const [aspect, setAspect] = useState("BaseStaffAspect")
  const [metaCard, setMetaCard] = useState([])

  return (
    <div className="h-full min-h-lvh relative overflow-hidden text-[13px] md:text-[14px] font-[Ubuntu] select-none">
      <Background />
      <SideNav />
      <div className="w-full max-w-[1200px] mx-auto border border-white/20 rounded p-2">
        <div className="my-4 flex gap-2">
          <select className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent" value={room}
            onChange={(e) => setRoom(e.target.value)}>
            {allBosses.map((item, index) => (
              <option value={item} key={index}>{allBossesID[index]} - {item}</option>
            ))}
          </select>
          <select className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent" value={aspect}
            onChange={(e) => setAspect(e.target.value)}>
            {weaponMap.map((item, index) => (
              <option value={item} key={index}>{item} - {sdata[item]}
              </option>
            ))}
          </select>
        </div>
        <div className=" font-[Ale]">
          <div className="my-4">
            <div>
              Selected Room: {room}
            </div>
            <div>
              Selected Aspect: {aspect}
            </div>
          </div>
          <div className="grid grid-cols-5 my-6 gap-2">
            {metaCardMap.map((item, index) => (
              <div className="bg-[#28282b] rounded px-2 py-1" key={index}>
                {sdata[item]}
              </div>
            ))}
          </div>

          <select className="select select-sm bg-[#131111] rounded-none focus:outline-none focus:border-transparent">
            {shrineMap.map(item => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <Footer />
    </div>
  );
}
