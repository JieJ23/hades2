import { sToA } from "../Data/Misc";
import { p9boons_reverse } from "../Data/P9BoonObj";
import { useState } from "react";
import { h2AspectOrder } from "../Data/Misc";

const core_attribute = [`Attack`, `Special`, `Cast`, `Sprint`, `Magick`];
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

export default function P11BoonData({ data }) {
  const [weapontype, setWeapontype] = useState(`Melinoe Staff`);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(67);

  const selectedDataset = data.filter((obj) => obj.fea >= min && obj.fea <= max);
  const targetData = weapontype === `All` ? selectedDataset : selectedDataset.filter((obj) => obj.asp == weapontype);
  const displayData = weapontype === `All` ? selectedDataset : targetData;

  const displayHammer = displayData
    .filter((obj) => obj.asp === weapontype)
    .reduce((acc, entry) => {
      const hamArray = sToA(entry.ham); // Convert string to array

      hamArray.forEach((cor) => {
        acc[cor] = (acc[cor] || 0) + 1;
      });

      return acc;
    }, {});

  const currentAspectHammerL = data.filter((obj) => obj.asp === weapontype).length;
  //

  const core_Counts = displayData.reduce((acc, entry) => {
    const corArray = sToA(entry.cor); // Convert string to array

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

  return (
    <div className="max-w-[1400px] font-[Ale] text-[12px] mx-auto my-4 py-2">
      <div className="px-2 flex gap-1 my-2">
        <select
          value={weapontype}
          className="select select-sm w-[150px] border-1 focus:outline-0 border-[#00ffaa] rounded"
          onChange={(e) => {
            setWeapontype(e.target.value);
          }}
        >
          {h2AspectOrder.map((ite, index) => (
            <option value={ite} key={index}>
              {ite}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="input input-sm border-1 focus:outline-0 border-[#f18043] rounded w-[80px]"
          value={min}
          min={1}
          max={67}
          onChange={(e) => {
            setMin(+e.target.value);
          }}
        />
        <input
          type="number"
          className="input input-sm border-1 focus:outline-0 border-[#f18043] rounded w-[80px]"
          value={max}
          min={1}
          max={67}
          onChange={(e) => {
            setMax(+e.target.value);
          }}
        />
      </div>
      <div className="px-4 my-2 flex gap-2">
        <div>Query Fear:</div>
        <div className="text-[#f18043]">Min [{min}]</div>
        <div className="text-[#f18043]">Max [{max}]</div>
        <div className="text-[#fff200]">[{displayData.length}]</div>
      </div>
      <div className="flex flex-wrap gap-1 px-2 my-2">
        {Object.entries(displayHammer)
          .filter((arr) => arr[0] !== "")
          .sort((a, b) => b[1] - a[1])
          .map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div
                className={`flex gap-1 rounded p-2 ${
                  (100 * (ite[1] / currentAspectHammerL)).toFixed(2) >= 25
                    ? `bg-[#00ffaa] text-black`
                    : `bg-[#131111a1]`
                }`}
              >
                <img
                  draggable={false}
                  loading="lazy"
                  src={`/P9/${p9boons_reverse[ite[0]]}.png`}
                  alt="Core Boons"
                  className="size-7 md:size-8"
                />
                <div>
                  <div>{ite[0]}</div>
                  <div>{(100 * (ite[1] / currentAspectHammerL)).toFixed(2)}%</div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="rounded px-2 my-2">
        {core_attribute.map((ite) => (
          <div className="flex flex-wrap gap-1 my-2">
            {findBoonTotal(core_Counts, ite).map((arr, index) => (
              <div
                className={`flex gap-1 rounded p-2 ${
                  (100 * (arr[1] / displayData.length)).toFixed(2) >= 25 ? `bg-[#00ffaa] text-black` : `bg-[#131111a1]`
                }`}
                key={index}
              >
                <img
                  draggable={false}
                  loading="lazy"
                  src={`/H2Boons/${arr[0]}.png`}
                  alt="Core Boons"
                  className="size-7 md:size-8"
                />
                <div>
                  <div>{arr[0].includes(`Sprint`) ? arr[0].replace(`Sprint`, `Rush`) : arr[0]}</div>
                  <div>{(100 * (arr[1] / displayData.length)).toFixed(2)}%</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="rounded px-2 my-2 mb-4">
        <div className="flex flex-wrap gap-1">
          {Object.entries(core_Fam)
            .sort((a, b) => b[1] - a[1])
            .map((ite, index) => (
              <div className="flex flex-wrap gap-1" key={index}>
                <div
                  className={`flex gap-1 rounded p-2 ${
                    (100 * (ite[1] / displayData.length)).toFixed(2) >= 25
                      ? `bg-[#00ffaa] text-black`
                      : `bg-[#131111a1]`
                  }`}
                >
                  <img
                    draggable={false}
                    loading="lazy"
                    src={ite[0] === `` ? `/P9/Nona.png` : `/P9/${ite[0]}.png`}
                    alt="Core Boons"
                    className="size-7 md:size-8"
                  />
                  <div>
                    <div>{ite[0] === `` ? `None` : ite[0]}</div>
                    <div>{(100 * (ite[1] / displayData.length)).toFixed(2)}%</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
