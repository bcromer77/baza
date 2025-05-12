import fs from 'fs';
import path from 'path';
import { embedImageBase64 } from '../utils/embedImageBase64';
import { storeVector } from '../utils/vectorStore';

const creatorDir = path.join(process.cwd(), 'public/creators');

async function run() {
  const files = fs.readdirSync(creatorDir).filter(f => f.endsWith('.png'));

  for (const file of files) {
    const fullPath = path.join(creatorDir, file);
    const base64 = fs.readFileSync(fullPath, 'base64');
    const { vector } = await embedImageBase64(base64);
    const creatorId = path.parse(file).name;
    const imagePath = `/creators/${file}`;
    storeVector(creatorId, vector, imagePath);
    console.log(`✅ Embedded ${creatorId}`);
  }
}

run().catch(console.error);

