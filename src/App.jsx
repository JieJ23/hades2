import SideNav from "./Comp/Sidebar";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";

import { useState, useEffect } from "react";

const targetDate = new Date("September 25, 2025 00:00:00").getTime();

const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "Z", "A", "Z"];
const row2 = ["P", "L", "K", "J", "H", "G", "A", "S", "A", "D"];
const row3 = ["M", "N", "B", "V", "C", "X", "G", "G", "F", "H"];
const row4 = ["T", "Y", "U", "I", "O", "R", "R", "Q", "W", "P"];
const row5 = ["E", "D", "S", "A", "F", "E", "E", "Z", "X", "C"];
const row6 = ["C", "V", "B", "N", "U", "L", "K", "J", "H", "G"];
const row7 = ["H", "G", "F", "S", "D", "S", "P", "O", "I", "T"];
const row8 = ["Q", "W", "E", "R", "T", "Y", "I", "O", "P", "L"];
const row9 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Z"];
const row10 = ["Z", "X", "C", "V", "B", "N", "M", "Q", "W", "E"];
//
export default function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1600px] font-[Ubuntu] text-[10px] md:text-[11px] mx-auto px-1">
        <SideNav />
        <div className="flex flex-col items-center justify-center bg-transparent my-10 p-2">
          <h1 className="font-[Ale] text-[24px] text-white font-bold mb-6">Countdown to September 25</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-[Ale] text-[11px] md:text-[12px]">
            <div className="p-6 bg-[#fff] rounded shadow text-black relative">
              <div className="font-[Ale] font-bold text-[28px]">{timeLeft.days}</div>
              <span>Days</span>
            </div>
            <div className="p-6 bg-[#fff] rounded shadow text-black">
              <div className="font-[Ale] font-bold text-[28px]">{timeLeft.hours}</div>
              <span>Hours</span>
            </div>
            <div className="p-6 bg-[#fff] rounded shadow text-black">
              <div className="font-[Ale] font-bold text-[28px]">{timeLeft.minutes}</div>
              <span>Minutes</span>
            </div>
            <div className="p-6 bg-[#fff] rounded shadow text-black counter">
              <div className="font-[Ale] font-bold text-[28px]">{timeLeft.seconds}</div>
              <span>Seconds</span>
            </div>
          </div>
          <div className="mt-10 mb-2 text-[14px] flex gap-4">
            <div>8 5</div>
            <div>23 9 12 12</div>
            <div>2 5</div>
            <div>2 1 3 11</div>
          </div>
          <div className="mb-10 w-full max-w-[700px] text-[11px] md:text-[14px]">
            <div className="grid grid-cols-10 gap-0.5 my-0.5">
              {row1.map((ite) => (
                <div className="bg-[#28282b] border-black border-1 rounded aspect-square flex items-center justify-center">
                  {ite}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-0.5 my-0.5">
              {row2.map((ite) => (
                <div className="bg-[#28282b] border-black border-1 rounded aspect-square flex items-center justify-center">
                  {ite}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-0.5 my-0.5">
              {row3.map((ite) => (
                <div className="bg-[#28282b] border-black border-1 rounded aspect-square flex items-center justify-center">
                  {ite}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-0.5 my-0.5">
              {row4.map((ite) => (
                <div className="bg-[#28282b] border-black border-1 rounded aspect-square flex items-center justify-center">
                  {ite}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-0.5 my-0.5">
              {row5.map((ite) => (
                <div className="bg-[#28282b] border-black border-1 rounded aspect-square flex items-center justify-center">
                  {ite}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-0.5 my-0.5">
              {row6.map((ite) => (
                <div className="bg-[#28282b] border-black border-1 rounded aspect-square flex items-center justify-center">
                  {ite}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-0.5 my-0.5">
              {row7.map((ite) => (
                <div className="bg-[#28282b] border-black border-1 rounded aspect-square flex items-center justify-center">
                  {ite}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-0.5 my-0.5">
              {row8.map((ite) => (
                <div className="bg-[#28282b] border-black border-1 rounded aspect-square flex items-center justify-center">
                  {ite}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-0.5 my-0.5">
              {row9.map((ite) => (
                <div className="bg-[#28282b] border-black border-1 rounded aspect-square flex items-center justify-center">
                  {ite}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-0.5 my-0.5">
              {row10.map((ite) => (
                <div className="bg-[#28282b] border-black border-1 rounded aspect-square flex items-center justify-center">
                  {ite}
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
