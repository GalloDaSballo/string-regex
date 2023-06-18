import { readdir } from "fs";
import { join, resolve } from "path";
import { json2csv } from "json-2-csv";

import { countFromFileName } from "./count";
import { replaceToFile } from "./file";

/** Run this script with yarn folder */

// Set folder
const FOLDER_TO_COUNT = "auto-judged";
const CSV_FOLDER = "csv-score";

// Set prefix to avoid counting on stuff you didn't finish
const PREFIX_FILTER = "DQ-";

const back = resolve(__dirname);
const path = join(back, `../${FOLDER_TO_COUNT}`);

const res = [];

async function addToCSV(data) {
  const csv = await json2csv(data);

  replaceToFile(csv, CSV_FOLDER, `${new Date()}.csv`);
}

// Read folder
readdir(path, (err, files) => {
  files.forEach((file) => {
    // Read file here
    if (file.includes(PREFIX_FILTER)) {
      // Skip those
      return;
    }

    const filePath = `../${FOLDER_TO_COUNT}/${file}`;
    console.log("filePath", filePath);

    const score = countFromFileName(filePath);
    const scoreWithName = {
      name: file.replace("MD", "").replace("md", "").replace(".", ""),
      ...score,
    };
    res.push(scoreWithName);
    console.log(file, scoreWithName);
  });

  addToCSV(res);
});

// TODO: Create function autoCountFoldrer
