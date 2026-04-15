import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const sites = [
  { link: ``, nam: `Night` },
  { link: `Ladder`, nam: `Ladder` },
  { link: `ArcanaDeck`, nam: `Arcana` },
  { link: `FearCalculator`, nam: `Fear` },
  { link: `GameplaySubmission`, nam: `Submission` },
  { link: `Resources`, nam: `Resources` },
];

export default function SideNav() {
  const currentLocation = useLocation();
  return (
    <div className="w-full p-4 font-[Ale] text-[14px] rounded shrink-0">
      <div className="flex flex-wrap justify-center items-center gap-0.5">
        {sites.map((obj, idx) => (
          <Link to={`/${obj.link}`} className={`flex items-center group`} key={idx}>
            <div
              className={`px-2 py-1 rounded  hover:bg-white hover:text-black ${
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
