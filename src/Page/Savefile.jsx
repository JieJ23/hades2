import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { Link } from "react-router-dom";

import { parsesectoTime, traitAspect, aspectsFinder } from "../Data/Misc";

import { useState } from "react";

// https://script.google.com/macros/s/AKfycbzedKfMhWQu9CpJw6Z4b9PM5xiLg7C2bC2reyA4CUeqe3QKk6ZE3rayQe9NDJN-K3nz/exec
//

const rarity = (r) => {
  switch (r) {
    case "Common":
      return "#B0B0B0";
    case "Rare":
      return "#3FA9F5";
    case "Epic":
      return "#BF40BF";
    case "Legendary":
      return "#FFC04D";
    default:
      return "#ffffff";
  }
};

//

export default function Savefile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form

  async function Submit(e) {
    e.preventDefault();

    const formEle = e.target;
    const formDatab = new FormData(formEle);

    formDatab.append("dat", info.runNumber);
    formDatab.append("aspect", info.weapon);
    formDatab.append("gp1", `${info.bossFight[0][0]}/${info.bossFight[0][1].ClearTime}`);
    formDatab.append("gp2", `${info.bossFight[1][0]}/${info.bossFight[1][1].ClearTime}`);
    formDatab.append("gp3", `${info.bossFight[2][0]}/${info.bossFight[2][1].ClearTime}`);
    formDatab.append("gp4", `${info.bossFight[3][0]}/${info.bossFight[3][1].ClearTime}`);
    formDatab.append("bio1", info.biomesGTime[0][1]);
    formDatab.append("bio2", info.biomesGTime[1][1]);
    formDatab.append("bio3", info.biomesGTime[2][1]);
    formDatab.append("bio4", info.biomesGTime[3][1]);
    formDatab.append("herototal", info.heroDamageTotal);
    formDatab.append("enemytotal", info.enemyDamageTotal);
    formDatab.append("herot3", `${info.heroDamage[0][0]},${info.heroDamage[1][0]},${info.heroDamage[2][0]}`);
    formDatab.append("enemyt3", `${info.enemyDamage[0][0]},${info.enemyDamage[1][0]},${info.enemyDamage[2][0]}`);

    formDatab.append("herot3num", `${info.heroDamage[0][1]}/${info.heroDamage[1][1]}/${info.heroDamage[2][1]}`);
    formDatab.append("enemyt3num", `${info.enemyDamage[0][1]}/${info.enemyDamage[1][1]}/${info.enemyDamage[2][1]}`);

    setLoading(true);

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbwIXkzLUQ1SoBencqgbLNruneO3RunQsElmz0pBO5O4qzO_ItFjaanQa2c-k76S0SWU/exec",
        {
          method: "POST",
          body: formDatab,
        }
      );
      // This will log the selected option
      const text = await res.text();
      console.log("Response:", text);
      console.log(`good`);
      alert("Form submitted successfully!");
      formEle.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  //
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setData(json);
      } catch (err) {
        console.error("Invalid JSON file", err);
      }
    };

    reader.readAsText(file);
  };
  // Assignment
  let info = null;

  if (data) {
    const lastRunNum = Object.entries(data.GameState.RunHistory).length;
    const lastRunKey = Object.entries(data.GameState.RunHistory)[lastRunNum - 1][0];
    const lastRunObject = data.GameState.RunHistory[lastRunKey];

    info = {
      runNumber: lastRunKey,
      weapon: traitAspect.find((obj) => Object.keys(lastRunObject.TraitCache).includes(obj)),
      dataObject: lastRunObject,
      biomesGTime: Object.entries(lastRunObject.BiomeGameplayTimes),
      biomesTTime: Object.entries(lastRunObject.BiomeTotalTimes),
      keepsakes: Object.entries(lastRunObject.KeepsakeCache),
      lootHistory: lastRunObject.LootChoiceHistory ? Object.entries(lastRunObject.LootChoiceHistory) : null,
      traitsPicked: Object.keys(lastRunObject.PickedTraits),
      boonRarity: Object.entries(lastRunObject.TraitRarityCache),
      moneySpent: Object.entries(lastRunObject.ResourcesSpent),
      bossFight: Object.entries(lastRunObject.EncounterClearStats),
      enemyDamage: Object.entries(lastRunObject.DamageTakenFromRecord).sort((a, b) => b[1] - a[1]),
      enemyDamageTotal: Object.entries(lastRunObject.DamageTakenFromRecord).reduce((acc, ite) => acc + ite[1], 0),
      heroDamage: Object.entries(lastRunObject.DamageDealtByHeroRecord).sort((a, b) => b[1] - a[1]),
      heroDamageTotal: Object.entries(lastRunObject.DamageDealtByHeroRecord).reduce((acc, ite) => acc + ite[1], 0),
    };
  }

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      {/* <Background /> */}
      <div className="max-w-[1400px] font-[Ale] text-[14px] mx-auto px-2">
        <SideNav />

        <Link to={`https://jakobhellermann.github.io/hades2-tools/`} target="_blank">
          <div className="bg-black my-4 p-2 rounded">
            <div>Savefile to JSON | By jakobhellermann</div>
            <div className="text-blue-400 hover:underline">https://jakobhellermann.github.io/hades2-tools/</div>
          </div>
        </Link>

        <div className="my-6 flex flex-col gap-1 items-center">
          <input type="file" className="file-input" onChange={handleFileChange} />
          <div>{data ? "JSON loaded" : "No JSON loaded"}</div>
        </div>

        {data && (
          <div>
            {/* Form Start */}
            {info.dataObject.Cleared === true && (
              <form onSubmit={Submit}>
                <div className="flex justify-center gap-2">
                  <input className="input" placeholder="Player Name" name="nam" required></input>
                  <button
                    className="bg-[#00ffaa] text-black rounded text-[20px] px-2 py-1 w-[150px] cursor-pointer"
                    type="submit"
                    name="Submit"
                  >
                    {loading ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
                  </button>
                </div>
              </form>
            )}
            {/* Form End */}
            <div>Run # {info.runNumber}</div>
            <div>Weapon: {aspectsFinder(info.weapon)}</div>
            <div>Fear: {info.dataObject.ShrinePointsCache}</div>
            <div className="text-[#00ffaa]">Cleared: {info.dataObject.Cleared === true ? `True` : `False`}</div>
            <div>Biome Time: {parsesectoTime(info.dataObject.BiomeTime)}</div>
            <div>Gameplay Time: {parsesectoTime(info.dataObject.GameplayTime)}</div>
            <div>Total Time: {parsesectoTime(info.dataObject.TotalTime)}</div>
            <div className="divider">Break</div>
            <div>Run Depth: {info.dataObject.RunDepthCache}</div>
            <div>Run Results: {info.dataObject.RunResult}</div>
            <div className="divider">Break</div>
            <div>Total Max HP: {info.dataObject.TooltipHeroMaxHealth}</div>
            <div>Total Damage Taken: {info.dataObject.TotalDamageTaken}</div>
            <div className="divider">Break</div>
            <div>
              <div>Gameplay Time</div>
              {info.biomesGTime.map((obj, index) => (
                <div className="flex gap-2" key={index}>
                  <div>{obj[0]}</div>
                  <div>
                    {parsesectoTime(obj[1])} |{" "}
                    {index != 0 && parsesectoTime(info.biomesGTime[index][1] - info.biomesGTime[index - 1][1])}
                  </div>
                </div>
              ))}
            </div>
            <div className="divider">Break</div>
            <div>Total Time</div>
            <div>
              {info.biomesTTime.map((obj, index) => (
                <div className="flex gap-2" key={index}>
                  <div>{obj[0]}</div>
                  <div>{parsesectoTime(obj[1])}</div>
                </div>
              ))}
            </div>
            <div className="divider">Break</div>
            <div>Boss Time</div>
            <div>
              {info.bossFight.map((obj, index) => (
                <div className="flex gap-2" key={index}>
                  <div>{obj[0]}</div>
                  <div>
                    {parsesectoTime(obj[1].ClearTime)} | {!obj[1].TookDamage && `Damageless`}
                  </div>
                </div>
              ))}
            </div>
            <div className="divider">Break</div>
            <div>Keepsakes</div>
            {info.keepsakes.map((obj, index) => (
              <div className="flex gap-2" key={index}>
                <div>{obj[0]}</div>
                <div>{obj[1]}</div>
              </div>
            ))}
            <div className="divider">Break</div>
            <div>Loot History</div>
            {info.lootHistory &&
              info.lootHistory.map((obj, index) => (
                <div key={index} className="my-2">
                  <div className="flex gap-2">
                    <div>Depth #{obj[1].Depth}</div>
                    <div>{obj[1].UpgradeName}</div>
                  </div>
                  <div className="flex gap-2">
                    {Object.entries(obj[1].UpgradeChoices).map((innerObj) => (
                      <div
                        className={`border min-w-[150px] p-2 rounded ${
                          innerObj[1].Chosen == "true" && `bg-[#00ffaa] text-black`
                        }`}
                      >
                        <div>{innerObj[0]}</div>
                        <div>{innerObj[1].Name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            <div className="divider">Break</div>
            <div>Traits Picked</div>
            <div>
              {info.traitsPicked.map((ite) => (
                <div>{ite}</div>
              ))}
            </div>
            <div className="divider">Break</div>
            <div>Boons Picked</div>
            <div>
              {info.boonRarity.map((obj, index) => (
                <div key={index}>
                  {obj[0]} | <span style={{ color: rarity(obj[1]) }}>{obj[1]}</span>
                </div>
              ))}
            </div>
            <div className="divider">Break</div>
            <div>Hero Damage Total - {info.heroDamageTotal.toLocaleString()}</div>
            <div>
              {info.heroDamage.map((obj, index) => (
                <div className="flex gap-2" key={index}>
                  <div>{obj[0]}</div>
                  <div>{obj[1]}</div>
                </div>
              ))}
            </div>
            <div className="divider">Break</div>
            <div>Enemies Damage - {info.enemyDamageTotal.toLocaleString()}</div>
            <div>
              {info.enemyDamage.map((obj, index) => (
                <div className="flex gap-2" key={index}>
                  <div>{obj[0]}</div>
                  <div>{obj[1]}</div>
                </div>
              ))}
            </div>
            <div className="divider">Break</div>
            <div>
              {info.moneySpent.map((obj, index) => (
                <div className="flex gap-2" key={index}>
                  <div>{obj[0]}</div>
                  <div>{obj[1]}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
