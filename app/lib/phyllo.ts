import axios from "axios";

export async function createPhylloToken({
  email,
  name,
  user_type,
  redirect_uri,
}: {
  email: string;
  name: string;
  user_type: string;
  redirect_uri: string;
}) {
  try {
    const phylloSecret = process.env.PHYLLO_SECRET_KEY;

    const response = await axios.post(
      "https://api.getphyllo.com/v1/sdk-tokens", // Replace with the correct Phyllo endpoint for token generation
      {
        email,
        name,
        user_type,
        redirect_uri,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${phylloSecret}:`).toString("base64")}`,
        },
      }
    );

    const { token, redirect_url } = response.data;

    return { token, redirect_url };
  } catch (error) {
    console.error("Phyllo API error:", error.response?.data || error.message);
    throw new Error("Failed to generate Phyllo token");
  }
}

