import { Link } from "react-router-dom";

const eaContent = [
  {
    name: `Ladder`,
    path: `EALadder`,
  },
  {
    name: `Query`,
    path: `EAQuery`,
  },
  {
    name: `Ranking`,
    path: `EARanking`,
  },
  {
    name: `Stats`,
    path: `EAStat`,
  },
];

export default function EAContent() {
  return (
    <div className="grid grid-cols-4 px-2 gap-1 w-full mx-auto max-w-[600px] mb-2 font-[Ale]">
      {eaContent.map((obj, ind) => (
        <Link
          to={`/${obj.path}`}
          key={ind}
          className="bg-white text-black text-center p-1 text-[12px] rounded border-1 border-white/10"
        >
          {obj.name}
        </Link>
      ))}
    </div>
  );
}
