import { spawn } from 'child_process'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { videoUrl } = req.body
  const script = spawn('python3', ['server/scripts/transcribe.py', videoUrl])

  let output = ''
  script.stdout.on('data', data => (output += data.toString()))
  script.stderr.on('data', data => console.error(data.toString()))

  script.on('close', () => {
    res.status(200).json({ output })
  })
}

