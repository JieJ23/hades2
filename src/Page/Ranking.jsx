import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import { p9data } from "../Data/P9Data";
import { findGUIcard } from "../App";
import { parseTimetoms } from "../Data/Misc";

const dataOrder = p9data
  .slice()
  .sort((a, b) => {
    const feaDiff = +b.fea - +a.fea;
    if (feaDiff !== 0) return feaDiff;
    return parseTimetoms(a.tim) - parseTimetoms(b.tim);
  })
  .filter((obj) => obj.fea >= 50);

const seen = new Set();
const uniqueByNam = dataOrder.filter((item) => {
  if (seen.has(item.nam)) return false;
  seen.add(item.nam);
  return true;
});

export default function Ranking() {
  return (
    <main className="relative">
      <Background />
      <Head />
      <div className="max-w-[1200px] font-[PT] text-[14px] mx-auto text-white select-none">
        <SideNav />
        <div className="p-4 pb-0 font-[Cinzel]">Fear 50+, Player's Best Overall</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2 pb-4 pt-0">
          {uniqueByNam.map((obj, index) => (
            <div
              key={index}
              className="min-h-[100px] md:min-h-[150px] rounded p-2 border-1 border-white/20 bg-[#00000090]"
            >
              <div className="font-[Cinzel] text-center text-[12px]">{obj.nam}</div>
              <div className="flex items-center justify-center gap-2 w-full">
                <img
                  src={`/GUI_Card/c${findGUIcard(obj.asp)}.png`}
                  alt="Aspect"
                  className="w-[80px] rounded"
                  draggable={false}
                />
                <div className="text-[12px]">
                  <div>R: #{index + 1}</div>
                  <div>A: {obj.asp}</div>
                  <div>F: {obj.fea}</div>
                  <div>T: {obj.tim}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
