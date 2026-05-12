import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import data from "../Data/KilledBy.json";
import { h2AspectOrder } from "../Data/Misc";
import BarFear from "../Comp/BarFear";
import BarTime from "../Comp/BarTime";

const notNonDeath = data.filter((obj) => obj.KilledBy !== "");

const findBiomeName = (bio) => {
  switch (bio) {
    case "N":
      return `Ephyra`;
    case "F":
      return `Erebus`;
    case "C":
      return `Elysium`;
    case "P":
      return `Olympus`;
    case "G":
      return `Oceanus`;
    case "H":
      return `Fields`;
    case "I":
      return `Tartarus`;
    case "O":
      return `Thessaly`;
    case "Q":
      return `Summit`;
    case "Anomaly":
      return `Asphodel`;
    default:
      return "Other";
  }
};

const biomes = [`F`, `G`, `H`, `I`, `N`, `O`, `P`, `Q`];
const bosses = [`Hecate`, `Scylla`, `Cerberus`, `Chronos`, `Polyphemus`, `Eris`, `Prometheus`, `Typhonhead`];

const storeDeath = Object.entries(
  notNonDeath.reduce((acc, item) => {
    const target = item.KilledBy;
    acc[target] = (acc[target] || 0) + 1;
    return acc;
  }, {}),
).sort((a, b) => b[1] - a[1]);

const storeRoom = Object.entries(
  notNonDeath.reduce((acc, item) => {
    const target = item.EndRoom;
    acc[target] = (acc[target] || 0) + 1;
    return acc;
  }, {}),
).sort((a, b) =>
  a[0].localeCompare(b[0], undefined, {
    sensitivity: "base",
  }),
);

const biomeData = [];
for (let i = 0; i < biomes.length; i++) {
  const getBiomes = storeRoom.filter((arr) => arr[0].includes(biomes[i]));
  biomeData.push(getBiomes);
}
const biomeSum = [];
for (let i = 0; i < biomeData.length; i++) {
  const biomeArray = Object.values(Object.fromEntries(biomeData[i]));
  const biomeTotal = biomeArray.reduce((acc, ite) => {
    return acc + ite;
  }, 0);
  biomeSum.push([findBiomeName(biomes[i]), biomeTotal]);
}

const counts = Object.entries(
  h2AspectOrder.reduce((acc, aspect) => {
    acc[aspect] = notNonDeath.filter((obj) => obj.Aspect === aspect).length;
    return acc;
  }, {}),
).sort((a, b) => b[1] - a[1]);

export default function Death() {
  return (
    <main className="h-full min-h-lvh relative overflow-hidden text-[12px] md:text-[14px] font-[Ale] select-none">
      <Background />
      <SideNav />
      <div className="max-w-[1400px] mx-auto my-8">
        <div className="my-10 p-2">
          <div className="p-2 text-[18px] font-[Exo]">{notNonDeath.length} Runs, Death Count:</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {biomeSum.map((arr, index) => (
              <div className="font-[Exo] text-white text-center p-4 py-8 border border-black rounded-xl relative">
                <img
                  src={`/Enemy/Biome${arr[0]}.png`}
                  alt="Biome"
                  className="absolute top-0 left-0 w-full h-full object-cover object-center -z-10"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10" />
                <img src={`/DreamDive/${arr[0]}.png`} alt="Icon" className="size-10 mx-auto" />
                <div className="text-[16px]">{arr[0]}</div>
                <div className="flex justify-center items-center gap-1">
                  {arr[1]}
                  <img src="Vows/Pain.png" alt="Death" className="size-4" />
                </div>
              </div>
            ))}
          </div>
          <img src="/divider.png" alt="Divider" className="w-full max-w-[600px] mx-auto my-8" />
          {biomeData.map((item, index) => (
            <div className="mb-5">
              <div className="font-[Exo] text-[23px] px-4">{findBiomeName(biomes[index])}</div>
              <div className="flex flex-wrap gap-2 p-2 rounded">
                {item
                  .sort((a, b) => b[1] - a[1])
                  .map((arr, index) => (
                    <div
                      className={`min-w-[140px] text-black flex justify-between px-2 py-1 rounded border border-white/10
                    ${arr[0].toLowerCase().includes("boss") ? `bg-orange-300` : `bg-[#131111] text-gray-400`}
                    `}
                    >
                      <div>{arr[0]}</div>
                      <div>{arr[1]}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
