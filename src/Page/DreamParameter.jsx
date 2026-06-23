import PageBlock from "../Block/PageBlock";

import { dreamData, dreamData_Name } from "../Data/Dream";

export default function DreamParameter() {
  return (
    <div>
      <PageBlock>
        <div className="text-center font-[Sr] text-[18px] text-white">Dream Dive Data</div>
        <div className="text-center mb-4 text-gray-300 text-[14px] font-[Ale]">*Mutiplier Modifiers </div>
        <section className="max-w-250 mx-auto">
          <div className="overflow-x-auto w-full my-8 mt-4 px-2">
            <table className="table whitespace-nowrap table-xs max-w-[1400px] mx-auto bg-[#0e0c12]/80 border-separate border-spacing-0.5 rounded table-pin-cols">
              <thead>
                <tr className="text-[14px] font-[Sr] text-gray-300 text-center">
                  <th className="border-0">Enemy</th>
                  <td className="border-0">Biome 1</td>
                  <td className="border-0">Biome 2</td>
                  <td className="border-0">Biome 3</td>
                  <td className="border-0">Biome 4</td>
                </tr>
              </thead>
              <tbody>
                {dreamData.map((array, index1) => (
                  <tr key={index1} className="text-[13px] md:text-[14px] font-[Ale]">
                    <th className="border-0">{dreamData_Name[index1]}</th>
                    {array.map((array2, index2) => {
                      const value = Object.entries(array2);
                      return (
                        <td key={index2} className="border-0 min-w-50 text-center">
                          {value.map((arr3, index3) => (
                            <div key={index3}>
                              <div className="flex justify-center gap-1">
                                <span
                                  className={`min-w-12 
                              ${
                                arr3[0] === `HP`
                                  ? `text-green-400`
                                  : arr3[0] === `DMG`
                                    ? `text-red-400`
                                    : arr3[0] === `GOLD`
                                      ? `text-[gold]`
                                      : arr3[0] === `SPEED`
                                        ? `text-[yellow]`
                                        : ``
                              }`}
                                >
                                  {arr3[0]}:
                                </span>
                                <span>{arr3[1]}</span>
                              </div>
                            </div>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </PageBlock>
    </div>
  );
}
