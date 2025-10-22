import Footer from "../Comp/Footer";
import Background from "../Comp/Background";
import Sidebar from "../Comp/Sidebar";
import { useState } from "react";

import { v1data } from "../Data/V1data";

import { biomeS, biomeU, sToA } from "../Data/Misc";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

function findBiomeKS(biomeNum, data, region) {
  const biomeDataraw = data
    .filter((obj) => obj.loc === region)
    .reduce((acc, entry) => {
      const ks_value = sToA(entry.ks)[biomeNum]; // get first array
      acc[ks_value] = (acc[ks_value] || 0) + 1;
      return acc;
    }, {});
  const biomeData = Object.fromEntries(Object.entries(biomeDataraw).sort((a, b) => b[1] - a[1]));

  return biomeData;
}
function findpopular3(stringRegion, fulldata) {
  const region = fulldata.filter((obj) => obj.loc === stringRegion);

  const mostPopular = Object.entries(
    region.reduce((acc, val) => {
      const keeporder = val.ks;
      acc[keeporder] = (acc[keeporder] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  return mostPopular.slice(0, 5);
}

export default function () {
  const { posts, loader } = useData();
  const [minfear, setMinFear] = useState(1);
  const [maxfear, setMaxFear] = useState(67);

  const availableData = [...v1data, ...(posts || [])].filter((obj) => obj.fea >= +minfear && obj.fea <= +maxfear);

  return (
    <>
      <Background />
      <Sidebar />
      {loader ? (
        <Loading />
      ) : (
        <div className="w-full max-w-[1400px] mx-auto font-[Ale] text-[13px]">
          <div className="flex gap-1 font-[Ale] px-2 justify-center my-4">
            <div>
              <div>Min Fear</div>
              <input
                type="number"
                placeholder="Min Fear"
                className="input input-sm w-[80px]"
                onChange={(e) => setMinFear(e.target.value)}
                value={minfear}
                max={67}
                min={1}
              />
            </div>
            <div>
              <div>Max Fear</div>
              <input
                type="number"
                placeholder="Max Fear"
                className="input input-sm w-[80px]"
                onChange={(e) => setMaxFear(e.target.value)}
                value={maxfear}
                max={67}
                min={1}
              />
            </div>
          </div>
          <div className="my-4 grid grid-cols-1 lg:grid-cols-2 gap-y-6 text-[12px] place-items-center text-center">
            <div className="px-2">
              <div className="px-2 text-[18px]">Most Popular Surface Orders</div>
              {findpopular3(`Surface`, availableData).map((obj, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="text-[14px]">{index + 1}</div>
                  <div className="flex gap-2 mb-1">
                    {sToA(obj[0]).map((ite, index) => (
                      <div className="flex items-center gap-1 bg-[#28282b] rounded px-2 p-1" key={index}>
                        <img src={`/buildgui/${ite}.png`} alt="Keepsakes" className="size-6" />
                        <div className="line-clamp-1">{ite}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-2">
              <div className="px-2 text-[18px]">Most Popular UW Orders</div>
              {findpopular3(`Underworld`, availableData).map((obj, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="text-[14px]">{index + 1}</div>
                  <div className="flex gap-2 mb-1">
                    {sToA(obj[0]).map((ite, index) => (
                      <div className="flex items-center gap-1 bg-[#28282b] rounded px-2 p-1" key={index}>
                        <img src={`/buildgui/${ite}.png`} alt="Keepsakes" className="size-6" />
                        <div className="line-clamp-1">{ite}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 px-2 my-5">
            {biomeS.map((ite, index) => (
              <div className="bg-gradient-to-b from-[yellow]/30 via-black to-transparent rounded-none my-4" key={index}>
                <div
                  className="text-[20px] font-[Cinzel] text-center bg-black rounded-none py-2 mb-1"
                  style={{
                    backgroundImage: `
      url('/Misc/fl2.webp'),
      url('/Misc/fr2.webp'),
      url('/Misc/fm2.webp')
    `,
                    backgroundPosition: "left center, right center, center center",
                    backgroundRepeat: "no-repeat, no-repeat, repeat",
                    backgroundSize: "contain, contain, contain",
                  }}
                >
                  {ite}
                </div>
                <div>
                  {Object.entries(findBiomeKS(index, availableData, "Surface"))
                    .slice(0, 12)
                    .map(([ke, va]) => {
                      const totalSelection = Object.entries(findBiomeKS(index, availableData, "Surface")).reduce(
                        (a, b) => a + b[1],
                        0
                      );
                      return (
                        <div className="flex items-center gap-2 mb-1 px-2">
                          <img src={`/buildgui/${ke}.png`} alt="Keepsakes" className="size-8 md:size-6 lg:size-5" />
                          <div className="flex justify-between w-full">
                            <div>{ke}</div>
                            <div>{((va / totalSelection) * 100).toFixed(2)}%</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
            {biomeU.map((ite, index) => (
              <div
                className="bg-gradient-to-b from-[#00ffaa]/30 via-black to-transparent rounded-none my-4"
                key={index}
              >
                <div
                  className="text-[20px] font-[Cinzel] text-center bg-black rounded-none py-2 mb-1"
                  style={{
                    backgroundImage: `
      url('/Misc/fl3.webp'),
      url('/Misc/fr3.webp'),
      url('/Misc/fm3.webp')
    `,
                    backgroundPosition: "left center, right center, center center",
                    backgroundRepeat: "no-repeat, no-repeat, repeat",
                    backgroundSize: "contain, contain, contain",
                  }}
                >
                  {ite}
                </div>
                <div>
                  {Object.entries(findBiomeKS(index, availableData, "Underworld"))
                    .slice(0, 12)
                    .map(([ke, va]) => {
                      const totalSelection = Object.entries(findBiomeKS(index, availableData, "Underworld")).reduce(
                        (a, b) => a + b[1],
                        0
                      );
                      return (
                        <div className="flex items-center gap-2 mb-1 px-2">
                          <img src={`/buildgui/${ke}.png`} alt="Keepsakes" className="size-8 md:size-6 lg:size-5" />
                          <div className="flex justify-between w-full">
                            <div>{ke}</div>
                            <div>{((va / totalSelection) * 100).toFixed(2)}%</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
