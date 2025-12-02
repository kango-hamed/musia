import { z } from 'zod';

/**
 * Pagination types
 */
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export type PaginationParams = z.infer<typeof paginationSchema>;

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

/**
 * Common validation schemas
 */
export const idSchema = z.string().cuid().or(z.string().uuid());
export const emailSchema = z.string().email();
export const dateSchema = z.string().datetime().or(z.date());

/**
 * Query filters
 */
export const dateRangeSchema = z.object({
  startDate: dateSchema.optional(),
  endDate: dateSchema.optional()
});

export type DateRange = z.infer<typeof dateRangeSchema>;

/**
 * Generic types
 */
export type ID = string;
export type Timestamp = Date | string;
