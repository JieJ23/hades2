import Background from "../Comp/Background";
import SideNav from "../Comp/Sidebar";
import Footer from "../Comp/Footer";

import { parsesectoTime, aspectsFinder } from "../Data/Misc";

import { useData2 } from "../Hook/DataFetch2";
import Loading from "../Hook/Loading";

export const BossSpeedrun = () => {
  const { posts2, loader2 } = useData2();

  const surface = posts2.filter((obj) => obj.boss.includes("Eris")).sort((a, b) => a.bio4 - b.bio4);
  const underworld = posts2.filter((obj) => obj.boss.includes("Chronos")).sort((a, b) => a.bio4 - b.bio4);

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1400px] font-[Ale] text-[14px] mx-auto px-1">
        <SideNav />
        {loader2 ? (
          <Loading />
        ) : (
          <div className="flex flex-col">
            <div
              className="my-4 overflow-x-scroll"
              style={{
                borderStyle: "solid",
                borderWidth: "5px",
                borderImage: "url('/Misc/frame.webp') 40 stretch",
              }}
            >
              <div className={`grid grid-cols-11 w-[1400px] px-1 text-gray-300 bg-black`}>
                <div>Surface</div>
                <div>Aspect</div>
                <div>Ephyra</div>
                <div>Thessaly</div>
                <div>Olympus</div>
                <div>Summit</div>
                <div>Polyphemus</div>
                <div>Eris</div>
                <div>Prometheus</div>
                <div>Typhon</div>
                <div>Total Time</div>
              </div>
              {surface.map((obj, index) => (
                <div
                  className={`grid grid-cols-11 w-[1400px] px-1 ${index % 2 === 0 ? `bg-[#28282b]` : `bg-[#131111]`}`}
                >
                  <div>{obj.nam}</div>
                  <div>{aspectsFinder(obj.aspect)}</div>
                  <div>{parsesectoTime(obj.bio1)}</div>
                  <div>{parsesectoTime(obj.bio2 - obj.bio1)}</div>
                  <div>{parsesectoTime(obj.bio3 - obj.bio2)}</div>
                  <div>{parsesectoTime(obj.bio4 - obj.bio3)}</div>
                  <div>{parsesectoTime(obj.gp2)}</div>
                  <div>{parsesectoTime(obj.gp1)}</div>
                  <div>{parsesectoTime(obj.gp3)}</div>
                  <div>{parsesectoTime(obj.gp4)}</div>
                  <div>{parsesectoTime(obj.bio4)}</div>
                </div>
              ))}
            </div>
            <div
              className="my-4 overflow-x-scroll"
              style={{
                borderStyle: "solid",
                borderWidth: "5px",
                borderImage: "url('/Misc/frame.webp') 40 stretch",
              }}
            >
              <div className={`grid grid-cols-11 w-[1400px] px-1 text-gray-300 bg-black`}>
                <div>UW</div>
                <div>Aspect</div>
                <div>Erebus</div>
                <div>Oceanus</div>
                <div>Fields</div>
                <div>Tartarus</div>
                <div>Hecate</div>
                <div>Scylla</div>
                <div>Cerberus</div>
                <div>Chronos</div>
                <div>Total Time</div>
              </div>
              {underworld.map((obj, index) => (
                <div
                  className={`grid grid-cols-11 w-[1400px] px-1 ${index % 2 === 0 ? `bg-[#28282b]` : `bg-[#131111]`}`}
                >
                  <div>{obj.nam}</div>
                  <div>{aspectsFinder(obj.aspect)}</div>
                  <div>{parsesectoTime(obj.bio1)}</div>
                  <div>{parsesectoTime(obj.bio2 - obj.bio1)}</div>
                  <div>{parsesectoTime(obj.bio3 - obj.bio2)}</div>
                  <div>{parsesectoTime(obj.bio4 - obj.bio3)}</div>
                  <div>{parsesectoTime(obj.gp2)}</div>
                  <div>{parsesectoTime(obj.gp4)}</div>
                  <div>{parsesectoTime(obj.gp3)}</div>
                  <div>{parsesectoTime(obj.gp1)}</div>
                  <div>{parsesectoTime(obj.bio4)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};
