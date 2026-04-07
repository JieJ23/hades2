import Background from "../Comp/Background";
import { bundleData } from "../Data/DataBundle";
import { parseTimetoms } from "../Data/Misc";
import { h2AO } from "../Data/Misc";
import { useData } from "../Hook/DataFetch";
const familiars = [`Frog`, `Cat`, `Hound`, `Raven`, `Polecat`];

//   ["H", "He"],
//   ["Li", "Be", "B", "C", "N2", "O2", "F2", "Ne"],
//   ["Na", "Mg", "Al", "Si", "P4", "S8", "Cl2", "Ar"],
//   ["K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br2", "Kr"],
//   ["Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I2", "Xe"],
//   ["Cs", "Ba", "La", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At2", "Rn"],
//   ["Fr", "Ra", "Ac", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts2", "Og"],
//   ["Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu"],
//   ["Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr"],

const elementNumber = [
  [0, 17],
  [0, 1, 12, 13, 14, 15, 16, 17],
  [0, 1, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
];

export default function PeriodicTable() {
  const { posts, loader } = useData();

  const orderData = [...bundleData, ...(posts || [])]
    .filter((obj) => obj.des && obj.des.includes(`#usum`))
    .sort((a, b) => {
      const feaDiff = +b.fea - +a.fea;
      if (feaDiff !== 0) return feaDiff;
      return parseTimetoms(a.tim) - parseTimetoms(b.tim);
    });

  const underworld = orderData.filter((obj) => obj.loc === "Underworld");
  const surface = orderData.filter((obj) => obj.loc === "Surface");
  const underworld67 = underworld.filter((obj) => obj.fea == 67);
  const surface67 = surface.filter((obj) => obj.fea == 67);
  const just67 = orderData.filter((obj) => obj.fea == 67);

  const seen = new Set();

  const result = just67.filter((item) => {
    if (seen.has(item.nam)) {
      return false;
    }
    seen.add(item.nam);
    return true;
  });
  console.log(result);
  const unique67s = [...new Set(surface67.map((obj) => obj.asp))].length;
  const unique67uw = [...new Set(underworld67.map((obj) => obj.asp))].length;
  const fastUW = [];
  const fastSurface = [];
  const highUW = [];
  const highSurface = [];
  const fam = [];

  for (let i = 0; i < familiars.length; i++) {
    const target = orderData.find((obj) => obj.fam === familiars[i]) ?? {};
    fam.push(target);
  }

  for (let i = 0; i < h2AO.length; i++) {
    const targetUW = underworld67.find((obj) => obj.asp === h2AO[i]) ?? {};
    highUW.push(targetUW);
    const targetSurface = surface67.find((obj) => obj.asp === h2AO[i]) ?? {};
    highSurface.push(targetSurface);
  }
  for (let i = 50; i <= 67; i++) {
    const targetUW = underworld.find((obj) => obj.fea == i) ?? {};
    fastUW.push(targetUW);
    const targetSurface = surface.find((obj) => obj.fea == i) ?? {};
    fastSurface.push(targetSurface);
  }
  const elementArray = [
    [...fam.slice(0, 1), { num: unique67s + unique67uw }],
    [...fam.slice(1, 3), ...fastSurface.slice(0, 6)],
    [...fam.slice(3), ...fastSurface.slice(6, 12)],
    [...highUW.slice(0, 6), ...highSurface.slice(0, 6), ...fastSurface.slice(12)],
    [...highUW.slice(6, 12), ...highSurface.slice(6, 12), ...fastUW.slice(0, 6)],
    [...highUW.slice(12, 18), ...highSurface.slice(12, 18), ...fastUW.slice(6, 12)],
    [...highUW.slice(18), ...highSurface.slice(18), ...fastUW.slice(12)],
    [...result.slice(0, 14)],
    [...result.slice(14)],
  ];

  return (
    <div className="h-full min-h-lvh flex items-center relative overflow-hidden text-[13px] md:text-[14px] font-[Ubuntu] select-none">
      <Background />
      <div className="overflow-auto max-w-[1600px] mx-auto my-4 px-2">
        <table className="table border-separate border-spacing-0.5 text-center text-[12px] font-[Ubuntu]">
          <tbody>
            {elementArray.map((ite, index1) => {
              const emptyArray = new Array(18).fill("");
              for (let i = 0; i < ite.length; i++) {
                emptyArray.splice(elementNumber[index1][i], 1, ite[i]);
              }
              return (
                <tr>
                  {emptyArray.map((ite, index2) => (
                    <td
                      className={`p-0 min-w-20 h-20 max-w-20 relative rounded-sm
                        ${ite !== "" && index1 == 0 && index2 === 17 && `bg-[#00ffaa]/80 text-black`}
                        ${ite !== "" && index1 < 3 && index2 < 2 && `bg-[#202aaf]/80`}
                        ${ite !== "" && index2 >= 0 && index2 <= 5 && index1 > 2 && index1 < 7 && `bg-[#41277c]/80`}
                        ${ite !== "" && index2 >= 6 && index2 <= 11 && index1 > 2 && index1 < 7 && `bg-[#2c277c]/80`}
                        ${ite !== "" && index2 >= 12 && index1 > 3 && index1 < 7 && `bg-[#7c2760]/80`}
                        ${ite !== "" && index2 >= 12 && index1 > 0 && index1 < 4 && `bg-[#701631]/80`}
                        ${ite !== "" && index1 === 7 && `bg-[#0d5166]/80`}
                        ${ite !== "" && index1 === 8 && `bg-[#0d5166]/80`}
                        ${ite !== "" ? `border-black/60 border-1` : `border-none`}
                        `}
                    >
                      <div className="w-ful h-full flex flex-col items-center justify-center break-words p-2">
                        <div className="text-black text-[12px] whitespace-pre-wrap">
                          {ite.num &&
                            `${ite.num}/48 
Max Fear`}
                        </div>
                        {ite !== "" && index1 >= 3 && index1 < 7 && index2 < 12 && (
                          <>
                            <div className="text-[11px] text-gray-400">{ite.asp}</div>
                            <div className="text-gray-300 overflow-ellipsis text-[11px]">{ite.nam}</div>
                            <div className="text-[11px] text-gray-400">{ite.tim}</div>
                          </>
                        )}
                        {ite !== "" && index1 >= 1 && index1 < 7 && index2 >= 12 && (
                          <div className="text-[11px] text-gray-400">
                            <>
                              {ite.fea}
                              <div className="text-gray-300 overflow-ellipsis text-[11px]">{ite.nam}</div>
                              {ite.tim}
                            </>
                          </div>
                        )}
                        {ite !== "" && index1 < 3 && index2 < 2 && (
                          <>
                            <div className="text-[11px] text-gray-400">{ite.fea}</div>
                            <div className="text-gray-300 overflow-ellipsis text-[11px]">{ite.nam}</div>
                            <div className="text-[11px] text-gray-400">{ite.fam}</div>
                            <div className="text-[11px] text-gray-400">{ite.tim}</div>
                          </>
                        )}
                        {ite !== "" && index1 >= 7 && (
                          <div className="text-[11px] text-gray-400">
                            <>
                              {ite.asp}
                              <div className="text-gray-300 overflow-ellipsis text-[11px]">{ite.nam}</div>
                              {ite.tim}
                            </>
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="my-8">
          <div className="flex gap-2 flex-wrap justify-center">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-xs bg-[#00ffaa]" />
              <div>Aspects/Region Conquered</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-xs bg-[#202aaf]" />
              <div>Familiar's Peak</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-xs bg-[#41277c]" />
              <div>UW Aspect Peak</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-xs bg-[#2c277c]" />
              <div>Surface Aspect Peak</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-xs bg-[#7c2760]" />
              <div>UW Speedrun 50-67</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-xs bg-[#701631]" />
              <div>Surface Speedrun 50-67</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-xs bg-[#0d5166]" />
              <div>True Melinoë</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
