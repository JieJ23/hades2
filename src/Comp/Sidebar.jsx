import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const sites = [
  { icon: `Ladder`, link: ``, nam: `Ladder` },
  { icon: `Query`, link: `Query`, nam: `Query` },
  { icon: `Melinoe`, link: `Ranking`, nam: `Ranking` },
  { icon: `Stats`, link: `EAstats`, nam: `EA Stats` },
  { icon: `Oath`, link: `FearCalculator`, nam: `Fear` },
  { icon: `ArcaneDeck`, link: `ArcanaDeck`, nam: `Arcana` },
  // { icon: `Editor`, link: `MetaUpgradeEditor`, nam: `Oath Editor` },
  // { icon: `Ladder`, link: `AnyFearSRC`, nam: `Any Fear SRC` },
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
