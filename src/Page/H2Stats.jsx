import { replace } from "react-router-dom";
import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { h2Data } from "../Data/H2Data";
import { useState } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const replacePH = (string) => {
  const replacements = {
    Aph: "Aphrodite ",
    Apo: "Apollo ",
    Dem: "Demeter ",
    Zeu: `Zeus `,
    Pos: `Poseidon `,
    Are: `Ares `,
    Her: `Hera `,
    Hes: `Hestia `,
    Hep: `Hephaestus `,
    // Add more as needed
  };

  for (const [key, value] of Object.entries(replacements)) {
    if (string.includes(key)) {
      return value; // Replace the whole string with the value if key is found
    }
  }

  return string; // Return original string if no match found
};

export default function H2Stats() {
  const [ap, setAp] = useState(`Artemis`);

  const handleChangeAP = (a) => {
    setAp(a);
  };

  const staff = [`Melinoe Staff`, `Circe`, `Momus`];
  const blades = [`Melinoe Blades`, `Artemis`, `Pan`];
  const axe = [`Melinoe Axe`, `Charon`, `Thanatos`];
  const flames = [`Melinoe Flames`, `Moros`, `Eos`];
  const skull = [`Melinoe Skull`, `Medea`, `Persephone`];
  const coat = [`Melinoe Coat`, `Selene`, `Nyx`];

  const allstaff = h2Data.filter((obj) => staff.includes(obj.a));
  const allblades = h2Data.filter((obj) => blades.includes(obj.a));
  const allaxe = h2Data.filter((obj) => axe.includes(obj.a));
  const allflames = h2Data.filter((obj) => flames.includes(obj.a));
  const allskull = h2Data.filter((obj) => skull.includes(obj.a));
  const allcoat = h2Data.filter((obj) => coat.includes(obj.a));

  //
  const data2 = [
    {
      name: "Staff",
      Underworld: allstaff.filter((obj) => obj.l === `Underworld`).length,
      Surface: allstaff.filter((obj) => obj.l === `Surface`).length,
    },
    {
      name: "Blades",
      Underworld: allblades.filter((obj) => obj.l === `Underworld`).length,
      Surface: allblades.filter((obj) => obj.l === `Surface`).length,
    },
    {
      name: "Axe",
      Underworld: allaxe.filter((obj) => obj.l === `Underworld`).length,
      Surface: allaxe.filter((obj) => obj.l === `Surface`).length,
    },
    {
      name: "Flames",
      Underworld: allflames.filter((obj) => obj.l === `Underworld`).length,
      Surface: allflames.filter((obj) => obj.l === `Surface`).length,
    },
    {
      name: "Skull",
      Underworld: allskull.filter((obj) => obj.l === `Underworld`).length,
      Surface: allskull.filter((obj) => obj.l === `Surface`).length,
    },
    {
      name: "Coat",
      Underworld: allcoat.filter((obj) => obj.l === `Underworld`).length,
      Surface: allcoat.filter((obj) => obj.l === `Surface`).length,
    },
  ];
  //
  const data = [
    {
      name: "Staff",
      A1: allstaff.filter((obj) => obj.a === `Melinoe Staff`).length,
      A2: allstaff.filter((obj) => obj.a === `Circe`).length,
      A3: allstaff.filter((obj) => obj.a === `Momus`).length,
    },
    {
      name: "Blades",
      A1: allblades.filter((obj) => obj.a === `Melinoe Blades`).length,
      A2: allblades.filter((obj) => obj.a === `Artemis`).length,
      A3: allblades.filter((obj) => obj.a === `Pan`).length,
    },
    {
      name: "Axe",
      A1: allaxe.filter((obj) => obj.a === `Melinoe Axe`).length,
      A2: allaxe.filter((obj) => obj.a === `Charon`).length,
      A3: allaxe.filter((obj) => obj.a === `Thanatos`).length,
    },
    {
      name: "Flames",
      A1: allflames.filter((obj) => obj.a === `Melinoe Flames`).length,
      A2: allflames.filter((obj) => obj.a === `Moros`).length,
      A3: allflames.filter((obj) => obj.a === `Eos`).length,
    },
    {
      name: "Skull",
      A1: allskull.filter((obj) => obj.a === `Melinoe Skull`).length,
      A2: allskull.filter((obj) => obj.a === `Medea`).length,
      A3: allskull.filter((obj) => obj.a === `Persephone`).length,
    },
    {
      name: "Coat",
      A1: allcoat.filter((obj) => obj.a === `Melinoe Coat`).length,
      A2: allcoat.filter((obj) => obj.a === `Selene`).length,
      A3: allcoat.filter((obj) => obj.a === `Nyx`).length,
    },
  ];

  //

  const allAspects = [...new Set(h2Data.map((obj) => obj.a))].sort();
  const allFam = [...new Set(h2Data.map((obj) => obj.fam))].sort();

  const allBoonDetails = {};
  const allFamDetails = [];

  const currentAspect = h2Data.filter((obj) => obj.a === ap);

  currentAspect.forEach((item) => {
    const boons = item.boon.split(",");
    boons.forEach((boon) => {
      allBoonDetails[boon] = (allBoonDetails[boon] || 0) + 1;
    });
  });

  for (let i = 0; i < allFam.length; i++) {
    const targetFam = currentAspect.filter((obj) => obj.fam === allFam[i]);
    allFamDetails.push({ fam: allFam[i], len: targetFam.length });
  }
  console.log(allFamDetails);
  //
  const currentAttack = Object.fromEntries(Object.entries(allBoonDetails).filter(([key]) => key.includes("Attack")));

  const currentSpecial = Object.fromEntries(Object.entries(allBoonDetails).filter(([key]) => key.includes("Special")));

  const currentCast = Object.fromEntries(Object.entries(allBoonDetails).filter(([key]) => key.includes("Cast")));

  const currentSprint = Object.fromEntries(Object.entries(allBoonDetails).filter(([key]) => key.includes("Sprint")));

  const currentMagick = Object.fromEntries(Object.entries(allBoonDetails).filter(([key]) => key.includes("Magick")));

  return (
    <main className="select-none relative">
      <div className="fixed w-full h-full bg-[url('/mbg.png')] -z-10 bg-top"></div>
      <Head />
      <div className="flex flex-col md:flex-row gap-2 max-w-[1400px] mx-auto">
        <SideNav />
        <div className="flex flex-col lg:flex-row w-full my-4">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                className="font-[PT] text-[14px]"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="A1" stackId="a" fill="#8884d8" />
                <Bar dataKey="A2" stackId="a" fill="#82ca9d" />
                <Bar dataKey="A3" stackId="a" fill="#6495ED" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data2}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                className="font-[PT] text-[14px]"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Surface" stackId="a" fill="#8884d8" />
                <Bar dataKey="Underworld" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap gap-1">
          {allAspects.map((ite) => (
            <button
              className={`btn px-2 ${ap === ite ? `btn-success` : `btn-base btn-soft`} font-[PT] text-[12px]`}
              onClick={() => handleChangeAP(ite)}
            >
              <img draggable={false} src={`/H2Boons/${ite}.png`} alt="Aspect" className="w-6 rounded" />
              <div>{ite}</div>
            </button>
          ))}
        </div>
        <div className="my-2 rounded p-2">
          <div className="text-[12px] ps-2 font-[Cinzel] pb-2">Familiar</div>
          <div className="flex flex-wrap justify-start font-[PT] text-[12px] gap-2">
            {allFamDetails.map((obj, index) => (
              <div
                key={index}
                className="flex items-center gap-1 w-[150px] border-1 border-white/20 rounded p-1 bg-base-300 "
              >
                <img
                  draggable={false}
                  src={`/H2Boons/${obj.fam}.png`}
                  alt="Boons"
                  className="w-10 rounded-xl border-1 border-white/20"
                />
                <div>
                  <div>{obj.fam}</div>
                  <div>
                    {obj.len} / {currentAspect.length}
                  </div>
                  <div className="text-success">{(100 * (obj.len / currentAspect.length)).toFixed(2)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="my-2 rounded p-2">
          <div className="text-[12px] ps-2 font-[Cinzel] pb-2">Attack</div>
          <div className="flex flex-wrap justify-start font-[PT] text-[12px] gap-2">
            {Object.entries(currentAttack)
              .sort()
              .map(([prop, value], index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 w-[150px] border-1 border-white/20 rounded p-1 bg-base-300 "
                >
                  <img
                    draggable={false}
                    src={`/H2Boons/${prop}.png`}
                    alt="Boons"
                    className="w-10 rounded-xl border-1 border-white/20"
                  />
                  <div>
                    <div>{replacePH(prop)}</div>
                    <div>
                      {value} / {currentAspect.length}
                    </div>
                    <div className="text-success">{(100 * (value / currentAspect.length)).toFixed(2)}%</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="my-2 rounded p-2">
          <div className="text-[12px] ps-2 font-[Cinzel] pb-2">Special</div>
          <div className="flex flex-wrap justify-start font-[PT] text-[12px] gap-2">
            {Object.entries(currentSpecial)
              .sort()
              .map(([prop, value], index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 w-[150px] border-1 border-white/20 rounded p-1 bg-base-300 "
                >
                  <img
                    draggable={false}
                    src={`/H2Boons/${prop}.png`}
                    alt="Boons"
                    className="w-10 rounded-xl border-1 border-white/20"
                  />
                  <div>
                    <div>{replacePH(prop)}</div>
                    <div>
                      {value} / {currentAspect.length}
                    </div>
                    <div className="text-success">{(100 * (value / currentAspect.length)).toFixed(2)}%</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="my-2 rounded p-2">
          <div className="text-[12px] ps-2 font-[Cinzel] pb-2">Cast</div>
          <div className="flex flex-wrap justify-start font-[PT] text-[12px] gap-2">
            {Object.entries(currentCast)
              .sort()
              .map(([prop, value], index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 w-[150px] border-1 border-white/20 rounded p-1 bg-base-300 "
                >
                  <img
                    draggable={false}
                    src={`/H2Boons/${prop}.png`}
                    alt="Boons"
                    className="w-10 rounded-xl border-1 border-white/20"
                  />
                  <div>
                    <div>{replacePH(prop)}</div>
                    <div>
                      {value} / {currentAspect.length}
                    </div>
                    <div className="text-success">{(100 * (value / currentAspect.length)).toFixed(2)}%</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="my-2 rounded p-2">
          <div className="text-[12px] ps-2 font-[Cinzel] pb-2">Sprint</div>
          <div className="flex flex-wrap justify-start font-[PT] text-[12px] gap-2">
            {Object.entries(currentSprint)
              .sort()
              .map(([prop, value], index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 w-[150px] border-1 border-white/20 rounded p-1 bg-base-300 "
                >
                  <img
                    draggable={false}
                    src={`/H2Boons/${prop}.png`}
                    alt="Boons"
                    className="w-10 rounded-xl border-1 border-white/20"
                  />
                  <div>
                    <div>{replacePH(prop)}</div>
                    <div>
                      {value} / {currentAspect.length}
                    </div>
                    <div className="text-success">{(100 * (value / currentAspect.length)).toFixed(2)}%</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="my-2 rounded p-2">
          <div className="text-[12px] ps-2 font-[Cinzel] pb-2">Magick</div>
          <div className="flex flex-wrap justify-start font-[PT] text-[12px] gap-2">
            {Object.entries(currentMagick)
              .sort()
              .map(([prop, value], index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 w-[150px] border-1 border-white/20 rounded p-1 bg-base-300 "
                >
                  <img
                    draggable={false}
                    src={`/H2Boons/${prop}.png`}
                    alt="Boons"
                    className="w-10 rounded-xl border-1 border-white/20"
                  />
                  <div>
                    <div>{replacePH(prop)}</div>
                    <div>
                      {value} / {currentAspect.length}
                    </div>
                    <div className="text-success">{(100 * (value / currentAspect.length)).toFixed(2)}%</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
