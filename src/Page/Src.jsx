import { use } from "react";
import PageBlock from "../Block/PageBlock";
import Loading from "../Hook/Loading";
import { useSrcData } from "../Hook/SrcFetch";
import { useState, useMemo } from "react";

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
export default function Src() {
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

      // keep the run with the lower (better) time if we haven't seen this player yet,
      // or if this run is faster than the one we've already stored
      if (!existing || currentTime < existingTime) {
        acc[itemAspect][playerId] = item;
      }

      return acc;
    }, {});

    // convert per-player objects into arrays
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2 text-[13px] font-[Ale]">
            {sortedAspects.map((arr, oi) => (
              <div className={`rounded-sm px-2 py-1 relative bg-linear-to-b from-black to-[#0e0c12]/80`}>
                <div className="text-center font-[Sr] text-white">{defineAspect[runsByAspect[oi][0]]}</div>
                <div className="w-full h-30 border border-white/10 p-1 rounded relative" key={oi}>
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
                  <div className="grid grid-cols-4 relative text-gray-300 items-center" key={index}>
                    <div>
                      {index + 1} / {obj.place}
                    </div>
                    <div>{postSrc.data.players.data[obj.place - 1].names.international}</div>
                    <div className="text-end">{postSrc.data.players.data[obj.place - 1].location?.country?.code}</div>
                    {/* <div className="text-end">{obj.run.players[0].id}</div> */}
                    {/* <div className="text-end">{obj.run.times.primary_t}</div> */}
                    <div className="text-end">{parsesectoTime(obj.run.times.primary_t)}</div>
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
