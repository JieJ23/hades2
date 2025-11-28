import Background from "../Comp/Background";
import SideNav from "../Comp/Sidebar";
import { h2AspectOrder } from "../Data/Misc";

import { useState } from "react";

const playable = [
  `Achilles`,
  `Aphrodite`,
  `Apollo`,
  `Arachne`,
  `Ares`,
  `Artemis`,
  `Athena`,
  `Chaos`,
  `Charon`,
  `Circe`,
  `Demeter`,
  `Dionysus`,
  `Dora`,
  `Dusa`,
  `Echo`,
  `Fates`,
  `Hades`,
  `Persephone`,
  `Hephaestus`,
  `Hera`,
  `Heracles`,
  `Hermes`,
  `Hestia`,
  `Hypnos`,
  `Icarus`,
  `Medea`,
  `Megaera`,
  `Melinoe`,
  `Moros`,
  `Narcissus`,
  `Nemesis`,
  `Nyx`,
  `Odysseus`,
  `Orpheus`,
  `Poseidon`,
  `Selene`,
  `Skelly`,
  `Thanatos`,
  `Zagreus`,
  `Zeus`,
].sort();

const bossUW = [`Hecate`, `Scylla`, `Cerberus`, `Chronos`];
const bossSurface = [`Polyphemus`, `Eris`, `Prometheus`, `TyphonHead`].reverse();

export default function MyTeam() {
  const [surface, setSurface] = useState([
    { char: null, asp: null },
    { char: null, asp: null },
    { char: null, asp: null },
    { char: null, asp: null },
  ]);
  const [under, setUnder] = useState([
    { char: null, asp: null },
    { char: null, asp: null },
    { char: null, asp: null },
    { char: null, asp: null },
  ]);
  const [loading, setLoading] = useState(false);

  //   Form
  async function Submit(e) {
    e.preventDefault();

    const formEle = e.target;
    const formDatab = new FormData(formEle);

    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // months are 0-based
    const day = now.getDate().toString().padStart(2, "0");
    const year = now.getFullYear();

    const formatted = `${month}/${day}/${year}`;

    formDatab.append("dat", formatted);

    setLoading(true);

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyBRCZIxijilvGiwwnontSQT_feDyRCEljaqUkZgbkcp5morHAHQgKUE1PjTqEnEYQM/exec",
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
      setSurface([
        { char: null, asp: null },
        { char: null, asp: null },
        { char: null, asp: null },
        { char: null, asp: null },
      ]);
      setUnder([
        { char: null, asp: null },
        { char: null, asp: null },
        { char: null, asp: null },
        { char: null, asp: null },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const updateSurface = (index, field, value) => {
    setSurface((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };
  const updateUnder = (index, field, value) => {
    setUnder((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const bothSelect = [...surface, ...under];
  const allChar = [...new Set(bothSelect.map((obj) => obj.char))];
  const allAspect = [...new Set(bothSelect.map((obj) => obj.asp))];

  return (
    <div className="h-full min-h-lvh relative overflow-hidden select-none">
      <Background />
      {/* <SideNav /> */}
      <div className="w-full max-w-[1400px] mx-auto p-2 my-2 font-[Ale] text-[12px] md:text-[13px]">
        {/* Title */}
        <div className="flex justify-center items-center my-4">
          <img draggable="false" src="/Hades2.png" alt="Hades 2" className="w-[80px]" />
          <div className="text-[20px] font-[Cinzel]">
            <div>My</div>
            <div>Hades II</div>
            <div>Team</div>
          </div>
        </div>
        {/* Showing All Option */}
        <div
          className="w-full px-1 p-2 bg-black/50"
          style={{
            borderStyle: "solid", // Required
            borderWidth: "4px",
            borderImage: "url('/Misc/frame.webp') 40 stretch",
          }}
        >
          <div className="flex flex-wrap gap-1">
            {playable.map((ite) => (
              <img
                draggable="false"
                src={`/playable/${ite}.png`}
                alt="Char"
                className={`w-[40px] opacity-50 ${
                  allChar.includes(ite) ? `opacity-100 border border-[#00ffaa]` : `opacity-30`
                }`}
              />
            ))}
            {h2AspectOrder.map((ite) => (
              <img
                draggable="false"
                src={`/GUI_Card/c${ite}.png`}
                alt="Aspects"
                className={`w-[40px] ${allAspect.includes(ite) ? `opacity-100 border border-[#00ffaa]` : `opacity-30`}`}
              />
            ))}
          </div>
        </div>
        {/* Main Display */}
        <form onSubmit={Submit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-2">
            <div
              className="flex flex-col justify-center gap-4 bg-black/80 p-2"
              style={{
                borderStyle: "solid", // Required
                borderWidth: "4px",
                borderImage: "url('/Misc/frame.webp') 40 stretch",
              }}
            >
              {bossSurface.map((ite, index) => (
                <div className="flex justify-center items-center gap-4">
                  <img draggable="false" src={`/Enemy/${ite}.png`} alt="Boss" className="w-[70px]" />
                  <div className="font-[Ale]">vs</div>
                  {surface[index].char === null ? (
                    <div className="skeleton w-[70px] h-full" />
                  ) : (
                    <img
                      draggable="false"
                      src={`/playable/${surface[index].char}.png`}
                      alt="Char"
                      className="w-[70px]"
                    />
                  )}
                  {surface[index].asp === null ? (
                    <div className="skeleton w-[70px] h-full" />
                  ) : (
                    <img
                      draggable="false"
                      src={`/GUI_Card/c${surface[index].asp}.png`}
                      alt="Aspect"
                      className="w-[65px]"
                    />
                  )}
                  <div>
                    <div>{ite}</div>
                    <select
                      className="bg-black select select-sm rounded focus:outline-none focus:border-transparent"
                      value={surface[index].char ?? ""}
                      onChange={(e) => updateSurface(index, "char", e.target.value)}
                      name={`qa${index * 2 + 1}`}
                    >
                      <option value={""} disabled>
                        Char
                      </option>
                      {playable.map((ite) => (
                        <option value={ite}>{ite}</option>
                      ))}
                    </select>
                    <select
                      className="bg-black select select-sm rounded focus:outline-none focus:border-transparent "
                      value={surface[index].asp ?? ""}
                      onChange={(e) => updateSurface(index, "asp", e.target.value)}
                      name={`qa${index * 2 + 2}`}
                    >
                      <option value={""} disabled>
                        Aspect
                      </option>
                      {h2AspectOrder.map((ite) => (
                        <option value={ite}>{ite}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="flex flex-col justify-center gap-4 bg-black/80 p-2"
              style={{
                borderStyle: "solid", // Required
                borderWidth: "4px",
                borderImage: "url('/Misc/frame.webp') 40 stretch",
              }}
            >
              {bossUW.map((ite, index) => (
                <div className="flex justify-center items-center gap-4">
                  <img draggable="false" src={`/Enemy/${ite}.png`} alt="Boss" className="w-[70px]" />
                  <div className="font-[Ale]">vs</div>
                  {under[index].char === null ? (
                    <div className="skeleton w-[70px] h-full" />
                  ) : (
                    <img draggable="false" src={`/playable/${under[index].char}.png`} alt="Char" className="w-[70px]" />
                  )}
                  {under[index].asp === null ? (
                    <div className="skeleton w-[70px] h-full" />
                  ) : (
                    <img
                      draggable="false"
                      src={`/GUI_Card/c${under[index].asp}.png`}
                      alt="Aspect"
                      className="w-[65px]"
                    />
                  )}
                  <div>
                    <div>{ite}</div>
                    <select
                      className="bg-black select select-sm rounded focus:outline-none focus:border-transparent"
                      value={under[index].char ?? ""}
                      onChange={(e) => updateUnder(index, "char", e.target.value)}
                      name={`qa${index * 2 + 9}`}
                    >
                      <option value={""} disabled>
                        Char
                      </option>
                      {playable.map((ite) => (
                        <option value={ite}>{ite}</option>
                      ))}
                    </select>
                    <select
                      className="bg-black select select-sm rounded focus:outline-none focus:border-transparent "
                      value={under[index].asp ?? ""}
                      onChange={(e) => updateUnder(index, "asp", e.target.value)}
                      name={`qa${index * 2 + 10}`}
                    >
                      <option value={""} disabled>
                        Aspect
                      </option>
                      {h2AspectOrder.map((ite) => (
                        <option value={ite}>{ite}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <input className="input" placeholder="Your Name" name="nam" required></input>
            <button
              className="bg-[#00ffaa] text-black rounded text-[20px] px-2 py-1 w-[150px] cursor-pointer"
              type="submit"
              name="Submit"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
