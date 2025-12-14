import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { bossMap } from "../Mod/BossMap";

const allBosses = Object.values(bossMap);

export default function CustomChaos() {
  return (
    <div className="h-full min-h-lvh relative overflow-hidden text-[13px] md:text-[14px] font-[Ale] select-none">
      <Background />
      <SideNav />
      <div className="w-full max-w-[1200px] mx-auto border">
        <div>
          {allBosses.map((item) => (
            <div>{item}</div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
