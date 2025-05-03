import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Login body:", body);

  // Later we can add real login check or Phyllo token connection here
  return NextResponse.json({ message: "Login successful", body });
}

