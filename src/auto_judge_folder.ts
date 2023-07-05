import { readdir } from "fs";
import { join, resolve } from "path";
import { compareDataAndSaveToFile } from "./compare";
import { getData } from "./file";

// Set folder
const FOLDER = "../findings";

// Set prefix to avoid counting on stuff you didn't finish
const KB_FILTER = "KB-";
const TO_JUDGE_FILTER = ""; // Empty string means all will be judged against KB
const TO_SKIP_FILTER = "DQ-";
const LOOP = true; // Should we re-judge each report to judge against each other?

const back = resolve(__dirname);
const kbPath = join(back, FOLDER);

const TEMP_OUTPUT = "findings";

// Read folder
readdir(kbPath, (err, files) => {
  console.log("kbPath", kbPath);
  console.log("files", files);
  const kbFiles = files
    .filter((file) => file.includes(KB_FILTER))
    .filter((file) => !file.includes(TO_SKIP_FILTER))
    .filter((file) => !file.includes("DS_Store"));

  const toJudgeFiles = files
    .filter((file) => file.includes(TO_JUDGE_FILTER))
    .filter((file) => !file.includes(TO_SKIP_FILTER))
    .filter((file) => !file.includes(KB_FILTER))
    .filter((file) => !file.includes("DS_Store"));

  kbFiles.forEach((kbFile) => {
    const kbFilePath = `${FOLDER}/${kbFile}`;

    toJudgeFiles.forEach((toJudge) => {
      const toJudgePath = `${FOLDER}/${toJudge}`;

      const folder = TEMP_OUTPUT;
      const fileName = `${toJudge}`;

      compareDataAndSaveToFile(
        getData(kbFilePath),
        getData(toJudgePath),
        folder,
        fileName
      );
    });
  });

  // TODO:
  // For each file judge the others
  // Do it in a circular loop
  // Which means that you end up having all reports as Base
  // And all reports as Judged
  // How to Test: Unique finding for each of them that is judged only on one
  if (LOOP) {
    // For each judge file, go from 0 to N
    // 0 -> 1, -> N
    // 1 -> 0 -> N
    // N -> 0 -> N-1
  }
});

// TODO: Create function auto judge folder
