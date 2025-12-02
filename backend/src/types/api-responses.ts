/**
 * Standard API Response formats
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface ResponseMeta {
  requestId?: string;
  timestamp: string;
  version?: string;
}

/**
 * Success response builder
 */
export const successResponse = <T>(data: T, meta?: Partial<ResponseMeta>): ApiResponse<T> => ({
  success: true,
  data,
  meta: {
    timestamp: new Date().toISOString(),
    ...meta
  }
});

/**
 * Error response builder
 */
export const errorResponse = (
  code: string,
  message: string,
  details?: Record<string, unknown>
): ApiResponse => ({
  success: false,
  error: {
    code,
    message,
    details,
    timestamp: new Date().toISOString()
  }
});

/**
 * Validation error format
 */
export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface ValidationErrorResponse extends ApiError {
  code: 'VALIDATION_ERROR';
  details: {
    errors: ValidationError[];
  };
}
