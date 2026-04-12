import { NextRequest, NextResponse } from "next/server";
import { PrivateRequest } from "../../models/schema";
import { connectDatabase } from "../../helpers/db";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.BETTER_AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDatabase();

    const data = await req.json();

    const request = new PrivateRequest({
      tourName: data.tourName,
      company: data.company,
      pax: data.pax,
      boat: data.boat,
      date: data.date,
      notes: data.notes,
      email: data.email
    });

    await request.save();

    return NextResponse.json({
      message: "Private tour request created",
      requestId: request._id,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        message: "Failed to create request",
        error: err.message,
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

    const requests = await PrivateRequest.find().sort({ createdAt: -1 });

    return NextResponse.json(requests);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Failed to fetch requests", error: err.message },
      { status: 500 },
    );
  }
}
