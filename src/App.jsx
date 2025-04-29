import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";

const currentPatches = [
  `https://clan.st.dl.eccdnx.com/images//43315153/9aa99e99ab7819a4b59769605146ad8f6bf92eef.png`,
  `https://clan.st.dl.eccdnx.com/images//43315153/a0df1f009d04285fea7d7e0b3fca85d6935656e8.png`,
  `https://clan.st.dl.eccdnx.com/images//43315153/f664cf0ac2e16c6b7494668ae549ba075b740649.png`,
  `https://clan.st.dl.eccdnx.com/images//43315153/e3ad572b5e9082c606de2fe19db9ff1ca0ae8c46.png`,
  `https://clan.st.dl.eccdnx.com/images//43315153/34d111aa1e2b69286e80a373ee7af0681ab9bba6.png`,
  `https://clan.st.dl.eccdnx.com/images//43315153/7989dd3530c1e74f64433a1bf00227bf0609e0df.png`,
  `https://clan.st.dl.eccdnx.com/images//43315153/5fe489c2dce3ebae7f1f51a6c5d2391ed91ccace.png`,
  `https://clan.st.dl.eccdnx.com/images//43315153/01703bdd7b93bc5b51101cfa3fd98f8313c4e40b.png`,
];

function App() {
  return (
    <main className="h-full min-h-lvh">
      <Head />
      <div className="flex flex-col md:flex-row gap-1">
        <SideNav />
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-1 w-full">
              <video
                src="https://video.st.dl.eccdnx.com/store_trailers/257099837/movie480_vp9.webm?t=1739987484"
                autoPlay={true}
                muted={true}
                loop={true}
                controls={true}
                className="rounded border-1 border-black w-full"
              />
            </div>
            <div className="w-full p-1">
              <img
                src="https://shared.st.dl.eccdnx.com/store_item_assets/steam/apps/1145350/ss_f28befd916e59b8bf0a8a801b8a498b8adaa01eb.600x338.jpg?t=1741889622"
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

export default App;
