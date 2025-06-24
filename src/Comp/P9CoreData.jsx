import { p9data } from "../Data/P9Data";
import { sToA } from "../Data/Misc";
import { weaponAxe, weaponStaff, weaponBlades, weaponCoat, weaponFlames, weaponSkull } from "../Data/Misc";
import { useState } from "react";

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

export default function P9Core() {
  const [weapontype, setWeapontype] = useState(`All`);

  const targetData = weapontype === `All` ? p9data : p9data.filter((obj) => weaponData[weapontype].includes(obj.asp));

  const displayData = weapontype === `All` ? p9data : targetData;

  const core_Counts = displayData.reduce((acc, entry) => {
    const corArray = sToA(entry.cor); // Convert string to array

    corArray.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});

  return (
    <div className="rounded bg-[#0e0c1e] border-1 border-white/20 p-4 py-2 mb-4">
      <div className="text-[12px] py-1 flex gap-2">
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
      </div>
      <div className="font-[Cinzel]">Core Boons</div>
      {core_attribute.map((ite) => (
        <div className="flex flex-wrap gap-1 py-2">
          {findBoonTotal(core_Counts, ite).map((arr, index) => (
            <div className="flex gap-1 rounded border-1 border-white/20 p-2" key={index}>
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
  );
}
