import PageBlock from "../Block/PageBlock";
import roomF from "../Data/json/RoomDataF.json";
import { useState } from "react";

import { JsonView, allExpanded, darkStyles, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const rooms = [
  "Q_Boss01",
  "Q_Boss02",
  "Q_Combat01",
  "Q_Combat02",
  "Q_Combat03",
  "Q_Combat04",
  "Q_Combat05",
  "Q_Combat06",
  "Q_Combat07",
  "Q_Combat08",
  "Q_Combat09",
  "Q_Combat10",
  "Q_Combat11",
  "Q_Combat12",
  "Q_Combat13",
  "Q_Combat14",
  "Q_Combat15",
  "Q_Combat16",
  "Q_Intro",
  "Q_MiniBoss02",
  "Q_MiniBoss03",
  "Q_MiniBoss04",
  "Q_MiniBoss05",
  "Q_PreBoss01",
];

export default function MapSummit() {
  const [rom, setRom] = useState(0);
  const shouldExpandNode = (depth) => depth < 1;

  return (
    <PageBlock>
      <div className="py-16 select-none">
        <div className="font-[Sr] text-[23px] my-4 text-center">Summit Rooms</div>
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
            src={`/Summit/${rooms[rom]}.webp`}
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
