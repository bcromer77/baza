export async function createPhylloToken(data: {
  email: string;
  name: string;
  user_type: string;
  redirect_uri: string;
}) {
  const response = await axios.post(
    `${PHYLLO_BASE_URL}/token`,
    data,
    {
      auth: {
        username: process.env.PHYLLO_CLIENT_ID || '',
        password: process.env.PHYLLO_CLIENT_SECRET || '',
      },
    }
  );

  return response.data;
}

