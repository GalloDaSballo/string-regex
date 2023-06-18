const MD_REGEXES = [
  /\(#.*-\d*\)/gi, // (#MED-012)
  /\|\d*|/gi, // Ady digit in |DIGIT|
  /\|/gi, // |
  /\[.*\]/gi, // Stuff in square bracket
  /M-\d*/, // M-
  /NC-\d*/, // NC-
  /L-\d*/, // L-
  /G-\d*/, // G-
  /GO-\d*/, // GO-
  /\`/gi, // Strip all `
  /#/gi, // Strip all #
];

export const removeExtraStuffFromWord = (text: string) => {
  // Remove spaces, we add them at end
  const removedSquare = text
    .replace(MD_REGEXES[0], "")
    .replace(MD_REGEXES[1], "")
    .replace(MD_REGEXES[2], "")
    .replace(MD_REGEXES[3], "")
    .replace(MD_REGEXES[4], "")
    .replace(MD_REGEXES[5], "")
    .replace(MD_REGEXES[6], "")
    .replace(MD_REGEXES[7], "")
    .replace(MD_REGEXES[8], "")
    .replace(MD_REGEXES[9], "")
    .replace(MD_REGEXES[10], "")
    .replace(MD_REGEXES[11], "");

  const asWords = removedSquare.split(" ").filter((s) => s.length > 0);

  const withoutDots = asWords.map((word) => {
    // Remove dot if at end of word
    if (word.indexOf(".") === word.length - 1) {
      word.replace(".", "");
    }

    return word;
  });

  // Remove numbers here
  // NOTE: We remove them here because the regex to not remove 20 from ERC-20 is too annoying
  const withoutNumbers = withoutDots
    .filter((word) => {
      const isNumber = parseInt(word, 10).toString() === word; // If it's only digits this is true
      return !isNumber;
      // Remove `-`
    })
    .filter((string) => string !== "-")
    .filter((string) => string !== "/");

  const backUp = withoutNumbers.join(" ");
  return backUp;
};

export const getLines = (text: string) => {
  return text.split("\n");
};

export const removeExtraStuff = (text: string) => {
  const lineOne = getLines(text)[1];

  return removeExtraStuffFromWord(lineOne);
};

export const getHeaders = (text) => {
  const lines = getLines(text);
  const filtered = lines.filter((s) => s.length > 2);

  return filtered.map((header) => removeExtraStuffFromWord(header));
};

export const getHeadersAndScores = (text: string) => {
  const lines = getLines(text);
  const filtered = lines.filter((s) => s.length > 0);

  // Assume first line is Header
  // Second line is score
  if (filtered.length % 2 !== 0) {
    throw Error("Unbalanced Lines delete the extra lines");
  }

  const found = {};

  const length = filtered.length / 2;

  // Good
  for (let i = 0; i < length; i++) {
    const trimmedHeader = removeExtraStuffFromWord(filtered[i * 2]);
    const rating = filtered[i * 2 + 1];
    found[trimmedHeader] = rating;
  }

  return found;
};
