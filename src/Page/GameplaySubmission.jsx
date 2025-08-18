import Head from "../Comp/Head";
import Background from "../Comp/Background";
import SideNav from "../Comp/Sidebar";
import {
  bAttack,
  bSpecial,
  bCast,
  bSprint,
  bMagick,
  bAphrodite,
  bApollo,
  bAres,
  bDemeter,
  bHephaestus,
  bHera,
  bHestia,
  bPoseidon,
  bZeus,
  bArachne,
  bArtemis,
  bAthena,
  bCirce,
  bDionysus,
  bDuo,
  bEcho,
  bHades,
  bHermes,
  bIcarus,
  bMedea,
  bNarcissus,
  bAxe,
  bDagger,
  bLob,
  bStaff,
  bSuit,
  bTorch,
  bChaos,
  bSelene,
  bElemental,
  bTalent,
  bKeep,
} from "../Data/Boon1";
import { useState } from "react";
import { h2AspectOrder, sortCore } from "../Data/Misc";
import { Link } from "react-router-dom";

function swapKV(obj) {
  const swapped = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Convert the value to a string to use as a key
      const valueAsKey = String(obj[key]);
      swapped[valueAsKey] = key;
    }
  }

  return swapped;
}

const coreboons = [bAttack, bSpecial, bCast, bSprint, bMagick];
const gods = [bAphrodite, bApollo, bAres, bDemeter, bHephaestus, bHera, bHestia, bPoseidon, bZeus];
const Unseen = [bArachne, bArtemis, bAthena, bCirce, bDionysus, bEcho, bHades, bHermes, bIcarus, bMedea, bNarcissus];
const weapons = [bAxe, bDagger, bLob, bStaff, bSuit, bTorch];
const misc = [bDuo, bElemental];
const other = [bChaos, bSelene, bTalent];
const keepsakes = [bKeep];

export default function GameplaySubmission() {
  const [category, setCategory] = useState(0);
  const [core, setCore] = useState([]);
  const [hammer, setHammer] = useState([]);
  const [boons, setBoons] = useState([]);
  const [keep, setKeep] = useState([]);
  const [loading, setLoading] = useState(false);

  async function Submit(e) {
    e.preventDefault();

    const formEle = e.target;
    const formDatab = new FormData(formEle);
    setLoading(true);

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxRKnfO9SKimv8diiCucFfCvaZ3xfwlkWPRxhK6si1pW5Q9nZ_Z15mSNgztoexazcx-/exec",
        {
          method: "POST",
          body: formDatab,
        }
      );
      // This will log the selected option
      formEle.reset();
      setCore([]);
      setHammer([]);
      setBoons([]);
      setKeep([]);
      console.log(`good`);
      alert("Form submitted successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const allCategory = [coreboons, weapons, gods, Unseen, misc, other, keepsakes];
  const allCategoryTitle = [`Core`, `Weapons`, `Gods`, `Unseen`, `Duo & Elemental`, `Chaos & Selene`, `Keepsakes`];

  const displayData = allCategory[category];

  return (
    <main className="relative">
      <Background />
      <div className="max-w-[1200px] font-[Source] text-[12px] mx-auto">
        <SideNav />
        <div className="text-white text-center text-[20px] my-2 font-[Cinzel]">Gameplay Submission</div>
        <div className="flex justify-center gap-1">
          <Link
            className="flex items-center bg-[orange] text-black border-1 border-black rounded ps-2 p-1"
            to={`https://h2crossroads.pages.dev/FearCalculator`}
            target="_blank"
          >
            <div>{`Fear Calculator`}</div>
            <img src={`/Misc/ra.png`} alt="Oath" className="size-3" draggable={false} />
          </Link>
          <Link
            className="flex items-center bg-[orange] text-black border-1 border-black rounded ps-2 p-1"
            to={`https://h2crossroads.pages.dev/ArcanaDeck`}
            target="_blank"
          >
            <div>{`Arcana Deck`}</div>
            <img src={`/Misc/ra.png`} alt="Oath" className="size-3" draggable={false} />
          </Link>
        </div>
        <div className="flex justify-center gap-1 text-[#00ffaa]/98 py-1 px-4">
          Boon details are optional and should be provided through the boon selection section below the form.
        </div>
        {/* Form Start */}
        <form onSubmit={Submit}>
          <div className="w-full mx-auto my-2 grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 font-[Source] max-w-[1000px]">
            <div className="flex flex-col gap-2">
              <input type="date" placeholder="Date" className="input w-full rounded" name="dat" required />
              <input type="text" placeholder="Name" className="input w-full rounded" name="nam" required />
              <select defaultValue="Melinoe Staff" className="select select-neutral w-full rounded" name="asp">
                {h2AspectOrder.map((ite, index) => (
                  <option key={index}>{ite}</option>
                ))}
              </select>
              <select defaultValue="Underworld" className="select select-neutral w-full rounded" name="loc">
                <option>Underworld</option>
                <option>Surface</option>
              </select>
              <input
                type="number"
                placeholder="Fear"
                className="input w-full rounded"
                name="fea"
                max={67}
                min={22}
                required
              />
              <input type="text" placeholder="Gameplay Link" className="input w-full rounded" name="src" required />
              <input type="text" placeholder="Short Description" className="input w-full rounded" name="des" required />
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Arcana Shareable URL"
                className="input w-full border-1 border-[orange]/50 rounded"
                name="arcana"
                required
              />
              <input
                type="text"
                placeholder="Fear Shareable URL"
                className="input w-full border-1 border-[orange]/50 rounded"
                name="oath"
                required
              />
              <input
                type="text"
                placeholder="Complete Time (MM:SS.MS)"
                className="input w-full rounded"
                name="tim"
                required
              />
              <select defaultValue="Frog" className="select select-neutral w-full rounded" required name="fam">
                <option>Frog</option>
                <option>Cat</option>
                <option>Polecat</option>
                <option>Hound</option>
                <option>Raven</option>
              </select>
              {/* <div>Optional Full Entry Details</div> */}
              <input
                className="input w-full rounded border-1 border-[#00ffaa]/50"
                placeholder="Core Boons"
                name="cor"
                value={sortCore(core.join(","))}
              />
              <input
                className="input w-full rounded border-1 border-[#00ffaa]/50"
                placeholder="Hammer"
                value={hammer.join(",")}
                name="ham"
              />
              <input
                className="input w-full rounded border-1 border-[#00ffaa]/50"
                placeholder="Other Boons"
                value={boons.join(",")}
                name="boon"
              />
              <input
                className="input w-full rounded border-1 border-[#00ffaa]/50"
                placeholder="Keepsakes"
                value={keep.join(",")}
                name="ks"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="border-1 rounded text-[16px] px-2 py-1 w-[150px] cursor-pointer"
              type="submit"
              name="Submit"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
            </button>
          </div>
        </form>
        {/* Form End */}
        <div className="flex flex-wrap gap-0.5 my-2 mt-4 px-2">
          <div
            onClick={() => {
              setCore([]);
              setHammer([]);
              setBoons([]);
              setKeep([]);
            }}
            className=" cursor-pointer rounded bg-[#ffea00] p-1 text-black"
          >
            Reset
          </div>
          {core.map((item) => (
            <div
              onClick={() => setCore((prev) => prev.filter((ite) => ite !== item))}
              className="cursor-pointer rounded bg-[#00ffaa] p-1 text-black"
            >
              {item}
            </div>
          ))}
          {hammer.map((item) => (
            <div
              onClick={() => setHammer((prev) => prev.filter((ite) => ite !== item))}
              className="cursor-pointer rounded bg-[#2f00ff] p-1 text-white"
            >
              {item}
            </div>
          ))}
          {boons.map((item) => (
            <div
              onClick={() => setBoons((prev) => prev.filter((ite) => ite !== item))}
              className="cursor-pointer rounded bg-[#ff9900] p-1 text-black"
            >
              {item}
            </div>
          ))}
          {keep.map((item) => (
            <div
              onClick={() => setKeep((prev) => prev.filter((ite) => ite !== item))}
              className="cursor-pointer rounded bg-[#ff00bf] p-1 text-black"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 px-2 my-2">
          {allCategoryTitle.map((item, index) => (
            <button
              className="px-2 py-1 bg-[white] text-black rounded cursor-pointer"
              onClick={() => setCategory(index)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap px-2 my-2 mb-10 select-none">
          {displayData.map((objs) => (
            <section className="flex flex-wrap gap-1 py-2">
              {category === 6
                ? objs.map((item) => (
                    <div
                      className={`cursor-pointer flex items-center gap-2 rounded px-2 py-1 ${
                        keep.includes(item) ? `bg-[#00ffaa] text-black` : `bg-[#28282bc0]`
                      }`}
                      onClick={(prev) => {
                        if (keep.length >= 4) {
                          return prev;
                        } else {
                          setKeep((prev) => [...prev, item]);
                        }
                      }}
                    >
                      <img src={`buildgui/${[item]}.png`} alt="Boons" className="size-9" draggable={false} />
                      <div>{item}</div>
                    </div>
                  ))
                : Object.keys(swapKV(objs)).map((item) => (
                    <div
                      className={`cursor-pointer flex items-center gap-2 rounded px-2 py-1 ${
                        core.includes(item) || hammer.includes(item) || boons.includes(item)
                          ? `bg-[#00ffaa] text-black`
                          : `bg-[#28282bc0]`
                      }`}
                      onClick={() => {
                        if (category === 0) {
                          if (!core.includes(item) && core.length < 5) {
                            setCore((prev) => [...prev, item]);
                          }
                        } else if (category === 1) {
                          if (!hammer.includes(item)) {
                            setHammer((prev) => [...prev, item]);
                          }
                        } else {
                          if (!boons.includes(item)) {
                            setBoons((prev) => [...prev, item]);
                          }
                        }
                      }}
                    >
                      {category === 1 ? (
                        <img
                          src={`P9/Hammer${swapKV(objs)[item]}.png`}
                          alt="Boons"
                          className="size-9"
                          draggable={false}
                        />
                      ) : (
                        <img src={`P9/${swapKV(objs)[item]}.png`} alt="Boons" className="size-9" draggable={false} />
                      )}

                      <div>{item}</div>
                    </div>
                  ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
