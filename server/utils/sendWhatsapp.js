const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function sendWhatsapp(to, body) {
  return client.messages.create({
    from: 'whatsapp:' + 
process.env.TWILIO_WHATSAPP_NUMBER.replace(/^(\+?)/, ''),
    to: to.startsWith('whatsapp:') ? to : 'whatsapp:' + to,
    body
  });
}

module.exports = sendWhatsapp;

