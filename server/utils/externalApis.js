const axios = require('axios');

// Phyllo API client (for creator data)
const phylloClient = axios.create({
  baseURL: 'https://api.phyllo.dev/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${Buffer.from(`${process.env.PHYLLO_CLIENT_ID}:${process.env.PHYLLO_SECRET_KEY}`).toString('base64')}`
  }
});

// OpenAI API client (for search query processing)
const openaiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  }
});

// Twilio WhatsApp client (for notifications)
const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = {
  phylloClient,
  openaiClient,
  twilioClient
};
