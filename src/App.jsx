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

function createData(fearNum, data, region) {
  const entries = data.slice().filter((obj) => obj.fea >= fearNum && normalizeLoc(obj.loc) === region);

  const entriesData = Object.values(
    entries.reduce((acc, player) => {
      const key = player.nam;
      const aspects = player.asp;
      if (!acc[key]) {
        acc[key] = { nam: key, asps: new Set() };
      }
      acc[key].asps.add(aspects);
      return acc;
    }, {}),
  ).map((player) => ({
    nam: player.nam,
    asps: [...player.asps],
    completed: player.asps.size === 24,
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

  // Base 50
  const orderData = useMemo(() => {
    return [...bundleData, ...posts]
      .filter((obj) => obj.fea >= 50)
      .sort((a, b) => {
        const feaDiff = +b.fea - +a.fea;
        if (feaDiff !== 0) return feaDiff;
        return parseTimetoms(a.tim) - parseTimetoms(b.tim);
      });
  }, [posts]);
  // Base Higher
  const orderData62 = orderData.filter((obj) => obj.fea >= 62);
  const orderData65 = orderData.filter((obj) => obj.fea >= 65);
  const orderData67 = orderData.filter((obj) => obj.fea >= 67 && obj.des.includes("#usum"));

  // Filter Data
  const maxFearSurface = createData(67, orderData67, "Surface");
  const maxFearUnder = createData(67, orderData67, "Underworld");
  const maxFearDream = createData(67, orderData67, "Dream");

  const maxFearSurfaceAA = maxFearSurface.filter((obj) => obj.completed === true);
  const maxFearUnderAA = maxFearUnder.filter((obj) => obj.completed === true);
  const maxFearDreamAA = maxFearDream.filter((obj) => obj.completed === true);

  const nameMaxS = new Set(maxFearSurfaceAA.map((item) => item.nam));
  const nameMaxU = new Set(maxFearUnderAA.map((item) => item.nam));
  const nameMaxD = new Set(maxFearDreamAA.map((item) => item.nam));

  const nameMaxFearS = new Set(maxFearSurface.map((item) => item.nam));
  const nameMaxFearU = new Set(maxFearUnder.map((item) => item.nam));
  const nameMaxFearD = new Set(maxFearDream.map((item) => item.nam));

  //

  const fear65Surface = createData(65, orderData65, "Surface");
  const fear65Under = createData(65, orderData65, "Underworld");
  const fear65Dream = createData(65, orderData65, "Dream");

  const fear65AAS = fear65Surface.filter((obj) => obj.completed === true).filter((item) => !nameMaxS.has(item.nam));
  const fear65AAU = fear65Under.filter((obj) => obj.completed === true).filter((item) => !nameMaxS.has(item.nam));
  const fear65AAD = fear65Dream.filter((obj) => obj.completed === true).filter((item) => !nameMaxS.has(item.nam));

  const name65S = new Set(fear65AAS.map((item) => item.nam));
  const name65U = new Set(fear65AAU.map((item) => item.nam));
  const name65D = new Set(fear65AAD.map((item) => item.nam));

  const finalized65FearS = fear65Surface.filter((item) => !nameMaxFearS.has(item.nam));
  const finalized65FearU = fear65Under.filter((item) => !nameMaxFearU.has(item.nam));
  const finalized65FearD = fear65Dream.filter((item) => !nameMaxFearD.has(item.nam));

  const name65FearS = new Set(finalized65FearS.map((item) => item.nam));
  const name65FearU = new Set(finalized65FearU.map((item) => item.nam));
  const name65FearD = new Set(finalized65FearD.map((item) => item.nam));

  //

  const fear62Surface = createData(62, orderData62, "Surface");
  const fear62Under = createData(62, orderData62, "Underworld");
  const fear62Dream = createData(62, orderData62, "Dream");

  const fear62AAS = fear62Surface
    .filter((obj) => obj.completed === true)
    .filter((item) => !name65S.has(item.nam) && !nameMaxS.has(item.nam));
  const fear62AAU = fear62Under
    .filter((obj) => obj.completed === true)
    .filter((item) => !name65U.has(item.nam) && !nameMaxU.has(item.nam));
  const fear62AAD = fear62Dream
    .filter((obj) => obj.completed === true)
    .filter((item) => !name65D.has(item.nam) && !nameMaxD.has(item.nam));

  const name62S = new Set(fear62AAS.map((item) => item.nam));
  const name62U = new Set(fear62AAU.map((item) => item.nam));
  const name62D = new Set(fear62AAD.map((item) => item.nam));

  const finalized62FearS = fear62Surface.filter((item) => !nameMaxFearS.has(item.nam) && !name65FearS.has(item.nam));
  const finalized62FearU = fear62Under.filter((item) => !nameMaxFearU.has(item.nam) && !name65FearU.has(item.nam));
  const finalized62FearD = fear62Dream.filter((item) => !nameMaxFearD.has(item.nam) && !name65FearD.has(item.nam));

  //

  const fear50Surface = createData(50, orderData, "Surface");
  const fear50Under = createData(50, orderData, "Underworld");
  const fear50Dream = createData(50, orderData, "Dream");

  const fear50AAS = fear50Surface
    .filter((obj) => obj.completed === true)
    .filter((item) => !name62S.has(item.nam) && !name65S.has(item.nam) && !nameMaxS.has(item.nam));
  const fear50AAU = fear50Under
    .filter((obj) => obj.completed === true)
    .filter((item) => !name62U.has(item.nam) && !name65U.has(item.nam) && !nameMaxU.has(item.nam));
  const fear50AAD = fear50Dream
    .filter((obj) => obj.completed === true)
    .filter((item) => !name62D.has(item.nam) && !name65D.has(item.nam) && !nameMaxD.has(item.nam));

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
              {/* Order Start */}
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-yellow-300">
                    Max Fear Surface
                  </div>
                  <div className="font-[Ale] text-gray-300">Unseeded and Unmodded</div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {maxFearSurface
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div className="aura aura-dual text-yellow-300">
                        <div
                          className={`rounded font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                          key={index}
                        >
                          <video
                            preload="none"
                            src="https://cdn.discordapp.com/media/v1/collectibles-shop/1420045363141672971/video"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5"
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
                          <div className="w-full truncate z-20">
                            <div>{obj.nam}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {maxFearSurfaceAA.length > 0 && (
                <div className="mb-16 rounded">
                  <div className="px-4 md:text-start text-center">
                    <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-yellow-300">
                      Max Fear Surface, All Aspects
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                    {maxFearSurfaceAA
                      .sort((a, b) => a.nam.localeCompare(b.nam))
                      .map((obj, index) => (
                        <div className="aura aura-dual text-yellow-300">
                          <div
                            className={`rounded font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                            key={index}
                          >
                            <video
                              preload="none"
                              src="https://cdn.discordapp.com/media/v1/collectibles-shop/1436367668964884690/video"
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="absolute top-0 right-0 h-full w-full opacity-40 object-cover object-right p-0.5"
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
                            <div className="w-full truncate z-20">
                              <div>{obj.nam}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-yellow-300">
                    65 Fear Surface, All Aspects
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {fear65AAS
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded font-[Ale] text-yellow-300 bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                        key={index}
                      >
                        <video
                          preload="none"
                          src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-100"
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
                        <div className="w-full truncate z-20">
                          <div>{obj.nam}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-yellow-300">
                    62 Fear Surface, All Aspects
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {fear62AAS
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded font-[Ale] text-yellow-300 bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                        key={index}
                      >
                        <video
                          preload="none"
                          src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-100"
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
                        <div className="w-full truncate z-20">
                          <div>{obj.nam}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {fear50AAS.length > 0 && (
                <div className="mb-16 rounded">
                  <div className="px-4 md:text-start text-center">
                    <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-yellow-300">
                      50 Fear Surface, All Aspects
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                    {fear50AAS
                      .sort((a, b) => a.nam.localeCompare(b.nam))
                      .map((obj, index) => (
                        <div
                          className={`rounded font-[Ale] text-yellow-300 bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                          key={index}
                        >
                          <video
                            preload="none"
                            src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-100"
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
                          <div className="w-full truncate z-20">
                            <div>{obj.nam}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-yellow-300">
                    65 Fear Surface
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {finalized65FearS
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded font-[Ale] text-yellow-300 bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                        key={index}
                      >
                        <video
                          preload="none"
                          src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-100"
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
                        <div className="w-full truncate z-20">
                          <div>{obj.nam}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-yellow-300">
                    62 Fear Surface
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {finalized62FearS
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded font-[Ale] text-yellow-300 bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                        key={index}
                      >
                        <video
                          preload="none"
                          src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-100"
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
                        <div className="w-full truncate z-20">
                          <div>{obj.nam}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-green-300">
                    Max Fear Underworld
                  </div>
                  <div className="font-[Ale] text-gray-300">Unseeded and Unmodded</div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {maxFearUnder
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div className="aura aura-dual text-green-300">
                        <div
                          className={`rounded font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                          key={index}
                        >
                          <video
                            preload="none"
                            src="https://cdn.discordapp.com/media/v1/collectibles-shop/1447609133011304529/video"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5"
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
                          <div className="w-full truncate z-20">
                            <div>{obj.nam}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {maxFearUnderAA.length > 0 && (
                <div className="mb-16 rounded">
                  <div className="px-4 md:text-start text-center">
                    <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-green-300">
                      Max Fear Underworld, All Aspects
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                    {maxFearUnderAA
                      .sort((a, b) => a.nam.localeCompare(b.nam))
                      .map((obj, index) => (
                        <div className="aura aura-dual text-green-300">
                          <div
                            className={`rounded font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                            key={index}
                          >
                            <video
                              preload="none"
                              src="https://cdn.discordapp.com/media/v1/collectibles-shop/1436367668964884690/video"
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="absolute top-0 right-0 h-full w-full opacity-40 object-cover object-right p-0.5"
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
                            <div className="w-full truncate z-20">
                              <div>{obj.nam}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-green-300">
                    65 Fear Underworld, All Aspects
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {fear65AAU
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded text-green-300 font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                        key={index}
                      >
                        <video
                          preload="none"
                          src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-140"
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
                        <div className="w-full truncate z-20">
                          <div>{obj.nam}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-green-300">
                    62 Fear Underworld, All Aspects
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {fear62AAU
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded text-green-300 font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                        key={index}
                      >
                        <video
                          preload="none"
                          src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-140"
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
                        <div className="w-full truncate z-20">
                          <div>{obj.nam}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {fear50AAU.length > 0 && (
                <div className="mb-16 rounded">
                  <div className="px-4 md:text-start text-center">
                    <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-green-300">
                      50 Fear Underworld, All Aspects
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                    {fear50AAU
                      .sort((a, b) => a.nam.localeCompare(b.nam))
                      .map((obj, index) => (
                        <div
                          className={`rounded font-[Ale] text-green-300 bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                          key={index}
                        >
                          <video
                            preload="none"
                            src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-140"
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
                          <div className="w-full truncate z-20">
                            <div>{obj.nam}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-green-300">
                    65 Fear Underworld
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {finalized65FearU
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded text-green-300 font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                        key={index}
                      >
                        <video
                          preload="none"
                          src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-140"
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
                        <div className="w-full truncate z-20">
                          <div>{obj.nam}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-green-300">
                    62 Fear Underworld
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {finalized62FearU
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded text-green-300 font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                        key={index}
                      >
                        <video
                          preload="none"
                          src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-140"
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
                        <div className="w-full truncate z-20">
                          <div>{obj.nam}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* Order End */}
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-purple-400">
                    Max Fear Dream Dive
                  </div>
                  <div className="font-[Ale] text-gray-300">Unseeded and Unmodded</div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {maxFearDream
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div className="aura aura-dual text-purple-400">
                        <div
                          className={`rounded font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                          key={index}
                        >
                          <video
                            preload="none"
                            src="https://cdn.discordapp.com/media/v1/collectibles-shop/1394404301295714355/video"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute top-0 right-0 h-full w-full opacity-40 object-cover object-right p-0.5"
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
                          <div className="w-full truncate z-20">
                            <div>{obj.nam}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {maxFearDreamAA.length > 0 && (
                <div className="mb-16 rounded">
                  <div className="px-4 md:text-start text-center">
                    <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-yellow-300">
                      Max Fear Dream Dive, All Aspects
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                    {maxFearDreamAA
                      .sort((a, b) => a.nam.localeCompare(b.nam))
                      .map((obj, index) => (
                        <div className="aura aura-dual text-yellow-300">
                          <div
                            className={`rounded font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                            key={index}
                          >
                            <video
                              preload="none"
                              src="https://cdn.discordapp.com/media/v1/collectibles-shop/1436367668964884690/video"
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="absolute top-0 right-0 h-full w-full opacity-40 object-cover object-right p-0.5"
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
                            <div className="w-full truncate z-20">
                              <div>{obj.nam}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {fear65AAD.length > 0 && (
                <div className="mb-16 rounded">
                  <div className="px-4 md:text-start text-center">
                    <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-purple-400">
                      65 Fear Dream Dive, All Aspects
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                    {fear65AAD
                      .sort((a, b) => a.nam.localeCompare(b.nam))
                      .map((obj, index) => (
                        <div
                          className={`rounded text-purple-400 font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                          key={index}
                        >
                          <video
                            preload="none"
                            src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-0"
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
                          <div className="w-full truncate z-20">
                            <div>{obj.nam}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {/* 62 AA */}
              {fear62AAD.length > 0 && (
                <div className="mb-16 rounded">
                  <div className="px-4 md:text-start text-center">
                    <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-purple-400">
                      62 Fear Dream Dive, All Aspects
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                    {fear62AAD
                      .sort((a, b) => a.nam.localeCompare(b.nam))
                      .map((obj, index) => (
                        <div
                          className={`rounded text-purple-400 font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                          key={index}
                        >
                          <video
                            preload="none"
                            src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-0"
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
                          <div className="w-full truncate z-20">
                            <div>{obj.nam}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-purple-400">
                    65 Fear Dream Dive
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {finalized65FearD
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded text-purple-400 font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                        key={index}
                      >
                        <video
                          preload="none"
                          src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-0"
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
                        <div className="w-full truncate z-20">
                          <div>{obj.nam}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="mb-16 rounded">
                <div className="px-4 md:text-start text-center">
                  <div className="font-[Sr] text-[20px] md:text-[24px] leading-none text-purple-400">
                    62 Fear Dream Dive
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                  {finalized62FearD
                    .sort((a, b) => a.nam.localeCompare(b.nam))
                    .map((obj, index) => (
                      <div
                        className={`rounded text-purple-400 font-[Ale] bg-black border border-white/10 p-2 flex items-center gap-2 min-w-40 relative`}
                        key={index}
                      >
                        <video
                          preload="none"
                          src="https://cdn.discordapp.com/media/v1/collectibles-shop/1349849614257225760/video"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute top-0 right-0 h-full w-full opacity-25 object-cover object-right p-0.5 hue-rotate-0"
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
                        <div className="w-full truncate z-20">
                          <div>{obj.nam}</div>
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
