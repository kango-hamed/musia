import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { logger } from '../config/logger';
import { AppError } from '../errors/app-error';
import { ErrorCode } from '../errors/error-codes';

interface ErrorResponse {
  message: string;
  code: ErrorCode;
  requestId?: string;
  errors?: unknown;
}

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    next(err);
    return;
  }

  let statusCode = 500;
  const response: ErrorResponse = {
    message: 'Internal server error',
    code: ErrorCode.INTERNAL_ERROR,
    requestId: req.requestId
  };

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    response.message = err.message;
    response.code = err.code;
    response.errors = err.metadata;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    response.message = 'Validation failed';
    response.code = ErrorCode.VALIDATION_ERROR;
    response.errors = err.issues;
  }

  const metadata = {
    requestId: req.requestId,
    statusCode,
    path: req.originalUrl,
    method: req.method,
    ...(err instanceof Error && {
      errorName: err.name,
      errorMessage: err.message,
      stack: err.stack
    })
  };

  logger.error('Request failed', metadata);

  res.status(statusCode).json(response);
};
