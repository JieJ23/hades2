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
];

export default function Boons() {
  return (
    <main className="relative">
      <div className="fixed w-full h-full bg-[url('/mbg2.webp')] -z-10 bg-left lg:bg-center bg-cover opacity-20"></div>
      <Head />
      <div className="max-w-[1400px] font-[PT] text-[12px] mx-auto">
        <SideNav />
        <section className="p-2">
          {everything.map((obj, idx) => (
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
                  <div>{item[1]}</div>
                </div>
              ))}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
