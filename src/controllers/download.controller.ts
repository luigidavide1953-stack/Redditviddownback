import { Request, Response, NextFunction } from 'express';
import mergeService from '../services/merge.service';
import storageService from '../services/storage.service';
import logger from '../utils/logger';
import fs from 'fs';

class DownloadController {
  public async downloadVideo(req: Request, res: Response, next: NextFunction) {
    try {
      const { videoUrl, audioUrl } = req.body;

      if (!videoUrl || !audioUrl) {
        return res.status(400).json({
          success: false,
          message: 'videoUrl and audioUrl are required',
        });
      }

      const mergedPath = await mergeService.processVideo(videoUrl, audioUrl);

      res.download(mergedPath, 'reddit-video.mp4', (err) => {
        if (err) {
          logger.error(`Download error: ${err}`);
        }
        // Optional: Clean up after download or let storageService handle it periodically
        // storageService.deleteFile(mergedPath);
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DownloadController();
