import SideNav from "./Comp/Sidebar";
import Background from "./Comp/Background";
import Footer from "./Comp/Footer";

import { useState, useEffect } from "react";

const targetDate = new Date("September 25, 2025 00:00:00").getTime();
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
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="mockup-phone border-[#131111]">
          <div className="mockup-phone-camera text-[14px] font-[Ale] flex items-center justify-center">
            <div>House of Chill</div>
          </div>
          <div className="mockup-phone-display relative px-4">
            <img
              alt="wallpaper"
              src="/Misc/world.webp"
              className="absolute top-0 left-0 h-full w-full object-cover object-center"
            />
            <div className="absolute top-0 left-0 h-full w-full bg-[#000000a1]" />
            <div className="relative z-40 mt-20 px-4 rounded p-1 font-[Ubuntu] text-[11px] md:text-[12px]">
              <div className="chat chat-start">
                <div className="chat-header">Zagreus</div>
                <div className="chat-bubble bg-[white]/70 text-black">
                  So, sis, how's it going fighting Grandpa Time?
                </div>
              </div>
              <div className="chat chat-end">
                <div className="chat-header">Melinoë</div>
                <div className="chat-bubble bg-[#00ffaa]/70 text-black">
                  Imagine trying to punch a clock... but the clock punches back.
                </div>
              </div>
              <div className="chat chat-start">
                <div className="chat-header">Chronos</div>
                <div className="chat-bubble bg-[white]/70 text-black">
                  Respect your elders, child. I invented bedtime.
                </div>
              </div>
              <div className="chat chat-start">
                <div className="chat-header">Zagreus</div>
                <div className="chat-bubble bg-[white]/70 text-black">
                  Pretty sure Dad invented bedtime. He keeps grounding me there.
                </div>
              </div>
              <div className="chat chat-end">
                <div className="chat-header">Melinoë</div>
                <div className="chat-bubble bg-[#00ffaa]/70 text-black">
                  At least you get a bed. I've been camping in witch covens.
                </div>
              </div>
              <div className="chat chat-start">
                <div className="chat-header">Chronos</div>
                <div className="chat-bubble bg-[white]/70 text-black">
                  When I'm done, none of you will have time for beds.
                </div>
              </div>
              <div className="chat chat-start">
                <div className="chat-header">Zagreus</div>
                <div className="chat-bubble bg-[white]/70 text-black">
                  Oh wow, he made a dad joke. That's how you know he's losing.
                </div>
              </div>
              <div className="chat chat-end">
                <div className="chat-header">Melinoë</div>
                <div className="chat-bubble bg-[#00ffaa]/70 text-black">
                  😂 Someone screenshot this before he rewinds it.
                </div>
              </div>
              <div className="text-center mt-10">Chronos has left the chat.</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
