import mongoose from "mongoose";
import { Report } from "./app/models/schema";
import { tourOrder, tours } from "./app/types/tourOrder";

// -----------------------------
// 🧩 DB
// -----------------------------
const MONGO_URI = "";

// -----------------------------
// 🧩 Helpers
// -----------------------------
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pick = <T>(arr: T[]) => arr[rand(0, arr.length - 1)];

// -----------------------------
// 🧩 CAPACITY RULES
// -----------------------------
const CAPACITY: Record<tours, number> = {
  "whale-watching": 189,
  "puffin-tour": 32,
  "sea-angling": 60,
  "northern-lights": 80,
  "rib-express": 12,
  "puffin-by-rib": 12,
};

// -----------------------------
// 🧩 STRICT TOUR SCHEDULE (SOURCE OF TRUTH)
// -----------------------------
const TOUR_SCHEDULE: Record<tours, { boats: string[]; hours: string[] }> = {
  "whale-watching": {
    boats: ["Andrea", "Lilja", "Rosin", "Other"],
    hours: ["09:00", "10:00", "13:00", "14:00", "17:00", "21:00"],
  },
  "puffin-tour": {
    boats: ["Skuli", "Rosin", "Other"],
    hours: ["08:00", "09:30", "10:45", "12:30", "14:15", "15:30", "17:00"],
  },
  "sea-angling": {
    boats: ["Rosin", "Other"],
    hours: ["17:00"],
  },
  "northern-lights": {
    boats: ["Andrea", "Lilja", "Rosin", "Other"],
    hours: ["21:00", "22:00"],
  },
  "rib-express": {
    boats: ["Dagmar", "Katla", "Other"],
    hours: ["09:00", "10:00", "11:00", "13:00", "14:00", "16:00"],
  },
  "puffin-by-rib": {
    boats: ["Dagmar", "Katla", "Other"],
    hours: ["12:00"],
  },
};

// -----------------------------
// 🧩 SEASON MULTIPLIER (realism)
// -----------------------------
function getSeasonMultiplier(date: Date) {
  const month = date.getMonth();

  // summer peak
  if (month >= 5 && month <= 8) return 1.6;

  // spring
  if (month >= 3 && month <= 4) return 1.2;

  // winter
  return 0.6;
}

// -----------------------------
// 🧩 ROW GENERATOR (STRICT RULES)
// -----------------------------
function createRows(date: Date) {
  const rows: any[] = [];
  const multiplier = getSeasonMultiplier(date);

  for (const tour of tourOrder) {
    const schedule = TOUR_SCHEDULE[tour];

    if (!schedule) continue;

    const { hours, boats } = schedule;
    const max = CAPACITY[tour];

    for (const hour of hours) {
      const boat = pick(boats);

      // -----------------------------
      // 1. BASE VALUE
      // -----------------------------
      const base = Math.floor(
        rand(Math.floor(max * 0.3), max) * multiplier
      );

      const perDeparture = Math.max(1, Math.floor(base / hours.length));
      const variation = rand(-3, 3);

      const baseTotal = Math.max(0, perDeparture + variation);

      // -----------------------------
      // 2. EXTRA FIELDS
      // -----------------------------
      const endurkoma = rand(0, 3);
      const free = rand(0, 2);

      // -----------------------------
      // 3. BREAKDOWN (from baseTotal)
      // -----------------------------
      const adults = Math.round(baseTotal * 0.7);
      const groups = Math.round(baseTotal * 0.15);
      const youth = Math.round(baseTotal * 0.1);

      // fix rounding drift
      const child = Math.max(
        0,
        baseTotal - (adults + groups + youth)
      );

      // -----------------------------
      // 4. FINAL TOTAL (ALL FIELDS INCLUDED)
      // -----------------------------
      const total =
        adults +
        groups +
        youth +
        child +
        endurkoma +
        free;

      // -----------------------------
      // 5. PUSH ROW
      // -----------------------------
      rows.push({
        tourName: tour,
        status: Math.random() > 0.05 ? "On" : "Canceled",
        hour,
        boat,

        adults,
        groups,
        youth,
        child,

        endurkoma,
        free,

        total, // fully consistent now
      });
    }
  }

  return rows;
}

// -----------------------------
// 🧩 REPORT FACTORY
// -----------------------------
function createReport(date: Date) {
  const rows = createRows(date);

  const cash = rand(50000, 300000);
  const card = rand(100000, 600000);
  const voucher = rand(0, 120000);

  return {
    rows,
    payment: {
      cash,
      card,
      voucher,
      total: cash + card + voucher,
      notes: "Strict schedule + capacity seeded data",
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
// 🧩 SEEDER (Jan 2025 → Apr 2026)
// -----------------------------
async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const start = new Date("2025-01-01");
  const end = new Date("2026-04-24");

  const reports: any[] = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    date.setHours(rand(6, 23));

    reports.push(createReport(date));
  }

  await Report.insertMany(reports);

  console.log(`Inserted ${reports.length} reports`);

  await mongoose.disconnect();
  console.log("Disconnected");
}

seed();