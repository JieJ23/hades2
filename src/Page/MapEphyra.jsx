import PageBlock from "../Block/PageBlock";
import roomF from "../Data/json/RoomDataF.json";
import { useState } from "react";

import { JsonView, allExpanded, darkStyles, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const rooms = [
  "N_Boss01",
  "N_Boss02",
  "N_Combat01",
  "N_Combat02",
  "N_Combat03",
  "N_Combat04",
  "N_Combat05",
  "N_Combat06",
  "N_Combat07",
  "N_Combat08",
  "N_Combat09",
  "N_Combat10",
  "N_Combat11",
  "N_Combat12",
  "N_Combat13",
  "N_Combat14",
  "N_Combat15",
  "N_Combat16",
  "N_Combat17",
  "N_Combat18",
  "N_Combat19",
  "N_Combat20",
  "N_Combat21",
  "N_Combat22",
  "N_Combat23",
  "N_Hub",
  "N_MiniBoss01",
  "N_MiniBoss02",
  "N_Opening01",
  "N_PostBoss01",
  "N_PreBoss01",
  "N_PreHub01",
  "N_Story01",
  "N_Sub01",
  "N_Sub02",
  "N_Sub03",
  "N_Sub04",
  "N_Sub05",
  "N_Sub06",
  "N_Sub07",
  "N_Sub08",
  "N_Sub09",
  "N_Sub10",
  "N_Sub11",
  "N_Sub12",
  "N_Sub13",
  "N_Sub14",
  "N_Sub15",
];

export default function MapEphyra() {
  const [rom, setRom] = useState(0);
  const shouldExpandNode = (depth) => depth < 1;

  return (
    <PageBlock>
      <div className="py-16 select-none">
        <div className="font-[Sr] text-[23px] my-4 text-center">Ephyra Rooms</div>
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
            src={`/Ephyra/${rooms[rom]}.webp`}
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
