import compareDataAndSaveToFile from "./compare";
import { getData } from "./file";

// Single File Demo
const NEW_FILE_NAME = "get";
const KB_NAME = "../findings/KB-SanSolBot.MD";
const NEW_NAME = `../findings/${NEW_FILE_NAME}.MD`;
const FINDINGS_FOLDER = "findings";
const OUTPUT_NAME = `${NEW_FILE_NAME}.MD`;

if (OUTPUT_NAME.indexOf("KB") !== -1) {
  throw Error("NOPE");
}

const data = getData(KB_NAME);
const newVal = getData(NEW_NAME);

compareDataAndSaveToFile(data, newVal, FINDINGS_FOLDER, OUTPUT_NAME);
