import { useState } from "react";

const region = [`Underworld`, `Surface`];
const under_bio = [`Erebus`, `Oceanus`, `Fields`, `Tartarus`];
const surface_bio = [`Ephyra`, `Thessaly`, `Olympus`, `Summit`];

export default function KeepData({ data }) {
  const [location, setLocation] = useState(`Underworld`);

  const fullKeepData = data.filter((obj) => obj.ks);
  const locationKeep = fullKeepData.filter((obj) => obj.loc === location);

  //
  //   const biome1_count = locationKeep.reduce((acc, entry) => {
  //     const keepArr = entry.ks.split(",")[0];
  //     acc[keepArr] = (acc[keepArr] || 0) + 1;
  //     return acc;
  //   }, {});

  const fullbiomeData = [];

  for (let i = 0; i < 4; i++) {
    const biomeTarget = locationKeep.reduce((acc, entry) => {
      const keepArr = entry.ks.split(",")[i];
      acc[keepArr] = (acc[keepArr] || 0) + 1;
      return acc;
    }, {});

    fullbiomeData.push(biomeTarget);
  }
  //

  return (
    <div className="rounded my-4 w-full max-w-[1400px] mx-auto font-[Ale] text-[12px] p-2">
      <div className="px-2 text-[20px]">Keepsakes</div>
      <div className="p-1 flex flex-wrap gap-1 my-1">
        {region.map((ite) => (
          <button
            className={`cursor-pointer rounded p-1 ${
              location === ite ? `bg-white text-black` : `bg-transparent text-white`
            }`}
            onClick={() => setLocation(ite)}
          >
            {ite}
          </button>
        ))}
      </div>
      <div className="px-2 my-1 flex gap-1">
        <div>Query:</div>
        <div className="text-[#fff200]">[{locationKeep.length}]</div>
      </div>
      {fullbiomeData.map((parentArr, parentIndex) => (
        <>
          <div className="text-[14px] text-[orange] px-2">
            {location === `Underworld` ? under_bio[parentIndex] : surface_bio[parentIndex]}
          </div>
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 gap-y-1 mb-2"
            key={parentIndex}
          >
            {Object.entries(parentArr)
              .sort((a, b) => b[1] - a[1])
              .map((arr, index) => (
                <div className="flex gap-1 bg-[#131111a1] p-2 rounded" key={index}>
                  <img src={`/buildgui/${arr[0]}.png`} alt="Keepsakes" className="size-8" />
                  <div>
                    <div className="text-[12px]">{arr[0]}</div>
                    <div>{((arr[1] / locationKeep.length) * 100).toFixed(2)}%</div>
                  </div>
                </div>
              ))}
          </div>
        </>
      ))}
    </div>
  );
}
