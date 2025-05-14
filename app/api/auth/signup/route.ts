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

    const creator = await Creator.create({ name, email, persona });

    const { phylloUserId, sdk_token } = await createPhylloUser(email);

    return NextResponse.json({
      message: "User created",
      phylloUserId,
      sdk_token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Signup failed" }, { status: 500 });
  }
}

