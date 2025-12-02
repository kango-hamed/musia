import { z } from 'zod';
import { optionalSchemas } from '../../../utils/validators';

export const updateUserSchema = z
  .object({
    email: optionalSchemas.email,
    name: optionalSchemas.name
  })
  .strict();

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
