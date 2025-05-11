export async function createPhylloToken({ email, name, user_type, 
redirect_uri }) {
  const res = await fetch("https://api.withphyllo.com/v1/sdk-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "phyllo-client-id": process.env.PHYLLO_CLIENT_ID || "",
      "phyllo-secret-id": process.env.PHYLLO_SECRET_ID || "",
    },
    body: JSON.stringify({
      client_user_id: email,
      name,
      user_type,
      redirect_uri,
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error(\"Phyllo error response:\", error)
    throw new Error(\"Failed to create Phyllo token\")
  }

  const data = await res.json()

  return {
    token: data.sdk_token,
    redirect_url: 
`https://connect.withphyllo.com?token=${data.sdk_token}`,
  }
}

