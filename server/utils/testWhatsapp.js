require('dotenv').config();
const sendWhatsapp = require('./sendWhatsapp');

(async () => {
  try {
    await sendWhatsapp(
      'whatsapp:+353868203061', // <-- YOUR test WhatsApp number
      '🚀 Test: Audiantix WhatsApp onboarding is working!'
    );
    console.log('WhatsApp sent!');
  } catch (err) {
    console.error('Failed:', err);
  }
})();

