import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export async function connectDatabase() {
  await mongoose.connect(uri!);
}
