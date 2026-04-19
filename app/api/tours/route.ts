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
    await report.save();

    return NextResponse.json({
      message: "Tours inserted",
      reportId: report._id,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") || 31), 100);
  const cursor = searchParams.get("cursor");
  const token = await getToken({ req, secret: process.env.BETTER_AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDatabase();

    const query: any = {};
    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    const reports = await Report.find(query)
      .sort({ createdAt: -1 })
      .lean()
      .limit(limit);

    const nextCursor =
      reports.length > 0 ? reports[reports.length - 1].createdAt : null;

    return NextResponse.json({
      reports,
      nextCursor,
      hasMore: reports.length === limit,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch reports" },
      { status: 500 },
    );
  }
}
