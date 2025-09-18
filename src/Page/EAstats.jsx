import SideNav from "../Comp/Sidebar";
import { h2AspectOrder, parseTimetoms } from "../Data/Misc";
import { p11data } from "../Data/P11Data";
import { p9data } from "../Data/P9Data";
import P11BoonData from "../Comp/P11BoonData";
// import P9Unseen from "../Comp/P9UnseenData";
import Background from "../Comp/Background";
import BarFear from "../Comp/BarFear";
import BarAspect from "../Comp/BarAspect";
import BarSurface from "../Comp/BarSurface";
import BarUW from "../Comp/BarUW";
import KeepData from "../Comp/KeepData";
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

export default function EAStats() {
  const { posts, loader } = useData();

  const highfear = [...p11data, ...(posts || []), ...p9data].sort(
    (a, b) => b.fea - a.fea || parseTimetoms(a.tim) - parseTimetoms(b.tim)
  );

  const underworld_runs = highfear.filter((obj) => obj.loc === "Underworld");
  const surface_runs = highfear.filter((obj) => obj.loc === "Surface");

  return (
    <main className="h-full min-h-lvh select-none relative">
      <Background />
      <SideNav />
      {loader ? (
        <Loading />
      ) : (
        <>
          <BarFear data={highfear} />
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1400px] mx-auto my-4">
            <BarSurface data={highfear} />
            <BarUW data={highfear} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1400px] mx-auto my-4">
            <BarAspect data={underworld_runs} title={`UW`} />
            <BarAspect data={surface_runs} title={`Surface`} />
          </div>
          <ArcanaData data={highfear} />
          <KeepData data={highfear} />
          <P11BoonData data={highfear} />
        </>
      )}
      <Footer />
    </main>
  );
}
