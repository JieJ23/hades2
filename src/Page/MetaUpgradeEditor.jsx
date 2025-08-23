import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import { useState, useEffect } from "react";
import Footer from "../Comp/Footer";
import { baseLua } from "../Data/BaseLua";
import { baseShrines, shrineObj, vowDes, shrineID, idShrine, shrineInfo } from "./Shrine";

export function updateRanks(luaText, updates) {
  let updatedLua = luaText;

  updates.forEach(({ objectName, points, changeValues }) => {
    const objectStart = updatedLua.indexOf(objectName + " =");
    if (objectStart === -1) return;

    const ranksIndex = updatedLua.indexOf("Ranks =", objectStart);
    if (ranksIndex === -1) return;

    const startBrace = updatedLua.indexOf("{", ranksIndex);
    let braceCount = 1;
    let i = startBrace + 1;
    while (i < updatedLua.length && braceCount > 0) {
      if (updatedLua[i] === "{") braceCount++;
      else if (updatedLua[i] === "}") braceCount--;
      i++;
    }
    const endBrace = i;

    const newRows = points.map((p, idx) => `      { Points = ${p}, ChangeValue = ${changeValues[idx]} }`);
    const newRanksBlock = "\n" + newRows.join(",\n") + "\n    ";

    // Replace the old Ranks block
    updatedLua = updatedLua.slice(0, startBrace + 1) + newRanksBlock + updatedLua.slice(endBrace - 1);
  });

  return updatedLua;
}

export default function MetaUpgradeEditor() {
  const [shop, setShop] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [shareableURL, setShareableURL] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const base64Shop = searchParams.get("shop");

    if (base64Shop) {
      try {
        const decodedShop = JSON.parse(atob(base64Shop)); // Decode the Base64
        setShop(decodedShop);
        window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
        return;
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
  }, []);
  const generateShareableURL = () => {
    const base64Shop = btoa(JSON.stringify(shop));
    const newURL = `${window.location.origin}/MetaUpgradeEditor/?shop=${base64Shop}`;
    setShareableURL(newURL);
  };

  const copyURLToClipboard = () => {
    navigator.clipboard.writeText(shareableURL).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    });
  };

  const handleDownload = () => {
    const decodedShop = shop.map((item) => ({
      ...item,
      objectName: idShrine[item.objectName], // convert number → string
    }));
    const updatedLua = updateRanks(baseLua, decodedShop);

    const blob = new Blob([updatedLua], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "MetaUpgradeData.lua";
    link.click();
  };

  return (
    <div className="relative">
      <Background />
      <div className="max-w-[1400px] font-[Source] text-[11px] md:text-[12px] mx-auto text-white select-none px-1">
        <SideNav />
        <section className="">
          <div className="flex flex-wrap gap-1">
            <button
              className="bg-white cursor-pointer text-black rounded px-2 py-1 font-[Source] text-[11px]"
              onClick={generateShareableURL}
            >
              Generate URL
            </button>
            <button
              className="bg-white cursor-pointer text-black rounded px-2 py-1 font-[Source] text-[11px]"
              onClick={copyURLToClipboard}
            >
              {isCopied ? "Copied!" : "Copy URL"}
            </button>
            <button
              className="bg-white cursor-pointer text-black rounded px-2 py-1 font-[Source] text-[11px]"
              onClick={() => {
                setShop([]);
              }}
            >
              Reset Selection
            </button>
          </div>
          <div className="w-full max-w-[1000px] bg-[#28282b98] text-white overflow-hidden p-2 truncate text-[12px] rounded my-2">
            {shareableURL || "No URL Generated Yet"}
          </div>
        </section>
        <div className="grid grid-cols-4 text-[12px] gap-1 my-2 w-full max-w-[500px]">
          {baseShrines.map((ite, index) => (
            <div
              className="px-2 py-1 bg-[#131111d1] text-white rounded cursor-pointer flex flex-col border-1 border-white/10"
              key={index}
              onClick={() => {
                setShop((prev) => {
                  if (prev.some((item) => item.objectName === shrineID[ite])) {
                    return prev;
                  }
                  return [...prev, { objectName: shrineID[ite] }];
                });
              }}
            >
              <img src={`/Vows/${shrineObj[ite]}.png`} alt="Vows" className="size-8" />
              <span className="text-[orange]">{shrineObj[ite]}</span>
              <span className="line-clamp-1">{ite}</span>
            </div>
          ))}
        </div>
        {/* Start  */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-black my-4">
          {shop &&
            shop.map((obj, index) => (
              <div
                key={index}
                className={`flex flex-col just rounded px-2 py-1
            ${
              (shop[index].points ? shop[index].points.length : 0) ===
              (shop[index].changeValues ? shop[index].changeValues.length : 0)
                ? `bg-[#00ffaa]`
                : `bg-[#f16f0b]`
            }
            `}
              >
                <div className="flex justify-between items-center">
                  <div>
                    {shrineObj[idShrine[obj["objectName"]]]} {shop[index].points ? shop[index].points.length : 0}|
                    {shop[index].changeValues ? shop[index].changeValues.length : 0}
                  </div>
                  <img
                    draggable={false}
                    src={`/Vows/${shrineObj[idShrine[obj["objectName"]]]}.png`}
                    alt="Vows"
                    className="size-8 hover:scale-[90%] cursor-pointer duration-100 ease-in transition-transform"
                    onClick={() => {
                      setShop((prev) => prev.filter((item) => item.objectName !== obj["objectName"]));
                    }}
                  />
                </div>
                <div>*{shrineInfo[idShrine[obj["objectName"]]]}</div>
                <div className="line-clamp-1">{[idShrine[obj["objectName"]]]}</div>
                <div className="line-clamp-2 h-[36px] text-[12px]">
                  {vowDes[shrineObj[idShrine[obj["objectName"]]]]}
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-1">
                  <input
                    type="text"
                    placeholder="Fear"
                    className="input input-sm rounded-sm text-white my-1"
                    onChange={(e) =>
                      setShop((prev) =>
                        prev.map((item, i) => (i === index ? { ...item, points: e.target.value.split(",") } : item))
                      )
                    }
                  />
                  <input
                    type="text"
                    placeholder="Effect"
                    className="input input-sm rounded-sm text-white my-1"
                    onChange={(e) =>
                      setShop((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, changeValues: e.target.value.split(",") } : item
                        )
                      )
                    }
                  />
                </div>
                <div>Max Fear: {obj["points"] ? obj["points"].reduce((a, b) => a + +b, 0) : 0}</div>
                {obj["points"] && (
                  <div>
                    {obj["points"].map((ite, index) => (
                      <div key={index}>
                        Rank {index + 1}: {ite} Fear /{" "}
                        {obj["changeValues"] ? `${obj["changeValues"][index]} Value` : `N/A`}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
        {/* End  */}
        <div className="flex gap-2">
          <button className="bg-[white] px-2 py-1 rounded text-black cursor-pointer" onClick={handleDownload}>
            Download Updated Lua
          </button>
          <button className="bg-[white] px-2 py-1 rounded text-black cursor-pointer">
            <a href="/BaseMeta.lua" download="MetaUpgradeData.lua">
              Download Original Lua
            </a>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
