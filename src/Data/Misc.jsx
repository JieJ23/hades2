export const h2AspectOrder = [
  `Melinoe Staff`,
  `Circe`,
  `Momus`,
  `Anubis`,
  `Melinoe Blades`,
  `Artemis`,
  `Pan`,
  `Morrigan`,
  `Melinoe Axe`,
  `Charon`,
  `Thanatos`,
  `Nergal`,
  `Melinoe Flames`,
  `Eos`,
  `Moros`,
  `Supay`,
  `Melinoe Skull`,
  `Medea`,
  `Persephone`,
  `Hel`,
  `Melinoe Coat`,
  `Nyx`,
  `Selene`,
  `Shiva`,
];
export const weaponCoat = [`Melinoe Coat`, `Nyx`, `Selene`, `Shiva`];
export const weaponSkull = [`Melinoe Skull`, `Medea`, `Persephone`, `Hel`];
export const weaponFlames = [`Melinoe Flames`, `Eos`, `Moros`, `Supay`];
export const weaponAxe = [`Melinoe Axe`, `Charon`, `Thanatos`, `Nergal`];
export const weaponStaff = [`Melinoe Staff`, `Circe`, `Momus`, `Anubis`];
export const weaponBlades = [`Melinoe Blades`, `Artemis`, `Pan`, `Morrigan`];

export function daysAgo(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed
  const now = new Date();

  // Clear time parts for accurate date difference
  date.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays == 1) return "1 day";
  if (diffDays > 0 && diffDays < 30) return `${diffDays} days`;
  // if (diffDays > 30 && diffDays < 60) return `1 month ago`;
  // if (diffDays > 60) return `${Math.floor(diffDays / 30)} months ago`;
}

export function formatSentence(sentence) {
  if (!sentence) return "";

  return sentence
    .split(" ")
    .map((word) => {
      // Match optional open/close parentheses or brackets around a word
      const match = word.match(/^([\(\[])?([a-zA-Z]+)([\)\]])?$/);
      if (match) {
        const [, openSymbol, coreWord, closeSymbol] = match;
        return (
          (openSymbol || "") + coreWord.charAt(0).toUpperCase() + coreWord.slice(1).toLowerCase() + (closeSymbol || "")
        );
      }

      // Fallback: just capitalize normally
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function getYTid(text) {
  return text.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
}
export function getBilibiliid(text) {
  // Matches either BV ID or av ID
  const match = text.match(/(?:\/video\/(BV[0-9A-Za-z]+))|(?:\/video\/av(\d+))/);
  if (!match) return null;
  return match[1] || match[2]; // return BV ID if present, otherwise av ID
}

export function constantDate(dateStr) {
  const date = new Date(dateStr);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export function sToA(string) {
  const array = string.split(`,`);
  return array;
}

export function timeToDecimal(timeStr) {
  const [minutesStr, secondsStr] = timeStr.split(":");
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);

  return minutes + seconds / 60;
}

export function parseTimetoms(timeStr) {
  const [minPart, rest] = timeStr.split(":");
  const [secPart, hundredthsPart] = rest.split(".");

  const minutes = parseInt(minPart, 10);
  const seconds = parseInt(secPart, 10);
  const hundredths = parseInt(hundredthsPart.padEnd(2, "0"), 10); // Ensure 2 digits

  const totalMs = (minutes * 60 + seconds) * 100 + hundredths;
  return totalMs;
}

export function parsemstoTime(ms) {
  const totalSeconds = Math.floor(ms / 100);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hundredths = Math.floor(ms % 100); // get hundredths (2 digits)

  // Pad with leading zeros if necessary
  const minStr = String(minutes);
  const secStr = String(seconds).padStart(2, "0");
  const hundredthsStr = String(hundredths).padStart(2, "0");

  return `${minStr}:${secStr}.${hundredthsStr}`;
}

//

export function deCodeVow(base64String) {
  const match = base64String.match(/[?&]vows=([^&#]+)/);
  if (!match) {
    console.error("No 'vows' parameter found in URL.");
    return null;
  }

  try {
    const base64String = decodeURIComponent(match[1]);
    const decoded = atob(base64String);
    const parsedArray = JSON.parse(decoded);
    return parsedArray;
  } catch (e) {
    console.error("Failed to decode or parse 'vows' parameter:", e);
    return null;
  }
}

export function deCodeArcana(url) {
  const match = url.match(/[?&]deck=([^&#]+)/);
  if (!match) {
    console.error("No 'deck' parameter found in URL.");
    return null;
  }

  try {
    const base64String = decodeURIComponent(match[1]);
    const decoded = atob(base64String);
    const parsedArray = JSON.parse(decoded);
    return parsedArray;
  } catch (e) {
    console.error("Failed to decode or parse 'deck' parameter:", e);
    return null;
  }
}

export const deckMatch = {
  c1: `Sorceress`,
  c2: `Wayward`,
  c3: `Huntress`,
  c4: `Eternity`,
  c5: `Moon`,
  c6: `Furies`,
  c7: `Persistence`,
  c8: `Messenger`,
  c9: `Unseen`,
  c10: `Night`,
  c11: `Swift`,
  c12: `Death`,
  c13: `Centaur`,
  c14: `Origination`,
  c15: `Lovers`,
  c16: `Enchantress`,
  c17: `Boatman`,
  c18: `Artificer`,
  c19: `Excellence`,
  c20: `Queen`,
  c21: `Seer`,
  c22: `Champions`,
  c23: `Strength`,
  c24: `Divinity`,
  c25: `Judgment`,
};

export const findRivals = (num) => {
  switch (num) {
    case 2:
      return `Rivals 1`;
    case 5:
      return `Rivals 2`;
    case 8:
      return `Rivals 3`;
    case 12:
      return `Rivals 4`;
    default:
      return;
  }
};

export const oathMatch = [
  [0, 1, 3, 5],
  [0, 1, 2, 3],
  [0, 1, 2],
  [0, 3, 6],
  [0, 1, 2, 3],
  [0, 1, 3],
  [0, 1, 2],
  [0, 2, 5],
  [0, 1, 2, 4],
  [0, 1, 2],
  [0, 2],
  [0, 3],
  [0, 1, 3, 6],
  [0, 1, 2, 3, 5],
  [0, 1, 2],
  [0, 2],
  [0, 2, 5, 8, 12],
];

export const vowMatch = [
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

export function reduceOathData(data) {
  const result = [];

  for (let i = 0; i < 17; i++) {
    const counter = new Map();

    for (const arr of data) {
      const value = arr[i];
      counter.set(value, (counter.get(value) || 0) + 1);
    }

    const countsArray = Array.from(counter.entries()).sort((a, b) => a[0] - b[0]);
    result.push(countsArray);
  }
  return result;
}

export function sortCore(raw) {
  const customOrder = ["Attack", "Special", "Cast", "Sprint", "Magick"];

  const items = raw.split(",");

  const priority = Object.fromEntries(customOrder.map((name, i) => [name, i]));

  function sortKey(item) {
    for (const key of customOrder) {
      if (item.includes(key)) {
        return priority[key];
      }
    }
    return customOrder.length; // fallback if no match
  }

  const sortedItems = items.sort((a, b) => sortKey(a) - sortKey(b));
  return sortedItems.join(",");
}
