import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { sToA } from "../Data/Misc";
import { sdata } from "../Data/SData";
import { mainID } from "../Data/MainID";
import { useState } from "react";
import assets from "../Data/store.json";
import { h2AspectOrder, parseTimetoms, parsemstoTime } from "../Data/Misc";
import { arcanaid, idMetaUpgrade, idarcana } from "../Data/Arcana1";
import { vowid, idvow } from "../Data/Vow1";
import { vowArray, allVows } from "../Data/FearTrait";
import BarFear from "../Comp/BarFear";
import BarTime from "../Comp/BarTime";
//
function sortAndFillArray(arr, targetSize = 25) {
  // Step 1: Sort by numeric value
  const sorted = [...arr].sort((a, b) => {
    const numA = parseInt(a.substring(1));
    const numB = parseInt(b.substring(1));
    return numA - numB;
  });

  // Step 2: Map to target size, filling missing values with "c0"
  const filled = Array.from({ length: targetSize }, (_, i) => {
    const value = `c${i + 1}`;
    return arr.includes(value) ? value : "c0";
  });

  return filled;
}

function parseVowArray(arr) {
  const positions = [];
  const numbers = [];

  arr.forEach((item) => {
    // Extract the name and number using regex
    const match = item.match(/^([A-Za-z]+)(\d+)$/);

    if (match) {
      const name = match[1]; // e.g., "Frenzy" or "Shadow"
      const num = match[2]; // e.g., "2" or "1"

      // Get position from vowid object
      if (vowid[name] !== undefined) {
        positions.push(vowid[name]);
        numbers.push(parseInt(num));
      }
    }
  });

  return [positions, numbers];
}

//
import { arc, metaUpgrade } from "../Data/Group";
//
export default function Loadout() {
  const [aspect, setAspect] = useState("");
  const [region, setRegion] = useState("");
  const [time, setTime] = useState("");
  const [minfear, setMinFear] = useState("");
  const [maxfear, setMaxFear] = useState("");
  const [displayArc, setDisplayArc] = useState(0);
  const [displayVow, setDIsplayVow] = useState(0);

  const targetList = assets.filter((obj) => {
    const matchesAspect = !aspect || obj.Aspect === aspect;
    const matchesRegion = !region || obj.Region === region;
    const matchesTime = !time || parseTimetoms(obj.Time) < 6000 * Number(time);

    const min = Number(minfear);
    const max = Number(maxfear);

    const matchesFear = (!minfear || obj.Fear >= min) && (!maxfear || obj.Fear <= max);

    return matchesAspect && matchesRegion && matchesTime && matchesFear;
  });

  const arcStore = Object.entries(
    targetList.reduce((acc, ite) => {
      const items = sToA(ite.Traits);

      items.forEach((item) => {
        if (item.includes("Meta")) acc[item] = (acc[item] || 0) + 1;
      });

      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const vowStore = Object.entries(
    targetList.reduce((acc, ite) => {
      const items = sToA(ite.Shrine);

      items.forEach((item) => {
        acc[item] = (acc[item] || 0) + 1;
      });

      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const arcLoad = Object.entries(
    targetList.reduce((acc, ite) => {
      const items = sToA(ite.Traits);
      const onlyMetaString = items.filter((i) => i.includes("Meta")).join(",");

      acc[onlyMetaString] = (acc[onlyMetaString] || 0) + 1;

      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const vowLoad = Object.entries(
    targetList.reduce((acc, item) => {
      const items = sToA(item.Shrine);
      acc[items] = (acc[items] || 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  // Display Vow Array

  const currentVowArrays = vowLoad.length > 0 && parseVowArray(sToA(vowLoad[displayVow][0]));

  const counts = Object.entries(
    h2AspectOrder.reduce((acc, aspect) => {
      acc[aspect] = targetList.filter((obj) => obj.Aspect === aspect).length;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  // Testing

  return (
    <div>
      <Background />
      <SideNav />
      {/* Start */}
      <div className="min-h-screen my-4 max-w-[1600px] mx-auto p-2 font-[Ale] text-[14px] select-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-2">
          <select
            className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
            value={aspect}
            onChange={(e) => {
              setAspect(e.target.value);
            }}
          >
            <option value={""}>{`All Aspect`}</option>
            {h2AspectOrder.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <select
            className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
            }}
          >
            <option value={""}>{`All Region`}</option>
            <option value={`Surface`}>Surface</option>
            <option value={`Underworld`}>Underworld</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-2 mt-1">
          <select
            className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            <option value={""}>{`Clear Before Selected Min`}</option>
            {Array.from({ length: 67 }).map((_, index) => (
              <option value={index + 1}>{index + 1}</option>
            ))}
          </select>
          <select
            className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
            value={minfear}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (maxfear && value > maxfear) return; // block invalid
              setMinFear(value);
            }}
          >
            <option value={""}>{`Min Fear`}</option>
            {Array.from({ length: 67 }).map((_, index) => (
              <option value={index + 1}>{index + 1}</option>
            ))}
          </select>
          <select
            className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
            value={maxfear}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (minfear && value < minfear) return; // block invalid
              setMaxFear(value);
            }}
          >
            <option value={""}>{`Max Fear`}</option>
            {Array.from({ length: 67 }).map((_, index) => (
              <option value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </div>
        {/* Content */}
        <div className="hidden sm:block class">
          <div className="flex gap-2">
            <BarFear data={targetList} title={`Fear Distribution`} />
            <BarTime data={targetList} title={`Time Distribution`} />
          </div>
        </div>
        <div className="flex justify-start gap-2 my-4 px-4 text-[16px] font-[Ale]">
          <span>Full Aspect Distribution</span>
        </div>
        <div className="flex gap-1 overflow-auto p-1 px-2 bg-black/20 border-1 border-white/10">
          {counts.map((arr, index) => {
            return (
              arr[1] > 0 && (
                <div className="min-w-20 p-1 flex flex-col items-center rounded leading-tight">
                  <img src={`/GUI_Card/c${arr[0]}.png`} alt="Aspects" className="w-15 h-auto" draggable="false" />
                  <div className="text-center text-orange-200 text-[10px]">{arr[0]}</div>
                  <div>{arr[1]}</div>
                </div>
              )
            );
          })}
        </div>
        <div className="flex justify-start gap-2 my-4 px-4 text-[16px] font-[Ale]">
          <span>Selection Entries: {targetList.length} Entries</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div>
            <div className="flex flex-wrap gap-2 p-1 justify-center text-[14px] font-[Exo] my-2">
              {arcLoad.map((arr, index) => (
                <button
                  className={`border cursor-pointer border-white/20 rounded px-2 py-1 ${displayArc === index ? `bg-white text-black` : ``}`}
                  onClick={() => setDisplayArc(index)}
                >
                  <div className="leading-tight">
                    <div>Deck {index + 1}</div>
                    <div className="font-[Ale] text-[14px]">{arr[1]}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-5 place-content-start max-w-[450px] h-auto mx-auto shrink-0">
              {arcLoad.length > 0 &&
                sortAndFillArray(sToA(arcLoad[displayArc][0]).map((ite) => idMetaUpgrade[ite])).map((ite) => (
                  <div>
                    <img
                      draggable={false}
                      src={`/Arcane/${ite}.png`}
                      alt="Arcane Card"
                      className={`w-full transition-transform transform`}
                    />
                    <div className="text-center text-[12px]">{idarcana[ite]}</div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap justify-center gap-2 p-1 text-[14px] font-[Exo] my-2">
              {vowLoad.map((arr, index) => (
                <button
                  className={`border cursor-pointer border-white/10 rounded px-2 py-1 ${displayVow === index ? `bg-white text-black` : ``}`}
                  onClick={() => setDIsplayVow(index)}
                >
                  <div className="leading-tight">
                    <div>Vow {index + 1}</div>
                    <div className="font-[Ale] text-[14px]">{arr[1]}</div>
                  </div>
                </button>
              ))}
            </div>
            {vowLoad.length > 0 && (
              <div className="grid grid-cols-4 w-full gap-0.5 lg:gap-1 place-content-start px-0.5">
                {allVows.map((ite, index) => {
                  // Find if this vow (at this index) is in the current selection
                  const positionInArray = currentVowArrays[0].indexOf(index + 1);
                  const isSelected = positionInArray !== -1;
                  const currentLevel = isSelected ? currentVowArrays[1][positionInArray] : 0;

                  return (
                    <div
                      className={`w-full min-h-[100px] flex flex-col justify-center items-center gap-0.5 relative transition-all duration-200 ease-in pt-1 rounded ${isSelected ? `bg-gradient-to-t from-purple-800 via-purple-900/50 to-transparent` : `bg-black/50`} ${index === 16 && `col-start-2 col-span-2`}`}
                      key={index}
                    >
                      <img
                        src={`/Vows/${ite}.png`}
                        alt="Fear Vows"
                        className="size-7 md:size-8 lg:size-9 rounded"
                        draggable={false}
                      />
                      <div className="text-white">{ite}</div>
                      <div className="text-white text-[12px]">
                        {currentLevel != 0 ? `${vowArray(allVows[index])[currentLevel]} Fear` : `Unactive`}
                      </div>
                      <div className="flex justify-center w-full gap-1 px-4 py-2">
                        {Array.from({ length: vowArray(ite).length - 1 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1 w-full max-w-[25px] ${currentLevel > idx ? `bg-[#00ffaa]` : `bg-gray-600`}`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 my-8">
          <div className="w-full bg-gradient-to-b from-[#28282b]/80 to-transparent rounded-xl p-2">
            {arcStore.map((arr, index) => (
              <div className="grid grid-cols-3">
                <div className="text-orange-200">{idarcana[idMetaUpgrade[[arr[0]]]]}</div>
                <div>{arr[1]}</div>
                <div>{((arr[1] / targetList.length) * 100).toFixed(2)}%</div>
              </div>
            ))}
          </div>
          <div className="w-full bg-gradient-to-b from-[#28282b]/80 to-transparent rounded-xl p-2">
            {vowStore.map((arr, index) => (
              <div className="grid grid-cols-3">
                <div className="text-orange-200">
                  {arr[0] === "" ? `None` : `${arr[0].slice(0, -1)}  Rank${arr[0].slice(-1)}`}
                </div>
                <div>{arr[1]}</div>
                <div>{((arr[1] / targetList.length) * 100).toFixed(2)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* End */}
      <Footer />
    </div>
  );
}
