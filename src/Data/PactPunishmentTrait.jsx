export const allPact = [
  `Hard Labor`,
  `Lasting Consequences`,
  `Convenience Fee`,
  `Jury Summons`,
  `Extreme Measures`,
  `Calisthenics Program`,
  `Benefits Package`,
  `Middle Management`,
  `Underworld Customs`,
  `Forced Overtime`,
  `Heightened Security`,
  `Routine Inspection`,
  `Damage Control`,
  `Approval Process`,
  `Tight Deadline`,
  `Personal Liability`,
];

export const pactArray = (pact) => {
  switch (pact) {
    case `Hard Labor`:
      return [0, 1, 2, 3, 4, 5];
    case `Lasting Consequences`:
      return [0, 1, 2, 3, 4];
    case `Convenience Fee`:
      return [0, 1, 2];
    case `Jury Summons`:
      return [0, 1, 2, 3];
    case `Extreme Measures`:
      return [0, 1, 3, 6, 10];
    case `Calisthenics Program`:
      return [0, 1, 2];
    case `Benefits Package`:
      return [0, 2, 5];
    case `Middle Management`:
      return [0, 2];
    case `Underworld Customs`:
      return [0, 2];
    case `Forced Overtime`:
      return [0, 3, 6];
    case `Heightened Security`:
      return [0, 1];
    case `Routine Inspection`:
      return [0, 2, 4, 6, 8];
    case `Damage Control`:
      return [0, 1, 2];
    case `Approval Process`:
      return [0, 2, 5];
    case `Tight Deadline`:
      return [0, 1, 3, 6];
    case `Personal Liability`:
      return [0, 1];
  }
};

export const definePact = (pact) => {
  switch (pact) {
    case `Hard Labor`:
      return {
        d: `All foes deal bonus damage, +20% per rank.`,
        rank: [`+20% damage`, `+40% damage`, `+60% damage`, `+80% damage`, `+100% damage`],
      };
    case `Lasting Consequences`:
      return {
        d: `Any Health effects restore less of your Life Total than usual, -25% per rank.`,
        rank: [`-25% recovery`, `-50% recovery`, `-75% recovery`, `-100% recovery`],
      };
    case `Convenience Fee`:
      return {
        d: `All Obols prices are higher, +40% per rank.`,
        rank: [`+40% cost`, `+80% cost`],
      };
    case `Jury Summons`:
      return {
        d: `Foes in standard Encounters appear in greater numbers, +20% per rank.`,
        rank: [`+20% more`, `+40% more`, `+60% more`],
      };
    case `Extreme Measures`:
      return {
        d: `Each Underworld region's Bosses gain new techniques, 1 region per rank (Tartarus first).`,
        rank: [`Megaera / Alecto / Tisiphone`, `Bone Hydra`, `Theseus & Asterius`, `Hades`],
      };
    case `Calisthenics Program`:
      return {
        d: `All foes have higher Life Totals, +15% Health per rank.`,
        rank: [`+15% health`, `+30% health`],
      };
    case `Benefits Package`:
      return {
        d: `Most Armored foes have Perks (dangerous traits that vary per Encounter), +1 per rank.`,
        rank: [`+2`, `+3`],
      };
    case `Middle Management`:
      return {
        d: `Each Mini-boss Encounter contains +1 Armored foe (or some additional problem).`,
        rank: [`+1`],
      };
    case `Underworld Customs`:
      return {
        d: `The exit to each Underworld region requires you to purge 1 Boon to unlock it.`,
        rank: [`+1`],
      };
    case `Forced Overtime`:
      return {
        d: `All foes have bonus move speed and attack speed, +20% per rank.`,
        rank: [`+20% speed`, `+40% speed`],
      };
    case `Heightened Security`:
      return {
        d: `All Traps and Magma deal +400% bonus damage.`,
        rank: [`+400% trap damage`],
      };
    case `Routine Inspection`:
      return {
        d: `Your Talents from the Mirror of Night are deactivated (will affect the dark reflections prophecy), -3 per rank, (from the bottom up).`,
        rank: [`-3 Talent`, `-6 Talent`, `-9 Talent`, `-12 Talent`],
      };
    case `Damage Control`:
      return {
        d: `All foes have Shielded Health, making them ignore initial instances of damage, 1 hit per rank.`,
        rank: [`+1`, `+2`],
      };
    case `Approval Process`:
      return {
        d: `You have fewer choices when offered Boons, items or upgrades, -1 per rank.`,
        rank: [`-1 Choice`, `-2 Choices`],
      };
    case `Tight Deadline`:
      return {
        d: `You get 9 Min. to clear each Underworld region (or else!), reduced by -2 Min. per rank.`,
        rank: [`9 Min.`, `7 Min.`, `5 Min.`],
      };
    case `Personal Liability`:
      return {
        d: `Your Auto Defense (brief invulnerability after a burst of damage) is +100% inactive.`,
        rank: [`+100& inactive`],
      };
  }
};
