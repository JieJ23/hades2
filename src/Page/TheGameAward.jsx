import Background from "../Comp/Background";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { tga_categories } from "../Data/TGAdata";

import { useState } from "react";
import { response } from "../Data/TGAresponse";

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
  const [category, setCategory] = useState(0);

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
  // Gather Data
  const questions = Array.from({ length: 16 }, (_, i) => `qa${i + 1}`);

  const result = response.reduce((acc, item) => {
    questions.forEach((q) => {
      const val = item[q];
      if (val !== undefined) {
        acc[q] = acc[q] || {};
        acc[q][val] = (acc[q][val] || 0) + 1;
      }
    });
    return acc;
  }, {});

  const orderResults = Object.entries(result).map((obj) => {
    return Object.entries(obj[1]).sort((a, b) => b[1] - a[1]);
  });
  //

  const displayResults = orderResults[category];

  const graphResults = orderResults[category].map((obj) => {
    return { num: obj[0], count: obj[1] };
  });

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
                <div className="absolute top-1 left-1 text-[12px] text-gray-300">Q{index + 1}.</div>
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
        {/* Data Display */}
        {/* <div
          className="my-8 bg-black/70 py-4 rounded"
          style={{
            borderStyle: "solid",
            borderWidth: "8px",
            borderImage: "url('/Misc/frame.webp') 60 stretch",
          }}
        >
          <div className="px-2 flex flex-wrap justify-center gap-2 mb-4">
            {questions.map((ite, index) => (
              <div
                className={`text-black px-2 py-0.5 rounded hover:cursor-pointer hover:bg-[#00ffaa] ${
                  category == index ? `bg-[#00ffaa]` : `bg-white`
                }`}
                onClick={() => setCategory(index)}
                key={index}
              >
                {ite.replace("qa", "Q")}
              </div>
            ))}
          </div>
          <div className="text-center text-[18px] font-[Cinzel] my-2 bg-[#131111]">{tga_categories[category].qa}</div>

          <div className="h-[400px] w-full max-w-[1200px] mx-auto text-[12px] my-4">
            <div className="text-[20px] font-[Ale]"></div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={graphResults}
                margin={{
                  top: 5,
                  right: 10,
                  left: -20,
                  bottom: 80,
                }}
              >
                <CartesianGrid stroke="#80808080" strokeDasharray="" vertical={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#000", // dark background
                    border: "1px solid #00ffaa",
                    borderRadius: "rounded",
                    color: "#ffffff", // text color (doesn't always work, use labelStyle too)
                  }}
                  labelStyle={{ color: "#fff" }} // controls the label text color
                />
                <XAxis dataKey="num" stroke="#ffffff" angle={-45} textAnchor="end" interval={0} dy={5} />
                <YAxis stroke="#ffffff" domain={[0, 67]} />
                <Bar dataKey="count" fill="#00ffaa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="max-w-[1200px] mx-auto rounded">
            {displayResults.map((obj, index) => (
              <div className="grid grid-cols-3 place-items-center my-1 hover:bg-[#28282b]" key={index}>
                <div className="text-center">{obj[0]}</div>
                <div>{obj[1]} votes</div>
                <div>{((obj[1] / response.length) * 100).toFixed(2)}%</div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </main>
  );
}
