import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { hadesEntries } from "../Data/HadesEntries";
import { Link } from "react-router-dom";

export default function Hades() {
  const hades64SortByDate = hadesEntries.sort((a, b) => (new Date(a.d) > new Date(b.d) ? -1 : 1));

  return (
    <main className="h-full min-h-lvh">
      <Head />
      <div className="flex flex-col md:flex-row gap-1">
        <SideNav />
        <div className="w-full">
          <div className="max-w-[500px] items-center p-1">
            <ul className="list bg-base-100 rounded-box shadow-md">
              <li className="p-2 text-xs opacity-80 tracking-wide font-[PT] text-[12px]">Hades 64 Heat</li>
              {hades64SortByDate.map((obj, index) => (
                <li
                  className="list-row flex items-center justify-between border-1 border-white/20 p-3 px-2 font-[PT] text-[12px] my-0.5 bg-[#00000050] relative"
                  key={index}
                >
                  <div className="absolute top-0.5 left-1 text-[10px] opacity-80">
                    #{hades64SortByDate.length - index}
                  </div>
                  <div className="flex items-center gap-2">
                    <img className="size-10 rounded-none" src={`/H1Boon/${obj.a}.png`} />
                    <div>
                      <div className="font-[Cinzel]">{obj.n}</div>
                      <div className="opacity-60 text-[10px]">
                        {obj.w} - {obj.a}
                      </div>
                      <div className="text-[10px] text-[yellow]">{obj.t}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {obj.b.map((ite) => (
                      <img className="size-8 md:size-10 rounded-none" src={`/H1Boon/${ite}.png`} />
                    ))}
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <Link to={`${obj.src}`} target="_blank">
                      <button className="btn btn-square btn-ghost">
                        <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path d="M6 3L20 12 6 21 6 3z"></path>
                          </g>
                        </svg>
                      </button>
                    </Link>
                    <div className="text-[cyan] text-[10px]">{obj.c}</div>
                    <div className="text-[pink] text-[10px]">{obj.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-[250px] shrink-0 hidden lg:block"></div>
      </div>
    </main>
  );
}
