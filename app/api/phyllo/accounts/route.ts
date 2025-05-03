import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV === "production" && !process.env.MONGODB_URI) {
    return NextResponse.json({ accounts: [] }, { status: 200 });
  }

  try {
    const dbConnect = require("@/lib/db").default;
    const mongoose = require("mongoose");

    await dbConnect();

    const CreatorAccount =
      mongoose.models.CreatorAccount ||
      mongoose.model(
        "CreatorAccount",
        new mongoose.Schema({
          account_id: { type: String, required: true, unique: true },
          work_platform_id: { type: String, required: true },
          user_id: { type: String, required: true },
          connected_at: { type: Date, default: Date.now },
          status: { type: String, default: "active" },
        })
      );

    const accounts = await CreatorAccount.find({});
    return NextResponse.json({ accounts });
  } catch (error: any) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
