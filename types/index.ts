export interface VoiceHighlight {
  quote: string
  tone: string
  topic: string
  sentiment: string
}

export interface Creator {
  id: string
  name: string
  voiceHighlights: VoiceHighlight[]
}
