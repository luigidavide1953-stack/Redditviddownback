import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { limiter } from './middlewares/rateLimit';
import { errorHandler } from './middlewares/errorHandler';
import mediaRoutes from './routes/media.routes';
import downloadRoutes from './routes/download.routes';
import healthRoutes from './routes/health.routes';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(limiter);

// Routes
app.use('/api/media', mediaRoutes);
app.use('/api/download', downloadRoutes);
app.use('/api/health', healthRoutes);

// Error Handler
app.use(errorHandler);

export default app;
