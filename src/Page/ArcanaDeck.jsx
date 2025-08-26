import SideNav from "../Comp/Sidebar";
import { useState, useEffect } from "react";
import { defineDeck, allCards } from "../Data/DeckTrait";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

export default function ArcanaDeck() {
  const [deck, setDeck] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [shareableURL, setShareableURL] = useState(""); // State to store the shareable URL

  const handleDeck = (index) => {
    setDeck((prev) => {
      let updated;
      if (prev.includes(index)) {
        updated = prev.filter((ite) => ite !== index);
      } else {
        updated = [...prev, index];
      }
      localStorage.setItem("myDeck", JSON.stringify(updated));
      return updated;
    });
  };

  const currentGrasp = deck.map((ite) => defineDeck(ite).g).reduce((a, b) => a + b, 0);

  //

  const generateShareableURL = () => {
    const base64Deck = btoa(JSON.stringify(deck));
    const newURL = `${window.location.origin}/ArcanaDeck/?deck=${base64Deck}`;
    setShareableURL(newURL);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const base64Deck = searchParams.get("deck");

    if (base64Deck) {
      try {
        const decodedDeck = JSON.parse(atob(base64Deck)); // Decode the Base64
        setDeck(decodedDeck);
        window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
        return;
        // Reset the URL back to localhost without the query
      } catch (error) {
        console.error("Error decoding cards data from URL:", error);
      }
    }
    const stored = localStorage.getItem("myDeck");
    if (stored) {
      setDeck(JSON.parse(stored));
    }
  }, []);

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
              <button className="bg-white cursor-pointer text-black rounded px-2 py-1" onClick={generateShareableURL}>
                Generate URL
              </button>
              <button className="bg-white cursor-pointer text-black rounded px-2 py-1" onClick={copyURLToClipboard}>
                {isCopied ? "Copied!" : "Copy URL"}
              </button>
              <button
                className="bg-white cursor-pointer text-black rounded px-2 py-1"
                onClick={() => {
                  const defaultValue = [];
                  setDeck(defaultValue);
                  localStorage.setItem("myDeck", JSON.stringify(defaultValue));
                }}
              >
                Reset Deck
              </button>
            </div>

            <div className="w-full max-w-[1000px] bg-[#28282b98] text-white overflow-hidden p-2 truncate rounded my-2">
              {shareableURL || "No URL Generated Yet"}
            </div>
          </section>
          <div className="flex flex-col lg:flex-row">
            <div className="grid grid-cols-5 place-content-start max-w-[450px] h-auto mx-auto shrink-0 py-1">
              {allCards.map((ite, idx) => (
                <div key={idx} className="relative" onClick={() => handleDeck(ite)}>
                  <img
                    draggable={false}
                    src={`/Arcane/c0.png`}
                    alt="Arcane Card"
                    className={`w-full transition-transform transform ${
                      deck.includes(ite) ? "transform-[rotateY(90deg)]" : "transform-[rotateY(0deg)]"
                    }`}
                  />
                  <div
                    className={`w-full absolute top-0 left-0 transition-transform transform ${
                      deck.includes(ite) ? "transform-[rotateY(0deg)]" : "transform-[rotateY(90deg)]"
                    }`}
                  >
                    <img draggable={false} src={`/Arcane/${ite}.png`} alt="Arcane Card" />
                    <div className="absolute top-1 right-1 bg-black rounded-full w-6 h-6 flex justify-center items-center">
                      {defineDeck(ite).g}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full p-3">
              <div className={`text-[18px] text-[#0cf29e] ${currentGrasp <= 30 ? `text-[#0cf29e]` : `text-[#ee2828]`}`}>
                Total: {currentGrasp}/30
              </div>
              {deck
                .sort((a, b) => +(a.slice(1) < +b.slice(1) ? -1 : 1))
                .map((ite) => (
                  <div className="text-white border-1 border-white/20 rounded p-2 my-1 bg-black/90">
                    <div className="text-[14px]">{defineDeck(ite).card}</div>
                    <div>{defineDeck(ite).d}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
