import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";

const currentPatches = [
  `https://shared.fastly.steamstatic.com//store_item_assets/steam/apps/1145360/ss_34e6660705cfe47d2b2f95189c37f7cb77f75ca6.jpg?t=1715722799`,
  `https://shared.fastly.steamstatic.com//store_item_assets/steam/apps/1145360/ss_e0622b5a57521b76182d7e7e1ae47ee440edcf90.jpg?t=1715722799`,
  `https://shared.fastly.steamstatic.com//store_item_assets/steam/apps/1145360/ss_5e52844b891b54608eb51a850d6b53313eeed0f7.jpg?t=1715722799`,
  `https://shared.fastly.steamstatic.com//store_item_assets/steam/apps/1145360/ss_8e07e477fa7ff2f88c8984bc89b9652a655da0e9.jpg?t=1715722799`,
  `https://shared.fastly.steamstatic.com//store_item_assets/steam/apps/1145360/ss_c0fed447426b69981cf1721756acf75369801b31.jpg?t=1715722799`,
  `https://shared.fastly.steamstatic.com//store_item_assets/steam/apps/1145360/ss_bcb499a0dd001f4101823f99ec5094d2872ba6ee.jpg?t=1715722799`,
  `https://shared.fastly.steamstatic.com//store_item_assets/steam/apps/1145360/ss_217b70678a2eea71a974fba1a4cd8baa660581bb.jpg?t=1715722799`,
];

export default function Hades() {
  return (
    <main className="h-full min-h-lvh">
      <Head />
      <div className="flex flex-col md:flex-row gap-1">
        <SideNav />
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-1 w-full">
              <video
                src="https://video.st.dl.eccdnx.com/store_trailers/256801252/movie480_vp9.webm?t=1600353465"
                autoPlay={true}
                muted={true}
                loop={true}
                controls={true}
                className="rounded border-1 border-black w-full"
              />
            </div>
            <div className="w-full p-1">
              <img
                src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145360/ss_2a9e3f9ad4d29d900b890d56361be5b1634225a0.600x338.jpg?t=1715722799"
                className="rounded border-1 border-black w-full hidden md:block"
                draggable={false}
              />
            </div>
          </div>
        </div>
        <div className="w-[250px] shrink-0 hidden lg:block">
          <div>
            {currentPatches.map((item, index) => (
              <div key={index} className="m-2">
                <img src={item} alt="Patches" className="border-1 border-black rounded" draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
