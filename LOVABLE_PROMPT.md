# Lovable Integration Prompt (Updated)

Use the following prompt to instruct Lovable to integrate the backend. This prompt emphasizes using the download endpoint to get merged video with audio.

---

**Prompt:**

"Please integrate the Reddit Media Downloader backend into the application. The backend is deployed at `https://redditviddownback-production.up.railway.app`.

Specifically, implement the following functionality:

1.  **Media Info Extraction**: When a user submits a Reddit URL, make a `POST` request to `https://redditviddownback-production.up.railway.app/api/media/info` with the JSON body `{"url": "USER_SUBMITTED_URL"}`. 
2.  **Display Results**: Use the `data` object from the response to display the post title, author, and media previews.
    *   For **images**, display the image using the `url` from the `media` array.
    *   For **galleries**, iterate through `gallery_items` and show all images.
    *   For **videos**, use the `url` from the `media` array **only for previewing** in a video player. Note that this preview URL is silent by design.
3.  **Merged Video Download (Crucial)**: To provide the user with a video that has sound, **DO NOT** just link to the preview URL. Instead, implement a 'Download Video' button that:
    *   Takes the `videoUrl` and `audioUrl` from the `/api/media/info` response.
    *   Makes a `POST` request to `https://redditviddownback-production.up.railway.app/api/download/video` with the JSON body `{"videoUrl": "...", "audioUrl": "..."}`.
    *   The backend will merge the video and audio using FFmpeg and return the merged MP4 file. Handle this response as a direct file download.
4.  **Error Handling**: Gracefully handle 403 (Reddit blocking) or 404 (Post not found) errors by displaying the `message` returned in the JSON error response.

Ensure all API calls are made through the existing Edge Function to avoid CORS issues if necessary."
