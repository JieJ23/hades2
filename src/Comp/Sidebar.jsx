import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Divider from "../Block/Divider";

export const sites = [
  { link: ``, nam: `Home`, icon: `Melinoe` },
  { link: `Night`, nam: `Hades 2 Runs`, icon: `Zeus` },
  // { link: `Dream`, nam: `Dream Dive Runs`, icon: `Dream` },
  { link: `DreamRoute`, nam: `Dream Route Data`, icon: `Dream` },
  { link: `Ladder`, nam: `Ladder / Standing`, icon: `Athena` },
  { link: `GameplaySubmission`, nam: `Submit Run`, icon: `Book_Frog` },
  { link: `Player`, nam: `Players`, icon: `HealthBar_Mel` },
  { link: `Stats`, nam: `Stats`, icon: `Boon` },
];
export const tools = [
  { link: `ArcanaDeck`, nam: `Arcana Deck`, icon: `ReRoll` },
  { link: `FearCalculator`, nam: `Fear Calculator`, icon: `Void` },
];
export const map = [
  { link: `MapErebus`, nam: `Erebus`, icon: `Hecate` },
  { link: `MapOceanus`, nam: `Oceanus`, icon: `Narcissus` },
  { link: `MapField`, nam: `Field`, icon: `Echo` },
  { link: `MapTartarus`, nam: `Tartarus`, icon: `Chronos` },
];

export const minor = [{ link: `Resources`, nam: `Miscellaneous`, icon: `Exorcism` }];
export const events = [
  { link: `TheGameAward`, nam: `The Game Award 2025`, icon: `TGA` },
  { link: `Bingo1`, nam: `Bingo #1`, icon: `Life` },
  { link: `Bingo2`, nam: `Bingo #2`, icon: `Life` },
];

export default function SideNav() {
  const currentLocation = useLocation();

  return (
    <div className="font-[Ale] rounded">
      <div className="drawer drawer-end p-3 relative z-40">
        <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-end fixed top-3 right-3">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-5"
            className="drawer-button rounded p-0.5 cursor-pointer bg-green-300 duration-150 ease-in hover:rotate-90"
          >
            <img src="/menu.png" alt="Menu Icon" className="size-8" />
          </label>
        </div>
        <div className="drawer-side z-40">
          <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay" />
          <div className="menu bg-[#0e0c12] min-h-full w-80 p-4 relative rounded">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-10 bg-center -z-10"
              style={{
                backgroundImage: "url(hadestwo.webp)",
              }}
            />
            {/* Sidebar content here */}
            {sites.map((obj, idx) => (
              <div className="my-0.5 p-1 rounded hover:bg-white hover:text-black text-[14px]">
                <Link to={obj.link === "" ? "/" : `/${obj.link}`} className={`flex items-center gap-2 z-40`} key={idx}>
                  <img src={`/hover/${obj.icon}.png`} alt="Menu Icon" className="size-8 " />
                  <div className="">{obj.nam}</div>
                </Link>
              </div>
            ))}
            <div className="mt-4 font-[Sr]">Community Events</div>
            {events.map((obj, idx) => (
              <div className="my-0.5 p-1 rounded hover:bg-white hover:text-black text-[14px]">
                <Link to={obj.link === "" ? "/" : `/${obj.link}`} className={`flex items-center gap-2 z-40`} key={idx}>
                  <img src={`/hover/${obj.icon}.png`} alt="Menu Icon" className="size-8 " />
                  <div className="">{obj.nam}</div>
                </Link>
              </div>
            ))}
            <div className="mt-4 font-[Sr]">Map Layout</div>
            {map.map((obj, idx) => (
              <div className="my-0.5 p-1 rounded hover:bg-white hover:text-black text-[14px]">
                <Link to={obj.link === "" ? "/" : `/${obj.link}`} className={`flex items-center gap-2 z-40`} key={idx}>
                  <img src={`/hover/${obj.icon}.png`} alt="Menu Icon" className="size-8 " />
                  <div className="">{obj.nam}</div>
                </Link>
              </div>
            ))}
            <div className="mt-4 font-[Sr]">Shareable Tools</div>
            {tools.map((obj, idx) => (
              <div className="my-0.5 p-1 rounded hover:bg-white hover:text-black text-[14px]">
                <Link to={obj.link === "" ? "/" : `/${obj.link}`} className={`flex items-center gap-2 z-40`} key={idx}>
                  <img src={`/hover/${obj.icon}.png`} alt="Menu Icon" className="size-8 " />
                  <div className="">{obj.nam}</div>
                </Link>
              </div>
            ))}
            {/* <div className="mt-4 font-[Sr]">Other</div>
            {minor.map((obj, idx) => (
              <div className="my-0.5 p-1 rounded hover:bg-white hover:text-black text-[14px]">
                <Link to={obj.link === "" ? "/" : `/${obj.link}`} className={`flex items-center gap-2 z-40`} key={idx}>
                  <img src={`/hover/${obj.icon}.png`} alt="Menu Icon" className="size-8 " />
                  <div className="">{obj.nam}</div>
                </Link>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
