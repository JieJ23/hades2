import SideNav from "../Comp/Sidebar";
import { allVows, vowArray, defineArray } from "../Data/FearTrait";
import { useState, useEffect } from "react";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

export default function FearCalculator() {
  const [vows, setVows] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [isCopied, setIsCopied] = useState(false);
  const [shareableURL, setShareableURL] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const base64Vows = searchParams.get("vows");

    if (base64Vows) {
      try {
        const decodedVows = JSON.parse(atob(base64Vows)); // Decode the Base64
        setVows(decodedVows);
        window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
        return;
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    const stored = localStorage.getItem("myVows");
    if (stored) {
      setVows(JSON.parse(stored));
    }
  }, []);

  const handleButtonClick = (index) => {
    setVows((prevValues) => {
      const options = vowArray(allVows[index]); // this show the array for the vow
      const currentIndex = options.indexOf(prevValues[index]); // Find the current value's index
      const nextIndex = (currentIndex + 1) % options.length; // Cycle to the next index
      const updatedValues = [...prevValues]; // Clone the array to update
      updatedValues[index] = options[nextIndex]; // Update the specific value
      localStorage.setItem("myVows", JSON.stringify(updatedValues));
      return updatedValues; // Return the updated array
    });
  };

  const findSelectionIndex = vows.map((item, index) => (item > 0 ? index : -1)).filter((item) => item !== -1);
  const displayVow = findSelectionIndex.map((num) => allVows[num]);

  const currentVows = vows.reduce((a, b) => a + b, 0);

  //
  //

  const generateShareableURL = () => {
    const base64Vows = btoa(JSON.stringify(vows));
    const newURL = `${window.location.origin}/FearCalculator/?vows=${base64Vows}`;
    setShareableURL(newURL);
  };

  const copyURLToClipboard = () => {
    navigator.clipboard.writeText(shareableURL).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    });
  };

  return (
    <main className="select-none relative">
      <Background />
      <div className="max-w-[1400px] font-[Ale] text-[11px] md:text-[12px] mx-auto">
        <SideNav />
        <div className="w-full">
          <section className="p-2">
            <div className="flex flex-wrap gap-1">
              <button className="bg-white cursor-pointer text-black rounded px-2 py-1 " onClick={generateShareableURL}>
                Generate URL
              </button>
              <button className="bg-white cursor-pointer text-black rounded px-2 py-1" onClick={copyURLToClipboard}>
                {isCopied ? "Copied!" : "Copy URL"}
              </button>
              <button
                className="bg-white cursor-pointer text-black rounded px-2 py-1"
                onClick={() => {
                  const defaultValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                  setVows(defaultValues);
                  localStorage.setItem("myVows", JSON.stringify(defaultValues));
                }}
              >
                Reset Selection
              </button>
            </div>

            <div className="w-full max-w-[1000px] bg-[#28282b] text-white overflow-hidden p-2 truncate text-[12px] rounded my-2">
              {shareableURL || "No URL Generated Yet"}
            </div>
          </section>
          <div className="flex flex-col lg:flex-row items-center lg:items-start py-1">
            <div className="grid grid-cols-4 w-full gap-0.5 lg:gap-1 place-content-start px-0.5">
              {allVows.map((ite, index) => (
                <div
                  className={`w-full min-h-[100px] flex flex-col justify-center items-center gap-0.5 relative transition-all duration-200 ease-in pt-1 hover:bg-[#411876] ${
                    vows[index] !== 0 ? `bg-gradient-to-br from-[#190c23] to-[#411876]` : `bg-[#000000]`
                  } ${index === 16 && `col-start-2 col-span-2`}`}
                  key={index}
                  style={{
                    borderStyle: "solid", // Required
                    borderWidth: "4px",
                    borderImage: "url('/Misc/frame.webp') 40 stretch",
                  }}
                >
                  <div className="absolute top-0 left-1">
                    <div className="flex flex-col text-[12px]">
                      {vowArray(ite).map((item, ind) => (
                        <div key={ind}>{item}</div>
                      ))}
                    </div>
                  </div>
                  <img
                    src={`/Vows/${ite}.png`}
                    alt="Fear Vows"
                    className="size-7 md:size-8 lg:size-9 rounded"
                    draggable={false}
                  />
                  <div className="text-[10px] md:text-[12px] text-white">{ite}</div>
                  <button
                    className="btn btn-outline border-white/50 rounded bg-black btn-xs text-[12px]"
                    onClick={() => handleButtonClick(index)}
                  >
                    {vows[index]}
                  </button>
                  <div className="flex justify-center w-full gap-1 px-4 py-2">
                    {Array.from({ length: vowArray(ite).length - 1 }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1 w-full max-w-[25px] ${
                          vowArray(ite).indexOf(vows[index]) >= idx + 1 ? `bg-[#00ffaa]` : `bg-gray-600`
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full p-2 lg:py-0">
              <div className={`text-[18px] text-[#0cf29e]`}>Total: {currentVows ? currentVows : 0}</div>
              <div className="grid grid-cols-2 gap-2">
                {displayVow.map((item, index) => (
                  <div
                    className="w-full text-[12px] text-white rounded p-2 bg-[#000000] font-[Fontin]"
                    key={index}
                    style={{
                      borderStyle: "solid", // Required
                      borderWidth: "4px",
                      borderImage: "url('/Misc/frame.webp') 40 stretch",
                    }}
                  >
                    <div className="text-[14px]">{item}</div>
                    <div className="text-gray-300">{defineArray(item).d}</div>
                    <div className="flex flex-wrap justify-start gap-2 mt-1">
                      {defineArray(item).rank.map((ite, index) => (
                        <div className="flex items-center gap-1" key={index}>
                          <div className="avatar">
                            <div className="w-4 rounded-none">
                              <img
                                src={
                                  index == 0
                                    ? `/Level/Common.png`
                                    : index == 1
                                    ? `/Level/Rare.png`
                                    : index == 2
                                    ? `/Level/Epic.png`
                                    : `/Level/Heroic.png`
                                }
                                alt="Vow Rank"
                                draggable={false}
                              />
                            </div>
                          </div>
                          <div>{ite}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
