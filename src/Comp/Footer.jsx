const mod = ["Aki", "Frei", "Vangetsu", "Andrw", "Purple"];

import { usePfp } from "../Hook/PfpFetch";

export default function Footer() {
  const { pfp, pfploader } = usePfp();

  const contri = pfp.filter((obj) => obj.Tag.includes("$#c!"));

  return (
    <div className="my-10 select-none text-gray-400 text-center text-[13px] md:text-[14px] p-2 font-[Ale]">
      <div>∞ Created by Autumn ∞</div>
      <div>Contributors:</div>
      <div className="flex flex-wrap justify-center gap-2 my-2">
        {contri.map((item, index) => (
          <div className="flex justify-center items-center gap-1 bg-[#0a0a0a] border border-white/10 text-gray-300 rounded px-2 py-1 min-w-20">
            <img src={item.ImgLink} alt="Member" className="w-8 h-auto rounded-full" />
            <div>{item.Pfp}</div>
          </div>
        ))}
      </div>
      <div>Website has no affiliation with Supergiant Games</div>
    </div>
  );
}
