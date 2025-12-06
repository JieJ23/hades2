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
  // bArachne,
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
  // bSelene,
  bElemental,
  bTalent,
  bKeep,
} from "../Data/Boon1";
import { useState } from "react";
import { h2AspectOrder, sortCore } from "../Data/Misc";
import { Link } from "react-router-dom";
import Footer from "../Comp/Footer";

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
const Unseen = [bArtemis, bAthena, bCirce, bDionysus, bEcho, bHades, bHermes, bIcarus, bMedea, bNarcissus];
const weapons = [bAxe, bDagger, bLob, bStaff, bSuit, bTorch];
const misc = [bDuo, bElemental];
const other = [bChaos, bTalent];
const keepsakes = [bKeep];

const selectPool = [
  `Athena`,
  `Artemis`,
  `Circe`,
  `Medea`,
  `Hermes`,
  `Icarus`,
  `Dionysus`,
  `Hades`,
  `Arachne`,
  `Narcissus`,
  `Echo`,
  `Chaos`,
  `Selene`,
  `Aphrodite`,
  `Apollo`,
  `Ares`,
  `Demeter`,
  `Hephaestus`,
  `Hera`,
  `Hestia`,
  `Poseidon`,
  `Zeus`,
].sort();

export default function GameplaySubmission() {
  const [category, setCategory] = useState(0);
  const [core, setCore] = useState([]);
  const [hammer, setHammer] = useState([]);
  const [godpool, setGodpool] = useState([]);
  const [boons, setBoons] = useState([]);
  const [keep, setKeep] = useState([]);
  const [loading, setLoading] = useState(false);

  async function Submit(e) {
    e.preventDefault();

    const formEle = e.target;
    const formDatab = new FormData(formEle);

    const minutes = parseInt(formDatab.get("min"), 10);
    const seconds = parseInt(formDatab.get("sec"), 10).toString().padStart(2, "0");
    const milliseconds = parseInt(formDatab.get("mls"), 10).toString().padStart(2, "0");

    // Combine into a single .tim value in milliseconds
    const tim = `${minutes}:${seconds}.${milliseconds}`;

    // Add the .tim value to formData
    formDatab.append("tim", tim);

    setLoading(true);
    // https://script.google.com/macros/s/AKfycbxRKnfO9SKimv8diiCucFfCvaZ3xfwlkWPRxhK6si1pW5Q9nZ_Z15mSNgztoexazcx-/exec
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxiQRnYrLAiWL0xV9eaauhwobborCkr5sJa4MJuDS3K_5uWxNliv3yrsnin-VxqdqyI/exec",
        {
          method: "POST",
          body: formDatab,
        }
      );
      // This will log the selected option
      formEle.reset();
      setCore([]);
      setHammer([]);
      setGodpool([]);
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

  // const allCategory = [coreboons, weapons, gods, Unseen, misc, other, keepsakes];
  const allCategory = [coreboons, weapons, keepsakes];

  // const allCategoryTitle = [`Core`, `Weapons`, `Olympians`, `Unseen`, `Duo & Elemental`, `Chaos & Hex`, `Keepsakes`];
  const allCategoryTitle = [`Core`, `Weapons`, `Keepsakes`];

  const displayData = allCategory[category];

  return (
    <main className="relative">
      <Background />
      <SideNav />
      <div className="max-w-[1200px] font-[Ale] text-[12px] mx-auto">
        <div className="text-white text-center text-[20px] my-2">Submission</div>
        {/* Form Start */}
        <form onSubmit={Submit}>
          <div className="w-full mx-auto my-2 grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 font-[Ale] max-w-[1000px]">
            <div className="flex flex-col gap-2">
              <div className="text-[14px]">Name are case-sensitive, "Hades" and "HADES" are separated.</div>
              <input type="text" placeholder="Name" className="input w-full rounded" name="nam" required />
              <input type="date" placeholder="Date" className="input w-full rounded" name="dat" required />
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
                min={1}
                required
              />
              <input
                type="text"
                placeholder="Gameplay / Image Link"
                className="input w-full rounded"
                name="src"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[14px]">Select Core and Hammer Boons below the form.</div>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="99"
                  placeholder="Minutes"
                  className="input w-full rounded"
                  name="min"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 2))}
                  required
                />
                <input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Seconds"
                  className="input w-full rounded"
                  name="sec"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 2))}
                  required
                />
                <input
                  type="number"
                  min="0"
                  max="99"
                  placeholder="Centiseconds"
                  className="input w-full rounded"
                  name="mls"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 2))}
                  required
                />
              </div>
              <select defaultValue="Frog" className="select select-neutral w-full rounded" required name="fam">
                <option>Frog</option>
                <option>Cat</option>
                <option>Polecat</option>
                <option>Hound</option>
                <option>Raven</option>
              </select>
              {/* <div>Optional Full Entry Details</div> */}
              <input
                className="input w-full rounded"
                placeholder="Core Boons"
                name="cor"
                value={sortCore(core.join(","))}
                required={true}
              />
              <input className="input w-full rounded" placeholder="Hammer" value={hammer.join(",")} name="ham" />
              <input
                className="input w-full rounded"
                placeholder="God Pool"
                value={godpool.join(",")}
                name="pool"
                required={true}
              />
              <input
                className="input w-full rounded"
                placeholder="Keepsakes"
                value={keep.join(",")}
                name="ks"
                required={true}
              />
            </div>
          </div>
          <div className="divider"></div>
          <div className="text-center text-[20px] my-4">Optional Information</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[1000px] mx-auto">
            <div className="flex flex-col gap-2">
              <div className="text-[14px]">Short description regarding the run, a brief sentence is ideal.</div>
              <input type="text" placeholder="Short Description" className="input w-full rounded" name="des" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[14px]">Arcana and Fear Shareable links.</div>
              <input type="text" placeholder="Arcana Shareable URL" className="input w-full rounded" name="arcana" />
              <input type="text" placeholder="Fear Shareable URL" className="input w-full rounded" name="oath" />
              <input className="input w-full rounded" placeholder="Other Boons" value={boons.join(",")} name="boon" />
            </div>
          </div>
          <div className="flex justify-center my-4">
            <button
              className="bg-[#00ffaa] text-black rounded text-[20px] px-2 py-1 w-[150px] cursor-pointer"
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
              setGodpool([]);
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
          {godpool.map((item) => (
            <div
              onClick={() => setGodpool((prev) => prev.filter((ite) => ite !== item))}
              className="cursor-pointer rounded bg-[#403088] p-1 text-white"
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
        <div className="text-[14px] px-2 mb-4">To de-select a boon, click on the boon name above.</div>
        <div className="text-[14px] px-4">Select God Pool:</div>
        <div className="flex flex-wrap gap-1 px-2 my-2 mt-1 select-none">
          {selectPool.map((item) => (
            <div
              className={` px-2 py-1 rounded-none cursor-pointer ${
                godpool.includes(item) ? `bg-[#00ffaa] text-black` : `bg-[#28282b]`
              }`}
              onClick={() => {
                if (!godpool.includes(item)) {
                  setGodpool((prev) => [...prev, item]);
                }
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="text-[14px] px-4">Select Boons/Keeps:</div>
        <div className="flex flex-wrap px-2 mt-1 mb-10 select-none">
          {displayData.map((objs) => (
            <section className="flex flex-wrap gap-1 my-1">
              {category === 2
                ? objs.map((item) => (
                    <div
                      className={`cursor-pointer flex items-center gap-2 rounded-none px-2 py-1 ${
                        keep.includes(item) ? `bg-[#00ffaa] text-black` : `bg-[#28282b]`
                      }`}
                      onClick={(prev) => {
                        if (keep.length >= 4) {
                          return prev;
                        } else {
                          setKeep((prev) => [...prev, item]);
                        }
                      }}
                    >
                      <img src={`buildgui/${[item]}.png`} alt="Boons" className="size-8" draggable={false} />
                      <div>{item}</div>
                    </div>
                  ))
                : Object.keys(swapKV(objs)).map((item) => (
                    <div
                      className={`cursor-pointer flex items-center gap-2 rounded-none px-2 py-1 ${
                        core.includes(item) || hammer.includes(item) || boons.includes(item)
                          ? `bg-[#00ffaa] text-black`
                          : `bg-[#28282b]`
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
                          className="size-8"
                          draggable={false}
                        />
                      ) : (
                        <img src={`P9/${swapKV(objs)[item]}.png`} alt="Boons" className="size-8" draggable={false} />
                      )}

                      <div>{item}</div>
                    </div>
                  ))}
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
