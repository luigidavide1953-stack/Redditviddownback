import { Request, Response, NextFunction } from 'express';
import redditService from '../services/reddit.service';
import parserService from '../services/parser.service';
import cacheService from '../services/cache.service';
import logger from '../utils/logger';

class MediaController {
  public async getMediaInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const { url } = req.body;
      
      // Check cache first
      const cachedData = cacheService.get(url);
      if (cachedData) {
        logger.info(`Serving from cache: ${url}`);
        return res.status(200).json({
          success: true,
          message: 'Media info retrieved from cache',
          data: cachedData,
        });
      }

      const rawData = await redditService.fetchPostData(url);
      const parsedData = parserService.parsePost(rawData);

      // Cache the result
      cacheService.set(url, parsedData);

      res.status(200).json({
        success: true,
        message: 'Media info retrieved successfully',
        data: parsedData,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MediaController();
