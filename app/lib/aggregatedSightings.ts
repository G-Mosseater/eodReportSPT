import { SightingRow } from "./loadSightings";

export const SPECIES = ["M", "M!", "H", "H!", "WBD", "P", "O", "F", "S", "L"];
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
  L: "#2C7FB8",
};

export const SPECIES_LABELS: Record<string, string> = {
  M: "Minke",
  "M!": "Minke Breach",
  H: "Humpback",
  "H!": "Humpback Breach",
  WBD: "Dolphin",
  P: "Harbor Porpoise",
  O: "Orca",
  F: "Fin Whale",
  S: "Sei Whale",
  L: "Seals",
};

const SPECIES_SET = new Set(SPECIES);
function addToSetRecord<T>(
  record: Record<string | number, Set<T>>,
  key: string | number,
  value: T,
) {
  if (!record[key]) {
    record[key] = new Set();
  }

  record[key].add(value);
}

export function aggregateSightings(data: SightingRow[]) {
  const grouped: Record<string, Record<number, number>> = {};
  const speciesTotals: Record<string, number> = {};

  const toursByMonth: Record<number, Set<string>> = {};
  const cancelledToursByMonth: Record<number, Set<string>> = {};

  const hourCounts: Record<string, number> = {};
  const heatmap: Record<string, number> = {};

  const toursByHour: Record<string, Set<string>> = {};
  const cancelledToursByHour: Record<string, Set<string>> = {};
  const toursByCell: Record<string, Set<string>> = {};
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

  let totalSightings = 0;
  let totalCancelled = 0;
  let totalPrivate = 0;
  let breachingEvents = 0;
  let endurkoma = 0;

  for (const species of SPECIES) {
    grouped[species] = {};
    speciesTotals[species] = 0;
  }

  data.forEach((row) => {
    const month = Number(row.MonthBlock);
    const value = row.Value?.trim();
    const tourId = `${row.Date}-${row.Hour}`;
    const hour = row.Hour.slice(0, 5);

    addToSetRecord(toursByMonth, month, tourId);
    addToSetRecord(toursByHour, hour, tourId);

    if (value === "CANCELLED") {
      totalCancelled++;
      addToSetRecord(cancelledToursByMonth, month, tourId);
      addToSetRecord(cancelledToursByHour, hour, tourId);
      return;
    }

    if (value === "PRIVATE") {
      totalPrivate++;
      return;
    }

    if (value === "EK") {
      endurkoma++;
      return;
    }

    totalSightings++;

    if (!SPECIES_SET.has(value || "")) {
      return;
    }

    if (value === "H!" || value === "M!") {
      breachingEvents++;
    }
    if (value !== "L") {
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;

      const heatmapKey = `${month}-${hour}`;

      heatmap[heatmapKey] = (heatmap[heatmapKey] || 0) + 1;
      const cellKey = `${month}-${hour}`;

      addToSetRecord(toursByCell, cellKey, tourId);
    }

    grouped[value][month] = (grouped[value][month] || 0) + 1;

    speciesTotals[value]++;
  });

  const months = [...new Set(data.map((row) => Number(row.MonthBlock)))].sort(
    (a, b) => a - b,
  );
  const hours = [...new Set(data.map((row) => row.Hour.slice(0, 5)))].sort();

  // Cancellation rate = (unique cancelled tours / unique total tours) per month
  // A tour is uniquely identified by combining Date + Hour
  // We use Set to store tours, which automatically removes duplicates
  // This ensures each tour is counted only once even if it has multiple sighting rows
  const cancellationRate = months.map((month) => {
    const totalTours = toursByMonth[month]?.size || 0;

    const cancelledTours = cancelledToursByMonth[month]?.size || 0;

    return {
      month,
      rate:
        totalTours > 0
          ? Number(((cancelledTours / totalTours) * 100).toFixed(1))
          : 0,
    };
  });

  const hourDistribution = Object.entries(hourCounts)
    .map(([hour, count]) => {
      const totalTours = toursByHour[hour]?.size || 0;

      return {
        hour,
        count,
        exposure: totalTours,
        normalized: totalTours > 0 ? count / totalTours : 0,
      };
    })
    .sort((a, b) => a.hour.localeCompare(b.hour));

  const heatmapData = Object.entries(heatmap).map(([key, sightings]) => {
    const [month, hour] = key.split("-");

    const tours = toursByCell[key]?.size || 0;

    return [
      hours.indexOf(hour),
      months.indexOf(Number(month)),
      sightings,
      tours,
    ];
  });

  const ranking = SPECIES.map((species) => ({
    species,
    count: speciesTotals[species] || 0,
  })).sort((a, b) => b.count - a.count);

  const pieData = Object.entries(speciesTotals).map(([key, value]) => ({
    name: key,
    value,
  }));

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
    hours,
    totalSightings,
    totalCancelled,
    totalPrivate,
    breachingEvents,
    ranking,
    endurkoma,
    cancellationRate,
    hourDistribution,
    heatmapData,
    pieData,
  };
}
