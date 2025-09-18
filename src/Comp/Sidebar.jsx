import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const sites = [
  { icon: `Home`, link: ``, nam: `Home` },
  // { icon: `Query`, link: `QueryV1`, nam: `Query` },

  { icon: `EA`, link: `EALadder`, nam: `EA Ladder` },
  { icon: `EA`, link: `EAQuery`, nam: `EA Query` },
  { icon: `EA`, link: `EARanking`, nam: `EA Ranking` },
  { icon: `EA`, link: `EAStat`, nam: `EA Stats` },

  { icon: `ArcaneDeck`, link: `ArcanaDeck`, nam: `Arcana` },
  { icon: `Oath`, link: `FearCalculator`, nam: `Fear` },
  { icon: `Submit`, link: `GameplaySubmission`, nam: `Submission` },
];

export default function SideNav() {
  const currentLocation = useLocation();
  return (
    <div className="h-full w-full p-2 py-4 font-[Ale] text-[12px] rounded shrink-0">
      <div className="flex flex-wrap justify-center items-center gap-3">
        {sites.map((obj, idx) => (
          <Link
            to={`/${obj.link}`}
            className={`flex items-center gap-2 group ${
              currentLocation.pathname == `/${obj.link}` && `text-[#f2920c]`
            }`}
            key={idx}
          >
            <div className="tooltip tooltip-bottom">
              <div className="tooltip-content bg-white text-black text-[11px] rounded">{obj.nam}</div>
              <div className="avatar">
                <div className="size-8">
                  <img
                    src={`/${obj.icon}.png`}
                    draggable={false}
                    className="group-hover:scale-[80%] duration-100 ease-in transition-transform"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
