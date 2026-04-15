import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../models/schema";
import { connectDatabase } from "../../../helpers/db";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 },
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password too short" },
      { status: 400 },
    );
  }
  try {
    await connectDatabase();
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: normalizedEmail,
      name,
      password: hashedPassword,
    });
    await newUser.save();

    return NextResponse.json({ message: "User Created!" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
}
