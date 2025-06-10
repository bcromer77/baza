import vision from '@google-cloud/vision';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_CLOUD_VISION_KEY_PATH, // e.g. './gcloud-key.json'
});

// Sample a frame from the video at 2s and save as JPEG
export async function extractFrame(videoPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .screenshots({
        timestamps: ['2'],
        filename: path.basename(outputPath),
        folder: path.dirname(outputPath),
        size: '640x?'
      });
  });
}

// Run SafeSearch detection on the image frame
export async function moderateVideo(videoPath) {
  const framePath = path.join('/tmp', `frame-${Date.now()}.jpg`);
  await extractFrame(videoPath, framePath);

  const [result] = await client.safeSearchDetection(framePath);
  const detections = result.safeSearchAnnotation;

  // Clean up image file
  fs.unlinkSync(framePath);

  return {
    adult: detections.adult,
    violence: detections.violence,
    racy: detections.racy,
    medical: detections.medical,
    spoof: detections.spoof,
  };
}

