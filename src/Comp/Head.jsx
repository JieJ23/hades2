import { Link } from "react-router-dom";
import { sites } from "./Sidebar";
import Submit from "./Submit";

export default function Head() {
  return (
    <div className="navbar shadow-sm select-none w-full max-w-[1400px] py-0 mx-auto">
      <div className="navbar-start">
        <div className="block lg:hidden">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />{" "}
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-300 z-1 mt-3 w-52 p-2 shadow">
              {sites.map((obj, idx) => (
                <li key={idx}>
                  <Link to={`/${obj.link}`} key={idx} className="font-[Cinzel] text-[12px] flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-6 rounded-none">
                        <img src={`/${obj.icon}.png`} />
                      </div>
                    </div>
                    <div>{obj.nam}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <Link
          to={"/"}
          className="btn btn-ghost text-xl font-[Cinzel] hover:scale-[95%] duration-200 ease-in transition-transform flex items-center"
        >
          <div className="avatar">
            <div className="w-8 rounded-xl">
              <img src="/Hades2.png" />
            </div>
          </div>
          <div>Hades 2</div>
        </Link>
      </div>
      <div className="navbar-end">
        <Submit />
        {/* <Link to={"https://discord.com/users/1110261416432242758"} target="_blank`">
          <div className="avatar">
            <div className="w-8 rounded-xl">
              <img src="/discord.jpeg" />
            </div>
          </div>
        </Link> */}
      </div>
    </div>
  );
}
