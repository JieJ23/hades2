import SideNav from "../Comp/Sidebar";
import Footer from "../Comp/Footer";
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
import { fullEnemyProj } from "../Data/EnemyProj";
import { groupProject } from "../Data/ProjectileID";

const underworld = [uw_erebus, uw_asphodel, uw_oceanus, uw_fields, uw_tartarus];
const underworld_name = [`Erebus`, `Asphodel`, `Oceanus`, `Fields`, `Tartarus`];
const surface = [s_ephyra, s_thessaly, s_olympus, s_summit].reverse();
const surface_name = [`City of Ephyra`, `Rift of Thessaly`, `Olympus`, `Summit`].reverse();

export default function Enemy() {
  return (
    <main className="relative">
      <Background />
      <div className="max-w-[1200px] font-[Ale] text-[12px] md:text-[13px] lg:text-[14px] mx-auto px-1">
        <SideNav />
        <div className="flex flex-wrap gap-4 py-2">
          {surface.map((obj, outeridx) => (
            <div
              className="bg-black/80 w-full p-2"
              style={{
                borderStyle: "solid",
                borderWidth: "6px",
                borderImage: "url('/Misc/frame.webp') 40 stretch",
              }}
            >
              <div className="text-[24px] my-1 text-center font-[Cinzel]">{surface_name[outeridx]}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {obj.map((item) => (
                  <div className="my-1 border border-white/10 rounded px-2 py-1">
                    <div>{item}</div>
                    <div className="flex gap-2 items-start">
                      <img src={`/Enemy/${item}.png`} alt="Enemy" className="w-16" loading="lazy" />
                      <div>
                        <div>HP: {enemy_data[item].hp}</div>
                        {enemy_data[item].rat1 && <div>Difficulty: {enemy_data[item].rat1}</div>}
                        {enemy_data[item].elitehp && (
                          <div className="text-[#f18043]">Elite HP: {enemy_data[item].elitehp}</div>
                        )}
                        {enemy_data[item].elitebuff && (
                          <div className="text-[#f18043]">Elite Armor: {enemy_data[item].elitebuff}</div>
                        )}
                        {enemy_data[item].rat2 && (
                          <div className="text-[#f18043]">Difficulty: {enemy_data[item].rat2}</div>
                        )}
                        {enemy_data[item].superhp && (
                          <div className="text-[#f05bdc]">Super HP: {enemy_data[item].superhp}</div>
                        )}
                        {enemy_data[item].superbuff && (
                          <div className="text-[#f05bdc]">Super Armor: {enemy_data[item].superbuff}</div>
                        )}
                      </div>
                      <div>
                        {enemy_data[item].Rival && (
                          <div className="text-[#00ffaa]">Rival HP: {enemy_data[item].Rival}</div>
                        )}
                        {enemy_data[item].Clone && <div>Clone HP: {enemy_data[item].Clone}</div>}
                        {enemy_data[item].Eagle && <div>Eagle HP: {enemy_data[item].Eagle}</div>}
                        {enemy_data[item].Baba && <div>Baba HP: {enemy_data[item].Baba}</div>}
                        {enemy_data[item].StaggeredDummy && <div>Stag. Dumb HP: {enemy_data[item].StaggeredDummy}</div>}
                        {enemy_data[item].Egg && <div>Eggs HP: {enemy_data[item].Egg}</div>}
                        {enemy_data[item].Other && <div>Cap/Boar/Drag HP: {enemy_data[item].Other}</div>}
                        {enemy_data[item].Part && <div>Eye/Arm HP: {enemy_data[item].Part}</div>}
                        {enemy_data[item].Tentacle1 && <div>Tentacle 1: {enemy_data[item].Tentacle1}</div>}
                        {enemy_data[item].Tentacle2 && <div>Tentacle 2: {enemy_data[item].Tentacle2}</div>}
                      </div>
                    </div>
                    <div>
                      {groupProject[item]?.map((ite) => (
                        <div className="grid grid-cols-3 hover:bg-[#131111]">
                          <div>{ite}</div>
                          <div className="text-end">
                            {(() => {
                              let current = fullEnemyProj.find((obj) => obj.Name === ite);
                              let level = 0;
                              const maxLevel = 10;
                              while (current && level < maxLevel) {
                                if (current.Damage) return current.Damage;
                                current = fullEnemyProj.find((p) => p.Name === current.InheritFrom);
                                level++;
                              }
                              return undefined;
                            })()}
                          </div>
                          <div className="text-end">
                            {(() => {
                              let current = fullEnemyProj.find((obj) => obj.Name === ite);
                              let level = 0;
                              const maxLevel = 10;
                              while (current && level < maxLevel) {
                                if (current.Type) return current.Type;
                                current = fullEnemyProj.find((p) => p.Name === current.InheritFrom);
                                level++;
                              }
                              return undefined;
                            })()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="divider font-[Cinzel] text-[20px] divider-warning">The Crossroad</div>
        <div className="flex flex-wrap gap-4 my-6">
          {underworld.map((obj, outeridx) => (
            <div
              className="bg-black/80 w-full p-2"
              style={{
                borderStyle: "solid",
                borderWidth: "6px",
                borderImage: "url('/Misc/frame.webp') 40 stretch",
              }}
            >
              <div className="text-[24px] my-1 text-center font-[Cinzel]">{underworld_name[outeridx]}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {obj.map((item) => (
                  <div className="my-1 border border-white/10 rounded px-2 py-1">
                    <div>{item}</div>
                    <div className="flex gap-2 items-start">
                      <img src={`/Enemy/${item}.png`} alt="Enemy" className="w-16" loading="lazy" />
                      <div>
                        <div>HP: {enemy_data[item].hp}</div>
                        {enemy_data[item].rat1 && <div>Difficulty: {enemy_data[item].rat1}</div>}
                        {enemy_data[item].elitehp && (
                          <div className="text-[#f18043]">Elite HP: {enemy_data[item].elitehp}</div>
                        )}
                        {enemy_data[item].elitebuff && (
                          <div className="text-[#f18043]">Elite Armor: {enemy_data[item].elitebuff}</div>
                        )}
                        {enemy_data[item].rat2 && (
                          <div className="text-[#f18043]">Difficulty: {enemy_data[item].rat2}</div>
                        )}
                        {enemy_data[item].superhp && (
                          <div className="text-[#f05bdc]">Super HP: {enemy_data[item].superhp}</div>
                        )}
                        {enemy_data[item].superbuff && (
                          <div className="text-[#f05bdc]">Super Armor: {enemy_data[item].superbuff}</div>
                        )}
                      </div>
                      <div>
                        {enemy_data[item].Rival && (
                          <div className="text-[#00ffaa]">Rival HP: {enemy_data[item].Rival}</div>
                        )}
                        {enemy_data[item].Clone && <div>Clone HP: {enemy_data[item].Clone}</div>}
                        {enemy_data[item].p2 && <div>P2 HP: {enemy_data[item].p2}</div>}
                        {enemy_data[item].p3 && <div>P3 HP: {enemy_data[item].p3}</div>}
                        {enemy_data[item].drum && <div>Drummer HP: {enemy_data[item].drum}</div>}
                        {enemy_data[item].key && <div>Keytarist HP: {enemy_data[item].key}</div>}

                        {enemy_data[item].Rivalp2 && (
                          <div className="text-[#00ffaa]">Rival P2 HP: {enemy_data[item].Rivalp2}</div>
                        )}
                        {enemy_data[item].Rivalp3 && (
                          <div className="text-[#00ffaa]">Rival P3 HP: {enemy_data[item].Rivalp3}</div>
                        )}
                      </div>
                    </div>
                    <div>
                      {groupProject[item]?.map((ite) => (
                        <div className="grid grid-cols-3 hover:bg-[#131111]">
                          <div>{ite}</div>
                          <div className="text-end">
                            {(() => {
                              let current = fullEnemyProj.find((obj) => obj.Name === ite);
                              let level = 0;
                              const maxLevel = 10;
                              while (current && level < maxLevel) {
                                if (current.Damage) return current.Damage;
                                current = fullEnemyProj.find((p) => p.Name === current.InheritFrom);
                                level++;
                              }
                              return undefined;
                            })()}
                          </div>
                          <div className="text-end">
                            {(() => {
                              let current = fullEnemyProj.find((obj) => obj.Name === ite);
                              let level = 0;
                              const maxLevel = 10;
                              while (current && level < maxLevel) {
                                if (current.Type) return current.Type;
                                current = fullEnemyProj.find((p) => p.Name === current.InheritFrom);
                                level++;
                              }
                              return undefined;
                            })()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </main>
  );
}
