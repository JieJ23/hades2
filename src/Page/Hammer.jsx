import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { useState, useEffect } from "react";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

import { hammer_staff, hammer_axe, hammer_blades, hammer_skull, hammer_flames, hammer_suit } from "../Data/P9Boons";

const fullhammers = [hammer_staff, hammer_axe, hammer_blades, hammer_skull, hammer_flames, hammer_suit];

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
  const totalItems = fullhammers.flat().length;
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
    <main className="relative">
      <Background />
      <Head />
      <div className="max-w-[1400px] font-[PT] text-[14px] mx-auto">
        <SideNav />
        <section className="w-full px-2 font-[PT] text-[14px] rounded">
          <section className="p-2">
            <div className="flex flex-wrap gap-1">
              <button
                className="btn btn-sm border-[#00ffaa] bg-black rounded-sm font-[PT]"
                onClick={generateShareableURL}
              >
                Generate URL
              </button>
              <button
                className="btn btn-sm border-[#00ffaa] bg-black rounded-sm font-[PT]"
                onClick={copyURLToClipboard}
              >
                {isCopied ? "Copied!" : "Copy URL"}
              </button>
              <button
                className="btn btn-sm border-[#00ffaa] bg-black rounded-sm font-[PT]"
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
          {fullhammers.map((obj, ind) => (
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 xl:grid-cols-12 gap-1 mb-1" key={ind}>
              {Object.entries(obj).map((item, index) => {
                const currentIndex = globalIndex++;
                return (
                  <div
                    className={`w-full border-1 border-white/20 bg-black/90 overflow-hidden rounded-lg flex flex-col items-center p-1 md:p-2 ${getTierBackground(
                      tiers[currentIndex]
                    )}`}
                    key={index}
                  >
                    <div className="avatar">
                      <div className="size-8 md:size-9 rounded">
                        <img
                          src={`/P9/${item[0]}.png`}
                          alt="Hammer"
                          className="border-1 border-white/50 rounded"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div className="text-center text-[11px] line-clamp-2 py-1">{item[1]}</div>
                    <div className="flex gap-0.5">
                      <select
                        value={tiers[currentIndex]}
                        onChange={(e) => handleTierChange(currentIndex, e.target.value)}
                        className={`select bg-transparent text-[10px] pl-2 rounded`}
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
      <Footer />
    </main>
  );
}
