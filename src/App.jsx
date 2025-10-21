import SideNav from "./Comp/Sidebar";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";
import { Link } from "react-router-dom";

const homeContent = [
  {
    icon: "diamond",
    category: "Videos",
    link: "/Archive",
    description:
      "An archive of all gameplay, spanning from early access to the current release, sorted by date from latest to oldest, including Boon details, Arcana, and Vows if available.",
  },
  {
    icon: "diamond",
    category: "Query",
    link: "/Query",
    description:
      "Displays all recorded runs sorted by highest Fear and fastest completion, with filters & sorting options—from basic aspects to advanced criteria like Boons, Arcana, and Vows.",
  },
  {
    icon: "diamond",
    category: "Ladder",
    link: "/Ladder",
    description:
      "Core Boons, Keepsakes, and Death vs. Strength stats for all 24 aspects across both regions, highlighting top combinations. Sorted by the top 10 unique players, offering a snapshot.",
  },
  {
    icon: "diamond",
    category: "Personl Bests",
    link: "/FearPoints",
    description:
      "Compiles each player’s highest aspect completions, showing their personal bests for every aspect, and by region.",
  },
  {
    poster: "img1",
  },
  {
    icon: "hammer",
    category: "Shareable Arcana",
    link: "/ArcanaDeck",
    description:
      "A shareable tool for creating and customizing Arcana decks, allowing you to generate and share links of your selected Arcana cards",
  },
  {
    icon: "hammer",
    category: "Shareable Vows",
    link: "/FearCalculator",
    description:
      "A shareable tool for the Oath of the Unseen, allowing you to generate and share links of your selected Vows.",
  },
  {
    icon: "lotus",
    category: "Submission",
    link: "/GameplaySubmission",
    description:
      "A form for players to submit their gameplay runs to the website for inclusion in the database. This community resource compiles data to provide insights and references for aspects and gameplay in general.",
  },
  {
    icon: "stats",
    category: "Boon Stats",
    link: "/StatsCodex",
    description:
      "Displays detailed boon statistics for each aspect, covering everything from core boons and Olympian god boons to Daedalus hammer upgrades.",
  },
  {
    icon: "stats",
    category: "Keepsakes Stats",
    link: "/KeepsakesStats",
    description:
      "Displays the most selected Keepsakes for each biome across both regions, along with the most common selection order used by players.",
  },
  {
    icon: "stats",
    category: "Arcana Stats",
    link: "/ArcanaStats",
    description:
      "Displays the most common Arcana deck selections and the most frequent setups for specific Fear difficulty ranges.",
  },
  {
    icon: "stats",
    category: "Vows Stats",
    link: "/VowsStats",
    description:
      "Provides information on the most common Vow setups, along with in-depth selection statistics for each Vow, including the most frequently chosen Vow levels.",
  },
  {
    poster: "img2",
  },
  {
    icon: "myrtle",
    category: "EA Query",
    link: "/EAQuery",
    description:
      "Displays all early access recorded runs sorted by highest Fear and fastest completion, with filters & sorting options—from basic aspects to advanced criteria like Boons, Arcana, and Vows.",
  },
  {
    icon: "myrtle",
    category: "EA Stats",
    link: "/EAStat",
    description:
      "Provides detailed statistics from Early Access, including Boons, Keepsakes, Arcana, and Oaths, offering insights into common setups and trends.",
  },
  {
    icon: "myrtle",
    category: "Early Access",
    link: "/EALadder",
    description:
      "Contains all entries from Early Access, providing snapshots of each aspect across both regions. Entries are sortable and filterable by Aspect, Boons, Arcana, and Fear, with detailed stats available for each aspect, and the best aspect completions ranked by weapon type.",
  },
];

export default function App() {
  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1200px] text-[12px] md:text-[13px] mx-auto px-1">
        <SideNav />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-1">
          {homeContent.map((obj, index1) => (
            <div
              className={`relative group select-none hover:bg-[#131111] hover:text-white transition-colors duration-150 ease-in antialiased text-white bg-black ${
                (index1 === 15 || index1 === 7) && `col-span-2`
              } ${(index1 === 4 || index1 === 12) && `row-span-2 col-span-2`}`}
              style={{
                borderStyle: "solid", // Required
                borderWidth: "8px",
                borderImage: "url('/Misc/frame.webp') 40 stretch",
              }}
              key={index1}
            >
              {index1 === 4 || index1 === 12 ? (
                <div className="min-h-[200px] h-full bg-[black]">
                  <img
                    src={`/Misc/${obj.poster}.webp`}
                    alt="Banners"
                    className="absolute h-full w-full top-0 left-0 object-cover object-center border-1 border-black opacity-60"
                  />
                </div>
              ) : (
                <div className="p-2 pb-1 px-3 flex flex-col justify-between">
                  <div className="text-[18px] font-[Ale] my-1 flex gap-1 justify-center items-center">
                    <div>{obj.category}</div>
                    <img src={`/Misc/${obj.icon}.png`} alt="Marker" className="size-6" />
                  </div>
                  <div className="text-[12px] font-[Ubuntu] my-1">{obj.description}</div>
                  <div className="text-end">
                    <Link
                      to={`${obj.link}`}
                      className="btn btn-xs bg-white border-0 shadow-none group-hover:animate-bounce"
                    >
                      <img src="/Misc/ra.png" alt="Arrow Keys" className="size-5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
