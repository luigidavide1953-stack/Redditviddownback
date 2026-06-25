import { Request, Response, NextFunction } from 'express';
import { isValidUrl } from '../utils/helpers';

export const validateDownloadRequest = (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: 'URL is required in the request body.',
    });
  }

  if (!isValidUrl(url)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid URL provided.',
    });
  }

  next();
};
