import { z } from 'zod';
import { AppError } from '../errors/app-error';
import { ErrorCode } from '../errors/error-codes';

/**
 * Common ID validation for CUID/UUID
 */
export const validateId = (param: string, resourceName = 'Resource'): string => {
  // Validate CUID (starts with 'c', 25 chars) or UUID format
  const isCuid = /^c[a-z0-9]{24}$/i.test(param);
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(param);

  if (!isCuid && !isUuid) {
    throw new AppError(`Invalid ${resourceName.toLowerCase()} id format`, {
      statusCode: 400,
      code: ErrorCode.VALIDATION_ERROR
    });
  }

  return param;
};

/**
 * Zod schemas for common validations
 */
export const commonSchemas = {
  id: z.string().cuid().or(z.string().uuid()),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(1).max(255),
  text: z.string().min(1),
  url: z.string().url(),
  date: z.string().datetime().or(z.date()),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
};

/**
 * Optional version of common schemas
 */
export const optionalSchemas = {
  id: commonSchemas.id.optional(),
  email: commonSchemas.email.optional(),
  password: commonSchemas.password.optional(),
  name: commonSchemas.name.optional(),
  text: commonSchemas.text.optional(),
  url: commonSchemas.url.optional(),
  date: commonSchemas.date.optional(),
  phoneNumber: commonSchemas.phoneNumber.optional(),
  slug: commonSchemas.slug.optional()
};
