import PageBlock from "../Block/PageBlock";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { textHoverObject } from "../Data/TextHoverObject";
import { p9boons } from "../Data/P9BoonObj";

gsap.registerPlugin(useGSAP);

import { useRef, useEffect } from "react";

const team1 = [
  `Foolish`,
  `PizzaPepperoni`,
  `Red`,
  `HookieDookie`,
  `NotTia`,
  `Thereptier`,
  `Kol`,
  `Rip Van Weikle`,
  `Nateal`,
  `Yoshi`,
  `halo effect`,
  `PeterHatEater`,
  `TherineSelene`,
  `Magearna`,
  `Hayz`,
  `Dr.Omega`,
  `andrw`,
  `cragbeers`,
  `rip van weikle`,
].sort();
const team2 = [
  `TheDarkOmen`,
  `Checkmate`,
  `Aki`,
  `Vangetsu`,
  `Xarrotd`,
  `Eris`,
  `Crystal`,
  `ne0conker`,
  `Fate`,
  `BehemothSteve`,
  `ClearlyNotJao`,
  `Shira Heartslaught`,
  `MedusaSkirt`,
  `paolo`,
  `SelahW`,
  `z-kid`,
  `scam scam scam`,
  `Astera`,
].sort();
const team1name = `Visual Clarity`;
const team2name = `Nemesimps`;
// Box Details
const box1 = [`Melinoe Skull`, `Medea`, `Persephone`, `Hel`];
const box7 = [`Melinoe Skull`, `Melinoe Blades`, `Circe`];
const box20 = [`Melinoe Blades`, `Artemis`, `Pan`, `Morrigan`];

export default function Bingo1() {
  const containerRef = useRef(null);
  const lastSpawn = useRef(0);

  useEffect(() => {
    let interval;

    const start = () => {
      interval = setInterval(() => {
        const x = Math.random() * containerRef.current.offsetWidth;
        const y = Math.random() * containerRef.current.offsetHeight;
        spawnIcon(x, y);
      }, 500);
    };

    const stop = () => {
      clearInterval(interval);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    start(); // kick off on mount

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const spawnIcon = (x, y) => {
    if (!containerRef.current) return;

    const icons = [...team1.filter((item) => item !== "Magearna").map((item) => item.toLowerCase())];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const img = document.createElement("img");
    img.src = `./Avatar/${randomIcon}.webp`;
    img.classList.add("absolute", "w-8", "h-8", "pointer-events-none", "rounded-full");

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    containerRef.current.appendChild(img);

    const tl = gsap.timeline({ onComplete: () => img.remove() });
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
        duration: gsap.utils.random(0.8, 1.4),
        y: gsap.utils.random(-80, -200),
        x: gsap.utils.random(-50, 50),
        rotation: gsap.utils.random(-90, 90),
        opacity: 1,
        ease: "power2.out",
      },
    ).to(img, {
      duration: gsap.utils.random(0.8, 1.4),
      y: gsap.utils.random(80, 140),
      x: gsap.utils.random(-30, 30),
      rotation: gsap.utils.random(-180, 180),
      opacity: 0,
      ease: "power4.in",
    });
  };

  // Then your mouse handler becomes a thin wrapper:
  const handleMouseMove = (e) => {
    const now = Date.now();
    if (now - lastSpawn.current < 200) return;
    lastSpawn.current = now;

    const rect = containerRef.current.getBoundingClientRect();
    spawnIcon(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <PageBlock>
      <div className="py-16 text-[13px] overflow-x-hidden">
        {/* GSAP */}
        <div className="min-h-75 flex justify-center items-center relative" ref={containerRef}>
          <div className="relative overflow-visible inline-block">
            <div
              onMouseMove={handleMouseMove}
              className="hover-target text-white font-bold text-[36px] uppercase cursor-default select-none text-center font-[Sr] flex flex-col"
            >
              <div className="text-blue-300">Team</div>
              <div className="text-blue-300">{team1name}</div>
              <div className="text-[16px]">Winners of Bingo #1</div>
            </div>
          </div>
        </div>
        {/* Team & Players */}
        <div className="flex flex-col md:flex-row my-10 gap-2 gap-y-8">
          <div>
            <div className="text-start mb-2 font-[Sr] text-[20px]">{team1name}</div>
            <div className="flex gap-1 justify-start flex-wrap">
              {team1.map((item) => (
                <div className="p-1 bg-blue-400 text-black rounded min-w-15 text-center font-[Ale] flex items-center gap-1">
                  <div className="relative w-8 h-8">
                    <img
                      src={`/Avatar/${item.toLowerCase()}.webp`}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="w-8 h-8 rounded-full bg-[black] text-white items-center justify-center hidden truncate text-[10px]">
                      {item.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-end mb-2 font-[Sr] text-[20px]">{team2name}</div>
            <div className="flex gap-1 justify-end flex-wrap">
              {team2.map((item) => (
                <div className="p-1 bg-red-500 text-black rounded min-w-15 text-center font-[Ale] flex items-center gap-1">
                  <div className="relative w-8 h-8">
                    <img
                      src={`/Avatar/${item.toLowerCase()}.webp`}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="w-8 h-8 rounded-full bg-[black] text-white items-center justify-center hidden truncate text-[10px]">
                      {item.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Box Start */}
        <div className="my-10 flex justify-center flex-wrap gap-2 text-[14px]">
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C1.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr] ">{team1name}</div>
              <div className="flex gap-1">
                {box1.map((item) => (
                  <div className="relative size-10 shrink-0">
                    <img
                      src="/BoonBorder/Hammer.png"
                      alt="Border"
                      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                    />
                    <img
                      draggable={false}
                      src={`/P9/${item}.png`}
                      alt="Familiar"
                      className="absolute inset-0 w-full h-full p-1 object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="font-[Ale] ">- Skulls</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Surface</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Speed</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C2.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/pizzapepperoni.webp" alt="Avatar" className="size-7 rounded-full" />
                PizzaPepperoni
              </div>
              <div className="flex gap-1 items-center font-[Ale]">
                <img src="/hover/HealthBar.png" alt="Avatar" className="size-7" /> This Exist?
              </div>
              <div className="font-[Ale] ">- Can't Touch This</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">50 Fear</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Speed</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Time</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C3.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/andrw.webp" alt="Avatar" className="size-7 rounded-full" />
                andrw
              </div>
              <div className="font-[Ale]  flex items-center">
                <div className="relative size-9 shrink-0">
                  <img
                    src="/BoonBorder/Hammer.png"
                    alt="Border"
                    className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                  />
                  <img
                    draggable={false}
                    src={`/buildgui/Storm Ring.png`}
                    alt="Boon"
                    className="absolute inset-0 w-full h-full p-1 object-contain"
                  />
                </div>
                <div>
                  Lvl. <span className="line-through">69</span> 96
                </div>
              </div>
              <div className="font-[Ale]">- Zeus Would Be Proud</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Boon</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Level</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Zeus</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-red-500/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C4.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/aki.webp" alt="Avatar" className="size-7 rounded-full" />
                Aki
              </div>
              <div className="flex gap-1 items-center font-[Ale]">
                <img src="/hover/Summit.png" alt="Avatar" className="size-7" /> Baby Don't Hurt Me
              </div>
              <div className="font-[Ale]">- Mahoraga</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Damage</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Time</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C5.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/nottia.webp" alt="Avatar" className="size-7 rounded-full" />
                NotTia
              </div>
              <div className="font-[Ale]  flex items-center">
                <div className="flex gap-1 items-center font-[Ale]">
                  <img src="/hover/Armor.png" alt="Avatar" className="size-9" /> 567
                </div>
              </div>
              <div className="font-[Ale]">- Vintage</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">50 Fear</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Armor</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Arachne</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-red-500/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C6.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <div className="font-[Sr] ">{team2name}</div>
              </div>
              <div className="font-[Ale]  flex items-center">
                <div className="grid grid-cols-4 gap-1 items-center font-[Ale]">
                  <img src="/DreamDive/Erebus.png" alt="Avatar" className="size-7" />
                  <img src="/DreamDive/Oceanus.png" alt="Avatar" className="size-7" />
                  <img src="/DreamDive/Fields.png" alt="Avatar" className="size-7" />
                  <img src="/DreamDive/Tartarus.png" alt="Avatar" className="size-7" />
                  <img src="/DreamDive/Ephyra.png" alt="Avatar" className="size-7" />
                  <img src="/DreamDive/Thessaly.png" alt="Avatar" className="size-7" />
                  <img src="/DreamDive/Olympus.png" alt="Avatar" className="size-7" />
                  <img src="/DreamDive/Summit.png" alt="Avatar" className="size-7" />
                </div>
              </div>
              <div className="font-[Ale]">- Morrigan</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">62 Fear</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">All Region</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C7.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <div className="font-[Sr]  flex gap-1 items-center">
                  <img src="/Avatar/thereptier.webp" alt="Avatar" className="size-7 rounded-full" />
                  Thereptier (ft. Kol
                  <img src="/Avatar/kol.webp" alt="Avatar" className="size-7 rounded-full" />)
                </div>
              </div>
              <div className="font-[Ale]  flex gap-1 items-center">
                Let me get <img src="/hover/Boon.png" alt="Avatar" className="size-7" /> x 58
              </div>
              <div className="font-[Ale]">- EchoMaxxing</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Boon</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C8.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <div className="font-[Sr] ">{team1name}</div>
              </div>
              <div className="font-[Ale]  flex gap-1 items-center">
                {box7.map((item) => (
                  <div className="relative size-10 shrink-0">
                    <img
                      src="/BoonBorder/Hammer.png"
                      alt="Border"
                      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                    />
                    <img
                      draggable={false}
                      src={`/P9/${item}.png`}
                      alt="Aspects"
                      className="absolute inset-0 w-full h-full p-1 object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="font-[Ale]">- 197371</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">3 Weapon</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">62 Fear</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Surface</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-red-500/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C9.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <div className="font-[Sr] ">{team2name}</div>
              </div>
              <div className="font-[Ale]  flex gap-1 items-center">
                <img src="/hover/Chronos.png" alt="Avatar" className="size-9" /> Here We Go Again
              </div>
              <div className="font-[Ale]">- New Toy</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">All Weapon</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Underworld</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C10.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/halo effect.webp" alt="Avatar" className="size-7 rounded-full" />
                halo effect
              </div>
              <div className="font-[Ale]  flex items-center">
                <div className="font-[Ale]  flex items-center">
                  <div className="flex gap-1 items-center font-[Ale]">
                    <img src="/Surface.png" alt="Avatar" className="size-7" />
                    +
                    <img src="/DreamDive/Ephyra.png" alt="Avatar" className="size-7" />
                    <img src="/DreamDive/Thessaly.png" alt="Avatar" className="size-7" />
                    <img src="/DreamDive/Olympus.png" alt="Avatar" className="size-7" />
                    <img src="/DreamDive/Summit.png" alt="Avatar" className="size-7" />
                    <span>{`<`}</span>8
                  </div>
                </div>
              </div>
              <div className="font-[Ale]">- Math</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Rival 4</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Time</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Surface</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C11.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/andrw.webp" alt="Avatar" className="size-7 rounded-full" />
                andrw
              </div>
              <div className="flex gap-1 items-center font-[Ale]">
                <img src="/hover/Charon.png" alt="Avatar" className="size-9" /> You Broke?
              </div>
              <div className="font-[Ale] ">- Window Shopping</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Gold</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C12.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/pizzapepperoni.webp" alt="Avatar" className="size-7 rounded-full" />
                PizzaPepperoni
              </div>
              <div className="flex gap-1 items-center font-[Ale]">
                <img src="/hover/Zagreus.png" alt="Avatar" className="size-9" /> Under 1 min
              </div>
              <div className="font-[Ale] ">- Wait a Minute</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Zagreus</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Time</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-r from-blue-800/50 via-[#0e0c12] to-red-500/50 rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C13.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr] text-[12px] flex gap-1 items-center">
                Kol/Red
                <img src="/Avatar/kol.webp" alt="Avatar" className="size-6 rounded-full" />
                <img src="/Avatar/red.webp" alt="Avatar" className="size-6 rounded-full" />
                |
                <img src="/Avatar/aki.webp" alt="Avatar" className="size-6 rounded-full" />
                <img src="/Avatar/fate.webp" alt="Avatar" className="size-6 rounded-full" />
                Fate/Aki
              </div>
              <div className="flex gap-1 items-center font-[Ale]">
                <img src="/hover/HadesPersephone.png" alt="Avatar" className="size-9" />
              </div>
              <div className="font-[Ale] ">- Sharing Is Caring</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Title</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C14.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/pizzapepperoni.webp" alt="Avatar" className="size-7 rounded-full" />
                PizzaPepperoni
              </div>
              <div className="flex gap-1 items-center font-[Ale]">
                <img src="/hover/Life.png" alt="Avatar" className="size-7" /> Calculated
              </div>
              <div className="font-[Ale] ">- Living Dangerously</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">50 Fear</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">1 Life</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C15.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/andrw.webp" alt="Avatar" className="size-7 rounded-full" />
                andrw
              </div>
              <div className="flex gap-1 items-center font-[Ale]">
                <img src="/hover/Artemis.png" alt="Avatar" className="size-9" /> Precision
              </div>
              <div className="font-[Ale] ">- John Wick</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Damage</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">100,000</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C16.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/foolish.webp" alt="Avatar" className="size-7 rounded-full" />
                foolish
              </div>
              <div className="flex gap-1 items-center font-[Ale]">
                My deck has no Foolish
                <img src="/hover/card.png" alt="Avatar" className="w-6 h-auto" />
                cards
              </div>
              <div className="font-[Ale] ">- I have all the cards</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">No Arcana</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Time</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-red-500/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C17.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/aki.webp" alt="Avatar" className="size-7 rounded-full" />
                Aki
              </div>
              <div className="flex gap-1 items-center font-[Ale]">
                <img src="/hover/Athena.png" alt="Avatar" className="w-9 h-auto" /> I will be there no matter what
              </div>
              <div className="font-[Ale] ">- Say My Name</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">62 Fear</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Damage</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Athena</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-red-500/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C18.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <div className="font-[Sr] ">{team2name}</div>
              </div>
              <div className="font-[Ale]  flex gap-1 items-center">
                <img src="/hover/Chronos.png" alt="Avatar" className="size-9" /> Up We Go Again
              </div>
              <div className="font-[Ale]">- New Toy 2</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">All Weapon</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Surface</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C19.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/nateal.webp" alt="Avatar" className="size-7 rounded-full" />
                Nateal
              </div>
              <div className="flex gap-1 items-center font-[Ale]">
                <img src="/P9/Selene_29.png" alt="Avatar" className="size-3" />
                <img src="/P9/Selene_29.png" alt="Avatar" className="size-5" />
                <img src="/P9/Selene_29.png" alt="Avatar" className="size-7" />
                <img src="/P9/Selene_29.png" alt="Avatar" className="size-9" />
                <img src="/P9/Selene_29.png" alt="Avatar" className="size-11" />
              </div>
              <div className="font-[Ale] ">- hadouken</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Hex</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Selene</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Damage</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">300,000</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-red-500/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C20.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr] ">{team2name}</div>

              <div className="flex gap-1 items-center font-[Ale]">
                {box20.map((item) => (
                  <div className="relative size-10 shrink-0">
                    <img
                      src="/BoonBorder/Hammer.png"
                      alt="Border"
                      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                    />
                    <img
                      draggable={false}
                      src={`/P9/${item}.png`}
                      alt="Familiar"
                      className="absolute inset-0 w-full h-full p-1 object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="font-[Ale] ">- Blade Master</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">62 Fear</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Surface</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C21.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr] flex gap-1 items-center">
                <img src="/Avatar/dr.omega.webp" alt="Avatar" className="size-7 rounded-full" />
                Dr.Omega
              </div>
              <div className="flex gap-1 items-center font-[Ale]">
                <div className="relative size-10 shrink-0">
                  <img
                    src="/BoonBorder/Common.png"
                    alt="Border"
                    className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                  />
                  <img
                    draggable={false}
                    src={`/H2Boons/Attack.png`}
                    alt="Boon"
                    className="absolute inset-0 w-full h-full p-1 object-contain"
                  />
                </div>
                +
                <div className="relative size-10 shrink-0">
                  <img
                    src="/BoonBorder/Common.png"
                    alt="Border"
                    className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                  />
                  <img
                    draggable={false}
                    src={`/H2Boons/Special.png`}
                    alt="Boon"
                    className="absolute inset-0 w-full h-full p-1 object-contain"
                  />
                </div>
                = 352k
              </div>
              <div className="font-[Ale] ">- Special Attack</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Fresh File</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">No Duo</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Damage</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Time</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C22.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/red.webp" alt="Avatar" className="size-7 rounded-full" />
                Red
              </div>
              <div className="font-[Ale]  flex items-center">
                <div className="font-[Ale]  flex items-center">
                  <div className="flex gap-1 items-center font-[Ale]">
                    <img src="/Underworld.png" alt="Avatar" className="size-7" />
                    +
                    <img src="/DreamDive/Erebus.png" alt="Avatar" className="size-7" />
                    <img src="/DreamDive/Oceanus.png" alt="Avatar" className="size-7" />
                    <img src="/DreamDive/Fields.png" alt="Avatar" className="size-7" />
                    <img src="/DreamDive/Tartarus.png" alt="Avatar" className="size-7" />
                    <span>{`<`}</span>7
                  </div>
                </div>
              </div>
              <div className="font-[Ale]">- Math 2</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Rival 4</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Time</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Underworld</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-blue-800/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C23.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/rip van weikle.webp" alt="Avatar" className="size-7 rounded-full" />
                Rip Van Weikle
              </div>
              <div className="font-[Ale] flex gap-1 items-center">
                <img src="/hover/Magick.webp" alt="Avatar" className="size-7" /> It's over
                <span className="line-through">9,000</span> 1,000!
              </div>
              <div className="font-[Ale]">- Magician</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Magick</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-red-500/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C24.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <img src="/Avatar/thedarkomen.webp" alt="Avatar" className="size-7 rounded-full" />
                TheDarkOmen
              </div>
              <div className="font-[Ale] flex gap-1 items-center">
                <img src="/hover/stats.png" alt="Avatar" className="size-9" /> Jarvis, define boon
              </div>
              <div className="font-[Ale]">- Morrigan</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">62 Fear</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Boon</div>
            </div>
          </div>
          <div className="min-w-full sm:min-w-75 min-h-50 bg-linear-to-t from-red-500/50 to-[#0e0c12] rounded p-2 flex flex-col">
            <div className="font-[UbuntuMono] text-[12px]">C25.</div>
            <div className="w-full h-full flex flex-col justify-between items-center gap-1 border border-white/10 my-1 p-2">
              <div className="font-[Sr]  flex gap-1 items-center">
                <div className="font-[Sr] ">{team2name}</div>
              </div>
              <div className="font-[Ale]  flex gap-1 items-center">
                <img src="/hover/Chaos.png" alt="Avatar" className="size-9" /> Collecting Dust?
              </div>
              <div className="font-[Ale]">- Vinegar, Salt, Pepper</div>
            </div>
            <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Chaos</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Trial</div>
              <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">Speed</div>
            </div>
          </div>
        </div>
        {/* Box End */}
        {/* Summary Image */}
        <div className="overflow-x-scroll my-10 rounded-xl">
          <div className="min-w-[1400px] flex shrink-0">
            <img src="/Bingo/bingo1.webp" alt="Bingo Summary" className="w-full" draggable={false} />
          </div>
        </div>
      </div>
    </PageBlock>
  );
}
