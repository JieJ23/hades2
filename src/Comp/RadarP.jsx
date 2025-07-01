import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export default function RadarP({ target, targetHistory }) {
  const dataStore = [];
  const allavailableAspect = [...new Set(targetHistory.map((obj) => obj.asp))];

  for (let i = 0; i < allavailableAspect.length; i++) {
    const aspectData = targetHistory.filter((obj) => obj.asp == allavailableAspect[i]).sort((a, b) => b.fea - a.fea)[0];
    dataStore.push({
      aspect: allavailableAspect[i],
      A: aspectData.fea,
      fullMark: 67,
    });
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="85%" data={dataStore}>
        <PolarGrid />
        <PolarAngleAxis dataKey="aspect" />
        <PolarRadiusAxis domain={[0, 67]} />
        <Radar name={target} dataKey="A" stroke="#00ffaa" fill="#00ffaa" fillOpacity={0.8} dot={true} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
