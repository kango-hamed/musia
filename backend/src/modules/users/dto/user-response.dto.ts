import { z } from 'zod';

/**
 * Response DTOs for User entity
 */

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type UserResponseDto = z.infer<typeof userResponseSchema>;

/**
 * User response with posts
 */
export const userWithPostsSchema = userResponseSchema.extend({
  posts: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      published: z.boolean(),
      createdAt: z.date()
    })
  )
});

export type UserWithPostsDto = z.infer<typeof userWithPostsSchema>;
