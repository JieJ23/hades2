import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const sites = [
  { icon: `Hades2`, link: ``, nam: `Ladder` },
  // { icon: ``, link: `Ladder`, nam: `H2 Ladder` },
  { icon: `Builder`, link: `Builder`, nam: `Builder` },
  // { icon: ``, link: `H2Stats`, nam: `H2Stats` },
  { icon: `FearCalculator`, link: `FearCalculator`, nam: `Fear Calculator` },
  { icon: `ArcaneDeck`, link: `ArcaneDeck`, nam: `Arcane Deck` },
  { icon: `Hammer`, link: `Hammer`, nam: `Hammer` },
  // { icon: ``, link: `Hades`, nam: `Hades` },
  // { icon: ``, link: `Hades_v2`, nam: `Hades Gameplay` },
  // { icon: ``, link: `HeatCalculator`, nam: `Heat Calculator` },
];

export default function SideNav() {
  const currentLocation = useLocation();
  return (
    <div className="h-full w-[60px] hidden md:block p-2 font-[Cinzel] text-[12px] m-1 rounded shrink-0">
      <div className="flex flex-col items-center gap-3 my-4">
        {sites.map((obj, idx) => (
          <Link
            to={`/${obj.link}`}
            className={`flex items-center gap-2 group ${
              currentLocation.pathname == `/${obj.link}` && `text-[#f2920c]`
            }`}
            key={idx}
          >
            <div className="tooltip tooltip-right">
              <div className="tooltip-content text-[14px] bg-base-300">{obj.nam}</div>
              <div className="avatar">
                <div className="w-8 h-10 rounded-none">
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
