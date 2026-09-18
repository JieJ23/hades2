import PageBlock from "../Block/PageBlock";
import roomF from "../Data/json/RoomDataF.json";
import { useState } from "react";

import { JsonView, allExpanded, darkStyles, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const rooms = [
  "P_Boss01",
  "P_Combat01",
  "P_Combat02",
  "P_Combat03",
  "P_Combat04",
  "P_Combat05",
  "P_Combat06",
  "P_Combat07",
  "P_Combat08",
  "P_Combat09",
  "P_Combat10",
  "P_Combat11",
  "P_Combat12",
  "P_Combat13",
  "P_Combat14",
  "P_Combat15",
  "P_Combat16",
  "P_Combat17",
  "P_Combat18",
  "P_Combat19",
  "P_Intro",
  "P_MiniBoss01",
  "P_MiniBoss02",
  "P_PostBoss01",
  "P_PreBoss01",
  "P_Reprieve01",
  "P_Shop01",
  "P_Story01",
];

export default function MapOlympus() {
  const [rom, setRom] = useState(0);
  const shouldExpandNode = (depth) => depth < 1;

  return (
    <PageBlock>
      <div className="py-16 select-none">
        <div className="font-[Sr] text-[23px] my-4 text-center">Olympus Rooms</div>
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
            src={`/Olympus/${rooms[rom]}.webp`}
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
