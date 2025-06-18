import Head from "../Comp/Head";
import { p9boons } from "../Data/P9BoonObj";

export default function Tester() {
  return (
    <main className="h-full min-h-lvh select-none relative">
      <div className="fixed w-full h-full bg-[url('/mbg.webp')] -z-10 bg-top"></div>
      <Head />
      <section className="p-4 flex flex-col gap-2">
        {Object.entries(p9boons).map((item) => (
          <div className="flex gap-10">
            <div>{item[1]}</div>
            <img src={`/P9/${item[0]}.png`} alt="Boons" className="size-8" />
          </div>
        ))}
      </section>
    </main>
  );
}
