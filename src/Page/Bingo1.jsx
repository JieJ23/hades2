import PageBlock from "../Block/PageBlock";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { textHoverObject } from "../Data/TextHoverObject";
import { p9boons } from "../Data/P9BoonObj";
import Divider from "../Block/Divider";

gsap.registerPlugin(useGSAP);

import { useRef, useEffect } from "react";

const mod = [`Mininet`];
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

const bingoSummary = [
  {
    team1: team1name,
    team1score: `20:17.34`,
    team2: team2name,
    team2score: `21:18.13`,
    tags: [`OWO`, `Surface`, `Time`],
    win: `t1`,
  },
  {
    team1: `PizzaPepperoni`,
    team1score: `0 Damage | 8:12.17`,
    team1icon: [`pizzapepperoni`],
    team2: `Checkmate`,
    team2score: `0 Damage | 10:14.00`,
    team2icon: [`checkmate`],
    tags: [`50 Fear`, `< 25 Damage`, `Damageless`],
    win: `t1`,
  },
  {
    team1: `andrw`,
    team1score: `Lvl 96 - Storm Ring`,
    team1icon: [`andrw`],
    team2: `Vangetsu`,
    team2score: `Lvl 59 - Storm Ring`,
    team2icon: [`vangetsu`],
    tags: [`Lvl 40+`, `Boon`],
    win: `t1`,
  },
  {
    team1: `PizzaPepperoni`,
    team1score: `2344 Damage - Typhon`,
    team1icon: [`pizzapepperoni`],
    team2: `Aki`,
    team2score: `10416 Damage - Typhon`,
    team2icon: [`aki`],
    tags: [`+1000 Damage`, `25 Mins`],
    win: `t2`,
  },
  {
    team1: `NotTia`,
    team1score: `567 Armor`,
    team1icon: [`nottia`],
    team2: `Carrot`,
    team2score: `456 Armor`,
    team2icon: [`xarrotd`],
    tags: [`50 Fear`, `Arachne Dress`, `Armor`],
    win: `t1`,
  },
  {
    team1: ``,
    team1score: ``,
    team2: team2name,
    team2score: `Morrigan`,
    tags: [`62 Fear`, `All Region`],
    win: `t2`,
  },
  {
    team1: `Croissant (ft Kol)`,
    team1score: `58`,
    team1icon: [`thereptier`, `kol`],
    team2: `ne0conker`,
    team2score: `56`,
    tags: [`45+ Boon`],
    win: `t1`,
  },
  {
    team1: team1name,
    team1score: `Mel Skull + Blades + Circe
    32:53.71`,
    team2: ``,
    team2score: ``,
    tags: [`62 Fear`, `3 Weapon`, `1/3 Surface`],
    win: `t1`,
  },
  {
    team1: team1name,
    team1score: `29:07.75`,
    team2: team2name,
    team2score: `29:00.41`,
    tags: [`All Weapon`, `Underworld`],
    win: `t2`,
  },
  {
    team1: `halo effect`,
    team1score: `6:27.63`,
    team1icon: [`halo effect`],
    team2: `TheDarkOmen`,
    team2score: `7:49.56`,
    team2icon: [`thedarkomen`],
    tags: [`Rivals 4`, `SUrface`, `Under 8 Mins`],
    win: `t1`,
  },
  {
    team1: `andrw`,
    team1score: `17856 Gold`,
    team1icon: [`andrw`],
    team2: `Fate`,
    team2score: `13309 Gold`,
    team2icon: [`fate`],
    tags: [`+5000 Gold`],
    win: `t1`,
  },
  {
    team1: `PizzaPepperoni`,
    team1score: `0:45.38`,
    team1icon: [`pizzapepperoni`],
    team2: `Checkmate`,
    team2score: `0:48.24`,
    team2icon: [`checkmate`],
    tags: [`Champion of Elysium`, `Under 1 Min`],
    win: `t1`,
  },
  {
    team1: `Kol & Red`,
    team1score: `Gatherer by Kol
    Savant by Red`,
    team1icon: [`kol`, `red`],
    team2: `Fate & Aki`,
    team2score: `Gatherer by Fate
    Savant by Aki`,
    team2icon: [`fate`, `aki`],
    tags: [`Family Gatherer`, `Sacrifice Savant`],
    win: `t3`,
  },
  {
    team1: `PizzaPepperoni`,
    team1score: `1 HP - 12:18.81`,
    team1icon: [`pizzapepperoni`],
    team2: ``,
    team2score: ``,
    tags: [`50 Fear`, `1 HP`, `No DD`],
    win: `t1`,
  },
  {
    team1: `andrw`,
    team1score: `100,000 - 9:16.73`,
    team1icon: [`andrw`],
    team2: `z-kid`,
    team2score: `100,000 - 10:16.63`,
    team2icon: [`z-kid`],
    tags: [`100,000`, `One Damage Source`],
    win: `t1`,
  },
  {
    team1: `Foolish`,
    team1score: `5:35.00`,
    team1icon: [`foolish`],
    team2: ``,
    team2score: ``,
    tags: [`No Arcana`, `Under 6:30`],
    win: `t1`,
  },
  {
    team1: ``,
    team1score: ``,
    team2: `Aki`,
    team2score: `160,049`,
    team2icon: [`aki`],
    tags: [`62 Fear`, `Righteous Pike`, `Damage Source`],
    win: `t2`,
  },
  {
    team1: team1name,
    team1score: `39:49.41`,
    team2: team2name,
    team2score: `39:05.22`,
    tags: [`All Weapon`, `Surface`],
    win: `t2`,
  },
  {
    team1: `Nateal`,
    team1score: `Lunar Ray - 1,713,803`,
    team1icon: [`nateal`],
    team2: `Aki`,
    team2score: `Lunar Ray - 1,387,013`,
    team2icon: [`aki`],
    tags: [`+300,000`, `Hex Damage`, `Under 30 Mins`],
    win: `t1`,
  },
  {
    team1: team1name,
    team1score: `Skulls - 46:23.22`,
    team2: team2name,
    team2score: `Blades - 46:22.05`,
    tags: [`OWO`, `62 Fear`, ` 2 Runs = Surface`],
    win: `t2`,
  },
  {
    team1: `Dr.Omega`,
    team1score: `352,264 Damage`,
    team1icon: [`dr.omega`],
    team2: `Aki`,
    team2score: `312,116 Damage`,
    team2icon: [`aki`],
    tags: [`Fresh File`, `Under 26 Mins`, `No Duo`],
    win: `t1`,
  },
  {
    team1: `Red`,
    team1score: `6:42.95`,
    team1icon: [`red`],
    team2: `Aki`,
    team2score: `6:44.02`,
    team2icon: [`aki`],
    tags: [`Underworld`, `Rivals 4`, `Under 7 Mins`],
    win: `t1`,
  },
  {
    team1: `Rip Van Weikle`,
    team1score: `1338 Max Magick`,
    team1icon: [`rip van weikle`],
    team2: `z-kid`,
    team2score: `1206 Max Magick`,
    team2icon: [`z-kid`],
    tags: [`600+`, `Max Magick`],
    win: `t1`,
  },
  {
    team1: ``,
    team1score: ``,
    team2: `TheDarkOmen`,
    team2score: `1206 Max Magick`,
    team2icon: [`thedarkomen`],
    tags: [`62 Fear`, `< 8 Boons`],
    win: `t2`,
  },
  {
    team1: team1name,
    team1score: `Salt | Fury | Vigor
    3:01.37`,
    team2: team2name,
    team2score: `Salt | Fury | Banshee
    2:57.95`,
    tags: [`3 Chaos Trials`],
    win: `t2`,
  },
];

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
      }, 250);
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
              // onMouseMove={handleMouseMove}
              className="hover-target text-white font-bold text-[36px] uppercase cursor-default select-none text-center font-[Sr] flex flex-col"
            >
              <div className="text-[#00ffaa]">Team</div>
              <div className="text-[#00ffaa]">{team1name}</div>
              <div className="text-[16px]">Winners of Bingo #1</div>
            </div>
          </div>
        </div>
        {/* Team & Players */}
        <div className="flex justify-center my-10 gap-2 gap-y-8">
          <div>
            <div className="text-center mb-2 font-[Sr] text-[20px]">Moderator</div>
            <div className="flex gap-1 gap-y-4 justify-center md:justify-start flex-wrap">
              {mod.map((item) => (
                <div className="p-2 bg-linear-to-t from-[#0e0c12] to-[gold] text-white rounded min-w-25 min-h-25 text-center font-[Ale] flex flex-col items-center justify-start gap-1 border border-black relative">
                  <img
                    src="/hover/banner.png"
                    alt="Banner"
                    className="absolute -bottom-3 left-1/2 w-15 h-auto -translate-x-[50%]"
                  />
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
        <div className="flex flex-col md:flex-row my-10 gap-2 gap-y-8">
          <div>
            <div className="md:text-start text-center mb-2 font-[Sr] text-[20px]">{team1name}</div>
            <div className="flex gap-1 justify-center md:justify-start flex-wrap">
              {team1.map((item) => (
                <div className="p-1 bg-linear-to-t from-[#0e0c12] to-blue-800/50 text-white rounded min-w-25 text-center font-[Ale] flex flex-col items-center gap-1 border border-black">
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
            <div className="md:text-end text-center mb-2 font-[Sr] text-[20px]">{team2name}</div>
            <div className="flex gap-1 justify-center md:justify-end flex-wrap">
              {team2.map((item) => (
                <div className="p-1 bg-linear-to-t from-[#0e0c12] to-red-500/50 text-white rounded min-w-25 text-center font-[Ale] flex flex-col items-center gap-1 border border-black">
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
        <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 text-[14px]">
          {bingoSummary.map((obj, index) => (
            <div
              className="min-h-75 max-w-80 w-80 sm:w-full rounded flex flex-col relative mx-auto"
              style={{
                borderStyle: "solid", // Required
                borderWidth: "10px",
                borderImage: "url('/Misc/frame.webp') 40 stretch",
              }}
            >
              <div
                style={{ backgroundImage: `url(/Arcane/c${index + 1}.png)` }}
                className="absolute w-full h-full inset-0 bg-cover bg-center -z-10"
              />
              <div
                className={`
              ${obj.win === `t1` ? `from-blue-900/90` : obj.win === `t2` ? `from-red-800/90` : `from-purple-700/90`} bg-linear-to-t via-black/80 to-black/90 h-full flex flex-col p-2`}
              >
                <div className="font-[UbuntuMono] text-[12px]">C{index + 1}.</div>
                <div className="w-full flex-1 flex flex-col justify-evenly text-center gap-1 p-4 font-[Sr] rounded-xl">
                  <div
                    className={`flex-1 flex flex-col justify-center ${obj.win === "t1" || obj.win === "t3" ? `text-[white]` : `text-gray-400`}`}
                  >
                    {obj.team1icon && (
                      <div className="flex justify-center gap-1 pb-1">
                        {obj.team1icon.map((item) => (
                          <img src={`/Avatar/${item}.webp`} alt="Avatar" className="size-8 rounded-full" />
                        ))}
                      </div>
                    )}
                    <div>{obj.team1}</div>
                    <div className="font-[Ale] text-[13px] whitespace-pre-line">{obj.team1score}</div>
                  </div>
                  <div
                    className={`flex-1 flex flex-col justify-center ${obj.win === "t2" || obj.win === "t3" ? `text-[white]` : `text-gray-400`}`}
                  >
                    {obj.team2icon && (
                      <div className="flex justify-center gap-1 pb-1">
                        {obj.team2icon.map((item) => (
                          <img src={`/Avatar/${item}.webp`} alt="Avatar" className="size-8 rounded-full" />
                        ))}
                      </div>
                    )}
                    <div>{obj.team2}</div>
                    <div className="font-[Ale] text-[13px] whitespace-pre-line">{obj.team2score}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 font-[UbuntuMono] text-[12px]">
                  {obj.tags.map((item) => (
                    <div className="border border-white/10 bg-[#0e0c12] uppercase rounded px-1 py-0.5">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
