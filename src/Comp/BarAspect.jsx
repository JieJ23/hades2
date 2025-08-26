import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { h2AspectOrder } from "../Data/Misc";

export default function BarAspect({ data, title }) {
  const feaCountsObj = data.reduce((acc, item) => {
    const asp = item.asp;
    acc[asp] = (acc[asp] || 0) + 1;
    return acc;
  }, {});

  const orderMap = new Map(h2AspectOrder.map((num, index) => [num, index]));

  const feaCountsArray = Object.entries(feaCountsObj)
    .map(([num, count]) => ({
      num,
      count,
    }))
    .sort((a, b) => orderMap.get(a.num) - orderMap.get(b.num));

  return (
    <div className="h-[300px] w-full max-w-[1200px] mx-auto px-2 text-[10px] font-[Ubuntu] mt-6">
      <div className="text-[20px] font-[Ale]">{title} Aspect</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={feaCountsArray}
          margin={{
            top: 5,
            right: 10,
            left: -20,
            bottom: 60,
          }}
        >
          <CartesianGrid stroke="#80808080" strokeDasharray="" vertical={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#000", // dark background
              border: "1px solid #00ffaa",
              borderRadius: "rounded",
              color: "#ffffff", // text color (doesn't always work, use labelStyle too)
            }}
            labelStyle={{ color: "#fff" }} // controls the label text color
          />
          <XAxis dataKey="num" stroke="#ffffff" angle={-45} textAnchor="end" interval={0} dy={5} />
          <YAxis stroke="#ffffff" />
          <Bar dataKey="count" fill="#00ffaa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
