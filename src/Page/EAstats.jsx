import SideNav from "../Comp/Sidebar";
import { h2AspectOrder } from "../Data/Misc";
import { p11data } from "../Data/P11Data";
import { p9data } from "../Data/P9Data";
import P11BoonData from "../Comp/P11BoonData";
// import P9Unseen from "../Comp/P9UnseenData";
import Background from "../Comp/Background";
import BarFear from "../Comp/BarFear";
import BarAspect from "../Comp/BarAspect";
import BarSurface from "../Comp/BarSurface";
import BarUW from "../Comp/BarUW";
import Footer from "../Comp/Footer";
import ArcanaData from "../Comp/ArcanaData";
import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

const getHighestOfEachAspect = (order, data) => {
  return order.map((aspect) => {
    const found = data.find((item) => item.asp === aspect);
    return found
      ? { aspect: aspect, status: found.nam, fear: found.fea, time: found.tim }
      : { aspect: aspect, status: `-` };
  });
};

export default function EAstats() {
  const { posts, loader } = useData();

  const highfear = [...p11data, ...(posts || []), ...p9data]
    .sort((a, b) => (a.tim > b.tim ? 1 : -1))
    .sort((a, b) => (a.fea > b.fea ? -1 : 1));

  const underworld_runs = highfear.filter((obj) => obj.loc === "Underworld");
  const surface_runs = highfear.filter((obj) => obj.loc === "Surface");

  const overall_aspect_underworld = getHighestOfEachAspect(h2AspectOrder, underworld_runs);
  const overall_aspect_surface = getHighestOfEachAspect(h2AspectOrder, surface_runs);

  return (
    <main className="h-full min-h-lvh select-none relative">
      <Background />
      <SideNav />
      {loader ? (
        <Loading />
      ) : (
        <>
          <div className="max-w-[1000px] font-[Ale] text-[12px] mx-auto my-2">
            <section className="w-full">
              <div className="bg-[#000000b5] rounded overflow-hidden pt-2">
                <div className="grid grid-cols-3 px-2 pb-2 text-[16px]">
                  <div>Aspects</div>
                  <div>Underworld</div>
                  <div>Surface</div>
                </div>
                {h2AspectOrder.map((item, index) => (
                  <div
                    className={`grid grid-cols-3 p-1 items-center px-2 ${
                      index % 2 === 0 ? `bg-[#1f1f265a]` : `bg-transparent`
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
          <BarFear data={highfear} />
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1200px] mx-auto my-4">
            <BarSurface data={highfear} />
            <BarUW data={highfear} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1200px] mx-auto my-4">
            <BarAspect data={underworld_runs} title={`UW`} />
            <BarAspect data={surface_runs} title={`Surface`} />
          </div>
          <ArcanaData data={highfear} />
          <P11BoonData data={highfear} />
        </>
      )}
      <Footer />
    </main>
  );
}
