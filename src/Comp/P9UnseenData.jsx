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
import { p9data } from "../Data/P9Data";
import { sToA } from "../Data/Misc";
//
const seleneRuns = p9data.filter((obj) => obj.sel === `t`).length;
const chaosRunsnoselene = p9data
  .filter((obj) => obj.cha !== "")
  .filter((obj) => sToA(obj.cha).some((chaItem) => Object.values(p9chaos).includes(chaItem))).length;
const AthenaRuns = p9data.filter((obj) => sToA(obj.mis).some((item) => Object.values(p9athena).includes(item))).length;
const HermesRuns = p9data.filter((obj) => sToA(obj.mis).some((item) => Object.values(p9hermes).includes(item))).length;
const ArtemisRuns = p9data.filter((obj) =>
  sToA(obj.mis).some((item) => Object.values(p9artemis).includes(item))
).length;
const ArachneRuns = p9data.filter((obj) =>
  sToA(obj.mis).some((item) => Object.values(p9arachne).includes(item))
).length;
const DionysusRuns = p9data.filter((obj) => sToA(obj.mis).some((item) => Object.values(p9dion).includes(item))).length;
const MedeaRuns = p9data.filter((obj) => sToA(obj.mis).some((item) => Object.values(p9medea).includes(item))).length;
const CirceRuns = p9data.filter((obj) => sToA(obj.mis).some((item) => Object.values(p9circe).includes(item))).length;
const EchoRuns = p9data.filter((obj) => sToA(obj.mis).some((item) => Object.values(p9echo).includes(item))).length;
const NarcissusRuns = p9data.filter((obj) => sToA(obj.mis).some((item) => Object.values(p9nar).includes(item))).length;
const IcarusRuns = p9data.filter((obj) => sToA(obj.mis).some((item) => Object.values(p9icarus).includes(item))).length;
//

export default function P9Unseen() {
  return (
    <div className="max-w-[1200px] text-[12px] mx-auto my-2 font-[PT] text-white">
      <div className="px-2 text-[#fff200]">Encounter</div>
      <div className="rounded border-1 border-black bg-black/80 flex gap-2 flex-wrap p-2">
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-[#00ffaa] rounded bg-black">
          <img src={`/Misc/Arachne.png`} alt="Unseen" className="size-12 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Arachne`}</div>
            <div className="">{Math.round(100 * (ArachneRuns / p9data.length))}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-[#00ffaa] rounded bg-black">
          <img src={`/Misc/Artemis.png`} alt="Unseen" className="size-12 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Artemis`}</div>
            <div className="">{Math.round(100 * (ArtemisRuns / p9data.length))}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-[#00ffaa] rounded bg-black">
          <img src={`/Misc/Athena.png`} alt="Unseen" className="size-12 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Athena`}</div>
            <div className="">{Math.round(100 * (AthenaRuns / p9data.length))}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-[#00ffaa] rounded bg-black">
          <img src={`/Misc/Selene.png`} alt="Unseen" className="size-12 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Selene`}</div>
            <div className="">{Math.round(100 * (seleneRuns / p9data.length))}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-[#00ffaa] rounded bg-black">
          <img src={`/Misc/Chaos.png`} alt="Unseen" className="size-12 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Chaos`}</div>
            <div className="">{Math.round(100 * (chaosRunsnoselene / p9data.length))}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-[#00ffaa] rounded bg-black">
          <img src={`/Misc/Medea.png`} alt="Unseen" className="size-12 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Medea`}</div>
            <div className="">{Math.round(100 * (MedeaRuns / p9data.length))}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-[#00ffaa] rounded bg-black">
          <img src={`/Misc/Hermes.png`} alt="Unseen" className="size-12 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Hermes`}</div>
            <div className="">{Math.round(100 * (HermesRuns / p9data.length))}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-[#00ffaa] rounded bg-black">
          <img src={`/Misc/Dionysus.png`} alt="Unseen" className="size-12 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Dionysus`}</div>
            <div className="">{Math.round(100 * (DionysusRuns / p9data.length))}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-[#00ffaa] rounded bg-black">
          <img src={`/Misc/Circe.png`} alt="Unseen" className="size-12 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Circe`}</div>
            <div className="">{Math.round(100 * (CirceRuns / p9data.length))}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-[#00ffaa] rounded bg-black">
          <img src={`/Misc/Echo.png`} alt="Unseen" className="size-12 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Echo`}</div>
            <div className="">{Math.round(100 * (EchoRuns / p9data.length))}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-[#00ffaa] rounded bg-black">
          <img src={`/Misc/Narcissus.png`} alt="Unseen" className="size-12 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Narcissus`}</div>
            <div className="">{Math.round(100 * (NarcissusRuns / p9data.length))}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border-1 border-[#00ffaa] rounded bg-black">
          <img src={`/Misc/Icarus.png`} alt="Unseen" className="size-12 rounded" />
          <div>
            <div className="whitespace-pre-line text-center">{`Icarus`}</div>
            <div className="">{Math.round(100 * (IcarusRuns / p9data.length))}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
