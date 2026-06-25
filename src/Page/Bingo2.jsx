import PageBlock from "../Block/PageBlock";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { textHoverObject } from "../Data/TextHoverObject";
import { p9boons } from "../Data/P9BoonObj";
import Divider from "../Block/Divider";

gsap.registerPlugin(useGSAP);

import { useRef, useEffect } from "react";

const mod = [`Mininet`, `Six`, `TheDarkOmen`, `Hippo`, `Paolo`];
const team1 = [
  `Thereptier`,
  `Kol`,
  `Fate`,
  `Yoshi`,
  `Nateal`,
  `Frei`,
  `Vangetsu`,
  `Alexca`,
  `HookieDookie`,
  `PizzaPepperoni`,
  `disc0nnected`,
  `Akiramon`,
  `frankentas`,
  `awedish`,
  `Astera`,
  `Checkmate`,
  `kirrby`,
  `Ember`,
].sort();
const team2 = [
  `z-kid`,
  `andrw`,
  `Born Gain Everyday Zackers`,
  `ClearlyNotJao`,
  `PeterHatEater`,
  `red`,
  `Aki`,
  `NotTia`,
  `sidad`,
  `Crystal`,
  `raijy`,
  `Becca`,
  `halo effect`,
  `ConnerTEP`,
  `Scam scam scam`,
  `vytautas`,
  `ne0conker`,
].sort();
const team1name = `IQarus`;
const team2name = `Team Team`;
// Box Details

const bingoSummary = [
  {
    team1: `HookieDookie`,
    team1score: `1,039,251 Damage`,
    team1icon: [`hookiedookie`],
    team2: `Aki`,
    team2score: `787,849 Damage`,
    team2icon: [`aki`],
    tags: [`50 Fear`, `Timer 3`, `Olympian Damage`],
    win: `t1`,
  },
  {
    team1: `disc0nnected`,
    team1score: `21 Icons`,
    team1icon: [`disc0nnected`],
    team2: `Becca`,
    team2score: `21 Icons`,
    team2icon: [`becca`],
    tags: [`Icons`, `Health Bar`],
    win: `t3`,
  },
  {
    team1: team1name,
    team1score: `36:06.190`,
    team2: team2name,
    team2score: `37:00.080`,
    tags: [`Frenzy 0`, `All Weapon`, `2 UW/SF/DD`],
    win: `t1`,
  },
  {
    team1: team1name,
    team1score: `7 Players`,
    team2: team2name,
    team2score: `13 Players`,
    tags: [`Sub 7`, `Surface`, `New Challenger`],
    win: `t2`,
  },
  {
    team1: team1name,
    team1score: `06:11.910`,
    team2: team2name,
    team2score: `05:56.680`,
    tags: [`Chaos Trial`, `Time`, `#1-5`],
    win: `t2`,
  },
  {
    team1: `HookieDookie`,
    team1score: `0 Gold 
    04:47.530`,
    team1icon: [`hookiedookie`],
    team2: `raijy`,
    team2score: `0 Gold
    04:18.000`,
    team2icon: [`raijy`],
    tags: [`No Gold`, `Final Boss`],
    win: `t2`,
  },
  {
    team1: team1name,
    team1score: `08:16.710`,
    team2: team2name,
    team2score: `08:12.070`,
    tags: [`Chaos Trial`, `Time`, `#6-10`],
    win: `t2`,
  },
  {
    team1: `Fate`,
    team1score: `01.210`,
    team1icon: [`fate`],
    team2: `ClearlyNotJao`,
    team2score: `01.220`,
    team2icon: [`clearlynotjao`],
    tags: [`Die`, `Frinos`, `Persistence`, `Death`, `No Antler`],
    win: `t1`,
  },
  {
    team1: team1name,
    team1score: `34:55.770`,
    team2: team2name,
    team2score: `30:44.000`,
    tags: [`Any Fear`, `All Weapons`, `2 Uw/SF/DD`],
    win: `t2`,
  },
  {
    team1: `PizzaPepperoni`,
    team1score: `1 record`,
    team1icon: [`pizzapepperoni`],
    team2: `Raijy | halo effect | Vytautas`,
    team2score: `3 records`,
    team2icon: [`raijy`, `halo effect`, `vytautas`],
    tags: [`TheDarkOmen`, `SRC`, `Morrigan Records`],
    win: `t2`,
  },
  {
    team1: team1name,
    team1score: `45:24.620`,
    team2: team2name,
    team2score: `46:54.540`,
    tags: [`Any Fear`, `Rivals 4`, `2 UW/SF/DD`],
    win: `t1`,
  },
  {
    team1: team1name,
    team1score: `13:57.580`,
    team2: team2name,
    team2score: `14:24.980`,
    tags: [`3 Weapon`, `Element Sum < 10/Run`],
    win: `t1`,
  },
  {
    team1: team1name,
    team1score: `54`,
    team2: team2name,
    team2score: `54`,
    tags: [`Geoguessr`, `Hades 2`],
    win: `t3`,
  },
  {
    team1: `HookieDookie`,
    team1score: `59,170`,
    team1icon: [`hookiedookie`],
    team2: `Becca`,
    team2score: `65,803`,
    team2icon: [`becca`],
    tags: [`Top 5 Damage`, `Sum`, `Smallest Number`],
    win: `t1`,
  },
  {
    team1: team1name,
    team1score: `34 boons`,
    team2: team2name,
    team2score: `36 boons`,
    tags: [`Duo`, `Legendary`, `Total Boon`],
    win: `t2`,
  },
  {
    team1: team1name,
    team1score: `8 Players`,
    team2: team2name,
    team2score: `6 Players`,
    tags: [`Sub 6`, `Underworld`, `New Challenger`],
    win: `t1`,
  },
  {
    team1: team1name,
    team1score: `2 Aspects`,
    team2: team2name,
    team2score: `3 Aspects`,
    tags: [`Surface`, `Speed`, `Mel Blades`, `Eos`, `Mel Axe`, `Nergal`, `Shiva`],
    win: `t2`,
  },
  {
    team1: team1name,
    team1score: `19:15.200`,
    team2: team2name,
    team2score: `18:41.640`,
    tags: [`16 Unique`, `Keepsakes`, `Time`],
    win: `t2`,
  },
  {
    team1: `Awedish`,
    team1score: `11:22.490`,
    team1icon: [`awedish`],
    team2: `ConnerTEP`,
    team2score: `10:53.180`,
    team2icon: [`connertep`],
    tags: [`55 Fear`, `No Rivals`, `67 Players Banned`],
    win: `t2`,
  },
  {
    team1: team1name,
    team1score: `1:33:16.060`,
    team2: team2name,
    team2score: `1:03:20.520`,
    tags: [`62 Fear`, `All Weapons`, `2 UW/SF/DD`],
    win: `t2`,
  },
  {
    team1: `Fate`,
    team1score: `06:18.350`,
    team1icon: [`fate`],
    team2: `BGE Zackers`,
    team2score: `05:58.540`,
    team2icon: [`born gain everyday zackers`],
    tags: [`Rush Only`, `Nyx/Supay Banned`, `Time`],
    win: `t2`,
  },
  {
    team1: `Nateal`,
    team1score: `52 Fear`,
    team1icon: [`nateal`],
    team2: `ClearlyNotJao`,
    team2score: `30 Fear`,
    team2icon: [`clearlynotjao`],
    tags: [`Fear 51+`, `New Challenger`],
    win: `t1`,
  },
  {
    team1: `Fate`,
    team1score: `2742 x`,
    team1icon: [`fate`],
    team2: `andrw`,
    team2score: `4414 x`,
    team2icon: [`andrw`],
    tags: [`Highest Resources`],
    win: `t2`,
  },
  {
    team1: team1name,
    team1score: `10:27.730`,
    team2: team2name,
    team2score: `11:26.930`,
    tags: [`Chaos Trial`, `Speed`, `#11-15`],
    win: `t1`,
  },
  {
    team1: team1name,
    team1score: `13 Clears`,
    team2: team2name,
    team2score: `11 Clears`,
    tags: [`Fresh File`],
    win: `t1`,
  },
];

export default function Bingo2() {
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

    const icons = [...team2.filter((item) => item !== "ne0conker").map((item) => item.toLowerCase())];
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
              <div className="text-[#00ffaa]">{team2name}</div>
              <div className="text-[16px]">Winners of Bingo #2</div>
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
                <div className="flex flex-wrap max-w-65 gap-0.5 font-[UbuntuMono] text-[12px]">
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
            <img src="/Bingo/bingo2.webp" alt="Bingo Summary" className="w-full" draggable={false} />
          </div>
        </div>
      </div>
    </PageBlock>
  );
}
