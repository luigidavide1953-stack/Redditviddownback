import { Router } from 'express';
import mediaController from '../controllers/media.controller';
import { validateDownloadRequest } from '../middlewares/validateRequest';

const router = Router();

router.post('/info', validateDownloadRequest, mediaController.getMediaInfo);

export default router;
