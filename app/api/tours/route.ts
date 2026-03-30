import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "../../helpers/db";
import Report from "../../models/schema";

export async function POST(req: NextRequest) {
  try {
    await connectDatabase();
    const data = await req.json();

const report = new Report({ rows: data.rows, payment: data.payment });    console.log("Report before save:", report.toObject());
    await report.save();

    return NextResponse.json({
      message: "Tours inserted",
      reportId: report._id,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Failed to insert tours",
        error: err.message || err.toString(),
      },
      { status: 500 },
    );
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
