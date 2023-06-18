import { getHeadersAndScores } from "./lib";
import { getData } from "./file";

// SEE BELOW
const FILE_NAME = "../findings/KB-Blackhole.MD";

// These could be customized via some sort of setting

const KEYS_AND_SCORES = {
  L: 5,
  R: 2,
  NC: 1,
  "-3": -3,
  I: 0,
  // TODO: BIAS MODE, a mode where you could use some other judging to auto-judge statistically
  // SEE https://github.com/code-423n4/org/issues/103
  TODO: 0, // TODO: remove or you will think you're done when you are not
};

// Store all keys in an array as strings so we can find them them via `getKeyScore`
const KEY_SCORES = Object.keys(KEYS_AND_SCORES).map((key) => String(key));

export const getKeyScore = (key: string) => {
  for (let i = 0; i < KEY_SCORES.length; i++) {
    if (key.includes(KEY_SCORES[i])) {
      return KEY_SCORES[i];
    }
  }

  throw Error(`No match for ${key}`);
};

export const countFromFileName = (fileName: string) => {
  const data = getData(fileName);
  const headersAndScores = getHeadersAndScores(data);

  const count = {
    score: 0,
  };
  Object.keys(KEYS_AND_SCORES).forEach((key) => {
    count[key] = 0; // Declare keys in count
  });

  Object.keys(headersAndScores).forEach((key) => {
    const score = headersAndScores[key];
    const matchingKeyScores = getKeyScore(score);

    count[matchingKeyScores] =
      count[matchingKeyScores] !== undefined ? count[matchingKeyScores] + 1 : 1;

    count.score += KEYS_AND_SCORES[matchingKeyScores];
  });

  return count;
};

console.log("Count", countFromFileName(FILE_NAME));
