import { Link } from "react-router-dom";

export default function Discord() {
  return (
    <div className="px-2">
      <div className="bg-[#0e0c12] border border-white/10 w-full max-w-200 rounded-xl px-4 py-2 mx-auto text-[13px] my-10 font-[Ubuntu] text-gray-400">
        <div className="flex flex-col md:flex-row items-start md:gap-4">
          <img src="/discord-icon.svg" alt="Discord Icon" className="w-15 h-auto" />
          <div className="w-full flex flex-col">
            <div className="text-[22px] uppercase font-[Sr]">
              Join <span className="text-green-300">the discord</span>
            </div>
            <div>
              Join the community Discord to stay updated on the latest news and events, learn alongside fellow players
              and improve together. Share your wins, learn new tricks, and join the conversation.
            </div>
            <div className="flex justify-end ">
              <Link to={"https://discord.gg/K84YmPCsgP"} target="_blank">
                <button className="p-1 px-2 bg-white rounded text-black my-2 font-[Ale] cursor-pointer text-[14px] hover:scale-110 duration-150 ease-in">
                  JOIN NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
