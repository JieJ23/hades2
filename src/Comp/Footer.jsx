import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

gsap.registerPlugin(SplitText, useGSAP);

const mod = ["Aki", "Frei", "Vangetsu", "Andrw"];

export default function Footer() {
  useGSAP(() => {
    const split = SplitText.create(".target", { type: "chars" });

    gsap.from(split.chars, {
      y: -5,
      stagger: { each: 0.08, from: "start", repeat: -1, yoyo: true },
      duration: 0.4,
      ease: "sine.inOut",
    });
  });

  return (
    <div className="my-8 select-none text-gray-300 text-center text-[13px] md:text-[14px] p-2">
      <div className="font-[Ale]">Managing Members:</div>
      <div className="flex justify-center gap-2 my-2">
        {mod.map((item) => (
          <div className="flex justify-center items-center gap-1 bg-[#131111] rounded px-2 py-1 min-w-20">
            <img src={`/Avatar/${item.toLowerCase()}.webp`} alt="Member" className="w-8 h-auto rounded-full" />
            <div className="font-[Ale] target">{item}</div>
          </div>
        ))}
      </div>
      <div className="font-[Ale]">Website has no affiliation with Supergiant Games</div>
    </div>
  );
}
