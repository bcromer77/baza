import { NextResponse } from "next/server";
import { createPhylloToken } from "@/lib/phyllo";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const handle = formData.get("handle") as string;

    if (!email || !handle) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const { token, redirect_url } = await createPhylloToken({
      email,
      name: handle,
      user_type: "creator",
      redirect_uri: process.env.PHYLLO_REDIRECT_URI as string,
    });

    // Respond with the real token & URL
    return NextResponse.json({ token, redirect_url });

    // If you want to immediately redirect the user instead:
    // return NextResponse.redirect(redirect_url);

  } catch (error) {
    console.error("Phyllo onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to initiate onboarding." },
      { status: 500 }
    );
  }
}

