import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { sToA } from "../Data/Misc";
import { sdata } from "../Data/SData";
import { mainID } from "../Data/MainID";
import { useState } from "react";
import assets from "../Data/store.json";
import { h2AspectOrder, parseTimetoms, parsemstoTime } from "../Data/Misc";
import { arcanaid } from "../Data/Arcana1";
import BarFear from "../Comp/BarFear";
import BarTime from "../Comp/BarTime";
//
import {
  pos,
  apo,
  aph,
  dem,
  hes,
  hep,
  are,
  zeu,
  her,
  hermes,
  athena,
  dio,
  art,
  hades,
  duo,
  spell,
  selene,
  chaos,
  arc,
  nar,
  medea,
  circe,
  icarus,
  staffHammer,
  axeHammer,
  lobHammer,
  suitHammer,
  torchHammer,
  daggerHammer,
  echo,
  misc,
  metaUpgrade,
  attack,
  special,
  cast,
  sprint,
  magick,
} from "../Data/Group";
//
export default function GameStats() {
  const [aspect, setAspect] = useState("");
  const [region, setRegion] = useState("");
  const [time, setTime] = useState("");
  const [minfear, setMinFear] = useState("");
  const [maxfear, setMaxFear] = useState("");

  const targetList = assets.filter((obj) => {
    const matchesAspect = !aspect || obj.Aspect === aspect;
    const matchesRegion = !region || obj.Region === region;
    const matchesTime = !time || parseTimetoms(obj.Time) < 6000 * Number(time);

    const min = Number(minfear);
    const max = Number(maxfear);

    const matchesFear = (!minfear || obj.Fear >= min) && (!maxfear || obj.Fear <= max);

    return matchesAspect && matchesRegion && matchesTime && matchesFear;
  });

  const boonStore = Object.entries(
    targetList.reduce((acc, ite) => {
      const items = sToA(ite.Traits);

      items.forEach((item) => {
        acc[item] = (acc[item] || 0) + 1;
      });

      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  // Grouping Data
  const categories = [
    { key: "attackItems", obj: attack },
    { key: "specialItems", obj: special },
    { key: "castItems", obj: cast },
    { key: "sprintItems", obj: sprint },
    { key: "magickItems", obj: magick },
    { key: "posItems", obj: pos },
    { key: "apoItems", obj: apo },
    { key: "aphItems", obj: aph },
    { key: "demItems", obj: dem },
    { key: "hesItems", obj: hes },
    { key: "hepItems", obj: hep },
    { key: "areItems", obj: are },
    { key: "zeuItems", obj: zeu },
    { key: "herItems", obj: her },
    { key: "hermesItems", obj: hermes },
    { key: "athenaItems", obj: athena },
    { key: "dioItems", obj: dio },
    { key: "artItems", obj: art },
    { key: "hadesItems", obj: hades },
    { key: "duoItems", obj: duo },
    { key: "spellItems", obj: spell },
    { key: "seleneItems", obj: selene },
    { key: "chaosItems", obj: chaos },
    { key: "arcItems", obj: arc },
    { key: "narItems", obj: nar },
    { key: "medeaItems", obj: medea },
    { key: "circeItems", obj: circe },
    { key: "icarusItems", obj: icarus },
    { key: "staffHammerItems", obj: staffHammer },
    { key: "axeHammerItems", obj: axeHammer },
    { key: "lobHammerItems", obj: lobHammer },
    { key: "suitHammerItems", obj: suitHammer },
    { key: "torchHammerItems", obj: torchHammer },
    { key: "daggerHammerItems", obj: daggerHammer },
    { key: "echoItems", obj: echo },
    { key: "miscItems", obj: misc },
    { key: "metaUpgradeItems", obj: metaUpgrade },
  ];

  // Single reduce that handles all categories
  const result = boonStore.reduce(
    (acc, [name, count]) => {
      // Find which category this item belongs to
      const category = categories.find((cat) => name in cat.obj);

      if (category) {
        acc[category.key].push([name, count]);
      }

      return acc;
    },
    // Initialize all arrays dynamically
    categories.reduce((init, cat) => {
      init[cat.key] = [];
      return init;
    }, {}),
  );

  const {
    attackItems,
    specialItems,
    castItems,
    sprintItems,
    magickItems,
    posItems,
    apoItems,
    aphItems,
    demItems,
    hesItems,
    hepItems,
    areItems,
    zeuItems,
    herItems,
    hermesItems,
    athenaItems,
    dioItems,
    artItems,
    hadesItems,
    duoItems,
    spellItems,
    seleneItems,
    chaosItems,
    arcItems,
    narItems,
    medeaItems,
    circeItems,
    icarusItems,
    staffHammerItems,
    axeHammerItems,
    lobHammerItems,
    suitHammerItems,
    torchHammerItems,
    daggerHammerItems,
    echoItems,
    miscItems,
    metaUpgradeItems,
  } = result;

  const display = [
    staffHammerItems,
    axeHammerItems,
    lobHammerItems,
    suitHammerItems,
    torchHammerItems,
    daggerHammerItems,
    attackItems,
    specialItems,
    castItems,
    sprintItems,
    magickItems,
    posItems,
    apoItems,
    aphItems,
    demItems,
    hesItems,
    hepItems,
    areItems,
    zeuItems,
    herItems,
    hermesItems,
    athenaItems,
    dioItems,
    artItems,
    hadesItems,
    duoItems,
    arcItems,
    narItems,
    medeaItems,
    circeItems,
    icarusItems,
    echoItems,
    spellItems,
    seleneItems,
    chaosItems,
    miscItems,
  ];
  // Testing

  const bio1 = Object.entries(
    targetList.reduce((acc, item) => {
      const items = sToA(item.Keep)[0];

      acc[items] = (acc[items] || 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const bio2 = Object.entries(
    targetList.reduce((acc, item) => {
      const items = sToA(item.Keep)[1];

      acc[items] = (acc[items] || 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const bio3 = Object.entries(
    targetList.reduce((acc, item) => {
      const items = sToA(item.Keep)[2];

      acc[items] = (acc[items] || 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const bio4 = Object.entries(
    targetList.reduce((acc, item) => {
      const items = sToA(item.Keep)[3];

      acc[items] = (acc[items] || 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const keeper = [bio1, bio2, bio3, bio4];
  //

  const counts = Object.entries(
    h2AspectOrder.reduce((acc, aspect) => {
      acc[aspect] = targetList.filter((obj) => obj.Aspect === aspect).length;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  return (
    <div>
      <Background />
      <SideNav />
      {/* Start */}
      <div className="min-h-screen my-4 max-w-[1600px] mx-auto p-2 font-[Ale] text-[14px] select-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-2">
          <select
            className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
            value={aspect}
            onChange={(e) => {
              setAspect(e.target.value);
            }}
          >
            <option value={""}>{`All Aspect`}</option>
            {h2AspectOrder.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <select
            className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
            }}
          >
            <option value={""}>{`All Region`}</option>
            <option value={`Surface`}>Surface</option>
            <option value={`Underworld`}>Underworld</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-2 mt-1">
          <select
            className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            <option value={""}>{`Clear Before Selected Min`}</option>
            {Array.from({ length: 67 }).map((_, index) => (
              <option value={index + 1}>{index + 1}</option>
            ))}
          </select>
          <select
            className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
            value={minfear}
            onChange={(e) => {
              setMinFear(e.target.value);
            }}
          >
            <option value={""}>{`Min Fear`}</option>
            {Array.from({ length: 67 }).map((_, index) => (
              <option value={index + 1}>{index + 1}</option>
            ))}
          </select>
          <select
            className="w-full select select-sm rounded-none border-0 focus:outline-none focus:border-transparent text-[13px]"
            value={maxfear}
            onChange={(e) => {
              setMaxFear(e.target.value);
            }}
          >
            <option value={""}>{`Max Fear`}</option>
            {Array.from({ length: 67 }).map((_, index) => (
              <option value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </div>
        {/* Content */}
        <div className="hidden sm:block class">
          <div className="flex gap-2">
            <BarFear data={targetList} title={`Fear Distribution`} />
            <BarTime data={targetList} title={`Time Distribution`} />
          </div>
        </div>
        <div className="flex justify-start gap-2 my-4 px-4 text-[16px] font-[Ale]">
          <span>Full Aspect Distribution</span>
        </div>
        <div className="flex gap-1 overflow-auto p-1 px-2 bg-black/20 border-1 border-white/10">
          {counts.map((arr, index) => {
            return (
              arr[1] > 0 && (
                <div className="min-w-20 p-1 flex flex-col items-center rounded leading-tight">
                  <img src={`/GUI_Card/c${arr[0]}.png`} alt="Aspects" className="w-15 h-auto" draggable="false" />
                  <div className="text-center text-orange-200 text-[10px]">{arr[0]}</div>
                  <div>{arr[1]}</div>
                </div>
              )
            );
          })}
        </div>
        <div className="flex justify-start gap-2 my-4 px-4 text-[16px] font-[Ale]">
          <span>Selection Entries: {targetList.length} Entries</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 my-2 font-[Ale] text-[13px]">
          {keeper.map((arr, index) => (
            <div className="max-h-[450px] overflow-y-scroll rounded p-2 bg-black/20 border-1 border-white/10 relative">
              <div className="text-center font-[Exo] text-[14px]">{`Biome ${index + 1}`}</div>
              {arr.map((arr1, index1) => (
                <div className="grid grid-cols-5 items-center gap-3 hover:bg-[#28282b] p-1">
                  <div className="flex gap-2 items-center col-span-3">
                    {arr1[0] == "undefined" ? (
                      ``
                    ) : (
                      <img
                        src={`/buildgui/${arr1[0]}.png`}
                        alt="Keepsakes"
                        className="size-7"
                        draggable="false"
                        loading="lazy"
                      />
                    )}
                    <div className="text-orange-200">{arr1[0]}</div>
                  </div>
                  <div>{arr1[1] === "undefinded" ? `None` : arr1[1]}</div>
                  <div>{((arr1[1] / targetList.length) * 100).toFixed(2)}%</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 my-2 font-[Ale] text-[14px]">
          {display.map(
            (array, index) =>
              array.length > 0 && (
                <div className="max-h-[500px] overflow-y-scroll rounded p-2 bg-black/20 border-1 border-white/10">
                  {array.map((arr, index) => (
                    <div className="grid grid-cols-5 items-center gap-3 hover:bg-[#28282b]">
                      <div className="flex gap-2 items-center col-span-3">
                        <img
                          src={`/P9/${mainID[arr[0]]}.png`}
                          onError={(e) => {
                            e.target.src = `/buildgui/${sdata[arr[0]]}.png`;
                          }}
                          alt="Boon"
                          className="size-8"
                          draggable="false"
                          loading="lazy"
                        />
                        <div className="text-orange-200">{sdata[arr[0]]}</div>
                      </div>
                      <div>{arr[1]}</div>
                      <div>{((arr[1] / targetList.length) * 100).toFixed(2)}%</div>
                    </div>
                  ))}
                </div>
              ),
          )}
        </div>
      </div>
      {/* End */}
      <Footer />
    </div>
  );
}
