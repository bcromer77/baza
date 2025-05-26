import { generateBehavioralPrompt } from '@/prism/promptEngine/generateBehavioralPrompt'

interface PromptCardProps {
  keyword: string
  frequency: number
  quote?: string
}

export default function PromptCard({ keyword, frequency, quote }: PromptCardProps) {
  const { prompt, suggestion } = generateBehavioralPrompt({ keyword, frequency, quote })

  return (
    <div className="bg-white rounded-xl shadow p-5 max-w-xl border">
      <h2 className="text-lg font-semibold mb-2">✨ Behavioral Insight</h2>
      <p className="text-gray-800 mb-1">{prompt}</p>
      {quote && <p className="italic text-sm text-gray-500">“{quote}”</p>}
      <p className="text-blue-700 mt-3 font-medium">{suggestion}</p>
    </div>
  )
}

