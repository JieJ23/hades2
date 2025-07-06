import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import { p9data } from "../Data/P9Data";
import { findGUIcard } from "../App";
import { parseTimetoms } from "../Data/Misc";
import { useState } from "react";
import { weaponStaff, weaponAxe, weaponBlades, weaponCoat, weaponFlames, weaponSkull } from "../Data/Misc";

const weaponType = [
  `Melinoe Staff`,
  `Melinoe Axe`,
  `Melinoe Blades`,
  `Melinoe Flames`,
  `Melinoe Skull`,
  `Melinoe Coat`,
];

const weaponCategory = [weaponStaff, weaponAxe, weaponBlades, weaponFlames, weaponSkull, weaponCoat];

const dataOrder = p9data
  .slice()
  .sort((a, b) => {
    const feaDiff = +b.fea - +a.fea;
    if (feaDiff !== 0) return feaDiff;
    return parseTimetoms(a.tim) - parseTimetoms(b.tim);
  })
  .filter((obj) => obj.fea >= 32);

const fullData = [];

for (let i = 0; i < weaponCategory.length; i++) {
  const seen = new Set();
  const uniqueByNam = dataOrder
    .filter((obj) => weaponCategory[i].includes(obj.asp))
    .filter((item) => {
      const key = `${item.nam}-${item.asp}`; // Composite key
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  fullData.push(uniqueByNam);
}

export default function Ranking() {
  const [select, setSelect] = useState(null);
  const [selectAspect, setSelectAspect] = useState(null);

  return (
    <main className="relative">
      <Background />
      <Head />
      <div className="max-w-[1400px] font-[PT] text-[12px] mx-auto text-white select-none">
        <SideNav />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2 py-6">
          {fullData.map((weaponData, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="relative">
                <img
                  src={`/GUI_Card/c${findGUIcard([weaponType[index]])}.png`}
                  alt="Aspect"
                  className="w-[80px] rounded mx-auto"
                  draggable={false}
                />
                <span className="absolute -bottom-1 left-2">{weaponData.length}</span>
              </div>
              {weaponData.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-2 border-1 ${
                    selectAspect === item.asp ? `border-[#00ff95]` : `border-black`
                  }  rounded py-1 ${select === item.nam ? `bg-[#46e7a1d0] text-black` : `bg-[#0c0c20d0] text-white`}`}
                >
                  <img
                    src={`/P9/${item.asp}.png`}
                    alt={item.asp}
                    className={`size-7 border-1 border-white/20 rounded-lg cursor-pointer`}
                    draggable={false}
                    onClick={() => {
                      if (selectAspect == item.asp) {
                        setSelectAspect(null);
                      } else {
                        setSelectAspect(item.asp);
                      }
                    }}
                  />
                  <span>{idx + 1}.</span>
                  <span
                    className="line-clamp-1 cursor-pointer"
                    onClick={() => {
                      if (select === item.nam) {
                        setSelect(null);
                      } else {
                        setSelect(item.nam);
                      }
                    }}
                  >
                    {item.nam}
                  </span>
                  <span className="ml-auto">{item.fea}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
