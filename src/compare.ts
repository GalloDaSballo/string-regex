import { replaceToFile } from "./file";
import { getHeadersAndScores } from "./lib";

/**
 * Remove TODO or Undefined from judging
 */
function trimExtraJudging(string: string): string {
  const trimmed = string.trim().replace("undefined", "").replace("TODO", "");

  return trimmed;
}

function makeDuplicateJudgingString(
  oldJudge: string,
  newJudge: string
): string {
  if (oldJudge.trim() === newJudge.trim()) {
    return newJudge;
  }

  return `${oldJudge} TODO: Also found: ${newJudge}\n`;
}

export function compareDataAndSaveToFile(
  data: string,
  newVal: string,
  folder: string,
  fileName: string
): void {
  const oldStuff = getHeadersAndScores(data, fileName);
  const newStuff = getHeadersAndScores(newVal, fileName);
  const newHeaders = Object.keys(newStuff);
  const oldHeaders = Object.keys(oldStuff);

  console.log("fileName", fileName);

  let toWrite = ``;

  for (let i = 0; i < newHeaders.length; i++) {
    const header = newHeaders[i];

    const index = oldHeaders.indexOf(header);

    toWrite += `- `;
    toWrite += header;
    toWrite += `\n`;

    if (index !== -1) {
      const foundJudging = oldStuff[oldHeaders[index]];
      const alreadyHasSomeJudging = trimExtraJudging(newStuff[newHeaders[i]]);

      if (alreadyHasSomeJudging !== "") {
        // Check for duplicate and avoid
        toWrite += makeDuplicateJudgingString(
          alreadyHasSomeJudging,
          foundJudging
        );
      } else {
        toWrite += `${foundJudging}`;
      }
    } else {
      const alreadyHasSomeJudging = trimExtraJudging(newStuff[newHeaders[i]]);
      if (alreadyHasSomeJudging !== "") {
        toWrite += `${alreadyHasSomeJudging}`;
      } else {
        // Not found, not already
        toWrite += `TODO`;
      }
    }

    // New line for judgment
    toWrite += `\n`;
  }

  replaceToFile(toWrite, folder, fileName);
}

export default compareDataAndSaveToFile;
