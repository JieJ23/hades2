import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import { p9data } from "../Data/P9Data";
import { sToA } from "../Data/Misc";
import { p9boons_reverse } from "../Data/P9BoonObj";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";
import Footer from "../Comp/Footer";

const lineColor = [`#00ffaa`, `#f18043`, `#00aaff`, `#f23219`, `#f8b2bb`];

const entriesByData = p9data.slice().sort((a, b) => new Date(a.dat) - new Date(b.dat));

function getUniqueValueCounts(data, keys, sToA) {
  const counts = {};

  data.forEach((item) => {
    keys.forEach((key) => {
      const values = sToA(item[key] || "");
      values.forEach((value) => {
        if (value) {
          counts[value] = (counts[value] || 0) + 1;
        }
      });
    });
  });

  return counts;
}

function getCumulativeOccurrences(data, boonNames, keys, sToA) {
  const counts = Array(boonNames.length).fill(0);
  const cumulative = [];

  data.forEach((item, index) => {
    const allBoons = keys.flatMap((key) => sToA(item[key] || ""));

    const point = {
      name: `${data[index].dat.slice(5)}`,
    };

    boonNames.forEach((boon, i) => {
      if (allBoons.includes(boon)) {
        counts[i] += 1;
      }
      point[`Count${i + 1}`] = counts[i];
    });

    cumulative.push(point);
  });

  return cumulative;
}

//

const fullBoonData = getUniqueValueCounts(entriesByData, [`cor`, `ham`, `duo`, `ele`, `mis`, `cha`], sToA);
const sortBoonDataByValue = Object.entries(fullBoonData).sort(([, v1], [, v2]) => v2 - v1);
const sortedFullBoonData = Object.fromEntries(sortBoonDataByValue);

export default function Trend() {
  const [targetboon, setTargetboon] = useState([`AphMagick`, `Sprint`, `DemCast`, `ApoSprint`, `PosCast`]);

  const graphData = getCumulativeOccurrences(
    entriesByData,
    targetboon,
    [`cor`, `ham`, `duo`, `ele`, `mis`, `cha`],
    sToA
  );

  console.log(targetboon);
  return (
    <main className="relative">
      <Background />
      <Head />
      <div className="max-w-[1400px] font-[Source] text-[13px] md:text-[14px] mx-auto text-white select-none">
        <SideNav />
        <div className="h-[500px] mt-4 mb-2 bg-[#000000d0]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={graphData}
              margin={{
                top: 5,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="#80808080" strokeDasharray="" horizontal={false} />
              <XAxis dataKey="name" stroke="#ffffff90" />
              <YAxis stroke="#ffffff90" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#000", // dark background
                  border: "1px solid #fff",
                  borderRadius: "rounded",
                  color: "#ffffff", // text color (doesn't always work, use labelStyle too)
                }}
                labelStyle={{ color: "#fff" }} // controls the label text color
              />
              <Legend />
              <Line type="monotone" dataKey="Count1" stroke="#00ffaa" dot={false} />
              <Line type="monotone" dataKey="Count2" stroke="#f18043" dot={false} />
              <Line type="monotone" dataKey="Count3" stroke="#00aaff" dot={false} />
              <Line type="monotone" dataKey="Count4" stroke="#f23219" dot={false} />
              <Line type="monotone" dataKey="Count5" stroke="#f8b2bb" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-2 my-2 ps-4">
          {targetboon.map((item, index) => (
            <div key={index} className="flex items-center gap-1 font-[Source] text-[13px]">
              <div
                className="bg-[#28282b] p-1 px-2 rounded cursor-pointer border-1 border-black"
                style={{ color: lineColor[index] }}
                onClick={() => {
                  setTargetboon((prev) => prev.filter((boon) => boon !== targetboon[index]));
                }}
              >
                Count {index + 1}
              </div>
              <span style={{ color: lineColor[index] }}>{targetboon[index]}</span>
              <span style={{ color: lineColor[index] }}>{sortedFullBoonData[targetboon[index]]}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-8 px-2">
          {Object.entries(sortedFullBoonData).map((item) => (
            <div
              className={`flex gap-1 border-1 rounded p-2 bg-[#000000d4] hover:border-[#00ffaa] transition-colors ease-in duration-100 ${
                targetboon.includes(item[0]) ? `border-[#00ffaa]` : `border-white/10`
              }`}
            >
              <div
                className="flex gap-1 cursor-pointer text-gray-400"
                onClick={() => {
                  setTargetboon((prev) => {
                    if (prev.length >= 5) return prev;
                    return [...prev, item[0]];
                  });
                }}
              >
                <img src={`/P9/${p9boons_reverse[item[0]]}.png`} alt="Boons" className="size-8" />
                <div className="text-[11px]">
                  <div>{item[0]}</div>
                  <div>Quantity: {item[1]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
