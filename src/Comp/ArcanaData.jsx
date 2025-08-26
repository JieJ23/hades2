import { deckMatch, deCodeArcana, reduceOathData, vowMatch } from "../Data/Misc";
import { useState } from "react";
import { deCodeVow } from "../Data/Misc";
import { h2AspectOrder } from "../Data/Misc";

const allDeckCards = Object.keys(deckMatch);

export default function ArcanaData({ data }) {
  const [category, setCategory] = useState(`All Aspects`);
  const [min, setMin] = useState(22);
  const [max, setMax] = useState(67);

  const aspectData = category === `All Aspects` ? data : data.filter((obj) => obj.asp === category);

  const arcanaData = aspectData.filter((obj) => obj.arcana);
  const oathData = aspectData.filter((obj) => obj.oath).filter((obj) => obj.fea >= min && obj.fea <= max);

  const displayData = arcanaData.filter((obj) => obj.fea >= min && obj.fea <= max);

  const arcana_Counts = displayData.reduce((acc, entry) => {
    const arcanaArray = deCodeArcana(entry.arcana); // Convert string to array

    arcanaArray.forEach((arcana) => {
      acc[arcana] = (acc[arcana] || 0) + 1;
    });

    return acc;
  }, {});

  const oathStore = [];

  for (let i = 0; i < oathData.length; i++) {
    const target = deCodeVow(oathData[i].oath);
    oathStore.push(target);
  }

  const oathArrayData = reduceOathData(oathStore);

  return (
    <div className="rounded mt-4 w-full max-w-[1200px] mx-auto font-[Ale] text-[11px] md:text-[12px] py-4 px-2">
      <div className="px-2 text-[20px]">Arcana & Vows</div>
      <div className="px-2 py-1 flex gap-1">
        <select
          value={category}
          className="select select-sm w-[150px] border-1 focus:outline-0 border-[#00ffaa] rounded"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value={`All Aspects`}>{`All Aspects`}</option>
          {h2AspectOrder.map((ite, index) => (
            <option value={ite} key={index}>
              {ite}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="input input-sm border-1 focus:outline-0 border-[#f18043] rounded w-[80px]"
          value={min}
          min={22}
          max={67}
          onChange={(e) => {
            setMin(e.target.value);
          }}
        />
        <input
          type="number"
          className="input input-sm border-1 focus:outline-0 border-[#f18043] rounded w-[80px]"
          value={max}
          min={22}
          max={67}
          onChange={(e) => {
            setMax(e.target.value);
          }}
        />
      </div>
      <div className="px-2 flex gap-2">
        <div>Query Fear:</div>
        <div className="text-[#00ffaa]">{category}</div>
        <div className="text-[#f18043]">Min [{min}]</div>
        <div className="text-[#f18043]">Max [{max}]</div>
        <div className="text-[yellow]">[{displayData.length}]</div>
      </div>
      <div className="flex flex-wrap justify-center md:justify-start gap-2">
        {allDeckCards.map((ite, index) => (
          <div className="flex flex-col items-center text-[11px]">
            <img src={`/Arcane/${ite}.png`} alt="Arcana Card" className="w-[80px] h-[120px]" />
            <div>{deckMatch[ite]}</div>
            <div>{arcana_Counts[ite] ? `${((arcana_Counts[ite] / displayData.length) * 100).toFixed(2)}%` : `-`}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
        {oathArrayData.map((Litem, ind1) => (
          <div className="flex flex-col items-center min-w-[100px] bg-[#00000098] border-1 border-white/20 rounded p-2">
            <img src={`/Vows/${vowMatch[ind1]}.png`} alt="Vows" className="size-10 shrink-0" />
            <div>{vowMatch[ind1]}</div>
            <div>
              {Litem.map((item) => (
                <div className="flex justify-between gap-2">
                  <div>F{item[0]}</div>
                  <div>{((item[1] / oathData.length) * 100).toFixed(2)}%</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
