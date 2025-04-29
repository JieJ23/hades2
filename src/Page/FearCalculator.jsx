import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { allVows, vowArray, defineArray } from "../Data/FearTrait";
import { useState, useEffect } from "react";

export default function FearCalculator() {
  const [vows, setVows] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [isCopied, setIsCopied] = useState(false);
  const [shareableURL, setShareableURL] = useState(""); // State to store the shareable URL

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
    <main>
      <Head />
      <div className="flex flex-col md:flex-row gap-2">
        <SideNav />
        <div className="w-full">
          <section className="p-2">
            <div className="flex flex-wrap gap-1">
              <button className="btn btn-sm btn-soft btn-error rounded-sm font-[PT]" onClick={generateShareableURL}>
                Generate URL
              </button>
              <button className="btn btn-sm btn-soft btn-error rounded-sm font-[PT]" onClick={copyURLToClipboard}>
                {isCopied ? "Copied!" : "Copy URL"}
              </button>
              <button
                className="btn btn-sm btn-soft btn-error rounded-sm font-[PT]"
                onClick={() => {
                  const defaultValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                  setVows(defaultValues);
                  localStorage.setItem("myVows", JSON.stringify(defaultValues));
                }}
              >
                Reset Selection
              </button>
            </div>

            <div className="max-w-[1000px] bg-base-300 overflow-hidden p-2 truncate text-[13px] text-white rounded-md font-[PT] mt-2">
              {shareableURL || "No URL Generated Yet"}
            </div>
          </section>
          <div className="flex flex-col lg:flex-row items-center lg:items-start py-1">
            <div className="grid grid-cols-4 w-full gap-0.5 lg:gap-1 place-content-start">
              {allVows.map((ite, index) => (
                <div
                  className={`w-full min-h-[100px] border-1 border-white/20 flex flex-col justify-center items-center gap-0.5 relative rounded transition-all duration-300 ease-in ${
                    vows[index] !== 0
                      ? `bg-gradient-to-tr from-[#321846] to-[#1b0299]`
                      : `bg-gradient-to-tr from-[#0f1c1d] to-[#0f1a26]`
                  }`}
                  key={index}
                >
                  <div className="absolute top-0 left-1">
                    <div className="flex flex-col text-[10px]">
                      {vowArray(ite).map((item, index) => (
                        <div className="font-[PT]" key={index}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="avatar flex justify-center">
                    <div className="w-6 md:w-8 lg:w-10 rounded">
                      <img src={`/Vows/${ite}.png`} alt="Fear Vows" draggable={false} />
                    </div>
                  </div>
                  <div className="font-[Cinzel] text-[10px]">{ite}</div>
                  <button
                    className="btn btn-outline btn-accent btn-xs text-[12px] font-[PT]"
                    onClick={() => handleButtonClick(index)}
                  >
                    {vows[index]}
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full p-2 lg:py-0">
              <div className={`text-[18px] text-[#0cf29e] font-[PT]`}>Total: {currentVows ? currentVows : 0}</div>
              <div className="grid grid-cols-2 gap-2">
                {displayVow.map((item, index) => (
                  <div
                    className="w-full font-[PT] text-[12px] text-white border-1 border-white/20 rounded p-2 bg-[#2b2b5c60]"
                    key={index}
                  >
                    <div className="font-[Cinzel]">{item}</div>
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
    </main>
  );
}
