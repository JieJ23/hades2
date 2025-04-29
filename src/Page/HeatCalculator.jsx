import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { useState, useEffect } from "react";
import { allPact, definePact, pactArray } from "../Data/PactPunishmentTrait";

export default function HeatCalculator() {
  const [pact, setPact] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [isCopied, setIsCopied] = useState(false);
  const [shareableURL, setShareableURL] = useState(""); // State to store the shareable URL

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const base64Pact = searchParams.get("pact");

    if (base64Pact) {
      try {
        const decodedVows = JSON.parse(atob(base64Pact)); // Decode the Base64
        setPact(decodedVows);
        window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
        return;
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    const stored = localStorage.getItem("myPact");
    if (stored) {
      setPact(JSON.parse(stored));
    }
  }, []);

  const handleButtonClick = (index) => {
    setPact((prevValues) => {
      const options = pactArray(allPact[index]); // this show the array for the vow
      const currentIndex = options.indexOf(prevValues[index]); // Find the current value's index
      const nextIndex = (currentIndex + 1) % options.length; // Cycle to the next index
      const updatedValues = [...prevValues]; // Clone the array to update
      updatedValues[index] = options[nextIndex]; // Update the specific value
      localStorage.setItem("myPact", JSON.stringify(updatedValues));
      return updatedValues; // Return the updated array
    });
  };

  const findSelectionIndex = pact.map((item, index) => (item > 0 ? index : -1)).filter((item) => item !== -1);
  const displayPact = findSelectionIndex.map((num) => allPact[num]);

  const currentPact = pact.reduce((a, b) => a + b, 0);

  //
  //

  const generateShareableURL = () => {
    const base64Pact = btoa(JSON.stringify(pact));
    const newURL = `${window.location.origin}/HeatCalculator/?vows=${base64Pact}`;
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
            <button className="btn btn-sm btn-soft btn-error rounded-sm font-[PT]" onClick={generateShareableURL}>
              Generate URL
            </button>
            <button className="btn btn-sm btn-soft btn-error rounded-sm font-[PT] mx-1" onClick={copyURLToClipboard}>
              {isCopied ? "Copied!" : "Copy URL"}
            </button>
            <button
              className="btn btn-sm btn-soft btn-error rounded-sm font-[PT]"
              onClick={() => {
                const defaultValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                setPact(defaultValues);
                localStorage.setItem("myPact", JSON.stringify(defaultValues));
              }}
            >
              Reset Selection
            </button>

            <div className="max-w-[1000px] bg-base-300 overflow-hidden p-2 truncate text-[13px] text-white rounded-md font-[PT] mt-2">
              {shareableURL || "No URL Generated Yet"}
            </div>
          </section>
          <div className="flex flex-col lg:flex-row items-center lg:items-start py-1">
            <div className="grid grid-cols-4 w-[460px] gap-1 place-content-start shrink-0">
              {allPact.map((ite, index) => (
                <div
                  className={`w-[110px] h-[110px] border-1 border-white/20 flex flex-col justify-center items-center gap-0.5 relative rounded transition-all duration-300 ease-in ${
                    pact[index] !== 0
                      ? `bg-gradient-to-tr from-[#462318] to-[#995f02]`
                      : `bg-gradient-to-tr from-[#0f1c1d] to-[#0f1a26]`
                  }`}
                  key={index}
                >
                  <div className="absolute top-0 left-1">
                    <div className="flex flex-col text-[10px]">
                      {pactArray(ite).map((item, index) => (
                        <div className="font-[PT] text-white" key={index}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="avatar flex justify-center">
                    <div className="w-10 rounded">
                      <img src={`/Punishment/${ite}.png`} alt="Fear Vows" draggable={false} />
                    </div>
                  </div>
                  <div className="font-[Cinzel] text-[10px] h-[30px] w-[90px] flex flex-col justify-center text-center">
                    {ite}
                  </div>
                  <button
                    className="btn btn-outline btn-error btn-xs text-[12px] font-[PT]"
                    onClick={() => handleButtonClick(index)}
                  >
                    {pact[index]}
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full p-2 lg:py-0">
              <div className={`text-[18px] text-[#f2ad0c] font-[PT]`}>Total: {currentPact ? currentPact : 0}</div>
              <div className="grid grid-cols-2 gap-2">
                {displayPact.map((item, index) => (
                  <div
                    className="w-full font-[PT] text-[12px] text-white border-1 border-white/20 rounded p-2 bg-[#5c452b60]"
                    key={index}
                  >
                    <div className="font-[Cinzel]">{item}</div>
                    <div className="text-gray-300">{definePact(item).d}</div>
                    <div className="flex flex-wrap justify-start gap-2 mt-1">
                      {definePact(item).rank.map((ite, index) => (
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
                                alt="Pact Rank"
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
