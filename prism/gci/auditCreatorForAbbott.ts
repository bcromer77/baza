import ABBOTT_TERMS from "./abbottKeywords"

interface Post {
  platform: string
  text: string
}

export function auditCreatorForAbbott(posts: Post[]) {
  const results: Record<string, string[]> = {}

  posts.forEach(({ platform, text }) => {
    const matches = ABBOTT_TERMS.filter(term =>
      text.toLowerCase().includes(term.toLowerCase())
    )

    if (matches.length > 0) {
      if (!results[platform]) results[platform] = []
      results[platform].push(...matches)
    }
  })

  return results
}

