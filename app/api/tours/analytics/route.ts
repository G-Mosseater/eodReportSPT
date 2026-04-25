import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "../../../helpers/db";
import { Report } from "../../../models/schema";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const tour = searchParams.get("tour");

  await connectDatabase();
  const conditions: any[] = [];

  if (month || year) {
    const y = year ? Number(year) : new Date().getFullYear();
    const m = month ? Number(month) : 0;

    const start = new Date(y, m, 1);
    const end = month
      ? new Date(y, m + 1, 0, 23, 59, 59, 999)
      : new Date(y, 11, 31, 23, 59, 59, 999);

    conditions.push({
      createdAt: { $gte: start, $lte: end },
    });
  }

  const query = conditions.length ? { $and: conditions } : {};

  const reports = await Report.find(query).lean();

  let allRows = reports.flatMap((r) => r.rows);

  // let paymentRows = reports.flatMap((r) => r.payment);
  const boatCapacity: Record<string, number> = {
    Andrea: 189,
    Lilja: 186,
    Rosin: 52,
    Skuli: 32,
    Katla: 12,
    Dagmar: 12,
    Other: 100,
  };

  const boatTrips: Record<string, number> = {};
  const boatRows = tour ? allRows.filter((r) => r.tourName === tour) : allRows;

  for (const row of boatRows) {
    const boat = row.boat?.trim() || "Unknown";
    boatTrips[boat] = (boatTrips[boat] || 0) + 1;
  }
  const hourlyRows = tour
    ? allRows.filter((r) => r.tourName === tour)
    : allRows;

  const hourMap: Record<
    string,
    {
      total: number;
      canceled: number;
      groups: number;
      free: number;
      adults: number;
      youth: number;
    }
  > = {};
  for (const row of hourlyRows) {
    if (!hourMap[row.hour]) {
      hourMap[row.hour] = {
        total: 0,
        canceled: 0,
        groups: 0,
        free: 0,
        adults: 0,
        youth: 0,
      };
    }
    hourMap[row.hour].total += row.total;
    hourMap[row.hour].groups += row.groups;
    hourMap[row.hour].adults += row.adults;
    hourMap[row.hour].youth += row.youth;

    hourMap[row.hour].free += row.child + row.endurkoma + row.free;

    if (row.status?.toLowerCase() === "canceled") {
      hourMap[row.hour].canceled += 1;
    }
  }
  const tourMap: Record<string, number> = {};

  const pieRows = allRows;

  for (const row of pieRows) {
    tourMap[row.tourName] = (tourMap[row.tourName] || 0) + (row.total || 0);
  }
  const boatMap: Record<string, number> = {};

  for (const row of boatRows) {
    const boatName = row.boat?.trim() || "Unknown";
    boatMap[boatName] = (boatMap[boatName] || 0) + (row.total || 0);
  }

  const boatUtilisation = Object.entries(boatMap).map(([boat, passengers]) => {
    const capacity = boatCapacity[boat] || 0;
    const trips = boatTrips[boat] || 0;

    const maxCapacity = capacity * trips;
    const utilisation = (passengers / maxCapacity) * 100;
    return {
      boat,
      passengers,
      trips,
      capacity,
      utilisation: Number(utilisation.toFixed(1)),
    };
  });

  // const paymentTotals = {
  //   cash: 0,
  //   card: 0,
  //   voucher: 0,
  // };
  // for (const row of paymentRows) {
  //   paymentTotals.cash += row.cash || 0;
  //   paymentTotals.card += row.card || 0;
  //   paymentTotals.voucher += row.voucher || 0;
  // }
  // console.log(paymentTotals);

  return NextResponse.json({
    hourly: Object.entries(hourMap)
      .map(([hour, value]) => ({
        hour,
        total: value.total,
        canceled: value.canceled,
        groups: value.groups,
        free: value.free,
        adults: value.adults,
        youth: value.youth,
      }))
      .sort((a, b) => a.hour.localeCompare(b.hour)),

    byTour: Object.entries(tourMap).map(([tour, total]) => ({
      tour,
      total,
    })),

    byBoat: Object.entries(boatMap).map(([boat, total]) => ({
      boat,
      total,
    })),
    boatUtilisation,
    // payment: paymentTotals
  });
}
