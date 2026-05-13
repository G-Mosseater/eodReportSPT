import { SightingRow } from "./loadSightings";

export const SPECIES = [
  "M",
  "M!",
  "H",
  "H!",
  "WBD",
  "P",
  "O",
  "F",
  "S",
  "G",
  "BS",
  "L",
  "C",
];
export const SPECIES_COLORS: Record<string, string> = {
  M: "#2F6F9F",
  "M!": "#0B2D4D",

  H: "#F28E2B",
  "H!": "#C85A00",

  WBD: "#1B9E77",
  P: "#66C2A5",

  O: "#D95F02",
  F: "#7570B3",
  S: "#8C510A",
  G: "#E6AB02",

  BS: "#666666",
  L: "#2C7FB8",
  C: "#F781BF",
};

export const SPECIES_LABELS: Record<string, string> = {
  M: "Minke",
  "M!": "Breaching Minke",
  H: "Humpback",
  "H!": "Breaching Humpback",
  WBD: "Dolphin",
  P: "Harbor Porpoise",
  O: "Orca",
  F: "Fin Whale",
  S: "Sei Whale",
  G: "Pilot Whale",
  BS: "Basking Shark",
  L: "Seals",
  C: "Common Dolphin",
};

export function aggregateSightings(data: SightingRow[]) {
  const grouped: Record<string, Record<number, number>> = {};
  const speciesTotals: Record<string, number> = {};
  SPECIES.forEach((s) => {
    speciesTotals[s] = 0;
  });
  const tourEvents: Record<
    string,
    {
      cancelled: number;
      private: number;
    }
  > = {};

  SPECIES.forEach((s) => {
    grouped[s] = {};
  });

  data.forEach((row) => {
    const date = row.Date;
    const month = Number(row.MonthBlock);
    const value = row.Value?.trim();

    if (!tourEvents[date]) {
      tourEvents[date] = {
        cancelled: 0,
        private: 0,
      };
    }

    if (value === "CANCELLED") {
      tourEvents[date].cancelled++;
      return;
    }

    if (value === "PRIVATE") {
      tourEvents[date].private++;
      return;
    }

    if (!SPECIES.includes(value)) return;

    grouped[value][month] = (grouped[value][month] || 0) + 1;
    speciesTotals[value]++;
  });

  const months = [...new Set(data.map((row) => Number(row.MonthBlock)))].sort(
    (a, b) => a - b,
  );

  // const cancelledPrivateData = Object.entries(tourEvents).map(
  //   ([date, values]) => ({
  //     date,
  //     cancelled: values.cancelled,
  //     private: values.private,
  //   }),
  // );

  const totalSightings = data.filter(
    (row) => row.Value !== "CANCELLED" && row.Value !== "PRIVATE",
  ).length;

  const totalCancelled = data.filter((row) => row.Value === "CANCELLED").length;

  const totalPrivate = data.filter((row) => row.Value === "PRIVATE").length;

  const breachingEvents = data.filter(
    (row) => row.Value === "H!" || row.Value === "M!",
  ).length;
  const endurkoma = data.filter((row) => row.Value === "EK").length;
  
  const ranking = SPECIES.map((species) => ({
    species,
    count: speciesTotals[species] || 0,
  })).sort((a, b) => b.count - a.count);

  const series = SPECIES.map((species) => ({
    name: SPECIES_LABELS[species] || species,
    type: "bar",
    species,
    stack: "species",
    data: months.map((month) => grouped[species][month] || 0),
  }));

  return {
    months,
    series,
    // cancelledPrivateData,
    totalSightings,
    totalCancelled,
    totalPrivate,
    breachingEvents,
    ranking,
    endurkoma,
  };
}
