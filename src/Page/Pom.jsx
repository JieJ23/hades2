import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { useState } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { pomData } from "../Data/PomData";

const rarityLevel = [`Common`, `Rare`, `Epic`, `Heroic`];
const olympians = [`Zeus`, `Hera`, `Poseidon`, `Demeter`, `Hestia`, `Hephaestus`, `Apollo`, `Aphrodite`, `Ares`];

export default function Pom() {
  const [pom, setPom] = useState(0);

  const targetBoon = pomData[pom];

  const rarity = targetBoon.RarityLevels.split("/");
  const pomLvl = targetBoon.AbsoluteStackValues.split("/");

  // Testing Pom Data Calculation
  const dataPom = [];
  for (let c = 0; c < 50; c++) {
    const holder = {};

    for (let r = 0; r < rarity.length; r++) {
      const baseValue = +targetBoon.BaseValue * +targetBoon.Damage * rarity[r];

      if (c === 0) {
        // First iteration, no absolute stack applied
        holder[rarityLevel[r]] = Math.floor(baseValue);
      } else {
        // Determine cumulative absolute stack
        let absStack = 0;

        if (c <= pomLvl.length) {
          // Sum all previous stacks up to c
          for (let i = 0; i < c; i++) {
            absStack += +pomLvl[i];
          }
        } else {
          // Sum all stacks, then repeat last one for remaining c
          absStack = pomLvl.reduce((sum, val) => sum + +val, 0);
          absStack += +pomLvl[pomLvl.length - 1] * (c - pomLvl.length);
        }

        const value = Math.floor(baseValue * (1 + absStack));
        holder[rarityLevel[r]] = value;
      }
    }

    dataPom.push(holder);
  }

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1200px] font-[Ale] text-[14px] mx-auto px-1">
        <SideNav />

        <div className="w-full h-[500px] my-6 bg-black pt-4">
          <ResponsiveContainer width="100%">
            <LineChart
              data={dataPom}
              margin={{
                top: 0,
                right: 25,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="#ffffff50" strokeDasharray="3 2" />
              <Tooltip />
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="Common" stroke="#808080" />
              <Line type="monotone" dataKey="Rare" stroke="#0000FF" />
              <Line type="monotone" dataKey="Epic" stroke="#800080" />
              <Line type="monotone" dataKey="Heroic" stroke="#FF0000" />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-1 my-4 px-2 ">
          {olympians.map((ite, index) => (
            <div className={`px-2 py-1 rounded-b-lg text-black ${index == 0 ? `bg-[#00ffaa]` : `bg-white`}`}>{ite}</div>
          ))}
        </div>
        <div className="my-4 px-1 flex flex-wrap gap-2">
          {pomData.map((obj, index) => (
            <div
              className={`flex items-center gap-1 text-black rounded px-2 py-1 ${
                index == 0 ? `bg-[#00ffaa]` : `bg-white`
              }`}
            >
              <img src={`/buildgui/${obj.IdName}.png`} alt="Boon" className="size-8" />
              <div className="text-[12px]">{obj.IdName}</div>
            </div>
          ))}
        </div>
        <div>*Estimate Damage/Rarity/Pom Lvl</div>
        <div className="bg-black p-2 rounded">
          <div className="text-center">
            {targetBoon.IdName} | {targetBoon.Id}
          </div>
          <div className="grid grid-cols-5 my-4">
            <div className="w-full text-center"></div>
            <div className="w-full text-center">Common</div>
            <div className="w-full text-center">Rare</div>
            <div className="w-full text-center">Epic</div>
            <div className="w-full text-center">Heroic</div>
          </div>
          <div>
            {dataPom.map((obj, index) => (
              <div className="grid grid-cols-5 mb-1 hover:bg-[#28282b]">
                <div className="text-center">Lvl. {index}</div>
                <div className="text-center">{obj.Common}</div>
                <div className="text-center">{obj.Rare}</div>
                <div className="text-center">{obj.Epic}</div>
                <div className="text-center">{obj.Heroic}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
