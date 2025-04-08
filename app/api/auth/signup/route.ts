import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 200 });
    }

    const newUser = await User.create({ email });

    return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
