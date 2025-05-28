import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Creator from "@/models/Creator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Webhook received:", body);

    const { event, data } = body;

    if (event === "PROFILES.ADDED" || event === "PROFILES.UPDATED") {
      await connectToDatabase();
      await Creator.findOneAndUpdate(
        { phylloUserId: data.phylloUserId },
        { $set: { profile: data.profile } },
        { upsert: true }
      );
      console.log("Profile updated:", data.phylloUserId);
    }

    return NextResponse.json({ message: "Webhook received" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

