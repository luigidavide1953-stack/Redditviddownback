import fs from 'fs';
import path from 'path';
import logger from '../utils/logger';
import { TEMP_DIR, MERGED_DIR } from '../utils/constants';

class StorageService {
  constructor() {
    this.ensureDirectories();
  }

  private ensureDirectories() {
    [TEMP_DIR, MERGED_DIR].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        logger.info(`Created directory: ${dir}`);
      }
    });
  }

  public getFilePath(dir: string, filename: string): string {
    return path.join(dir, filename);
  }

  public async deleteFile(filePath: string): Promise<void> {
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        logger.info(`Deleted file: ${filePath}`);
      }
    } catch (error) {
      logger.error(`Error deleting file ${filePath}: ${error}`);
    }
  }

  public cleanOldFiles(dir: string, maxAgeMs: number = 3600000): void {
    fs.readdir(dir, (err, files) => {
      if (err) {
        logger.error(`Error reading directory ${dir}: ${err}`);
        return;
      }

      const now = Date.now();
      files.forEach(file => {
        const filePath = path.join(dir, file);
        fs.stat(filePath, (err, stats) => {
          if (err) return;
          if (now - stats.mtimeMs > maxAgeMs) {
            this.deleteFile(filePath);
          }
        });
      });
    });
  }
}

export default new StorageService();
