export async function createPhylloUser(email: string) {
  // Replace with real API logic later
  return {
    phylloUserId: `phyllo_${email.replace(/[^a-zA-Z]/g, "")}`,
    sdk_token: `sdk_token_${email}`,
  };
}

