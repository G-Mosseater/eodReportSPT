import { NextResponse } from "next/server";
import { connectDatabase } from "../../helpers/db";
import { DepartureScreen } from "../../models/schema";

export async function POST(req: Request) {
  try {
    await connectDatabase();

    const rows = await req.json();

    await DepartureScreen.findOneAndUpdate(
      { key: "main" },
      { rows },
      { upsert: true },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /departures-screen error:", error);

    return NextResponse.json(
      { error: "Failed to save departures" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDatabase();

    const data = await DepartureScreen.findOne({ key: "main" });

    return NextResponse.json(data?.rows || []);
  } catch (error) {
    console.error("GET /departure-screen error:", error);

    return NextResponse.json(
      { error: "Failed to fetch departures" },
      { status: 500 },
    );
  }
}
