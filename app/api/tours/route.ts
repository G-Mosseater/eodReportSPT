import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "../../helpers/db";
import Report from "../../models/schema";

export async function POST(req: NextRequest) {
  try {
    await connectDatabase();
    const data = await req.json();
    const report = new Report({ rows: data });

    await report.save();

    return NextResponse.json({
      message: "Tours inserted",
      reportId: report._id,
    });
  } catch (err) {
    console.error(err);
    console.log(err);
  }
}

export async function GET() {
  try {
    await connectDatabase();
    const reports = await Report.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(reports);
  } catch (err) {
    console.error(err);
    console.log(err);
  }
}
