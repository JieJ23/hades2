import SideNav from "./Comp/Sidebar";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";

import { useData } from "./Hook/DataFetch";
import Loading from "./Hook/Loading";
import { bundleData } from "./Data/DataBundle";

import { getYTid } from "./Data/Misc";

export default function App() {
  const { posts, loader } = useData();

  const sortedByOrder = [...bundleData, ...(posts || [])]
    .sort((a, b) => new Date(b.dat) - new Date(a.dat))
    .filter((obj) => obj.src.includes(`youtu`))
    .slice(0, 50);

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <SideNav />
      {loader ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full max-w-[1400px] gap-2 mx-auto my-4 px-1">
          {sortedByOrder.map((obj, index) => (
            <div className="rounded aspect-video relative" key={index}>
              <div className="absolute bottom-0.5 left-0.5 rounded bg-[black] text-gray-300 font-[Ale] px-2 text-[12px]">
                {obj.nam}
              </div>
              <div className="absolute bottom-0.5 right-0.5 rounded bg-[black] text-gray-300 font-[Ale] px-2 text-[12px]">
                {obj.asp} | {obj.fea}
              </div>
              <img
                src={`https://img.youtube.com/vi/${getYTid(obj.src)}/mqdefault.jpg`}
                alt="Gameplay Video"
                className="h-full w-full rounded border border-black"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      )}
      <Footer />
    </main>
  );
}
