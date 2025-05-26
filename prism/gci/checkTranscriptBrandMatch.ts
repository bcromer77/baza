import { BRAND_KEYWORDS } from "./brandKeywordMap"

export function checkBrandMentions(transcript: string): Record<string, string[]> {
  const detected: Record<string, string[]> = {}

  Object.entries(BRAND_KEYWORDS).forEach(([brand, terms]) => {
    const matches = terms.filter(term =>
      transcript.toLowerCase().includes(term.toLowerCase())
    )
    if (matches.length > 0) {
      detected[brand] = matches
    }
  })

  return detected
}

