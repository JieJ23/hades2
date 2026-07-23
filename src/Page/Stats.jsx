import PageBlock from "../Block/PageBlock";
import { h2AspectOrder, parseTimetoms, sToA, deCodeArcana } from "../Data/Misc";
import { idarcana } from "../Data/Arcana1";

import { bundleData } from "../Data/DataBundle";
import { p9boons_reverse } from "../Data/P9BoonObj";

import { useData } from "../Hook/DataFetch";
import { useState } from "react";
import Loading from "../Hook/Loading";

import { BarChart, Bar, XAxis, LabelList } from 'recharts';

const types = [`Attack`, `Special`, `Cast`, `Sprint`, `Magick`];
const regions = [`Underworld`, `Surface`]

export default function Stats() {
  const { posts, loader } = useData();
  const [aspect, setAspect] = useState([]);
  const [region, setRegion] = useState([]);

  const fullData = [...bundleData, ...posts].filter((obj) => {
    const currentAspect =
      aspect.length === 0 || aspect.includes(obj.asp);

    const currentRegion =
      region.length === 0 || region.includes(obj.loc);

    return currentAspect && currentRegion;
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

  console.log(hammerStore)
  return (
    <div className="h-full min-h-lvh relative overflow-hidden text-[13px] md:text-[14px] font-[Ale] select-none">
      <PageBlock>
        {/* Table */}
        {loader ? (
          <Loading />
        ) : (
          <div className="w-full py-8">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start flex-wrap gap-2 px-2">
                {regions.map(item => (
                  <div className={`relative size-10 md:size-12 shrink-0 ${region.includes(item) ? `bg-[#00ffaa]` : `bg-[#28282b]`}  rounded`}
                    onClick={() => setRegion(prev => {
                      if (prev.includes(item)) return prev.filter(ite => ite !== item);
                      return [...prev, item]
                    })}>
                    <img
                      src="/BoonBorder/Hammer.png"
                      alt="Border"
                      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                    />
                    <img
                      src={`/DreamDive/${item}.png`}
                      alt="Core Boon"
                      className="absolute inset-0 w-full h-full p-1.5 object-contain"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-start flex-wrap gap-2 px-2">
                {h2AspectOrder.map(item => (
                  <div className={`relative size-10 md:size-12 shrink-0 ${aspect.includes(item) ? `bg-[#00ffaa]` : `bg-[#28282b]`} rounded`}
                    onClick={() => setAspect(prev => {
                      if (prev.includes(item)) return prev.filter(ite => ite !== item);
                      return [...prev, item]
                    })}>
                    <img
                      src="/BoonBorder/Hammer.png"
                      alt="Border"
                      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                    />
                    <img
                      src={`/P9/${item}.png`}
                      alt="Core Boon"
                      className="absolute inset-0 w-full h-full p-1.5 object-contain"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Core */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 font-[Ale] my-6">
              {grouped.map((array, index) => (
                <div className="flex flex-col gap-2 w-full bg-linear-to-t from-black to-[#0e0c12]/80 rounded p-2 border border-white/10">
                  <BarChart
                    className="w-full h-40"
                    responsive
                    data={array[1]}
                  >
                    <Bar dataKey={1} fill="#28282b" radius={[5, 5, 0, 0]} >
                      <LabelList dataKey={1} position="center" fill="#fff" />
                    </Bar>
                  </BarChart>
                  <div className="flex flex-wrap gap-1 text-[12px] md:text-[13px]">
                    {array[1].map((arr) => (
                      <div className="bg-[#28282b] p-1 gap-1 rounded flex items-end">
                        <img src={`/H2Boons/${arr[0]}.png`} alt="Boons" className="size-5" />
                        <div>{arr[0].slice(0, 3)}:</div>
                        <div>{arr[1]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-2 w-full bg-linear-to-t from-black to-[#0e0c12]/80 rounded p-2 border border-white/10">
                <BarChart
                  className="w-full h-40"
                  responsive
                  data={famStore}
                >
                  <Bar dataKey={1} fill="#28282b" radius={[5, 5, 0, 0]} >
                    <LabelList dataKey={1} position="center" fill="#fff" />
                  </Bar>
                </BarChart>
                <div className="flex flex-wrap gap-1 text-[12px] md:text-[13px]">
                  {famStore.map((arr) => (
                    <div className="bg-[#28282b] p-1 px-2 gap-1 rounded flex items-end">
                      <img src={`/H2Boons/${arr[0]}.png`} alt="Boons" className="size-5" />
                      <div>{arr[0]}:</div>
                      <div>{arr[1]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Ham */}
            <div className="flex justify-center md:justify-start flex-wrap gap-2 font-[Ale] my-6">
              {hammerStore.map((array, index) => (
                <div className="bg-linear-to-bl from-[#28282b] to-[#0e0c12] p-1 px-2 flex justify-between items-center border border-white/10 rounded gap-3">
                  <div className="flex gap-1 items-center font-[Ale] text-[11px] md:text-[13px">
                    <img src={`/P9/${p9boons_reverse[array[0]]}.png`} alt="Hammers" className="size-5 md:size-7" />
                    <div>{array[0]}</div>
                  </div>
                  <div>{array[1]}</div>
                </div>
              ))}
            </div>
            {/* KS */}
            <div className="flex gap-2 overflow-x-scroll py-2 my-6">
              {ksStore.map((array, idx) => (
                <div className="bg-linear-to-t from-black/50 to-[#0e0c12] p-2 rounded w-full min-w-60 border border-white/10">
                  <div className="text-center text-[14px] font-[Sr]">Biome #{idx + 1}</div>
                  {array.map((arr, index) => (
                    <div className="flex justify-between font-[Ale] px-4">
                      <div>{arr[0]}</div>
                      <div>{arr[1]}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </PageBlock>
    </div>
  );
}
