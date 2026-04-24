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

  const hourlyRows = tour
    ? allRows.filter((r) => r.tourName === tour)
    : allRows;
  const pieRows = allRows;

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

  for (const row of pieRows) {
    tourMap[row.tourName] = (tourMap[row.tourName] || 0) + (row.total || 0);
  }

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
  });
}
