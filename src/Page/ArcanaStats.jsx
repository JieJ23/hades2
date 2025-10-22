import Footer from "../Comp/Footer";
import Background from "../Comp/Background";
import Sidebar from "../Comp/Sidebar";

import { deCodeArcana } from "../Data/Misc";
import { idarcana } from "../Data/Arcana1";

import { p9data } from "../Data/P9Data";
import { p11data } from "../Data/P11Data";
import { v1data } from "../Data/V1data";
import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";
import { useState } from "react";

export default function ArcanaStats() {
  const { posts, loader } = useData();
  const [minfear, setMinFear] = useState(1);
  const [maxfear, setMaxFear] = useState(67);

  const availableData = [...p9data, ...p11data, ...v1data, ...(posts || [])].filter(
    (obj) => obj.fea >= +minfear && obj.fea <= +maxfear
  );

  const runs_av = availableData.filter((obj) => obj.arcana);

  const store_arcana = [...new Set(runs_av.map((obj) => deCodeArcana(obj.arcana)))].reduce((acc, entry) => {
    entry.forEach((cor) => {
      acc[cor] = (acc[cor] || 0) + 1;
    });

    return acc;
  }, {});

  const popularArcana = Object.entries(
    runs_av.reduce((acc, val) => {
      const arcanaArry = deCodeArcana(val.arcana);

      acc[arcanaArry] = (acc[arcanaArry] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <>
      <Background />
      <Sidebar />
      {loader ? (
        <Loading />
      ) : (
        <div className="w-full max-w-[1400px] mx-auto font-[Ale] text-[12px] md:text-[13px]">
          <div className="flex gap-1 px-2 justify-center my-4">
            <div>
              <div>Min Fear</div>
              <input
                type="number"
                placeholder="Min Fear"
                className="input input-sm w-[80px]"
                onChange={(e) => setMinFear(e.target.value)}
                value={minfear}
                max={67}
                min={1}
              />
            </div>
            <div>
              <div>Max Fear</div>
              <input
                type="number"
                placeholder="Max Fear"
                className="input input-sm w-[80px]"
                onChange={(e) => setMaxFear(e.target.value)}
                value={maxfear}
                max={67}
                min={1}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center gap-1 md:gap-2 my-4 px-2">
            {popularArcana.map((obj, ind1) => (
              <div>
                <div className="text-center text-[16px]">
                  Set {ind1 + 1} ({obj[1]})
                </div>
                <div
                  className={`grid grid-cols-5 w-full max-w-[350px] mx-auto rounded`}
                  style={{
                    borderStyle: "solid", // Required
                    borderWidth: "6px",
                    borderImage: "url('/Misc/frame.webp') 40 stretch",
                  }}
                >
                  {Array.from({ length: 25 }, (_, i) => {
                    const cardId = `c${i + 1}`;
                    const selection = popularArcana[ind1][0];
                    return (
                      <img
                        key={cardId}
                        src={`${selection.includes(cardId) ? `/Arcane/${cardId}.png` : `/Arcane/c0.png`}`}
                        className="w-full"
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 px-2 my-4">
            {Object.entries(store_arcana)
              .sort((a, b) => +a[0].slice(1) - +b[0].slice(1))
              .map(([key, val], index) => (
                <div
                  className="flex items-center gap-2 bg-gradient-to-r from-black to-black/75 rounded"
                  key={index}
                  style={{
                    borderStyle: "solid", // Required
                    borderWidth: "6px",
                    borderImage: "url('/Misc/frame.webp') 40 stretch",
                  }}
                >
                  <img src={`/Arcane/${key}.png`} alt="Arcana Cards" className="w-[60px] md:w-[80px] h-auto" />
                  <div>
                    <div className="text-[15px]">{idarcana[key]}</div>
                    <div>{((+val / +runs_av.length) * 100).toFixed(2)}%</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
