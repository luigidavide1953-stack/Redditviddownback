# Reddit Media Downloader API Documentation

Base URL: `https://redditviddownback-production.up.railway.app`

## 1. Get Media Information
Extracts image and video download links from a Reddit post URL.

- **Endpoint:** `/api/media/info`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "url": "https://www.reddit.com/r/funny/comments/..."
  }
  ```

### Successful Response Template:
```json
{
  "success": true,
  "message": "Media info retrieved successfully",
  "data": {
    "id": "17v8f6o",
    "title": "The perfect loop doesn't exi...",
    "author": "username",
    "subreddit": "funny",
    "created_utc": 1699984800,
    "permalink": "https://reddit.com/r/funny/comments/17v8f6o/...",
    "is_gallery": false,
    "media": [
      {
        "url": "https://v.redd.it/.../DASH_720.mp4?source=fallback",
        "is_video": true,
        "width": 1280,
        "height": 720,
        "duration": 15,
        "dash_url": "https://v.redd.it/.../DASHPlaylist.mpd",
        "audio_url": "https://v.redd.it/.../DASH_AUDIO_128.mp4"
      }
    ]
  }
}
```

## 2. Download Merged Video
Triggers the backend to merge video and audio streams and returns the file.

- **Endpoint:** `/api/download/video`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "videoUrl": "https://v.redd.it/.../DASH_720.mp4",
    "audioUrl": "https://v.redd.it/.../DASH_AUDIO_128.mp4"
  }
  ```
- **Response:** Binary file stream (video/mp4)

## 3. Health Check
- **Endpoint:** `/api/health`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "status": "UP",
    "timestamp": "2026-06-25T20:38:25.880Z",
    "uptime": 2760.35
  }
  ```

## Authentication
Currently, no API key is required for public endpoints. However, **Rate Limiting** is active (100 requests per 15 minutes per IP).
