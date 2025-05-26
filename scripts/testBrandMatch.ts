import { checkBrandMentions } from "../prism/gci/checkTranscriptBrandMatch"

const exampleTranscript = `
  I’ve been using PReP for a while now. Recently I heard about Herceptin during a retreat.
  Some of my audience asks about CIU and food allergies.
`

const result = checkBrandMentions(exampleTranscript)
console.log("Detected brand mentions:", result)

