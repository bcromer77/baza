from pyyoutube import Api
import csv
import os

# Replace with your actual API key
API_KEY = "AIzaSyBhU9oKqsZkLutOBMDifKvGYhFrnTPd4Y0"

api = Api(api_key=API_KEY)

# Step 1: Search for the channel by handle
search = api.search_by_keywords(q="@theotherCword", search_type="channel", count=1)
channel_id = search.items[0].snippet.channelId
print("✅ Found Channel ID:", channel_id)

# Step 2: Get the uploads playlist ID
channel_info = api.get_channel_info(channel_id=channel_id)
uploads_playlist_id = channel_info.items[0].contentDetails.relatedPlaylists.uploads

# Step 3: Fetch all video items
videos = api.get_playlist_items(playlist_id=uploads_playlist_id, limit=None)

# Step 4: Write to CSV and match to .srt
with open("matched_videos.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Title", "Video ID", "YouTube URL", "SRT Exists"])
    
    for video in videos.items:
        vid = video.snippet.resourceId.videoId
        title = video.snippet.title
        url = f"https://www.youtube.com/watch?v={vid}"

        # Auto-search for .srt file anywhere
        srt_path = None
        for root, dirs, files in os.walk("."):
            if f"{vid}.srt" in files:
                srt_path = os.path.join(root, f"{vid}.srt")
                break

        exists = "✅" if srt_path else "❌"
        writer.writerow([title, vid, url, exists])
        print(f"🔍 {vid} → {exists}")

