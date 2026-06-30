import PageBlock from "../Block/PageBlock";
import roomF from "../Data/json/RoomDataF.json";
import { useState } from "react";

import { JsonView, allExpanded, darkStyles, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const rooms = [
  "F_Opening01",
  "F_Opening02",
  "F_Opening03",

  "F_MiniBoss01",
  "F_MiniBoss02",
  "F_MiniBoss03",

  "F_PreBoss01",
  "F_Boss01",

  "F_Shop01",

  "F_Reprieve01",

  "F_Story01",

  "F_Combat01",
  "F_Combat02",
  "F_Combat03",
  "F_Combat04",
  "F_Combat05",
  "F_Combat06",
  "F_Combat07",
  "F_Combat08",
  "F_Combat09",
  "F_Combat10",
  "F_Combat11",
  "F_Combat12",
  "F_Combat13",
  "F_Combat14",
  "F_Combat15",
  "F_Combat16",
  "F_Combat17",
  "F_Combat18",
  "F_Combat19",
  "F_Combat20",
  "F_Combat21",
  "F_Combat22",
];

export default function MapErebus() {
  const [rom, setRom] = useState(0);
  const shouldExpandNode = (depth) => depth < 1;

  return (
    <PageBlock>
      <div className="py-16 select-none">
        <div className="font-[Sr] text-[23px] my-4 text-center">Erebus Rooms</div>
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
            src={`/Erebus/${rooms[rom]}.webp`}
            alt="Map"
            className="min-w-[1200px] w-[1400px] h-auto mx-auto border border-white/10 rounded-xl"
            style={{
              borderStyle: "solid",
              borderWidth: "10px",
              borderImage: "url('/Misc/frame.webp') 50 stretch",
            }}
          />
        </div>
        {/* <div className="flex flex-wrap justify-center gap-1 font-[UbuntuMono]">
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
        <div className="max-w-250 mx-auto font-[UbuntuMono] text-[14px] my-4">
          <div>{rooms[rom]}</div>
          <JsonView
            data={roomF[rooms[rom]]}
            shouldExpandNode={shouldExpandNode}
            clickToExpandNode={false}
            style={defaultStyles}
          />
        </div>
        {roomF[rooms[rom]].InheritFrom.map((item) => (
          <div className="max-w-250 mx-auto font-[UbuntuMono] text-[14px] my-4">
            <div>{item}</div>
            <JsonView
              data={roomF[item]}
              shouldExpandNode={(depth) => depth < 1}
              clickToExpandNode={false}
              style={defaultStyles}
            />
          </div>
        ))} */}
      </div>
    </PageBlock>
  );
}
