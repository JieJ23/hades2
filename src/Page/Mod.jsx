import PageBlock from "../Block/PageBlock";
import { Link } from "react-router-dom";

const entries = [
  {
    code: `Zagreus Journey`,
    des: `"Escape the Underworld of the first game as Melinoë. Adds all regions, enemies and bosses from Hades as
a route to Hades II - as well as new NPC encounters, incantations, prophecies, cosmetics, Chaos Trials, and more!"`,
    author: `NikkelM`,
    tags: [`Hades`, `Hades II`, `Gameplay`, `Overhaul`],
    link: `https://thunderstore.io/c/hades-ii/p/NikkelM/Zagreus_Journey/`,
    cover: `ZagreusJourney`,
  },
  {
    code: `DreamDiveTweaks`,
    des: `"Hades II mod offering multiple configurable tweaks for Dream Dives. Including but not limited to disabling visage forms, longer runs, some minor fixes and more. Compatible with Zagreus' Journey."`,
    author: `zerp`,
    tags: [`Hades II`, `Gameplay`, `Dream Dive`],
    link: `https://thunderstore.io/c/hades-ii/p/zerp/DreamDiveTweaks/`,
    cover: `Dream`,
  },
  {
    code: `LiveSplit`,
    des: `"LiveSplit records runs and shows selected timing information while you play. Its main feature is a recording table that tracks your route through a run like a compact in-game LiveSplit layout."`,
    author: `adamantSpeedrun`,
    tags: [`Hades II`, `Utility`, `LiveSplit`, `Speedrun`],
    link: `https://thunderstore.io/c/hades-ii/p/adamantSpeedrun/LiveSplit/`,
    cover: `Mod`,
  },
  {
    code: `Jowday's DPS Meter`,
    des: `"Damage Meters! Displays bars showing damage dealt from various sources."`,
    author: `Jowday`,
    tags: [`Hades II`, `Utility`, `DPS`],
    link: `https://www.nexusmods.com/hades2/mods/4?tab=logs`,
    cover: `DpsMeter`,
  },
];

export default function Mod() {
  return (
    <PageBlock>
      <div className="py-16 font-[Ubuntu]">
        <div>
          <div className="font-[Sr] text-[24px] text-center">Hades II Mods</div>
          <div className="text-center">
            Shared solely to offer a fresh experience and quality of life gameplay improvements.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8 rounded mx-auto my-10">
            {/* Start */}
            {entries.map((obj, index) => (
              <div className="flex flex-col w-full" key={index}>
                <div
                  className="h-11 text-[16px] flex items-center justify-center font-[Sr]"
                  style={{
                    backgroundImage: `url('/Misc/fl3.webp'),url('/Misc/fr3.webp'),url('/Misc/fm3.webp')`,
                    backgroundPosition: "left center, right center, center center",
                    backgroundRepeat: "no-repeat, no-repeat, repeat",
                    backgroundSize: "contain, contain, contain",
                  }}
                >
                  {obj.code}
                </div>
                <div className="min-h-75 flex flex-col justify-end border border-white/10 rounded-b-xl relative p-2 overflow-hidden">
                  <img
                    src={`/Mod/${obj.cover}.webp`}
                    alt="Mod Cover"
                    className="absolute top-0 right-0 w-full h-full -z-10 object-center object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full -z-10 bg-linear-to-t from-black via-black/80 to-black/40" />
                  <div className="text-[13px] my-1">{obj.des}</div>
                  <div className="flex gap-1 flex-wrap my-1">
                    <div className="px-1 py-0.5 min-w-[50px] text-center bg-[#0e0c12] text-[#00ffaa] rounded border border-white/10 font-[UbuntuMono] uppercase">
                      Author: {obj.author}
                    </div>
                    {obj.tags.map((item) => (
                      <div className="px-1 py-0.5 min-w-[50px] text-center bg-[#0e0c12] rounded border border-white/10 font-[UbuntuMono] uppercase">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1 my-1">
                    <Link to={obj.link} target="_blank">
                      <div className="px-2 py-0.5 min-w-[50px] text-center bg-white text-black rounded border font-[UbuntuMono] border-white/10 uppercase flex items-center gap-1">
                        Official page
                        <img src="right.png" alt="Arrow" className="size-4" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageBlock>
  );
}
