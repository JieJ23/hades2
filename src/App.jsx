import SideNav from "./Comp/Sidebar";
import { p9boons_reverse, p9boons, allP9 } from "./Data/P9BoonObj";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";
import { bOrder } from "./Data/Boon2";
import { boonCodexr, boonCodex } from "./Data/Boon2";

export const orderMap = new Map(allP9.map((item, index) => [item, index]));
export const orderMap2 = new Map(bOrder.map((item, index) => [item, index]));

export const findGUIcard = (asp) => {
  switch (asp) {
    case `Anubis`:
      return `Melinoe Staff`;
    case `Morrigan`:
      return `Melinoe Blades`;
    case `Nergal`:
      return `Melinoe Axe`;
    case `Hel`:
      return `Melinoe Skull`;
    case `Shiva`:
      return `Melinoe Coat`;
    case `Supay`:
      return `Melinoe Flames`;
    default:
      return asp;
  }
};
export const findValue = (arr) => {
  const finalized = arr.map((ite) => p9boons_reverse[ite]);
  return finalized;
};
export const findValue2 = (arr) => {
  const finalized = arr.map((ite) => boonCodexr[ite]);
  return finalized;
};
export const handleLoadMore = (updater) => {
  updater((prev) => prev + 50);
};

export default function App() {
  return (
    <main className="h-full min-h-lvh relative select-none overflow-hidden">
      <Background />
      <div className="max-w-[1000px] font-[Source] text-[12px] md:text-[13px] mx-auto px-2">
        <SideNav />
        <div className="flex items-center justify-center mx-auto overflow-hidden">
          <img
            src="/Misc/Melinoe.webp"
            alt="Melinoe"
            className="h-[150px] sm:h-[200px] pt-4 mx-auto drop-shadow-[0_0_10px_#00ffaa]"
          />
          <img
            src="/Misc/Medea.webp"
            alt="Medea"
            className="h-[150px] sm:h-[200px] pt-4 mx-auto drop-shadow-[0_0_10px_#A020F0]"
          />
        </div>
        <div className="flex w-full">
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/LCimToTp0es`}
              allowFullScreen
              className="h-full w-full border border-black rounded"
            />
          </div>
        </div>
        <img
          src="/Misc/Chronos.webp"
          alt="Chronos"
          className="w-[150px] mx-auto drop-shadow-[0_0_10px_#FFD700] translate-y-10"
        />
        <img
          src="/Misc/wanted.png"
          alt="Wanted Poster"
          className="w-full max-w-[300px] mx-auto drop-shadow-[0_0_10px_#FFD700]"
        />
      </div>
      <Footer />
    </main>
  );
}
