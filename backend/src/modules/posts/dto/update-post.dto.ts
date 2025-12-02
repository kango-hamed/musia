import { z } from 'zod';
import { optionalSchemas } from '../../../utils/validators';

export const updatePostSchema = z
  .object({
    title: optionalSchemas.text,
    content: z.string().optional(),
    published: z.boolean().optional()
  })
  .strict();

export type UpdatePostDto = z.infer<typeof updatePostSchema>;
