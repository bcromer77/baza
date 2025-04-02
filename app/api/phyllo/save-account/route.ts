import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" && !process.env.MONGODB_URI) {
    return NextResponse.json({ message: "Skipping DB logic in build" }, { status: 200 });
  }

  try {
    const { account_id, work_platform_id, user_id } = await request.json();

    if (!account_id || !work_platform_id || !user_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Connect to MongoDB (assumed setup)
    await mongoose.connect(process.env.MONGODB_URI!);

    const CreatorAccount =
      mongoose.models.CreatorAccount ||
      mongoose.model(
        "CreatorAccount",
        new mongoose.Schema({
          user_id: { type: String, required: true },
          account_id: { type: String, required: true, unique: true },
          work_platform_id: { type: String, required: true },
          connected_at: { type: Date, default: Date.now },
          status: { type: String, default: "active" },
        })
      );

    const creatorAccount = await CreatorAccount.findOneAndUpdate(
      { account_id },
      {
        account_id,
        work_platform_id,
        user_id,
        connected_at: new Date(),
        status: "active",
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Account saved successfully",
      account: creatorAccount,
    });
  } catch (error: any) {
    console.error("Error saving account:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}