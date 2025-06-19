import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";

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

export default function Boons() {
  return (
    <main className="relative">
      <div className="fixed w-full h-full bg-[url('/mbg2.webp')] -z-10 bg-left lg:bg-center bg-cover opacity-20"></div>
      <div className="fixed w-full h-full bg-[url('/mbg3.webp')] -z-10 bg-center bg-cover opacity-40"></div>
      <Head />
      <div className="max-w-[1400px] font-[PT] text-[12px] mx-auto">
        <SideNav />
        <section className="py-4">
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
