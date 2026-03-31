import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "../../helpers/db";
import { Report } from "../../models/schema";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.BETTER_AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDatabase();
    const data = await req.json();

    const report = new Report({ rows: data.rows, payment: data.payment });
    console.log("Report before save:", report.toObject());
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

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.BETTER_AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDatabase();
    const reports = await Report.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(reports);
  } catch (err) {
    console.error(err);
    console.log(err);
  }
}
