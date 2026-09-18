import PageBlock from "../Block/PageBlock";
import roomF from "../Data/json/RoomDataF.json";
import { useState } from "react";

import { JsonView, allExpanded, darkStyles, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const rooms = [
  "O_Boss01",
  "O_Boss02",
  "O_Combat01",
  "O_Combat02",
  "O_Combat03",
  "O_Combat04",
  "O_Combat05",
  "O_Combat06",
  "O_Combat07",
  "O_Combat08",
  "O_Combat09",
  "O_Combat10",
  "O_Combat11",
  "O_Combat12",
  "O_Combat13",
  "O_Combat14",
  "O_Combat15",
  "O_Devotion01",
  "O_Intro",
  "O_MiniBoss01",
  "O_MiniBoss02",
  "O_PostBoss01",
  "O_PreBoss01",
  "O_Reprieve01",
  "O_Shop01",
  "O_Story01",
];

export default function MapThessaly() {
  const [rom, setRom] = useState(0);
  const shouldExpandNode = (depth) => depth < 1;

  return (
    <PageBlock>
      <div className="py-16 select-none">
        <div className="font-[Sr] text-[23px] my-4 text-center">Thessaly Rooms</div>
        <div className="flex flex-wrap justify-center gap-1 font-[UbuntuMono]">
          {rooms.map((item, index) => (
            <div
              key={index}
              onClick={() => setRom(index)}
              className={`${rom === index ? `bg-[#00ffaa]` : `bg-[white]`} px-2 py-0.5 rounded text-black cursor-pointer`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="text-center my-8 font-[Sr] text-[16px] text-[#00ffaa]">Selected: Room {rooms[rom]}</div>
        <div className="my-8 rounded overflow-x-scroll">
          <img
            src={`/Thessaly/${rooms[rom]}.webp`}
            alt="Map"
            className="min-w-300 w-350 h-auto mx-auto border border-white/10 rounded-xl"
            style={{
              borderStyle: "solid",
              borderWidth: "10px",
              borderImage: "url('/Misc/frame.webp') 50 stretch",
            }}
          />
        </div>
      </div>
    </PageBlock>
  );
}
