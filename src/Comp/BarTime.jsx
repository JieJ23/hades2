import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function BarTime({ data, title = "Time Summary" }) {
  const feaCountsObj = data.reduce((acc, item) => {
    const Time = item.Time;
    // Extract minute part and convert to number to remove leading zeros
    const minute = parseInt(Time.split(":")[0], 10) + 1;
    acc[minute] = (acc[minute] || 0) + 1;
    return acc;
  }, {});

  const feaCountsArray = Object.entries(feaCountsObj).map(([num, count]) => ({
    num,
    count,
  }));
  return (
    <div className="h-[300px] w-full max-w-[1400px] mx-auto px-2 text-[10px] font-[Ubuntu] mt-6">
      <div className="text-[20px] font-[Ale]">{title}</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={feaCountsArray}
          margin={{
            top: 5,
            right: 10,
            left: -20,
            bottom: 5,
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
          <XAxis dataKey="num" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Bar dataKey="count" fill="#00ffaa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
