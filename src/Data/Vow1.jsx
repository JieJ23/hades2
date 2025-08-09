export const vowid = {
  Pain: 1,
  Grit: 2,
  Wards: 3,
  Frenzy: 4,
  Hordes: 5,
  Menace: 6,
  Return: 7,
  Fangs: 8,
  Scars: 9,
  Debt: 10,
  Shadow: 11,
  Forfeit: 12,
  Time: 13,
  Void: 14,
  Hubris: 15,
  Denial: 16,
  Rivals: 17,
};

export const idvow = Object.fromEntries(Object.entries(vowid).map(([key, value]) => [value, key]));
