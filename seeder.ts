

import mongoose from "mongoose";
import { Report } from "./app/models/schema";
import { tourOrder, tours } from "./app/types/tourOrder";
import { connectDatabase } from "./app/helpers/db";

// -----------------------------
// 🧩 DB connection
// -----------------------------

// -----------------------------
// 🧩 Helpers
// -----------------------------
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]) => arr[rand(0, arr.length - 1)];

// -----------------------------
// 🧩 Tour config
// -----------------------------
const TOUR_TEMPLATE: Record<tours, { hours: string[]; boats: string[] }> = {
  "whale-watching": {
    hours: ["09:00", "13:00"],
    boats: ["Andrea", "Lilja"],
  },
  "puffin-tour": {
    hours: ["10:45"],
    boats: ["Skuli"],
  },
  "sea-angling": {
    hours: ["17:00"],
    boats: ["Rosin"],
  },
  "rib-express": {
    hours: ["11:00", "15:00"],
    boats: ["Freya"],
  },
  "northern-lights": {
    hours: ["22:00"],
    boats: ["Andrea"],
  },
  "puffin-by-rib": {
    hours: ["12:00", "16:00"],
    boats: ["Skuli"],
  },
};

// -----------------------------
// 🧩 Row generator
// -----------------------------
function createRow(tour: tours, hour: string, boat: string) {
  const groups = rand(0, 30);
  const youth = rand(0, 20);
  const child = rand(0, 10);
  const endurkoma = rand(0, 5);
  const free = rand(0, 5);
  const adults = rand(20, 140);

  return {
    tourName: tour,
    status: Math.random() > 0.1 ? "On" : "Canceled",
    hour,
    boat,
    adults,
    groups,
    youth,
    child,
    endurkoma,
    free,
    total: adults + groups + youth + child + endurkoma + free,
  };
}

// -----------------------------
// 🧩 Random date generator (Jan–May 2026)
// -----------------------------
function randomDateInRange() {
  const start = new Date("2026-01-01");
  const end = new Date("2026-05-31");

  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );

  // random hour for realism
  date.setHours(rand(6, 23));
  date.setMinutes(rand(0, 59));
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

// -----------------------------
// 🧩 Create report
// -----------------------------
function createReport() {
  const rows = tourOrder.flatMap((tour) => {
    const config = TOUR_TEMPLATE[tour];

    return config.hours.map((hour) =>
      createRow(tour, hour, pick(config.boats)),
    );
  });

  const cash = rand(50000, 300000);
  const card = rand(100000, 600000);
  const voucher = rand(0, 120000);

  const date = randomDateInRange();

  return {
    rows,
    payment: {
      cash,
      card,
      voucher,
      total: cash + card + voucher,
      notes: "Seeded report (Jan–May 2026)",
      g11: rand(0, 60),
      ae5: rand(0, 15),
      receptionStaff: pick(["Helena", "Anna", "Markus", "Sara"]),
      guides: pick(["Yoda", "Loki", "Thor", "Freya"]),
    },
    createdAt: date,
    updatedAt: date,
  };
}

// -----------------------------
// 🧩 Seed function (1 report per day)
// -----------------------------
async function seed() {
  try {
     await mongoose.connect("");
    console.log("Connected to MongoDB");

    const start = new Date("2026-01-01");
    const end = new Date("2026-05-31");

    const reports = [];

    // loop day by day
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const report = createReport();

      // force exact day (not random day anymore)
      const fixedDate = new Date(d);
      fixedDate.setHours(rand(6, 23));

      report.createdAt = fixedDate;
      report.updatedAt = fixedDate;

      reports.push(report);
    }

    await Report.insertMany(reports);

    console.log(`Inserted ${reports.length} daily reports`);

    await mongoose.disconnect();
    console.log("Disconnected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
