import app from './app';
import { PORT } from './utils/constants';
import logger from './utils/logger';
import storageService from './services/storage.service';

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  
  // Start periodic cleanup of temp/merged files (every hour)
  setInterval(() => {
    logger.info('Running periodic file cleanup...');
    storageService.cleanOldFiles('./temp');
    storageService.cleanOldFiles('./merged');
  }, 3600000);
});

process.on('unhandledRejection', (err: any) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
