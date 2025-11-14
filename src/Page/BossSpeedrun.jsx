import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { parsesectoTime, aspectsFinder, traitAspect } from "../Data/Misc";

import { useState, useEffect } from "react";
import Loading from "../Hook/Loading";

export const BossSpeedrun = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          `https://script.google.com/macros/s/AKfycbzedKfMhWQu9CpJw6Z4b9PM5xiLg7C2bC2reyA4CUeqe3QKk6ZE3rayQe9NDJN-K3nz/exec`
        );
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    load();
  }, []);

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1200px] font-[Ale] text-[14px] mx-auto px-1">
        <SideNav />
        {posts.length == 0 ? (
          <Loading />
        ) : (
          <div className="my-4">
            {posts.map((obj) => (
              <div
                className="border bg-black rounded mb-2"
                style={{
                  borderStyle: "solid",
                  borderWidth: "5px",
                  borderImage: "url('/Misc/frame.webp') 40 stretch",
                }}
              >
                <div className="text-center my-1 text-[16px]">
                  <div>
                    {obj.nam} | {aspectsFinder(obj.aspect)} | {parsesectoTime(obj.bio4)}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 my-2 px-2 text-gray-300">
                  {(() => {
                    const boss = obj.boss.split(",");
                    return (
                      <>
                        <div className="border border-white/20 p-2 rounded-sm">
                          <div>Biome 1 | {boss[0].replace("Boss", "")}</div>
                          <div>Total: {parsesectoTime(obj.bio1)}</div>
                          <div>Boss: {parsesectoTime(obj.gp1)}</div>
                        </div>
                        <div className="border border-white/20 p-2 rounded-sm">
                          <div>Biome 2 | {boss[1].replace("Boss", "")}</div>
                          <div>Total: {parsesectoTime(obj.bio2 - obj.bio1)}</div>
                          <div>Boss: {parsesectoTime(obj.gp2)}</div>
                        </div>
                        <div className="border border-white/20 p-2 rounded-sm">
                          <div>Biome 3 | {boss[2].replace("Boss", "")}</div>
                          <div>Total: {parsesectoTime(obj.bio3 - obj.bio2)}</div>
                          <div>Boss: {parsesectoTime(obj.gp3)}</div>
                        </div>
                        <div className="border border-white/20 p-2 rounded-sm">
                          <div>Biome 4 | {boss[3].replace("Boss", "")}</div>
                          <div>Total: {parsesectoTime(obj.bio4 - obj.bio3)}</div>
                          <div>Boss: {parsesectoTime(obj.gp4)}</div>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <div className="px-2 my-2 font-[Ubuntu] text-gray-300 text-[12px]">
                  {(() => {
                    const highestGiven = obj.herot3.split(",");
                    const highestGivenNum = obj.herot3num.split("/");
                    const highestGivenPercent = highestGivenNum.map((num) => Math.floor((+num / +obj.herototal) * 100));
                    const highestTaken = obj.enemyt3.split(",");
                    const highestTakenNum = obj.enemyt3num.split("/");
                    const highestTakenPercent = highestTakenNum.map((num) =>
                      Math.floor((+num / +obj.enemytotal) * 100)
                    );

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-2 my-2">
                        <div className="w-full">
                          <div className="text-center">
                            Damage Given: {obj.herototal.toLocaleString("en-US")} / Top 3,
                          </div>
                          <div>
                            {highestGiven.map((ite, index) => (
                              <>
                                <div>
                                  {ite}: {(+highestGivenNum[index]).toLocaleString("en-US")} (
                                  {highestGivenPercent[index]}
                                  %)
                                </div>
                                <progress
                                  className="progress progress-primary"
                                  value={highestGivenPercent[index]}
                                  max="100"
                                ></progress>
                              </>
                            ))}
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="text-center">
                            Damage Taken: {obj.enemytotal.toLocaleString("en-US")} / Top 3,
                          </div>
                          <div>
                            {highestTaken.map((ite, index) => (
                              <>
                                <div>
                                  {ite}: {(+highestTakenNum[index]).toLocaleString("en-US")} (
                                  {highestTakenPercent[index]})%
                                </div>
                                <progress
                                  className="progress progress-error"
                                  value={highestTakenPercent[index]}
                                  max="100"
                                ></progress>
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
