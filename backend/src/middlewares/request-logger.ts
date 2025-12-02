import { NextFunction, Request, Response } from 'express';

import { logger } from '../config/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const durationNs = process.hrtime.bigint() - start;
    const durationMs = Number(durationNs) / 1_000_000;

    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs.toFixed(2)}ms`, {
      requestId: req.requestId,
      userAgent: req.get('user-agent'),
      ip: req.ip,
      contentLength: res.getHeader('content-length') ?? 0
    });
  });

  next();
};
