import { h2AspectOrder } from "./Misc";

const weapons = [
  "Descura / Witch's Staff",
  "Lim and Oros / Sister Blades",
  "Ygnium / Umbral Flames",
  "Zorephet / Moonstone Axe",
  "Revaal / Argent Skull",
  "Xinth / Black Coat",
];
const regions = [`Underworld`, `Surface`];
const biome = [`Erebus`, `Oceanus`, `Fields`, `Tartarus`, `Ephyra`, `Thessaly`, `Olympus`, `Summit`];
const familiar = [`Frinos`, `Toula`, `Raki`, `Hecuba`, `Gale`];
const bosses = [`Hecate`, `Scylla`, `Cerberus`, `Chronos`, `Polyphemus`, `Eris`, `Prometheus`, `Typhon`];
const keepsakes = [
  `Silver Wheel`,
  `Knuckle Bones`,
  `Luckier Tooth`,
  `Ghost Onion`,
  `Evil Eye`,
  `Engraved Pin`,
  `Discordant Bell`,
  `Gold Purse`,
  `Metallic Droplet`,
  `White Antler`,
  `Moon Beam`,
  `Cloud Bangle`,
  `Iridescent Fan`,
  `Vivid Sea`,
  `Barley Sheaf`,
  `Harmonic Photon`,
  `Beautiful Mirror`,
  `Adamant Shard`,
  `Everlasting Ember`,
  `Lion Fang`,
  `Blackened Fleece`,
  `Crystal Figurine`,
  `Silken Sash`,
  `Aromatic Phial`,
  `Concave Stone`,
  `Experimental Hammer`,
  `Transcendent Embryo`,
  `Sword Hilt`,
  `Gorgon Amulet`,
  `Fig Leaf`,
  `Calling Card`,
  `Jeweled Pom`,
  `Time Piece`,
];
const vows = [
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
  `Rivals`,
];
const arcana = [
  `Sorceress`,
  `Wayward`,
  `Huntress`,
  `Eternity`,
  `Moon`,
  `Furies`,
  `Persistence`,
  `Messenger`,
  `Unseen`,
  `Night`,
  `Swift`,
  `Death`,
  `Centaur`,
  `Origination`,
  `Lovers`,
  `Enchantress`,
  `Boatman`,
  `Artificer`,
  `Excellence`,
  `Queen`,
  `Fates`,
  `Champions`,
  `Strength`,
  `Divinity`,
  `Judgment`,
];
const gameAwards = [`Hades II`, `Hades II`, `Hades II`, `Hades II`];

const Olympians = [`Aphrodite`, `Apollo`, `Ares`, `Demeter`, `Hephaestus`, `Hera`, `Hestia`, `Poseidon`, `Zeus`].sort();

const Unseen = [
  `Athena`,
  `Artemis`,
  `Circe`,
  `Medea`,
  `Icarus`,
  `Dionysus`,
  `Hades`,
  `Arachne`,
  `Narcissus`,
  `Echo`,
  `Chaos`,
  `Selene`,
].sort();

const otherCharacters = [
  `Melinoe`,
  `Moros`,
  `Nemesis`,
  `Dora`,
  `Odysseus`,
  `Heracles`,
  `Schelemeus`,
  `Hypnos`,
  `Charon`,
  `Zagreus`,
  `Persephone`,
  `Nyx`,
].sort();

const allCharacters = [...bosses, ...otherCharacters, ...Olympians, ...Unseen].sort();

export const tga_categories = [
  {
    qa: `Best Weapon`,
    option: weapons,
  },
  {
    qa: `Best Weapon Aspect`,
    option: h2AspectOrder,
  },
  {
    qa: `Best Core Olympian Boons`,
    option: Olympians,
  },
  {
    qa: `Best Unseen/Other Boons`,
    option: Unseen,
  },
  //
  {
    qa: `Most Favorite Arcana Card`,
    option: arcana,
  },
  {
    qa: `Most Favorite Oath Vows`,
    option: vows,
  },
  {
    qa: `Most Favorite Keepsake`,
    option: keepsakes,
  },
  {
    qa: `Most Favorite Region`,
    option: regions,
  },
  {
    qa: `Most Favorite Biome`,
    option: biome,
  },
  {
    qa: `Most Favorite Boss Fight`,
    option: bosses,
  },
  {
    qa: "Most Challenging Boss Fight",
    option: bosses,
  },
  {
    qa: `Most Favorite Familiar`,
    option: familiar,
  },
  {
    qa: "Most Favorite Character Voice",
    option: allCharacters,
  },
  {
    qa: "Most Favorite Character Design",
    option: allCharacters,
  },
  {
    qa: `Most Favorite Character`,
    option: allCharacters,
  },
  {
    qa: `Game of the Year`,
    option: gameAwards,
  },
];
