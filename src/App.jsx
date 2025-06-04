import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";
import { h2Data } from "./Data/H2Data";
import { h1Data } from "./Data/H1Data";
import { Link } from "react-router-dom";

export function getYTid(text) {
  return text.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
}

export default function App() {
  const displayContent = h2Data
    .slice()
    .sort((a, b) => (a.t > b.t ? 1 : -1))
    .sort((a, b) => (a.f > b.f ? -1 : 1))
    .filter((obj) => obj.src.includes(`youtub`))
    .slice(0, 10);

  const displayContent2 = h1Data
    .slice()
    .sort((a, b) => (a.heat > b.heat ? -1 : 1))
    .filter((obj) => obj.src.includes(`youtub`))
    .slice(0, 10);

  return (
    <main className="h-full min-h-lvh select-none relative">
      <div className="fixed w-full h-full bg-[url('/mbg.webp')] -z-10 bg-top"></div>
      <Head />
      <div className="flex flex-col md:flex-row gap-1 max-w-[1400px] mx-auto items-start font-[PT]">
        <SideNav />
        <div>
          <div className="mb-8">
            <div className="px-4 text-[16px] text-[#0fff7b] rounded font-[Cinzel]">Fear Gameplay</div>
            <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
              {displayContent.map((obj, index) => (
                <div key={index} className="font-[PT] text-[12px] rounded overflow-hidden">
                  <Link to={`${obj.src}`} target="_blank">
                    <img
                      src={`https://img.youtube.com/vi/${getYTid(obj.src)}/mqdefault.jpg`}
                      alt="Video"
                      className="border-1 border-white/20 rounded"
                      draggable={false}
                    />
                  </Link>
                  <div className="p-2 pt-1">
                    <div className="line-clamp-1">
                      {obj.n} - {obj.f} - {obj.a} - {obj.l}
                    </div>
                    <div>{obj.t}</div>
                  </div>
                </div>
              ))}
            </section>
          </div>
          <div className="my-8">
            <div className="px-4 text-[16px] text-[#ff5e1f] rounded font-[Cinzel]">Heat Gameplay</div>
            <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
              {displayContent2.map((obj, index) => (
                <div key={index} className="font-[PT] text-[12px] rounded overflow-hidden">
                  <Link to={`${obj.src}`} target="_blank">
                    <img
                      src={`https://img.youtube.com/vi/${getYTid(obj.src)}/mqdefault.jpg`}
                      alt="Video"
                      className="border-1 border-white/20 rounded"
                      draggable={false}
                    />
                  </Link>
                  <div className="pt-1 p-2 line-clamp-1">
                    {obj.name} - {obj.heat} - {obj.aspect}
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
