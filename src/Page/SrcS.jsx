import { useState, useMemo, useEffect } from "react";
import PageBlock from "../Block/PageBlock";
import Loading from "../Hook/Loading";

import { ComposedChart, Line, Bar, YAxis } from "recharts";

import { parsesectoTime } from "../Data/Misc";

//
const defineAspect = {
  lr37e0ml: "Melinoe Staff",
  "1dkdjy5l": "Circe Staff",
  q8kzx03q: "Momus Staff",
  qvvwznwq: "Anubis Staff",
  qyz4vy21: "Melinoe Blades",
  ln8340jl: "Artemis Blades",
  "10v7om2l": "Pan Blades",
  le2gvwzl: "Morrigan Blades",
  qj7d643q: "Melinoe Flames",
  q6579xjl: "Moros Flames",
  lmonr4m1: "Eos Flames",
  q5ve70nl: "Supay Flames",
  "1w48v5vq": "Melinoe Axe",
  qoxn8rxq: "Charon Axe",
  "139ro5x1": "Thanatos Axe",
  lx5wdjr1: "Nergal Axe ",
  qvvdke6q: "Melinoe Skull",
  le286mkl: "Medea Skull",
  q5v89g2l: "Persephone Skull",
  "14oe4njq": "Hel Skull",
  "1dky0opl": "Melinoe Coat",
  q8k0yryq: "Selene Coat",
  qyzy0861: "Nyx Coat",
  "192gdwkq": "Shiva Coat",
};
const allAspectsId = Object.keys(defineAspect);
const aspectPropertyId = "2lge1eq8";

//
// --- Data fetching (merged from SrcFetch.jsx) ---
// Since there is only a single consumer of this data (the Src component below),
// the React Context / Provider layer from SrcFetch.jsx has been simplified into
// a plain custom hook. If you need to share this data across multiple components
// again in the future, wrap this logic back in a Context.Provider.
function useSrcData() {
  const [postSrc, setPostSrc] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const cached = localStorage.getItem("speedrunS");
        const cacheTimestamp = localStorage.getItem("speedrun_timestampS");
        const oneDayInMs = 2 * 30 * 60 * 1000; // 30 minutes in milliseconds > 1 hours

        if (cached && cacheTimestamp) {
          const age = Date.now() - parseInt(cacheTimestamp);
          if (age < oneDayInMs) {
            setPostSrc(JSON.parse(cached));
            setLoader(false);
            return; // Use cached data
          }
        }
        const response = await fetch(
          `https://www.speedrun.com/api/v1/leaderboards/3dxy5vv6/category/wk6yjved?var-789vdvqn=qznpgg8q&var-68k17yzl=ln8345nl&embed=players`,
        );
        const posts = await response.json();
        setPostSrc(posts);
        // Save with timestamp
        localStorage.setItem("speedrunS", JSON.stringify(posts));
        localStorage.setItem("speedrun_timestampS", Date.now().toString());

        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
      }
    }

    load();
  }, []);

  return { postSrc, loader };
}

//
// --- Component (from Src.jsx) ---
export default function SrcS() {
  const { postSrc, loader } = useSrcData();

  const allRunsData = useMemo(() => {
    return postSrc?.data?.runs ?? [];
  }, [postSrc]);

  const runsByAspect = useMemo(() => {
    const grouped = allRunsData.reduce((acc, item) => {
      const itemAspect = item.run.values["2lge1eq8"];
      if (!acc[itemAspect]) acc[itemAspect] = {};

      const playerId = item.run.players?.[0]?.id;
      if (!playerId) return acc;

      const existing = acc[itemAspect][playerId];
      const currentTime = item.run.times?.primary_t;
      const existingTime = existing?.run.times?.primary_t;
      if (!existing || currentTime < existingTime) {
        acc[itemAspect][playerId] = item;
      }

      return acc;
    }, {});

    const cleaned = Object.fromEntries(
      Object.entries(grouped).map(([aspect, byPlayer]) => [aspect, Object.values(byPlayer)]),
    );

    return Object.entries(cleaned);
  }, [allRunsData]);

  const sortedAspects = runsByAspect.sort((a, b) => allAspectsId.indexOf(a[0]) - allAspectsId.indexOf(b[0]));

  return (
    <PageBlock>
      <div>
        {loader ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2 text-[13px] font-[Ale] py-8">
            {sortedAspects.map((arr, oi) => (
              <div className={`rounded-sm px-2 py-1 relative bg-linear-to-b from-black to-[#0e0c12]/80`} key={arr[0]}>
                <div className="text-center font-[Sr] flex justify-center gap-1 items-center">
                  <img src="/Surface.png" alt="Surface" className="size-7" />

                  {defineAspect[runsByAspect[oi][0]]}
                </div>
                <div className="w-full h-30 border border-white/10 p-1 rounded relative">
                  <div className="absolute bottom-0 right-1 font-[UbuntuMono] uppercase">Time</div>
                  <ComposedChart
                    style={{ width: "100%", maxHeight: "100px", aspectRatio: 1.618 }}
                    responsive
                    data={runsByAspect[oi][1].slice(0, 10)}
                  >
                    <YAxis yAxisId="left" hide />
                    <YAxis yAxisId="right" orientation="right" hide />
                    <Bar dataKey="run.times.primary_t" yAxisId="left" fill="#28282b" radius={5} />
                    <Line type="monotone" yAxisId="right" dataKey="run.times.primary_t" stroke="#fff" />
                  </ComposedChart>
                </div>
                {arr[1].slice(0, 10).map((obj, index) => (
                  <div className={` grid grid-cols-3 relative text-gray-300 items-center`} key={index}>
                    <div className={`${obj.run.times.primary_t < 300 && `text-yellow-300`}`}>
                      {index + 1}. {postSrc.data.players.data[obj.place - 1].names.international}
                    </div>
                    <div className="text-end text-white">
                      {postSrc.data.players.data[obj.place - 1].location?.country?.code}
                    </div>
                    {/* <div className="text-end">{obj.run.players[0].id}</div> */}
                    {/* <div className="text-end">{obj.run.times.primary_t}</div> */}
                    <div className={`text-end`}>{parsesectoTime(obj.run.times.primary_t)}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </PageBlock>
  );
}
