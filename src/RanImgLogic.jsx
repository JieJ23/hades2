export const randomImg = [
  "Aphrodite",
  "Apollo",
  "Ares",
  "Artemis",
  "Athena",
  "Demeter",
  "Dionysus",
  "Hephaestus",
  "Hera",
  "Hermes",
  "Hestia",
  "Poseidon",
  "Zeus",
  "Chronos",
];

export function getRandomString(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const imgTextStore = (img) => {
  switch (img) {
    case "Aphrodite":
      return [
        "We're in this together, sweetness, and don't you forget it, hm?",
        "You missed me, didn't you?",
        "Why hello, beautiful! And may my sweetest blessing be with you.",
      ];
    case "Apollo":
      return [
        "Let's show them a dazzling display they won't soon forget.",
        "Your foes won't so much as touch you once we dazzle them a bit.",
        "You're brilliant without my light, though here's a little just in case.",
      ];
    case "Ares":
      return [
        "Bitter wars are sometimes waged for less; really over nothing much at all.",
        "My other kin also at times brush me aside, and look where that got them.",
        "Perhaps this was a mere misunderstanding, though I tend to presume malicious intent.",
      ];
    case "Artemis":
      return [
        "They won't know what hit them.",
        "Go cut that wretched Titan down to size for me, would you?",
        "Another night, another duty for the Silver Sisters.",
      ];
    case "Athena":
      return ["In the name of Zeus!", "Our family's counting on us.", "To the next battle."];
    case "Demeter":
      return [
        "Had you grown up within your father's house, you would have learned respect.",
        "You would forsake my blessing, even knowing it is sought after all the world over?",
        "If this was your attempt at humor, know that it was lost on me entirely.",
      ];
    case "Dionysus":
      return [
        "Come, everybody loosen up, what's gotten into you?",
        "No use fighting the inevitable when you're thirsty, yeah?",
        "You're welcome back here anytime!",
      ];
    case "Hephaestus":
      return ["Just what you wanted, right?", "Made to order!", "Let's get to work!"];
    case "Hera":
      return [
        "A blessing for you, and a curse for our enemies, my dear.",
        "We've so many enemies, I cannot curse them all! Though I can bless you.",
        "Show no weakness, show no mercy, girl.",
      ];
    case "Hermes":
      return [
        "Want to make haste, then I got just the thing!",
        "Special delivery for the Princess of the Underworld!",
        "Things don't look great right now, but that can quickly change!",
      ];
    case "Hestia":
      return [
        "Here I was trying to lend a helping hand, but no! Somebody's always getting in my way. Well I won't have it!",
        "Gave up the Boon of Hestia, did ya? Well then how about a quick reminder of the proper way to make a sacrifice!",
        ,
        "Don't want my blessings while they're good and hot, do ya? Then this ought to warm you up in the meantime.",
      ];
    case "Poseidon":
      return [
        "I owe your father for his generosity. But since he's gone, I'll pay you back instead!",
        "Even the mortals know the sea is bountiful, yet also capable of deadly force!",
        "You have the power of the seas right at your beck and call!",
      ];
    case "Zeus":
      return [
        "All those who stand against Olympus shall be summarily struck down.",
        "Our enemies will soon be in for quite the shock, I think!",
        "We didn't come to rule this world by underestimating enemies, my niece.",
      ];
    case "Chronos":
      return [
        "You waste what precious time remains to you.",
        "How very spirited! You truly think you can stop Time. Well, then... I would like to see you try.",
        "This night shall not go quite as well as you expect.",
      ];
    default:
      return [`Default`];
  }
};
