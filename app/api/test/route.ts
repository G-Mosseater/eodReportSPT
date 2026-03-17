import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "../../helpers/db";

export async function GET(req: NextRequest) {
  try {
    const { client, db } = await connectDatabase();

    const dbName = db.databaseName;

    await client.close(); 

    return NextResponse.json({ message: "Connected to MongoDB!", dbName });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Connection failed", error: error.message },
      { status: 500 },
    );
  }
}
