import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { w_staff, w_blades, w_axe, w_flames, w_coat, w_skull } from "../Data/Item";
import { useState, useEffect } from "react";

const fullWeaponHammers = [w_staff, w_blades, w_axe, w_flames, w_skull, w_coat];

const getTierBackground = (tier) => {
  switch (tier) {
    case "S":
      return "bg-gradient-to-b from-[#bd03ec88] to-[#bd03ec11]";
    case "A":
      return "bg-gradient-to-b from-[#ec9a0388] to-[#ec9a0311]";
    case "B":
      return "bg-gradient-to-b from-[#039aec88] to-[#039aec11]";
    case "C":
      return "bg-gradient-to-b from-[#03ec7f88] to-[#03ec7f11]";
    default:
      return "";
  }
};

export default function Hammer() {
  // Flatten the array to get total items count
  const totalItems = fullWeaponHammers.flat().length;
  const [tiers, setTiers] = useState(Array(totalItems).fill(""));

  const [isCopied, setIsCopied] = useState(false);
  const [shareableURL, setShareableURL] = useState(""); // State to store the shareable URL

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const base64Tiers = searchParams.get("tiers");

    if (base64Tiers) {
      try {
        const decodedTier = JSON.parse(atob(base64Tiers)); // Decode the Base64
        setTiers(decodedTier);
        window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
        return;
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    const stored = localStorage.getItem("myTier");
    if (stored) {
      setTiers(JSON.parse(stored));
    }
  }, []);

  const handleTierChange = (index, value) => {
    const updatedTiers = [...tiers];
    updatedTiers[index] = value;
    localStorage.setItem("myTier", JSON.stringify(updatedTiers));
    setTiers(updatedTiers);
  };

  const generateShareableURL = () => {
    const base64Tier = btoa(JSON.stringify(tiers));
    const newURL = `${window.location.origin}/Hammer/?tiers=${base64Tier}`;
    setShareableURL(newURL);
  };

  const copyURLToClipboard = () => {
    navigator.clipboard.writeText(shareableURL).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    });
  };

  let globalIndex = 0;

  return (
    <main className="relative select-none">
      <div className="fixed w-full h-full bg-[url('/mbg.webp')] -z-10 bg-top"></div>
      <Head />
      <div className="flex flex-col md:flex-row gap-2 max-w-[1400px] mx-auto">
        <SideNav />
        <section className="p-2 py-10 font-[PT] text-[14px] rounded">
          <section className="p-2">
            <div className="flex flex-wrap gap-1">
              <button className="btn btn-sm btn-soft btn-info rounded-sm font-[PT]" onClick={generateShareableURL}>
                Generate URL
              </button>
              <button className="btn btn-sm btn-soft btn-info rounded-sm font-[PT]" onClick={copyURLToClipboard}>
                {isCopied ? "Copied!" : "Copy URL"}
              </button>
              <button
                className="btn btn-sm btn-soft btn-error rounded-sm font-[PT]"
                onClick={() => {
                  setTiers(Array(totalItems).fill(""));
                  localStorage.setItem("myTier", JSON.stringify(Array(totalItems).fill("")));
                }}
              >
                Reset Selection
              </button>
            </div>
            <div className="max-w-[1000px] bg-base-300 overflow-hidden p-2 truncate text-[13px] text-white rounded-md font-[PT] mt-2">
              {shareableURL || "No URL Generated Yet"}
            </div>
          </section>
          {fullWeaponHammers.map((obj, ind) => (
            <div
              className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1"
              key={ind}
            >
              {obj.map((item, index) => {
                const currentIndex = globalIndex++;
                return (
                  <div
                    className={`w-full border-1 border-white/20 overflow-hidden rounded flex flex-col items-center my-1 p-1 md:p-2 ${getTierBackground(
                      tiers[currentIndex]
                    )}`}
                    key={index}
                  >
                    <div className="avatar">
                      <div className="w-10 md:w-12 rounded">
                        <img src={`/Hammer/${item}.png`} alt="Hammer" draggable={false} />
                      </div>
                    </div>
                    <div className="text-center text-[11px] line-clamp-2 pb-0.5 h-[34px]">{item}</div>
                    <div className="flex gap-0.5">
                      <select
                        value={tiers[currentIndex]}
                        onChange={(e) => handleTierChange(currentIndex, e.target.value)}
                        className={`select bg-transparent text-[10px] pl-2 py-2`}
                      >
                        <option value="">Tier</option>
                        <option value="S">S</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
