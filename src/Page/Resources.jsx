import Background from "../Comp/Background";
import SideNav from "../Comp/Sidebar";
import Footer from "../Comp/Footer";
import { Link } from "react-router-dom";
import PageBlock from "../Block/PageBlock";
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
    link: `Enemy`,
    nam: `Enemy Data`,
    des: `Information of all Hades 2 enemies.`,
  },
];

export default function Resources() {
  return (
    <PageBlock>
      <section className="max-w-250 mx-auto py-16 p-2 rounded font-[Ubuntu] text-[13px] text-gray-400">
        {pagesObj.map((obj, index) => (
          <div key={index} className="rounded my-4">
            <Link to={`/${obj.link}`} className="hover:text-[#00ffaa] text-[18px] text-green-300 font-[Sr]">
              {obj.nam}
            </Link>
            <div className="ps-2">{obj.des}</div>
          </div>
        ))}
      </section>
    </PageBlock>
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
