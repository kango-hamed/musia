import { z } from 'zod';

/**
 * Response DTOs for Post entity
 */

export const postResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().nullable(),
  published: z.boolean(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type PostResponseDto = z.infer<typeof postResponseSchema>;

/**
 * Post response with author info
 */
export const postWithAuthorSchema = postResponseSchema.extend({
  author: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string().nullable()
  })
});

export type PostWithAuthorDto = z.infer<typeof postWithAuthorSchema>;
