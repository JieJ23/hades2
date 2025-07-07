import {
  p9athena,
  p9chaos,
  p9hermes,
  p9artemis,
  p9arachne,
  p9dion,
  p9medea,
  p9circe,
  p9echo,
  p9nar,
  p9icarus,
} from "../Data/P9Boons";
import { sToA } from "../Data/Misc";
import { useState } from "react";

export default function P9Unseen({ data }) {
  const [region, setRegion] = useState(`All`);
  const [min, setMin] = useState(22);
  const [max, setMax] = useState(67);

  //

  const selectedDataset = data.filter((obj) => obj.fea >= min && obj.fea <= max);

  const regionData = region === `All` ? selectedDataset : selectedDataset.filter((obj) => obj.loc === region);

  const seleneRuns = regionData.filter((obj) => obj.sel === `t`).length;
  const chaosRunsnoselene = regionData
    .filter((obj) => obj.cha !== "")
    .filter((obj) => sToA(obj.cha).some((chaItem) => Object.values(p9chaos).includes(chaItem))).length;
  const AthenaRuns = regionData.filter((obj) =>
    sToA(obj.mis).some((item) => Object.values(p9athena).includes(item))
  ).length;
  const HermesRuns = regionData.filter((obj) =>
    sToA(obj.mis).some((item) => Object.values(p9hermes).includes(item))
  ).length;
  const ArtemisRuns = regionData.filter((obj) =>
    sToA(obj.mis).some((item) => Object.values(p9artemis).includes(item))
  ).length;
  const ArachneRuns = regionData.filter((obj) =>
    sToA(obj.mis).some((item) => Object.values(p9arachne).includes(item))
  ).length;
  const DionysusRuns = regionData.filter((obj) =>
    sToA(obj.mis).some((item) => Object.values(p9dion).includes(item))
  ).length;
  const MedeaRuns = regionData.filter((obj) =>
    sToA(obj.mis).some((item) => Object.values(p9medea).includes(item))
  ).length;
  const CirceRuns = regionData.filter((obj) =>
    sToA(obj.mis).some((item) => Object.values(p9circe).includes(item))
  ).length;
  const EchoRuns = regionData.filter((obj) =>
    sToA(obj.mis).some((item) => Object.values(p9echo).includes(item))
  ).length;
  const NarcissusRuns = regionData.filter((obj) =>
    sToA(obj.mis).some((item) => Object.values(p9nar).includes(item))
  ).length;
  const IcarusRuns = regionData.filter((obj) =>
    sToA(obj.mis).some((item) => Object.values(p9icarus).includes(item))
  ).length;
  //

  return (
    <div className="max-w-[1400px] text-[12px] mx-auto my-2 font-[PT] text-white py-2">
      <div className="text-[#fff200] px-4 py-1">Unseen Encounter</div>
      <div className="p-1 px-2 flex gap-1">
        <select
          value={region}
          className="select select-sm w-[100px] border-1 border-[#00ffaa] rounded focus:outline-0"
          onChange={(e) => {
            setRegion(e.target.value);
          }}
        >
          <option value={`All`}>All</option>
          <option value={`Underworld`}>Underworld</option>
          <option value={`Surface`}>Surface</option>
        </select>
        <input
          type="number"
          className="input input-sm border-1 border-[#f18043] w-[50px] rounded focus:outline-0"
          value={min}
          min={22}
          max={67}
          onChange={(e) => {
            // const newMin = Number(e.target.value);
            // if (newMin <= max) {
            // }
            setMin(e.target.value);
          }}
        />
        <input
          type="number"
          className="input input-sm border-1 border-[#f18043] w-[50px] rounded focus:outline-0"
          value={max}
          min={22}
          max={67}
          onChange={(e) => {
            // const newMax = Number(e.target.value);
            // if (newMax >= min) {
            // }
            setMax(e.target.value);
          }}
        />
      </div>
      <div className="px-2 flex gap-2">
        <div>Query Fear:</div>
        <div className="text-[#f18043] backdrop-blur-lg">Min [{min}]</div>
        <div className="text-[#f18043] backdrop-blur-lg">Max [{max}]</div>
        <div className="text-[#fff200] backdrop-blur-lg">[{regionData.length}]</div>
      </div>
      <div className="flex gap-2 flex-wrap px-2 py-1 rounded border-1 border-black bg-black/80">
        <div className="flex items-center gap-2 p-2 border-1 border-white/20 rounded bg-black">
          <img src={`/Misc/Arachne.png`} alt="Unseen" className="size-10 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Arachne`}</div>
            <div className="">{(100 * (ArachneRuns / regionData.length)).toFixed(2)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-white/20 rounded bg-black">
          <img src={`/Misc/Artemis.png`} alt="Unseen" className="size-10 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Artemis`}</div>
            <div className="">{(100 * (ArtemisRuns / regionData.length)).toFixed(2)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-white/20 rounded bg-black">
          <img src={`/Misc/Athena.png`} alt="Unseen" className="size-10 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Athena`}</div>
            <div className="">{(100 * (AthenaRuns / regionData.length)).toFixed(2)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-white/20 rounded bg-black">
          <img src={`/Misc/Selene.png`} alt="Unseen" className="size-10 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Selene`}</div>
            <div className="">{(100 * (seleneRuns / regionData.length)).toFixed(2)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-white/20 rounded bg-black">
          <img src={`/Misc/Chaos.png`} alt="Unseen" className="size-10 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Chaos`}</div>
            <div className="">{(100 * (chaosRunsnoselene / regionData.length)).toFixed(2)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-white/20 rounded bg-black">
          <img src={`/Misc/Medea.png`} alt="Unseen" className="size-10 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Medea`}</div>
            <div className="">{(100 * (MedeaRuns / regionData.length)).toFixed(2)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-white/20 rounded bg-black">
          <img src={`/Misc/Hermes.png`} alt="Unseen" className="size-10 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Hermes`}</div>
            <div className="">{(100 * (HermesRuns / regionData.length)).toFixed(2)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-white/20 rounded bg-black">
          <img src={`/Misc/Dionysus.png`} alt="Unseen" className="size-10 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Dionysus`}</div>
            <div className="">{(100 * (DionysusRuns / regionData.length)).toFixed(2)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-white/20 rounded bg-black">
          <img src={`/Misc/Circe.png`} alt="Unseen" className="size-10 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Circe`}</div>
            <div className="">{(100 * (CirceRuns / regionData.length)).toFixed(2)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-white/20 rounded bg-black">
          <img src={`/Misc/Echo.png`} alt="Unseen" className="size-10 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Echo`}</div>
            <div className="">{(100 * (EchoRuns / regionData.length)).toFixed(2)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-white/20 rounded bg-black">
          <img src={`/Misc/Narcissus.png`} alt="Unseen" className="size-10 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Narcissus`}</div>
            <div className="">{(100 * (NarcissusRuns / regionData.length)).toFixed(2)}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-white/20 rounded bg-black">
          <img src={`/Misc/Icarus.png`} alt="Unseen" className="size-10 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Icarus`}</div>
            <div className="">{(100 * (IcarusRuns / regionData.length)).toFixed(2)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
