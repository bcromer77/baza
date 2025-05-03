import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" && !process.env.MONGODB_URI) {
    return NextResponse.json({ message: "Skipping DB logic in build" }, { status: 200 });
  }

  try {
    const dbConnect = require("@/lib/db").default;
    const mongoose = require("mongoose");

    const { account_id } = await request.json();

    if (!account_id) {
      return NextResponse.json({ error: "Missing account_id" }, { status: 400 });
    }

    await dbConnect();

    const CreatorAccount =
      mongoose.models.CreatorAccount ||
      mongoose.model(
        "CreatorAccount",
        new mongoose.Schema({
          account_id: { type: String, required: true, unique: true },
        })
      );

    await CreatorAccount.deleteOne({ account_id });

    return NextResponse.json({
      success: true,
      message: "Account disconnected",
    });
  } catch (error: any) {
    console.error("Error disconnecting account:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
