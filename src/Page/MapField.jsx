import PageBlock from "../Block/PageBlock";
import roomH from "../Data/json/RoomDataH.json";

import { useState } from "react";

import { JsonView, allExpanded, darkStyles, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const rooms = [
  "H_PreBoss01",
  "H_Boss01",

  "H_MiniBoss01",
  "H_MiniBoss02",

  "H_Bridge01",

  "H_Combat01T",
  "H_Combat01B",
  "H_Combat02",
  "H_Combat03",
  "H_Combat04",
  "H_Combat05L",
  "H_Combat05R",
  "H_Combat06",
  "H_Combat07",
  "H_Combat08",
  "H_Combat09",
  "H_Combat10",
  "H_Combat11",
  "H_Combat12",
  "H_Combat13",
  "H_Combat14",
  "H_Combat15",
];

export default function MapField() {
  const [rom, setRom] = useState(0);
  const shouldExpandNode = (depth) => depth < 1;

  return (
    <PageBlock>
      <div className="py-16 select-none">
        <div className="font-[Sr] text-[23px] my-4 text-center">Field Rooms</div>
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
            src={`/Field/${rooms[rom]}.webp`}
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
            data={
              rom === 5 || rom === 6
                ? roomH.H_Combat01
                : rom === 10 || rom === 11
                  ? roomH.H_Combat05
                  : roomH[rooms[rom]]
            }
            shouldExpandNode={shouldExpandNode}
            clickToExpandNode={false}
            style={defaultStyles}
          />
        </div>
        {roomH[
          rom === 5 || rom === 6 ? "H_Combat01" : rom === 10 || rom === 11 ? "H_Combat05" : [rooms[rom]]
        ].InheritFrom.map((item) => (
          <div className="max-w-250 mx-auto font-[UbuntuMono] text-[14px] my-4">
            <div>{item}</div>
            <JsonView
              data={roomH[item]}
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
