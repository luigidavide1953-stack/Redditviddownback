import { DownloadInfo, GalleryItem, RedditMedia } from '../types/media.types';
import logger from '../utils/logger';

class ParserService {
  public parsePost(data: any): DownloadInfo {
    const isGallery = data.is_gallery || false;
    const media: RedditMedia[] = [];
    const galleryItems: GalleryItem[] = [];

    if (isGallery && data.media_metadata) {
      Object.keys(data.media_metadata).forEach((key) => {
        const item = data.media_metadata[key];
        if (item.status === 'valid') {
          // Reddit gallery images are usually in 's' (original) or 'p' (previews)
          const source = item.s || item.p[item.p.length - 1];
          const url = source.u.replace(/&amp;/g, '&');
          galleryItems.push({
            id: key,
            url,
            width: source.x,
            height: source.y,
          });
        }
      });
    } else if (data.is_video && data.media && data.media.reddit_video) {
      const video = data.media.reddit_video;
      const baseUrl = video.fallback_url.split('?')[0];
      const audioUrl = baseUrl.replace(/DASH_\d+/, 'DASH_AUDIO_128.mp4').replace(/DASH_\d+/, 'DASH_audio.mp4');
      
      media.push({
        url: video.fallback_url,
        is_video: true,
        width: video.width,
        height: video.height,
        duration: video.duration,
        dash_url: video.dash_url,
        scrubber_media_url: video.scrubber_media_url,
        audio_url: audioUrl,
      });
    } else if (data.url && (data.url.match(/\.(jpg|jpeg|png|gif)$/) || data.domain === 'i.redd.it')) {
      media.push({
        url: data.url,
        is_video: false,
        width: data.preview?.images[0]?.source?.width,
        height: data.preview?.images[0]?.source?.height,
      });
    }

    return {
      id: data.id,
      title: data.title,
      author: data.author,
      subreddit: data.subreddit,
      created_utc: data.created_utc,
      permalink: `https://reddit.com${data.permalink}`,
      media,
      is_gallery: isGallery,
      gallery_items: galleryItems.length > 0 ? galleryItems : undefined,
    };
  }
}

export default new ParserService();
