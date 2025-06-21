import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { h2AspectOrder, sToA } from "../Data/Misc";
import { p9data } from "../Data/P9Data";
import P9BoonData from "../Comp/P9BoonData";
import { p9athena, p9chaos, p9selene } from "../Data/P9Boons";

const getHighestOfEachAspect = (order, data) => {
  return order.map((aspect) => {
    const found = data.find((item) => item.asp === aspect);
    return found
      ? { aspect: aspect, status: found.nam, fear: found.fea, time: found.tim }
      : { aspect: aspect, status: `-` };
  });
};

const highfear = p9data.sort((a, b) => (a.tim > b.tim ? 1 : -1)).sort((a, b) => (a.fea > b.fea ? -1 : 1));

const underworld_runs = highfear.filter((obj) => obj.loc === "Underworld");
const surface_runs = highfear.filter((obj) => obj.loc === "Surface");

const overall_aspect_underworld = getHighestOfEachAspect(h2AspectOrder, underworld_runs);
const overall_aspect_surface = getHighestOfEachAspect(h2AspectOrder, surface_runs);

const seleneRuns = p9data.filter((obj) => obj.sel === `t`).length;
// const chaosRuns = p9data.filter((obj) => obj.cha !== "").length;
const chaosRunswithselene = p9data
  .filter((obj) => obj.cha !== "")
  .filter((obj) => sToA(obj.cha).some((chaItem) => Object.values(p9selene).includes(chaItem))).length;
// const chaosRunsnoselene = p9data
//   .filter((obj) => obj.cha !== "")
//   .filter((obj) => sToA(obj.cha).some((chaItem) => Object.values(p9chaos).includes(chaItem))).length;
const AthenaRuns = p9data.filter((obj) =>
  sToA(obj.mis).some((athItem) => Object.values(p9athena).includes(athItem))
).length;

export default function Stats() {
  return (
    <main className="h-full min-h-lvh select-none relative">
      <div className="fixed w-full h-full bg-[url('/mbg2.webp')] -z-10 bg-left lg:bg-center bg-cover opacity-20"></div>
      <Head />
      <SideNav />
      <div className="max-w-[1200px] font-[PT] text-[12px] mx-auto mb-2">
        <section className="w-full">
          <div className="text-[16px] p-2 py-0 font-[Cinzel]">Ladder Summary</div>
          <div className="bg-black/80 border-1 border-white/20 rounded overflow-hidden pt-2">
            <div className="grid grid-cols-3 font-[Cinzel] px-2 pb-2">
              <div>Aspects</div>
              <div>Underworld</div>
              <div>Surface</div>
            </div>
            {h2AspectOrder.map((item, index) => (
              <div
                className={`grid grid-cols-3 p-1 items-center px-2 ${
                  index % 2 === 0 ? `bg-[#1f1f265a]` : `bg-black/80`
                }`}
              >
                <div className="flex gap-1 items-center">
                  <img
                    src={`/P9/${overall_aspect_surface[index].aspect}.png`}
                    alt="Aspect"
                    className="size-9 border-1 border-black/20 rounded-lg"
                  />
                  <div>
                    {overall_aspect_surface[index].aspect.includes(`Melinoe`)
                      ? overall_aspect_surface[index].aspect.replace(`Melinoe`, ``)
                      : overall_aspect_surface[index].aspect}
                  </div>
                </div>
                <div>
                  <div>{overall_aspect_underworld[index].status}</div>
                  <div className="flex gap-2">
                    <div className="text-[#ff9100]">{overall_aspect_underworld[index].fear}</div>
                    <div className="text-[#00ffaa]">{overall_aspect_underworld[index].time}</div>
                  </div>
                </div>
                <div>
                  <div>{overall_aspect_surface[index].status}</div>
                  <div className="flex gap-2">
                    <div className="text-[#ff9100]">{overall_aspect_surface[index].fear}</div>
                    <div className="text-[#00ffaa]">{overall_aspect_surface[index].time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="max-w-[1200px] text-[12px] sm:text-[16px] mx-auto my-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-white font-[Cinzel] px-4">
        <div className="rounded border-1 border-black bg-black/80 w-full h-[200px] sm:h-[300px] flex flex-col items-center py-2 relative justify-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/Misc/Selene.webp')] -z-10 bg-cover bg-center bg-no-repeat" />
          <div className="whitespace-pre-line text-center">{`Nights Blessed 
          by Selene`}</div>
          <div className="text-[20px] sm:text-[30px] font-[serif] text-[#0fe6e9]">
            {Math.round(100 * (seleneRuns / p9data.length))}%
          </div>
        </div>
        <div className="rounded border-1 border-black bg-black/80 w-full h-[200px] sm:h-[300px] flex flex-col items-center py-2 relative justify-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/Misc/Chaos.webp')] -z-10 bg-cover bg-center bg-no-repeat" />
          <div className="whitespace-pre-line text-center">{`Nights Cursed 
          by Chaos`}</div>
          <div className="text-[20px] sm:text-[30px] font-[serif] text-[#f10bf1]">
            {Math.round(100 * (chaosRunswithselene / p9data.length))}%
          </div>
        </div>
        <div className="rounded border-1 border-black bg-black/80 w-full h-[200px] sm:h-[300px] flex flex-col items-center py-2 relative justify-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/Misc/Athena.webp')] -z-10 bg-cover bg-center bg-no-repeat" />

          <div className="whitespace-pre-line text-center">{`Nights Aided 
          by Athena`}</div>
          <div className="text-[20px] sm:text-[30px] font-[serif] text-[#dae811]">
            {Math.round(100 * (AthenaRuns / p9data.length))}%
          </div>
        </div>
        <div className="rounded border-1 border-black bg-black/80 w-full h-[200px] sm:h-[300px] flex flex-col items-center py-2 relative justify-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/Misc/Chronos.webp')] -z-10 bg-cover bg-top bg-no-repeat" />

          <div className="whitespace-pre-line text-center">{`Nights Surrendered 
          to Chronos`}</div>
          <div className="text-[20px] sm:text-[30px] font-[monospace] text-[#f40909]">0</div>
        </div>
      </div>
      <P9BoonData />
    </main>
  );
}
