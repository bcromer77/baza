// File: app/dev-dashboard/page.tsx
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DevDashboard() {
  const [prompt, setPrompt] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [output, setOutput] = useState('')

  const seedDemo = async () => {
    const res = await fetch('/api/dev/seed', { method: 'POST' })
    const json = await res.json()
    setOutput(`Seed result: ${JSON.stringify(json, null, 2)}`)
  }

  const runTranscript = async () => {
    const res = await fetch('/api/dev/debug-transcript', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoUrl })
    })
    const json = await res.json()
    setOutput(json.output)
  }

  const runPromptToQuery = async () => {
    const res = await fetch('/api/dev/prompt-to-query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ campaignPrompt: prompt })
    })
    const json = await res.json()
    setOutput(json.query)
  }

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">🧪 Audiantix Dev Dashboard</h1>

      <div className="space-y-2">
        <h2 className="font-semibold">Seed Demo Creator</h2>
        <Button onClick={seedDemo}>Seed</Button>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Test Transcript from URL</h2>
        <Input
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <Button onClick={runTranscript}>Transcribe</Button>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Prompt to Query</h2>
        <Input
          placeholder="Enter campaign prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={runPromptToQuery}>Run</Button>
      </div>

      {output && (
        <div className="mt-6 p-4 bg-zinc-900 rounded text-white whitespace-pre-wrap text-sm border border-zinc-700">
          {output}
        </div>
      )}
    </div>
  )
}

