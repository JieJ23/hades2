import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const sites = [
  { link: ``, nam: `Home` },
  { link: `Query`, nam: `Query` },
  { link: `Ladder`, nam: `Ladder` },

  // { link: `Query`, nam: `Ladder` },
  // { link: `Query`, nam: `Stats` },

  { link: `EALadder`, nam: `EA` },
  { link: `ArcanaDeck`, nam: `Arcana` },
  { link: `FearCalculator`, nam: `Fear` },
  // { link: `GameplaySubmission`, nam: `Submission` },
];

export default function SideNav() {
  const currentLocation = useLocation();
  return (
    <div className="h-full w-full p-2 pb-4 font-[Ale] text-[14px] rounded shrink-0">
      <div className="flex justify-center items-center gap-1">
        {sites.map((obj, idx) => (
          <Link to={`/${obj.link}`} className={`flex items-center group`} key={idx}>
            <div
              className={`px-2 py-1 border-1 border-white/40 rounded-b-lg hover:bg-[#00ffaa] ${
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
