import PageBlock from "../Block/PageBlock";
import data from "../Data/TGAresults.json";

const questions = Object.keys(data);

const tgaCategory = [
  `Best Weapon`,
  `Best Weapon Aspect`,
  `Best Core Olympian Boons`,
  `Best Unseen/Other Boons`,
  `Most Favorite Arcana Card`,
  `Most Favorite Oath Vows`,
  `Most Favorite Keepsake`,
  `Most Favorite Region`,
  `Most Favorite Biome`,
  `Most Favorite Boss Fight`,
  "Most Challenging Boss Fight",
  `Most Favorite Familiar`,
  "Most Favorite Character Voice",
  "Most Favorite Character Design",
  `Most Favorite Character`,
  `Game of the Year`,
];
const formatData = data;

const sorted = Object.fromEntries(
  Object.keys(data).map((key) => [key, Object.entries(data[key]).sort((a, b) => b[1] - a[1])]),
);

export default function TheGameAward() {
  return (
    <PageBlock>
      <div className="flex gap-8 flex-col justify-center items-center py-16">
        <div className="flex items-center gap-1">
          <img src="/Hades2.png" alt="Hades 2" className="w-[100px]" />
          <div className="text-[18px] font-[Sr]">
            <div>The</div>
            <div>Hades II</div>
            <div>Award</div>
          </div>
        </div>
        <div>A total of 1,313 votes were cast by the community.</div>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-4 text-white">
          {questions.map((item, index) => (
            <div
              className="h-[200px] w-full bg-[#0e0c12] relative p-2 flex flex-col items-center font-[Sr]"
              style={{
                borderStyle: "solid",
                borderWidth: "8px",
                borderImage: "url('/Misc/frame.webp') 70 stretch",
              }}
            >
              <img
                src="/gameplay2.webp"
                className="absolute h-full w-full top-0 right-0 opacity-25 object-cover object-center"
              />
              <div className="text-[14px] text-center">{tgaCategory[index]}.</div>
              <div className="flex flex-col items-center justify-center text-[20px] flex-1 h-full font-[Ale]">
                <div className="text-[#00ffaa]">{sorted[questions[index]][0][0]}</div>
                <div className="text-[14px]">{sorted[questions[index]][0][1]} Votes</div>
              </div>
              <div className="text-[14px] text-center font-[Ale] flex gap-1">
                <div>2nd:</div>
                <div className="text-orange-300">{sorted[questions[index]][1][0]}</div>
                <div>{sorted[questions[index]][1][1]} Votes</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageBlock>
  );
}
