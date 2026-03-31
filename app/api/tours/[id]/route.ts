import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDatabase } from "../../../helpers/db";
import { Report } from "../../../models/schema";
import { getToken } from "next-auth/jwt";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> },
) {
  const token = await getToken({ req, secret: process.env.BETTER_AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDatabase();

    const params = await context.params;

    const id = params.id;
    console.log("this is the id", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const report = await Report.findById(id).lean();
    if (!report) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> },
) {
  const token = await getToken({ req, secret: process.env.BETTER_AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDatabase();
    const params = await context.params;
    const id = params.id;
    console.log("Deleting report with id", id);

    const deletedReport = await Report.findByIdAndDelete(id);
    if (!deletedReport) {
      return NextResponse.json({ error: "Report not found!" }, { status: 400 });
    }
    return NextResponse.json({ message: "Report deleted successfully", id });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
