import ffmpegService from './ffmpeg.service';
import storageService from './storage.service';
import { generateUniqueId } from '../utils/helpers';
import logger from '../utils/logger';

class MergeService {
  public async processVideo(videoUrl: string, audioUrl: string): Promise<string> {
    const outputId = generateUniqueId();
    try {
      const mergedPath = await ffmpegService.mergeAudioVideo(videoUrl, audioUrl, outputId);
      return mergedPath;
    } catch (error) {
      logger.error(`Failed to process video: ${error}`);
      throw error;
    }
  }
}

export default new MergeService();
