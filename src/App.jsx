import SideNav from "./Comp/Sidebar";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";

import { useData } from "./Hook/DataFetch";
import Loading from "./Hook/Loading";
import { bundleData } from "./Data/DataBundle";
// Utility
import { sToA, findValue, orderMap, parseTimetoms, getPoolColor, getYTid } from "./Data/Misc";
import { p9boons } from "./Data/P9BoonObj";
import { Link } from "react-router-dom";
import { h2AspectOrder } from "./Data/Misc";

import { useMemo, useState, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { randomImg, getRandomString, imgTextStore } from "./RanImgLogic";

gsap.registerPlugin(useGSAP); // Required for proper cleanup [citation:3]

export default function App() {
  const { posts, loader } = useData();
  const container = useRef(null);
  const [random, setRandom] = useState(null);

  const randomImgGen = getRandomString(randomImg);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.to(".starter", { opacity: 1, duration: 1 })
        .from(".img", { opacity: 0, duration: 2 })
        .fromTo(".imgText", { opacity: 0, duration: 2 }, { opacity: 1, y: -50, duration: 2 })
        .to("img", { opacity: 0, duration: 2 }, "<=3")
        .to(".starter", { opacity: 0, duration: 1, autoAlpha: 0 })
        .to(".memo", {
          height: 0,
          ease: "power3.inOut",
          autoAlpha: 0,
          stagger: { each: 0.1, from: "center" },
          duration: 2,
        })
        .to(
          ".memo2",
          { height: 0, ease: "power4.inOut", autoAlpha: 0, stagger: { each: 0.1, from: "center" }, duration: 2 },
          "<",
        )
        .from(".parentBox", { display: "none", duration: 2, opacity: 0 });
    },
    { scope: container },
  );

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

  // 67 Max
  const maxFearRuns = [...runs67s, ...runs67uw];
  const maxFearData = Object.entries(
    maxFearRuns.reduce((acc, item) => {
      let target = item.nam;
      acc[target] = (acc[target] || 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .filter((arr) => arr[1] > 1);

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
  const uwAspects = [];
  const surfaceAspect = [];
  for (let i = 0; i < h2AspectOrder.length; i++) {
    if (under67.some((obj) => obj.asp === h2AspectOrder[i])) {
      uwAspects.push(h2AspectOrder[i]);
    } else {
      uwAspects.push("Slot1");
    }
    if (surface67.some((obj) => obj.asp === h2AspectOrder[i])) {
      surfaceAspect.push(h2AspectOrder[i]);
    } else {
      surfaceAspect.push("Slot1");
    }
  }

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

  // Speed 62
  const speedRun = orderData
    .filter((obj) => obj.fea == 62)
    .filter((obj) => obj.des && obj.des.includes("#usum") && parseTimetoms(obj.tim) <= 72000);

  const sub1060 = [
    ...new Set(
      speedRun
        .filter((obj) => obj.des && obj.des.includes("#usum") && parseTimetoms(obj.tim) <= 60000)
        .map((obj) => obj.nam),
    ),
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const sub1160 = [
    ...new Set(
      speedRun
        .filter((obj) => obj.des && obj.des.includes("#usum") && parseTimetoms(obj.tim) <= 66000)
        .map((obj) => obj.nam),
    ),
  ]
    .filter((item) => ![...sub1060].includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const sub1260 = [...new Set(speedRun.map((obj) => obj.nam))]
    .filter((item) => ![...sub1160, ...sub1060].includes(item))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  // Max Fear Timeline
  const orderMaxFear = maxFearClears
    .filter((obj) => obj.loc === "Underworld" || obj.loc === "Surface")
    .sort((a, b) => new Date(b.dat) - new Date(a.dat));

  return (
    <main
      className="h-full min-h-lvh relative overflow-hidden text-[12px] md:text-[14px] font-[Ale] select-none"
      ref={container}
    >
      <div
        className={`absolute starter opacity-0 inset-0 flex items-center justify-center z-40 text-white text-[14px] md:text-[20px]`}
      >
        <div className="relative h-full w-full">
          <img
            src={`/imgRandom/${randomImgGen}.webp`}
            alt="Images"
            className="absolute bottom-0 inset-x-0 h-[70%] w-auto object-cover object-center mx-auto img opacity-50"
          />
          <span className="absolute inset-0 font-[Exo] flex justify-center items-center text-center mx-auto imgText z-40 px-4 w-[80%]">
            {getRandomString(imgTextStore(randomImgGen))}
          </span>
        </div>
      </div>

      <>
        <div className="absolute memo top-0 left-0 w-[6.8%] h-[52%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-0 w-[6.8%] h-[48%] bg-black z-30"></div>

        {/* Pair 2 - top 40%, bottom 60% (mirrors Pair 14) */}
        <div className="absolute memo top-0 left-[6.666%] w-[6.8%] h-[58%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[6.666%] w-[6.8%] h-[42%] bg-black z-30"></div>

        {/* Pair 3 - top 45%, bottom 55% (mirrors Pair 13) */}
        <div className="absolute memo top-0 left-[13.332%] w-[6.8%] h-[48%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[13.332%] w-[6.8%] h-[52%] bg-black z-30"></div>

        {/* Pair 4 - top 48%, bottom 52% (mirrors Pair 12) */}
        <div className="absolute memo top-0 left-[19.998%] w-[6.8%] h-[59%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[19.998%] w-[6.8%] h-[41%] bg-black z-30"></div>

        {/* Pair 5 - top 50%, bottom 50% (mirrors Pair 11) */}
        <div className="absolute memo top-0 left-[26.664%] w-[6.8%] h-[45%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[26.664%] w-[6.8%] h-[55%] bg-black z-30"></div>

        {/* Pair 6 - top 52%, bottom 48% (mirrors Pair 10) */}
        <div className="absolute memo top-0 left-[33.33%] w-[6.8%] h-[54%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[33.33%] w-[6.8%] h-[46%] bg-black z-30"></div>

        {/* Pair 7 - top 55%, bottom 45% (mirrors Pair 9) */}
        <div className="absolute memo top-0 left-[39.996%] w-[6.8%] h-[59%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[39.996%] w-[6.8%] h-[41%] bg-black z-30"></div>

        {/* Pair 8 - top 60%, bottom 40% (center - self-mirrored if desired) */}
        <div className="absolute memo top-0 left-[46.662%] w-[6.8%] h-[53%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[46.662%] w-[6.8%] h-[47%] bg-black z-30"></div>

        {/* Pair 9 - top 45%, bottom 55% (mirrors Pair 7) */}
        <div className="absolute memo top-0 left-[53.328%] w-[6.8%] h-[58%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[53.328%] w-[6.8%] h-[42%] bg-black z-30"></div>

        {/* Pair 10 - top 48%, bottom 52% (mirrors Pair 6) */}
        <div className="absolute memo top-0 left-[59.994%] w-[6.8%] h-[40%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[59.994%] w-[6.8%] h-[60%] bg-black z-30"></div>

        {/* Pair 11 - top 50%, bottom 50% (mirrors Pair 5) */}
        <div className="absolute memo top-0 left-[66.66%] w-[6.8%] h-[47%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[66.66%] w-[6.8%] h-[53%] bg-black z-30"></div>

        {/* Pair 12 - top 52%, bottom 48% (mirrors Pair 4) */}
        <div className="absolute memo top-0 left-[73.326%] w-[6.8%] h-[55%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[73.326%] w-[6.8%] h-[45%] bg-black z-30"></div>

        {/* Pair 13 - top 55%, bottom 45% (mirrors Pair 3) */}
        <div className="absolute memo top-0 left-[79.992%] w-[6.8%] h-[48%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[79.992%] w-[6.8%] h-[52%] bg-black z-30"></div>

        {/* Pair 14 - top 60%, bottom 40% (mirrors Pair 2) */}
        <div className="absolute memo top-0 left-[86.658%] w-[6.8%] h-[44%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[86.658%] w-[6.8%] h-[56%] bg-black z-30"></div>

        {/* Pair 15 - top 70%, bottom 30% (mirrors Pair 1) */}
        <div className="absolute memo top-0 left-[93.324%] w-[6.8%] h-[52%] bg-black z-30"></div>
        <div className="absolute memo2 bottom-0 left-[93.324%] w-[6.8%] h-[48%] bg-black z-30"></div>
      </>
      <Background />
      <div className="parentBox">
        <SideNav />
        {loader ? (
          <Loading />
        ) : (
          <>
            <div
              className="text-center font-[Exo] p-2 max-w-[1200px] mx-auto md:text-[16px] mt-4"
              style={{
                backgroundImage: `url('/Misc/fl3.webp'),url('/Misc/fr3.webp'),url('/Misc/fm3.webp')`,
                backgroundPosition: "left center, right center, center center",
                backgroundRepeat: "no-repeat, no-repeat, repeat",
                backgroundSize: "contain, contain, contain",
              }}
            >
              Community Max Fear Conquest
            </div>
            <div className="flex flex-col md:flex-row justify-center max-w-[1200px] mx-auto bg-gradient-to-br from-green-300/40 via-black/50 to-yellow-300/40 rounded-b-xl relative">
              <div
                className="absolute top-0 left-0 w-full h-full -z-10"
                style={{
                  borderStyle: "solid", // Required
                  borderWidth: "15px",
                  borderImage: "url('/dynamic.png') 30 stretch",
                }}
              />
              <div className="w-full flex flex-wrap justify-center mx-auto p-4">
                {uwAspects.map((item) => (
                  <img
                    src={item === "Slot1" ? `/Slot1.png` : `/GUI_Card/c${item}.png`}
                    alt="Aspects"
                    className={`w-13 md:w-15 h-auto ${item === "Slot1" ? `opacity-50` : ``}`}
                  />
                ))}
              </div>
              <div className="w-full flex flex-wrap justify-center mx-auto p-4">
                {surfaceAspect.map((item) => (
                  <img
                    src={item == "Slot1" ? `/Slot1.png` : `/GUI_Card/c${item}.png`}
                    alt="Aspects"
                    className={`w-13 md:w-15 h-auto ${item === "Slot1" ? `opacity-50` : ``}`}
                  />
                ))}
              </div>
            </div>
            <div className="max-w-[1400px] mx-auto p-4">
              {/* Maxxing */}
              <div className="text-center my-8">
                <div className="font-[Exo] text-[18px] mb-2 text-pink-400">Fear Maxing</div>
                <div className="flex justify-center gap-y-2 flex-wrap">
                  {maxFearData.map((arr) => (
                    <div className="bg-gradient-to-br from-[#de0ca3b0] to-[#0a12b0] text-white rounded px-2 py-1 w-25 text-[12px] aspect-square mask mask-hexagon flex items-center justify-center relative flex-col">
                      <img
                        src={`/Avatar/${arr[0].toLowerCase()}.webp`}
                        alt="Avatar"
                        className="size-10 mask mask-decagon"
                        onError={(e) => {
                          e.target.src = "/Avatar/default.jpg";
                        }}
                      />
                      <div className="rounded px-1 truncate w-20">{arr[0]}</div>
                      <div className="text-[18px] font-[Aleg] italic">{arr[1]}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Surface  */}
              <img src="/divider.png" alt="Divider" className="w-full max-w-[600px] mx-auto my-8" />
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-yellow-300">Completed Max Fear, Surface</div>
                <div className="flex justify-center gap-y-2 flex-wrap">
                  {allplayers67s.map((ite) => (
                    <div className="bg-gradient-to-br from-[#d2db38] to-[#620f0f] text-white rounded px-2 py-1 w-23 text-[12px] aspect-square mask mask-hexagon flex items-center justify-center relative flex-col">
                      <img
                        src={`/Avatar/${ite.toLowerCase()}.webp`}
                        alt="Avatar"
                        className="size-10 mask mask-decagon"
                        onError={(e) => {
                          e.target.src = "/Avatar/default.jpg";
                        }}
                      />
                      <div className="rounded px-1 truncate w-20">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-yellow-300">Completed 65 Fear, Surface</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers65s.map((ite) => (
                    <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-yellow-300">Completed 62 Fear, Surface</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers62s.map((ite) => (
                    <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                  ))}
                </div>
              </div>
              {/* Underworld */}
              <img src="/divider.png" alt="Divider" className="w-full max-w-[600px] mx-auto my-8" />
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-green-300">Completed Max Fear, UW</div>
                <div className="flex justify-center gap-y-2 flex-wrap">
                  {allplayers67uw.map((ite) => (
                    <div className="bg-gradient-to-br from-[#18946b] to-[#240458] text-white rounded px-2 py-1 w-23 text-[12px] aspect-square mask mask-hexagon flex items-center justify-center relative flex-col">
                      <img
                        src={`/Avatar/${ite.toLowerCase()}.webp`}
                        alt="Avatar"
                        className="size-10 mask mask-decagon"
                        onError={(e) => {
                          e.target.src = "/Avatar/default.jpg";
                        }}
                      />
                      <div className="rounded px-1 truncate w-20">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-green-300">Completed 65 Fear, UW</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers65uw.map((ite) => (
                    <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-green-300">Completed 62 Fear, UW</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers62uw.map((ite) => (
                    <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                  ))}
                </div>
              </div>
              {/* AA  */}
              <img src="/divider.png" alt="Divider" className="w-full max-w-[600px] mx-auto my-8" />
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-yellow-300">
                  Completed 65 Fear, All Aspects, Surface
                </div>
                <div className="flex justify-center gap-y-2 flex-wrap">
                  {allaspect65s.map((ite) => (
                    <div className="bg-gradient-to-br from-[#d2db38] to-[#620f0f] text-white rounded px-2 py-1 w-23 text-[12px] aspect-square mask mask-hexagon flex items-center justify-center relative flex-col">
                      <img
                        src={`/Avatar/${ite.toLowerCase()}.webp`}
                        alt="Avatar"
                        className="size-10 mask mask-decagon"
                        onError={(e) => {
                          e.target.src = "/Avatar/default.jpg";
                        }}
                      />
                      <div className="rounded px-1 truncate w-20">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-yellow-300">
                  Completed 62 Fear, All Aspects, Surface
                </div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allaspect62s.map((ite) => (
                    <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-yellow-300">
                  Completed 50 Fear, All Aspects, Surface
                </div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allaspect50s.map((ite) => (
                    <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                  ))}
                </div>
              </div>
              <img src="/divider.png" alt="Divider" className="w-full max-w-[600px] mx-auto my-8" />
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-green-300">Completed 65 Fear, All Aspects, UW</div>
                <div className="flex justify-center gap-y-2 flex-wrap">
                  {allaspect65uw.map((ite) => (
                    <div className="bg-gradient-to-br from-[#18946b] to-[#270957] text-white rounded px-2 py-1 w-23 text-[12px] aspect-square mask mask-hexagon flex items-center justify-center relative flex-col">
                      <img
                        src={`/Avatar/${ite.toLowerCase()}.webp`}
                        alt="Avatar"
                        className="size-10 mask mask-decagon"
                        onError={(e) => {
                          e.target.src = "/Avatar/default.jpg";
                        }}
                      />
                      <div className="rounded px-1 truncate w-20">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-green-300">Completed 62 Fear, All Aspects, UW</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allaspect62uw.map((ite) => (
                    <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-green-300">Completed 50 Fear, All Aspects, UW</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allaspect50uw.map((ite) => (
                    <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                  ))}
                </div>
              </div>
              <img src="/divider.png" alt="Divider" className="w-full max-w-[600px] mx-auto my-8" />
              {/* Dream */}
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-purple-400">Completed Max Fear, Dream Dive</div>
                <div className="flex justify-center gap-y-2 flex-wrap">
                  {allplayers67d.map((ite) => (
                    <div className="bg-gradient-to-br from-[#8c40b5] to-[#440512] text-white rounded px-2 py-1 w-23 text-[12px] aspect-square mask mask-hexagon flex items-center justify-center relative flex-col">
                      <img
                        src={`/Avatar/${ite.toLowerCase()}.webp`}
                        alt="Avatar"
                        className="size-10 mask mask-decagon"
                        onError={(e) => {
                          e.target.src = "/Avatar/default.jpg";
                        }}
                      />
                      <div className="rounded px-1 truncate w-20">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-purple-400">Completed 65 Fear, Dream Dive</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers65d.map((ite) => (
                    <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-purple-400">Completed 62 Fear, Dream Dive</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {allplayers62d.map((ite) => (
                    <div className="bg-white/10 text-white rounded px-2 py-1">{ite}</div>
                  ))}
                </div>
              </div>
              <img src="/divider.png" alt="Divider" className="w-full max-w-[600px] mx-auto my-8" />
              {/* Speed */}
              {/* <div className="text-center my-8">
              <div className="font-[Exo] text-[16px] mb-2 text-red-400">Completed 62+ Fear, Sub 10 Mins</div>
              <div className="flex justify-center flex-wrap">
                {sub1060.map((ite) => (
                  <div className="bg-gradient-to-br from-[#e14628] to-[#131111] text-white rounded px-2 py-1 w-23 text-[12px] aspect-square mask mask-hexagon flex items-center justify-center relative flex-col">
                    <img
                      src={`/Avatar/${ite.toLowerCase()}.webp`}
                      alt="Avatar"
                      className="size-10 mask mask-decagon"
                      onError={(e) => {
                        e.target.src = "/Avatar/default.jpg";
                      }}
                    />
                    <div className="rounded px-1 truncate w-20">{ite}</div>
                  </div>
                ))}
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-red-400">Completed 62+ Fear, Sub 11 Mins</div>
                <div className="flex justify-center flex-wrap">
                  {sub1160.map((ite) => (
                    <div className="bg-gradient-to-br from-[#e14628] to-[#131111] text-white rounded px-2 py-1 w-23 text-[12px] aspect-square mask mask-hexagon flex items-center justify-center relative flex-col">
                      <img
                        src={`/Avatar/${ite.toLowerCase()}.webp`}
                        alt="Avatar"
                        className="size-10 mask mask-hexagon"
                        onError={(e) => {
                          e.target.src = "/Avatar/default.jpg";
                        }}
                      />
                      <div className="rounded px-1 truncate w-20">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center my-8">
                <div className="font-[Exo] text-[16px] mb-2 text-red-400">Completed 62+ Fear, Sub 12 Mins</div>
                <div className="flex justify-center flex-wrap">
                  {sub1260.map((ite) => (
                    <div className="bg-gradient-to-br from-[#e14628] to-[#131111] text-white rounded px-2 py-1 w-23 text-[12px] aspect-square mask mask-hexagon flex items-center justify-center relative flex-col">
                      <img
                        src={`/Avatar/${ite.toLowerCase()}.webp`}
                        alt="Avatar"
                        className="size-10 mask mask-hexagon"
                        onError={(e) => {
                          e.target.src = "/Avatar/default.jpg";
                        }}
                      />
                      <div className="rounded px-1 truncate w-20">{ite}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
              {/* <img src="/divider.png" alt="Divider" className="w-full max-w-[600px] mx-auto my-8" /> */}
              <div className="font-[Exo] text-[20px] text-green-400 text-center mb-2">Max Fear Timeline</div>
              <div className="lg:max-h-[250px] h-[500px] overflow-auto border-white/20 border-1 py-8 lg:py-4 p-2 bg-black/80 rounded">
                <ul className="timeline timeline-vertical lg:timeline-horizontal">
                  {orderMaxFear.map((obj, index) => (
                    <li>
                      <hr />
                      <div className="timeline-start bg-white text-black px-1 rounded">{obj.dat.slice(0, 10)}</div>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box rounded max-w-[200px] text-[13px] flex flex-wrap justify-center gap-1 leading-tight text-gray-300">
                        <span className="text-orange-400">{obj.nam}</span>
                        <span>Cleared Max Fear</span>
                        <span>{obj.asp},</span>
                        <span className={obj.loc === "Underworld" ? `text-green-400` : `text-[yellow]`}>{obj.loc}</span>
                      </div>

                      <hr />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        <Footer />
      </div>
    </main>
  );
}
