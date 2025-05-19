import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { w_staff, w_blades, w_axe, w_flames, w_coat, w_skull } from "../Data/Item";

export default function Hammer() {
  const fullWeaponHammers = [w_staff, w_blades, w_axe, w_flames, w_skull, w_coat];

  return (
    <main className="relative">
      <div className="fixed w-full h-full bg-[url('/mbg.webp')] -z-10 bg-top"></div>
      <Head />
      <div className="flex flex-col md:flex-row gap-2 max-w-[1400px] mx-auto">
        <SideNav />
        <section className="p-2 py-10 font-[PT] text-[14px] rounded">
          {fullWeaponHammers.map((obj, ind) => (
            <div className="flex flex-wrap gap-1 my-1 justify-center md:justify-start" key={ind}>
              {obj.map((item, index) => (
                <div
                  className="w-[100px] bg-base-300 hover:bg-warning  transition-all duration-100 ease-in border-1 border-black rounded-xl flex flex-col items-center p-2 group"
                  key={index}
                >
                  <div class="avatar">
                    <div class="w-14 rounded group-hover:w-16 transition-all duration-100 ease-in">
                      <img src={`/Hammer/${item}.png`} alt="Tailwind-CSS-Avatar-component" draggable={false} />
                    </div>
                  </div>
                  <div className="text-center text-[12px] group-hover:text-black transition-all duration-200 ease-in">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
