import SideNav from "./Comp/Sidebar";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";

import { useData } from "./Hook/DataFetch";
import Loading from "./Hook/Loading";
import { bundleData } from "./Data/DataBundle";
// Utility
import { sToA, findValue, orderMap, parseTimetoms, getPoolColor, getYTid } from "./Data/Misc";
import { Link } from "react-router-dom";
import { h2AspectOrder } from "./Data/Misc";

import { useMemo, useState, useRef } from "react";

import PageBlock from "./Block/PageBlock";
import Divider from "./Block/Divider";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textHoverObject } from "./Data/TextHoverObject";
import { p9boons } from "./Data/P9BoonObj";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const normalizeLoc = (loc) => {
  if (loc === "Underworld" || loc === "Surface") return loc;
  return "Dream";
};
function sortByOrder(array, order) {
  return [...array].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

function createData(fearNum, data) {
  const entries = data.slice().filter((obj) => obj.fea == fearNum);
  const entriesData = Object.values(
    entries.reduce((acc, player) => {
      const key = player.nam;
      const loc = normalizeLoc(player.loc);
      const aspects = player.asp;

      if (!acc[key]) {
        acc[key] = { nam: key, locs: new Set(), asps: new Set(), locAsps: {} };
      }

      acc[key].locs.add(loc);
      acc[key].asps.add(aspects);

      if (!acc[key].locAsps[loc]) {
        acc[key].locAsps[loc] = new Set();
      }
      acc[key].locAsps[loc].add(aspects);

      return acc;
    }, {}),
  ).map((player) => ({
    nam: player.nam,
    locs: [...player.locs],
    asps: [...player.asps],
    completed: Object.entries(player.locAsps)
      .filter(([, aspSet]) => aspSet.size === 24)
      .map(([loc]) => loc),
  }));

  return entriesData;
}

export default function App() {
  const { posts, loader } = useData();
  const container = useRef(null);
  const containerRef = useRef(null);
  const lastSpawn = useRef(0);

  useGSAP(
    () => {
      const eggs = gsap.utils.toArray(".egg"); // whatever your actual class is
      eggs.forEach((egg) => {
        gsap.to(egg, {
          rotation: gsap.utils.random(-10, 10),
          x: gsap.utils.random(-2, 2),
          duration: gsap.utils.random(0.5, 1.5),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          repeatDelay: gsap.utils.random(0.2, 0.6),
          transformOrigin: "50% 100%",
          delay: gsap.utils.random(0, 1.5),
        });

        gsap.to(egg, {
          x: gsap.utils.random(-10, 10),
          duration: 0.5,
          yoyo: true,
          repeat: -1,
          delay: 1,
        });

        gsap.to(egg, {
          scaleY: 0.8,
          scaleX: 1.1,
          y: 5,
          duration: gsap.utils.random(0.05, 0.1),
          ease: "power2.in",
          yoyo: true,
          repeat: -1,
          repeatDelay: gsap.utils.random(1.0, 2.5), // longer pause between bounces
          transformOrigin: "50% 100%",
          delay: gsap.utils.random(0.5, 1),
          onRepeat() {
            // on the way back up, overshoot slightly
            gsap.to(egg, {
              scaleY: 1.1,
              scaleX: 0.92,
              y: -6,
              duration: 0.15,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
            });
          },
        });
      });
    },
    { scope: container, dependencies: [posts] },
  );

  const handleMouseMove = (e) => {
    const now = Date.now();
    if (now - lastSpawn.current < 50) return; // ← ms between spawns, higher = slower
    lastSpawn.current = now;

    if (!containerRef.current) return;

    // const icons = [...textHoverObject];
    const icons = [...Object.keys(p9boons)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const img = document.createElement("img");
    // img.src = `./hover/${randomIcon}.png`;
    img.src = `./P9/${randomIcon}.png`;
    img.classList.add("absolute", "w-8", "h-8", "pointer-events-none");

    const rect = containerRef.current.getBoundingClientRect();
    img.style.left = `${e.clientX - rect.left}px`;
    img.style.top = `${e.clientY - rect.top}px`;

    containerRef.current.appendChild(img);
    const tl = gsap.timeline({ onComplete: () => img.remove() });

    // Use gsap directly (not useGSAP) inside event handlers
    tl.fromTo(
      img,
      {
        opacity: 1,
        scale: gsap.utils.random(0.8, 1.4),
        y: 0,
        x: 0,
        rotation: gsap.utils.random(-30, 30),
      },
      {
        // Stage 1: shoot up
        duration: gsap.utils.random(0.8, 1.4),
        y: gsap.utils.random(-80, -200), // ← negative = upward
        x: gsap.utils.random(-50, 50),
        rotation: gsap.utils.random(-90, 90),
        opacity: 1,
        ease: "power2.out", // decelerates as it rises
      },
    ).to(img, {
      // Stage 2: fall down and fade
      duration: gsap.utils.random(0.8, 1.4),
      y: gsap.utils.random(80, 140), // ← positive = downward (relative to stage 1 end)
      x: gsap.utils.random(-30, 30),
      rotation: gsap.utils.random(-180, 180),
      opacity: 0,
      ease: "power4.in", // accelerates as it falls (gravity feel)
    });
  };

  const orderData = useMemo(() => {
    return [...bundleData, ...posts]
      .filter((obj) => obj.fea >= 62)
      .sort((a, b) => {
        const feaDiff = +b.fea - +a.fea;
        if (feaDiff !== 0) return feaDiff;
        return parseTimetoms(a.tim) - parseTimetoms(b.tim);
      });
  }, [posts]);

  const entries67 = orderData.slice().filter((obj) => obj.fea == 67 && obj.des.includes("#usum"));
  const entries67Data = Object.values(
    entries67.reduce((acc, player) => {
      const key = player.nam;
      const loc = normalizeLoc(player.loc);
      const aspects = player.asp;

      if (!acc[key]) {
        acc[key] = { nam: key, locs: new Set() };
      }
      acc[key].locs.add(loc);

      return acc;
    }, {}),
  ).map((player) => ({
    nam: player.nam,
    locs: [...player.locs],
  }));

  const players67 = [...new Set(entries67.map((obj) => obj.nam))];
  //
  const entriesMaxData = createData(67, orderData);
  const entries65Data = createData(65, orderData);
  const entries62Data = createData(62, orderData);
  //
  const maxFearAAUnderworld = entriesMaxData.filter((obj) => obj.completed.includes("Underworld"));
  const fear65AAUnderworld = entries65Data.filter((obj) => obj.completed.includes("Underworld"));
  const fear62AAUnderworld = entries62Data.filter((obj) => obj.completed.includes("Underworld"));

  const maxFearAASurface = entriesMaxData.filter((obj) => obj.completed.includes("Surface"));
  const fear65AASurface = entries65Data.filter((obj) => obj.completed.includes("Surface"));
  const fear62AASurface = entries62Data.filter((obj) => obj.completed.includes("Surface"));

  const maxFearAADream = entriesMaxData.filter((obj) => obj.completed.includes("Dream"));
  const fear65AADream = entries65Data.filter((obj) => obj.completed.includes("Dream"));
  const fear62AADream = entries62Data.filter((obj) => obj.completed.includes("Dream"));

  const mergedMaxAA = Array.from(
    new Map([...maxFearAAUnderworld, ...maxFearAASurface, ...maxFearAADream].map((item) => [item.nam, item])).values(),
  );
  const namesMaxAA = new Set(mergedMaxAA.map((item) => item.nam));

  const merged65AA = Array.from(
    new Map([...fear65AAUnderworld, ...fear65AASurface, ...fear65AADream].map((item) => [item.nam, item])).values(),
  ).filter((item) => !namesMaxAA.has(item.nam));

  const names65AA = new Set(merged65AA.map((item) => item.nam));

  const merged62AA = Array.from(
    new Map([...fear62AAUnderworld, ...fear62AASurface, ...fear62AADream].map((item) => [item.nam, item])).values(),
  ).filter((item) => !names65AA.has(item.nam) && !namesMaxAA.has(item.nam));

  //
  const finalized65Data = entries65Data.filter((obj) => !players67.includes(obj.nam));
  const players65 = [...new Set(entries65Data.map((obj) => obj.nam))];
  const finalized62Data = entries62Data.filter((obj) => ![...players67, ...players65].includes(obj.nam));
  //

  return (
    <main
      className="h-full min-h-lvh relative text-[12px] md:text-[14px] font-[Ale] select-none overflow-x-hidden"
      ref={container}
    >
      <div className="parentBox">
        <PageBlock>
          <div className="min-h-screen flex justify-center items-center relative" ref={containerRef}>
            <div className="relative overflow-visible inline-block">
              <div
                onMouseMove={handleMouseMove}
                className="hover-target text-gray-300 font-bold text-[48px] sm:text-[58px] md:text-[64px] uppercase cursor-default select-none text-center font-[Sr] gap-2 gap-x-4 flex"
              >
                <div>Git</div>
                <div>Gud</div>
              </div>
            </div>
          </div>
          {/*  */}
          {loader ? (
            <Loading />
          ) : (
            <div>
              {/* Category 67 */}
              <div className="mb-16 rounded">
                <div className="px-4 text-center">
                  <div className="font-[Sr] text-[36px] leading-none">Max Fear</div>
                  <div className="font-[Ale] text-gray-300">Unseeded and Unmodded</div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 p-1">
                  {entries67Data
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded rounded-r-xl font-[Ale] bg-linear-to-r from-black via-black/90 to-black/50 border border-white/10 p-2 flex items-center gap-2 w-full max-w-40 md:max-w-50 relative`}
                        key={index}
                      >
                        <video
                          autoPlay={true}
                          muted={true}
                          loop={true}
                          src="https://cdn.discordapp.com/media/v1/collectibles-shop/1428438925021548544/video"
                          alt="Hades"
                          className="h-full w-full object-cover object-right top-0 right-0 absolute -z-10"
                        />
                        <div className={`relative w-10 h-10 shrink-0`}>
                          <img
                            src={`/Avatar/${obj.nam.toLowerCase()}.webp`}
                            alt="Avatar"
                            loading="lazy"
                            className="w-10 h-10 rounded-full p-1 egg"
                            draggable={false}
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-10 h-10 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate -translate-x-[2px]">
                            {obj.nam.slice(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <div className="w-full truncate">
                          <div>{obj.nam}</div>
                          <div className="flex gap-1">
                            {obj.locs.map((ite) => (
                              <img
                                src={`/${ite}.png`}
                                alt="Locations"
                                className="size-5 drop-shadow-[0_0_3px_#00ffaa]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* Max Fear All Aspects */}
              <div className="mb-16 rounded">
                <div className="px-4">
                  <div className="font-[Sr] text-[20px] text-gray-300 leading-none text-center">
                    Max Fear, All Aspects
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 p-1">
                  {mergedMaxAA
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded font-[Ale] border border-white/10 p-2 flex items-center gap-2 w-full max-w-40 md:max-w-50 relative overflow-hidden`}
                        key={index}
                      >
                        <img
                          src="/banner2.png"
                          alt="Hades"
                          className="h-full w-full object-cover object-center top-0 right-0 absolute -z-10 brightness-75 aura aura-dual text-[#00ffaa] duration-3000"
                        />
                        <div className={`relative w-10 h-10 shrink-0`}>
                          <img
                            src={`/Avatar/${obj.nam.toLowerCase()}.webp`}
                            alt="Avatar"
                            loading="lazy"
                            className="w-10 h-10 rounded-full p-1 egg"
                            draggable={false}
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-10 h-10 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate -translate-x-[2px]">
                            {obj.nam.slice(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <div className="w-full truncate">
                          <div>{obj.nam}</div>
                          <div className="flex gap-1">
                            {obj.completed.map((ite) => (
                              <img
                                src={`/${ite}.png`}
                                alt="Locations"
                                className="size-5 drop-shadow-[0_0_3px_#00ffaa]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* 65 All Aspects */}
              <div className="mb-16 rounded">
                <div className="px-4">
                  <div className="font-[Sr] text-[20px] text-gray-300 leading-none text-center">
                    65 Fear, All Aspects
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 p-1">
                  {merged65AA
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded font-[Ale] border border-white/10 p-2 flex items-center gap-2 w-full max-w-40 md:max-w-50 relative`}
                        key={index}
                      >
                        <img
                          src="/banner.png"
                          alt="Hades"
                          className="h-full w-full object-cover object-center top-0 right-0 absolute -z-10 brightness-75 aura aura-silver"
                        />
                        <div className={`relative w-10 h-10 shrink-0`}>
                          <img
                            src={`/Avatar/${obj.nam.toLowerCase()}.webp`}
                            alt="Avatar"
                            loading="lazy"
                            className="w-10 h-10 rounded-full p-1 egg"
                            draggable={false}
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-10 h-10 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate -translate-x-[2px]">
                            {obj.nam.slice(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <div className="w-full truncate">
                          <div>{obj.nam}</div>
                          <div className="flex gap-1">
                            {obj.completed.map((ite) => (
                              <img
                                src={`/${ite}.png`}
                                alt="Locations"
                                className="size-5 drop-shadow-[0_0_3px_#00ffaa]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* 62 All Aspects */}
              <div className="mb-16 rounded">
                <div className="px-4">
                  <div className="font-[Sr] text-[20px] text-gray-300 leading-none text-center">
                    62 Fear, All Aspects
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 p-1">
                  {merged62AA
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded font-[Ale] bg-[#0c0e12] border border-red-300/20 p-2 flex items-center gap-2 w-full max-w-40 md:max-w-50 relative`}
                        key={index}
                      >
                        <img
                          src="/Level/Heroic.png"
                          alt="Hades"
                          className="h-full w-auto opacity-25 top-0 right-0 absolute p-2"
                        />
                        <div className={`relative w-10 h-10 shrink-0`}>
                          <img
                            src={`/Avatar/${obj.nam.toLowerCase()}.webp`}
                            alt="Avatar"
                            loading="lazy"
                            className="w-10 h-10 rounded-full p-1 egg"
                            draggable={false}
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-10 h-10 rounded-full bg-[#28282b] text-red-300 items-center justify-center hidden truncate -translate-x-[2px]">
                            {obj.nam.slice(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <div className="w-full truncate">
                          <div className="text-red-300">{obj.nam}</div>
                          <div className="flex gap-1">
                            {obj.completed.map((ite) => (
                              <img src={`/${ite}.png`} alt="Locations" className="size-5 drop-shadow-[0_0_3px_red]" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* 65 Fear */}
              <div className="mb-16 rounded">
                <div className="px-4">
                  <div className="font-[Sr] text-[20px] text-gray-300 leading-none text-center">65 Fear</div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 p-1">
                  {finalized65Data
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded font-[Ale] bg-[#0c0e12] border border-purple-400/20 p-2 flex items-center gap-2 w-full max-w-40 md:max-w-50 relative`}
                        key={index}
                      >
                        <img
                          src="/Level/Epic.png"
                          alt="Hades"
                          className="h-full w-auto opacity-25 top-0 right-0 absolute p-2"
                        />
                        <div className={`relative w-10 h-10 shrink-0`}>
                          <img
                            src={`/Avatar/${obj.nam.toLowerCase()}.webp`}
                            alt="Avatar"
                            loading="lazy"
                            className="w-10 h-10 rounded-full p-1 egg"
                            draggable={false}
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-10 h-10 rounded-full bg-[#28282b] text-purple-300 items-center justify-center hidden truncate -translate-x-[2px]">
                            {obj.nam.slice(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <div className="w-full truncate">
                          <div className="text-purple-400">{obj.nam}</div>
                          <div className="flex gap-1">
                            {obj.locs.map((ite) => (
                              <img
                                src={`/${ite}.png`}
                                alt="Locations"
                                className="size-5 drop-shadow-[0_0_3px_purple]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* 62 Fear */}
              <div className="mb-16 rounded">
                <div className="px-4">
                  <div className="font-[Sr] text-[20px] text-gray-300 leading-none text-center">62 Fear</div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 p-1">
                  {finalized62Data
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded font-[Ale] bg-[#0c0e12] border border-blue-300/20 p-2 flex items-center gap-2 w-full max-w-40 md:max-w-50 relative`}
                        key={index}
                      >
                        <img
                          src="/Level/Rare.png"
                          alt="Hades"
                          className="h-full w-auto opacity-25 top-0 right-0 absolute p-2"
                        />
                        <div className={`relative w-10 h-10 shrink-0`}>
                          <img
                            src={`/Avatar/${obj.nam.toLowerCase()}.webp`}
                            alt="Avatar"
                            loading="lazy"
                            className="w-10 h-10 rounded-full p-1 egg"
                            draggable={false}
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-10 h-10 rounded-full bg-[#28282b] text-blue-300 items-center justify-center hidden truncate -translate-x-[2px]">
                            {obj.nam.slice(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <div className="w-full truncate">
                          <div className="text-blue-300">{obj.nam}</div>
                          <div className="flex gap-1">
                            {obj.locs.map((ite) => (
                              <img src={`/${ite}.png`} alt="Locations" className="size-5 drop-shadow-[0_0_3px_blue]" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </PageBlock>
      </div>
    </main>
  );
}
