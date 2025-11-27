import Footer from "../Comp/Footer";
import Background from "../Comp/Background";
import Sidebar from "../Comp/Sidebar";

import { bundleData } from "../Data/DataBundle";

import { deCodeVow, vowMatch, oathMatch, sToA } from "../Data/Misc";
import { idvow } from "../Data/Vow1";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";
import { useState } from "react";

export default function VowsStats() {
  const { posts, loader } = useData();
  const [minfear, setMinFear] = useState(1);
  const [maxfear, setMaxFear] = useState(67);

  const availableData = [...bundleData, ...(posts || [])].filter((obj) => +obj.fea >= +minfear && +obj.fea <= +maxfear);

  const runs_av = availableData.filter((obj) => obj.oath);
  const oathArray = [...new Set(runs_av.map((obj) => deCodeVow(obj.oath)))];

  const store_oath = oathArray[0]
    ? oathArray[0].map((_, colIndex) => {
        const counts = {};
        for (const row of oathArray) {
          const val = row[colIndex];
          counts[val] = (counts[val] || 0) + 1;
        }
        return counts;
      })
    : [];

  //

  const popularVows = Object.entries(
    runs_av.reduce((acc, val) => {
      const oathArry = deCodeVow(val.oath);

      acc[oathArry] = (acc[oathArry] || 0) + 1;
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
        <div className="my-4 w-full max-w-[1400px] mx-auto font-[Ale] text-[12px] md:text-[13px]">
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
          {popularVows && (
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center">
              {popularVows.map((obj, ind1) => (
                <div className="my-4 w-full mx-auto max-w-[450px]">
                  <div className="text-center text-[16px]">
                    Set: {sToA(obj[0]).reduce((acc, val) => acc + +val, 0)} ({obj[1]})
                  </div>
                  <div
                    className="grid grid-cols-4 gap-1 bg-black"
                    style={{
                      borderStyle: "solid", // Required
                      borderWidth: "6px",
                      borderImage: "url('/Misc/frame.webp') 40 stretch",
                    }}
                  >
                    {sToA(obj[0]).map((ite, index) => (
                      <div
                        className={`bg-black rounded p-1 py-2 flex gap-1 items-center ${
                          index === 16 && `col-start-2 col-span-2`
                        }`}
                        key={index}
                      >
                        <img src={`/Vows/${vowMatch[index]}.png`} alt="Vows" className="size-7 md:size-8" />
                        <div className="flex flex-col gap-0.5">
                          <div>{vowMatch[index]}</div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: oathMatch[index].length - 1 }, (_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i <= oathMatch[index].indexOf(+ite) - 1 ? "bg-[#00ffaa]" : "bg-black"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {store_oath && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-2 my-4 max-w-[1200px] mx-auto">
              {Object.entries(store_oath).map(([key, value], index1) => (
                <div
                  className={`flex items-start gap-2 bg-gradient-to-r from-black to-black/75 rounded p-2 py-4 w-full ${
                    index1 === 16 && `lg:col-start-2 lg:col-span-2`
                  }`}
                  style={{
                    borderStyle: "solid", // Required
                    borderWidth: "6px",
                    borderImage: "url('/Misc/frame.webp') 40 stretch",
                  }}
                >
                  <img src={`/Vows/${idvow[+key + 1]}.png`} alt="Vows" className="size-10" />
                  <div className="w-full px-1">
                    <div className="text-[15px]">{idvow[+key + 1]}</div>
                    <div>
                      {Object.entries(value).map(([key2, val2]) => (
                        <div className="flex gap-4">
                          <div>
                            {key2} <span className="text-[#cc4aff]">Fear</span>
                          </div>
                          <div className="flex gap-1">
                            <div>{((val2 / oathArray.length) * 100).toFixed(2)}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  );
}
