import fs from "fs";
import path from "path";
import Papa from "papaparse";

export type SightingRow = {
  Date: string;
  Hour: string;
  Value: string;
  MonthBlock: string;
  IsCancelled: string;
  IsPrivate: string;
};

export async function loadSightings() {

  const filePath = path.join(
    process.cwd(),
    "public",
    "Whale Watching sightings 2025 classic.csv"
  );

  const csvFile = fs.readFileSync(filePath, "utf8");

  const parsed = Papa.parse<SightingRow>(csvFile, {
    header: true,
    skipEmptyLines: true
  });

  return parsed.data;

}