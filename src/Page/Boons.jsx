import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";

import {
  p9duo,
  p9arachne,
  p9artemis,
  p9athena,
  p9circe,
  p9dion,
  p9echo,
  p9fusion,
  p9hades,
  p9icarus,
  p9medea,
  p9nar,
  p9hermes,
  p9chaos,
  p9selene,
} from "../Data/P9Boons";

const everything = [
  p9duo,
  p9arachne,
  p9artemis,
  p9athena,
  p9circe,
  p9dion,
  p9echo,
  p9fusion,
  p9hades,
  p9icarus,
  p9medea,
  p9nar,
  p9hermes,
  p9chaos,
  p9selene,
];

const everything_label = [
  `Duo Boons`,
  `Arachne`,
  `Artemis`,
  `Athena`,
  `Circe`,
  `Dion`,
  `Echo`,
  `Infusion`,
  `Hades`,
  `Icarus`,
  `Medea`,
  `Narci`,
  `Hermes`,
  `Chaos`,
  `Selene`,
];
//
export const itemKS = [
  `Silver Wheel`,
  `Knuckle Bones`,
  `Luckier Tooth`,
  `Ghost Onion`,
  `Evil Eye`,
  `Engraved Pin`,
  `Discordant Bell`,
  `Gold Purse`,
  `Metallic Droplet`,
  `White Antler`,
  `Moon Beam`,
  `Cloud Bangle`,
  `Iridescent Fan`,
  `Vivid Sea`,
  `Barley Sheaf`,
  `Purest Hope`,
  `Beautiful Mirror`,
  `Adamant Shard`,
  `Everlasting Ember`,
  `Lion Fang`,
  `Blackened Fleece`,
  `Crystal Figurine`,
  `Silken Sash`,
  `Aromatic Phial`,
  `Concave Stone`,
  `Experimental Hammer`,
  `Transcendent Embryo`,
  `Sword Hilt`,
  `Gorgon Amulet`,
  `Fig Leaf`,
];
//

export default function Boons() {
  return (
    <main className="relative">
      <Background />
      <Head />
      <div className="max-w-[1400px] font-[PT] text-[12px] mx-auto">
        <SideNav />
        <section className="py-4">
          <div className="bg-black/80 rounded p-2 mb-4 border-1 border-white/20">
            <div className="text-[20px] font-[Cinzel]">Keepsakes</div>
            <div className={`flex gap-2 flex-wrap mb-2`}>
              {itemKS.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-1 px-2 rounded bg-[#152253]
                    `}
                >
                  <img draggable={false} src={`/buildgui/${item}.png`} alt="Boons" className="size-10" loading="lazy" />
                  <div>
                    <div>{item}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {everything.map((obj, idx) => (
            <div className="bg-black/80 rounded p-2 mb-4 border-1 border-white/20">
              <div className="text-[20px] font-[Cinzel]">{everything_label[idx]}</div>
              <div className={`flex gap-2 flex-wrap mb-2`}>
                {Object.entries(obj).map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 p-1 px-2 rounded ${
                      idx % 2 == 0 ? `bg-base-300` : `bg-[#152253]`
                    }`}
                  >
                    <img
                      draggable={false}
                      src={`/P9/${item[0]}.png`}
                      alt="Boons"
                      className="size-10 border-1 border-white/20 rounded-xl"
                      loading="lazy"
                    />
                    <div>
                      <div>{item[1]}</div>
                      <div>{item[0]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
