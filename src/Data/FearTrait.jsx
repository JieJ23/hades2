export const allVows = [
  `Pain`,
  `Grit`,
  `Wards`,
  `Frenzy`,
  `Hordes`,
  `Menace`,
  `Return`,
  `Fangs`,
  `Scars`,
  `Debt`,
  `Shadow`,
  `Forfeit`,
  `Time`,
  `Void`,
  `Hubris`,
  `Denial`,
];

export const vowArray = (vow) => {
  switch (vow) {
    case `Debt`:
      return [0, 1, 2];
    case `Denial`:
      return [0, 2];
    case `Fangs`:
      return [0, 2, 5];
    case `Forfeit`:
      return [0, 3];
    case `Frenzy`:
      return [0, 3, 6];
    case `Grit`:
      return [0, 1, 2, 3];
    case `Hordes`:
      return [0, 1, 2, 3];
    case `Hubris`:
      return [0, 1, 2];
    case `Menace`:
      return [0, 1, 3];
    case `Pain`:
      return [0, 1, 3, 5];
    case `Return`:
      return [0, 1, 2];
    case `Scars`:
      return [0, 1, 2, 4];
    case `Shadow`:
      return [0, 2];
    case `Time`:
      return [0, 1, 3, 6];
    case `Void`:
      return [0, 1, 2, 3, 5];
    case `Wards`:
      return [0, 1, 2];
  }
};

export const defineArray = (vow) => {
  switch (vow) {
    case `Debt`:
      return {
        d: `All items that cost Gold are more expensive.`,
        rank: [`+40%`, `+80%`],
      };
    case `Denial`:
      return {
        d: `After you choose a Boon, unpicked blessing(s) will not appear again this night.`,
        rank: [`2`],
      };
    case `Fangs`:
      return {
        d: `Most foes with Armor also have random Perk(s).`,
        rank: [`1`, `2`],
      };
    case `Forfeit`:
      return {
        d: `The first 1 Boon(s) in each Region become Red Onion instead.`,
        rank: [`1`],
      };
    case `Frenzy`:
      return {
        d: `All foes are faster.`,
        rank: [`+20%`, `+40%`],
      };
    case `Grit`:
      return {
        d: `All foes have more Health.`,
        rank: [`+10%`, `+20%`, `+30%`],
      };
    case `Hordes`:
      return {
        d: `Most encounters have more foes.`,
        rank: [`+20%`, `+40%`, `+60%`],
      };
    case `Hubris`:
      return {
        d: `After you choose a Boon, Prime Magick for each Rarity greater than Common.`,
        rank: [`3`, `6`],
      };
    case `Menace`:
      return {
        d: `Most foes have a chance to be from the next Region (if there is one.)`,
        rank: [`+10%`, `+25%`],
      };
    case `Pain`:
      return {
        d: `All foes deal more damage.`,
        rank: [`+20%`, `+60%`, `+100%`],
      };
    case `Return`:
      return {
        d: `Most slain foes have a chance to become a Revenant.`,
        rank: [`+25%`, `+50%`],
      };
    case `Scars`:
      return {
        d: `Any Health effects are less effective.	`,
        rank: [`75%`, `60%`, `0%`],
      };
    case `Shadow`:
      return {
        d: `All Encounters with Wardens contain no fewer than certain number of Shadow Servant(s).`,
        rank: [`1`],
      };
    case `Time`:
      return {
        d: `You have certain minutes to fight through each Region (or else...).`,
        rank: [`9:00`, `7:00`, `5:00`],
      };
    case `Void`:
      return {
        d: `You have access to certain number of your Grasp for your Arcana.`,
        rank: [`60%`, `40%`, `20%`, `0%`],
      };
    case `Wards`:
      return {
        d: `All foes have Shielded Health.`,
        rank: [`1`, `2`],
      };
  }
};
