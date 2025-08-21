import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import { p9data } from "../Data/P9Data";
import { p11data } from "../Data/P11Data";
import { findGUIcard } from "../App";
import { parseTimetoms } from "../Data/Misc";
import { useState } from "react";
import Footer from "../Comp/Footer";
import { weaponStaff, weaponAxe, weaponBlades, weaponCoat, weaponFlames, weaponSkull } from "../Data/Misc";
import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

const weaponType = [
  `Melinoe Staff`,
  `Melinoe Axe`,
  `Melinoe Blades`,
  `Melinoe Flames`,
  `Melinoe Skull`,
  `Melinoe Coat`,
];

const weaponCategory = [weaponStaff, weaponAxe, weaponBlades, weaponFlames, weaponSkull, weaponCoat];

export default function Ranking() {
  const [select, setSelect] = useState(null);
  const [selectAspect, setSelectAspect] = useState(null);
  const { posts, loader } = useData();

  const fullPatchData = [[...p11data, ...(posts || [])], ...p9data];

  const dataOrder = fullPatchData
    .slice()
    .sort((a, b) => {
      const feaDiff = +b.fea - +a.fea;
      if (feaDiff !== 0) return feaDiff;
      return parseTimetoms(a.tim) - parseTimetoms(b.tim);
    })
    .filter((obj) => obj.fea >= 50);

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

  return (
    <main className="relative">
      <Background />
      <div className="max-w-[1400px] font-[Source] text-[11px] md:text-[12px] mx-auto text-white select-none">
        <SideNav />
        {loader ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2 py-6">
            {fullData.map((weaponData, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <div className="relative">
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
                    className={`flex items-center gap-2 px-2 ps-3 border-1 relative ${
                      selectAspect === item.asp ? `border-[#00ff95]` : `border-white/10`
                    }  rounded py-1 ${
                      select === item.nam ? `bg-[#46e7a1d0] text-black` : `bg-[#000000c4] text-gray-300`
                    }`}
                  >
                    <div
                      className={`absolute top-0 left-0 h-full w-[4px] ${
                        item.loc === `Underworld` ? `bg-[#00ffaa]` : `bg-[#fff200]`
                      } rounded-l`}
                    />
                    <img
                      src={`/P9/${item.asp}.png`}
                      alt={item.asp}
                      className={`size-7 cursor-pointer`}
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
        )}
      </div>
      <Footer />
    </main>
  );
}
