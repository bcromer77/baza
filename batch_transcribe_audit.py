import os
import csv
import time
import whisper
from datetime import timedelta
from yt_dlp import YoutubeDL

# === SETTINGS ===
MODEL_SIZE = "tiny"  # use "small" or "tiny" for faster processing
PAUSE_BETWEEN_DOWNLOADS = 60  # seconds

# === VIDEO URLS TO PROCESS ===
youtube_urls = [
    "https://www.youtube.com/watch?v=Nq8-uLYb_HQ",
    "https://www.youtube.com/watch?v=tMZs04CQL8U",
    "https://www.youtube.com/watch?v=fIyaoxAiTrk",
    "https://www.youtube.com/watch?v=ujMjO8iH-44",
    "https://www.youtube.com/watch?v=9yuAwQ9LUJQ",
    "https://www.youtube.com/watch?v=ArrZm9GkOcE"
]

# === KEYWORDS ===
keyword_categories = {
    "Brand-Specific": [
        "Dexcom", "Sanofi", "Beyond Type 1", "Medtronic", "Omnipod", "T1dexchange",
        "Diamy dmedical", "American Red Cross", "Pharmacy", "Insurance", "Novo Nordisk",
        "Nervive Health", "Vindico Medical Education", "PReP", "FreeStyle Libre", "G7",
        "FreeStyle Libre 3 Plus", "FreeStyle Libre 2 Plus"
    ],
    "Anti-Pharma/Anti-Science": [
        "Pharma", "science", "covid", "shot", "vaccine", "vax", "vaxx", "jab", "drug prices",
        "natural remedies", "big pharma", "holistic", "doctor", "dr.", "vaxxed"
    ],
    "Illegal Activity/Drug Use": [
        "Theft", "robbery", "burglary", "fraud", "assault", "gambling", "rape", "drugs", "weed",
        "marijuana", "cannabis", "cocaine", "coke", "heroin", "meth", "lsd", "acid", "mushrooms",
        "shrooms", "ecstasy", "mdma", "substance abuse", "addiction", "psychoactive", "narcotics",
        "stimulants", "depressants", "hallucinogens", "opioids", "methamphetamine", "painkiller",
        "high", "alcohol", "murder", "violence", "gun"
    ],
    "Profanity/Discrimination": [
        "fuck", "shit", "cunt", "dick", "dickhead", "penis", "pussy", "bullshit", "balls", "ass",
        "asshole", "bitch", "motherfucker", "twat", "cock", "cocksucker", "prick", "horseshit",
        "anal", "anus", "bastard", "jizz", "tits", "titties", "slut", "whore", "fag", "faggot",
        "homo", "dyke", "kike", "shyster", "chink", "nigga", "nigger", "cracker", "beaner",
        "orientals", "gypsy", "towel head", "illegals", "tranny", "cripple", "retard", "arab", "jew"
    ],
    "Past Partnerships/Apologies": [
        "ad", "sponsorship", "sponsor", "partner", "partnership", "sorry", "apology", "sponsored"
    ],
    "Non-Social Work": [
        "conference", "podcast", "speaking", "speaker", "interview", "book"
    ],
    "Cultural, Racial or Ethnic movements": [
        "Black Lives Matter", "Indigenous Peoples", "Stop Asian Hate", "Feminist", "Feminism",
        "Green Peace", "Environmentalist", "Women’s equality", "Hispanic heritage", "equal rights",
        "civil rights", "environment", "environmentalism", "diversity", "activist", "activism",
        "LGBTQIA+", "gay", "Pride", "trans", "transgender", "abortion"
    ],
    "Political Support": [
        "Gender-affirming care", "drag queens", "Roe", "Wade", "abortion", "gun violence",
        "immigration", "president", "vice president", "election", "white house", "politics",
        "vote", "support", "democracy", "government", "party", "campaign", "candidate", "policy",
        "legislation", "term limits", "debate", "propaganda", "democrat", "republican", "liberal",
        "conservative", "libertarian", "green party", "congress", "senate", "senators",
        "house members", "representatives"
    ]
}

# === SETUP ===
output_file = "youtube_transcript_audit.csv"
os.makedirs("downloads", exist_ok=True)
model = whisper.load_model(MODEL_SIZE)
output_rows = []

def download_audio(url):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': 'downloads/%(id)s.%(ext)s',
        'postprocessors': [{'key': 'FFmpegExtractAudio','preferredcodec': 'mp3'}],
        'quiet': True
    }
    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        return os.path.join("downloads", f"{info['id']}.mp3"), info['id']

def search_keywords(text, start):
    results = []
    for category, terms in keyword_categories.items():
        for keyword

