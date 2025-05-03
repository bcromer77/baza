import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Create a unique user ID for Phyllo (you might have your own logic for this)
    const phylloUserId = `creator_${userId}`

    // Get Phyllo credentials from environment variables
    const clientId = process.env.PHYLLO_CLIENT_ID
    const clientSecret = process.env.PHYLLO_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      throw new Error("Phyllo credentials not configured")
    }

    // Create basic auth header
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

    // First, check if the user already exists in Phyllo
    let phylloUser
    try {
      const userResponse = await fetch(`https://api.sandbox.getphyllo.com/v1/users/${phylloUserId}`, {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      })

      if (userResponse.ok) {
        phylloUser = await userResponse.json()
      }
    } catch (error) {
      console.error("Error checking user:", error)
    }

    // If user doesn't exist, create a new one
    if (!phylloUser) {
      const createUserResponse = await fetch("https://api.sandbox.getphyllo.com/v1/users", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: phylloUserId,
          name: `Creator ${userId}`,
          external_id: userId,
        }),
      })

      if (!createUserResponse.ok) {
        const errorData = await createUserResponse.json()
        throw new Error(`Failed to create Phyllo user: ${JSON.stringify(errorData)}`)
      }

      phylloUser = await createUserResponse.json()
    }

    // Generate SDK token
    const tokenResponse = await fetch("https://api.sandbox.getphyllo.com/v1/sdk-tokens", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: phylloUser.id,
        products: ["IDENTITY", "ENGAGEMENT", "CONTENT"], // Adjust based on your needs
        work_platforms: [], // Empty array means all platforms
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      throw new Error(`Failed to generate SDK token: ${JSON.stringify(errorData)}`)
    }

    const tokenData = await tokenResponse.json()

    return NextResponse.json({ sdk_token: tokenData.sdk_token })
  } catch (error: any) {
    console.error("Error generating SDK token:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

