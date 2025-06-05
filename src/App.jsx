import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";
import { h2Data } from "./Data/H2Data";
import { data_AnyFear } from "./Data/H2Fear";
import { Link } from "react-router-dom";
import { daysAgo } from "./Data/Misc";
import { sToA } from "./Page/Hades2";
import { useState } from "react";

export function getYTid(text) {
  return text.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
}

export default function App() {
  const [category, setCategory] = useState(`High Fear`);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangeCategory = (str) => {
    setSearchTerm("");
    setCategory(str);
  };

  const displayContent = h2Data
    .slice()
    .sort((a, b) => (new Date(a.d) > new Date(b.d) ? -1 : 1))
    .slice(0, 20);

  const displayAnyFearData = searchTerm
    ? data_AnyFear.filter(
        (obj) =>
          obj.des.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.p.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data_AnyFear;

  return (
    <main className="h-full min-h-lvh select-none relative">
      <div className="fixed w-full h-full bg-[url('/mbg.webp')] -z-10 bg-top"></div>
      <Head />
      <div className="flex flex-col md:flex-row gap-1 max-w-[1400px] mx-auto items-start font-[PT]">
        <SideNav />
        <div>
          <div className="mb-8">
            <div className="flex gap-1 my-2 px-2">
              <button
                className={`btn border-1 border-white/20 text-[12px] btn-sm rounded ${
                  category === `High Fear` ? `btn-success` : `btn-neutral`
                }`}
                onClick={() => handleChangeCategory(`High Fear`)}
              >
                High Fear
              </button>
              <button
                className={`btn border-1 border-white/20 text-[12px] btn-sm rounded ${
                  category === `Any Fear` ? `btn-success` : `btn-neutral`
                }`}
                onClick={() => handleChangeCategory(`Any Fear`)}
              >
                Any Fear
              </button>
            </div>
            {category === `High Fear` ? (
              <>
                <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-1">
                  {displayContent.map((obj, index) => (
                    <div key={index} className="font-[PT] text-[12px] rounded overflow-hidden bg-black/80">
                      <Link to={`${obj.src}`} target="_blank">
                        <img
                          src={
                            obj.src.includes(`bilibil`) && obj.l === `Underworld`
                              ? `/surface.jpg`
                              : obj.src.includes(`bilibil`) && obj.l === `Surface`
                              ? `/underworld.jpg`
                              : `https://img.youtube.com/vi/${getYTid(obj.src)}/mqdefault.jpg`
                          }
                          alt="Video"
                          className="border-1 border-white/20 rounded rounded-b-none"
                          draggable={false}
                        />
                      </Link>
                      <div className="px-2 py-1">
                        <div className="line-clamp-1">
                          {obj.n} - {obj.f} - {obj.a} - {obj.l}
                        </div>
                        <div className="flex justify-between">
                          <div className="flex">
                            {obj.boon &&
                              sToA(obj.boon).map((ite) => (
                                <div>
                                  <img
                                    draggable={false}
                                    src={`/H2Boons/${ite}.png`}
                                    alt="Core Boon"
                                    className="size-6 rounded-none"
                                  />
                                </div>
                              ))}
                          </div>
                          <div className="flex">
                            {obj.h &&
                              sToA(obj.h)
                                .sort()
                                .map((item, index) => (
                                  <div className="tooltip">
                                    <div className="tooltip-content">
                                      <div className="text-[12px] font-[PT]">{item}</div>
                                    </div>
                                    <img
                                      draggable={false}
                                      src={`/Hammer/${item}.png`}
                                      alt="Hammer Boon"
                                      className="size-6 rounded-none"
                                    />
                                  </div>
                                ))}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div>{obj.t}</div>
                          <div>{daysAgo(obj.d)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              </>
            ) : (
              <>
                <label className="floating-label my-2 px-2">
                  <input
                    type="text"
                    placeholder="Search Keyword / Aspect"
                    className="input rounded border-1 border-white/20 text-[12px] bg-base-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </label>
                <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-1">
                  {displayAnyFearData.map((obj, index) => (
                    <div key={index} className="font-[PT] text-[12px] rounded overflow-hidden bg-black/80">
                      <Link to={`${obj.src}`} target="_blank">
                        <img
                          src={`https://img.youtube.com/vi/${getYTid(obj.src)}/mqdefault.jpg`}
                          alt="Video"
                          className="border-1 border-white/20 rounded rounded-b-none"
                          draggable={false}
                        />
                      </Link>
                      <div className="px-2 py-1">
                        <div className="line-clamp-1">
                          {obj.a} - {obj.f} - {obj.l}
                        </div>
                        <div className="line-clamp-1 text-[#ffa006]">{obj.des}</div>
                        <div className="flex justify-between">
                          {obj.p}
                          <div>{daysAgo(obj.d)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
