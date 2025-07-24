import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function BarFear({ data }) {
  const feaCountsObj = data.reduce((acc, item) => {
    const fea = item.fea;
    acc[fea] = (acc[fea] || 0) + 1;
    return acc;
  }, {});

  const feaCountsArray = Object.entries(feaCountsObj).map(([num, count]) => ({
    num,
    count,
  }));
  return (
    <div className="h-[300px] w-full max-w-[1200px] mx-auto px-2 text-[12px] font-[Source] mt-6">
      <div className="text-[15px] font-[Cinzel]">Fear Summary</div>
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
