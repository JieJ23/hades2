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

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import PageBlock from "../Block/PageBlock";

function auraTextClass(points) {
  if (points == null) return null;
  if (points >= 5000) return "text-amber-500";
  if (points >= 3000) return "text-red-500";
  if (points >= 1500) return "text-purple-500";
  return null;
}

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
  { symbol: `Melinoe`, name: `Melinoe`, points: 6628 },
  //
  { symbol: `Debt`, name: `Debt`, points: 603 },
  { symbol: `Denial`, name: `Denial`, points: 694 },
  { symbol: `Fangs`, name: `Fangs`, points: 635 },
  { symbol: `Forfeit`, name: `Forfeit`, points: 631 },
  { symbol: `Frenzy`, name: `Frenzy`, points: 628 },
  { symbol: `Grit`, name: `Grit`, points: 617 },
  { symbol: `Hordes`, name: `Hordes`, points: 694 },
  { symbol: `Hubris`, name: `Hubris`, points: 613 },
  { symbol: `Menace`, name: `Menace`, points: 686 },
  { symbol: `Pain`, name: `Pain`, points: 694 },
  { symbol: `Return`, name: `Return`, points: 769 },
  { symbol: `Rivals`, name: `Rivals`, points: 711 },
  { symbol: `Scars`, name: `Scars`, points: 675 },
  { symbol: `Shadow`, name: `Shadow`, points: 754 },
  { symbol: `Time`, name: `Time`, points: 704 },
  { symbol: `Void`, name: `Void`, points: 703 },
  { symbol: `Wards`, name: `Wards`, points: 711 },
  //
  { symbol: `Aphrodite`, name: `Aphrodite`, points: 1711 },
  { symbol: `Apollo`, name: `Apollo`, points: 1719 },
  { symbol: `Arachne`, name: `Arachne`, points: 1879 },
  { symbol: `Ares`, name: `Ares`, points: 2554 },
  { symbol: `Artemis`, name: `Artemis`, points: 1937 },
  { symbol: `Athena`, name: `Athena`, points: 2907 },
  { symbol: `Chaos`, name: `Chaos`, points: 6516 },
  { symbol: `Charon`, name: `Charon`, points: 1764 },
  { symbol: `Chronos`, name: `Chronos`, points: 6451 },
  { symbol: `Circe`, name: `Circe`, points: 1779 },
  { symbol: `Demeter`, name: `Demeter`, points: 3069 },
  { symbol: `Dionysus`, name: `Dionysus`, points: 1653 },
  { symbol: `Dora`, name: `Dora`, points: 340 },
  { symbol: `Echo`, name: `Echo`, points: 1378 },
  { symbol: `Hecate`, name: `Hecate`, points: 3665 },
  { symbol: `Hephaestus`, name: `Hephaestus`, points: 1674 },
  { symbol: `Hera`, name: `Hera`, points: 3569 },
  { symbol: `Heracles`, name: `Heracles`, points: 1239 },
  { symbol: `Hermes`, name: `Hermes`, points: 1610 },
  { symbol: `Hestia`, name: `Hestia`, points: 943 },
  { symbol: `Icarus`, name: `Icarus`, points: 1226 },
  { symbol: `Medea`, name: `Medea`, points: 1597 },
  { symbol: `Moros`, name: `Moros`, points: 1097 },
  { symbol: `Narcissus`, name: `Narcissus`, points: 1224 },
  { symbol: `Nemesis`, name: `Nemesis`, points: 1391 },
  { symbol: `Odysseus`, name: `Odysseus`, points: 1288 },
  { symbol: `Poseidon`, name: `Poseidon`, points: 3541 },
  { symbol: `Selene`, name: `Selene`, points: 1572 },
  { symbol: `Skelly`, name: `Skelly`, points: 666 },
  { symbol: `Zagreus`, name: `Zagreus`, points: 1467 },
  { symbol: `Zeus`, name: `Zeus`, points: 4598 },
  //
  { symbol: `Raven`, name: `Raki`, points: 7127 },
  { symbol: `Frog`, name: `Frinos`, points: 7387 },
  { symbol: `Polecat`, name: `Gale`, points: 7080 },
  { symbol: `Hound`, name: `Hecuba`, points: 7565 },
  { symbol: `Cat`, name: `Toula`, points: 7300 },
  { symbol: `cMelinoe Staff`, name: `Melinoe Staff`, points: 880 },
  { symbol: `cCirce`, name: `Circe`, points: 979 },
  { symbol: `cMomus`, name: `Momus`, points: 1292 },
  { symbol: `cAnubis`, name: `Anubis`, points: 1147 },
  { symbol: `cMelinoe Blades`, name: `Melinoe Blades`, points: 824 },
  { symbol: `cArtemis`, name: `Artemis`, points: 1380 },
  { symbol: `cPan`, name: `Pan`, points: 1017 },
  { symbol: `cMorrigan`, name: `Morrigan`, points: 1011 },
  { symbol: `cMelinoe Axe`, name: `Melinoe Axe`, points: 884 },
  { symbol: `cCharon`, name: `Charon`, points: 929 },
  { symbol: `cThanatos`, name: `Thanatos`, points: 1124 },
  { symbol: `cNergal`, name: `Nergal`, points: 1020 },
  { symbol: `cMelinoe Flames`, name: `Melinoe Flames`, points: 829 },
  { symbol: `cEos`, name: `Eos`, points: 1025 },
  { symbol: `cMoros`, name: `Moros`, points: 948 },
  { symbol: `cSupay`, name: `Supay`, points: 1071 },
  { symbol: `cMelinoe Skull`, name: `Melinoe Skull`, points: 858 },
  { symbol: `cMedea`, name: `Medea`, points: 946 },
  { symbol: `cPersephone`, name: `Persephone`, points: 3833 },
  { symbol: `cHel`, name: `Hel`, points: 1094 },
  { symbol: `cMelinoe Coat`, name: `Melinoe Coat`, points: 845 },
  { symbol: `cNyx`, name: `Nyx`, points: 3429 },
  { symbol: `cSelene`, name: `Selene`, points: 934 },
  { symbol: `cShiva`, name: `Shiva`, points: 1018 },
  { symbol: `c0`, name: `Empty Card`, points: 99 },
  { symbol: `c1`, name: `Sorceress`, points: 771 },
  { symbol: `c2`, name: `Wayward`, points: 828 },
  { symbol: `c3`, name: `Huntress`, points: 801 },
  { symbol: `c4`, name: `Eternity`, points: 910 },
  { symbol: `c5`, name: `Moon`, points: 949 },
  { symbol: `c6`, name: `Furies`, points: 964 },
  { symbol: `c7`, name: `Persistence`, points: 1017 },
  { symbol: `c8`, name: `Messenger`, points: 1079 },
  { symbol: `c9`, name: `Unseen`, points: 1080 },
  { symbol: `c10`, name: `Night`, points: 1104 },
  { symbol: `c11`, name: `Swift`, points: 1115 },
  { symbol: `c12`, name: `Death`, points: 1214 },
  { symbol: `c13`, name: `Centaur`, points: 1263 },
  { symbol: `c14`, name: `Origination`, points: 1260 },
  { symbol: `c15`, name: `Lovers`, points: 1313 },
  { symbol: `c16`, name: `Enchantress`, points: 1329 },
  { symbol: `c17`, name: `Boatman`, points: 1349 },
  { symbol: `c18`, name: `Artificer`, points: 1323 },
  { symbol: `c19`, name: `Excellence`, points: 1414 },
  { symbol: `c20`, name: `Queen`, points: 1554 },
  { symbol: `c21`, name: `Fates`, points: 1690 },
  { symbol: `c22`, name: `Champions`, points: 1801 },
  { symbol: `c23`, name: `Strength`, points: 1884 },
  { symbol: `c24`, name: `Divinity`, points: 2233 },
  { symbol: `c25`, name: `Judgment`, points: 2816 },
];

// Number of reels, laid out as a GRID_COLS x GRID_ROWS grid.
const GRID_COLS = 5;
const GRID_ROWS = 5;
const REEL_COUNT = GRID_COLS * GRID_ROWS;

// --- "Galaxy" charging animation ------------------------------------
// Each reel renders exactly one icon at a time (no more physically
// duplicated strips), so DOM weight no longer scales with icon count,
// REPEATS, or grid size — it's flat at REEL_COUNT images. While a reel
// is "charging" it (a) spins a ring of small orbiting motes behind the
// icon, and (b) flickers the icon shown every FLICKER_MS by swapping
// which icon from `icons` is rendered. When the reel's charge time is
// up, the ring decelerates back to a clean multiple of 360° (its
// "home" rotation) and fades out while the final icon locks in and
// pulses — the "rotate back to original placement" landing.
const GALAXY_DOTS = 9;
const FLICKER_MS = 70;
// Column 0 settles first, each subsequent column settles a bit later,
// so the grid still resolves left-to-right like the old reel version.
const BASE_CHARGE_MS = 900;
const COLUMN_STAGGER_MS = 350;

// Point thresholds that decide which color a landed name shows up in.
// Tune these to match the actual spread of `points` values across
// your icon set.
const POINTS_TIERS = [
  {
    min: 5000,
    classes: "text-amber-300 bg-gradient-to-tr to-[#0a0a0a] from-amber-900 [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]",
  },
  {
    min: 3000,
    classes: "text-red-300 bg-gradient-to-tr to-[#0a0a0a] from-red-900 [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]",
  },
  {
    min: 1500,
    classes: "text-purple-300 bg-gradient-to-tr to-[#0a0a0a] from-purple-900 [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]",
  },
  {
    min: 700,
    classes: "text-blue-300 bg-gradient-to-tr to-[#0a0a0a] from-blue-900 [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]",
  },
  {
    min: 100,
    classes: "text-slate-300 bg-gradient-to-tr to-[#0a0a0a] from-slate-900 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]",
  },
];
const PENDING_TIER_CLASSES = "text-slate-500 bg-white/5 border-white";

function tierClasses(points) {
  if (points == null) return PENDING_TIER_CLASSES;
  const tier = POINTS_TIERS.find((t) => points >= t.min);
  return tier ? tier.classes : POINTS_TIERS[POINTS_TIERS.length - 1].classes;
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

// A ring of small motes arranged in a circle around the reel's
// center, tinted teal/green to match the site's theme. The whole
// group is rotated via gsap (on `innerRef`) rather than animated with
// CSS keyframes, so its rotation value can be read and eased back to
// a clean stop when a reel lands.
function GalaxyRing({ innerRef }) {
  const dots = Array.from({ length: GALAXY_DOTS }, (_, i) => {
    const angle = (360 / GALAXY_DOTS) * i;
    const radius = 40; // % from center
    const rad = (angle * Math.PI) / 180;
    const x = 50 + radius * Math.cos(rad);
    const y = 50 + radius * Math.sin(rad);
    const size = 3 + (i % 3) * 1.5;
    const tone = i % 2 === 0 ? "bg-teal-300" : "bg-emerald-400";
    return (
      <span
        key={i}
        className={`absolute rounded-full ${tone} shadow-[0_0_6px_rgba(45,212,191,0.85)]`}
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  });

  return (
    <div ref={innerRef} className="absolute inset-0 pointer-events-none opacity-0" style={{ willChange: "transform" }}>
      {/* Soft rotating spiral glow behind the motes */}
      <div className="absolute inset-[8%] rounded-full blur-[2px] bg-[conic-gradient(from_0deg,rgba(45,212,191,0)_0deg,rgba(45,212,191,0.4)_90deg,rgba(74,222,128,0)_180deg,rgba(45,212,191,0.4)_270deg,rgba(45,212,191,0)_360deg)]" />
      {dots}
    </div>
  );
}

function SlotMachine({ icons = DEFAULT_ICONS }) {
  // Dynamic-length ref arrays — populated via callback refs on each
  // rendered element below rather than a fixed run of useRef() calls,
  // so REEL_COUNT can be any grid size.
  const galaxyRefs = useRef([]);
  const iconWrapRefs = useRef([]);
  const nameRefs = useRef([]);
  const btnRef = useRef(null);
  const scoreProxyRef = useRef({ value: 0 });
  const flickerIntervalsRef = useRef([]);
  const chargeTimeoutsRef = useRef([]);

  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("Press spin to begin");
  const [displayPoints, setDisplayPoints] = useState(0);
  // The icon currently shown in each reel cell — flickers rapidly
  // while that reel is charging, then locks to the landed icon.
  const [displayIcons, setDisplayIcons] = useState(Array.from({ length: REEL_COUNT }, () => icons[0]));
  // One entry per reel: null while idle/spinning (renders as a
  // placeholder row so the layout never jumps), or { name, points }
  // once that spin's result is calculated.
  const [resultNames, setResultNames] = useState(Array.from({ length: REEL_COUNT }, () => null));

  const landedRef = useRef(Array.from({ length: REEL_COUNT }, () => null));
  const completedRef = useRef(0);

  // Clean up any in-flight flicker intervals / charge timers if the
  // component unmounts mid-spin.
  useEffect(() => {
    return () => {
      flickerIntervalsRef.current.forEach((id) => clearInterval(id));
      chargeTimeoutsRef.current.forEach((id) => clearTimeout(id));
    };
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
  useLayoutEffect(() => {
    const els = nameRefs.current.filter((el, i) => el && resultNames[i]);
    if (!els.length) return;
    gsap.fromTo(
      els,
      { opacity: 0, y: 28, scale: 0.25 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.2,
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultNames]);

  // Charges up a single reel: spins its galaxy ring continuously and
  // flickers its icon through random options, then — after that
  // column's charge time — decelerates the ring back to a clean
  // multiple of 360° ("original placement") while fading it out and
  // locking the icon to its final landed result.
  const chargeReel = (reelIndex, onLanded) => {
    const targetIndex = Math.floor(Math.random() * icons.length);
    const col = reelIndex % GRID_COLS;
    const galaxyEl = galaxyRefs.current[reelIndex];
    const iconWrapEl = iconWrapRefs.current[reelIndex];

    gsap.killTweensOf(galaxyEl);
    gsap.killTweensOf(iconWrapEl);
    gsap.set(galaxyEl, { rotation: 0, opacity: 0.95, scale: 1 });
    gsap.set(iconWrapEl, { scale: 1, opacity: 1 });

    gsap.to(galaxyEl, {
      rotation: "+=360",
      duration: 0.85,
      ease: "none",
      repeat: -1,
    });

    clearInterval(flickerIntervalsRef.current[reelIndex]);
    flickerIntervalsRef.current[reelIndex] = setInterval(() => {
      setDisplayIcons((prev) => {
        const next = [...prev];
        next[reelIndex] = icons[Math.floor(Math.random() * icons.length)];
        return next;
      });
    }, FLICKER_MS);

    const chargeMs = BASE_CHARGE_MS + col * COLUMN_STAGGER_MS;

    clearTimeout(chargeTimeoutsRef.current[reelIndex]);
    chargeTimeoutsRef.current[reelIndex] = setTimeout(() => {
      clearInterval(flickerIntervalsRef.current[reelIndex]);
      setDisplayIcons((prev) => {
        const next = [...prev];
        next[reelIndex] = icons[targetIndex];
        return next;
      });

      // Let the ring's current spin finish naturally, then ease it
      // back to its "home" rotation (the next exact multiple of
      // 360°) while fading out — the ring visually winds back to
      // where it started as it hands off to the settled icon, which
      // pulses to confirm the landing.
      const current = gsap.getProperty(galaxyEl, "rotation");
      const home = Math.ceil((current + 1) / 360) * 360;
      gsap.to(galaxyEl, {
        rotation: home,
        opacity: 0,
        scale: 0.6,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.fromTo(
        iconWrapEl,
        { scale: 0.75, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2)",
          onComplete: () => {
            landedRef.current[reelIndex] = targetIndex;
            onLanded();
          },
        },
      );
    }, chargeMs);
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
      chargeReel(i, () => {
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

          // Build the score up one landed icon at a time, timed to
          // match each result card's reveal stagger above (0.1s
          // apart) — so the total visibly "adds up" as each name
          // slides into place, instead of jumping straight to the
          // final number in one continuous tween.
          gsap.killTweensOf(scoreProxyRef.current);
          const scoreTl = gsap.timeline();
          indices.forEach((idx, revealIndex) => {
            scoreTl.to(
              scoreProxyRef.current,
              {
                value: `+=${icons[idx].points}`,
                duration: 0.5,
                ease: "power2.out",
                onUpdate: () => {
                  setDisplayPoints(Math.min(99999, Math.round(scoreProxyRef.current.value)));
                },
              },
              revealIndex * 0.1, // same stagger the name-card reveal uses
            );
          });
          if (allMatch) {
            // Jackpot flourish: once the per-icon count-up lands,
            // punch the total the rest of the way to the max payout.
            scoreTl.to(scoreProxyRef.current, {
              value: points,
              duration: 0.6,
              ease: "power2.out",
              onUpdate: () => {
                setDisplayPoints(Math.min(99999, Math.round(scoreProxyRef.current.value)));
              },
            });
          }

          setSpinning(false);
        }
      });
    });
  };

  return (
    <PageBlock>
      <div className="flex items-center justify-center font-[Ale] text-[#dfe7e6]">
        <div className="flex flex-col items-center gap-4 w-full max-w-400">
          <div className="flex items-center gap-3.5 font-[Ale] font-bold text-2xl tracking-[6px] uppercase text-teal-400 [text-shadow:0_0_14px_rgba(45,212,191,0.35),0_0_30px_rgba(45,212,191,0.25)]">
            <span>Crossroad Slot</span>
          </div>
          <div className="flex gap-1.5" aria-label={`Points ${displayPoints}`}>
            {String(displayPoints)
              .padStart(5, "0")
              .split("")
              .map((digit, i) => (
                <div
                  key={i}
                  className="w-12 h-[54px] flex items-center justify-center font-[UbuntuMono] font-bold text-[24px] text-purple-400 [text-shadow:0_0_8px_purple] bg-[linear-gradient(180deg,#0a2422,#123936_45%,#0a2422)] border-2 border-teal-400/55 rounded shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.85),inset_0_-4px_6px_-3px_rgba(0,0,0,0.85),0_0_8px_rgba(45,212,191,0.2)]"
                >
                  {digit}
                </div>
              ))}
          </div>
          <button
            ref={btnRef}
            onClick={spin}
            disabled={spinning}
            className="appearance-none border-0 cursor-pointer font-[Ale] font-bold text-base tracking-[4px] uppercase text-[#050506] bg-[linear-gradient(180deg,#7ff0dd,#2dd4bf_55%,#0f766e)] px-16 py-3.5 rounded-lg transition-[transform,filter] duration-150 hover:brightness-110 active:translate-y-1 focus-visible:outline focus-visible:outline-teal-400 focus-visible:outline-offset-4 disabled:cursor-default disabled:text-black/60 disabled:bg-[linear-gradient(180deg,#4d6864,#3a5451_55%,#2b3f3c)] disabled:animate-pulse"
          >
            {spinning ? "Spinning…" : "Spin"}
          </button>

          <div className="flex flex-col lg:flex-row w-full gap-x-8 gap-4 items-center lg:items-baseline justify-center">
            <div
              className="relative grid w-full max-w-120 gap-1.5 rounded-md bg-[#050506] p-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(45,212,191,0.25)]"
              style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: REEL_COUNT }, (_, i) => i).map((i) => (
                <div
                  key={i}
                  className="relative w-full aspect-[110/161] overflow-hidden rounded border-2 border-teal-400/55 bg-[linear-gradient(180deg,#0a2422,#123936_45%,#0a2422)] shadow-[inset_0_10px_14px_-6px_rgba(0,0,0,0.85),inset_0_-10px_14px_-6px_rgba(0,0,0,0.85),inset_0_0_0_1px_rgba(0,0,0,0.5),0_0_10px_rgba(45,212,191,0.25)]"
                >
                  <GalaxyRing innerRef={(el) => (galaxyRefs.current[i] = el)} />
                  <div
                    ref={(el) => (iconWrapRefs.current[i] = el)}
                    className="absolute inset-0 flex items-center justify-center [filter:drop-shadow(0_3px_4px_rgba(0,0,0,0.7))]"
                  >
                    <img
                      src={`/Slots/${displayIcons[i].symbol}.png`}
                      alt="Arcana"
                      className="max-w-[95%] max-h-[95%] w-auto h-auto object-contain select-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Always mounted — reserves its own height up front so
            nothing shifts when a result lands. Mirrors the reel grid
            above, one compact card per landed reel. */}
            <div
              className="grid w-full max-w-150 gap-2"
              style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
            >
              {resultNames.map((item, i) => {
                const aura = auraTextClass(item?.points);
                const card = (
                  <div
                    ref={(el) => (nameRefs.current[i] = el)}
                    className={`flex flex-col items-center justify-center rounded gap-0.5 px-1 py-2 font-[Ale] font-semibold tracking-[0.5px] uppercase text-center ${tierClasses(
                      item?.points,
                    )}`}
                  >
                    <span className="w-full overflow-hidden font-[Ale] text-ellipsis whitespace-nowrap text-[10px] leading-tight">
                      {item ? item.name : "—"}
                    </span>
                    {item && (
                      <span className="font-[Ale] font-semibold text-[18px] tracking-normal opacity-90">
                        {item.points}
                      </span>
                    )}
                  </div>
                );

                return aura ? (
                  <div key={i} className={`aura aura-hollow ${aura} rounded`}>
                    {card}
                  </div>
                ) : (
                  <div key={i}>{card}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageBlock>
  );
}

export default SlotMachine;
