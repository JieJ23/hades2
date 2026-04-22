import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { h2AspectOrder, parseTimetoms, sToA, deCodeArcana } from "../Data/Misc";
import { idarcana } from "../Data/Arcana1";

import { bundleData } from "../Data/DataBundle";
import { p9boons_reverse } from "../Data/P9BoonObj";

import { useData } from "../Hook/DataFetch";
import { useState } from "react";
import Loading from "../Hook/Loading";

const types = [`Attack`, `Special`, `Cast`, `Sprint`, `Magick`];

export default function Stats() {
  const { posts, loader } = useData();
  const [aspect, setAspect] = useState("Melinoe Staff");
  const [region, setRegion] = useState("All");

  const fullData = [...bundleData, ...posts]
    .filter((obj) => {
      const currentAspect = obj.asp == aspect;
      const currentRegion = region === "All" || obj.loc === region;

      return currentAspect && currentRegion;
    })
    .sort((a, b) => {
      const feaDiff = +b.fea - +a.fea;
      if (feaDiff !== 0) return feaDiff;
      return parseTimetoms(a.tim) - parseTimetoms(b.tim);
    });

  const boonStore = Object.entries(
    fullData.reduce((acc, arr) => {
      if (arr.cor) {
        const arrayItem = arr.cor.split(",");
        arrayItem.forEach((item) => {
          acc[item] = (acc[item] || 0) + 1;
        });
      }
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const grouped = Object.entries(
    boonStore.reduce((acc, [name, count]) => {
      const type = types.find((t) => name.includes(t));
      if (!type) return acc;

      (acc[type] ??= []).push([name, count]);
      return acc;
    }, {}),
  ).sort(([a], [b]) => types.indexOf(a) - types.indexOf(b));

  const hammerStore = Object.entries(
    fullData.reduce((acc, arr) => {
      if (arr.ham) {
        const arrayItem = arr.ham.split(",");
        arrayItem.forEach((item) => {
          acc[item] = (acc[item] || 0) + 1;
        });
      }
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const famStore = Object.entries(
    fullData.reduce((acc, arr) => {
      const familiar = arr.fam;

      acc[familiar] = (acc[familiar] || 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  function findBiomeKeepData(biomeNum) {
    const keepStore = Object.entries(
      fullData.reduce((acc, arr) => {
        if (arr.ks) {
          const arrayItem = arr.ks.split(",");
          const biome = arrayItem[biomeNum];
          acc[biome] = (acc[biome] || 0) + 1;
        }
        return acc;
      }, {}),
    ).sort((a, b) => b[1] - a[1]);
    return keepStore;
  }

  const ksStore = [findBiomeKeepData(0), findBiomeKeepData(1), findBiomeKeepData(2), findBiomeKeepData(3)];
  // Store Arcana
  const runsAV = fullData.filter((obj) => obj.arcana);

  const store_arcana = [...new Set(runsAV.map((obj) => deCodeArcana(obj.arcana)))].reduce((acc, entry) => {
    entry?.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});

  return (
    <div className="h-full min-h-lvh relative overflow-hidden text-[13px] md:text-[14px] font-[Ale] select-none">
      <Background />

      <SideNav />
      {/* Table */}
      {loader ? (
        <Loading />
      ) : (
        <div className="w-full max-w-350 mx-auto">
          <div className="px-2">Total Entries: {fullData.length}</div>
          <div className="flex gap-2 px-2">
            <select
              className="select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
              value={aspect}
              onChange={(e) => {
                setAspect(e.target.value);
              }}
            >
              {h2AspectOrder.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <select
              className="select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
              }}
            >
              <option value={"All"}>All Regions</option>
              <option value={"Underworld"}>Underworld</option>
              <option value={"Surface"}>Surface</option>
            </select>
          </div>
          <div className="overflow-x-scroll my-2">
            <table className="table table-xs bg-black/80 border-separate border-spacing-0.5 rounded-none font-[Ubuntu]">
              <thead>
                <tr className="font-[Ale] text-center">
                  <th></th>
                  <th className="min-w-50">Attack</th>
                  <th className="min-w-50">Special</th>
                  <th className="min-w-50">Cast</th>
                  <th className="min-w-50">Sprint</th>
                  <th className="min-w-50">Magick</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, idx) => (
                  <tr key={idx}>
                    <td className="border-0">{idx + 1}</td>

                    {grouped.map(([type, items], colIdx) => {
                      const item = items[idx] ?? ["-", 0]; // fallback if undefined

                      return (
                        <td className="border-0" key={colIdx}>
                          <div className="flex justify-between items-center px-1">
                            <div className="flex gap-2 items-center">
                              {item[0] !== "-" && (
                                <img src={`/P9/${item[0]}.png`} alt="Core Boons" className="size-6" />
                              )}
                              <div>{item[0]}</div>
                            </div>
                            <div>{((item[1] / fullData.length) * 100).toFixed(2)}%</div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-scroll my-2">
            <table className="table table-xs bg-black/80 border-separate border-spacing-0.5 rounded-none font-[Ubuntu]">
              <thead>
                <tr className="font-[Ale] text-center">
                  <th></th>
                  <th className="min-w-60">Biome 1</th>
                  <th className="min-w-60">Biome 2</th>
                  <th className="min-w-60">Biome 3</th>
                  <th className="min-w-60">Biome 4</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, idx) => (
                  <tr key={idx}>
                    <td className="border-0">{idx + 1}</td>

                    {ksStore.map((items, colIdx) => {
                      const item = items[idx] ?? ["-", 0]; // fallback if undefined

                      return (
                        <td className="border-0" key={colIdx}>
                          <div className="flex justify-between items-center px-1">
                            <div className="flex gap-2 items-center">
                              {item[0] !== "-" && (
                                <img src={`/buildgui/${item[0]}.png`} alt="Core Boons" className="size-6" />
                              )}
                              <div>{item[0]}</div>
                            </div>
                            <div>{((item[1] / fullData.length) * 100).toFixed(2)}%</div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row gap-2 my-2">
            <div className="w-full overflow-x-scroll">
              <table className="table table-xs border-separate border-spacing-0.5 rounded-none font-[Ubuntu] bg-black/80">
                <thead>
                  <tr className="font-[Ale]">
                    <th className="w-80">Hammer</th>
                    <th className="text-end">Pick %</th>
                  </tr>
                </thead>
                <tbody>
                  {hammerStore.map((arr, index) => (
                    <tr>
                      <td className="border-0">
                        <div className="flex gap-1 items-center">
                          <img src={`/P9/${p9boons_reverse[arr[0]]}.png`} alt="Hammers" className="size-7" />
                          <div>{arr[0]}</div>
                        </div>
                      </td>
                      <td className="border-0 text-end">{((arr[1] / fullData.length) * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full overflow-x-scroll">
              <table className="table table-xs border-separate border-spacing-0.5 rounded-none font-[Ubuntu] bg-black/80">
                <thead>
                  <tr className="font-[Ale]">
                    <th className="w-80">Familiar</th>
                    <th className="text-end">Pick %</th>
                  </tr>
                </thead>
                <tbody>
                  {famStore.map((arr, index) => (
                    <tr>
                      <td className="border-0 h-9">
                        <div className="flex gap-1 items-center">
                          {arr[0] !== "undefined" && (
                            <img src={`/P9/${arr[0]}.png`} alt="Familiars" className="size-7" />
                          )}
                          <div>{arr[0] == "undefined" ? `No Familiar` : arr[0]}</div>
                        </div>
                      </td>
                      <td className="border-0 text-end">
                        <div>{((arr[1] / fullData.length) * 100).toFixed(2)}%</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Testing Section */}
          <div className="text-center">From {runsAV.length} Available Arcana</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 px-2 my-4">
            {Object.entries(store_arcana)
              .sort((a, b) => +a[0].slice(1) - +b[0].slice(1))
              .map(([key, val], index) => (
                <div
                  className="flex items-center gap-2 bg-gradient-to-r from-black to-black/75 rounded"
                  key={index}
                  style={{
                    borderStyle: "solid", // Required
                    borderWidth: "6px",
                    borderImage: "url('/Misc/frame.webp') 40 stretch",
                  }}
                >
                  <img src={`/Arcane/${key}.png`} alt="Arcana Cards" className="w-[60px] md:w-[80px] h-auto" />
                  <div>
                    <div className="text-[15px]">{idarcana[key]}</div>
                    <div>{((+val / +runsAV.length) * 100).toFixed(2)}%</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
