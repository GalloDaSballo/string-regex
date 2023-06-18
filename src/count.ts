import { getHeadersAndScores } from "./lib";
import { getData } from "./file";

// SEE BELOW
const FILE_NAME = "../findings/KB-Blackhole.MD";

// These could be customized via some sort of setting
const KEY_SCORES = ["NC", "I", "-3", "L", "R"];
const KEYS_AND_SCORES = {
  L: 5,
  R: 2,
  NC: 1,
  "-3": -3,
  I: 0,
};

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

  // NOTE: KEYS_AND_SCORES
  const count = {
    score: 0,
    L: 0,
    R: 0,
    NC: 0,
    "-3": 0,
    I: 0,
  };
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
