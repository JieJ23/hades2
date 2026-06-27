import PageBlock from "../Block/PageBlock"
import { useState } from "react"

const rooms = [
    "G_PreBoss01",
    "G_Boss01",

    "G_Shop01",

    "G_MiniBoss01",
    "G_MiniBoss02",
    "G_MiniBoss03",

    "G_Reprieve01",

    "G_Story01",

    "G_Combat01",
    "G_Combat02",
    "G_Combat03",
    "G_Combat04",
    "G_Combat05",
    "G_Combat06",
    "G_Combat07",
    "G_Combat08",
    "G_Combat09",
    "G_Combat10",
    "G_Combat11",
    "G_Combat12",
    "G_Combat13",
    "G_Combat14",
    "G_Combat15",
    "G_Combat16",
    "G_Combat17",
    "G_Combat18",
    "G_Combat19",
    "G_Combat20",]

export default function MapOceanus() {

    const [rom, setRom] = useState(0)

    return (
        <PageBlock>
            <div className="py-16 select-none">
                <div className="font-[Sr] text-[23px] my-4 text-center">Oceanus Rooms</div>
                <div className="flex flex-wrap justify-center gap-1 font-[UbuntuMono]">
                    {rooms.map((item, index) => (
                        <div key={index} onClick={() => setRom(index)} className={`${rom === index ? `bg-[#00ffaa]` : `bg-[white]`} px-2 py-0.5 rounded text-black cursor-pointer`}>{item}</div>
                    ))
                    }
                </div>
                <div className="text-center my-8 font-[Sr] text-[16px] text-[#00ffaa]">Selected: Room {rooms[rom]}</div>
                <div className="my-8 rounded overflow-x-scroll">
                    <img src={`/Oceanus/${rooms[rom]}.webp`} alt="Map" className="min-w-[1200px] w-[1400px] h-auto mx-auto border border-white/10 rounded-xl"

                        style={{
                            borderStyle: "solid",
                            borderWidth: "10px",
                            borderImage: "url('/Misc/frame.webp') 50 stretch",
                        }} />
                </div>
            </div>
        </PageBlock>
    )
}