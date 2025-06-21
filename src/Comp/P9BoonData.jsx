import { sToA } from "../Data/Misc";
import { p9data } from "../Data/P9Data";
import { p9boons_reverse } from "../Data/P9BoonObj";
import { hammer_staff, hammer_axe, hammer_blades, hammer_skull, hammer_flames, hammer_suit } from "../Data/P9Boons";
import { weaponStaff, weaponBlades, weaponCoat, weaponAxe, weaponFlames, weaponSkull } from "../Data/Misc";

import { orderMap } from "../App";

const core_attribute = [`Attack`, `Special`, `Cast`, `Sprint`, `Magick`];

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
const core_Counts = p9data.reduce((acc, entry) => {
  const corArray = sToA(entry.cor); // Convert string to array

  corArray.forEach((cor) => {
    acc[cor] = (acc[cor] || 0) + 1;
  });

  return acc;
}, {});
// Function to find all Core Boons
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
//

const core_Duo = p9data.reduce((acc, entry) => {
  const corArray = sToA(entry.duo); // Convert string to array

  corArray.forEach((cor) => {
    acc[cor] = (acc[cor] || 0) + 1;
  });

  return acc;
}, {});

const core_Ele = p9data.reduce((acc, entry) => {
  const corArray = sToA(entry.ele); // Convert string to array

  corArray.forEach((cor) => {
    acc[cor] = (acc[cor] || 0) + 1;
  });

  return acc;
}, {});

const core_Misc = p9data.reduce((acc, entry) => {
  const corArray = sToA(entry.mis); // Convert string to array

  corArray.forEach((cor) => {
    acc[cor] = (acc[cor] || 0) + 1;
  });

  return acc;
}, {});

const core_Chaos = p9data.reduce((acc, entry) => {
  const corArray = sToA(entry.cha); // Convert string to array

  corArray.forEach((cor) => {
    acc[cor] = (acc[cor] || 0) + 1;
  });

  return acc;
}, {});

export default function P9BoonData() {
  return (
    <div className="max-w-[1200px] font-[PT] text-[10px] md:text-[12px] mx-auto my-2">
      <div className="px-2 text-[#fff200]">Count: {p9data.length}</div>
      <div className="rounded bg-black/80 border-1 border-white/20 p-4 py-2 mb-4">
        <div className="font-[Cinzel]">Core Boons</div>
        {core_attribute.map((ite) => (
          <div className="flex flex-wrap gap-1 py-2">
            {findBoonTotal(core_Counts, ite).map((arr, index) => (
              <div className="flex gap-1 rounded border-1 border-white/20 p-2" key={index}>
                <img
                  src={`/H2Boons/${arr[0]}.png`}
                  alt="Core Boons"
                  className="size-7 md:size-9 rounded border-1 border-black/20"
                />
                <div>
                  <div>{arr[0]}</div>
                  <div>{Math.floor(100 * (arr[1] / p9data.length))}%</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="rounded bg-black/80 border-1 border-white/20 p-4 py-0 mb-4">
        <div className="font-[Cinzel] py-2">Staff</div>
        <div className="flex flex-wrap gap-1">
          {hammerStaff.map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div className="flex gap-1 rounded border-1 border-white/20 p-2">
                <img
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
        <div className="font-[Cinzel] py-2">Axe</div>
        <div className="flex flex-wrap gap-1">
          {hammerAxe.map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div className="flex gap-1 rounded border-1 border-white/20 p-2">
                <img
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
        <div className="font-[Cinzel] py-2">Blades</div>
        <div className="flex flex-wrap gap-1">
          {hammerBlades.map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div className="flex gap-1 rounded border-1 border-white/20 p-2">
                <img
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
        <div className="font-[Cinzel] py-2">Flames</div>
        <div className="flex flex-wrap gap-1">
          {hammerFlames.map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div className="flex gap-1 rounded border-1 border-white/20 p-2">
                <img
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
        <div className="font-[Cinzel] py-2">Skulll</div>
        <div className="flex flex-wrap gap-1">
          {hammerSkull.map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div className="flex gap-1 rounded border-1 border-white/20 p-2">
                <img
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
        <div className="font-[Cinzel] py-2">Coat</div>
        <div className="flex flex-wrap gap-1">
          {hammerCoat.map((ite, index) => (
            <div className="flex flex-wrap gap-1" key={index}>
              <div className="flex gap-1 rounded border-1 border-white/20 p-2">
                <img
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
      <div className="rounded bg-black/80 border-1 border-white/20 p-4 py-2 mb-4">
        <div className="font-[Cinzel]">Duo</div>
        <div className="flex flex-wrap gap-1 py-2">
          {Object.entries(core_Duo)
            .sort((a, b) => b[1] - a[1])
            .map((ite, index) => (
              <div className="flex flex-wrap gap-1" key={index}>
                <div className="flex gap-1 rounded border-1 border-white/20 p-2">
                  <img
                    src={ite[0] === `` ? `/P9/Nona.png` : `/P9/${p9boons_reverse[ite[0]]}.png`}
                    alt="Core Boons"
                    className="size-7 md:size-9 rounded border-1 border-black/20"
                  />
                  <div>
                    <div>{ite[0] === `` ? `None` : ite[0]}</div>
                    <div>{Math.floor(100 * (ite[1] / p9data.length))}%</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="rounded bg-black/80 border-1 border-white/20 p-4 py-2 mb-4">
        <div className="font-[Cinzel]">Infusion</div>
        <div className="flex flex-wrap gap-1 py-2">
          {Object.entries(core_Ele)
            .sort((a, b) => b[1] - a[1])
            .map((ite, index) => (
              <div className="flex flex-wrap gap-1" key={index}>
                <div className="flex gap-1 rounded border-1 border-white/20 p-2">
                  <img
                    src={ite[0] === `` ? `/P9/Nona.png` : `/P9/${p9boons_reverse[ite[0]]}.png`}
                    alt="Core Boons"
                    className="size-7 md:size-9 rounded border-1 border-black/20"
                  />
                  <div>
                    <div>{ite[0] === `` ? `None` : ite[0]}</div>
                    <div>{Math.floor(100 * (ite[1] / p9data.length))}%</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="rounded bg-black/80 border-1 border-white/20 p-4 py-2 mb-4">
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
                <div className="flex gap-1 rounded border-1 border-white/20 p-2">
                  <img
                    src={ite[0] === `` ? `/P9/Nona.png` : `/P9/${p9boons_reverse[ite[0]]}.png`}
                    alt="Core Boons"
                    className="size-7 md:size-9 rounded border-1 border-black/20"
                  />
                  <div>
                    <div>{ite[0] === `` ? `None` : ite[0]}</div>
                    <div>{Math.floor(100 * (ite[1] / p9data.length))}%</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="rounded bg-black/80 border-1 border-white/20 p-4 py-2 mb-4">
        <div className="font-[Cinzel]">Chaos / Hex</div>
        <div className="flex flex-wrap gap-1 py-2">
          {Object.entries(core_Chaos)
            .sort((a, b) => b[1] - a[1])
            .map((ite, index) => (
              <div className="flex flex-wrap gap-1" key={index}>
                <div className="flex gap-1 rounded border-1 border-white/20 p-2">
                  <img
                    src={ite[0] === `` ? `/P9/Nona.png` : `/P9/${p9boons_reverse[ite[0]]}.png`}
                    alt="Core Boons"
                    className="size-7 md:size-9 rounded border-1 border-black/20"
                  />
                  <div>
                    <div>{ite[0] === `` ? `None` : ite[0]}</div>
                    <div>{Math.floor(100 * (ite[1] / p9data.length))}%</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
