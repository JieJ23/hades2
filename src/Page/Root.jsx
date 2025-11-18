import Background from "../Comp/Background";

import { p9data } from "../Data/P9Data";
import { p11data } from "../Data/P11Data";
import { v1data } from "../Data/V1data";

import { h2AspectOrder, parseTimetoms, sToA, findValue, orderMap, getStatusColor, findStatus } from "../Data/Misc";
import { p9boons } from "../Data/P9BoonObj";
import { Link } from "react-router-dom";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

export default function Root() {
  const { posts, loader } = useData();

  const bundle = [...p9data, ...p11data, ...v1data, ...(posts || [])];
  const fullAspectData = [];

  for (let i = 0; i < h2AspectOrder.length; i++) {
    let aspectArray = bundle.filter((obj) => obj.asp === h2AspectOrder[i]);
    aspectArray = Object.values(
      aspectArray.reduce((acc, item) => {
        if (!acc[item.nam]) acc[item.nam] = item;
        return acc;
      }, {})
    );
    const orderedArray = aspectArray
      .sort((a, b) => {
        const feaDiff = +b.fea - +a.fea;
        if (feaDiff !== 0) return feaDiff;
        return parseTimetoms(a.tim) - parseTimetoms(b.tim);
      })
      .slice(0, 12);
    fullAspectData.push(orderedArray);
  }

  return (
    <main className="h-full min-h-lvh relative overflow-hidden font-[Source] text-[12px]">
      <Background />
      {loader ? (
        <Loading />
      ) : (
        <div className="p-1 flex gap-2 overflow-x-scroll w-full min-h-screen border">
          {fullAspectData.map((holder, index) => (
            <div className="w-full min-w-[250px]">
              <div className="bg-[#00ffaa] text-black text-center text-[14px]">{h2AspectOrder[index]}</div>
              {holder.map((obj, index) => (
                <div key={index} className="p-1 my-0.5 border-1 border-white/10 bg-[#050505] rounded relative">
                  <div
                    className={`absolute right-2 top-2 h-2 w-2 rounded-none ${
                      obj.loc === `Underworld` ? `bg-[#00ffaa]` : `bg-[yellow]`
                    }`}
                  />
                  <div className="flex gap-0.5">
                    <div>
                      {obj.nam} ({obj.fea}) - {obj.tim}
                    </div>
                    {obj.src && (
                      <Link to={obj.src} target="_blank">
                        {obj.src.includes(`twitch`) ? (
                          <img src="/Misc/twitch.png" alt="Twitch" className="size-5" />
                        ) : obj.src.includes(`bilibil`) ? (
                          <img src="/Misc/bilibili.png" alt="Bilibili" className="size-5" />
                        ) : obj.src.includes(`youtu`) ? (
                          <img src="/Misc/youtube.png" alt="Youtube" className="size-5" />
                        ) : (
                          `?`
                        )}
                      </Link>
                    )}
                  </div>
                  <div className="flex">
                    <div className="tooltip shrink-0">
                      <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                        <div className="text-[11px]">{obj.fam}</div>
                      </div>
                      <img
                        draggable={false}
                        src={`/H2Boons/${obj.fam}.png`}
                        alt="Core Boon"
                        className="size-6 rounded-none"
                      />
                    </div>
                    {sToA(obj.cor).map((ite, index) => (
                      <div className="tooltip shrink-0" key={index}>
                        <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                          <div className="text-[11px]">{ite}</div>
                        </div>
                        <img
                          draggable={false}
                          src={`/H2Boons/${ite}.png`}
                          alt="Core Boon"
                          className="size-6 rounded-none"
                        />
                      </div>
                    ))}
                    {obj.ham && (
                      <div className="flex">
                        {findValue(
                          sToA(obj.ham).sort((a, b) => {
                            const aIndex = orderMap.get(a) ?? Infinity;
                            const bIndex = orderMap.get(b) ?? Infinity;
                            return aIndex - bIndex;
                          })
                        ).map((ite, index) => (
                          <div className="tooltip shrink-0">
                            <div className="tooltip-content bg-white text-black font-[Fontin] rounded">
                              <div className="text-[11px]">{p9boons[ite]}</div>
                            </div>
                            <img
                              draggable={false}
                              src={`/P9/${ite}.png`}
                              alt="Core Boon"
                              className="size-6 rounded-none"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 rounded my-1">
                    {findStatus(obj).map((ite) => (
                      <div
                        className="px-1 py-0.5 rounded-none text-black min-w-[40px] text-center font-[Ubuntu] text-[10px]"
                        style={{ backgroundColor: getStatusColor(ite) }}
                      >
                        {ite}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
