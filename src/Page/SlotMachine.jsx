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
  if (points >= 10000) return "text-amber-500";
  if (points >= 8000) return "text-orange-500";
  if (points >= 6000) return "text-red-500";
  if (points >= 4500) return "text-fuchsia-500";
  if (points >= 3000) return "text-purple-500";
  if (points >= 1500) return "text-emerald-500";
  // if (points >= 750) return "text-blue-500";
  return null;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Spin allowance: 5 spins per rolling 24h window -------------------
// The window's start time + spins used so far are persisted to
// localStorage under this key, so the allowance survives page
// reloads / new tabs (it's per-browser, not per-server — there's no
// auth/backend here to key it to a user).
const MAX_SPINS_PER_WINDOW = 5;
const SPIN_WINDOW_MS = 6 * 60 * 60 * 1000;
const SPIN_WINDOW_STORAGE_KEY = "crossroadSlot:spinWindow";

// Reads { windowStartAt, spinsUsed } back out of localStorage. If the
// stored window has already fully elapsed (or the data is missing /
// malformed), returns a fresh, unused window instead.
function loadSpinWindow() {
  try {
    const raw = localStorage.getItem(SPIN_WINDOW_STORAGE_KEY);
    if (!raw) return { windowStartAt: null, spinsUsed: 0 };
    const parsed = JSON.parse(raw);
    if (typeof parsed.windowStartAt !== "number" || typeof parsed.spinsUsed !== "number") {
      return { windowStartAt: null, spinsUsed: 0 };
    }
    if (Date.now() - parsed.windowStartAt >= SPIN_WINDOW_MS) {
      return { windowStartAt: null, spinsUsed: 0 };
    }
    return parsed;
  } catch {
    return { windowStartAt: null, spinsUsed: 0 };
  }
}

function saveSpinWindow(spinWindow) {
  try {
    localStorage.setItem(SPIN_WINDOW_STORAGE_KEY, JSON.stringify(spinWindow));
  } catch {
    // Storage unavailable — allowance still applies for this session
    // via state, it just won't survive a reload.
  }
}

// ms -> "HH:MM:SS" for the on-button countdown display.
function formatCountdown(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// icon.points can be a fixed number, or a function returning a random
// whole number for that icon (e.g. `points: () => randomInt(550, 650)`).
// Always resolve through this — never read icon.points directly —
// so a function-based value is only rolled once per landing, not
// re-rolled every time it's read (which would let the score total,
// the result card, and the tier color each disagree with each other).
function resolvePoints(points) {
  return typeof points === "function" ? points() : points;
}

function digitTierClasses(points) {
  if (points >= 200000) {
    return {
      text: "text-white",
      glow: "[text-shadow:0_0_18px_rgba(255,255,255,1),0_0_36px_rgba(165,243,252,0.85),0_0_54px_rgba(232,121,249,0.6),0_0_72px_rgba(252,211,77,0.4)]",
      border: "border-white/80",
      bg: "bg-[linear-gradient(180deg,#1a0b24,#2a1030_25%,#0b1f2e_50%,#2a1030_75%,#1a0b24)]",
      shadow:
        "shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.92),inset_0_-4px_6px_-3px_rgba(0,0,0,0.92),0_0_30px_rgba(255,255,255,0.6),0_0_50px_rgba(232,121,249,0.35)]",
    };
  }
  if (points >= 150000) {
    return {
      text: "text-cyan-200",
      glow: "[text-shadow:0_0_17px_rgba(165,243,252,1),0_0_34px_rgba(103,232,249,0.7),0_0_50px_rgba(255,255,255,0.35)]",
      border: "border-cyan-200/80",
      bg: "bg-[linear-gradient(180deg,#052024,#0a3a40_45%,#052024)]",
      shadow:
        "shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.9),inset_0_-4px_6px_-3px_rgba(0,0,0,0.9),0_0_26px_rgba(165,243,252,0.55)]",
    };
  }
  if (points >= 100000) {
    return {
      text: "text-amber-300",
      glow: "[text-shadow:0_0_16px_rgba(252,211,77,1),0_0_32px_rgba(252,211,77,0.65)]",
      border: "border-amber-300/75",
      bg: "bg-[linear-gradient(180deg,#2e2005,#4d3908_45%,#2e2005)]",
      shadow:
        "shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.9),inset_0_-4px_6px_-3px_rgba(0,0,0,0.9),0_0_22px_rgba(252,211,77,0.5)]",
    };
  }
  if (points >= 90000) {
    return {
      text: "text-rose-400",
      glow: "[text-shadow:0_0_13px_rgba(251,113,133,0.95),0_0_26px_rgba(251,113,133,0.45)]",
      border: "border-rose-400/65",
      bg: "bg-[linear-gradient(180deg,#2c0c16,#471524_45%,#2c0c16)]",
      shadow:
        "shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.88),inset_0_-4px_6px_-3px_rgba(0,0,0,0.88),0_0_18px_rgba(251,113,133,0.4)]",
    };
  }
  if (points >= 80000) {
    return {
      text: "text-red-400",
      glow: "[text-shadow:0_0_11px_rgba(248,113,113,0.9),0_0_22px_rgba(248,113,113,0.4)]",
      border: "border-red-400/60",
      bg: "bg-[linear-gradient(180deg,#2c0c0c,#471515_45%,#2c0c0c)]",
      shadow:
        "shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.87),inset_0_-4px_6px_-3px_rgba(0,0,0,0.87),0_0_15px_rgba(248,113,113,0.35)]",
    };
  }
  if (points >= 70000) {
    return {
      text: "text-orange-400",
      glow: "[text-shadow:0_0_10px_rgba(251,146,60,0.85)]",
      border: "border-orange-400/55",
      bg: "bg-[linear-gradient(180deg,#2c1806,#47270a_45%,#2c1806)]",
      shadow:
        "shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.86),inset_0_-4px_6px_-3px_rgba(0,0,0,0.86),0_0_13px_rgba(251,146,60,0.3)]",
    };
  }
  if (points >= 60000) {
    return {
      text: "text-fuchsia-400",
      glow: "[text-shadow:0_0_9px_rgba(232,121,249,0.8)]",
      border: "border-fuchsia-400/50",
      bg: "bg-[linear-gradient(180deg,#210a24,#361239_45%,#210a24)]",
      shadow:
        "shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.85),inset_0_-4px_6px_-3px_rgba(0,0,0,0.85),0_0_11px_rgba(232,121,249,0.28)]",
    };
  }
  if (points >= 50000) {
    return {
      text: "text-purple-400",
      glow: "[text-shadow:0_0_9px_purple]",
      border: "border-purple-400/48",
      bg: "bg-[linear-gradient(180deg,#170a24,#241239_45%,#170a24)]",
      shadow:
        "shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.85),inset_0_-4px_6px_-3px_rgba(0,0,0,0.85),0_0_10px_rgba(192,132,252,0.25)]",
    };
  }
  if (points >= 40000) {
    return {
      text: "text-emerald-400",
      glow: "[text-shadow:0_0_8px_rgba(52,211,153,0.75)]",
      border: "border-emerald-400/45",
      bg: "bg-[linear-gradient(180deg,#062418,#0a3c27_45%,#062418)]",
      shadow:
        "shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.85),inset_0_-4px_6px_-3px_rgba(0,0,0,0.85),0_0_9px_rgba(52,211,153,0.22)]",
    };
  }
  if (points >= 30000) {
    return {
      text: "text-teal-400",
      glow: "[text-shadow:0_0_7px_rgba(45,212,191,0.7)]",
      border: "border-teal-400/45",
      bg: "bg-[linear-gradient(180deg,#0a2422,#123936_45%,#0a2422)]",
      shadow:
        "shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.85),inset_0_-4px_6px_-3px_rgba(0,0,0,0.85),0_0_9px_rgba(45,212,191,0.2)]",
    };
  }
  if (points >= 20000) {
    return {
      text: "text-blue-400",
      glow: "[text-shadow:0_0_6px_rgba(96,165,250,0.65)]",
      border: "border-blue-400/40",
      bg: "bg-[linear-gradient(180deg,#0a1a24,#12293c_45%,#0a1a24)]",
      shadow:
        "shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.85),inset_0_-4px_6px_-3px_rgba(0,0,0,0.85),0_0_8px_rgba(96,165,250,0.18)]",
    };
  }
  return {
    text: "text-slate-400",
    glow: "[text-shadow:0_0_6px_rgba(148,163,184,0.7)]",
    border: "border-slate-400/40",
    bg: "bg-[linear-gradient(180deg,#0f1115,#1a1d24_45%,#0f1115)]",
    shadow:
      "shadow-[inset_0_4px_6px_-3px_rgba(0,0,0,0.85),inset_0_-4px_6px_-3px_rgba(0,0,0,0.85),0_0_8px_rgba(148,163,184,0.15)]",
  };
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
  { symbol: `Melinoe`, name: `Melinoe`, points: () => randomInt(5833, 7423) },
  //Keepsakes
  { symbol: `Silver Wheel`, name: `Silver Wheel`, points: () => randomInt(600, 1200) },
  { symbol: `Knuckle Bones`, name: `Knuckle Bones`, points: () => randomInt(600, 1200) },
  { symbol: `Luckier Tooth`, name: `Luckier Tooth`, points: () => randomInt(600, 1200) },
  { symbol: `Ghost Onion`, name: `Ghost Onion`, points: () => randomInt(600, 1200) },
  { symbol: `Evil Eye`, name: `Evil Eye`, points: () => randomInt(600, 1200) },
  { symbol: `Engraved Pin`, name: `Engraved Pin`, points: () => randomInt(600, 1200) },
  { symbol: `Discordant Bell`, name: `Discordant Bell`, points: () => randomInt(600, 1200) },
  { symbol: `Gold Purse`, name: `Gold Purse`, points: () => randomInt(600, 1200) },
  { symbol: `Metallic Droplet`, name: `Metallic Droplet`, points: () => randomInt(600, 1200) },
  { symbol: `White Antler`, name: `White Antler`, points: () => randomInt(600, 1200) },
  { symbol: `Moon Beam`, name: `Moon Beam`, points: () => randomInt(600, 1200) },
  { symbol: `Cloud Bangle`, name: `Cloud Bangle`, points: () => randomInt(600, 1200) },
  { symbol: `Iridescent Fan`, name: `Iridescent Fan`, points: () => randomInt(600, 1200) },
  { symbol: `Vivid Sea`, name: `Vivid Sea`, points: () => randomInt(600, 1200) },
  { symbol: `Barley Sheaf`, name: `Barley Sheaf`, points: () => randomInt(600, 1200) },
  { symbol: `Harmonic Photon`, name: `Harmonic Photon`, points: () => randomInt(600, 1200) },
  { symbol: `Beautiful Mirror`, name: `Beautiful Mirror`, points: () => randomInt(600, 1200) },
  { symbol: `Adamant Shard`, name: `Adamant Shard`, points: () => randomInt(600, 1200) },
  { symbol: `Everlasting Ember`, name: `Everlasting Ember`, points: () => randomInt(600, 1200) },
  { symbol: `Lion Fang`, name: `Lion Fang`, points: () => randomInt(600, 1200) },
  { symbol: `Blackened Fleece`, name: `Blackened Fleece`, points: () => randomInt(600, 1200) },
  { symbol: `Crystal Figurine`, name: `Crystal Figurine`, points: () => randomInt(600, 1200) },
  { symbol: `Silken Sash`, name: `Silken Sash`, points: () => randomInt(600, 1200) },
  { symbol: `Aromatic Phial`, name: `Aromatic Phial`, points: () => randomInt(600, 1200) },
  { symbol: `Concave Stone`, name: `Concave Stone`, points: () => randomInt(600, 1200) },
  { symbol: `Experimental Hammer`, name: `Experimental Hammer`, points: () => randomInt(600, 1200) },
  { symbol: `Transcendent Embryo`, name: `Transcendent Embryo`, points: () => randomInt(600, 1200) },
  { symbol: `Sword Hilt`, name: `Sword Hilt`, points: () => randomInt(600, 1200) },
  { symbol: `Gorgon Amulet`, name: `Gorgon Amulet`, points: () => randomInt(600, 1200) },
  { symbol: `Fig Leaf`, name: `Fig Leaf`, points: () => randomInt(600, 1200) },
  { symbol: `Calling Card`, name: `Calling Card`, points: () => randomInt(600, 1200) },
  { symbol: `Jeweled Pom`, name: `Jeweled Pom`, points: () => randomInt(600, 1200) },
  { symbol: `Time Piece`, name: `Time Piece`, points: () => randomInt(600, 1200) },
  // Elements
  { symbol: `Water`, name: `Water`, points: () => randomInt(4000, 8000) },
  { symbol: `Earth`, name: `Earth`, points: () => randomInt(4000, 8000) },
  { symbol: `Fire`, name: `Fire`, points: () => randomInt(4000, 8000) },
  { symbol: `Aether`, name: `Aether`, points: () => randomInt(4000, 8000) },
  { symbol: `Air`, name: `Air`, points: () => randomInt(4000, 8000) },
  // Items
  { symbol: `Armor`, name: `Armor`, points: () => randomInt(1000, 2000) },
  { symbol: `Sheep`, name: `Sheep`, points: () => randomInt(6600, 12009) },
  { symbol: `Onion`, name: `Onion`, points: () => randomInt(1, 9999) },
  { symbol: `Pom`, name: `Pom`, points: () => randomInt(10000, 10001) },
  // Vows
  { symbol: `Debt`, name: `Debt`, points: () => randomInt(531, 675) },
  { symbol: `Denial`, name: `Denial`, points: () => randomInt(611, 699) },
  { symbol: `Fangs`, name: `Fangs`, points: () => randomInt(559, 699) },
  { symbol: `Forfeit`, name: `Forfeit`, points: () => randomInt(555, 699) },
  { symbol: `Frenzy`, name: `Frenzy`, points: () => randomInt(553, 699) },
  { symbol: `Grit`, name: `Grit`, points: () => randomInt(543, 691) },
  { symbol: `Hordes`, name: `Hordes`, points: () => randomInt(611, 699) },
  { symbol: `Hubris`, name: `Hubris`, points: () => randomInt(539, 687) },
  { symbol: `Menace`, name: `Menace`, points: () => randomInt(604, 699) },
  { symbol: `Pain`, name: `Pain`, points: () => randomInt(611, 699) },
  { symbol: `Return`, name: `Return`, points: () => randomInt(700, 861) },
  { symbol: `Rivals`, name: `Rivals`, points: () => randomInt(700, 796) },
  { symbol: `Scars`, name: `Scars`, points: () => randomInt(594, 699) },
  { symbol: `Shadow`, name: `Shadow`, points: () => randomInt(700, 844) },
  { symbol: `Time`, name: `Time`, points: () => randomInt(7000, 7880) },
  { symbol: `Void`, name: `Void`, points: () => randomInt(7000, 7870) },
  { symbol: `Wards`, name: `Wards`, points: () => randomInt(700, 796) },
  // Characters
  { symbol: `Aphrodite`, name: `Aphrodite`, points: () => randomInt(1506, 1916) },
  { symbol: `Apollo`, name: `Apollo`, points: () => randomInt(1513, 1925) },
  { symbol: `Arachne`, name: `Arachne`, points: () => randomInt(1654, 2104) },
  { symbol: `Ares`, name: `Ares`, points: () => randomInt(2248, 2860) },
  { symbol: `Artemis`, name: `*Artemis`, points: () => randomInt(1705, 2169) },
  { symbol: `Athena`, name: `Athena`, points: () => randomInt(2558, 2999) },
  { symbol: `Chaos`, name: `Chaos`, points: () => randomInt(5734, 7298) },
  { symbol: `Charon`, name: `*Charon`, points: () => randomInt(1552, 1976) },
  { symbol: `Chronos`, name: `Chronos`, points: () => randomInt(5677, 7225) },
  { symbol: `Circe`, name: `*Circe`, points: () => randomInt(1566, 1992) },
  { symbol: `Demeter`, name: `Demeter`, points: () => randomInt(3000, 3437) },
  { symbol: `Dionysus`, name: `Dionysus`, points: () => randomInt(1500, 1851) },
  { symbol: `Dora`, name: `Dora`, points: () => randomInt(299, 381) },
  { symbol: `Echo`, name: `Echo`, points: () => randomInt(1213, 1499) },
  { symbol: `Hecate`, name: `Hecate`, points: () => randomInt(3225, 4105) },
  { symbol: `Hephaestus`, name: `Hephaestus`, points: () => randomInt(1500, 1875) },
  { symbol: `Hera`, name: `Hera`, points: () => randomInt(3141, 3997) },
  { symbol: `Heracles`, name: `Heracles`, points: () => randomInt(1090, 1388) },
  { symbol: `Hermes`, name: `Hermes`, points: () => randomInt(1500, 1803) },
  { symbol: `Hestia`, name: `Hestia`, points: () => randomInt(830, 1056) },
  { symbol: `Icarus`, name: `Icarus`, points: () => randomInt(1079, 1373) },
  { symbol: `Medea`, name: `*Medea`, points: () => randomInt(1500, 1789) },
  { symbol: `Moros`, name: `Moros`, points: () => randomInt(965, 1229) },
  { symbol: `Narcissus`, name: `Narcissus`, points: () => randomInt(1077, 1371) },
  { symbol: `Nemesis`, name: `Nemesis`, points: () => randomInt(1224, 1499) },
  { symbol: `Odysseus`, name: `Odysseus`, points: () => randomInt(1133, 1443) },
  { symbol: `Poseidon`, name: `Poseidon`, points: () => randomInt(3116, 3966) },
  { symbol: `Selene`, name: `*Selene`, points: () => randomInt(1500, 1761) },
  { symbol: `Skelly`, name: `Skelly`, points: () => randomInt(586, 699) },
  { symbol: `Zagreus`, name: `Zagreus`, points: () => randomInt(1291, 1499) },
  { symbol: `Zeus`, name: `Zeus`, points: () => randomInt(4046, 4999) },
  // Familiars
  { symbol: `Raven`, name: `Raki`, points: () => randomInt(9000, 9999) },
  { symbol: `Frog`, name: `Frinos`, points: () => randomInt(9000, 9999) },
  { symbol: `Polecat`, name: `Gale`, points: () => randomInt(9000, 9999) },
  { symbol: `Hound`, name: `Hecuba`, points: () => randomInt(9000, 9999) },
  { symbol: `Cat`, name: `Toula`, points: () => randomInt(9000, 9999) },
  // Aspects
  { symbol: `cMelinoe Staff`, name: `Melinoe Staff`, points: () => randomInt(7740, 9860) },
  { symbol: `cCirce`, name: `Circe`, points: () => randomInt(862, 1096) },
  { symbol: `cMomus`, name: `Momus`, points: () => randomInt(1137, 1447) },
  { symbol: `cAnubis`, name: `Anubis`, points: () => randomInt(1009, 1285) },
  { symbol: `cMelinoe Blades`, name: `Melinoe Blades`, points: () => randomInt(725, 923) },
  { symbol: `cArtemis`, name: `Artemis`, points: () => randomInt(1214, 1499) },
  { symbol: `cPan`, name: `Pan`, points: () => randomInt(895, 1139) },
  { symbol: `cMorrigan`, name: `Morrigan`, points: () => randomInt(890, 1132) },
  { symbol: `cMelinoe Axe`, name: `Melinoe Axe`, points: () => randomInt(778, 990) },
  { symbol: `cCharon`, name: `Charon`, points: () => randomInt(818, 1040) },
  { symbol: `cThanatos`, name: `Thanatos`, points: () => randomInt(989, 1259) },
  { symbol: `cNergal`, name: `Nergal`, points: () => randomInt(898, 1142) },
  { symbol: `cMelinoe Flames`, name: `Melinoe Flames`, points: () => randomInt(730, 928) },
  { symbol: `cEos`, name: `Eos`, points: () => randomInt(902, 1148) },
  { symbol: `cMoros`, name: `Moros`, points: () => randomInt(834, 1062) },
  { symbol: `cSupay`, name: `Supay`, points: () => randomInt(942, 1200) },
  { symbol: `cMelinoe Skull`, name: `Melinoe Skull`, points: () => randomInt(755, 961) },
  { symbol: `cMedea`, name: `Medea`, points: () => randomInt(832, 1060) },
  { symbol: `cPersephone`, name: `Persephone`, points: () => randomInt(3373, 4293) },
  { symbol: `cHel`, name: `Hel`, points: () => randomInt(963, 1225) },
  { symbol: `cMelinoe Coat`, name: `Melinoe Coat`, points: () => randomInt(744, 946) },
  { symbol: `cNyx`, name: `Nyx`, points: () => randomInt(3018, 3840) },
  { symbol: `cSelene`, name: `Selene`, points: () => randomInt(822, 1046) },
  { symbol: `cShiva`, name: `Shiva`, points: () => randomInt(896, 1140) },
  // Arcana
  { symbol: `c0`, name: `Empty Card`, points: 99 },
  { symbol: `c1`, name: `Sorceress`, points: () => randomInt(700, 864) },
  { symbol: `c2`, name: `Wayward`, points: () => randomInt(729, 927) },
  { symbol: `c3`, name: `Huntress`, points: () => randomInt(705, 897) },
  { symbol: `c4`, name: `Eternity`, points: () => randomInt(801, 1019) },
  { symbol: `c5`, name: `Moon`, points: () => randomInt(835, 1063) },
  { symbol: `c6`, name: `Furies`, points: () => randomInt(848, 1080) },
  { symbol: `c7`, name: `Persistence`, points: () => randomInt(895, 1139) },
  { symbol: `c8`, name: `Messenger`, points: () => randomInt(950, 1208) },
  { symbol: `c9`, name: `Unseen`, points: () => randomInt(950, 1210) },
  { symbol: `c10`, name: `Night`, points: () => randomInt(972, 1236) },
  { symbol: `c11`, name: `Swift`, points: () => randomInt(981, 1249) },
  { symbol: `c12`, name: `Death`, points: () => randomInt(1068, 1360) },
  { symbol: `c13`, name: `Centaur`, points: () => randomInt(1111, 1415) },
  { symbol: `c14`, name: `Origination`, points: () => randomInt(1109, 1411) },
  { symbol: `c15`, name: `Lovers`, points: () => randomInt(1155, 1471) },
  { symbol: `c16`, name: `Enchantress`, points: () => randomInt(1170, 1488) },
  { symbol: `c17`, name: `Boatman`, points: () => randomInt(1187, 1499) },
  { symbol: `c18`, name: `Artificer`, points: () => randomInt(1164, 1482) },
  { symbol: `c19`, name: `Excellence`, points: () => randomInt(1244, 1499) },
  { symbol: `c20`, name: `Queen`, points: () => randomInt(1500, 1740) },
  { symbol: `c21`, name: `Fates`, points: () => randomInt(1500, 1893) },
  { symbol: `c22`, name: `Champions`, points: () => randomInt(1585, 2017) },
  { symbol: `c23`, name: `Strength`, points: () => randomInt(1658, 2110) },
  { symbol: `c24`, name: `Divinity`, points: () => randomInt(1965, 2501) },
  { symbol: `c25`, name: `Judgment`, points: () => randomInt(5000, 6000) },
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
    min: 10000,
    classes: "text-amber-300 bg-gradient-to-tr to-[#0a0a0a] from-amber-900 [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]",
  },
  {
    min: 8000,
    classes: "text-orange-300 bg-gradient-to-tr to-[#0a0a0a] from-orange-900 [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]",
  },
  {
    min: 6000,
    classes: "text-red-300 bg-gradient-to-tr to-[#0a0a0a] from-red-900 [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]",
  },
  {
    min: 4500,
    classes:
      "text-fuchsia-300 bg-gradient-to-tr to-[#0a0a0a] from-fuchsia-900 [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]",
  },
  {
    min: 3000,
    classes: "text-purple-300 bg-gradient-to-tr to-[#0a0a0a] from-purple-900 [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]",
  },
  {
    min: 1500,
    classes:
      "text-emerald-300 bg-gradient-to-tr to-[#0a0a0a] from-emerald-900 [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]",
  },
  {
    min: 750,
    classes: "text-blue-300 bg-gradient-to-tr to-[#0a0a0a] from-blue-900 [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]",
  },
  {
    min: 1,
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
// max, 999999.
function scoreForResult(landed) {
  const allMatch = landed.every((l) => l.index === landed[0].index);
  if (allMatch) return 999999;
  const raw = landed.reduce((sum, l) => sum + l.points, 0);
  return Math.max(0, Math.min(999999, raw));
}
// --- Bonus detection ----------------------------------------------
// After all 25 reels land, the full board is scanned for bonus
// conditions — plain if-statements, so new rules are easy to add or
// tune. Each rule that fires contributes one bonus entry; every
// entry becomes one extra card appended onto the end of the results
// grid, and its points are added on top of the normal total.
//
// Groups are just lists of icon `name`s — group whichever icons you
// want to count together.
const BONUS_GROUP_NIGHT_FAMILY = ["Raki", "Frinos", "Gale", "Hecuba", "Toula"];
const BONUS_GROUP_ASPECT = [
  `Melinoe Staff`,
  `Circe`,
  `Momus`,
  `Anubis`,
  `Melinoe Blades`,
  `Artemis`,
  `Pan`,
  `Morrigan`,
  `Melinoe Axe`,
  `Charon`,
  `Thanatos`,
  `Nergal`,
  `Melinoe Flames`,
  `Eos`,
  `Moros`,
  `Supay`,
  `Melinoe Skull`,
  `Medea`,
  `Persephone`,
  `Hel`,
  `Melinoe Coat`,
  `Nyx`,
  `Selene`,
  `Shiva`,
];
const BONUS_GROUP_ARCANA = [
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "c10",
  "c11",
  "c12",
  "c13",
  "c14",
  "c15",
  "c16",
  "c17",
  "c18",
  "c19",
  "c20",
  "c21",
  "c22",
  "c23",
  "c24",
  "c25",
];
const BONUS_GROUP_OLYMPIANS = [
  "Zeus",
  "Poseidon",
  "Hera",
  "Demeter",
  "Athena",
  "Apollo",
  "*Artemis",
  "Ares",
  "Aphrodite",
  "Hephaestus",
  "Hermes",
  "Dionysus",
  "Hestia",
];
// Every icon under the "Characters" comment in DEFAULT_ICONS,
// including the *-prefixed ones (those exist purely to keep a
// Character's name distinct from its same-named Aspect counterpart —
// e.g. Character "*Artemis" vs Aspect "Artemis" — so bonus counting
// doesn't accidentally lump the two together). Olympians (above) is a
// subset of this same list, so an Olympian landing counts toward both
// its own bonus and this wider one.
const BONUS_GROUP_CHARACTERS = [
  "Aphrodite",
  "Apollo",
  "Arachne",
  "Ares",
  "*Artemis",
  "Athena",
  "Chaos",
  "*Charon",
  "Chronos",
  "*Circe",
  "Demeter",
  "Dionysus",
  "Dora",
  "Echo",
  "Hecate",
  "Hephaestus",
  "Hera",
  "Heracles",
  "Hermes",
  "Hestia",
  "Icarus",
  "*Medea",
  "Moros",
  "Narcissus",
  "Nemesis",
  "Odysseus",
  "Poseidon",
  "*Selene",
  "Skelly",
  "Zagreus",
  "Zeus",
];
// Every icon under the "Keepsakes" comment.
const BONUS_GROUP_KEEPSAKES = [
  "Silver Wheel",
  "Knuckle Bones",
  "Luckier Tooth",
  "Ghost Onion",
  "Evil Eye",
  "Engraved Pin",
  "Discordant Bell",
  "Gold Purse",
  "Metallic Droplet",
  "White Antler",
  "Moon Beam",
  "Cloud Bangle",
  "Iridescent Fan",
  "Vivid Sea",
  "Barley Sheaf",
  "Harmonic Photon",
  "Beautiful Mirror",
  "Adamant Shard",
  "Everlasting Ember",
  "Lion Fang",
  "Blackened Fleece",
  "Crystal Figurine",
  "Silken Sash",
  "Aromatic Phial",
  "Concave Stone",
  "Experimental Hammer",
  "Transcendent Embryo",
  "Sword Hilt",
  "Gorgon Amulet",
  "Fig Leaf",
  "Calling Card",
  "Jeweled Pom",
  "Time Piece",
];
// Every icon under the "Elements" comment.
const BONUS_GROUP_ELEMENTS = ["Water", "Earth", "Fire", "Aether", "Air"];
// Every icon under the "Items" comment.
const BONUS_GROUP_ITEMS = ["Armor", "Sheep", "Onion", "Pom"];
// Every icon under the "Vows" comment.
const BONUS_GROUP_VOWS = [
  "Debt",
  "Denial",
  "Fangs",
  "Forfeit",
  "Frenzy",
  "Grit",
  "Hordes",
  "Hubris",
  "Menace",
  "Pain",
  "Return",
  "Rivals",
  "Scars",
  "Shadow",
  "Time",
  "Void",
  "Wards",
];
// Minimum times the same icon has to repeat on the board (outside of
// a full-board jackpot, which scoreForResult already handles on its
// own) to count as a "duplicate" bonus.
const DUPLICATE_BONUS_TIERS = [
  { min: 5, pointsPerIcon: () => randomInt(10000, 20000) },
  { min: 4, pointsPerIcon: () => randomInt(5000, 10000) },
  { min: 3, pointsPerIcon: () => randomInt(2500, 5000) },
  { min: 2, pointsPerIcon: () => randomInt(2000, 4000) },
];

function evaluateBonuses(landed, icons) {
  const bonuses = [];
  const names = landed.map((l) => icons[l.index].name);

  // Rule: Keepsakes — biggest single category (33 unique icons), so
  // it needs the highest counts to clear each tier.
  const keepsakeCount = names.filter((n) => BONUS_GROUP_KEEPSAKES.includes(n)).length;
  if (keepsakeCount >= 2) {
    bonuses.push({
      name: `Favor Collector x2`,
      points: randomInt(1000, 3000),
    });
  }
  if (keepsakeCount >= 4) {
    bonuses.push({
      name: `Favor Collector x4`,
      points: randomInt(2500, 4500),
    });
  }
  if (keepsakeCount >= 6) {
    bonuses.push({
      name: `Favor Collector x6`,
      points: randomInt(4500, 7000),
    });
  }
  if (keepsakeCount >= 9) {
    bonuses.push({
      name: `Favor Collector x9`,
      points: randomInt(7000, 11000),
    });
  }

  // Rule: Elements — only 5 unique icons in the pool, so even 2
  // landing is a meaningfully rare event; one flat bonus is enough.
  const elementCount = names.filter((n) => BONUS_GROUP_ELEMENTS.includes(n)).length;
  if (elementCount >= 2) {
    bonuses.push({
      name: `Elementalist x2`,
      points: randomInt(6000, 10000),
    });
  }
  if (elementCount >= 3) {
    bonuses.push({
      name: `Elementalist x3`,
      points: randomInt(10000, 12000),
    });
  }
  if (elementCount >= 4) {
    bonuses.push({
      name: `Elementalist x4`,
      points: randomInt(12000, 15000),
    });
  }

  // Rule: Items — smallest category (4 unique icons); same
  // single-threshold treatment as Elements.
  const itemCount = names.filter((n) => BONUS_GROUP_ITEMS.includes(n)).length;
  if (itemCount >= 2) {
    bonuses.push({
      name: `Item Hoard x2`,
      points: randomInt(4000, 8000),
    });
  }
  if (itemCount >= 3) {
    bonuses.push({
      name: `Item Hoard x4`,
      points: randomInt(8000, 10000),
    });
  }

  // Rule: Vows — mid-size category (17 unique icons), similar
  // spacing to Aspects below.
  const vowCount = names.filter((n) => BONUS_GROUP_VOWS.includes(n)).length;
  if (vowCount >= 2) {
    bonuses.push({
      name: `Fatal Vows x2`,
      points: randomInt(2000, 3500),
    });
  }
  if (vowCount >= 3) {
    bonuses.push({
      name: `Fatal Vows x3`,
      points: randomInt(3000, 4000),
    });
  }
  if (vowCount >= 4) {
    bonuses.push({
      name: `Fatal Vows x4`,
      points: randomInt(3500, 5500),
    });
  }
  if (vowCount >= 6) {
    bonuses.push({
      name: `Fatal Vows x6`,
      points: randomInt(5500, 9000),
    });
  }

  // Rule: Characters — every Character icon, Olympian or not (31
  // unique icons total). An Olympian landing still also counts toward
  // the narrower Olympians bonus further below.
  const characterCount = names.filter((n) => BONUS_GROUP_CHARACTERS.includes(n)).length;
  if (characterCount >= 4) {
    bonuses.push({
      name: `Cast of Characters x4`,
      points: randomInt(2500, 4500),
    });
  }
  if (characterCount >= 6) {
    bonuses.push({
      name: `Cast of Characters x6`,
      points: randomInt(4500, 7000),
    });
  }
  if (characterCount >= 9) {
    bonuses.push({
      name: `Cast of Characters x9`,
      points: randomInt(7000, 11000),
    });
  }

  // Rule: 2–5 icons from the Night Family group landed anywhere on
  // the board.
  const nightCount = names.filter((n) => BONUS_GROUP_NIGHT_FAMILY.includes(n)).length;
  if (nightCount >= 2) {
    bonuses.push({
      name: `Pet Family x2`,
      points: randomInt(8000, 12000),
    });
  }

  const aspectCount = names.filter((n) => BONUS_GROUP_ASPECT.includes(n)).length;
  if (aspectCount >= 3) {
    bonuses.push({
      name: `Weapon Master x3`,
      points: randomInt(3333, 6666),
    });
  }
  if (aspectCount >= 4) {
    bonuses.push({
      name: `Weapon Master x4`,
      points: randomInt(6666, 9999),
    });
  }

  const arcanaCount = names.filter((n) => BONUS_GROUP_ARCANA.includes(n)).length;
  if (arcanaCount >= 2) {
    bonuses.push({
      name: `Perfect Deck x2`,
      points: randomInt(2000, 3000),
    });
  }
  if (arcanaCount >= 3) {
    bonuses.push({
      name: `Perfect Deck x3`,
      points: randomInt(3000, 4000),
    });
  }
  if (arcanaCount >= 5) {
    bonuses.push({
      name: `Perfect Deck x5`,
      points: randomInt(5000, 9999),
    });
  }

  // Rule: 2–5 Olympians landed anywhere on the board.
  const olympianCount = names.filter((n) => BONUS_GROUP_OLYMPIANS.includes(n)).length;
  if (olympianCount >= 2) {
    bonuses.push({
      name: `Olympians Champion x2`,
      points: randomInt(2000, 4000),
    });
  }
  if (olympianCount >= 3) {
    bonuses.push({
      name: `Olympians Champion x3`,
      points: randomInt(3000, 6000),
    });
  }
  if (olympianCount >= 5) {
    bonuses.push({
      name: `Olympians Champion x5`,
      points: randomInt(5000, 9999),
    });
  }

  // Rule: any single icon repeated DUPLICATE_BONUS_MIN+ times, short
  // of every reel matching (that's the separate jackpot payout).
  const counts = {};
  names.forEach((n) => {
    counts[n] = (counts[n] || 0) + 1;
  });
  Object.entries(counts).forEach(([name, count]) => {
    if (count >= landed.length) return; // full-board jackpot, handled elsewhere
    const tier = DUPLICATE_BONUS_TIERS.find((t) => count >= t.min);
    if (!tier) return;
    bonuses.push({
      name: `${name} x${count}`,
      points: tier.pointsPerIcon(),
    });
  });

  return bonuses;
}

// Delay between each bonus card's reveal when more than one rule
// fires on the same spin.
const BONUS_REVEAL_STAGGER_S = 0.55;

// Timing for the result-card slide-in (used by the useLayoutEffect
// below, and to work out exactly when the 25th card finishes
// animating in — the bonus cards below deliberately wait for that.
const CARD_REVEAL_STAGGER_S = 0.2;
const CARD_REVEAL_DURATION_S = 0.3;

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
  const [displayPoints, setDisplayPoints] = useState(0);
  // The icon currently shown in each reel cell — flickers rapidly
  // while that reel is charging, then locks to the landed icon.
  const [displayIcons, setDisplayIcons] = useState(Array.from({ length: REEL_COUNT }, () => icons[0]));
  // One entry per reel: null while idle/spinning (renders as a
  // placeholder row so the layout never jumps), or { name, points }
  // once that spin's result is calculated.
  const [resultNames, setResultNames] = useState(Array.from({ length: REEL_COUNT }, () => null));

  // Bonus cards revealed after the main 25-card grid finishes — one
  // entry per landed bonus icon (see BONUS_NAMES), appended in order
  // as each one reveals. Empty between spins / while none have
  // triggered yet.
  const [bonusResults, setBonusResults] = useState([]);
  const bonusRefs = useRef([]);
  // Pending gsap.delayedCall handles from the *current* spin's bonus
  // reveal sequence (see spin() below). These fire well after
  // spinning flips back to false, so if the player fires off another
  // spin while they're still queued, they must be killed — otherwise
  // a stale delayedCall lands mid-way through the next spin and
  // appends the previous spin's bonus card (and score bump) onto it.
  const bonusTimersRef = useRef([]);

  const landedRef = useRef(Array.from({ length: REEL_COUNT }, () => null));
  const completedRef = useRef(0);

  // windowStartAt: epoch ms the current 24h allowance window began, or
  // null if no spins have been used yet. spinsUsed: how many of this
  // window's MAX_SPINS_PER_WINDOW have been spent. `now` only exists
  // to force a re-render once per second so the countdown display
  // stays live while the window is exhausted — the actual remaining
  // time is always computed fresh from windowStartAt, never stored as
  // a separately-ticking number.
  const [windowStartAt, setWindowStartAt] = useState(null);
  const [spinsUsed, setSpinsUsed] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  // On mount, resume any window already in progress from a previous
  // visit/reload by reading it back out of localStorage (loadSpinWindow
  // already discards a window that's fully elapsed).
  useEffect(() => {
    const loaded = loadSpinWindow();
    setWindowStartAt(loaded.windowStartAt);
    setSpinsUsed(loaded.spinsUsed);
  }, []);

  const spinsRemaining = Math.max(0, MAX_SPINS_PER_WINDOW - spinsUsed);
  // Only once every spin in the window is used does a cooldown apply —
  // it runs until 24h after the window's *first* spin, not the last.
  const cooldownEndAt = windowStartAt && spinsRemaining === 0 ? windowStartAt + SPIN_WINDOW_MS : null;

  // While the window is exhausted, tick `now` forward once a second so
  // the countdown re-renders; the effect naturally stops re-scheduling
  // once cooldownEndAt clears below.
  useEffect(() => {
    if (!cooldownEndAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [cooldownEndAt]);

  const cooldownRemainingMs = cooldownEndAt ? Math.max(0, cooldownEndAt - now) : 0;
  const onCooldown = cooldownRemainingMs > 0;

  // Once the countdown reaches zero, the 24h window has fully
  // elapsed — reset it so the player gets a fresh set of spins.
  useEffect(() => {
    if (cooldownEndAt && cooldownRemainingMs <= 0) {
      setWindowStartAt(null);
      setSpinsUsed(0);
      saveSpinWindow({ windowStartAt: null, spinsUsed: 0 });
    }
  }, [cooldownRemainingMs, cooldownEndAt]);

  // Records a spin against the current window — called the instant
  // the player presses Spin, not when the result lands. Starts the
  // window on the player's *first* spin of a fresh cycle, so the 24h
  // reset always counts from that first spin, not the last one that
  // exhausted the allowance.
  const consumeSpin = () => {
    const windowStart = windowStartAt ?? Date.now();
    const nextSpinsUsed = spinsUsed + 1;
    setWindowStartAt(windowStart);
    setSpinsUsed(nextSpinsUsed);
    saveSpinWindow({ windowStartAt: windowStart, spinsUsed: nextSpinsUsed });
  };

  // Clean up any in-flight flicker intervals / charge timers if the
  // component unmounts mid-spin.
  useEffect(() => {
    return () => {
      flickerIntervalsRef.current.forEach((id) => clearInterval(id));
      chargeTimeoutsRef.current.forEach((id) => clearTimeout(id));
      bonusTimersRef.current.forEach((t) => t.kill());
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
        duration: CARD_REVEAL_DURATION_S,
        ease: "power2.out",
        stagger: CARD_REVEAL_STAGGER_S,
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultNames]);

  // Bonus cards are appended one at a time (not all at once), so only
  // the newest entry needs animating in each time this fires — the
  // earlier ones are already settled at their final state. Same
  // slide-up treatment as the result cards above.
  useLayoutEffect(() => {
    if (!bonusResults.length) return;
    const el = bonusRefs.current[bonusResults.length - 1];
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 28, scale: 0.25 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.7)" },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bonusResults]);

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
            landedRef.current[reelIndex] = { index: targetIndex, points: resolvePoints(icons[targetIndex].points) };
            onLanded();
          },
        },
      );
    }, chargeMs);
  };

  const spin = () => {
    if (spinning || onCooldown) return;
    setSpinning(true);
    landedRef.current = Array.from({ length: REEL_COUNT }, () => null);
    completedRef.current = 0;
    consumeSpin();

    // Clear the name rows back to placeholders for the duration of
    // the spin — the reveal only fills in once this spin's result is
    // calculated. The rows stay mounted throughout, so nothing
    // resizes or jumps.
    setResultNames(Array.from({ length: REEL_COUNT }, () => null));

    // Clear out any bonus cards from the previous spin — and, just as
    // importantly, kill any of that spin's bonus delayedCalls that
    // haven't fired yet. spinning flips back to false as soon as the
    // reels land, well before the staggered bonus reveals below have
    // had time to run, so it's entirely possible to smash Spin again
    // while they're still pending. Without this, a stale callback
    // fires mid-way through the new spin and appends the old spin's
    // bonus card (plus its score bump) onto the new one.
    bonusTimersRef.current.forEach((t) => t.kill());
    bonusTimersRef.current = [];
    setBonusResults([]);
    bonusRefs.current = [];

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
          const landed = landedRef.current; // [{ index, points }, ...] — points already resolved once, at landing time
          const points = scoreForResult(landed);
          const allMatch = landed.every((l) => l.index === landed[0].index);

          // Points are calculated — fill in the name rows; the
          // slide-up animation runs in the layout effect above once
          // these are rendered (before the browser paints).
          setResultNames(
            landed.map((l) => ({
              name: icons[l.index].name,
              points: l.points,
            })),
          );

          // Build the score up one landed icon at a time, timed to
          // match each result card's reveal stagger above (0.1s
          // apart) — so the total visibly "adds up" as each name
          // slides into place, instead of jumping straight to the
          // final number in one continuous tween.
          gsap.killTweensOf(scoreProxyRef.current);
          const scoreTl = gsap.timeline();
          // duration is deliberately equal to the stagger below (not
          // larger) — each tween must fully finish before the next
          // one starts writing to the same scoreProxyRef.value
          // property, or GSAP's per-frame absolute writes cause the
          // later tween to clobber the earlier one's contribution
          // mid-flight, undercounting the final total.
          const SCORE_STEP_MS = 0.1;
          landed.forEach((l, revealIndex) => {
            scoreTl.to(
              scoreProxyRef.current,
              {
                value: `+=${l.points}`,
                duration: SCORE_STEP_MS,
                ease: "power2.out",
                onUpdate: () => {
                  setDisplayPoints(Math.min(999999, Math.round(scoreProxyRef.current.value)));
                },
              },
              revealIndex * SCORE_STEP_MS, // same stagger the name-card reveal uses
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
                setDisplayPoints(Math.min(999999, Math.round(scoreProxyRef.current.value)));
              },
            });
          }

          // Bonus round: scan the full landed board for bonus
          // conditions (see evaluateBonuses). Cards reveal only once
          // all 25 result cards have finished their own slide-in
          // animation — not just once the (faster) score count-up
          // finishes — so the bonus visibly follows the full board
          // rather than overlapping it. Each bonus entry then reveals
          // as its own card, one after another, appended onto the end
          // of the results grid, bumping the total further each time.
          const bonusEntries = evaluateBonuses(landed, icons);
          if (bonusEntries.length) {
            const cardsRevealTotalS = (REEL_COUNT - 1) * CARD_REVEAL_STAGGER_S + CARD_REVEAL_DURATION_S;
            bonusEntries.forEach((entry, revealIndex) => {
              const timer = gsap.delayedCall(cardsRevealTotalS + revealIndex * BONUS_REVEAL_STAGGER_S, () => {
                setBonusResults((prev) => [...prev, entry]);
                gsap.to(scoreProxyRef.current, {
                  value: `+=${entry.points}`,
                  duration: 0.45,
                  ease: "power2.out",
                  onUpdate: () => {
                    setDisplayPoints(Math.min(999999, Math.round(scoreProxyRef.current.value)));
                  },
                });
              });
              bonusTimersRef.current.push(timer);
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
            <span>H2_Cross_Slot</span>
          </div>
          <div className="flex gap-1.5" aria-label={`Points ${displayPoints}`}>
            {(() => {
              const tier = digitTierClasses(displayPoints);
              return String(displayPoints)
                .padStart(6, "0")
                .split("")
                .map((digit, i) => (
                  <div
                    key={i}
                    className={`w-10 sm:w-12 h-[48px] sm:h-[54px] flex items-center justify-center font-[UbuntuMono] font-bold text-[24px] rounded border-2 transition-all duration-700 ease-out ${tier.text} ${tier.glow} ${tier.bg} ${tier.border} ${tier.shadow}`}
                  >
                    {digit}
                  </div>
                ));
            })()}
          </div>
          <button
            ref={btnRef}
            onClick={spin}
            disabled={spinning || onCooldown}
            className="appearance-none border-0 cursor-pointer font-[Ale] font-bold text-base tracking-[4px] uppercase text-[#050506] bg-[linear-gradient(180deg,#7ff0dd,#2dd4bf_55%,#0f766e)] px-16 py-3.5 rounded-lg transition-[transform,filter] duration-150 hover:brightness-110 active:translate-y-1 focus-visible:outline focus-visible:outline-teal-400 focus-visible:outline-offset-4 disabled:cursor-default disabled:text-black/60 disabled:bg-[linear-gradient(180deg,#4d6864,#3a5451_55%,#2b3f3c)] disabled:animate-none"
          >
            {spinning ? "Spinning…" : onCooldown ? formatCountdown(cooldownRemainingMs) : "Spin"}
          </button>
          {
            <div className="text-center font-[Ale] text-xs tracking-[2px] uppercase text-slate-400">
              {onCooldown
                ? `Next spin available in ${formatCountdown(cooldownRemainingMs)}`
                : `${spinsRemaining} / ${MAX_SPINS_PER_WINDOW} spins left today`}
            </div>
          }

          <div className="flex flex-col lg:flex-row w-full gap-x-8 gap-4 items-center lg:items-start justify-center">
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
            above, one compact card per landed reel — plus, appended
            onto the end of this same grid (still GRID_COLS wide, so
            it simply wraps onto new rows), one card per bonus that
            fired for this spin. */}
            <div
              className="grid w-full max-w-150 gap-2"
              style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
            >
              {resultNames.map((item, i) => {
                const aura = auraTextClass(item?.points);
                const card = item && (
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

              {bonusResults.map((item, i) => (
                <div className="aura aura-gold" key={`bonus-${i}`}>
                  <div
                    ref={(el) => (bonusRefs.current[i] = el)}
                    className="text-yellow-300 h-full flex flex-col items-center justify-center rounded gap-0.5 px-1 py-2 font-[Ale] font-semibold tracking-[0.5px] uppercase text-center bg-gradient-to-t to-[#0e0c12] from-yellow-800 [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]"
                  >
                    <span className="font-[UbuntuMono] text-[11px]">Bonus</span>
                    <span className="w-full overflow-hidden font-[Ale] text-[12px] leading-tight">{item.name}</span>
                    <span className="font-[Ale] font-semibold text-[18px] tracking-normal opacity-90">
                      +{item.points}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageBlock>
  );
}

export default SlotMachine;
