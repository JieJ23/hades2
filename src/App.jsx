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

function getWordOfDay(wordA, wordB) {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return dayOfYear % 2 === 0 ? wordA : wordB;
}

const word = getWordOfDay("Typhon", "Chronos");

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

function AvatarItem({ obj, ind, categoryRegion, category, addTextColor, addCategoryClasses }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`${ind === 0 && `aura aura-dual`} ${addTextColor(categoryRegion[category])}`}>
      <div className="rounded font-[Ale] bg-[#0e0c12] flex flex-col justify-center items-center pt-4 min-w-40 min-h-15 relative">
        <div
          className={`absolute top-0 right-0 h-full w-full bg-no-repeat bg-top bg-cover scale-[105%] ${addCategoryClasses(categoryRegion[category])}`}
          style={{ backgroundImage: `url(/red.png)` }}
        />
        <div className={`relative w-10 h-10 shrink-0`}>
          {!imgError && (
            <img
              src={`/Avatar/${obj.nam.toLowerCase()}.webp`}
              alt="Avatar"
              loading="lazy"
              className="w-10 h-10 rounded-full p-1 egg"
              draggable={false}
              onError={() => setImgError(true)}
            />
          )}
          {imgError && (
            <div className="w-10 h-10 rounded-full bg-[#28282b] text-white flex items-center justify-center truncate -translate-x-[2px]">
              {obj.nam.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div className="truncate z-20">
          <div>{obj.nam}</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { posts, loader } = useData();
  const container = useRef(null);
  const containerRef = useRef(null);
  const lastSpawn = useRef(0);
  const [category, setCategory] = useState(0);

  useGSAP(
    () => {
      gsap.to(".my-text", {
        backgroundPosition: "300% 0%",
        duration: 4,
        repeat: -1,
        ease: "none",
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
    { scope: container, dependencies: [posts, category] },
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
  // Base Higher + Filter Data — heavy pipeline, only depends on orderData (i.e. posts),
  // not on `category`, so memoize it to avoid recomputing on every category click.
  const displayCategory = useMemo(() => {
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
    const fear65AAU = fear65Under.filter((obj) => obj.completed === true).filter((item) => !nameMaxU.has(item.nam));
    const fear65AAD = fear65Dream.filter((obj) => obj.completed === true).filter((item) => !nameMaxD.has(item.nam));

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
    //

    const surface = [
      maxFearSurface,
      maxFearSurfaceAA,
      fear65AAS,
      fear62AAS,
      fear50AAS,
      finalized65FearS,
      finalized62FearS,
    ];
    const underworld = [
      maxFearUnder,
      maxFearUnderAA,
      fear65AAU,
      fear62AAU,
      fear50AAU,
      finalized65FearU,
      finalized62FearU,
    ];
    const dream = [maxFearDream, maxFearDreamAA, fear65AAD, fear62AAD, fear50AAD, finalized65FearD, finalized62FearD];
    return [underworld, surface, dream];
  }, [orderData]);

  const displayCurrentCategory = displayCategory[category];
  const categoryRegion = ["Underworld", "Surface", "Dream"];
  const subCategory = [
    "Max Fear",
    "Max Fear All Aspects",
    "65 Fear All Aspects",
    "62 Fear All Aspects",
    "50 Fear All Aspects",
    "65 Fear",
    "62 Fear",
  ];
  const addCategoryClasses = (region) => {
    switch (region) {
      case "Surface":
        return `hue-rotate-100`;
      case "Underworld":
        return `hue-rotate-140`;
      case "Dream":
        return `hue-rotate-0`;
    }
  };
  const addTextColor = (region) => {
    switch (region) {
      case "Surface":
        return `text-yellow-300`;
      case "Underworld":
        return `text-green-300`;
      case "Dream":
        return `text-purple-400`;
    }
  };
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
                className="hover-target font-bold text-[50px] sm:text-[58px] md:text-[64px] uppercase cursor-default select-none font-[Sr] gap-4 gap-x-4 my-text flex flex-col md:flex-row justify-center items-center bg-[linear-gradient(90deg,#ff0080,#7928ca,#2afadf,#ff0080)] bg-[length:300%_100%] bg-clip-text text-transparent"
              >
                <div>Death</div>
                <div>To</div>
                <div>{word}</div>
              </div>
            </div>
          </div>
          {/*  */}
          {loader ? (
            <Loading />
          ) : (
            <div>
              {
                <div className="flex gap-2 justify-center my-10">
                  {categoryRegion.map((region, index) => (
                    <img
                      src={`/${region}.png`}
                      className={`border border-white/10 size-12 p-1 rounded-xl cursor-pointer ${category === index ? `bg-[#00ffaa]` : `bg-black`}`}
                      alt="Region"
                      onClick={() => setCategory(index)}
                    />
                  ))}
                </div>
              }
              {/* ------------------------------- */}
              {displayCurrentCategory.map((arr, ind) => (
                <div className="mb-16 rounded" key={subCategory[ind] + ind}>
                  <div className="px-4 md:text-start text-center">
                    <div
                      className={`font-[Sr] text-[20px] md:text-[24px] leading-none ${addTextColor(categoryRegion[category])}`}
                    >
                      {subCategory[ind]}
                    </div>
                    {ind === 0 && <div className="font-[Ale] text-gray-300">Unseeded and Unmodded</div>}
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                    {[...arr]
                      .sort((a, b) => a.nam.localeCompare(b.nam))
                      .map((obj) => (
                        <AvatarItem
                          key={obj.nam}
                          obj={obj}
                          ind={ind}
                          categoryRegion={categoryRegion}
                          category={category}
                          addTextColor={addTextColor}
                          addCategoryClasses={addCategoryClasses}
                        />
                      ))}
                  </div>
                </div>
              ))}
              {/* ------------------------------- */}
            </div>
          )}
        </PageBlock>
      </div>
    </main>
  );
}
