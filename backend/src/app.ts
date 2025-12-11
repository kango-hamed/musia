import compression from 'compression';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { env } from './config/env';
import { logger } from './config/logger';
import { prisma } from './database/prisma';
import { errorHandler } from './middlewares/error-handler';
import { notFoundHandler } from './middlewares/not-found-handler';
import { requestId } from './middlewares/request-id';
import { requestLogger } from './middlewares/request-logger';
import { routes } from './routes';

const app = express();

const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(requestId);
app.use(requestLogger);
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(limiter);

// Welcome route
app.get('/', (_req, res) => {
  res.json({
    name: 'Musia API',
    version: '1.0.0',
    status: 'running',
    documentation: '/api-docs',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
    }
  });
});

app.get('/health', async (_req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
  } catch (error) {
    logger.error('Health check failed', error as Error);
    next(error);
  }
});

app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
