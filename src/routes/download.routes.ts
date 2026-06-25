import { Router } from 'express';
import downloadController from '../controllers/download.controller';

const router = Router();

router.post('/video', downloadController.downloadVideo);

export default router;
