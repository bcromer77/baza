import axios from 'axios';

const PHYLLO_BASE_URL = 'https://api.sandbox.getphyllo.com/v1';

export async function createPhylloUser(email: string) {
  const response = await axios.post(
    `${PHYLLO_BASE_URL}/users`,
    { email },
    {
      auth: {
        username: process.env.PHYLLO_CLIENT_ID || '',
        password: process.env.PHYLLO_CLIENT_SECRET || '',
      },
    }
  );

  return response.data;
}

// 🔥 ADD THIS FUNCTION:
export async function createPhylloToken(userId: string) {
  const response = await axios.post(
    `${PHYLLO_BASE_URL}/token`,
    { user_id: userId },
    {
      auth: {
        username: process.env.PHYLLO_CLIENT_ID || '',
        password: process.env.PHYLLO_CLIENT_SECRET || '',
      },
    }
  );

  return response.data;
}

