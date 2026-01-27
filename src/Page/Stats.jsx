import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { h2AspectOrder, parseTimetoms, sToA } from "../Data/Misc";
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
              className="select select-sm rounded-none focus:outline-none focus:border-transparent text-[13px]"
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
              className="select select-sm rounded-none focus:outline-none focus:border-transparent text-[13px]"
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
          <div className="flex justify-center md:justify-start flex-wrap my-5">
            {h2AspectOrder.map((item) => (
              <img
                src={`/GUI_Card/c${item}.png`}
                alt="3D card"
                className={`w-14 transition-all duration-900 opacity-60 ${aspect === item && `rotate-360 animate-bounce opacity-100`}`}
                onClick={() => setAspect(item)}
              />
            ))}
          </div>
          <div className="overflow-x-scroll my-2">
            <table className="table table-xs table-zebra bg-black/80 border-separate border-spacing-0.5 rounded-none font-[Ubuntu]">
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
                    <td>{idx + 1}</td>

                    {grouped.map(([type, items], colIdx) => {
                      const item = items[idx] ?? ["-", 0]; // fallback if undefined

                      return (
                        <td key={colIdx}>
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
          <div className="flex flex-col md:flex-row gap-2 my-2">
            <div className="w-full overflow-x-scroll">
              <table className="table table-xs table-zebra border-separate border-spacing-0.5 rounded-none font-[Ubuntu] bg-black/80">
                <thead>
                  <tr className="font-[Ale]">
                    <th>Hammer</th>
                    <th>Pick %</th>
                  </tr>
                </thead>
                <tbody>
                  {hammerStore.map((arr, index) => (
                    <tr>
                      <td>
                        <div className="flex gap-1 items-center">
                          <img src={`/P9/${p9boons_reverse[arr[0]]}.png`} alt="Hammers" className="size-7" />
                          <div>{arr[0]}</div>
                        </div>
                      </td>
                      <td>{((arr[1] / fullData.length) * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full overflow-x-scroll">
              <table className="table table-xs table-zebra border-separate border-spacing-0.5 rounded-none font-[Ubuntu] bg-black/80">
                <thead>
                  <tr className="font-[Ale]">
                    <th>Familiar</th>
                    <th>Pick %</th>
                  </tr>
                </thead>
                <tbody>
                  {famStore.map((arr, index) => (
                    <tr>
                      <td className="h-9">
                        <div className="flex gap-1 items-center">
                          {arr[0] !== "undefined" && (
                            <img src={`/P9/${arr[0]}.png`} alt="Familiars" className="size-7" />
                          )}
                          <div>{arr[0] == "undefined" ? `No Familiar` : arr[0]}</div>
                        </div>
                      </td>
                      <td>
                        <div>{((arr[1] / fullData.length) * 100).toFixed(2)}%</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
