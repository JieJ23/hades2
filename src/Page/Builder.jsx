import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import { nameGods, grandBoon, fullBoon } from "../Data/builder_gods";
import { useState, useEffect } from "react";

export default function Builder() {
  const [pool, setPool] = useState(0);
  const [boon, setBoon] = useState([]);

  const [isCopied, setIsCopied] = useState(false);
  const [shareableURL, setShareableURL] = useState(""); // State to store the shareable URL

  const generateShareableURL = () => {
    const base64Boon = btoa(JSON.stringify(boon));
    const newURL = `${window.location.origin}/Builder/?boon=${base64Boon}`;
    setShareableURL(newURL);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const base64Boon = searchParams.get("boon");

    if (base64Boon) {
      try {
        const decodedBoon = JSON.parse(atob(base64Boon)); // Decode the Base64
        setBoon(decodedBoon);
        window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
        return;
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    const stored = localStorage.getItem("myBoon");
    if (stored) {
      setBoon(JSON.parse(stored));
    }
  }, []);

  const copyURLToClipboard = () => {
    navigator.clipboard.writeText(shareableURL).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    });
  };

  const handleChangePool = (num) => {
    setPool(num);
  };
  const handleAddBoon = (id) => {
    setBoon((prev) => {
      const previous = [...prev];
      if (previous.includes(id)) {
        return previous;
      } else {
        previous.push(id);
        localStorage.setItem("myBoon", JSON.stringify(previous));
        return previous;
      }
    });
  };
  const handleRemoveBoon = (index) => {
    setBoon((prev) => {
      const previous = [...prev];
      previous.splice(index, 1);
      return previous;
    });
  };

  const displayPool = grandBoon[pool];

  const displaySelect = boon.map((id) => {
    const item = fullBoon.find((obj) => obj.id === id);
    return item.tag;
  });

  return (
    <main className="relative select-none">
      <div className="fixed w-full h-full bg-[url('/mbg.webp')] -z-10 bg-top"></div>
      <Head />
      <div className="flex flex-col md:flex-row gap-2 max-w-[1400px] mx-auto">
        <SideNav />
        <section className="p-2 py-10 font-[PT] text-[14px]">
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
                  const defaultValue = [];
                  setBoon(defaultValue);
                  localStorage.setItem("myBoon", JSON.stringify(defaultValue));
                }}
              >
                Reset Boon
              </button>
            </div>

            <div className="max-w-[1000px] bg-base-300 overflow-hidden p-2 truncate text-[13px] text-white rounded-md font-[PT] mt-2">
              {shareableURL || "No URL Generated Yet"}
            </div>
          </section>
          <div className="p-2 py-4 my-4 bg-[#21214a57] rounded">
            <div className="text-[20px] text-white text-center font-[Cinzel] pb-2">Selected Items/Boons</div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {displaySelect.map((item, index) => (
                <div
                  className="flex flex-col items-center gap-1 px-3 py-1 cursor-pointer border-1 border-white/20 rounded hover:bg-warning duration-150 ease-in transition-colors bg-[#21214a88] w-[80px] h-[90px] overflow-hidden"
                  onClick={() => handleRemoveBoon(index)}
                  key={index}
                >
                  <div className="avatar">
                    <div className="w-10 rounded">
                      <img src={`/buildgui/${item}.png`} alt="Boons" />
                    </div>
                  </div>
                  <div className="text-[10px] md:text-[12px] text-center">{item}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-0.5 flex-wrap">
            {nameGods.map((item, index) => (
              <button
                className={`btn font-[PT] text-[12px] border-1 border-black rounded-sm ${
                  pool == index ? `btn-warning` : `btn-neutral`
                }`}
                key={index}
                onClick={() => handleChangePool(index)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-1 my-4">
            {displayPool.map((obj, index) => (
              <div
                className={`w-[75px] md:w-[100px] backdrop-blur-sm rounded border-1 border-white/20 flex flex-col items-center gap-1 p-2 group hover:bg-base-200 duration-150 ease-in transition-colors hover:cursor-pointer justify-center ${
                  boon.includes(obj.id) && `bg-[#3d3c7e]`
                }`}
                onClick={() => handleAddBoon(obj.id)}
                key={index}
              >
                <div className="avatar">
                  <div className="w-10 md:w-12 rounded">
                    <img src={`/buildgui/${obj.tag}.png`} alt="Boons" />
                  </div>
                </div>
                <div className="text-[10px] md:text-[12px] text-center">{obj.tag}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
