export default function analyzeText(text) {
  const lower = text.toLowerCase();

  if (lower.includes('love') || lower.includes('amazing') || lower.includes('excited')) {
    return 'Excited';
  }

  if (lower.includes('burnout') || lower.includes('tired') || lower.includes('overwhelmed')) {
    return 'Drained';
  }

  return 'Neutral';
}

