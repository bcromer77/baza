import dbConnect from '@/lib/dbConnect'
import Creator from '@/models/Creator'
import Transcript from '@/models/Transcript'

export default async function handler(req, res) {
  await dbConnect()

  if (req.method !== 'POST') return res.status(405).end()

  try {
    const creator = await Creator.create({
      name: 'Demo Creator',
      handle: '@demo_voice',
      tags: ['Lisbon', 'retreats', 'surf'],
      avatar: '/creators/demo.png',
    })

    await Transcript.create({
      creatorId: creator._id,
      videoUrl: 'https://example.com/demo.mp4',
      text: 'Lisbon is my healing place. I host group retreats in Nazare.',
      segments: [
        { text: 'Lisbon is my healing place.', start: 0, end: 4 },
        { text: 'I host group retreats in Nazare.', start: 4.2, end: 9 }
      ]
    })

    res.status(200).json({ success: true, creatorId: creator._id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Seeding failed' })
  }
}

