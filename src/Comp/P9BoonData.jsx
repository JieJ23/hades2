import { sToA } from "../Data/Misc";
import { p9data } from "../Data/P9Data";
import { p9boons_reverse } from "../Data/P9BoonObj";
import { hammer_staff, hammer_axe, hammer_blades, hammer_skull, hammer_flames, hammer_suit } from "../Data/P9Boons";
import { weaponStaff, weaponBlades, weaponCoat, weaponAxe, weaponFlames, weaponSkull } from "../Data/Misc";
// import P9Core from "./P9CoreData";
import { orderMap } from "../App";
import { useState } from "react";

const allStaff = p9data.filter((obj) => weaponStaff.includes(obj.asp)).length;
const allAxe = p9data.filter((obj) => weaponAxe.includes(obj.asp)).length;
const allBlades = p9data.filter((obj) => weaponBlades.includes(obj.asp)).length;
const allSkull = p9data.filter((obj) => weaponSkull.includes(obj.asp)).length;
const allFlames = p9data.filter((obj) => weaponFlames.includes(obj.asp)).length;
const allCoat = p9data.filter((obj) => weaponCoat.includes(obj.asp)).length;

//
const hammer_Counts = p9data.reduce((acc, entry) => {
  const hamArray = sToA(entry.ham); // Convert string to array

  hamArray.forEach((cor) => {
    acc[cor] = (acc[cor] || 0) + 1;
  });

  return acc;
}, {});
// Hammer Boons
const hammerStaff = Object.entries(hammer_Counts)
  .filter((item) => Object.values(hammer_staff).includes(item[0]))
  .sort((a, b) => (a[1] > b[1] ? -1 : 1));

const hammerAxe = Object.entries(hammer_Counts)
  .filter((item) => Object.values(hammer_axe).includes(item[0]))
  .sort((a, b) => (a[1] > b[1] ? -1 : 1));

const hammerBlades = Object.entries(hammer_Counts)
  .filter((item) => Object.values(hammer_blades).includes(item[0]))
  .sort((a, b) => (a[1] > b[1] ? -1 : 1));

const hammerFlames = Object.entries(hammer_Counts)
  .filter((item) => Object.values(hammer_flames).includes(item[0]))
  .sort((a, b) => (a[1] > b[1] ? -1 : 1));

const hammerSkull = Object.entries(hammer_Counts)
  .filter((item) => Object.values(hammer_skull).includes(item[0]))
  .sort((a, b) => (a[1] > b[1] ? -1 : 1));

const hammerCoat = Object.entries(hammer_Counts)
  .filter((item) => Object.values(hammer_suit).includes(item[0]))
  .sort((a, b) => (a[1] > b[1] ? -1 : 1));
//

const weapon = [`Staff`, `Blades`, `Axe`, `Flames`, `Skull`, `Coat`];
const weaponData = [weaponStaff, weaponBlades, weaponAxe, weaponFlames, weaponSkull, weaponCoat];
const core_attribute = [`Attack`, `Special`, `Cast`, `Sprint`, `Magick`];
//
function findBoonTotal(data, target) {
  const targetArray = Object.entries(data)
    .filter(([key, _]) => key.includes(target)) // Filter by key
    .sort((a, b) => b[1] - a[1]) // Sort by value (descending)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  return Object.entries(targetArray);
}

export default function P9BoonData() {
  const [weapontype, setWeapontype] = useState(`All`);
  const [min, setMin] = useState(22);
  const [max, setMax] = useState(67);

  const selectedDataset = p9data.filter((obj) => obj.fea >= min && obj.fea <= max);

  const targetData =
    weapontype === `All` ? selectedDataset : selectedDataset.filter((obj) => weaponData[weapontype].includes(obj.asp));

  const displayData = weapontype === `All` ? selectedDataset : targetData;

  //

  const core_Counts = displayData.reduce((acc, entry) => {
    const corArray = sToA(entry.cor); // Convert string to array

    corArray.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});

  const core_Duo = displayData.reduce((acc, entry) => {
    const corArray = sToA(entry.duo); // Convert string to array

    corArray.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});

  const core_Ele = displayData.reduce((acc, entry) => {
    const corArray = sToA(entry.ele); // Convert string to array

    corArray.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});

  const core_Fam = displayData.reduce((acc, entry) => {
    const corArray = sToA(entry.fam); // Convert string to array

    corArray.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});

  const core_Misc = displayData.reduce((acc, entry) => {
    const corArray = sToA(entry.mis); // Convert string to array

    corArray.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});

  const core_Chaos = displayData.reduce((acc, entry) => {
    const corArray = sToA(entry.cha); // Convert string to array

    corArray.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});

  return (
    <div className="max-w-[1200px] font-[PT] text-[10px] md:text-[12px] mx-auto my-2">
      {/* <P9Core /> */}
      <div className="rounded bg-black/80 border-1 border-black p-4 mb-4">
        <div className="font-[Cinzel] py-2 px-4">Staff - {Math.round(100 * (allStaff / p9data.length))}% of count</div>
        <div className="flex flex-wrap gap-1">
          {hammerStaff.map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div
                className={`flex gap-1 rounded border-1 p-2 ${
                  Math.floor(100 * (ite[1] / allStaff)) >= 25 ? `bg-[#192265] border-none` : `border-white/20`
                }`}
              >
                <img
                  draggable={false}
                  loading="lazy"
                  src={`/P9/${p9boons_reverse[ite[0]]}.png`}
                  alt="Core Boons"
                  className="size-7 md:size-9 rounded border-1 border-black/20"
                />
                <div>
                  <div>{ite[0]}</div>
                  <div>{Math.floor(100 * (ite[1] / allStaff))}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="font-[Cinzel] py-2 px-4">Axe - {Math.round(100 * (allAxe / p9data.length))}% of count</div>
        <div className="flex flex-wrap gap-1">
          {hammerAxe.map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div
                className={`flex gap-1 rounded border-1 p-2 ${
                  Math.floor(100 * (ite[1] / allAxe)) >= 25 ? `bg-[#192265] border-none` : `border-white/20`
                }`}
              >
                <img
                  draggable={false}
                  loading="lazy"
                  src={`/P9/${p9boons_reverse[ite[0]]}.png`}
                  alt="Core Boons"
                  className="size-7 md:size-9 rounded border-1 border-black/20"
                />
                <div>
                  <div>{ite[0]}</div>
                  <div>{Math.floor(100 * (ite[1] / allAxe))}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="font-[Cinzel] py-2 px-4">
          Blades - {Math.round(100 * (allBlades / p9data.length))}% of count
        </div>
        <div className="flex flex-wrap gap-1">
          {hammerBlades.map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div
                className={`flex gap-1 rounded border-1 p-2 ${
                  Math.floor(100 * (ite[1] / allBlades)) >= 25 ? `bg-[#192265] border-none` : `border-white/20`
                }`}
              >
                <img
                  draggable={false}
                  loading="lazy"
                  src={`/P9/${p9boons_reverse[ite[0]]}.png`}
                  alt="Core Boons"
                  className="size-7 md:size-9 rounded border-1 border-black/20"
                />
                <div>
                  <div>{ite[0]}</div>
                  <div>{Math.floor(100 * (ite[1] / allBlades))}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="font-[Cinzel] py-2 px-4">
          Flames - {Math.round(100 * (allFlames / p9data.length))}% of count
        </div>
        <div className="flex flex-wrap gap-1">
          {hammerFlames.map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div
                className={`flex gap-1 rounded border-1 p-2 ${
                  Math.floor(100 * (ite[1] / allFlames)) >= 25 ? `bg-[#192265] border-none` : `border-white/20`
                }`}
              >
                <img
                  draggable={false}
                  loading="lazy"
                  src={`/P9/${p9boons_reverse[ite[0]]}.png`}
                  alt="Core Boons"
                  className="size-7 md:size-9 rounded border-1 border-black/20"
                />
                <div>
                  <div>{ite[0]}</div>
                  <div>{Math.floor(100 * (ite[1] / allFlames))}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="font-[Cinzel] py-2 px-4">Skull - {Math.round(100 * (allSkull / p9data.length))}% of count</div>
        <div className="flex flex-wrap gap-1">
          {hammerSkull.map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div
                className={`flex gap-1 rounded border-1 p-2 ${
                  Math.floor(100 * (ite[1] / allSkull)) >= 25 ? `bg-[#192265] border-none` : `border-white/20`
                }`}
              >
                <img
                  draggable={false}
                  loading="lazy"
                  src={`/P9/${p9boons_reverse[ite[0]]}.png`}
                  alt="Core Boons"
                  className="size-7 md:size-9 rounded border-1 border-black/20"
                />
                <div>
                  <div>{ite[0]}</div>
                  <div>{Math.floor(100 * (ite[1] / allSkull))}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="font-[Cinzel] py-2 px-4">Coat - {Math.round(100 * (allCoat / p9data.length))}% of count</div>
        <div className="flex flex-wrap gap-1">
          {hammerCoat.map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div
                className={`flex gap-1 rounded border-1 p-2 ${
                  Math.floor(100 * (ite[1] / allCoat)) >= 25 ? `bg-[#192265] border-none` : `border-white/20`
                }`}
              >
                <img
                  draggable={false}
                  loading="lazy"
                  src={`/P9/${p9boons_reverse[ite[0]]}.png`}
                  alt="Core Boons"
                  className="size-7 md:size-9 rounded border-1 border-black/20"
                />
                <div>
                  <div>{ite[0]}</div>
                  <div>{Math.floor(100 * (ite[1] / allCoat))}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-[#fff200] px-4 py-1 text-[12px]">Boon Stats</div>
      <div className="text-[12px] px-4 pb-2 flex gap-2">
        <select
          value={weapontype}
          className="select select-sm w-[100px] border-1 border-[#00ffaa] rounded"
          onChange={(e) => {
            setWeapontype(e.target.value);
          }}
        >
          <option value={`All`}>All</option>
          {weapon.map((ite, index) => (
            <option value={index} key={index}>
              {ite}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="input input-sm border-1 border-[#f18043] w-[50px]"
          value={min}
          min={22}
          max={67}
          onChange={(e) => {
            const newMin = Number(e.target.value);
            if (newMin <= max) {
              setMin(newMin);
            }
          }}
        />
        <input
          type="number"
          className="input input-sm border-1 border-[#f18043] w-[50px]"
          value={max}
          min={22}
          max={67}
          onChange={(e) => {
            const newMax = Number(e.target.value);
            if (newMax >= min) {
              setMax(newMax);
            }
          }}
        />
      </div>
      <div className="text-[12px] px-4 pb-1 flex gap-2">
        <div>Query Fear:</div>
        <div className="text-[#f18043] backdrop-blur-lg">Min [{min}]</div>
        <div className="text-[#f18043] backdrop-blur-lg">Max [{max}]</div>
        <div className="text-[#fff200] backdrop-blur-lg">[{displayData.length}]</div>
      </div>
      <div className="rounded bg-black/80 border-1 border-black p-4 py-2 mb-4">
        <div className="font-[Cinzel]">Core Boons</div>
        {core_attribute.map((ite) => (
          <div className="flex flex-wrap gap-1 py-2">
            {findBoonTotal(core_Counts, ite).map((arr, index) => (
              <div
                className={`flex gap-1 rounded border-1 p-2 ${
                  Math.floor(100 * (arr[1] / displayData.length)) >= 25 ? `bg-[#192265] border-none` : `border-white/20`
                }`}
                key={index}
              >
                <img
                  draggable={false}
                  loading="lazy"
                  src={`/H2Boons/${arr[0]}.png`}
                  alt="Core Boons"
                  className="size-7 md:size-9 rounded border-1 border-black/20"
                />
                <div>
                  <div>{arr[0].includes(`Sprint`) ? arr[0].replace(`Sprint`, `Rush`) : arr[0]}</div>
                  <div>{Math.floor(100 * (arr[1] / displayData.length))}%</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="rounded bg-black/80 border-1 border-black p-4 py-2 mb-4">
        <div className="font-[Cinzel]">Familiar</div>
        <div className="flex flex-wrap gap-1 py-2">
          {Object.entries(core_Fam)
            .sort((a, b) => b[1] - a[1])
            .map((ite, index) => (
              <div className="flex flex-wrap gap-1" key={index}>
                <div
                  className={`flex gap-1 rounded border-1 p-2 ${
                    Math.floor(100 * (ite[1] / displayData.length)) >= 25
                      ? `bg-[#192265] border-none`
                      : `border-white/20`
                  }`}
                >
                  <img
                    draggable={false}
                    loading="lazy"
                    src={ite[0] === `` ? `/P9/Nona.png` : `/P9/${ite[0]}.png`}
                    alt="Core Boons"
                    className="size-7 md:size-9 rounded border-1 border-black/20"
                  />
                  <div>
                    <div>{ite[0] === `` ? `None` : ite[0]}</div>
                    <div>{Math.floor(100 * (ite[1] / displayData.length))}%</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="rounded bg-black/80 border-1 border-black p-4 py-2 mb-4">
        <div className="font-[Cinzel]">Duo</div>
        <div className="flex flex-wrap gap-1 py-2">
          {Object.entries(core_Duo)
            .sort((a, b) => b[1] - a[1])
            .map((ite, index) => (
              <div className="flex flex-wrap gap-1" key={index}>
                <div
                  className={`flex gap-1 rounded border-1 p-2 ${
                    Math.floor(100 * (ite[1] / displayData.length)) >= 25
                      ? `bg-[#192265] border-none`
                      : `border-white/20`
                  }`}
                >
                  <img
                    draggable={false}
                    loading="lazy"
                    src={ite[0] === `` ? `/P9/Nona.png` : `/P9/${p9boons_reverse[ite[0]]}.png`}
                    alt="Core Boons"
                    className="size-7 md:size-9 rounded border-1 border-black/20"
                  />
                  <div>
                    <div>{ite[0] === `` ? `None` : ite[0]}</div>
                    <div>{Math.floor(100 * (ite[1] / displayData.length))}%</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="rounded bg-black/80 border-1 border-black p-4 py-2 mb-4">
        <div className="font-[Cinzel]">Infusion</div>
        <div className="flex flex-wrap gap-1 py-2">
          {Object.entries(core_Ele)
            .sort((a, b) => b[1] - a[1])
            .map((ite, index) => (
              <div className="flex flex-wrap gap-1" key={index}>
                <div
                  className={`flex gap-1 rounded border-1 p-2 ${
                    Math.floor(100 * (ite[1] / displayData.length)) >= 25
                      ? `bg-[#192265] border-none`
                      : `border-white/20`
                  }`}
                >
                  <img
                    draggable={false}
                    loading="lazy"
                    src={ite[0] === `` ? `/P9/Nona.png` : `/P9/${p9boons_reverse[ite[0]]}.png`}
                    alt="Core Boons"
                    className="size-7 md:size-9 rounded border-1 border-black/20"
                  />
                  <div>
                    <div>{ite[0] === `` ? `None` : ite[0]}</div>
                    <div>{Math.floor(100 * (ite[1] / displayData.length))}%</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="rounded bg-black/80 border-1 border-black p-4 py-2 mb-4">
        <div className="font-[Cinzel]">Misc Boons</div>
        <div className="flex flex-wrap gap-1 py-2">
          {Object.entries(core_Misc)
            .sort((a, b) => {
              const aIndex = orderMap.get(a[0]) ?? Infinity;
              const bIndex = orderMap.get(b[0]) ?? Infinity;
              return aIndex - bIndex;
            })

            .map((ite, index) => (
              <div className="flex flex-wrap gap-1" key={index}>
                <div
                  className={`flex gap-1 rounded border-1 p-2 ${
                    Math.floor(100 * (ite[1] / displayData.length)) >= 25
                      ? `bg-[#192265] border-none`
                      : `border-white/20`
                  }`}
                >
                  <img
                    draggable={false}
                    loading="lazy"
                    src={ite[0] === `` ? `/P9/Nona.png` : `/P9/${p9boons_reverse[ite[0]]}.png`}
                    alt="Core Boons"
                    className="size-7 md:size-9 rounded border-1 border-black/20"
                  />
                  <div>
                    <div>{ite[0] === `` ? `None` : ite[0]}</div>
                    <div>{Math.floor(100 * (ite[1] / displayData.length))}%</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="rounded bg-black/80 border-1 border-black p-4 py-2 mb-4">
        <div className="font-[Cinzel]">Chaos / Hex</div>
        <div className="flex flex-wrap gap-1 py-2">
          {Object.entries(core_Chaos)
            .sort((a, b) => b[1] - a[1])
            .map((ite, index) => (
              <div className="flex flex-wrap gap-1" key={index}>
                <div
                  className={`flex gap-1 rounded border-1 p-2 ${
                    Math.floor(100 * (ite[1] / displayData.length)) >= 25
                      ? `bg-[#192265] border-none`
                      : `border-white/20`
                  }`}
                >
                  <img
                    draggable={false}
                    loading="lazy"
                    src={ite[0] === `` ? `/P9/Nona.png` : `/P9/${p9boons_reverse[ite[0]]}.png`}
                    alt="Core Boons"
                    className="size-7 md:size-9 rounded border-1 border-black/20"
                  />
                  <div>
                    <div>{ite[0] === `` ? `None` : ite[0]}</div>
                    <div>{Math.floor(100 * (ite[1] / displayData.length))}%</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
