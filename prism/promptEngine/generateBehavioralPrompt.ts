import { SYMBOLIC_MAP } from "./symbolicMap"

interface PromptInput {
  keyword: string
  frequency: number
  quote?: string
}

export function generateBehavioralPrompt({ keyword, frequency, quote }: PromptInput) {
  const symbolicMeaning = SYMBOLIC_MAP[keyword.toLowerCase()] || "a meaningful ritual"

  return {
    prompt: `You've mentioned **${keyword}** ${frequency} times — but it's not just habit. It's ${symbolicMeaning}.`,
    suggestion: `What if you built a moment around that — something your audience can feel?`,
    quote
  }
}

