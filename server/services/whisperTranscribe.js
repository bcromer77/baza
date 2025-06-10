import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

// Mongo Setup
const client = new MongoClient(process.env.MONGO_URI);
const dbName = process.env.DB_NAME || 'audiantix';

// Whisper CLI Command
export async function runWhisperTranscription(localVideoPath) {
  return new Promise((resolve, reject) => {
    const command = `whisper "${localVideoPath}" --model medium --output_format txt --language en --fp16 False`;
    exec(command, (err, stdout, stderr) => {
      if (err) {
        return reject(`Whisper error: ${stderr}`);
      }
      const outputPath = localVideoPath.replace(/\.(mp4|mov)$/, '.txt');
      const transcript = fs.readFileSync(outputPath, 'utf-8');
      fs.unlinkSync(outputPath); // Clean up .txt file
      return resolve(transcript);
    });
  });
}

// Save transcript to MongoDB
export async function saveTranscriptToDB({ userId, videoId, title, transcript }) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('transcripts');

  await collection.insertOne({
    userId,
    videoId,
    title,
    transcript,
    createdAt: new Date(),
  });

  await client.close();
}

// Full Transcription Pipeline
export async function transcribeAndStore({ filePath, userId, videoId, title }) {
  try {
    const transcript = await runWhisperTranscription(filePath);

    await saveTranscriptToDB({
      userId,
      videoId,
      title,
      transcript
    });

    fs.unlinkSync(filePath); // ✅ Clean up uploaded video
    console.log(`📝 Transcript stored for ${title}`);
  } catch (error) {
    console.error('❌ Transcription failed:', error);
    throw error;
  }
}

