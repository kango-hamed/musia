import { ErrorCode } from './error-codes';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly isOperational: boolean;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    message: string,
    {
      statusCode = 500,
      code = ErrorCode.INTERNAL_ERROR,
      isOperational = true,
      metadata
    }: {
      statusCode?: number;
      code?: ErrorCode;
      isOperational?: boolean;
      metadata?: Record<string, unknown>;
    } = {}
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.metadata = metadata;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
