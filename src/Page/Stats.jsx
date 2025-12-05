import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import { h2AspectOrder, parseTimetoms } from "../Data/Misc";
import { bundleData } from "../Data/DataBundle";

import { Link } from "react-router-dom";

import { useData } from "../Hook/DataFetch";
import Loading from "../Hook/Loading";

import { useMemo } from "react";

const otherStats = [
  { link: `StatsCodex`, nam: `Boon Stats` },
  { link: `KeepsakesStats`, nam: `KS Stats` },
  { link: `ArcanaStats`, nam: `Arcana Stats` },
  { link: `VowsStats`, nam: `Vow Stats` },
];

export default function Stats() {
  const { posts, loader } = useData();
  const orderData = [...bundleData, ...posts].sort((a, b) => {
    const feaDiff = +b.fea - +a.fea;
    if (feaDiff !== 0) return feaDiff;
    return parseTimetoms(a.tim) - parseTimetoms(b.tim);
  });

  const aspectTotalCount = useMemo(() => {
    return h2AspectOrder.map((orderAsp) => orderData.filter((asp) => asp.asp === orderAsp));
  }, []);

  const aspectDetails = [];

  for (let i = 0; i < h2AspectOrder.length; i++) {
    let arrObj = {};
    const arrUnderworld = aspectTotalCount[i].filter((obj) => obj.loc === `Underworld`);
    const arrSurface = aspectTotalCount[i].filter((obj) => obj.loc === `Surface`);
    arrObj.entries_uw = arrUnderworld.length;
    arrObj.entries_s = arrSurface.length;
    arrObj.numPlayers_uw = [...new Set(arrUnderworld.map((obj) => obj.nam))].length;
    arrObj.numPlayers_s = [...new Set(arrSurface.map((obj) => obj.nam))].length;
    arrObj.uw_leader = arrUnderworld[0].nam;
    arrObj.s_leader = arrSurface[0].nam;
    aspectDetails.push(arrObj);
  }

  return (
    <div className="h-full min-h-lvh relative overflow-hidden text-[13px] md:text-[14px] font-[Ale] select-none">
      <Background />
      <SideNav />
      {/* Table */}
      {loader ? (
        <Loading />
      ) : (
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="flex justify-center gap-2">
            {otherStats.map((obj, index) => (
              <Link to={`/${obj.link}`} className="bg-white text-black px-2 py-0.5 rounded">
                <div>{obj.nam}</div>
              </Link>
            ))}
          </div>
          <div className="overflow-x-scroll my-4">
            <table className="table whitespace-nowrap table-xs table-zebra font-[Ubuntu] bg-black/50 border-separate border-spacing-0.5">
              <thead className="font-[Ale]">
                <tr>
                  <th>Aspect</th>
                  <th>Total Entries</th>
                  <th>UW Leader</th>
                  <th>UW Player</th>
                  <th>UW Entries</th>
                  <th>Surface Leader</th>
                  <th>Surface Player</th>
                  <th>Surface Entries</th>
                </tr>
              </thead>
              <tbody>
                {h2AspectOrder.map((ite, index) => (
                  <tr>
                    <td>{ite}</td>
                    <td>{aspectTotalCount[index].length}</td>
                    <td className="text-[#00ffaa]">{aspectDetails[index].uw_leader}</td>
                    <td>{aspectDetails[index].numPlayers_uw}</td>

                    <td className="flex justify-between gap-1 items-center">
                      <div>{aspectDetails[index].entries_uw}</div>
                      <progress
                        className="progress w-40 progress-success"
                        value={Math.floor(
                          (aspectDetails[index].entries_uw /
                            (aspectDetails[index].entries_uw + aspectDetails[index].entries_s)) *
                            100
                        )}
                        max="100"
                      />
                      <div>
                        {Math.floor(
                          (aspectDetails[index].entries_uw /
                            (aspectDetails[index].entries_uw + aspectDetails[index].entries_s)) *
                            100
                        )}
                        %
                      </div>
                    </td>
                    <td className="text-[yellow]">{aspectDetails[index].s_leader}</td>
                    <td>{aspectDetails[index].numPlayers_s}</td>

                    <td className="flex justify-between gap-1 items-center">
                      <div>{aspectDetails[index].entries_s}</div>
                      <progress
                        className="progress w-40 progress-warning"
                        value={Math.floor(
                          (aspectDetails[index].entries_s /
                            (aspectDetails[index].entries_uw + aspectDetails[index].entries_s)) *
                            100
                        )}
                        max="100"
                      />
                      <div>
                        {Math.floor(
                          (aspectDetails[index].entries_s /
                            (aspectDetails[index].entries_uw + aspectDetails[index].entries_s)) *
                            100
                        )}
                        %
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
