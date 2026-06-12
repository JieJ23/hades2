import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const sites = [
  { link: ``, nam: `Home` },
  { link: `Night`, nam: `H2 Runs` },
  { link: `Dream`, nam: `Dream Dive` },
  { link: `Ladder`, nam: `Ladder` },
  { link: `GameStats`, nam: `Boon Stats` },
  { link: `Loadout`, nam: `Cards & Vows` },
  { link: `ArcanaDeck`, nam: `Arcana` },
  { link: `FearCalculator`, nam: `Fear` },
  { link: `GameplaySubmission`, nam: `Submit` },
  { link: `Hades1`, nam: `H1 Runs`, game: "H1" },
  { link: `Resources`, nam: `Other` },
];

export default function SideNav() {
  const currentLocation = useLocation();
  return (
    <div className="w-full p-4 font-[Ale] text-[14px] rounded mb-4">
      <div className="flex flex-wrap justify-center items-center gap-1">
        {sites.map((obj, idx) => (
          <Link to={`/${obj.link}`} className={`flex items-center group`} key={idx}>
            <div
              className={`px-2 py-1 rounded border border-white/10 hover:bg-white hover:text-black ${
                currentLocation.pathname == `/${obj.link}` ? `bg-white text-black` : `text-white`
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
