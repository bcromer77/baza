import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Creator from "@/models/Creator";
import { createPhylloUser } from "@/lib/phyllo";

export async function POST(req: Request) {
  try {
    const { name, email, persona } = await req.json();

    if (!name || !email || !persona) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await connectToDatabase();

    // Create MongoDB record
    const creator = await Creator.create({ name, email, persona });

    // Create Phyllo user
    const { phylloUserId, sdk_token } = await createPhylloUser(email);

    // Save Phyllo user ID
    creator.phylloUserId = phylloUserId;
    await creator.save();

    return NextResponse.json({
      message: "User created",
      userId: creator._id,
      phylloUserId,
      sdk_token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Signup failed" }, { status: 500 });
  }
}

