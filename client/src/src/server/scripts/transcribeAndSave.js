const { downloadVideos, transcribeWithWhisper, detectLanguage, 
translateToEnglish } = require('./utils');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('../firebaseServiceAccount.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) 
});
const db = getFirestore();

async function processCreatorContent(creatorId, videoUrls) {
  for (const url of videoUrls) {
    const audio = await downloadVideos(url);
    const rawTranscript = await transcribeWithWhisper(audio);
    const lang = await detectLanguage(rawTranscript);
    const transcript = lang !== 'en' ? await 
translateToEnglish(rawTranscript) : rawTranscript;

    await db.collection('transcripts').add({
      creatorId,
      transcript,
      language: lang,
      createdAt: new Date(),
    });
  }

  console.log(`✅ Done processing videos for ${creatorId}`);
}

module.exports = { processCreatorContent };

