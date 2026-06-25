import ffmpeg from 'fluent-ffmpeg';
import logger from '../utils/logger';
import { MERGED_DIR } from '../utils/constants';
import path from 'path';

class FFmpegService {
  public async mergeAudioVideo(videoUrl: string, audioUrl: string, outputName: string): Promise<string> {
    const outputPath = path.join(MERGED_DIR, `${outputName}.mp4`);

    return new Promise((resolve, reject) => {
      logger.info(`Merging video: ${videoUrl} with audio: ${audioUrl}`);
      
      // We use -shortest to ensure the output ends when the shortest stream ends
      // We use -c:v copy to avoid re-encoding video (fast)
      // We use -c:a aac to ensure compatible audio encoding
      ffmpeg()
        .input(videoUrl)
        .input(audioUrl)
        .outputOptions([
          '-c:v copy',
          '-c:a aac',
          '-strict experimental',
          '-map 0:v:0',
          '-map 1:a:0',
          '-shortest'
        ])
        .on('start', (commandLine) => {
          logger.info('Spawned FFmpeg with command: ' + commandLine);
        })
        .on('end', () => {
          logger.info(`Merge completed: ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          logger.error(`Merge error: ${err.message}`);
          // Fallback to video only if merging fails
          this.copyVideoOnly(videoUrl, outputPath)
            .then(resolve)
            .catch(reject);
        })
        .save(outputPath);
    });
  }

  private async copyVideoOnly(videoUrl: string, outputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      logger.info(`Falling back to video only: ${videoUrl}`);
      ffmpeg(videoUrl)
        .outputOptions('-c copy')
        .on('end', () => {
          logger.info(`Copy completed: ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          logger.error(`Copy error: ${err.message}`);
          reject(err);
        })
        .save(outputPath);
    });
  }
}

export default new FFmpegService();
