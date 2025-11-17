import Background from "../Comp/Background";
import { tga_categories } from "../Data/TGAdata";

import { useState } from "react";

const imgBase = [
  `gameplay1.webp`,
  `gameplay2.webp`,
  `gameplay1.webp`,
  `gameplay2.webp`,
  `gameplay2.webp`,
  `gameplay1.webp`,
  `gameplay2.webp`,
  `gameplay1.webp`,
  `gameplay1.webp`,
  `gameplay2.webp`,
  `gameplay1.webp`,
  `gameplay2.webp`,
  `gameplay2.webp`,
  `gameplay1.webp`,
  `gameplay2.webp`,
  `gameplay1.webp`,
];

export default function TheGameAward() {
  const [loading, setLoading] = useState(false);

  async function Submit(e) {
    e.preventDefault();

    const formEle = e.target;
    const formDatab = new FormData(formEle);

    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // months are 0-based
    const day = now.getDate().toString().padStart(2, "0");
    const year = now.getFullYear();

    const formatted = `${month}/${day}/${year}`;

    formDatab.append("dat", formatted);

    setLoading(true);

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyBRCZIxijilvGiwwnontSQT_feDyRCEljaqUkZgbkcp5morHAHQgKUE1PjTqEnEYQM/exec",
        {
          method: "POST",
          body: formDatab,
        }
      );
      // This will log the selected option
      const text = await res.text();
      console.log("Response:", text);
      console.log(`good`);
      alert("Form submitted successfully!");
      formEle.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1400px] font-[Ale] text-[16px] mx-auto p-4">
        <form onSubmit={Submit}>
          <div className="flex justify-center items-center my-6">
            <img src="/Hades2.png" alt="Hades 2" className="w-[100px]" />
            <div className="text-[20px] font-[Cinzel]">
              <div>The</div>
              <div>Hades II</div>
              <div>Award</div>
            </div>
          </div>
          <div className="px-2">* Results will be available on December 1st.</div>
          <div className="my-4 mt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-white">
            {tga_categories.map((obj, index) => (
              <div
                className="w-full flex flex-col justify-center gap-2 h-[150px] p-2 bg-[#030303] rounded relative"
                style={{
                  borderStyle: "solid",
                  borderWidth: "8px",
                  borderImage: "url('/Misc/frame.webp') 60 stretch",
                }}
              >
                <img
                  src={`/${imgBase[index]}`}
                  className="absolute h-full w-full top-0 right-0 opacity-30 object-cover object-center"
                />
                <div className="text-center font-[Ale] relative">{obj.qa}</div>
                <select
                  defaultValue="Select"
                  name={`qa${index + 1}`}
                  className={`select select-sm w-[80%] mx-auto focus:outline-none focus:border-transparent text-[14px] relative`}
                >
                  <option disabled={true}>Select</option>
                  {obj.option.map((ite) => (
                    <option value={ite}>{ite}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            <input className="input" placeholder="Your Name" name="nam" required></input>
            <button
              className="bg-[#00ffaa] text-black rounded text-[20px] px-2 py-1 w-[150px] cursor-pointer"
              type="submit"
              name="Submit"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
