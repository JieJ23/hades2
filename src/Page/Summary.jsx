import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { h2Data } from "../Data/H2Data";
import { h2AspectOrder } from "../Data/Misc";

//

const getHighestOfEachAspect = (order, data) => {
  return order.map((aspect) => {
    const found = data.find((item) => item.a === aspect);
    return found
      ? { aspect: aspect, status: found.n, fear: found.f, time: found.t }
      : { aspect: aspect, status: `n/a` };
  });
};

const highfear = h2Data
  .filter((obj) => obj.f >= 51)
  .sort((a, b) => (a.t > b.t ? 1 : -1))
  .sort((a, b) => (a.f > b.f ? -1 : 1));

const overallRanking = highfear[0];
const overallRanking_Underworld = highfear.filter((obj) => obj.l === "Underworld")[0];
const overallRanking_Surface = highfear.filter((obj) => obj.l === "Surface")[0];

const underworld_runs = highfear.filter((obj) => obj.l === "Underworld");
const surface_runs = highfear.filter((obj) => obj.l === "Surface");

const overall_aspect = getHighestOfEachAspect(h2AspectOrder, highfear);
const overall_aspect_underworld = getHighestOfEachAspect(h2AspectOrder, underworld_runs);
const overall_aspect_surface = getHighestOfEachAspect(h2AspectOrder, surface_runs);

export default function Summary() {
  return (
    <main className="h-full min-h-lvh select-none relative">
      <div className="fixed w-full h-full bg-[url('/mbg.webp')] -z-10 bg-top"></div>
      <Head />
      <div className="flex flex-col md:flex-row gap-1 max-w-[1400px] font-[PT] text-[14px] mx-auto">
        <SideNav />
        <section className="p-2 w-full">
          <div className="font-[Cinzel] text-[16px]">Ladder Summary (Patch 8, 50+ Fear)</div>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="py-4">
              <div className="font-[Cinzel] bg-black border-1 border-[#00ffaa] rounded py-1 px-4">Overall (UW + S)</div>
              <div className="pl-4 pt-2 text-[#e09c1e]">
                {overallRanking.n} {overallRanking.f}F - {overallRanking.t}
              </div>
            </div>

            <div className="py-4">
              <div className="font-[Cinzel] bg-black border-1 border-[#00ffaa] rounded py-1 px-4">
                Overall (Underworld)
              </div>
              <div className="pl-4 pt-2 text-[#e09c1e]">
                {overallRanking_Underworld.n} {overallRanking_Underworld.f}F - {overallRanking_Underworld.t}
              </div>
            </div>

            <div className="py-4">
              <div className="font-[Cinzel] bg-black border-1 border-[#00ffaa] rounded py-1 px-4">
                Overall (Surface)
              </div>
              <div className="pl-4 pt-2 text-[#e09c1e]">
                {overallRanking_Surface.n} {overallRanking_Surface.f}F - {overallRanking_Surface.t}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="py-4">
              <div className="font-[Cinzel] bg-black border-1 border-[#00ffaa] rounded py-1 px-4">
                Overall Aspects (UW + S)
              </div>
              <div className="pl-4 pt-2">
                {overall_aspect.map((obj, idx) => (
                  <div key={idx} className="py-1">
                    <div className="text-[#75edaf] flex items-center gap-1">
                      <img
                        src={`/H2Boons/${obj.aspect}.png`}
                        alt="Aspect"
                        className="size-6 border-1 border-white/20 rounded"
                      />
                      {obj.aspect}
                    </div>
                    <div className={`pl-4 ${obj.status === `n/a` ? `` : `text-[#e09c1e]`}`}>
                      {obj.status === `n/a` ? `-` : `${obj.status} ${obj.fear}F - ${obj.time}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-4">
              <div className="font-[Cinzel] bg-black border-1 border-[#00ffaa] rounded py-1 px-4">
                Overall Aspects (Underworld)
              </div>
              <div className="pl-4 pt-2">
                {overall_aspect_underworld.map((obj, idx) => (
                  <div key={idx} className="py-1">
                    <div className="text-[#75edaf] flex items-center gap-1">
                      <img
                        src={`/H2Boons/${obj.aspect}.png`}
                        alt="Aspect"
                        className="size-6 border-1 border-white/20 rounded"
                      />
                      {obj.aspect}
                    </div>
                    <div className={`pl-4 ${obj.status === `n/a` ? `` : `text-[#e09c1e]`}`}>
                      {obj.status === `n/a` ? `-` : `${obj.status} ${obj.fear}F - ${obj.time}`}{" "}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-4">
              <div className="font-[Cinzel] bg-black border-1 border-[#00ffaa] rounded py-1 px-4">
                Overall Aspects (Surface)
              </div>
              <div className="pl-4 pt-2">
                {overall_aspect_surface.map((obj, idx) => (
                  <div key={idx} className="py-1">
                    <div className="text-[#75edaf] flex items-center gap-1">
                      <img
                        src={`/H2Boons/${obj.aspect}.png`}
                        alt="Aspect"
                        className="size-6 border-1 border-white/20 rounded"
                      />
                      {obj.aspect}
                    </div>
                    <div className={`pl-4 ${obj.status === `n/a` ? `` : `text-[#e09c1e]`}`}>
                      {obj.status === `n/a` ? `-` : `${obj.status} ${obj.fear}F - ${obj.time}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
