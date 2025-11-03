import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { sav1 } from "../SaveFile/Sav1";
import { parsemstoTime } from "../Data/Misc";

const targetObj = [
  {
    property: `Biome Time`,
    val: `${parsemstoTime(sav1.BiomeTime * 100)}`,
  },
  {
    property: `Gameplay Time`,
    val: `${parsemstoTime(sav1.GameplayTime * 100)}`,
  },
  {
    property: `Total Time`,
    val: `${parsemstoTime(sav1.TotalTime * 100)}`,
  },
  {
    property: `Killed By`,
    val: `${sav1.KilledByName}`,
  },
  {
    property: `Hero HP`,
    val: `${sav1.TooltipHeroMaxHealth}`,
  },
  {
    property: `Total Damage Taken`,
    val: `${sav1.TotalDamageTaken}`,
  },
  {
    property: `Meta Upgrade Cost`,
    val: `${sav1.MetaUpgradeCostCache}`,
  },
  {
    property: `Shrine Points`,
    val: `${sav1.ShrinePointsCache}`,
  },
];

export default function MyRun() {
  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1200px] font-[Ale] text-[14px] mx-auto px-1">
        <SideNav />
        {/* Testing Zone */}
        <div className="px-2 my-5">
          <div className="rounded flex flex-wrap gap-2 bg-black p-2">
            {targetObj.map((obj, index) => (
              <div className="p-2 bg-[#131111] text-center rounded" key={index}>
                <div className="text-[13px] text-gray-300">{obj.property}</div>
                <div>{obj.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Biome Gameplay Times</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.BiomeGameplayTimes).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  Biome {k} = {parsemstoTime(v * 100)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Biome Gameplay Times</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.BiomeTotalTimes).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  Biome {k} = {parsemstoTime(v * 100)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Blocked Keepsakes</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.BlockedKeepsakes).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  Biome {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Bosses HP Bar</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.BossHealthBarRecord).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {(v * 100).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Damage Dealt By Enemies</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.DamageDealtByEnemiesRecord).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Damage Dealt By Hero</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.DamageDealtByHeroRecord).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Damage Taken Record</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.DamageTakenFromRecord).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Encounter Clear Stats</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.EncounterClearStats).map((obj, index) => (
              <div className="flex gap-2">
                <div>
                  {obj[0]} = {parsemstoTime(obj[1].ClearTime * 100)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Enemy Kills</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.EnemyKills).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Keepsake Cache</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.KeepsakeCache).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Loot Choice History</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.LootChoiceHistory).map((obj, index) => (
              <div className="flex flex-col gap-1 my-4">
                <div>
                  {obj[0]} | Depth {obj[1].Depth} | {obj[1].UpgradeName}
                </div>
                <div className="flex gap-1">
                  {Object.entries(obj[1].UpgradeChoices).map((obj) => (
                    <div
                      className={`px-2 py-1 text-[13px] ${
                        obj[1].Chosen == `true` ? `bg-[#00ffaa] text-black` : `bg-[#28282b]`
                      }`}
                    >
                      <div>{obj[1].Name}</div>
                      <div>{obj[1].Rarity}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Loot Type History</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.LootTypeHistory).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Market Items</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.MarketItems).map((obj, index) => (
              <div className="flex flex-col gap-1 mb-4">
                <div>{obj[0]}</div>
                <div>
                  {Object.entries(obj[1]).map((obj) => (
                    <div>
                      {obj[1].BuyAmount}x {obj[1].BuyName} | Cost = {obj[1].Cost.MetaCurrency}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Projectile Record</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.ProjectileRecord).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Resources Gained</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.ResourcesGained).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Resources Spent</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.ResourcesSpent).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">RoomHistory</div>
          <div className="gap-1 rounded bg-black p-2">
            {Object.entries(sav1.RoomHistory).map((obj, index) => (
              <div className="mb-2">
                <div>Room # {obj[0]}</div>
                <div>Reward Type: {obj[1].ChosenRewardType}</div>
                <div>Encounter Name: {obj[1].Encounter.Name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Shrine Upgrades</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.ShrineUpgradesCache).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">SpawnRecord</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.SpawnRecord).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Trait (Boons)</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.TraitCache).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Trait Rarity (Boons)</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.TraitRarityCache).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Trait Uses</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.TraitUses).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Use Record</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.UseRecord).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 my-5">
          <div className="px-2 font-[Source]">Weapons Fired Record</div>
          <div className="rounded bg-black p-2">
            {Object.entries(sav1.WeaponsFiredRecord).map(([k, v], index) => (
              <div className="flex gap-2">
                <div>
                  {k} = {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Testing Zone */}
      </div>
      <Footer />
    </main>
  );
}
