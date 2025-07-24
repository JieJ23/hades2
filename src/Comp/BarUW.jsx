import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { h2AspectOrder } from "../Data/Misc";

export default function BarUW({ data }) {
  const highestArray = [];

  const targetData = data.filter((obj) => obj.loc === `Underworld`);

  for (let i = 0; i < h2AspectOrder.length; i++) {
    let available = 0;
    const aspectArray = targetData.filter((obj) => obj.asp === h2AspectOrder[i]).sort((a, b) => b.fea - a.fea);
    if (aspectArray.length == 0) {
      available = 0;
    } else {
      available = aspectArray.sort((a, b) => b.fea - a.fea)[0].fea;
    }
    highestArray.push({ num: h2AspectOrder[i], count: available });
  }

  return (
    <div className="h-[300px] w-full max-w-[1200px] mx-auto px-2 text-[10px] md:text-[12px] font-[Source] mt-6">
      <div className="text-[15px] font-[Cinzel]">Underworld Fear</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={highestArray}
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
          <YAxis stroke="#ffffff" domain={[0, 67]} />
          <Bar dataKey="count" fill="#f18043" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
