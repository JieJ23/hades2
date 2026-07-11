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

export default function App() {
  const { posts, loader } = useData();
  const container = useRef(null);
  const containerRef = useRef(null);
  const lastSpawn = useRef(0);
  const lastSpawn2 = useRef(0);

  useGSAP(
    () => {
      const targetWrappers = gsap.utils.toArray(".highwrapper");
      if (!targetWrappers.length) return;

      targetWrappers.forEach((wrapper) => {
        const highs = wrapper.querySelectorAll(".high");
        if (!highs.length) return;

        gsap.from(highs, {
          opacity: 0,
          backgroundColor: "#000",
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reset",
            // markers: true,
          },
        });
      });

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
  //
  // const handleMouseMove2 = (e) => {
  //   const now = Date.now();
  //   if (now - lastSpawn2.current < 250) return; // ← ms between spawns, higher = slower
  //   lastSpawn2.current = now;
  //   if (!container.current) return;

  //   const icons = [...textHoverObject];
  //   const randomIcon = icons[Math.floor(Math.random() * icons.length)];
  //   const img = document.createElement("img");
  //   img.src = `./hover/${randomIcon}.png`;
  //   img.classList.add("absolute", "w-8", "h-8", "pointer-events-none");

  //   const rect = container.current.getBoundingClientRect();
  //   img.style.left = `${e.clientX - rect.left}px`;
  //   img.style.top = `${e.clientY - rect.top}px`;

  //   container.current.appendChild(img);
  //   const tl = gsap.timeline({ onComplete: () => img.remove() });

  //   // Use gsap directly (not useGSAP) inside event handlers
  //   tl.fromTo(
  //     img,
  //     {
  //       opacity: 0,
  //       scale: gsap.utils.random(0.8, 1.6),
  //       y: 0,
  //       x: 0,
  //       rotation: gsap.utils.random(-30, 30),
  //     },
  //     {
  //       // Stage 1: shoot up
  //       duration: gsap.utils.random(0.8, 1.4),
  //       y: gsap.utils.random(-25, -100), // ← negative = upward
  //       x: gsap.utils.random(-50, 50),
  //       rotation: gsap.utils.random(-360, 360),
  //       opacity: 1,
  //       ease: "power2.out", // decelerates as it rises
  //     },
  //   ).to(img, {
  //     // Stage 2: fall down and fade
  //     duration: gsap.utils.random(0.8, 1.4),
  //     y: gsap.utils.random(80, 140), // ← positive = downward (relative to stage 1 end)
  //     x: gsap.utils.random(-30, 30),
  //     scale: gsap.utils.random(0.4, 0.8),
  //     rotation: gsap.utils.random(-360, 360),
  //     opacity: 0,
  //     ease: "power4.in", // accelerates as it falls (gravity feel)
  //   });
  // };
  //
  const orderData = useMemo(() => {
    return [...bundleData, ...posts].sort((a, b) => {
      const feaDiff = +b.fea - +a.fea;
      if (feaDiff !== 0) return feaDiff;
      return parseTimetoms(a.tim) - parseTimetoms(b.tim);
    });
  }, [posts]);

  const [runs62uw, runs65uw, runs67uw, runs62s, runs65s, runs67s] = orderData.reduce(
    (acc, item) => {
      if (item.fea >= 67 && item.loc === "Underworld" && item.des.includes("#usum")) {
        acc[2].push(item);
      } else if (item.fea >= 65 && item.loc === "Underworld") {
        acc[1].push(item);
      } else if (item.fea >= 62 && item.loc === "Underworld") {
        acc[0].push(item);
      }

      if (item.fea >= 67 && item.loc === "Surface" && item.des.includes("#usum")) {
        acc[5].push(item);
      } else if (item.fea >= 65 && item.loc === "Surface") {
        acc[4].push(item);
      } else if (item.fea >= 62 && item.loc === "Surface") {
        acc[3].push(item);
      }

      return acc;
    },
    [[], [], [], [], [], []],
  );
  const allAvailablePlayers = [...new Set(orderData.map((obj) => obj.nam))];

  // All Aspects Completion
  const [aspects50uw, aspects62uw, aspects65uw, aspects50s, aspects62s, aspects65s] = allAvailablePlayers.reduce(
    (acc, playerName) => {
      const playerArray = orderData.filter((obj) => obj.nam === playerName);

      const above50 = playerArray.filter((obj) => obj.fea >= 50 && obj.loc === "Underworld");
      const above62 = above50.filter((obj) => obj.fea >= 62);
      const above65 = above62.filter((obj) => obj.fea >= 65);
      const uniqueAspects50 = [...new Set(above50.map((obj) => obj.asp))];
      const uniqueAspects62 = [...new Set(above62.map((obj) => obj.asp))];
      const uniqueAspects65 = [...new Set(above65.map((obj) => obj.asp))];

      const above50s = playerArray.filter((obj) => obj.fea >= 50 && obj.loc === "Surface");
      const above62s = above50s.filter((obj) => obj.fea >= 62);
      const above65s = above62s.filter((obj) => obj.fea >= 65);
      const uniqueAspects50s = [...new Set(above50s.map((obj) => obj.asp))];
      const uniqueAspects62s = [...new Set(above62s.map((obj) => obj.asp))];
      const uniqueAspects65s = [...new Set(above65s.map((obj) => obj.asp))];

      if (uniqueAspects50.length === 24) {
        acc[0].push(playerName);

        if (uniqueAspects62.length === 24) {
          acc[1].push(playerName);
        }

        if (uniqueAspects65.length === 24) {
          acc[2].push(playerName);
        }
      }

      if (uniqueAspects50s.length === 24) {
        acc[3].push(playerName);

        if (uniqueAspects62s.length === 24) {
          acc[4].push(playerName);
        }

        if (uniqueAspects65s.length === 24) {
          acc[5].push(playerName);
        }
      }

      return acc;
    },
    [[], [], [], [], [], []],
  );
  const allaspect65uw = aspects65uw.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const allaspect62uw = aspects62uw
    .filter((item) => !allaspect65uw.includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const allaspect50uw = aspects50uw
    .filter((item) => ![...allaspect62uw, ...allaspect65uw].includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const allaspect65s = aspects65s.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const allaspect62s = aspects62s
    .filter((item) => !allaspect65s.includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const allaspect50s = aspects50s
    .filter((item) => ![...allaspect62s, ...allaspect65s].includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  //

  // Clears Breakpoint 62,65,67
  const allplayers67uw = [...new Set(runs67uw.map((obj) => obj.nam))].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );
  const allplayers65uw = [...new Set(runs65uw.map((obj) => obj.nam))]
    .filter((item) => !allplayers67uw.includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const allplayers62uw = [...new Set(runs62uw.map((obj) => obj.nam))]
    .filter((item) => ![...allplayers65uw, ...allplayers67uw].includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const allplayers67s = [...new Set(runs67s.map((obj) => obj.nam))].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );
  const allplayers65s = [...new Set(runs65s.map((obj) => obj.nam))]
    .filter((item) => !allplayers67s.includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const allplayers62s = [...new Set(runs62s.map((obj) => obj.nam))]
    .filter((item) => ![...allplayers65s, ...allplayers67s].includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  //

  // Max Fear Aspect Clears
  const maxFearClears = orderData.filter((obj) => obj.fea == 67);
  const under67 = maxFearClears.filter((obj) => obj.loc === "Underworld").filter((obj) => obj.des.includes("#usum"));
  const surface67 = maxFearClears.filter((obj) => obj.loc === "Surface").filter((obj) => obj.des.includes("#usum"));

  // Dream Dive Max Clear Player
  const [runs62d, runs65d, runs67d] = orderData
    .filter((obj) => obj.loc != "Underworld" && obj.loc != "Surface")
    .reduce(
      (acc, item) => {
        if (item.fea == 62) {
          acc[0].push(item);
        } else if (item.fea == 65 && item.des.includes("#usum")) {
          acc[1].push(item);
        } else if (item.fea == 67 && item.des.includes("#usum")) {
          acc[2].push(item);
        }

        return acc;
      },
      [[], [], []],
    );

  const allplayers67d = [...new Set(runs67d.map((obj) => obj.nam))].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );
  const allplayers65d = [...new Set(runs65d.map((obj) => obj.nam))]
    .filter((item) => !allplayers67d.includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const allplayers62d = [...new Set(runs62d.map((obj) => obj.nam))]
    .filter((item) => ![...allplayers65d, ...allplayers67d].includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  // Display Orders

  return (
    <main
      className="h-full min-h-lvh relative text-[12px] md:text-[14px] font-[Ale] select-none overflow-x-hidden"
      ref={container}
      // onMouseMove={handleMouseMove2}
    >
      <div className="parentBox">
        <PageBlock>
          <div className="min-h-screen flex justify-center items-center relative" ref={containerRef}>
            <div className="relative overflow-visible inline-block">
              <div
                onMouseMove={handleMouseMove}
                className="hover-target text-white font-bold text-[48px] sm:text-[58px] md:text-[64px] uppercase cursor-default select-none text-center font-[Sr] gap-2 gap-x-8 flex flex-col md:flex-row"
              >
                <div>Death</div>
                <div>To</div>
                <div>Chronos</div>
              </div>
            </div>
          </div>
          {/*  */}
          {loader ? (
            <Loading />
          ) : (
            <>
              {/* Surface  */}
              <Divider />
              <div className="text-center my-8 highwrapper">
                <div className="font-[Sr] text-[16px] mb-2 text-yellow-300">Max Fear, Surface</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers67s.map((ite) => (
                    <div className="flex flex-col gap-1 items-center min-w-25 bg-linear-to-t from-[#131111] to-yellow-200 text-gray-400 rounded p-2 px-1 high">
                      <div className="relative w-10 h-10">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full mask mask-hexagon egg"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-10 h-10 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Sr] text-[16px] mb-2 text-yellow-300">65 Fear, Surface</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers65s.map((ite) => (
                    <div className="flex gap-1 items-center min-w-25 bg-black/50 text-gray-400 rounded p-1 px-2">
                      <div className="relative w-7 h-7">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-7 h-7 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Sr] text-[16px] mb-2 text-yellow-300">62 Fear, Surface</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers62s.map((ite) => (
                    <div className="flex gap-1 items-center min-w-25 bg-black/50 text-gray-400 rounded p-1 px-2">
                      <div className="relative w-7 h-7">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-7 h-7 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Underworld */}
              <Divider />
              <div className="text-center my-8 highwrapper">
                <div className="font-[Sr] text-[16px] mb-2 text-green-300">Max Fear, UW</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers67uw.map((ite) => (
                    <div className="flex flex-col gap-1 items-center min-w-25 bg-linear-to-t from-[#131111] to-green-300 text-gray-400 rounded p-2 px-1 high">
                      <div className="relative w-10 h-10">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full mask mask-hexagon egg"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-10 h-10 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Sr] text-[16px] mb-2 text-green-300">65 Fear, UW</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers65uw.map((ite) => (
                    <div className="flex gap-1 items-center min-w-25 bg-black/50 text-gray-400 rounded p-1 px-2">
                      <div className="relative w-7 h-7">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-7 h-7 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Sr] text-[16px] mb-2 text-green-300">62 Fear, UW</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers62uw.map((ite) => (
                    <div className="flex gap-1 items-center min-w-25 bg-black/50 text-gray-400 rounded p-1 px-2">
                      <div className="relative w-7 h-7">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-7 h-7 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* AA  */}
              <Divider />
              <div className="text-center my-8 highwrapper">
                <div className="font-[Sr] text-[16px] mb-2 text-yellow-300">65 Fear, All Aspects, Surface</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allaspect65s.map((ite) => (
                    <div className="flex flex-col gap-1 items-center min-w-25 bg-linear-to-t from-[#131111] to-yellow-200 text-gray-400 rounded p-2 px-1 high">
                      <div className="relative w-10 h-10">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full mask mask-hexagon egg"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-10 h-10 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Sr] text-[16px] mb-2 text-yellow-300">62 Fear, All Aspects, Surface</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allaspect62s.map((ite) => (
                    <div className="flex gap-1 items-center min-w-25 bg-black/50 text-gray-400 rounded p-1 px-2">
                      <div className="relative w-7 h-7">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-7 h-7 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Sr] text-[16px] mb-2 text-yellow-300">50 Fear, All Aspects, Surface</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allaspect50s.map((ite) => (
                    <div className="flex gap-1 items-center min-w-25 bg-black/50 text-gray-400 rounded p-1 px-2">
                      <div className="relative w-7 h-7">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-7 h-7 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Divider />
              <div className="text-center my-8 highwrapper">
                <div className="font-[Sr] text-[16px] mb-2 text-green-300">65 Fear, All Aspects, UW</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allaspect65uw.map((ite) => (
                    <div className="flex flex-col gap-1 items-center min-w-25 bg-linear-to-t from-[#131111] to-green-300 text-gray-400 rounded p-2 px-1 high">
                      <div className="relative w-10 h-10">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full mask mask-hexagon egg"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-10 h-10 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Sr] text-[16px] mb-2 text-green-300">62 Fear, All Aspects, UW</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allaspect62uw.map((ite) => (
                    <div className="flex gap-1 items-center min-w-25 bg-black/50 text-gray-400 rounded p-1 px-2">
                      <div className="relative w-7 h-7">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-7 h-7 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Sr] text-[16px] mb-2 text-green-300">50 Fear, All Aspects, UW</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allaspect50uw.map((ite) => (
                    <div className="flex gap-1 items-center min-w-25 bg-black/50 text-gray-400 rounded p-1 px-2">
                      <div className="relative w-7 h-7">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-7 h-7 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Divider />
              {/* Dream */}
              <div className="text-center my-8 highwrapper">
                <div className="font-[Sr] text-[16px] mb-2 text-purple-400">Max Fear, Dream Dive</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers67d.map((ite) => (
                    <div className="flex flex-col gap-1 items-center min-w-25 bg-linear-to-t from-[#131111] to-purple-300 text-gray-400 rounded p-2 px-1 high">
                      <div className="relative w-10 h-10">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full mask mask-hexagon egg"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-10 h-10 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Sr] text-[16px] mb-2 text-purple-400">65 Fear, Dream Dive</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers65d.map((ite) => (
                    <div className="flex gap-1 items-center min-w-25 bg-black/50 text-gray-400 rounded p-1 px-2">
                      <div className="relative w-7 h-7">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-7 h-7 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Sr] text-[16px] mb-2 text-purple-400">62 Fear, Dream Dive</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers62d.map((ite) => (
                    <div className="flex gap-1 items-center min-w-25 bg-black/50 text-gray-400 rounded p-1 px-2">
                      <div className="relative w-7 h-7">
                        <img
                          src={`/Avatar/${ite.toLowerCase()}.webp`}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-7 h-7 rounded-full bg-[#28282b] text-white items-center justify-center hidden truncate text-[10px]">
                          {ite.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="font-[Ale]">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Divider />
            </>
          )}
        </PageBlock>
      </div>
    </main>
  );
}
