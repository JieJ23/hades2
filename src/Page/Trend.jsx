import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import { p9data } from "../Data/P9Data";
import { sToA } from "../Data/Misc";
import { p9boons_reverse } from "../Data/P9BoonObj";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";

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
  const [targetboon, setTargetboon] = useState([`AphMagick`, `Sprint`]);
  const [toggle, setToggle] = useState(false);
  const graphData = getCumulativeOccurrences(
    entriesByData,
    targetboon,
    [`cor`, `ham`, `duo`, `ele`, `mis`, `cha`],
    sToA
  );

  return (
    <main className="relative">
      <Background />
      <Head />
      <div className="max-w-[1400px] font-[Source] text-[13px] md:text-[14px] mx-auto text-white select-none">
        <SideNav />
        <div className="h-[500px] mt-8 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={graphData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="#80808080" strokeDasharray="" />
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
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="px-4 flex gap-1 font-[Source] text-[13px] mt-1">
          <div>Cumulative Line Graph of: </div>
          <div className="text-[#00ffaa]">"{targetboon[0]}"</div>
          <div className="text-[#00ffaa]">
            {sortedFullBoonData[targetboon[0]]} / {p9data.length}
          </div>
        </div>
        <div className="px-4 flex gap-1 font-[Source] text-[13px] mb-1">
          <div>Cumulative Line Graph of: </div>
          <div className="text-[#f18043]">"{targetboon[1]}"</div>
          <div className="text-[#f18043]">
            {sortedFullBoonData[targetboon[1]]} / {p9data.length}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8 px-2">
          {Object.entries(sortedFullBoonData).map((item) => (
            <div className="flex gap-1 border-1 border-white/20 rounded p-2 bg-[#000000d4] hover:border-[#00ffaa] transition-colors ease-in duration-100">
              <div
                className="flex gap-1 cursor-pointer text-gray-400"
                onClick={() => {
                  setToggle((prevToggle) => {
                    const nextToggle = !prevToggle;

                    setTargetboon((prev) => {
                      const updated = [...prev];
                      if (!prevToggle) {
                        updated[0] = item[0]; // or item[0] depending on your source
                      } else {
                        updated[1] = item[0];
                      }
                      return updated;
                    });

                    return nextToggle;
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
    </main>
  );
}
