export const allCards = [
  `c1`,
  `c2`,
  `c3`,
  `c4`,
  `c5`,
  `c6`,
  `c7`,
  `c8`,
  `c9`,
  `c10`,
  `c11`,
  `c12`,
  `c13`,
  `c14`,
  `c15`,
  `c16`,
  `c17`,
  `c18`,
  `c19`,
  `c20`,
  `c21`,
  `c22`,
  `c23`,
  `c24`,
  `c25`,
];

export const defineDeck = (num) => {
  switch (num) {
    case `c1`:
      return {
        card: `I - The Sorceress`,
        d: `Your Omega Moves are 30% Faster.`,
        g: 1,
      };
    case `c2`:
      return {
        card: `II - The Wayward Son`,
        d: `After you exit a Location, restore 5 Health.`,
        g: 1,
      };
    case `c3`:
      return {
        card: `III - The Huntress`,
        d: `While you have less than 100% Magick your Attack and Special deal +50% damage.`,
        g: 2,
      };
    case `c4`:
      return {
        card: `IV - Eternity`,
        d: `While you Channel your Omega Moves, everything moves slower for 1.2 Sec.`,
        g: 3,
      };
    case `c5`:
      return {
        card: `V - The Moon`,
        d: `Your Hex also charges up automatically as though you used 3 Magick every 1 Sec.`,
        g: 0,
      };
    case `c6`:
      return {
        card: `VI - The Furies`,
        d: `You deal +30% damage to foes in your Casts.`,
        g: 2,
      };
    case `c7`:
      return {
        card: `VII - Persistence`,
        d: `You have +40 Max Life and Max Magick.`,
        g: 2,
      };
    case `c8`:
      return {
        card: `VIII - The Messenger`,
        d: `Your Casts momentarily make you Impervious and move 70% faster.`,
        g: 1,
      };
    case `c9`:
      return {
        card: `IX - The Unseen`,
        d: `You restore 10 Magick every 1 Sec.`,
        g: 5,
      };
    case `c10`:
      return {
        card: `X - Night`,
        d: `You have +15% chance to deal Critical damage with each move in an Omega Combo.`,
        g: 2,
      };
    case `c11`:
      return {
        card: `XI - The Swift Runner`,
        d: `Your Sprint is 10% faster and lets you pass right through most dangers in your way.`,
        g: 1,
      };
    case `c12`:
      return {
        card: `XII - Death`,
        d: `You have +3 Death Defiance.`,
        g: 4,
      };
    case `c13`:
      return {
        card: `XIII - The Centaur`,
        d: `You have +5 Max Life and +5 Max Magick whenever you pass through 5 Locations.`,
        g: 0,
      };
    case `c14`:
      return {
        card: `XIV - Origination`,
        d: `You deal +50% damage to foes with at least 2 Curses from different Olympians.`,
        g: 5,
      };
    case `c15`:
      return {
        card: `XV - The Lovers`,
        d: `You take 0 damage the first 3 time(s) you are hit in Guardian Encounters.`,
        g: 3,
      };
    case `c16`:
      return {
        card: `XVI - The Enchantress`,
        d: `You have +3 Change of Fate, and can alter Location Rewards.`,
        g: 3,
      };
    case `c17`:
      return {
        card: `XVII - The Boatman`,
        d: `You have +300 Gold Crowns.`,
        g: 5,
      };
    case `c18`:
      return {
        card: `XVIII - The Artificer`,
        d: `You have 3 chance(s) this night to turn any Minor Find into a random Major Find.`,
        g: 3,
      };
    case `c19`:
      return {
        card: `XIX - Excellence`,
        d: `Any Boons you are offered have +50% chance to include Legendary or at least Rare blessings.`,
        g: 5,
      };
    case `c20`:
      return {
        card: `XX - The Queen`,
        d: `Any Boons you are offered have a +10% chance to include Duo blessings.`,
        g: 0,
      };
    case `c21`:
      return {
        card: `XXI - The Seer`,
        d: `You have +4 Change of Fate.`,
        g: 0,
      };
    case `c22`:
      return {
        card: `XXII - The Champions`,
        d: `You have +3 Change of Fate, and can alter Boons and certain other choices.`,
        g: 4,
      };
    case `c23`:
      return {
        card: `XXIII - Strength`,
        d: `While you have no Death Defiance effects, you take -40% damage and deal +20%.`,
        g: 4,
      };
    case `c24`:
      return {
        card: `XXIV - Divinity`,
        d: `Any Boons you are offered have a +15% chance to be improved to Epic.`,
        g: 0,
      };
    case `c25`:
      return {
        card: `XXV - Judgment`,
        d: `You activate 5 random inactive Arcana Cards whenever you vanquish a Guardian.`,
        g: 0,
      };
  }
};
