import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { p9data } from "../Data/P9Data";
import { timeToDecimal } from "../Data/Misc";

const graphData = p9data.map((obj) => ({
  x: obj.fea,
  y: timeToDecimal(obj.tim.slice(0, 4)),
  tim: obj.tim,
  nam: obj.nam,
  asp: obj.asp,
}));

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null; // Hide tooltip if not active or no data
  }
  // Example: show label and data nicely formatted
  return (
    <div className="font-[PT]" style={{ backgroundColor: "#131111", border: "1px solid #ccc", padding: 10 }}>
      <div>N: {payload[0].payload.nam}</div>
      <div>A: {payload[0].payload.asp}</div>
      <div>F: {payload[0].payload.x}</div>
      <div>T: {payload[0].payload.tim}</div>
      {/* Add more content here if needed */}
    </div>
  );
};
console.log(graphData);

export default function ScatterGP() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 10,
        }}
      >
        <CartesianGrid stroke="#131111" strokeDasharray="0" /> {/* Dark, solid grid lines */}
        <Tooltip content={<CustomTooltip />} />
        <XAxis type="number" dataKey="y" name="Min" unit="M" domain={[(dataMin) => dataMin, "auto"]} />
        <YAxis type="number" dataKey="x" name="Fear" unit="F" domain={[(dataMin) => dataMin - 2, "auto"]} />
        <Scatter name="A school" data={graphData} fill="#00ffaa" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
