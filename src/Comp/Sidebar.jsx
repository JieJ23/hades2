import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const sites = [
  { link: `FearCalculator`, nam: `Fear Calculator` },
  { link: `ArcaneDeck`, nam: `Arcane Deck` },
  { link: `HeatCalculator`, nam: `Heat Calculator` },
  { link: `Hades`, nam: `Hades` },
];

export default function SideNav() {
  const currentLocation = useLocation();
  return (
    <div className="w-full h-full md:w-[200px] hidden md:block p-2 font-[Cinzel] text-[12px] bg-base-300 m-1 rounded shrink-0">
      <div className="flex flex-col gap-3 my-4">
        {sites.map((obj, idx) => (
          <Link
            to={`/${obj.link}`}
            className={`flex items-center gap-2 hover:scale-[95%] duration-200 ease-in transition-transform ${
              currentLocation.pathname == `/${obj.link}` && `text-[#f2920c]`
            }`}
            key={idx}
          >
            <div className="avatar">
              <div className="w-6 rounded-none">
                <img src={`/${obj.link}.png`} draggable={false} />
              </div>
            </div>
            <div>{obj.nam}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
