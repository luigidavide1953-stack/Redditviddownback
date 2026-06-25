export interface RedditMedia {
  url: string;
  is_video: boolean;
  width?: number;
  height?: number;
  duration?: number;
  scrubber_media_url?: string;
  dash_url?: string;
  audio_url?: string;
}

export interface DownloadInfo {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  created_utc: number;
  permalink: string;
  media: RedditMedia[];
  is_gallery: boolean;
  gallery_items?: GalleryItem[];
}

export interface GalleryItem {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface MediaDownloadRequest {
  url: string;
}

export interface MediaDownloadResponse {
  success: boolean;
  message: string;
  data?: DownloadInfo;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error?: any;
}
