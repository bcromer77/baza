import { auditCreatorForAbbott } from "../prism/gci/auditCreatorForAbbott"

const kelvinPosts = [
  { platform: "IG", text: "Just tried FreeStyle Libre – it tracks my glucose non-stop." },
  { platform: "TikTok", text: "Dexcom or Libre? Which one do you prefer?" },
  { platform: "X", text: "Shoutout to Medtronic for their tech" }
]

const justinPosts = [
  { platform: "YouTube", text: "Dexcom G7 has changed the game for me." },
  { platform: "Facebook", text: "Discussing American Red Cross programs and diabetes care" },
  { platform: "TikTok", text: "Sanofi + T1dexchange — what a combo." }
]

console.log("Kelvin Davis – Abbott Matches:", auditCreatorForAbbott(kelvinPosts))
console.log("Justin Eastzer – Abbott Matches:", auditCreatorForAbbott(justinPosts))

