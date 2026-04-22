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
//
import {
  pos,
  apo,
  aph,
  dem,
  hes,
  hep,
  are,
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
} from "../Data/Group";
//
export default function GameStats() {
  const [aspect, setAspect] = useState("");
  const [region, setRegion] = useState("");

  const targetList = assets.filter(
    (obj) => (!aspect || aspect === "" || obj.Aspect === aspect) && (!region || obj.Region === region),
  );

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
    { key: "posItems", obj: pos },
    { key: "apoItems", obj: apo },
    { key: "aphItems", obj: aph },
    { key: "demItems", obj: dem },
    { key: "hesItems", obj: hes },
    { key: "hepItems", obj: hep },
    { key: "areItems", obj: are },
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
    posItems,
    apoItems,
    aphItems,
    demItems,
    hesItems,
    hepItems,
    areItems,
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
    posItems,
    apoItems,
    aphItems,
    demItems,
    hesItems,
    hepItems,
    areItems,
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
  ];
  // Testing

  // const en = targetList[0].Time;
  // console.log(parseTimetoms(en));

  return (
    <div>
      <Background />
      <SideNav />
      {/* Start */}
      <div className="min-h-screen my-4 max-w-[1600px] mx-auto p-2 font-[Ale] text-[14px]">
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
        {/* Content */}
        <div className="flex justify-start gap-2 my-4 px-4 text-[16px] font-[Ale]">
          <span>Data from: {targetList.length} Entries</span>
        </div>
        <div className="h-[500px] flex flex-wrap justify-center overflow-y-scroll gap-2 rounded p-1 bg-black/60 border-1 border-white/10">
          {metaUpgradeItems.map((arr, index) => (
            <div className="flex flex-col items-center hover:bg-black hover:text-white leading-tight">
              {/* <div>{arr[0]}</div> */}
              <img
                src={`/Arcane/${arcanaid[sdata[arr[0]]]}.png`}
                alt="Arcana"
                className="w-25 h-auto"
                draggable="false"
              />
              <div className="text-orange-200">{sdata[arr[0]]}</div>
              <div>{arr[1]}</div>
              <div>{((arr[1] / targetList.length) * 100).toFixed(2)}%</div>
              <div>{arcanaid[arr[1]]}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 my-2 font-[Ale] text-[14px]">
          {display.map(
            (array, index) =>
              array.length > 0 && (
                <div className="h-[500px] overflow-y-scroll rounded p-2 bg-black/60 border-1 border-white/10">
                  {array.map((arr, index) => (
                    <div className="flex items-center gap-3 hover:bg-[#00ffaa] hover:text-black">
                      {/* <div>{arr[0]}</div> */}
                      <img
                        src={`/P9/${mainID[arr[0]]}.png`}
                        onError={(e) => {
                          e.target.src = `/buildgui/${sdata[arr[0]]}.png`;
                        }}
                        alt="Boon"
                        className="size-8"
                        draggable="false"
                      />
                      <div className="text-orange-200">{sdata[arr[0]]}</div>
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
