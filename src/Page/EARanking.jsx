import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import { p9data } from "../Data/P9Data";
import { p11data } from "../Data/P11Data";
import { parseTimetoms, findGUIcard } from "../Data/Misc";
import { useState } from "react";
import Footer from "../Comp/Footer";
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

export default function EARanking() {
  const [select, setSelect] = useState(null);
  const [selectAspect, setSelectAspect] = useState(null);
  const [unique, setUnique] = useState(false);
  const [location, setLocation] = useState(`Both Regions`);

  const fullPatchData = [...p11data, ...p9data];

  const dataOrder = fullPatchData
    .slice()
    .sort((a, b) => {
      const feaDiff = +b.fea - +a.fea;
      if (feaDiff !== 0) return feaDiff;
      return parseTimetoms(a.tim) - parseTimetoms(b.tim);
    })
    .filter((obj) => obj.fea >= 50);

  const regionData = location === `Both Regions` ? dataOrder : dataOrder.filter((obj) => obj.loc === location);

  const fullData = [];

  for (let i = 0; i < weaponCategory.length; i++) {
    const seen = new Set();
    const uniqueByNam = regionData
      .filter((obj) => weaponCategory[i].includes(obj.asp))
      .filter((item) => {
        const key = unique ? `${item.nam}` : `${item.nam}-${item.asp}`; // Composite key
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    fullData.push(uniqueByNam);
  }

  return (
    <main className="relative">
      <Background />
      <div className="max-w-[1600px] font-[Ale] text-[12px] mx-auto text-white">
        <SideNav />
        <>
          <div className="p-1 flex justify-center gap-1 my-2 font-[Ubuntu] text-[10px] md:text-[11px]">
            <button className="bg-white px-2 py-1 rounded text-black cursor-pointer" onClick={() => setUnique(!unique)}>
              {unique ? `Unique / Aspect` : `Unique / Player`}
            </button>
            <button
              className={`cursor-pointer rounded p-1 ${
                location === `Both Regions` ? `bg-white text-black` : `bg-transparent text-white`
              }`}
              onClick={() => setLocation(`Both Regions`)}
            >
              Both Regions
            </button>
            <button
              className={`cursor-pointer rounded p-1 ${
                location === `Underworld` ? `bg-white text-black` : `bg-transparent text-white`
              }`}
              onClick={() => setLocation(`Underworld`)}
            >
              Underworld
            </button>
            <button
              className={`cursor-pointer text-black rounded p-1 ${
                location === `Surface` ? `bg-white text-black` : `bg-transparent text-white`
              }`}
              onClick={() => setLocation(`Surface`)}
            >
              Surface
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2 py-4">
            {fullData.map((weaponData, index) => (
              <div key={index} className="flex flex-col">
                <div className="relative my-2">
                  <img
                    src={`/NocturnalArms/${findGUIcard([weaponType[index]])}.webp`}
                    alt="Aspect"
                    className="h-[80px] rounded mx-auto drop-shadow-[0_0_10px_#00ffaa]"
                    draggable={false}
                  />
                  <span className="absolute -bottom-1 left-2">{weaponData.length}</span>
                </div>
                {weaponData.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 px-2 relative py-1 hover:bg-[#00ffaa] hover:text-black ${
                      select === item.nam ? `bg-[#00ffaa] text-black` : `bg-[#131111a1] text-gray-300`
                    }`}
                  >
                    <img
                      src={`/P9/${item.asp}.png`}
                      alt={item.asp}
                      className={`size-7 cursor-pointer border-1 rounded ${
                        selectAspect === item.asp ? `border-[#ff0000]` : `border-white/10`
                      }`}
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
        </>
      </div>
      <Footer />
    </main>
  );
}
