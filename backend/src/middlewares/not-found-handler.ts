import { Request, Response } from 'express';

import { ErrorCode } from '../errors/error-codes';

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
    code: ErrorCode.NOT_FOUND,
    requestId: req.requestId
  });
};
