import { NextResponse } from "next/server"
import { createPhylloToken } from "@/lib/phyllo"

export async function POST(req) {
  const formData = await req.formData()
  const email = formData.get("email")
  const handle = formData.get("handle")

  if (!email || !handle) {
    return NextResponse.json({ error: "Missing required fields." }, { 
status: 400 })
  }

  try {
    const { token, redirect_url } = await createPhylloToken({
      email,
      name: handle,
      user_type: "creator",
      redirect_uri: process.env.PHYLLO_REDIRECT_URI,
    })

    return NextResponse.redirect(redirect_url)
  } catch (error) {
    console.error("Phyllo onboarding error:", error)
    return NextResponse.json({ error: "Failed to initiate onboarding." }, 
{ status: 500 })
  }
}

