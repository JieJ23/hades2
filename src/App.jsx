import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";
import { sToA } from "./Data/Misc";
import { Link } from "react-router-dom";
import { useState } from "react";
import { h2AspectOrder } from "./Data/Misc";
import { p9data } from "./Data/P9Data";

export function getYTid(text) {
  return text.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
}
const highfear = p9data
  .filter((obj) => obj.f >= 51)
  .sort((a, b) => (a.t > b.t ? 1 : -1))
  .sort((a, b) => (a.f > b.f ? -1 : 1));
const rankingPlayer = [...new Set(highfear.map((item) => item.n))];
const rankingAspect = [...new Set(highfear.map((item) => item.a))];

const availableRegion = [`Underworld`, `Surface`];

export default function App() {
  const [region, setRegion] = useState(`All`);
  const [category, setCategory] = useState(`All`);

  const highfear_region = region === `All` ? highfear : highfear.filter((obj) => obj.l === region);

  const availableAspects =
    region === `All`
      ? [...new Set(highfear.map((obj) => obj.a))].sort((a, b) =>
          h2AspectOrder.indexOf(a) > h2AspectOrder.indexOf(b) ? 1 : -1
        )
      : [...new Set(highfear_region.map((obj) => obj.a))].sort((a, b) =>
          h2AspectOrder.indexOf(a) > h2AspectOrder.indexOf(b) ? 1 : -1
        );

  const displayEntries = category === `All` ? highfear_region : highfear_region.filter((obj) => obj.a === category);

  return (
    <main className="h-full min-h-lvh select-none relative">
      <div className="fixed w-full h-full bg-[url('/mbg2.webp')] -z-10 bg-left lg:bg-center bg-cover opacity-20"></div>
      <Head />
      <div className="max-w-[1400px] font-[PT] text-[14px] mx-auto">
        <SideNav />
        {/* <section className="w-full p-2">
          <div className="text-[16px] p-2 py-0 font-[Cinzel] text-center">Highest Fear Ladder - Patch 9</div>
          <div className="text-[12px] px-2 py-1 flex gap-2">
            <select
              value={region}
              className="select w-[150px] border-1 border-[#f05bdc]"
              onChange={(e) => {
                setRegion(e.target.value);
                setCategory(`All`);
              }}
            >
              <option value={`All`}>All</option>
              {availableRegion.map((ite, index) => (
                <option value={ite} key={index}>
                  {ite}
                </option>
              ))}
            </select>
            <select
              value={category}
              className="select w-[150px] border-1 border-[#00ffaa]"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={`All`}>All</option>
              {availableAspects.map((ite, index) => (
                <option value={ite} key={index}>
                  {ite}
                </option>
              ))}
            </select>
          </div>
          <div className="text-[12px] p-1 pt-2 flex gap-2">
            <div>Query:</div>
            <div className="text-[#f05bdc]">Region [ {region} ]</div>
            <div className="text-[#00ffaa]">Aspect [ {category} ]</div>
          </div>
        </section> */}
        <div className="text-center font-[Cinzel] text-[#00ff84] py-4">Patch 9 Update Soon</div>
        <div className="text-center font-[Cinzel] py-12">
          "All my life I've prepared, and I'm nowhere near ready, am I..."
        </div>
      </div>
    </main>
  );
}
