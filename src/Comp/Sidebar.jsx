import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const sites = [
  { link: ``, nam: `Home` },
  { link: `Archive`, nam: `Videos` },
  { link: `Query`, nam: `Query` },

  { link: `Weekly`, nam: `Weekly` },
  { link: `Ladder`, nam: `Ladder` },
  { link: `FearPoints`, nam: `PBs` },

  { link: `EALadder`, nam: `EA` },
  { link: `ArcanaDeck`, nam: `Arcana` },
  { link: `FearCalculator`, nam: `Fear` },
  { link: `Enemy`, nam: `Enemy` },
  { link: `GameplaySubmission`, nam: `Submission` },
  { link: `TheGameAward`, nam: `Game Award` },
  { link: `MyTeam`, nam: `My Team` },
  { link: `ProfileSum`, nam: `Profile` },
];

export const sites2 = [
  { link: `StatsCodex`, nam: `Boon Stats` },
  { link: `KeepsakesStats`, nam: `KS Stats` },
  { link: `ArcanaStats`, nam: `Arcana Stats` },
  { link: `VowsStats`, nam: `Vow Stats` },
];

export default function SideNav() {
  const currentLocation = useLocation();
  return (
    <div className="w-full p-2 pb-4 font-[Ale] text-[14px] rounded shrink-0">
      <div className="flex flex-wrap justify-center items-center gap-1">
        {sites.map((obj, idx) => (
          <Link to={`/${obj.link}`} className={`flex items-center group`} key={idx}>
            <div
              className={`px-2 py-1 border-1 border-white/40 rounded-sm hover:bg-[#00ffaa] ${
                currentLocation.pathname == `/${obj.link}` ? `bg-[#00ffaa] text-black` : `bg-[#131111] text-white`
              }`}
            >
              {obj.nam}
            </div>
          </Link>
        ))}
        {sites2.map((obj, idx) => (
          <Link to={`/${obj.link}`} className={`flex items-center group`} key={idx}>
            <div
              className={`px-2 py-1 border-1 border-white/40 rounded-sm hover:bg-[#00ffaa] ${
                currentLocation.pathname == `/${obj.link}` ? `bg-[#00ffaa] text-black` : `bg-[#131111] text-white`
              }`}
            >
              {obj.nam}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
