import Background from "../Comp/Background";
import SideNav from "../Comp/Sidebar";
import Footer from "../Comp/Footer";
import { Link } from "react-router-dom";

const pagesObj = [
  {
    link: `DreamParameter`,
    nam: `Dream Dive Data`,
    des: `Dream Dive: The different additionals for each biome levels.`,
  },
  {
    link: `Stats`,
    nam: `High Fear Stats`,
    des: `Stats collected since inception: Core Boons, Hammers, Arcana, and Familiars.`,
  },
  {
    link: `Speed62`,
    nam: `Fear 62 Speedrun`,
    des: `Unseeded Unmodded 62 Fear entries with video gameplay, sorted by the fastest completion.`,
  },
  {
    link: `FearPoints`,
    nam: `Fear PBs`,
    des: `A list of the top 50 players, compiled according to their accumulated highest fear completion for each aspect. All entries included.`,
  },
  {
    link: `TimePb`,
    nam: `Time PBs`,
    des: `A list of the top 50 players, compiled according to their accumulated fastest completion for each aspect. All entries included.`,
  },
  {
    link: `ProfileSum`,
    nam: `Profile Reader`,
    des: `Savefile reader using Jakobhellermann's file explorer to extract savefile into JSON format. Provides in-depth details of the last 500 nights.`,
  },
  {
    link: `CustomChaos`,
    nam: `Custom Chaos`,
    des: `Shareable and customizable Chaos Trial, using Trial of Flame.`,
  },
  {
    link: `CustomStart`,
    nam: `Custom Starter`,
    des: `Shareable and customizable boon selection before the beginning of your night.`,
  },
  {
    link: `Enemy`,
    nam: `Enemy Data`,
    des: `Information of all Hades 2 enemies.`,
  },
  {
    link: `EALadder`,
    nam: `EA Ladder`,
    des: `Early Access, the best completion in term of fear and speed for each aspect.`,
  },
  {
    link: `EAQuery`,
    nam: `EA Query`,
    des: `All compiled entries from Early Access.`,
  },
  {
    link: `EARanking`,
    nam: `EA Ranking`,
    des: `Organized Early Access entries by weapon type, sorted by highest fear and fastest completion.`,
  },
  {
    link: `EAStat`,
    nam: `EA Stats`,
    des: `Stats of Early Access entries: comparison between Underworld and Surface entries, Vows & Arcana, and many more.`,
  },
];

export default function Resources() {
  return (
    <div>
      <Background />
      <SideNav />
      <section className="max-w-250 mx-auto my-8 p-2 rounded font-[Aleg] text-[15px] text-gray-300">
        {pagesObj.map((obj, index) => (
          <div key={index} className="rounded my-4">
            <Link to={`/${obj.link}`} className="text-white hover:text-[#00ffaa] font-[Spec] text-[16px]">
              {obj.nam}
            </Link>
            <div className="ps-2">{obj.des}</div>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}

//               style={{
//                 backgroundImage: `
//   url('/Misc/fl3.webp'),
//   url('/Misc/fr3.webp'),
//   url('/Misc/fm3.webp')
// `,
//                 backgroundPosition: "left center, right center, center center",
//                 backgroundRepeat: "no-repeat, no-repeat, repeat",
//                 backgroundSize: "contain, contain, contain",
//               }}
