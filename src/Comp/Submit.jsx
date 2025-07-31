import { useState } from "react";
import { h2AspectOrder } from "../Data/Misc";
import { Link } from "react-router-dom";

export default function Submit() {
  const [loading, setLoading] = useState(false);

  async function Submit(e) {
    e.preventDefault();

    const formEle = e.target;
    const formDatab = new FormData(formEle);
    setLoading(true);

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbzoCSh79R0_j_2Vu5vAHNN1IgIcMj_fXUKIA1Ah9OWTdmeUgLd3CJIl1ZQm1RQ9ygau/exec",
        {
          method: "POST",
          body: formDatab,
        }
      );
      // This will log the selected option
      formEle.reset();
      console.log(`good`);
      alert("Form submitted successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn border-[#2efaac] bg-transparent font-[Source] border-1 rounded text-[14px] px-3"
          >
            Submit
          </label>
        </div>
        <div className="drawer-side z-40">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu bg-black/90 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <>
              <form
                onSubmit={Submit}
                className="w-full mx-auto my-4 flex flex-col items-center gap-2 p-2 font-[Source]"
              >
                <div className="text-white text-[20px]">Share Gameplay</div>
                <input type="date" placeholder="Date" className="input input-md" name="date" required />
                <input type="text" placeholder="Name" className="input input-md" name="nam" required />
                <select defaultValue="Melinoe Staff" className="select select-neutral" name="aspect">
                  {h2AspectOrder.map((ite, index) => (
                    <option key={index}>{ite}</option>
                  ))}
                </select>
                <select defaultValue="Underworld" className="select select-neutral" name="location">
                  <option>Underworld</option>
                  <option>Surface</option>
                </select>
                <input
                  type="number"
                  placeholder="Fear"
                  className="input input-md"
                  name="fear"
                  max={67}
                  min={22}
                  required
                />
                <input type="text" placeholder="Gameplay Link" className="input input-md" name="src" required />
                <input type="text" placeholder="Short Description" className="input input-md" name="des" required />
                <Link
                  to={`https://h2crossroads.pages.dev/ArcanaDeck`}
                  target="_blank"
                  className="text-[10px] text-[#56abf5]"
                >
                  https://h2crossroads.pages.dev/ArcanaDeck
                </Link>
                <input
                  type="text"
                  placeholder="Arcana Shareable URL"
                  className="input input-md"
                  name="arcana"
                  required
                />
                <Link
                  to={`https://h2crossroads.pages.dev/FearCalculator`}
                  target="_blank"
                  className="text-[10px] text-[#56abf5]"
                >
                  https://h2crossroads.pages.dev/FearCalculator
                </Link>

                <input type="text" placeholder="Fear Shareable URL" className="input input-md" name="oath" required />
                <button
                  className="btn border-[#2efaac] bg-transparent font-[Source] border-1 rounded text-[14px] px-3"
                  type="submit"
                  name="Submit"
                >
                  {loading ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
                </button>
              </form>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
