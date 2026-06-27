import PageBlock from "../Block/PageBlock"
import { useState } from "react"

const rooms = [
    "I_PreBoss01",

    "I_Story01",

    "I_MiniBoss01",
    "I_MiniBoss02",

    "I_Combat01",
    "I_Combat02",
    "I_Combat03",
    "I_Combat04",
    "I_Combat05",
    "I_Combat06",
    "I_Combat07",
    "I_Combat08",
    "I_Combat09",
    "I_Combat10",
    "I_Combat11",
    "I_Combat12",
    "I_Combat13",
    "I_Combat14",
    "I_Combat15",
    "I_Combat16",
    "I_Combat17",
    "I_Combat18",
    "I_Combat19",
    "I_Combat20",
    "I_Combat21",
    "I_Combat22",
    "I_Combat23",
    "I_Combat24",]

export default function MapTartarus() {

    const [rom, setRom] = useState(0)

    return (
        <PageBlock>
            <div className="py-16 select-none">
                <div className="font-[Sr] text-[23px] my-4 text-center">Tartarus Rooms</div>
                <div className="flex flex-wrap justify-center gap-1 font-[UbuntuMono]">
                    {rooms.map((item, index) => (
                        <div key={index} onClick={() => setRom(index)} className={`${rom === index ? `bg-[#00ffaa]` : `bg-[white]`} px-2 py-0.5 rounded text-black cursor-pointer`}>{item}</div>
                    ))
                    }
                </div>
                <div className="text-center my-8 font-[Sr] text-[16px] text-[#00ffaa]">Selected: Room {rooms[rom]}</div>
                <div className="my-8 rounded overflow-x-scroll">
                    <img src={`/Tartarus/${rooms[rom]}.webp`} alt="Map" className="min-w-[1200px] w-[1400px] h-auto mx-auto border border-white/10 rounded-xl"

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