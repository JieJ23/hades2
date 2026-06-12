import PageBlock from "../Block/PageBlock";
import { hades1 } from "../Data/Hades1";
import { getYTid } from "../Data/Misc";
import { Link } from "react-router-dom";

import { use, useState } from "react";

const vidOnly = hades1.filter((obj) => obj.Name !== "PlayAd").sort((a, b) => b.Heat - a.Heat);

export default function Hades1() {
  const [display, setDisplay] = useState(25);
  const [weapon, setWeapon] = useState("All");
  const [aspect, setAspect] = useState("All");

  const filteredData = vidOnly.filter((obj) => {
    const weaponType = weapon === "All" || obj.Weapon === weapon;
    const aspectType = aspect === "All" || obj.Aspect === aspect;

    return weaponType && aspectType;
  });
  const visibleItems = filteredData.slice(0, display);

  function handleShowMore() {
    setDisplay((prev) => Math.min(prev + 50, vidOnly.length));
  }

  const allWeapon = [...new Set(vidOnly.map((obj) => obj.Weapon))];
  const allAspect = [...new Set(filteredData.map((obj) => obj.Aspect))];

  return (
    <div>
      <PageBlock>
        <div className="max-w-350 mx-auto py-2 my-2">
          <div className="px-2">Total Entries: {filteredData.length}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-2">
            <select
              className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
              value={weapon}
              onChange={(e) => {
                setWeapon(e.target.value);
                setAspect("All");
              }}
            >
              <option value={"All"}>{`All Weapons`}</option>
              {allWeapon.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            {weapon !== "All" && (
              <select
                className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
                value={aspect}
                onChange={(e) => {
                  setAspect(e.target.value);
                }}
              >
                <option value={"All"}>{`All Aspects`}</option>
                {allAspect.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {visibleItems.map((obj, index) => (
            <div className="rounded">
              <Link to={obj.Src} target="_blank" className="group">
                {obj.Src.includes("youtu") ? (
                  <img
                    src={`https://img.youtube.com/vi/${getYTid(obj.Src)}/maxresdefault.jpg`}
                    alt="Video Thumbnail"
                    className="aspect-video w-full group-hover:scale-95 duration-150 rounded-lg border border-black/10 bg-black"
                    loading="lazy"
                    onLoad={(e) => {
                      if (e.currentTarget.naturalWidth === 120 && e.currentTarget.naturalHeight === 90) {
                        e.currentTarget.src = `/h1bg/${Math.floor(Math.random() * 10) + 1}.webp`;
                      }
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/h1bg/1.webp";
                    }}
                  />
                ) : (
                  <img
                    src={`/h1bg/${Math.floor(Math.random() * 10) + 1}.webp`}
                    alt="Video Thumbnail"
                    className="aspect-video w-full group-hover:scale-95 duration-150 rounded-lg border border-black/10 bg-black"
                    loading="lazy"
                  />
                )}
              </Link>
              <div className="p-2 pt-1">
                <div className="flex items-center justify-center sm:justify-start gap-1 px-2">
                  <div className="relative w-16 h-16 sm:w-12 sm:h-12 shrink-0">
                    <img
                      src="/h1arms/border.png"
                      alt="Border"
                      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                    />
                    <img
                      src={`/h1arms/${obj.Weapon}-${obj.Aspect}.png`}
                      alt="Aspect"
                      className="absolute inset-0 w-full h-full p-1 object-contain"
                    />
                  </div>
                  <div className="text-[14px] text-gray-400">
                    <div className="flex items-center gap-2 text-white">
                      <div>{obj.Name}</div>
                      <div className="flex items-center">
                        {obj.Heat}
                        <img src="/h1arms/heat.png" alt="Heat" className="w-6" />
                      </div>
                    </div>
                    <div className="flex gap-1 my-1">
                      <div className="bg-[#28282b] rounded px-1">{obj.Weapon}</div>
                      <div className="bg-[#28282b] rounded px-1">{obj.Aspect}</div>
                      <div
                        className={` text-black rounded px-1
                        ${obj.Category === "Modded" ? `bg-green-500` : obj.Category === "Seeded" ? `bg-blue-500` : `bg-orange-400`}
                        `}
                      >
                        {obj.Category}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        {display < filteredData.length && (
          <div className="flex justify-center w-full my-8">
            <button
              onClick={handleShowMore}
              className="font-[Exo] border rounded p-2 bg-white text-black cursor-pointer"
            >
              Show More
            </button>
          </div>
        )}
      </PageBlock>
    </div>
  );
}
