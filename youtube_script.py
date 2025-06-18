import requests

API_KEY = 'AIzaSyAKJgSwC47wJ7of_veu2pp3L_U6I9wTH9Y'
CHANNEL_ID = 'UC42CqkRAjN-JHT-EkxKLwJQ'

def get_channel_videos(channel_id, api_key):
    print(f"Fetching videos for channel: {channel_id}")
    video_ids = []
    next_page_token = None

    while True:
        url = f'https://www.googleapis.com/youtube/v3/search?key={api_key}&channelId={channel_id}&part=id&order=date&maxResults=50&type=video'
        if next_page_token:
            url += f'&pageToken={next_page_token}'

        print(f"Making API request...")
        response = requests.get(url)
        data = response.json()
        
        if 'error' in data:
            print(f"API Error: {data['error']}")
            return []

        print(f"Found {len(data.get('items', []))} videos in this batch")
        
        for item in data.get('items', []):
            video_ids.append(item['id']['videoId'])

        next_page_token = data.get('nextPageToken')
        if not next_page_token:
            break

    print(f"Total videos found: {len(video_ids)}")
    return video_ids

def get_video_titles(video_ids, api_key):
    print(f"Getting titles for {len(video_ids)} videos...")
    titles = {}
    for i in range(0, len(video_ids), 50):
        chunk = video_ids[i:i + 50]
        video_ids_str = ','.join(chunk)
        url = f'https://www.googleapis.com/youtube/v3/videos?part=snippet&id={video_ids_str}&key={api_key}'
        response = requests.get(url)
        data = response.json()

        for item in data.get('items', []):
            titles[item['id']] = item['snippet']['title']

    return titles

video_ids = get_channel_videos(CHANNEL_ID, API_KEY)
if video_ids:
    titles = get_video_titles(video_ids, API_KEY)
    print(f"\n=== RESULTS ===")
    for video_id, title in titles.items():
        print(f'https://www.youtube.com/watch?v={video_id} - {title}')
else:
    print("No videos found or API error occurred")
