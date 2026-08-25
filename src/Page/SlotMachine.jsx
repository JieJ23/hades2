// SlotMachine.jsx
//
// Usage:
//   import SlotMachine from "./SlotMachine";
//   <SlotMachine />                              // uses DEFAULT_ICONS
//   <SlotMachine icons={myIconsArray} />          // custom reel set
//
// Requires the "gsap" package (npm install gsap) and Tailwind set up
// in your project (this file has no CSS import — everything is
// Tailwind utility classes). The Cinzel / Oswald Google Fonts used
// below (font-[Ale] / font-sans here, mapped via Tailwind's default
// stacks) still need adding to your app's index.html <head> if you
// want the exact look from before:
//   <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet">

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import PageBlock from "../Block/PageBlock";

/* ------------------------------------------------------------------
   ICONS: swap this array to change what appears on the reels.
   Each entry needs a `symbol` (emoji or short glyph/text), a `name`
   (used for accessibility / win messages), and `points` — how much a
   spin featuring that icon is worth. Rarer/flashier icons are worth
   more; this is the single source of truth for both the reel
   contents and the scoring. Points also drive the color a landed
   name is shown in — see tierClasses() below.
------------------------------------------------------------------- */
const DEFAULT_ICONS = [
  { symbol: `Raven`, name: `Raki`, points: 7777 },
  { symbol: `Frog`, name: `Frinos`, points: 7777 },
  { symbol: `Polecat`, name: `Gale`, points: 7777 },
  { symbol: `Hound`, name: `Hecuba`, points: 7777 },
  { symbol: `Cat`, name: `Toula`, points: 7777 },
  { symbol: `cMelinoe Staff`, name: `Melinoe Staff`, points: 600 },
  { symbol: `cCirce`, name: `Circe`, points: 800 },
  { symbol: `cMomus`, name: `Momus`, points: 500 },
  { symbol: `cAnubis`, name: `Anubis`, points: 600 },
  { symbol: `cMelinoe Blades`, name: `Melinoe Blades`, points: 600 },
  { symbol: `cArtemis`, name: `Artemis`, points: 700 },
  { symbol: `cPan`, name: `Pan`, points: 999 },
  { symbol: `cMorrigan`, name: `Morrigan`, points: 888 },
  { symbol: `cMelinoe Axe`, name: `Melinoe Axe`, points: 500 },
  { symbol: `cCharon`, name: `Charon`, points: 600 },
  { symbol: `cThanatos`, name: `Thanatos`, points: 600 },
  { symbol: `cNergal`, name: `Nergal`, points: 800 },
  { symbol: `cMelinoe Flames`, name: `Melinoe Flames`, points: 700 },
  { symbol: `cEos`, name: `Eos`, points: 600 },
  { symbol: `cMoros`, name: `Moros`, points: 600 },
  { symbol: `cSupay`, name: `Supay`, points: 800 },
  { symbol: `cMelinoe Skull`, name: `Melinoe Skull`, points: 700 },
  { symbol: `cMedea`, name: `Medea`, points: 800 },
  { symbol: `cPersephone`, name: `Persephone`, points: 500 },
  { symbol: `cHel`, name: `Hel`, points: 500 },
  { symbol: `cMelinoe Coat`, name: `Melinoe Coat`, points: 700 },
  { symbol: `cNyx`, name: `Nyx`, points: 800 },
  { symbol: `cSelene`, name: `Selene`, points: 600 },
  { symbol: `cShiva`, name: `Shiva`, points: 700 },
  { symbol: "c0", name: `Empty Card`, points: 99 },
  { symbol: "c1", name: `Sorceress`, points: 1000 },
  { symbol: "c2", name: `Wayward`, points: 2000 },
  { symbol: "c3", name: `Huntress`, points: 3000 },
  { symbol: "c4", name: `Eternity`, points: 4000 },
  { symbol: "c5", name: `Moon`, points: 5000 },
  { symbol: "c6", name: `Furies`, points: 6000 },
  { symbol: "c7", name: `Persistence`, points: 700 },
  { symbol: "c8", name: `Messenger`, points: 800 },
  { symbol: "c9", name: `Unseen`, points: 900 },
  { symbol: "c10", name: `Night`, points: 1000 },
  { symbol: "c11", name: `Swift`, points: 1100 },
  { symbol: "c12", name: `Death`, points: 1200 },
  { symbol: "c13", name: `Centaur`, points: 1300 },
  { symbol: "c14", name: `Origination`, points: 1400 },
  { symbol: "c15", name: `Lovers`, points: 1500 },
  { symbol: "c16", name: `Enchantress`, points: 1600 },
  { symbol: "c17", name: `Boatman`, points: 1700 },
  { symbol: "c18", name: `Artificer`, points: 1800 },
  { symbol: "c19", name: `Excellence`, points: 1900 },
  { symbol: "c20", name: `Queen`, points: 2000 },
  { symbol: "c21", name: `Fates`, points: 2100 },
  { symbol: "c22", name: `Champions`, points: 2200 },
  { symbol: "c23", name: `Strength`, points: 2300 },
  { symbol: "c24", name: `Divinity`, points: 2400 },
  { symbol: "c25", name: `Judgment`, points: 2500 },
];

// Number of reels.
const REEL_COUNT = 5;

// The reel window resizes at different breakpoints, so the pixel
// height of one icon isn't a fixed constant — it's measured live from
// the rendered DOM instead. That keeps the spin math correct at every
// screen size without needing a hand-maintained constant.
const FALLBACK_ITEM_HEIGHT = 88;
// Copies of the icon set stacked in each reel strip. Must be generous:
// a spin travels (minLoops * icons.length + indexDelta) items, and the
// strip needs real rendered icons the whole way down or it scrolls
// through blank space. minLoops maxes out at 2 + REEL_COUNT (the last
// reel), so 12 loops leaves comfortable headroom regardless of how
// many icons are in play.
const REPEATS = 12;

// Point thresholds that decide which color a landed name shows up in.
// Tune these to match the actual spread of `points` values across
// your icon set.
const POINTS_TIERS = [
  {
    min: 2000,
    classes: "text-amber-300 bg-amber-400/30 border-amber-300/50 [text-shadow:0_0_8px_rgba(251,191,36,0.5)]",
  },
  {
    min: 1000,
    classes: "text-purple-300 bg-purple-500/30 border-purple-400/45 [text-shadow:0_0_6px_rgba(192,132,252,0.5)]",
  },
  {
    min: 500,
    classes: "text-teal-300 bg-teal-400/30 border-teal-400/40 [text-shadow:0_0_6px_rgba(45,212,191,0.5)]",
  },
  {
    min: 100,
    classes: "text-slate-200 bg-slate-400/15 border-slate-400/30",
  },
];
const PENDING_TIER_CLASSES = "text-slate-500 bg-white/5 border-white/10";

function tierClasses(points) {
  if (points == null) return PENDING_TIER_CLASSES;
  const tier = POINTS_TIERS.find((t) => points >= t.min);
  return tier ? tier.classes : POINTS_TIERS[POINTS_TIERS.length - 1].classes;
}

function buildStrip(icons) {
  return Array.from({ length: REPEATS }, () => icons).flat();
}

// Turns a landed reel result into a score: the sum of every landed
// icon's point value — unless every reel matches, which pays out the
// max, 99999.
function scoreForResult(icons, indices) {
  const allMatch = indices.every((idx) => idx === indices[0]);
  if (allMatch) return 99999;
  const raw = indices.reduce((sum, idx) => sum + icons[idx].points, 0);
  return Math.max(0, Math.min(99999, raw));
}

function SlotMachine({ icons = DEFAULT_ICONS }) {
  const stripRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const nameRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const btnRef = useRef(null);
  const itemHeightRef = useRef(FALLBACK_ITEM_HEIGHT);
  const scoreProxyRef = useRef({ value: 0 });

  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("Press spin to begin");
  const [displayPoints, setDisplayPoints] = useState(0);
  // One entry per reel: null while idle/spinning (renders as a
  // placeholder row so the layout never jumps), or { name, points }
  // once that spin's result is calculated.
  const [resultNames, setResultNames] = useState(Array.from({ length: REEL_COUNT }, () => null));

  const landedRef = useRef(Array.from({ length: REEL_COUNT }, () => null));
  const completedRef = useRef(0);

  const measureItemHeight = () => {
    const cell = stripRefs[0].current?.firstElementChild;
    const h = cell ? cell.getBoundingClientRect().height : 0;
    if (h > 0) itemHeightRef.current = h;
    return itemHeightRef.current;
  };

  // Start every reel parked mid-strip so it has room to spin, and
  // re-measure (and re-park) whenever the reel size changes. Runs in
  // useLayoutEffect (before the browser paints) rather than
  // useEffect, so the reels are already in their parked position for
  // the very first paint instead of flashing their unparked layout
  // position first.
  useLayoutEffect(() => {
    const parkAll = () => {
      const h = measureItemHeight();
      const loopHeight = icons.length * h;
      stripRefs.forEach((ref) => {
        gsap.set(ref.current, { y: -loopHeight });
      });
    };
    parkAll();
    window.addEventListener("resize", parkAll);
    return () => window.removeEventListener("resize", parkAll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once the landed names are set, slide each one up into place, one
  // after another. This is a useLayoutEffect (not useEffect) so the
  // "from" state (opacity: 0, y: 28) is applied before the browser
  // paints the newly-rendered rows — with useEffect, React first
  // commits the rows at their final, fully-visible state, the browser
  // paints that frame, and only afterwards does the animation reset
  // them to invisible and animate back in — that's what was causing
  // the flicker. Only animates rows that actually landed this spin
  // (placeholder rows are skipped).
  //
  // duration/stagger are deliberately slow — each row takes 0.85s to
  // ease in, and the next one doesn't start until 0.45s after the
  // previous one began, so they visibly stack one at a time (roughly
  // half of each row's motion has settled before the next begins)
  // rather than all five arriving in a near-simultaneous flurry.
  useLayoutEffect(() => {
    const els = nameRefs.map((r, i) => (resultNames[i] ? r.current : null)).filter(Boolean);
    if (!els.length) return;
    gsap.fromTo(
      els,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power2.out",
        stagger: 0.45,
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultNames]);

  const spinReel = (reelIndex, onLanded) => {
    const el = stripRefs[reelIndex].current;
    const itemHeight = measureItemHeight();
    const loopHeight = icons.length * itemHeight;
    const targetIndex = Math.floor(Math.random() * icons.length);

    const currentY = gsap.getProperty(el, "y");
    const currentIndex = Math.round((-currentY % loopHeight) / itemHeight) % icons.length;
    const indexDelta = (targetIndex - currentIndex + icons.length) % icons.length;

    const minLoops = 3 + reelIndex; // each reel spins a bit further than the last
    const travel = (minLoops * icons.length + indexDelta) * itemHeight;
    const finalY = currentY - travel;

    gsap.to(el, {
      y: finalY,
      duration: 1.7 + reelIndex * 0.35,
      ease: "power3.out", // decelerates smoothly into the result, no overshoot/bounce
      onComplete: () => {
        // Wrap the strip back into its safe middle range. The pattern
        // repeats every loopHeight, so this causes no visual jump.
        const remainder = -finalY % loopHeight;
        gsap.set(el, { y: -loopHeight - remainder });
        landedRef.current[reelIndex] = targetIndex;
        onLanded();
      },
    });
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setMessage("");
    landedRef.current = Array.from({ length: REEL_COUNT }, () => null);
    completedRef.current = 0;

    // Clear the name rows back to placeholders for the duration of
    // the spin — the reveal only fills in once this spin's result is
    // calculated. The rows stay mounted throughout, so nothing
    // resizes or jumps.
    setResultNames(Array.from({ length: REEL_COUNT }, () => null));

    // Reset the odometer to 0 the instant the lever is pulled, so
    // it's ready to count up fresh once this spin's result lands.
    gsap.killTweensOf(scoreProxyRef.current);
    scoreProxyRef.current.value = 0;
    setDisplayPoints(0);

    gsap.fromTo(
      btnRef.current,
      { scale: 1 },
      { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.inOut" },
    );

    Array.from({ length: REEL_COUNT }, (_, i) => i).forEach((i) => {
      spinReel(i, () => {
        completedRef.current += 1;
        if (completedRef.current === REEL_COUNT) {
          const indices = landedRef.current;
          const points = scoreForResult(icons, indices);
          const allMatch = indices.every((idx) => idx === indices[0]);

          setMessage(allMatch ? `Jackpot — all ${icons[indices[0]].name}` : "");

          // Points are calculated — fill in the name rows; the
          // slide-up animation runs in the layout effect above once
          // these are rendered (before the browser paints).
          setResultNames(
            indices.map((idx) => ({
              name: icons[idx].name,
              points: icons[idx].points,
            })),
          );

          // Ease the digit windows up from 0 to the total score, like
          // a mechanical counter settling into place.
          gsap.to(scoreProxyRef.current, {
            value: points,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              setDisplayPoints(Math.round(scoreProxyRef.current.value));
            },
          });

          setSpinning(false);
        }
      });
    });
  };

  return (
    <PageBlock>
      <div className="flex items-center justify-center font-[Ale] text-[#dfe7e6]">
        <div className="flex flex-col items-center gap-6 w-full max-w-[600px]">
          <div className="flex items-center gap-3.5 font-[Ale] font-bold text-2xl tracking-[6px] uppercase text-teal-400 [text-shadow:0_0_14px_rgba(45,212,191,0.35),0_0_30px_rgba(45,212,191,0.25)]">
            <span>Crossroad Slot</span>
          </div>

          <div className="relative flex w-full justify-center gap-1.5 rounded-md bg-[#050506] p-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(45,212,191,0.25)]">
            {stripRefs.map((ref, i) => (
              <div
                key={i}
                className="relative flex-1 w-full aspect-[110/161] overflow-hidden rounded border-2 border-teal-400/55 bg-[linear-gradient(180deg,#0a2422,#123936_45%,#0a2422)] shadow-[inset_0_10px_14px_-6px_rgba(0,0,0,0.85),inset_0_-10px_14px_-6px_rgba(0,0,0,0.85),inset_0_0_0_1px_rgba(0,0,0,0.5),0_0_10px_rgba(45,212,191,0.25)]"
              >
                <div ref={ref} className="absolute top-0 left-0 w-full">
                  {buildStrip(icons).map((icon, idx) => (
                    <div
                      key={idx}
                      aria-hidden="true"
                      className="w-full aspect-[110/161] flex items-center justify-center select-none [filter:drop-shadow(0_3px_4px_rgba(0,0,0,0.7))]"
                    >
                      <img src={`/Slots/${icon.symbol}.png`} alt="Arcana" className="w-full h-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-1.5" aria-label={`Points ${displayPoints}`}>
            {String(displayPoints)
              .padStart(5, "0")
              .split("")
              .map((digit, i) => (
                <div
                  key={i}
                  className="w-10 h-[48px] flex items-center justify-center font-[Sr] font-semibold text-[20px] text-teal-400 [text-shadow:0_0_8px_rgba(45,212,191,0.35)] bg-[linear-gradient(180deg,#0a2422,#123936_45%,#0a2422)] border-2 border-teal-400/55 rounded shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.85),inset_0_-4px_6px_-3px_rgba(0,0,0,0.85),0_0_8px_rgba(45,212,191,0.2)]"
                >
                  {digit}
                </div>
              ))}
          </div>

          {/* <div
            className="min-h-[20px] text-center font-[Ale] font-bold text-sm tracking-[2px] uppercase text-teal-400 [text-shadow:0_0_10px_rgba(45,212,191,0.35)]"
            aria-live="polite"
          >
            {message}
          </div> */}

          {/* Always mounted — reserves its own height up front so
            nothing shifts when a result lands. */}
          <div className="flex flex-col items-stretch gap-2 w-full max-w-[340px] min-h-[280px]">
            {resultNames.map((item, i) => (
              <div
                key={i}
                ref={nameRefs[i]}
                className={`flex items-center justify-between gap-3 rounded-md px-4 py-2.5 border font-[Ale] font-semibold text-lg tracking-[1.5px] uppercase ${tierClasses(
                  item?.points,
                )}`}
              >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">{item ? item.name : "—"}</span>
                {item && (
                  <span className="font-sans font-semibold text-base tracking-normal opacity-90">{item.points}</span>
                )}
              </div>
            ))}
          </div>

          <button
            ref={btnRef}
            onClick={spin}
            disabled={spinning}
            className="appearance-none border-0 cursor-pointer font-[Ale] font-bold text-base tracking-[4px] uppercase text-[#050506] bg-[linear-gradient(180deg,#7ff0dd,#2dd4bf_55%,#0f766e)] px-11 py-3.5 rounded-full shadow-[0_0_0_1px_rgba(45,212,191,0.5),0_6px_0_#0f766e,0_10px_20px_rgba(0,0,0,0.55),0_0_26px_rgba(45,212,191,0.45)] transition-[transform,filter] duration-150 hover:brightness-110 active:translate-y-1 focus-visible:outline focus-visible:outline-teal-400 focus-visible:outline-offset-4 disabled:cursor-default disabled:text-black/60 disabled:bg-[linear-gradient(180deg,#4d6864,#3a5451_55%,#2b3f3c)] disabled:shadow-[0_0_0_1px_rgba(45,212,191,0.2),0_6px_0_#24332f,0_10px_18px_rgba(0,0,0,0.5)] disabled:animate-pulse"
          >
            {spinning ? "Spinning…" : "Spin"}
          </button>
        </div>
      </div>
    </PageBlock>
  );
}

export default SlotMachine;
