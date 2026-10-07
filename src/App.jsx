import { useData } from "./Hook/DataFetch";
import { usePfp } from "./Hook/PfpFetch";
import Loading from "./Hook/Loading";
import { bundleData } from "./Data/DataBundle";
import { Link } from "react-router-dom";

import { memo, useMemo, useState, useRef } from "react";

import PageBlock from "./Block/PageBlock";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { p9boons } from "./Data/P9BoonObj";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*  Constants (module level so they are created once, not on every render)    */
/* -------------------------------------------------------------------------- */

const DEFAULT_TEXT = "Death to Chronos";
const ASPECT_COUNT = 24;

// Order matches the order of the arrays returned by buildDisplayCategory
const CATEGORY_REGION = ["Underworld", "Surface", "Dream"];
const REGION_INDEX = { Underworld: 0, Surface: 1, Dream: 2 };

const SUB_CATEGORY = [
  "Max Fear",
  "Max Fear All Aspects",
  "65 Fear All Aspects",
  "62 Fear All Aspects",
  "50 Fear All Aspects",
  "65 Fear",
  "62 Fear",
];

const P9_KEYS = Object.keys(p9boons);

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

/* -------------------------------------------------------------------------- */
/*  Data pipeline                                                             */
/* -------------------------------------------------------------------------- */

// Highest tier first. Each tier is a subset of the ones below it.
const TIERS = [
  (fea, e) => fea >= 67 && e.des.includes("#usum"), // 0: Max
  (fea) => fea >= 65, //                               1: 65
  (fea) => fea >= 62, //                               2: 62
  (fea) => fea >= 50, //                               3: 50
];

const collator = new Intl.Collator();
const byName = (a, b) => collator.compare(a.nam, b.nam);

/**
 * One pass over the entries, then one pass over the (small) per-player maps.
 * Returns [underworld, surface, dream], each being:
 *   [Max Fear, Max Fear AA, 65 AA, 62 AA, 50 AA, 65 Fear, 62 Fear]
 * Rows are { nam } and already sorted by name.
 * A player appears only in the highest tier where they qualify.
 */
function buildDisplayCategory(entries) {
  // buckets[region][tier] = Map<playerName, Set<aspect>>
  const buckets = CATEGORY_REGION.map(() => TIERS.map(() => new Map()));

  for (const e of entries) {
    const regionBuckets = buckets[REGION_INDEX[e.loc] ?? 2]; // anything else = Dream
    const fea = +e.fea;
    for (let t = 0; t < TIERS.length; t++) {
      if (!TIERS[t](fea, e)) continue;
      const players = regionBuckets[t];
      let aspects = players.get(e.nam);
      if (!aspects) players.set(e.nam, (aspects = new Set()));
      aspects.add(e.asp);
    }
  }

  return buckets.map((tiers) => {
    const claimedAny = new Set(); // had any run at a higher tier
    const claimedAA = new Set(); // completed all aspects at a higher tier
    const any = [];
    const aa = [];

    tiers.forEach((players) => {
      const anyRows = [];
      const aaRows = [];
      for (const [nam, aspects] of players) {
        const row = { nam };
        const completed = aspects.size === ASPECT_COUNT;
        if (!claimedAny.has(nam)) anyRows.push(row);
        if (completed && !claimedAA.has(nam)) aaRows.push(row);
        claimedAny.add(nam);
        if (completed) claimedAA.add(nam);
      }
      any.push(anyRows.sort(byName));
      aa.push(aaRows.sort(byName));
    });

    return [any[0], aa[0], aa[1], aa[2], aa[3], any[1], any[2]];
  });
}

/* -------------------------------------------------------------------------- */
/*  Components                                                                */
/* -------------------------------------------------------------------------- */

const AvatarItem = memo(function AvatarItem({ name, ind, region, profileImg }) {
  const bgClasses = addCategoryClasses(region);
  return (
    <div className={`${ind <= 1 ? "aura aura-dual" : ""} ${addTextColor(region)}`}>
      <div className="rounded font-[Ale] bg-[#0e0c12] flex flex-col justify-center items-center pt-4 min-w-40 h-full min-h-25 relative overflow-hidden">
        <div
          className={`absolute top-0 right-0 h-full w-full bg-no-repeat bg-top bg-cover scale-[105%] ${bgClasses}`}
          style={{ backgroundImage: `url(/red.png)` }}
        />
        <div
          className={`absolute rotate-180 top-0 right-0 h-full w-full bg-no-repeat bg-top bg-cover scale-[105%] ${bgClasses}`}
          style={{ backgroundImage: `url(/red.png)` }}
        />
        <div className="absolute top-6 right-4 flex flex-col items-center gap-1.5">
          {profileImg && profileImg[2] && (
            <Link to={profileImg[2]} target="_blank">
              <img src="/youtube.png" alt="Youtube" className="size-4.5 rounded" />
            </Link>
          )}
          {profileImg && profileImg[3] && (
            <Link to={profileImg[3]} target="_blank">
              <img src="/twitch.png" alt="Twitch" className="size-4.5 rounded" />
            </Link>
          )}
        </div>
        <div className={`relative w-10 h-10 shrink-0`}>
          {profileImg ? (
            <img
              src={`${profileImg[0]}`}
              alt="Avatar"
              loading="lazy"
              className="w-10 h-10 rounded-full p-1 egg"
              draggable={false}
            />
          ) : (
            <img
              src="/hover/Melinoe.png"
              alt="Avatar"
              loading="lazy"
              className="w-10 h-10 rounded-full p-1 egg drop-shadow-[0_0_6px_black]"
              draggable={false}
            />
          )}
        </div>
        <div className="truncate z-20">{name}</div>
        {profileImg && (
          <div className="font-[Ale] text-[13px] my-1 mb-4 z-40 max-w-30 text-center text-white">
            {profileImg[1].replace("$#c!", "")}
          </div>
        )}
      </div>
    </div>
  );
});

export default function App() {
  const { posts, loader } = useData();
  const { pfp, pfploader } = usePfp();
  const container = useRef(null);
  const containerRef = useRef(null);
  const lastSpawn = useRef(0);
  const [category, setCategory] = useState(0);

  const textRef = useRef(null);
  const [displayWords, setDisplayWords] = useState(DEFAULT_TEXT.split(" "));

  useGSAP(
    () => {
      gsap.to(".my-text", {
        backgroundPosition: "300% 0%",
        duration: 4,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: container }, // no dependencies — set once, runs forever
  );

  useGSAP(
    () => {
      if (loader || pfploader) return;
      const eggs = gsap.utils.toArray(".egg");
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
    { scope: container, dependencies: [posts, category, loader, pfploader] },
  );

  const handleMouseMove = (e) => {
    const now = Date.now();
    if (now - lastSpawn.current < 50) return; // ms between spawns, higher = slower
    lastSpawn.current = now;

    if (!containerRef.current) return;

    const randomIcon = P9_KEYS[Math.floor(Math.random() * P9_KEYS.length)];
    const img = document.createElement("img");
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
        y: gsap.utils.random(-80, -200), // negative = upward
        x: gsap.utils.random(-50, 50),
        rotation: gsap.utils.random(-90, 90),
        opacity: 1,
        ease: "power2.out", // decelerates as it rises
      },
    ).to(img, {
      // Stage 2: fall down and fade
      duration: gsap.utils.random(0.8, 1.4),
      y: gsap.utils.random(80, 140), // positive = downward (relative to stage 1 end)
      x: gsap.utils.random(-30, 30),
      rotation: gsap.utils.random(-180, 180),
      opacity: 0,
      ease: "power4.in", // accelerates as it falls (gravity feel)
    });
  };

  // Single pass over all entries; only recomputed when `posts` changes,
  // not when `category` changes.
  const displayCategory = useMemo(() => buildDisplayCategory([...bundleData, ...posts]), [posts]);

  const displayCurrentCategory = displayCategory[category];
  const region = CATEGORY_REGION[category];

  const PfpObjects = useMemo(
    () => Object.fromEntries(pfp.map((item) => [item.Pfp, [item.ImgLink, item.Tag, item.YtLink, item.TLink]])),
    [pfp],
  );

  const fetchedText = PfpObjects?.H2Crossroads?.[1];

  useGSAP(
    () => {
      if (pfploader || !fetchedText) return;

      gsap
        .timeline()
        .to(textRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
          onComplete: () => setDisplayWords(fetchedText.split(" ")),
        })
        .from(textRef.current, {
          clipPath: "inset(0 50% 0 50%)",
          opacity: 1,
          duration: 2,
          ease: "power3.inOut",
        });
    },
    { dependencies: [pfploader, fetchedText], scope: textRef },
  );

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
                ref={textRef}
                onMouseMove={handleMouseMove}
                className="hover-target font-bold text-[clamp(32px,10vw,60px)] uppercase cursor-default select-none font-[Sr] gap-x-4 my-text flex flex-wrap flex-col md:flex-row justify-center items-center text-center bg-[linear-gradient(90deg,#ff0080,#7928ca,#2afadf,#ff0080)] bg-[length:300%_100%] bg-clip-text text-transparent "
              >
                {displayWords.join(" ")}
              </div>
            </div>
          </div>
          {/*  */}
          {loader || pfploader ? (
            <Loading />
          ) : (
            <div>
              <div className="flex gap-2 justify-center my-10">
                {CATEGORY_REGION.map((r, index) => (
                  <img
                    key={r}
                    src={`/${r}.png`}
                    className={`border border-white/10 size-12 p-1 rounded-xl cursor-pointer ${category === index ? `bg-[#00ffaa]` : `bg-black`}`}
                    alt={r}
                    onClick={() => setCategory(index)}
                  />
                ))}
              </div>
              {/* ------------------------------- */}
              {displayCurrentCategory.map((arr, ind) => (
                <div className="mb-16 rounded" key={SUB_CATEGORY[ind]}>
                  <div className="px-4 md:text-start text-center">
                    <div className={`font-[Sr] text-[20px] md:text-[24px] leading-none ${addTextColor(region)}`}>
                      {SUB_CATEGORY[ind]}
                    </div>
                    {ind === 0 && <div className="font-[Ale] text-gray-300">Unseeded and Unmodded</div>}
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1 p-1">
                    {arr.map((obj) => (
                      <AvatarItem
                        key={obj.nam}
                        name={obj.nam}
                        ind={ind}
                        region={region}
                        profileImg={PfpObjects[obj.nam]}
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
