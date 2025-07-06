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

  const totalMs = (minutes * 60 + seconds) * 100 + hundredths * 10;
  return totalMs;
}

export function parsemstoTime(ms) {
  const totalSeconds = Math.floor(ms / 100);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hundredths = Math.floor((ms % 100) / 10); // get hundredths (2 digits)

  // Pad with leading zeros if necessary
  const minStr = String(minutes).padStart(2, "0");
  const secStr = String(seconds).padStart(2, "0");
  const hundredthsStr = String(hundredths).padStart(2, "0");

  return `${minStr}:${secStr}.${hundredthsStr}`;
}

//
