import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const sites = [
  { icon: `Ladder`, link: ``, nam: `Ladder` },
  { icon: `Stats`, link: `Stats`, nam: `Stats` },
  { icon: `Player`, link: `Player`, nam: `Player` },
  { icon: `Patch8`, link: `Patch9`, nam: `Patch 9` },
  { icon: `Patch8`, link: `Patch8`, nam: `Patch 8` },
  { icon: `Oath`, link: `FearCalculator`, nam: `Fear` },
  { icon: `ArcaneDeck`, link: `ArcanaDeck`, nam: `Arcana` },
  { icon: `Hammer`, link: `Hammer`, nam: `Hammer` },
  { icon: `Boons`, link: `Boons`, nam: `Boons` },
];

export default function SideNav() {
  const currentLocation = useLocation();
  return (
    <div className="h-full w-full hidden lg:block px-2 font-[Cinzel] text-[12px] rounded shrink-0">
      <div className="flex justify-center items-center gap-3">
        {sites.map((obj, idx) => (
          <Link
            to={`/${obj.link}`}
            className={`flex items-center gap-2 group ${
              currentLocation.pathname == `/${obj.link}` && `text-[#f2920c]`
            }`}
            key={idx}
          >
            <div className="tooltip tooltip-bottom">
              <div className="tooltip-content bg-black border-1 border-[#00ffaa] rounded text-[12px]">{obj.nam}</div>
              <div className="avatar">
                <div className="size-10 rounded-none">
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
