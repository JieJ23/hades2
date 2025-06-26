import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { p9data } from "../Data/P9Data";
import { weaponAxe, weaponBlades, weaponCoat, weaponFlames, weaponSkull, weaponStaff } from "../Data/Misc";

const runs_staff = p9data.filter((obj) => weaponStaff.includes(obj.asp));
const runs_blades = p9data.filter((obj) => weaponBlades.includes(obj.asp));
const runs_axe = p9data.filter((obj) => weaponAxe.includes(obj.asp));
const runs_flames = p9data.filter((obj) => weaponFlames.includes(obj.asp));
const runs_skull = p9data.filter((obj) => weaponSkull.includes(obj.asp));
const runs_coat = p9data.filter((obj) => weaponCoat.includes(obj.asp));

//

const fear_staff = [...new Set(runs_staff.map((obj) => +obj.fea))];
const fear_blades = [...new Set(runs_blades.map((obj) => +obj.fea))];
const fear_axe = [...new Set(runs_axe.map((obj) => +obj.fea))];
const fear_flames = [...new Set(runs_flames.map((obj) => +obj.fea))];
const fear_skull = [...new Set(runs_skull.map((obj) => +obj.fea))];
const fear_coat = [...new Set(runs_coat.map((obj) => +obj.fea))];

//

const weaponOrder = [`Staff`, `Blades`, `Axe`, `Flames`, `Skull`, `Coat`];

export default function Community() {
  return (
    <main className="relative">
      <div className="fixed w-full h-full bg-[url('/mbg2.webp')] -z-10 bg-left lg:bg-center bg-cover opacity-20"></div>
      <Head />
      <div className="max-w-[1400px] font-[PT] text-[12px] md:text-[14px] mx-auto">
        <SideNav />
        <div className="py-4">
          <div className="px-6 font-[Cinzel] text-white text-[16px]">{weaponOrder[0]}</div>
          <section className="w-full p-2 pb-4 font-[PT] rounded flex flex-wrap gap-1 md:gap-2">
            {Array.from({ length: 46 }).map((_, index) => (
              <div
                className={`w-[30px] h-[30px] md:w-[50px] md:h-[50px] ${
                  fear_staff.includes(index + 22) ? `bg-[#a97130]` : `bg-black border-1 border-white/20`
                } rounded flex justify-center items-center`}
              >
                {fear_staff.includes(index + 22) ? <span className="line-through">{index + 22}</span> : index + 22}
              </div>
            ))}
          </section>
          <div className="px-6 font-[Cinzel] text-white text-[16px]">{weaponOrder[1]}</div>
          <section className="w-full p-2 pb-4 font-[PT] rounded flex flex-wrap gap-1 md:gap-2">
            {Array.from({ length: 46 }).map((_, index) => (
              <div
                className={`w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded flex justify-center items-center ${
                  fear_blades.includes(index + 22) ? `bg-[#30a972]` : `bg-black border-1 border-white/20`
                }`}
              >
                {fear_blades.includes(index + 22) ? <span className="line-through">{index + 22}</span> : index + 22}
              </div>
            ))}
          </section>
          <div className="px-6 font-[Cinzel] text-white text-[16px]">{weaponOrder[2]}</div>
          <section className="w-full p-2 pb-4 font-[PT] rounded flex flex-wrap gap-1 md:gap-2">
            {Array.from({ length: 46 }).map((_, index) => (
              <div
                className={`w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded flex justify-center items-center ${
                  fear_axe.includes(index + 22) ? `bg-[#303aa9]` : `bg-black border-1 border-white/20`
                }`}
              >
                {fear_axe.includes(index + 22) ? <span className="line-through">{index + 22}</span> : index + 22}
              </div>
            ))}
          </section>
          <div className="px-6 font-[Cinzel] text-white text-[16px]">{weaponOrder[3]}</div>
          <section className="w-full p-2 pb-4 font-[PT] rounded flex flex-wrap gap-1 md:gap-2">
            {Array.from({ length: 46 }).map((_, index) => (
              <div
                className={`w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded flex justify-center items-center ${
                  fear_flames.includes(index + 22) ? `bg-[#9330a9]` : `bg-black border-1 border-white/20`
                }`}
              >
                {fear_flames.includes(index + 22) ? <span className="line-through">{index + 22}</span> : index + 22}
              </div>
            ))}
          </section>
          <div className="px-6 font-[Cinzel] text-white text-[16px]">{weaponOrder[4]}</div>
          <section className="w-full p-2 pb-4 font-[PT] rounded flex flex-wrap gap-1 md:gap-2">
            {Array.from({ length: 46 }).map((_, index) => (
              <div
                className={`w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded flex justify-center items-center ${
                  fear_skull.includes(index + 22) ? `bg-[#a93038]` : `bg-black border-1 border-white/20`
                }`}
              >
                {fear_skull.includes(index + 22) ? <span className="line-through">{index + 22}</span> : index + 22}
              </div>
            ))}
          </section>
          <div className="px-6 font-[Cinzel] text-white text-[16px]">{weaponOrder[5]}</div>
          <section className="w-full p-2 pb-4 font-[PT] rounded flex flex-wrap gap-1 md:gap-2 my-b">
            {Array.from({ length: 46 }).map((_, index) => (
              <div
                className={`w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded flex justify-center items-center ${
                  fear_coat.includes(index + 22) ? `bg-[#3077a9]` : `bg-black border-1 border-white/20`
                }`}
              >
                {fear_coat.includes(index + 22) ? <span className="line-through">{index + 22}</span> : index + 22}
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
