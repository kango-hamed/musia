import { z } from 'zod';
import { commonSchemas } from '../../../utils/validators';

export const createPostSchema = z.object({
  title: commonSchemas.text,
  content: z.string().optional(),
  authorId: commonSchemas.id
});

export type CreatePostDto = z.infer<typeof createPostSchema>;
