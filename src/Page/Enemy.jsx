import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import {
  uw_erebus,
  uw_asphodel,
  uw_oceanus,
  uw_fields,
  uw_tartarus,
  s_ephyra,
  s_olympus,
  s_thessaly,
  s_summit,
  enemy_data,
} from "../Data/EnemyTrait";

const underworld = [uw_erebus, uw_asphodel, uw_oceanus, uw_fields, uw_tartarus];
const underworld_name = [`Erebus`, `Asphodel`, `Oceanus`, `Fields`, `Tartarus`];
const surface = [s_ephyra, s_thessaly, s_olympus, s_summit].reverse();
const surface_name = [`City of Ephyra`, `Rift of Thessaly`, `Olympus`, `Summit`].reverse();

export default function Enemy() {
  return (
    <main className="relative">
      <Background />
      <Head />
      <div className="max-w-[1200px] font-[PT] text-[12px] md:text-[14px] mx-auto">
        <SideNav />
        <div className="flex flex-wrap gap-4 my-6 text-[12px] font-[PT]">
          {surface.map((obj, outeridx) => (
            <div className="bg-[#101122] w-full p-2 rounded border-1 border-white/20">
              <div className="text-[16px] font-[Cinzel]">{surface_name[outeridx]}</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {obj.map((item) => (
                  <div className="text-[11px] flex gap-2 items-center">
                    <img src={`/Enemy/${item}.png`} alt="Enemy" className="w-16" />
                    <div>
                      <div>{item}</div>
                      <div>HP: {enemy_data[item].hp}</div>
                      {/*  */}
                      <div>Difficulty: {enemy_data[item].rat1}</div>
                      {enemy_data[item].elitehp && (
                        <div className="text-[#f18043]">Elite HP: {enemy_data[item].elitehp}</div>
                      )}
                      {enemy_data[item].elitebuff && (
                        <div className="text-[#f18043]">Elite HP Buff: {enemy_data[item].elitebuff}</div>
                      )}
                      {enemy_data[item].rat2 && (
                        <div className="text-[#f18043]">Difficulty: {enemy_data[item].rat2}</div>
                      )}
                      {enemy_data[item].superhp && (
                        <div className="text-[#f05bdc]">Super Elite HP: {enemy_data[item].superhp}</div>
                      )}
                      {enemy_data[item].superbuff && (
                        <div className="text-[#f05bdc]">Super HP Buff: {enemy_data[item].superbuff}</div>
                      )}
                      {enemy_data[item].hp1 && <div className="text-[#00ffaa]">P1 HP: {enemy_data[item].hp1}</div>}
                      {enemy_data[item].hp2 && <div className="text-[#00ffaa]">P2 HP: {enemy_data[item].hp2}</div>}
                      {/*  */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="divider font-[Cinzel] text-[20px] divider-warning">The Crossroad</div>
        <div className="flex flex-wrap gap-4 my-6 text-[12px] font-[PT]">
          {underworld.map((obj, outeridx) => (
            <div className="bg-[#101122] w-full p-2 rounded border-1 border-white/20">
              <div className="text-[16px] font-[Cinzel]">{underworld_name[outeridx]}</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {obj.map((item) => (
                  <div className="text-[12px] flex gap-2 items-center">
                    <img src={`/Enemy/${item}.png`} alt="Enemy" className="w-16" />
                    <div>
                      <div>{item}</div>
                      <div>HP: {enemy_data[item].hp}</div>
                      {/*  */}
                      <div>Difficulty: {enemy_data[item].rat1}</div>
                      {enemy_data[item].elitehp && (
                        <div className="text-[#f18043]">Elite HP: {enemy_data[item].elitehp}</div>
                      )}
                      {enemy_data[item].elitebuff && (
                        <div className="text-[#f18043]">Elite HP Buff: {enemy_data[item].elitebuff}</div>
                      )}
                      {enemy_data[item].rat2 && (
                        <div className="text-[#f18043]">Difficulty: {enemy_data[item].rat2}</div>
                      )}
                      {enemy_data[item].superhp && (
                        <div className="text-[#f05bdc]">Super Elite HP: {enemy_data[item].superhp}</div>
                      )}
                      {enemy_data[item].superbuff && (
                        <div className="text-[#f05bdc]">Super HP Buff: {enemy_data[item].superbuff}</div>
                      )}
                      {/*  */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
