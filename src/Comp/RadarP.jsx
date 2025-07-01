import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { weaponAxe, weaponBlades, weaponCoat, weaponFlames, weaponSkull, weaponStaff } from "../Data/Misc";

export default function RadarP({ target, targetHistory }) {
  // const allStaff = targetHistory.filter((obj) => weaponStaff.includes(obj.asp));
  // const allBlades = targetHistory.filter((obj) => weaponBlades.includes(obj.asp));
  // const allAxe = targetHistory.filter((obj) => weaponAxe.includes(obj.asp));
  // const allFlames = targetHistory.filter((obj) => weaponFlames.includes(obj.asp));
  // const allSkull = targetHistory.filter((obj) => weaponSkull.includes(obj.asp));
  // const allCoat = targetHistory.filter((obj) => weaponCoat.includes(obj.asp));

  // const highestStaff = [...new Set(allStaff.map((obj) => +obj.fea))].sort()[0];
  // const highestBlades = [...new Set(allBlades.map((obj) => +obj.fea))].sort()[0];
  // const highestAxe = [...new Set(allAxe.map((obj) => +obj.fea))].sort()[0];
  // const highestFlames = [...new Set(allFlames.map((obj) => +obj.fea))].sort()[0];
  // const highestSkull = [...new Set(allSkull.map((obj) => +obj.fea))].sort()[0];
  // const highestCoat = [...new Set(allCoat.map((obj) => +obj.fea))].sort()[0];

  //

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
  // const data = [
  //   {
  //     subject: "Staff",
  //     A: highestStaff || 0,
  //     fullMark: 67,
  //   },
  //   {
  //     subject: "Blades",
  //     A: highestBlades || 0,
  //     fullMark: 67,
  //   },
  //   {
  //     subject: "Axe",
  //     A: highestAxe || 0,
  //     fullMark: 67,
  //   },
  //   {
  //     subject: "Flames",
  //     A: highestFlames || 0,
  //     fullMark: 67,
  //   },
  //   {
  //     subject: "Skull",
  //     A: highestSkull || 0,
  //     fullMark: 67,
  //   },
  //   {
  //     subject: "Coat",
  //     A: highestCoat || 0,
  //     fullMark: 67,
  //   },
  // ];

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
