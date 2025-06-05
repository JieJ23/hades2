export const h2AspectOrder = [
  `Melinoe Staff`,
  `Circe`,
  `Momus`,
  `Melinoe Blades`,
  `Artemis`,
  `Pan`,
  `Melinoe Axe`,
  `Charon`,
  `Thanatos`,
  `Melinoe Flames`,
  `Eos`,
  `Moros`,
  `Melinoe Skull`,
  `Medea`,
  `Persephone`,
  `Melinoe Coat`,
  `Nyx`,
  `Selene`,
];

export function daysAgo(dateString) {
  const [month, day, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed
  const now = new Date();

  // Clear time parts for accurate date difference
  date.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
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
